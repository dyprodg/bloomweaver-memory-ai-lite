import { Message } from '@/types/chat';
import { createEmbedding } from './embeddings';
import { storeEmbedding, searchSimilarMessages } from './pinecone';
import { randomUUID } from 'crypto';

/**
 * Store a message in the vector database
 */
export async function storeMessageInMemory(
  userId: string,
  message: Message,
  chatId?: string
): Promise<void> {
  try {
    // Create embedding for the message content
    const embedding = await createEmbedding(message.content);

    // Store in Pinecone
    await storeEmbedding(
      userId,
      message.id,
      embedding,
      message.content,
      {
        chatId,
        timestamp: message.timestamp,
        isUser: message.isUser,
      }
    );
  } catch (error) {
    console.error('Failed to store message in memory:', error);
    // Don't throw error to prevent blocking chat functionality
  }
}

/**
 * Retrieve relevant context from previous messages
 */
export async function getRelevantContext(
  userId: string,
  query: string,
  limit: number = 5
): Promise<Message[]> {
  try {
    // Create embedding for the query
    const embedding = await createEmbedding(query);

    // Search for similar messages
    const similarMessages = await searchSimilarMessages(userId, embedding, limit);

    // Convert to Message format
    return similarMessages.map(item => ({
      id: randomUUID(),
      content: item.content,
      isUser: item.isUser,
      timestamp: item.timestamp,
      role: item.isUser ? 'user' : 'assistant',
    }));
  } catch (error) {
    console.error('Failed to retrieve relevant context:', error);
    return [];
  }
}

/**
 * Add relevant context to messages array
 */
export async function enrichMessagesWithContext(
  userId: string,
  messages: Message[]
): Promise<Message[]> {
  try {
    // If there are no messages or only one message, don't add context
    if (messages.length <= 1) {
      return messages;
    }

    // Get the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.isUser);
    if (!lastUserMessage) {
      return messages;
    }

    // Get relevant context based on the last user message
    const relevantContext = await getRelevantContext(userId, lastUserMessage.content, 3);
    
    if (relevantContext.length === 0) {
      return messages;
    }

    // Create a system message with the context
    const contextMessage: Message = {
      id: randomUUID(),
      content: `Here is some relevant context from previous conversations: ${relevantContext.map(m => 
        `${m.isUser ? 'User' : 'Assistant'}: ${m.content}`).join(' | ')}`,
      isUser: false,
      timestamp: new Date(),
      role: 'system',
    };

    // Insert the context message at the beginning of the messages array
    return [contextMessage, ...messages];
  } catch (error) {
    console.error('Failed to enrich messages with context:', error);
    return messages;
  }
} 