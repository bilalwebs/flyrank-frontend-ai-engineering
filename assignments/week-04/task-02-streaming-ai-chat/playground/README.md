# Streaming AI Chat Interface

A production-ready, streaming AI chat built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and the **AI SDK v7** — powered by **Groq's `llama-3.3-70b-versatile`**.

Part of the FlyRank Frontend AI Engineering internship (assignment **FE-06**).

## Features

- **Real-time streaming** — assistant replies stream token by token via Server-Sent Events.
- **Multi-turn conversations** — full history is sent with every request for context.
- **Thinking indicator** — animated dots shown before the first token arrives.
- **Stop generation** — abort mid-stream and keep chatting immediately after.
- **Smart auto-scroll** — follows the stream only while you're at the bottom; otherwise a **"Jump to latest"** button appears.
- **Premium UI** — ChatGPT/Claude-inspired bubbles, rounded cards, soft shadows, timestamps, sticky composer, empty/loading/error states.
- **Dark mode** — class-based toggle, persisted to `localStorage`, no flash on load.
- **Accessible** — semantic HTML, labeled form fields, `role="log"` live region, ARIA status announcements, focus-visible rings, full keyboard support (Enter to send, Shift+Enter for a newline).
- **Mobile responsive** — full-viewport layout that adapts to small screens.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| AI | AI SDK v7 (`ai`, `@ai-sdk/react`, `@ai-sdk/groq`) |
| Model | Groq `llama-3.3-70b-versatile` |

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` with your Groq API key:

   ```bash
   GROQ_API_KEY=your_groq_api_key
   ```

   > The key is read **server-side only** and never sent to the browser.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  api/chat/route.ts      # Streaming API route (streamText)
  globals.css            # Dark-mode variant + animations
  layout.tsx             # Metadata, fonts, theme init script
  page.tsx               # Full-height app shell
components/
  Chat.tsx               # useChat orchestrator (state, theme, timestamps)
  ChatInput.tsx          # Sticky composer (auto-grow, Stop button)
  ChatMessage.tsx        # Single message bubble
  ChatMessages.tsx       # Scroll container + "Jump to latest"
  TypingIndicator.tsx    # Animated thinking dots
lib/
  ai.ts                  # Groq provider (server-only)
  model.ts               # Model config (system prompt, temperature, tokens)
```

## Model Configuration

All AI settings live in **`lib/model.ts`** so they're easy to tune in one place:

```ts
export const MODEL_ID = "llama-3.3-70b-versatile";
export const SYSTEM_PROMPT = `...`;
export const TEMPERATURE = 0.7;
export const MAX_OUTPUT_TOKENS = 2048;
```

`lib/ai.ts` and `lib/model.ts` are server-only modules — they are never imported from client components, which guarantees the API key stays out of the client bundle.

## API

`POST /api/chat` accepts the conversation as UI messages:

```json
{
  "messages": [
    { "id": "1", "role": "user", "parts": [{ "type": "text", "text": "Hello!" }] }
  ]
}
```

It returns a **UI message stream** (`text/event-stream`) that `useChat` consumes directly.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Learn More

- [AI SDK Docs](https://ai-sdk.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [Groq Console](https://console.groq.com)
