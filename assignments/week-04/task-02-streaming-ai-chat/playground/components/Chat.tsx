"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";

import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";

/** Display name only — real model config lives in `lib/model.ts` (server). */
const MODEL_NAME = "llama-3.3-70b-versatile";

const formatTimestamp = (date: Date): string =>
  new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

/** Minimal external store so the theme can be read reactively without effects. */
const themeListeners = new Set<() => void>();

const subscribeToTheme = (onChange: () => void): (() => void) => {
  themeListeners.add(onChange);
  return () => {
    themeListeners.delete(onChange);
  };
};

const getThemeSnapshot = (): boolean =>
  typeof document === "undefined"
    ? false
    : document.documentElement.classList.contains("dark");

const Chat = () => {
  const { messages, sendMessage, stop, status, error, clearError } = useChat();

  const [input, setInput] = useState("");
  const [timestamps, setTimestamps] = useState<Record<string, string>>({});
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false,
  );

  const isStreaming = status === "submitted" || status === "streaming";
  const isThinking = status === "submitted";

  // Capture a stable timestamp the first time a message id appears.
  // Adjusted during render (the documented "adjust state when props change"
  // pattern) instead of in an effect to avoid cascading renders.
  const [previousMessages, setPreviousMessages] =
    useState<UIMessage[]>(messages);

  if (messages !== previousMessages) {
    setPreviousMessages(messages);

    const additions: Record<string, string> = {};
    for (const message of messages) {
      if (!(message.id in timestamps)) {
        additions[message.id] = formatTimestamp(new Date());
      }
    }

    if (Object.keys(additions).length > 0) {
      setTimestamps((previous) => ({ ...previous, ...additions }));
    }
  }

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Ignore storage failures (e.g. private browsing).
    }
    for (const listener of themeListeners) listener();
  };

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    await sendMessage({ text });
  }, [input, isStreaming, sendMessage]);

  const handleSuggestion = useCallback(
    async (text: string) => {
      if (isStreaming) return;
      await sendMessage({ text });
    },
    [isStreaming, sendMessage],
  );

  return (
    <section className="mx-auto flex h-dvh w-full max-w-3xl flex-col bg-slate-50 shadow-sm dark:bg-slate-950">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-slate-900 dark:text-slate-50">
            AI Assistant
          </h1>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {MODEL_NAME} &middot; streaming via Groq
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            role="status"
            aria-live="polite"
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              isStreaming
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                isStreaming
                  ? "animate-pulse bg-indigo-500"
                  : "bg-emerald-500"
              }`}
            />
            {isThinking ? "Thinking" : isStreaming ? "Streaming" : "Online"}
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 ring-1 ring-slate-900/10 transition hover:bg-white hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <ChatMessages
        messages={messages}
        timestamps={timestamps}
        isStreaming={isStreaming}
        isThinking={isThinking}
        onSuggestion={handleSuggestion}
      />

      {error ? (
        <div
          role="alert"
          className="mx-4 mb-3 flex items-center justify-between gap-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30 sm:mx-6"
        >
          <p>
            {error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."}
          </p>
          <button
            type="button"
            onClick={clearError}
            className="shrink-0 rounded-lg px-2 py-1 font-medium text-rose-700 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-600 dark:text-rose-300"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <ChatInput
        input={input}
        isStreaming={isStreaming}
        onInputChange={setInput}
        onSend={() => void handleSend()}
        onStop={stop}
      />
    </section>
  );
};

export default Chat;
