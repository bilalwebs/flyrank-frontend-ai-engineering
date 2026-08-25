'use client';

import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
} from 'ai';
import { useState, useRef, useCallback } from 'react';
import {
  ToolInputStreaming,
  ToolInputAvailable,
  ToolOutputError,
  ToolOutputDenied,
} from '@/components/ToolStateViews';
import { AuditCard, type AuditResult } from '@/components/AuditCard';
import {
  DeleteApprovalPrompt,
  DeleteResultCard,
} from '@/components/DeleteReportUI';
import type { DeleteInput } from '@/components/DeleteReportUI';

const MAX_INPUT_LENGTH = 2000;

export default function Chat() {
  const { messages, sendMessage, addToolApprovalResponse, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  });
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && trimmed.length <= MAX_INPUT_LENGTH) {
        sendMessage({ text: trimmed });
        setInput('');
        inputRef.current?.focus();
      }
    },
    [input, sendMessage]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_INPUT_LENGTH) {
      setInput(value);
    }
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          FlyRank Audit Assistant
        </h1>
        <p className="text-sm text-gray-500">
          AI-powered SEO audit and analysis tool
        </p>
      </header>

      <div className="flex-1 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <strong className="text-xs uppercase text-gray-400">
              {message.role}
            </strong>

            {message.parts.map((part, index) => {
              switch (part.type) {
                case 'text':
                  return <p key={index}>{part.text}</p>;

                case 'tool-runSiteAudit': {
                  const callId = part.toolCallId;
                  switch (part.state) {
                    case 'input-streaming':
                      return (
                        <ToolInputStreaming
                          key={callId}
                          label="Preparing audit request..."
                        />
                      );
                    case 'input-available':
                      return (
                        <ToolInputAvailable
                          key={callId}
                          label={`Auditing ${(part.input as { domain?: string })?.domain ?? 'unknown'}...`}
                        />
                      );
                    case 'output-available':
                      return (
                        <AuditCard key={callId} result={part.output as AuditResult} />
                      );
                    case 'output-error':
                      return (
                        <ToolOutputError key={callId} message={part.errorText} />
                      );
                  }
                  break;
                }

                case 'tool-deleteAuditReport': {
                  const callId = part.toolCallId;
                  switch (part.state) {
                    case 'input-streaming':
                      return (
                        <ToolInputStreaming
                          key={callId}
                          label="Preparing delete request..."
                        />
                      );
                    case 'input-available':
                      return (
                        <ToolInputAvailable
                          key={callId}
                          label="Waiting for approval decision..."
                        />
                      );
                    case 'approval-requested':
                      if (part.approval.isAutomatic) {
                        return (
                          <ToolInputAvailable
                            key={callId}
                            label="Checking approval automatically..."
                          />
                        );
                      }
                      return (
                        <DeleteApprovalPrompt
                          key={callId}
                          input={part.input as DeleteInput}
                          onRespond={(approved) =>
                            addToolApprovalResponse({
                              id: part.approval.id,
                              approved,
                            })
                          }
                        />
                      );
                    case 'approval-responded':
                      return (
                        <ToolInputAvailable
                          key={callId}
                          label={
                            part.approval.approved
                              ? 'Approved — deleting report...'
                              : 'Denied — cancelling...'
                          }
                        />
                      );
                    case 'output-available':
                      return (
                        <DeleteResultCard
                          key={callId}
                          result={part.output as never}
                        />
                      );
                    case 'output-error':
                      return (
                        <ToolOutputError key={callId} message={part.errorText} />
                      );
                    case 'output-denied':
                      return (
                        <ToolOutputDenied
                          key={callId}
                          reason={part.approval.reason}
                        />
                      );
                  }
                  break;
                }

                default:
                  return null;
              }
            })}
          </div>
        ))}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <strong>Error:</strong> {error.message || 'Something went wrong. Please try again.'}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 flex gap-2 border-t border-gray-200 bg-white py-4 dark:bg-gray-950"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="e.g. Audit example.com"
            maxLength={MAX_INPUT_LENGTH}
            aria-label="Chat message input"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {input.length}/{MAX_INPUT_LENGTH}
          </span>
        </div>
        <button
          type="submit"
          disabled={!input.trim() || input.length > MAX_INPUT_LENGTH}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
