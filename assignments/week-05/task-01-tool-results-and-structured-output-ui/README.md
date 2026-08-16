# FE-07 – Tool Results and Structured Output in the UI

## Overview

FlyRank Audit Assistant is a real-time SEO audit and report management application that demonstrates AI SDK tool calling with structured output rendering and approval workflows. The application streams tool execution states to the UI, providing immediate visual feedback for each phase of tool invocation.

## Assignment Objective

Build a Next.js application that implements:

1. **Tool Execution Lifecycle** – Display real-time feedback for each tool state
2. **Structured Output Rendering** – Present tool results as formatted, type-safe UI components
3. **Tool State Visualization** – Show distinct visual states during tool streaming and execution
4. **Approval Workflows** – Implement user approval gates for destructive operations
5. **Streaming Integration** – Leverage AI SDK streaming to update UI progressively

## Features

✅ **Two Distinct Tool Implementations**
- Non-approval workflow: Site audit tool with immediate execution
- Approval workflow: Report deletion with user confirmation gate

✅ **Complete Tool Lifecycle States**
- Input streaming and preparation
- Input available and execution
- Output success, errors, and denials
- Approval request and response handling

✅ **Rich UI Components**
- Streaming state indicators (animated pulsing and spinning)
- Structured result card with circular progress indicator
- Color-coded grade badges
- Approval confirmation prompts
- Error and denial messages

✅ **Real-time Streaming**
- Progressive UI updates as tool executes
- Message streaming via AI SDK transport
- Automatic message dispatching on approval completion

✅ **Type-Safe Tool Definition**
- Zod schema validation for all inputs and outputs
- Structured return types with full TypeScript support
- Proper error handling in streaming context

