import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";

import { createOpenAI } from "@ai-sdk/openai";
import { chatTools } from "@/lib/tool";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

function errorHandler(error: unknown) {
  if (error == null) return "Unknown error occurred.";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq("openai/gpt-oss-120b"),
    // Alternative:
    // model: groq("llama-3.3-70b-versatile"),

    system: `
You are FlyRank Audit Assistant.

IMPORTANT RULES:

- Whenever the user asks to audit, analyze, check SEO, inspect, review, or score any website/domain,
  you MUST call the runSiteAudit tool.

- Never answer from your own knowledge.

- Always use the tool.

- After the tool returns, summarize the audit.

- If the user wants to delete a report,
  call deleteAuditReport.
`,

    messages: await convertToModelMessages(messages),

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
  });
}