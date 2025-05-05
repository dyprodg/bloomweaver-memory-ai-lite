import { Pinecone } from '@pinecone-database/pinecone';
import { Message } from '@/types/chat';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_KEY as string,
});

// Index name - create this index in Pinecone dashboard
const INDEX_NAME = 'chat-memory';

/**
 * Get or create the Pinecone index
 */
export async function getIndex() {
  // Check if index exists, if not we'd need to create it
  // For simplicity, we're assuming the index already exists
  return pinecone.index(INDEX_NAME);
}

/**
 * Store a vector embedding in Pinecone
 */
export async function storeEmbedding(
  userId: string,
  messageId: string,
  embedding: number[],
  content: string,
  metadata: {
    chatId?: string;
    timestamp: Date;
    isUser: boolean;
  }
) {
  const index = await getIndex();
  
  await index.upsert([
    {
      id: messageId,
      values: embedding,
      metadata: {
        userId,
        content,
        chatId: metadata.chatId || 'unknown',
        timestamp: metadata.timestamp.toISOString(),
        isUser: metadata.isUser,
      },
    },
  ]);
}

/**
 * Search for relevant context in Pinecone
 */
export async function searchSimilarMessages(
  userId: string,
  embedding: number[],
  limit: number = 5
) {
  const index = await getIndex();
  
  const results = await index.query({
    vector: embedding,
    topK: limit,
    filter: { userId },
    includeMetadata: true,
  });
  
  return results.matches.map(match => ({
    content: match.metadata?.content as string,
    score: match.score,
    isUser: match.metadata?.isUser as boolean,
    timestamp: new Date(match.metadata?.timestamp as string),
    chatId: match.metadata?.chatId as string,
  }));
} 