## Tech Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.3.1 | Server and API routes |
| React | 19.2.8 | UI component framework |
| TypeScript | 5.x | Type safety |
| AI SDK | 7.0.66 | Tool calling and streaming |
| @ai-sdk/react | 4.0.69 | React hooks for chat |
| @ai-sdk/openai | 4.0.42 | OpenAI-compatible provider |
| Zod | 4.4.3 | Schema validation |
| Tailwind CSS | 4.3.3 | Styling |
| Groq API | Latest | LLM inference (OpenAI-compatible) |

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main chat UI with tool rendering
│   ├── globals.css             # Tailwind configuration
│   └── api/
│       └── chat/
│           └── route.ts        # Streaming chat endpoint
├── components/
│   ├── ToolStateViews.tsx      # State indicator components
│   ├── AuditCard.tsx           # Structured audit result display
│   └── DeleteReportUI.tsx      # Approval and deletion result components
├── lib/
│   └── tool.ts                 # Tool definitions and schemas
└── [config files]
```

## Tool Overview

### 1. runSiteAudit

**Purpose**: Perform SEO analysis on a website domain and return structured audit results.

**Features**:
- Simulated latency (600ms) for realistic tool execution
- Deterministic score generation (60-100 range)
- Dynamic issue detection based on score thresholds
- Letter grade assignment (A/B/C/D)
- ISO timestamp of audit execution

**States**: input-streaming → input-available → output-available (or output-error)

### 2. deleteAuditReport

**Purpose**: Permanently delete a previously generated audit report with explicit user approval.

**Features**:
- Requires explicit user approval before execution
- Simulated latency (400ms)
- Audit trail with deletion timestamp
- Support for both user-approved and automatically-denied scenarios

**States**: input-streaming → input-available → approval-requested → approval-responded → output-available (or output-error/output-denied)

## Tool Lifecycle

### State: input-streaming

**Purpose**: Indicates that the LLM is streaming tool input parameters.

**Timing**: Appears immediately when LLM begins generating tool arguments.

**Visual Appearance**: 
- Dashed border with gray background
- Pulsing gray dot animation
- "Preparing [tool] request..." label

**Transition**: Automatically transitions to `input-available` once streaming completes.

**Semantics**: Tool parameters are still being determined; no execution has begun.

---

### State: input-available

**Purpose**: Indicates that all tool input parameters have been streamed and are ready for execution.

**Timing**: Appears after input streaming completes, before execution begins.

**Visual Appearance**:
- Blue border with light blue background
- Animated ping dot animation
- Contextual label: "Auditing {domain}..." or "Waiting for approval decision..."

**Transition**: 
- For non-approval tools: transitions to `output-available` after execution
- For approval tools: transitions to `approval-requested`

**Semantics**: Tool has complete parameters; execution is in progress or awaiting approval.

---

### State: output-available

**Purpose**: Tool execution completed successfully and structured output is ready to display.

**Timing**: Appears after successful tool execution.

**Visual Appearance**: Varies by tool
- `AuditCard`: Circular score gauge, grade badge, issues list
- `DeleteResultCard`: Confirmation message with deletion timestamp

**Transition**: Final state; does not transition further.

**Semantics**: Tool produced valid output; operation completed successfully.

---

### State: output-error

**Purpose**: Tool execution failed due to an error condition.

**Timing**: Appears if tool throws an exception or returns an error state.

**Visual Appearance**:
- Red border with red background
- Warning emoji icon
- Error message text: "Tool failed: {error message}"

**Transition**: Final state; error is terminal.

**Semantics**: Tool encountered an exception; no retry is automatic.

---

### State: approval-requested

**Purpose**: Execution is paused pending user approval of a sensitive operation.

**Timing**: Appears when a tool marked with `toolApproval: "user-approval"` reaches execution phase.

**Visual Appearance**: Conditional
- If `isAutomatic === true`: Shows `ToolInputAvailable` with "Checking approval automatically..." label
- If `isAutomatic === false`: Shows `DeleteApprovalPrompt` with confirm/cancel buttons

**Transition**: 
- Automatically advances to `approval-responded` once user submits decision
- User can choose "Approve" or "Deny"

**Semantics**: User explicitly controls whether a destructive operation proceeds.

---

### State: approval-responded

**Purpose**: User has submitted an approval decision; operation proceeding or cancelling.

**Timing**: Appears immediately after user clicks confirm or cancel button.

**Visual Appearance**:
- Blue background state indicator
- Label shows approval result: "Approved — deleting report..." or "Denied — cancelling..."

**Transition**: 
- If approved: transitions to `output-available`
- If denied: transitions to `output-denied`

**Semantics**: User decision is recorded and communicated back to LLM.

---

### State: output-denied

**Purpose**: User rejected an approval request; operation was not executed.

**Timing**: Appears after user clicks deny button.

**Visual Appearance**:
- Amber border with amber background
- Blocked emoji icon (🚫)
- Message: "Action was not approved"

**Transition**: Final state; does not transition further.

**Semantics**: Tool was not executed due to user denial; no error occurred.

## Tool Contract

### Tool: runSiteAudit

| Property | Value |
|----------|-------|
| **Name** | `runSiteAudit` |
| **Description** | Run an SEO audit for a given website domain and return a structured score report (score, grade, issues found). |
| **Purpose** | Analyze domain SEO metrics and return audit results for display |
| **Approval Required** | No |

**Input Schema (Zod)**:
```typescript
z.object({
  domain: z.string()
    .describe('The website domain to audit, e.g. "example.com"')
})
```

**Return Shape (TypeScript)**:
```typescript
{
  domain: string;           // The audited domain
  score: number;            // Audit score (60-100)
  grade: 'A' | 'B' | 'C' | 'D';  // Letter grade
  issues: string[];         // Array of identified issues
  checkedAt: string;        // ISO 8601 timestamp
}
```

---

### Tool: deleteAuditReport

| Property | Value |
|----------|-------|
| **Name** | `deleteAuditReport` |
| **Description** | Permanently delete a previously generated SEO audit report for a domain. Destructive — requires user confirmation before running. |
| **Purpose** | Remove audit records with explicit user approval gate |
| **Approval Required** | Yes (`user-approval`) |

**Input Schema (Zod)**:
```typescript
z.object({
  domain: z.string()
    .describe('The domain whose report should be deleted'),
  reportId: z.string()
    .describe('The ID of the report to delete')
})
```

**Return Shape (TypeScript)**:
```typescript
{
  domain: string;        // The domain that was deleted
  reportId: string;      // The report ID that was deleted
  deleted: boolean;      // Always true on success
  deletedAt: string;     // ISO 8601 timestamp of deletion
}
```

## Structured UI Components

### ToolInputStreaming

**Purpose**: Display a state indicator for the input-streaming phase.

**Props**:
- `label: string` – Description of the current streaming action

**Appearance**: Dashed gray border, pulsing dot animation, gray text.

**Use Case**: Show user that LLM is generating tool arguments.

---

### ToolInputAvailable

**Purpose**: Display a state indicator for the input-available and approval-responded phases.

**Props**:
- `label: string` – Contextual status message

**Appearance**: Blue border with light blue background, animated ping dot, blue text.

**Use Case**: Show user that tool is executing or awaiting decision.

---

### ToolOutputError

**Purpose**: Display an error message when tool execution fails.

**Props**:
- `message: string` – Error description

**Appearance**: Red border, warning emoji, red text with bold "Tool failed:" prefix.

**Use Case**: Communicate execution failures to user.

---

### ToolOutputDenied

**Purpose**: Display a message when user denies an approval request.

**Props**:
- `reason?: string` – Optional explanation for denial

**Appearance**: Amber border, blocked emoji (🚫), amber text.

**Use Case**: Confirm that an operation was intentionally cancelled.

---

### AuditCard

**Purpose**: Render structured audit results in a visually rich format.

**Props**:
- `result: AuditResult` – Audit output from runSiteAudit tool

**Features**:
- Circular SVG progress gauge showing score percentage
- Color-coded grade badge (A: green, B: blue, C: amber, D: red)
- Bulleted list of issues (or "No issues found" message)
- Timestamp formatted in user's locale

**Appearance**: White card with shadow, rounded corners, structured layout.

---

### DeleteApprovalPrompt

**Purpose**: Render a confirmation dialog for destructive delete operation.

**Props**:
- `input: DeleteInput` – The delete parameters (domain, reportId)
- `onRespond: (approved: boolean) => void` – Callback for user decision

**Features**:
- Warning context with domain and reportId names
- "Confirm delete" button (red, destructive styling)
- "Cancel" button (neutral styling)

**Appearance**: Light red background, red text, inline button layout.

---

### DeleteResultCard

**Purpose**: Render confirmation that deletion completed successfully.

**Props**:
- `result: DeleteOutput` – Response from deleteAuditReport tool

**Features**:
- Trash emoji (🗑️) confirmation icon
- Clear message with domain and reportId
- Deletion timestamp in user's locale

**Appearance**: White card with shadow, similar to AuditCard structure.

## Streaming Data

### AI SDK Streaming Architecture

The application uses AI SDK's **streaming UI message protocol** to deliver tool state updates progressively:

1. **Frontend Hook** (`useChat`):
   - Sends user message via `sendMessage()`
   - Receives streamed `UIMessage[]` objects
   - Each message contains `parts` array with tool parts and text parts
   - Tool parts include state, input, output, and approval metadata

2. **Backend Endpoint** (`/api/chat`):
   - `streamText()` executes LLM with tool definitions
   - `toUIMessageStream()` wraps stream in UI-friendly format
   - `createUIMessageStreamResponse()` sends as Server-Sent Events (SSE)
   - Error handler catches exceptions and sends to UI

3. **Tool Execution Flow**:
   - LLM streams tool invocation → `input-streaming` state
   - Input parsing complete → `input-available` state
   - Tool execute() called → execution state
   - Result returned → `output-available` state
   - Each state is streamed immediately for real-time UI updates

4. **Approval Flow**:
   - Tool marked with `toolApproval: "user-approval"`
   - Execution pauses → `approval-requested` state
   - `addToolApprovalResponse()` sends user decision
   - LLM resumes with decision → `approval-responded` then output

## Installation

### Prerequisites
- Node.js 18+ or compatible runtime
- npm, yarn, pnpm, or bun package manager
- Groq API key (from https://console.groq.com)

### Setup Steps

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd task-01-tool-results-and-structured-output-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment file**
   ```bash
   echo "GROQ_API_KEY=gsk_..." > .env.local
   ```
   Replace `gsk_...` with your Groq API key.

4. **Verify installation**
   ```bash
   npm run lint
   ```

## Running the Project

### Development Mode

```bash
npm run dev
```

Application starts at `http://localhost:3000`.

