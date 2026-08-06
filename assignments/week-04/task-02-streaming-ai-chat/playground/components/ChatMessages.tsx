"use client";

import { useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";

import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";

interface ChatMessagesProps {
  messages: UIMessage[];
  /** Formatted timestamp per message id, captured on first appearance. */
  timestamps: Record<string, string>;
  /** True while a request is in flight (before or during streaming). */
  isStreaming: boolean;
  /** True while waiting for the first token of a response. */
  isThinking: boolean;
  /** Called when the user picks a starter suggestion from the empty state. */
  onSuggestion: (text: string) => void;
}

const SCROLL_THRESHOLD = 48;

const SUGGESTIONS = [
  "Explain streaming AI responses in simple terms",
  "Write a short haiku about the AI SDK",
  "List 3 tips for writing great prompts",
];

/**
 * Scrollable message list.
 *
 * Auto-scrolls to the bottom only while the user is already near the
 * bottom. If the user scrolls up to read, scrolling is left untouched and
 * a "Jump to latest" button is offered instead.
 */
const ChatMessages = ({
  messages,
  timestamps,
  isStreaming,
  isThinking,
  onSuggestion,
}: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isAtBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isAtBottom, isStreaming]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    setIsAtBottom(distanceFromBottom < SCROLL_THRESHOLD);
  };

  const jumpToLatest = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        className="h-full space-y-6 overflow-y-auto px-4 py-6 sm:px-6"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 3l1.9 5.7L19.6 10.6l-5.7 1.9L12 18.2l-1.9-5.7L4.4 10.6l5.7-1.9L12 3z" />
              </svg>
            </span>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              How can I help you today?
            </h2>
            <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Ask anything. Responses stream in token by token, powered by
              Groq&rsquo;s llama-3.3-70b-versatile.
            </p>
            <div className="mt-2 grid w-full max-w-md gap-2 sm:grid-cols-1">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onSuggestion(suggestion)}
                  className="rounded-xl bg-white px-4 py-3 text-left text-sm text-slate-600 shadow-sm ring-1 ring-slate-900/5 transition hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-slate-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              timestamp={timestamps[message.id] ?? ""}
              isLast={index === messages.length - 1}
              isStreaming={
                isStreaming &&
                index === messages.length - 1 &&
                message.role === "assistant"
              }
            />
          ))
        )}

        {isThinking && (
          <div className="flex w-full items-start gap-3">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 3l1.9 5.7L19.6 10.6l-5.7 1.9L12 18.2l-1.9-5.7L4.4 10.6l5.7-1.9L12 3z" />
              </svg>
            </span>
            <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-slate-500 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      {!isAtBottom && messages.length > 0 && (
        <button
          type="button"
          onClick={jumpToLatest}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-lg ring-1 ring-slate-900/10 transition hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800 dark:text-indigo-300 dark:ring-white/10 dark:hover:bg-slate-700"
        >
          Jump to latest
        </button>
      )}
    </div>
  );
};

export default ChatMessages;
