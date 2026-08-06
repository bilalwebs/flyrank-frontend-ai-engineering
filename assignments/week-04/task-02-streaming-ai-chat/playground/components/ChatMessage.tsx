"use client";

import type { UIMessage } from "ai";

interface ChatMessageProps {
  message: UIMessage;
  /** Pre-formatted time string captured when the message first appeared. */
  timestamp: string;
  /** True for the newest message in the conversation. */
  isLast: boolean;
  /** True when this assistant message is actively streaming. */
  isStreaming: boolean;
}

const AssistantAvatar = () => (
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
);

/**
 * A single chat bubble. User messages align right, assistant messages
 * align left with an avatar. The streaming caret is appended to the last
 * assistant message while tokens are arriving.
 */
const ChatMessage = ({
  message,
  timestamp,
  isLast,
  isStreaming,
}: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <AssistantAvatar />}

      <div
        className={`flex max-w-[85%] flex-col sm:max-w-[75%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:text-base ${
            isUser
              ? "rounded-br-md bg-indigo-600 text-white"
              : "rounded-bl-md bg-white text-slate-800 ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-slate-100 dark:ring-white/10"
          }`}
        >
          {message.parts.map((part, index) =>
            part.type === "text" ? (
              <p key={index} className="whitespace-pre-wrap break-words">
                {part.text}
                {isLast && isStreaming && (
                  <span
                    aria-hidden="true"
                    className="streaming-caret ml-0.5 inline-block h-4 w-[3px] translate-y-0.5 rounded-full bg-current"
                  />
                )}
              </p>
            ) : null,
          )}
        </div>

        {timestamp ? (
          <time
            className={`mt-1 px-1 text-xs text-slate-400 dark:text-slate-500 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {timestamp}
          </time>
        ) : null}
      </div>
    </div>
  );
};

export default ChatMessage;