- Auto-reloads on file changes
- Shows build errors in browser overlay
- Streams tool execution states in real time

### Production Build

```bash
npm run build
npm run start
```

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## Deliverables

### Core Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main chat UI with tool state rendering |
| `app/api/chat/route.ts` | Streaming backend endpoint |
| `lib/tool.ts` | Tool definitions with Zod schemas |
| `components/ToolStateViews.tsx` | State indicator components |
| `components/AuditCard.tsx` | Structured audit result display |
| `components/DeleteReportUI.tsx` | Approval and result components |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and setup (this file) |
| `IMPLEMENTATION.md` | Detailed architecture and flow documentation |
| `TOOL_DOCUMENTATION.md` | Complete tool reference |
| `UI_STATES.md` | Tool state lifecycle explanation |
| `EVIDENCE.md` | Screenshot checklist for demonstration |

### Key Features Demonstrated

✅ **Tool Input Streaming** – Real-time display of LLM-generated parameters  
✅ **Tool State Management** – Complete lifecycle visualization  
✅ **Structured Output** – Type-safe tool results with rich UI rendering  
✅ **Approval Workflows** – User confirmation gates for sensitive operations  
✅ **Error Handling** – Graceful error display and recovery  
✅ **Real-time Streaming** – Progressive UI updates via Server-Sent Events  
✅ **Type Safety** – Full TypeScript and Zod schema coverage  

### Learning Outcomes

Upon completing this project, you will understand:

- How AI SDK streaming delivers real-time tool state updates
- Building reactive UIs that respond to tool execution phases
- Implementing approval workflows for sensitive operations
- Designing type-safe tool contracts with Zod
- Rendering structured data with rich React components
- Server-Sent Events streaming in Next.js
- Production-ready error handling patterns

---

**Created for FE-07: Tool Results and Structured Output in the UI**
