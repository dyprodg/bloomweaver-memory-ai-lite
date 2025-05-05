import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Default model for embeddings
const EMBEDDING_MODEL = 'text-embedding-3-small';

/**
 * Create an embedding for the given text using OpenAI
 */
export async function createEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
      encoding_format: 'float',
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw new Error('Failed to create embedding');
  }
}

/**
 * Batch create embeddings for multiple texts
 */
export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: texts,
      encoding_format: 'float',
    });

    return response.data.map(item => item.embedding);
  } catch (error) {
    console.error('Error creating embeddings:', error);
    throw new Error('Failed to create embeddings');
  }
} 