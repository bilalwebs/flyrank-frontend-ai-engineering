import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import type { UIMessage } from "ai";

import {
  chatModel,
  MAX_OUTPUT_TOKENS,
  SYSTEM_PROMPT,
  TEMPERATURE,
} from "@/lib/model";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Chat API route.
 *
 * Receives the full conversation history as UI messages, streams the
 * assistant's reply token-by-token using the Groq `llama-3.3-70b-versatile`
 * model, and returns a UI message stream that `useChat` consumes directly.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: unknown };

    if (!Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const result = streamText({
      model: chatModel,
      instructions: SYSTEM_PROMPT,
      messages: await convertToModelMessages(body.messages as UIMessage[]),
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
