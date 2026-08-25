import { z } from "zod";

export function validateChatRequest(data: unknown): {
  success: true;
  data: { messages: unknown[] };
} | {
  success: false;
  error: string;
} {
  if (!data || typeof data !== "object") {
    return { success: false, error: "Invalid request format." };
  }

  const obj = data as Record<string, unknown>;

  if (!obj.messages || !Array.isArray(obj.messages)) {
    return { success: false, error: "Messages array is required." };
  }

  if (obj.messages.length === 0) {
    return { success: false, error: "At least one message is required." };
  }

  if (obj.messages.length > 50) {
    return { success: false, error: "Too many messages. Maximum 50 allowed." };
  }

  return { success: true, data: { messages: obj.messages } };
}

export function sanitizeInput(text: string): string {
  return text
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 2000);
}
