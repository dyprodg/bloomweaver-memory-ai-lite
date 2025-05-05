# Dyprodg. Personal AI

A modern AI assistant platform with user authentication, protected content, and memory capabilities using Pinecone vector database.

## Features

- Next.js 15 with App Router
- Clerk Authentication
- Groq AI Integration
- Memory System with Pinecone Vector Database
- OpenAI Embeddings for semantic search
- TailwindCSS for styling
- Responsive design
- Protected AI dashboard
- Interactive chat with code highlighting
- Markdown rendering for rich AI responses
- Redis/Upstash KV for chat history persistence
- End-to-end encryption for chat data stored in Redis

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Clerk:
   - Create an account on [clerk.com](https://clerk.com)
   - Create a new application
   - Add your Clerk publishable key and secret key to a `.env.local` file:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
     CLERK_SECRET_KEY=your_secret_key
     ```

4. Set up Groq:
   - Create an account on [groq.com](https://console.groq.com/)
   - Generate an API key
   - Add your Groq API key to the `.env.local` file:
     ```
     GROQ_API_KEY=your_groq_api_key
     ```

5. Set up Pinecone:
   - Create an account on [pinecone.io](https://www.pinecone.io/)
   - Create a new index named 'chat-memory' with 1536 dimensions (for OpenAI embeddings)
   - Generate an API key
   - Add your Pinecone API key to the `.env.local` file:
     ```
     PINECONE_KEY=your_pinecone_api_key
     ```

6. Set up OpenAI:
   - Create an account on [openai.com](https://platform.openai.com/)
   - Generate an API key
   - Add your OpenAI API key to the `.env.local` file:
     ```
     OPEN_AI_KEY=your_openai_api_key
     ```

7. Set up Redis/KV Storage:
   - Create an account on [Upstash](https://upstash.com/) or another Redis provider
   - Create a new Redis database
   - Get your REST API URL and Token
   - Add them to your `.env.local` file:
     ```
     KV_REST_API_URL=your_redis_rest_url
     KV_REST_API_TOKEN=your_redis_token
     ```
   - For read-only operations, you can also specify (optional):
     ```
     KV_REST_API_READ_ONLY_TOKEN=your_read_only_token
     ```

8. Run the development server:
   ```bash
   npm run dev
   ```

## How the Memory System Works

This application has an integrated memory system that allows the AI to learn from previous conversations:

1. Each user message is embedded using OpenAI's text-embedding-3-small model
2. The embeddings are stored in Pinecone vector database with metadata
3. When a new message is sent, the system searches for relevant context from previous conversations
4. Retrieved context is added to the current conversation to help the AI provide more personalized responses
5. All messages (both user and AI) are stored in the vector database for future reference

This creates a system that gets smarter the more you use it, while maintaining privacy per user.

## Structure

- `/` - Landing page with sign-in and sign-up options
- `/sign-in` - Clerk sign-in page
- `/sign-up` - Clerk sign-up page
- `/dashboard` - Protected AI dashboard for authenticated users
- `/chat` - Interactive AI chat interface with Groq integration
- `/api/chat` - Protected API route for Groq AI completions

## Customization

- **Navbar**: Modify `src/components/Navbar.tsx` to change the navigation
- **Landing Page**: Update `src/app/page.tsx` to customize the landing page
- **Dashboard**: Edit `src/app/dashboard/page.tsx` for the AI assistant features
- **Chat**: Customize the chat interface in `src/app/chat/page.tsx`
- **AI Model**: Change the Groq model in `src/app/api/chat/route.ts`

## Deployment

You can deploy this application to Vercel or any other hosting service that supports Next.js.

```bash
npm run build
```

## Troubleshooting

### Redis Connection Issues
- Make sure your KV_REST_API_URL and KV_REST_API_TOKEN are correctly set in your `.env.local` file
- Check that your Redis database is properly created and accessible
- For local development, the app will fall back to in-memory storage if Redis credentials are missing

### Encryption Issues
- Ensure the ENCRYPTION_KEY environment variable is set in your `.env.local` file
- If you see "ENCRYPTION_KEY environment variable is not set" errors, check that the key is available in your environment
- For deployment, make sure to add the ENCRYPTION_KEY to your environment variables in your hosting provider

## License

MIT
