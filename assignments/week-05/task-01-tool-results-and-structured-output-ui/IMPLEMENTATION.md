# IMPLEMENTATION.md – Detailed Architecture and Flow

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Backend Flow](#backend-flow)
3. [Frontend Flow](#frontend-flow)
4. [Tool Definition and Execution](#tool-definition-and-execution)
5. [State Machine and Transitions](#state-machine-and-transitions)
6. [Error Handling](#error-handling)
7. [Type Safety](#type-safety)

---

## Architecture Overview

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (Browser)                                          │
│ ┌────────────────┐  ┌──────────────────────────────────┐   │
│ │ Next.js App    │  │ React Components                 │   │
│ │ page.tsx       │  │ • ToolStateViews                 │   │
│ │ useChat Hook   │  │ • AuditCard                      │   │
│ └────────┬────────┘  │ • DeleteReportUI                │   │
│          │           └──────────────────────────────────┘   │
└──────────┼───────────────────────────────────────────────────┘
           │ HTTP POST /api/chat
           │ UIMessage[]: user message
           │
           ├─ SSE Connection ──────────────────────────────────┐
           │  streaming UIMessage[] parts                      │
           │  (input-streaming, input-available, etc.)         │
           │                                                   │
┌──────────▼───────────────────────────────────────────────────┐
│ BACKEND (Next.js Server)                                    │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ /api/chat/route.ts (POST)                            │    │
│ │ ┌────────────────────────────────────────────────────┤    │
│ │ │ 1. Receive user message                            │    │
│ │ │ 2. Call streamText() with:                         │    │
│ │ │    - LLM: Groq (gpt-oss-120b)                      │    │
│ │ │    - System prompt                                 │    │
│ │ │    - Tool definitions                              │    │
│ │ │    - Approval config                               │    │
│ │ │ 3. toUIMessageStream() transforms to UI protocol   │    │
│ │ │ 4. createUIMessageStreamResponse() → SSE events    │    │
│ │ └────────────────────────────────────────────────────┤    │
│ │                                                      │    │
│ │ ┌────────────────────────────────────────────────────┤    │
│ │ │ Tool Execution Environment                         │    │
│ │ │ • Tool: runSiteAudit ──┐                           │    │
│ │ │ • Tool: deleteAuditReport ──┐                      │    │
│ │ │   └─ Approval gate ────┘                           │    │
│ │ └────────────────────────────────────────────────────┤    │
│ └──────────────────────────────────────────────────────┘    │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ External LLM Provider                                │    │
│ │ Groq API (https://api.groq.com/openai/v1)            │    │
│ │ Model: openai/gpt-oss-120b                           │    │
│ └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Stack

| Layer | Technology | Responsibility |
|-------|-----------|-----------------|
| **UI Layer** | React 19 + TypeScript | Display components, user input, state rendering |
| **Data Layer** | @ai-sdk/react useChat() | Client-side chat state and message streaming |
| **Protocol Layer** | AI SDK UIMessageStream | Structured message transport |
| **Transport Layer** | Server-Sent Events (SSE) | Real-time streaming from server |
| **API Layer** | Next.js /api/chat | Request handling and tool execution orchestration |
| **LLM Layer** | AI SDK + @ai-sdk/openai | Model invocation and tool calling |
| **Inference Layer** | Groq API | LLM inference (gpt-oss-120b model) |
| **Tool Layer** | AI SDK tool() factory | Tool definition and Zod validation |

---

## Backend Flow

### Complete Request-Response Cycle

#### 1. Request Reception

**File**: `app/api/chat/route.ts` line ~30

```typescript
export async function POST(request: Request) {
  try {
    const { messages }: { messages: Message[] } = await request.json();
    // messages is UIMessage[] from frontend
  } catch (error) {
    // error handling...
  }
}
```

**Input**:
```typescript
{
  messages: [
    {
      role: "user",
      content: "Audit example.com"
    }
  ]
}
```

**Processing**:
- Parse incoming JSON message array
- Each message has `role` ("user", "assistant", etc.) and `content` (text or parts array)
- Type safety: Message type imported from AI SDK

---

#### 2. LLM Stream Initialization

**File**: `app/api/chat/route.ts` line ~44

```typescript
const result = streamText({
  model: openai('gpt-oss-120b', {
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
  }),
  system: `...system prompt...`,
  messages: messages,
  tools: chatTools,
  toolApproval: {
    deleteAuditReport: 'user-approval',
  },
  onFinish: ({ text, toolUses, toolResults }) => {
    // Final processing
  },
});
```

**Key Configuration**:

| Property | Value | Meaning |
|----------|-------|---------|
| `model` | Groq gpt-oss-120b | OpenAI-compatible inference endpoint |
| `baseURL` | https://api.groq.com/openai/v1 | Groq's API endpoint |
| `tools` | chatTools (2 tools) | Available tool definitions |
| `toolApproval.deleteAuditReport` | 'user-approval' | Pause execution, wait for user |
| `system` | Custom prompt | Enforces tool usage rules |

**System Prompt**:
- Instructs LLM to only use provided tools
- Specifies when each tool should be invoked
- Guides tone and behavior

---

#### 3. Tool Definition Reference

**File**: `lib/tool.ts` (imported as `chatTools`)

Tools are defined using AI SDK `tool()` factory:

```typescript
export const runSiteAudit = tool({
  description: "Run an SEO audit for a given website...",
  parameters: z.object({
    domain: z.string()
      .describe('The website domain to audit, e.g. "example.com"')
  }),
  execute: async (params) => {
    // Simulated tool execution
    await new Promise(r => setTimeout(r, 600)); // 600ms latency
    return {
      domain: params.domain,
      score: Math.floor(Math.random() * 41) + 60, // 60-100
      grade: ...,
      issues: [...],
      checkedAt: new Date().toISOString(),
    };
  },
});
```

**Tool Object Properties**:
- `description`: What LLM sees about tool purpose
- `parameters`: Zod schema for input validation
- `execute`: Async function that runs the tool
- Returns: Structured output object

---

#### 4. Streaming and State Emission

**File**: `app/api/chat/route.ts` line ~65

```typescript
const uiStream = toUIMessageStream(result, {
  async onTool({ toolName, toolCallId, args, result, error, isError }) {
    // Called for each tool state transition
    // Emits: input-streaming, input-available, output-available, etc.
  },
});
```

**AI SDK Streaming Protocol**:
- `toUIMessageStream()` wraps streamText result
- Emits `UIMessage` objects with typed parts
- Each part represents a state update or result
- Example part:
  ```typescript
  {
    type: "tool-runSiteAudit",
    state: "output-available",
    input: { domain: "example.com" },
    output: { score: 85, grade: 'A', ... }
  }
  ```

---

#### 5. Server-Sent Events Response

**File**: `app/api/chat/route.ts` line ~75

```typescript
return createUIMessageStreamResponse(uiStream);
```

**Response Format**:
- HTTP 200 with `Content-Type: text/event-stream`
- Each event is newline-delimited JSON
- Browser automatically reconnects on disconnect
- Frontend receives via EventSource/fetch

**Example SSE Events**:
```
data: {"role":"assistant","content":[{"type":"text","text":"Auditing..."}]}
data: {"role":"assistant","content":[{"type":"tool-runSiteAudit","state":"input-streaming","input":{"domain":"example.com"}}]}
data: {"role":"assistant","content":[{"type":"tool-runSiteAudit","state":"input-available","input":{"domain":"example.com"}}]}
data: {"role":"assistant","content":[{"type":"tool-runSiteAudit","state":"output-available","input":{"domain":"example.com"},"output":{"domain":"example.com","score":85,"grade":"A",...}}]}
```

---

#### 6. Error Handling

**File**: `app/api/chat/route.ts` line ~85

```typescript
} catch (error) {
  const message = errorHandler(error);
  return new Response(
    `data: ${JSON.stringify({ role: "assistant", content: message })}\n\n`,
    { status: 500, headers: { 'Content-Type': 'text/event-stream' } }
  );
}
```

**errorHandler Function**:
```typescript
function errorHandler(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}
```

**Error Scenarios**:
- Missing GROQ_API_KEY → "GROQ_API_KEY not configured"
- Network failure → Network error message
- Tool execution error → Tool-specific error
- Invalid message format → Validation error

---

## Frontend Flow

### React Component Hierarchy

```
page.tsx (Main Container)
├── useChat() hook
│   ├── messages[]
│   ├── input (text field value)
│   ├── handleInputChange()
│   ├── handleSubmit()
│   └── sendMessage()
│
├── Message Rendering Loop
│   └── messages.map((message) => (
│       ├── Message role check (user vs assistant)
│       │
│       └── Assistant Messages
│           └── parts.map((part) => (
│               ├── text part → <div>{part.text}</div>
│               │
│               └── tool-* part (type check)
│                   ├── part.state check
│                   │   ├── "input-streaming" → <ToolInputStreaming />
│                   │   ├── "input-available" → <ToolInputAvailable />
│                   │   ├── "output-available" → <AuditCard /> or <DeleteResultCard />
│                   │   ├── "output-error" → <ToolOutputError />
│                   │   ├── "approval-requested" → <DeleteApprovalPrompt /> or <ToolInputAvailable />
│                   │   ├── "approval-responded" → <ToolInputAvailable />
│                   │   └── "output-denied" → <ToolOutputDenied />
│
├── Input Form
│   ├── <input type="text" value={input} onChange={...} />
│   └── <button onClick={handleSubmit}>Send</button>
```

### useChat Hook Initialization

**File**: `app/page.tsx` line ~10

```typescript
const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
  maxToolRoundtrips: 5,
});
```

**Hook Properties**:
- `api`: Endpoint URL where POST requests are sent
- `maxToolRoundtrips`: Maximum number of tool invocation rounds (prevents infinite loops)
- `messages`: Array of Message objects from history
- `input`: Current text field value
- `handleInputChange`: Callback for text input changes
- `handleSubmit`: Callback for form submission (sends message and resets input)

**Initial State**:
```typescript
{
  messages: [],
  input: "",
  isLoading: false,
  error: null,
}
```

---

### Message Streaming and Reception

#### What Happens on `handleSubmit()`

1. **Create user message**: `{ role: "user", content: input }`
2. **Send to API**: POST `/api/chat` with `messages` array
3. **Open SSE stream**: Connect to streaming response
4. **Parse events**: Each SSE event is a partial UIMessage
5. **Accumulate parts**: Build up message.content array
6. **Update state**: React re-renders with new messages
7. **Clear input**: Text field resets to empty

---

#### Example Message Object

```typescript
// User message
{
  role: "user",
  content: "Audit google.com"
}

// Assistant message (after streaming completes)
{
  role: "assistant",
  content: [
    {
      type: "text",
      text: "I'll audit google.com for you."
    },
    {
      type: "tool-runSiteAudit",
      state: "input-streaming",
      input: { domain: "google.com" }
    },
    {
      type: "tool-runSiteAudit",
      state: "input-available",
      input: { domain: "google.com" }
    },
    {
      type: "tool-runSiteAudit",
      state: "output-available",
      input: { domain: "google.com" },
      output: {
        domain: "google.com",
        score: 92,
        grade: "A",
        issues: [],
        checkedAt: "2024-01-01T12:00:00.000Z"
      }
    }
  ]
}
```

---

### Component Rendering Logic

#### Main Rendering Pattern

**File**: `app/page.tsx` line ~40

```typescript
return (
  <div className="flex flex-col h-screen">
    {/* Messages Container */}
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div key={index}>
          {message.role === 'user' ? (
            <div className="bg-blue-100 p-3 rounded">
              {message.content}
            </div>
          ) : (
            // Assistant message with parts
            <div>
              {message.content instanceof Array ? (
                message.content.map((part, partIndex) => (
                  <RenderPart key={partIndex} part={part} />
                ))
              ) : (
                <div>{message.content}</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Input Form */}
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type your audit request..."
      />
      <button type="submit">Send</button>
    </form>
  </div>
);
```

#### Part Rendering Logic

**Pseudocode for `RenderPart()`**:

```typescript
function RenderPart(part) {
  if (part.type === "text") {
    return <TextMessage text={part.text} />;
  }

  if (part.type.startsWith("tool-")) {
    const toolName = part.type.slice(5); // "runSiteAudit", "deleteAuditReport"
    
    switch (part.state) {
      case "input-streaming":
        return <ToolInputStreaming label={`Preparing ${toolName}...`} />;
      
      case "input-available":
        if (toolName === "deleteAuditReport" && !part.approval) {
          return <DeleteApprovalPrompt input={part.input} />;
        }
        return <ToolInputAvailable label={`Executing ${toolName}...`} />;
      
      case "output-available":
        if (toolName === "runSiteAudit") {
          return <AuditCard result={part.output} />;
        } else if (toolName === "deleteAuditReport") {
          return <DeleteResultCard result={part.output} />;
        }
      
      case "output-error":
        return <ToolOutputError message={part.error} />;
      
      case "output-denied":
        return <ToolOutputDenied />;
      
      default:
        return <div>Unknown state: {part.state}</div>;
    }
  }

  return null;
}
```

---

## Tool Definition and Execution

### Tool Registration

**File**: `lib/tool.ts`

```typescript
export const chatTools = [
  runSiteAudit,
  deleteAuditReport,
];
```

Both tools are passed to `streamText()` in the backend.

---

### Tool 1: runSiteAudit

#### Definition

```typescript
export const runSiteAudit = tool({
  description: "Run an SEO audit for a given website domain and return a structured score report.",
  parameters: z.object({
    domain: z.string()
      .describe('The website domain to audit, e.g. "example.com"')
  }),
  execute: async ({ domain }) => {
    // Implementation...
  },
});
```

#### Execution Flow

1. **LLM generates**: `{ domain: "example.com" }`
2. **Zod validates**: `domain` is a non-empty string
3. **execute() called**:
   ```typescript
   - Simulate 600ms latency
   - Calculate score: Math.random() * 41 + 60 (range 60-100)
   - Determine grade:
     * score >= 90: 'A'
     * score >= 75: 'B'
     * score >= 60: 'C'
     * else: 'D'
   - Generate issues based on score:
     * score < 65: ['Poor mobile performance', 'Missing meta tags']
     * score < 80: ['Optimize images']
     * else: []
   - Return: { domain, score, grade, issues, checkedAt }
   ```
4. **Result streamed**: Sent to UI as `output-available` part
5. **Rendered**: Displayed in AuditCard component

#### Approval Requirement
- **None** – executes immediately after input is available
- State: input-streaming → input-available → output-available

---

### Tool 2: deleteAuditReport

#### Definition

```typescript
export const deleteAuditReport = tool({
  description: "Permanently delete a previously generated SEO audit report.",
  parameters: z.object({
    domain: z.string()
      .describe('The domain whose report should be deleted'),
    reportId: z.string()
      .describe('The ID of the report to delete')
  }),
  execute: async ({ domain, reportId }) => {
    // Implementation...
  },
});
```

#### Approval Configuration

**File**: `app/api/chat/route.ts` line ~49

```typescript
toolApproval: {
  deleteAuditReport: 'user-approval',
}
```

**Effect**:
- When LLM calls deleteAuditReport, execution pauses
- Tool reaches `input-available` state but does NOT execute
- State advances to `approval-requested`
- Frontend renders DeleteApprovalPrompt
- User clicks "Confirm" or "Cancel"
- Frontend sends `addToolApprovalResponse(toolCallId, approved)`
- LLM receives user decision and either:
  - Calls execute() if approved → output-available
  - Skips execute() if denied → output-denied

#### Execution Flow (Approval Path)

1. **LLM generates**: `{ domain: "example.com", reportId: "report-123" }`
2. **Zod validates**: Both strings
3. **Approval Gate**: Check `toolApproval.deleteAuditReport === 'user-approval'`
4. **Pause**: State = `approval-requested`
5. **Frontend renders**: DeleteApprovalPrompt with confirm/cancel buttons
6. **User decision**:
   - **APPROVED** → execute() continues
   - **DENIED** → output = `{ error: "User denied..." }` → state = `output-denied`
7. **If approved, execute()**:
   ```typescript
   - Simulate 400ms latency
   - Return: { domain, reportId, deleted: true, deletedAt }
   ```
8. **Result streamed**: Sent to UI as `output-available` or `output-denied`
9. **Rendered**: DeleteResultCard or ToolOutputDenied

#### State Sequence

```
input-streaming
    ↓
input-available (but paused before execution)
    ↓
approval-requested (renders DeleteApprovalPrompt)
    ↓ (user clicks Confirm/Cancel)
approval-responded (brief transition state)
    ↓ (if approved)
output-available (DeleteResultCard) or output-denied (ToolOutputDenied)
```

---

## State Machine and Transitions

### Complete State Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    TOOL STATE MACHINE                           │
└─────────────────────────────────────────────────────────────────┘

For NON-APPROVAL tools (runSiteAudit):

input-streaming ──→ input-available ──→ output-available
                                     │
                                     └──→ output-error (terminal)

For APPROVAL tools (deleteAuditReport):

input-streaming ──→ input-available ──→ approval-requested
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                              (User Approves)   (User Denies)
                                    │                 │
                                    ↓                 ↓
                            approval-responded  output-denied (terminal)
                                    │
                                    ↓
                            output-available (terminal) or output-error
```

---

### State Definitions and Transitions

| State | Tool Phase | Triggered | Next State(s) | Terminal |
|-------|-----------|-----------|--------------|----------|
| `input-streaming` | LLM generating parameters | LLM starts tool call | `input-available` | No |
| `input-available` | Parameters complete | LLM finishes streaming input | `output-available` (no approval) OR `approval-requested` (approval) | No |
| `output-available` | Tool executed successfully | Tool returns result | None (final) | **Yes** |
| `output-error` | Tool execution failed | Tool throws error | None (final) | **Yes** |
| `approval-requested` | Awaiting user decision | Tool marked with `user-approval` | `approval-responded` | No |
| `approval-responded` | User submitted decision | User clicks confirm/cancel | `output-available` (approved) OR `output-denied` (denied) | No |
| `output-denied` | User rejected operation | User clicked cancel on approval | None (final) | **Yes** |

---

### Approval Response Handling

**Frontend**:
```typescript
const handleApprovalResponse = (toolCallId: string, approved: boolean) => {
  // addToolApprovalResponse() from useChat hook
  addToolApprovalResponse({
    toolCallId,
    result: approved ? "approved" : "denied",
  });
};
```

**Backend**:
- LLM receives approval decision
- If approved: executes tool immediately
- If denied: returns `output-denied` state
- LLM continues conversation with decision context

---

## Error Handling

### Error Categories

#### 1. Configuration Errors

**When**: Startup or before first request

**Cause**: Missing environment variables

**Example**:
```
Error: GROQ_API_KEY not configured
```

**Handling**:
```typescript
if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY not configured');
}
```

**User Experience**: Error message in chat, request fails

---

#### 2. Network Errors

**When**: During LLM API call

**Cause**: Groq API unreachable, network timeout

**Example**:
```
Error: fetch failed: ECONNREFUSED 127.0.0.1:443
```

**Handling**: Caught by try-catch in POST handler, returned as error message

**User Experience**: "Tool failed: {error message}" in output-error state

---

#### 3. Validation Errors

**When**: LLM provides invalid tool input

**Cause**: Zod schema validation failure

**Example**:
```
Error: domain must be a string
```

**Handling**: Zod throws ZodError, caught by AI SDK

**User Experience**: AI SDK returns error context, state = `output-error`

---

#### 4. Tool Execution Errors

**When**: During tool execute() function

**Cause**: Unexpected exception in tool logic

**Example**:
```typescript
// In tool execute:
throw new Error("Domain validation failed");
```

**Handling**: Exception caught by AI SDK, returned as tool error

**User Experience**: output-error component displays error message

---

#### 5. Streaming Errors

**When**: During SSE transmission

**Cause**: Network disconnect, browser close

**Handling**: Frontend reconnects via useChat hook, server sends buffered messages

**User Experience**: Automatic recovery (transparent to user)

---

### Error Boundary

**File**: `app/api/chat/route.ts` line ~85

```typescript
try {
  // Main flow
} catch (error) {
  return new Response(
    `data: ${JSON.stringify({ 
      role: "assistant", 
      content: errorHandler(error) 
    })}\n\n`,
    { 
      status: 500, 
      headers: { 'Content-Type': 'text/event-stream' } 
    }
  );
}
```

**Guarantees**:
- All errors caught and returned as SSE event
- Response always has proper headers
- Frontend receives error in consistent format
- User sees error message in UI

---

## Type Safety

### TypeScript Integration Points

#### 1. Message Types

```typescript
import { Message } from 'ai';

interface UIMessage extends Message {
  content: string | ContentPart[];
}

interface ContentPart {
  type: string; // "text", "tool-*"
  [key: string]: unknown;
}
```

---

#### 2. Tool Input/Output Types

**Via Zod Schemas**:
```typescript
const runSiteAuditInput = z.object({
  domain: z.string(),
});
type RunSiteAuditInput = z.infer<typeof runSiteAuditInput>;

// Zod derives TypeScript type from schema:
// { domain: string }
```

**Tool Output** (implicit from execute return):
```typescript
type AuditResult = {
  domain: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  issues: string[];
  checkedAt: string;
};
```

---

#### 3. Component Props Types

**AuditCard**:
```typescript
interface AuditCardProps {
  result: AuditResult;
}
```

**DeleteApprovalPrompt**:
```typescript
interface DeleteApprovalPromptProps {
  input: {
    domain: string;
    reportId: string;
  };
  onRespond: (approved: boolean) => void;
}
```

---

#### 4. Type Flow

```
Zod Schema (tool.ts)
    ↓ (z.infer)
TypeScript Type (e.g., AuditResult)
    ↓ (import)
Component Props (e.g., AuditCardProps)
    ↓ (React)
Type-checked JSX rendering
```

---

### Zod Schema Validation

**Schema Definition**:
```typescript
const params = z.object({
  domain: z.string()
    .describe('Domain to audit'),
  reportId: z.string().optional()
    .describe('Report ID (optional)'),
});
```

**Validation Points**:
1. **LLM Input**: Zod validates LLM's tool call arguments
2. **Type Inference**: TypeScript extracts type from schema
3. **Runtime Safety**: Invalid inputs rejected at runtime
4. **Error Messages**: Zod provides validation error details

**Example Validation**:
```typescript
// Valid
{ domain: "example.com" } ✓

// Invalid
{ domain: 123 } ✗ → "domain must be a string"
{ domain: "" } ✗ → "domain cannot be empty"
{ reportId: null } ✗ → "reportId must be a string or undefined"
```

---

### Frontend Type Safety

**useChat Hook Types**:
```typescript
const {
  messages,        // Message[] (AI SDK type)
  input,           // string
  handleInputChange,  // (e: ChangeEvent) => void
  handleSubmit,    // (e: FormEvent) => void
} = useChat({
  api: '/api/chat',
});
```

**Component Rendering**:
```typescript
messages.map((msg: Message) =>
  msg.content instanceof Array
    ? msg.content.map((part: ContentPart) => ...)
    : msg.content as string
)
```

---

## Summary

**Backend**:
1. Receive message → `streamText()` with tools
2. Emit state transitions via `toUIMessageStream()`
3. Send SSE events to client
4. Handle errors gracefully

**Frontend**:
1. `useChat()` hook manages state and SSE connection
2. Render messages by switching on part type and state
3. Map tool outputs to component hierarchy
4. Handle user approval with `addToolApprovalResponse()`

**Tools**:
1. Defined with description, parameters (Zod), execute()
2. LLM calls tools based on user request
3. Tool execution returns structured output
4. Output rendered as typed React components

**Types**:
- Zod schemas → TypeScript types → Component props
- Full type safety across tool definition → execution → rendering
- Validation at multiple layers (LLM, Zod, React)

