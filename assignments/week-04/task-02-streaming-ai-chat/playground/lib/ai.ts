import { createGroq } from "@ai-sdk/groq";

/**
 * Shared Groq provider.
 *
 * Server-only: this module references `process.env` and must never be
 * imported from client components. The API key is read from
 * `GROQ_API_KEY` in `.env.local` and never sent to the browser.
 */
export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});
