"use server";

import { auth } from '@clerk/nextjs/server';
import { recordMessageStats, estimateTokenCount } from '@/lib/stats';
import { 
  ModelTier, 
  isModelAvailableForTier, 
  getModelIdsForTier 
} from '@/lib/groq-models';
import { getUserTierAction } from './user-tier-action';
import { checkAndDecrementUserLimit } from './user-limits';
import { enrichMessagesWithContext, storeMessageInMemory } from '@/lib/memory';
import { randomUUID } from 'crypto';

// Define types for Groq API
type MessageRole = 'user' | 'assistant' | 'system';

type Message = {
  role: string;
  content: string;
};

type ChatRequest = {
  messages: Message[];
  isPrivateMode?: boolean;
  model?: string;
  chatId?: string; // Added to track conversation ID
  userContext?: string; // Optional additional user context
};

// User profile information
const DEFAULT_USER_PROFILE = {
  name: "Dennis Diepolder",
  birthDate: "16.07.1996",
  profession: "Software entwickler",
  location: "Kreuzlingen, Schweiz"
};

// AI system information
const BLOOMWEAVER_SYSTEM_INFO = 
  "Du bist Bloomweaver, ein KI-Assistent, der durch Interaktionen lernt " +
  "und personalisierte Antworten liefert. Du indexierst Gespräche in einer Vektordatenbank, " +
  "um den Benutzer im Laufe der Zeit besser zu verstehen und funktionierst als ein speziell für ihn angepasstes Modell.";

/**
 * Server action that streams chat completions from Groq
 */
export async function streamChatCompletion(request: ChatRequest) {
  try {
    // Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Nicht autorisiert");
    }

    const { 
      messages, 
      isPrivateMode = false, 
      model = "llama-3.1-8b-instant", 
      chatId,
      userContext 
    } = request;
    
    // Check user tier to confirm model access
    const userTier = await getUserTierAction(userId);
    
    // Validate if the requested model is available for this user's tier
    if (!isModelAvailableForTier(model, userTier)) {
      throw new Error(`Modell in deiner Stufe nicht verfügbar`);
    }

    // Check and decrement user's message limit
    const limitCheck = await checkAndDecrementUserLimit(userId);
    if (!limitCheck.success) {
      throw new Error(limitCheck.error || "Du hast dein Nachrichtenlimit für diesen Monat erreicht");
    }

    // Add system message with Bloomweaver information and user profile
    const userProfileInfo = `Benutzerprofil: ${DEFAULT_USER_PROFILE.name}, geboren am ${DEFAULT_USER_PROFILE.birthDate}, ${DEFAULT_USER_PROFILE.profession} wohnhaft in ${DEFAULT_USER_PROFILE.location}`;
    
    // Add additional user context if provided
    const fullUserContext = userContext 
      ? `${userProfileInfo}. Zusätzlicher Kontext: ${userContext}`
      : userProfileInfo;
      
    const systemMessage: Message = {
      role: 'system',
      content: `${BLOOMWEAVER_SYSTEM_INFO} ${fullUserContext}`
    };

    // Add system message at the beginning
    const messagesWithSystem = [systemMessage, ...messages];

    // Transform messages to the format needed for memory processing
    const transformedMessages = messagesWithSystem.map(msg => ({
      id: randomUUID(),
      content: msg.content,
      isUser: msg.role === 'user',
      timestamp: new Date(),
      role: msg.role as MessageRole,
    }));

    // Enrich messages with relevant context from previous conversations
    const enrichedMessages = await enrichMessagesWithContext(userId, transformedMessages);

    // Store the last user message in memory
    const lastUserMessage = [...transformedMessages].reverse().find(m => m.isUser);
    if (lastUserMessage) {
      await storeMessageInMemory(userId, lastUserMessage, chatId);
    }

    // Convert back to the format expected by Groq
    const messagesForGroq = enrichedMessages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Track estimated input tokens (prompt)
    const promptText = messagesForGroq.map(msg => msg.content).join(' ');
    const estimatedPromptTokens = await estimateTokenCount(promptText);

    // Record the prompt tokens in stats
    await recordMessageStats(estimatedPromptTokens, isPrivateMode);

    // Create the fetch request to Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messagesForGroq,
        model: model,
        temperature: 0.7,
        max_tokens: 4096,
        stream: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Fehler von der API');
    }

    // Use ReadableStream to track completion tokens
    let completionTokens = 0;
    let fullContent = '';

    // Return a new stream that processes and forwards the Groq API's response
    return new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              if (completionTokens === 0 && fullContent.length > 0) {
                completionTokens = await estimateTokenCount(fullContent);
              }
              
              if (completionTokens > 0) {
                await recordMessageStats(completionTokens, isPrivateMode);
              }
              
              // After completion, store the assistant's response in memory
              if (fullContent) {
                const assistantMessage = {
                  id: randomUUID(),
                  content: fullContent,
                  isUser: false,
                  timestamp: new Date(),
                  role: 'assistant' as MessageRole,
                };
                
                // Store the assistant message with personal context awareness
                await storeMessageInMemory(userId, assistantMessage, chatId);
                
                // Store a system summary message that reinforces the personal context
                const summaryMessage = {
                  id: randomUUID(),
                  content: `Gespräch mit ${DEFAULT_USER_PROFILE.name} über: ${fullContent.substring(0, 100)}...`,
                  isUser: false,
                  timestamp: new Date(),
                  role: 'system' as MessageRole,
                };
                await storeMessageInMemory(userId, summaryMessage, chatId);
              }
              
              controller.close();
              break;
            }
            
            controller.enqueue(value);
            
            const text = new TextDecoder().decode(value);
            if (text.includes('data: ')) {
              try {
                const jsonStr = text.replace('data: ', '').trim();
                if (jsonStr === '[DONE]') continue;

                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content || '';
                
                if (content) {
                  fullContent += content;
                }

                if (parsed.usage?.completion_tokens) {
                  completionTokens = parsed.usage.completion_tokens;
                }
              } catch (e) {
                // Ignore parsing errors for partial chunks
              }
            }
          }
        } catch (error) {
          console.error('Stream-Fehler aufgetreten');
          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      }
    });
  } catch (error: unknown) {
    console.error('Chat-Fehler aufgetreten');
    throw error;
  }
} 