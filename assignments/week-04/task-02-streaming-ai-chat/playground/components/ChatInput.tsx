"use client";

import { useEffect, useRef } from "react";

interface ChatInputProps {
  input: string;
  /** True while a response is streaming; blocks sending and editing. */
  isStreaming: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
}

const MAX_TEXTAREA_HEIGHT = 160;

/**
 * Sticky composer: textarea that auto-grows, Enter to send,
 * Shift+Enter for a newline, and a stop button while streaming.
 */
const ChatInput = ({
  input,
  isStreaming,
  onInputChange,
  onSend,
  onStop,
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [input]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  const canSend = input.trim().length > 0 && !isStreaming;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
      className="sticky bottom-0 border-t border-slate-200 bg-slate-50/95 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Your message
        </label>
        <textarea
          id="chat-input"
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
          className="max-h-40 flex-1 resize-none rounded-2xl bg-white px-4 py-3 text-sm text-slate-800 shadow-sm ring-1 ring-slate-900/10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-800 dark:text-slate-100 dark:ring-white/10 dark:placeholder:text-slate-500 dark:focus:ring-indigo-400"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-600 text-white shadow-sm transition hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            aria-label="Stop generating"
            title="Stop generating"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <rect x="7" y="7" width="10" height="10" rx="1.5" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSend}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-indigo-600"
            aria-label="Send message"
            title="Send message"
          >
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
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatInput;
