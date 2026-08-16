'use client';

import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
} from 'ai';
import { useState } from 'react';
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

export default function Chat() {
  const { messages, sendMessage, addToolApprovalResponse } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  });
  const [input, setInput] = useState('');

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
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
                        label={`Auditing ${part.input.domain}...`}
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
                        input={part.input}
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Audit example.com"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
