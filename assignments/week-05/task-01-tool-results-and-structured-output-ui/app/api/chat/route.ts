import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";

import { createOpenAI } from "@ai-sdk/openai";
import { chatTools } from "@/lib/tool";
import { checkRateLimit } from "@/lib/rate-limit";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function errorHandler(error: unknown) {
  console.error("[Chat API Error]", error);
  if (error == null) return "Unknown error occurred.";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred.";
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(req);
    const { allowed, remaining, resetAt } = checkRateLimit(ip);

    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // Validate API key
    if (!process.env.GROQ_API_KEY) {
      console.error("[Chat API] GROQ_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service is not configured." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const body = await req.json();

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (body.messages.length > 50) {
      return new Response(
        JSON.stringify({ error: "Too many messages. Maximum 50 allowed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: groq("openai/gpt-oss-120b"),
      system: `You are FlyRank Audit Assistant.

IMPORTANT RULES:

- Whenever the user asks to audit, analyze, check SEO, inspect, review, or score any website/domain,
  you MUST call the runSiteAudit tool.

- Never answer from your own knowledge.

- Always use the tool.

- After the tool returns, summarize the audit.

- If the user wants to delete a report,
  call deleteAuditReport.`,
      messages: body.messages,
      tools: chatTools,
      toolApproval: {
        deleteAuditReport: "user-approval",
      },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: errorHandler,
      }),
      headers: {
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (error) {
    console.error("[Chat API] Unhandled error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
