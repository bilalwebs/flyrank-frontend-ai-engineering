# UI_STATES.md – Tool State Lifecycle and Visualization

## Table of Contents

1. [Overview](#overview)
2. [State: input-streaming](#state-input-streaming)
3. [State: input-available](#state-input-available)
4. [State: output-available](#state-output-available)
5. [State: output-error](#state-output-error)
6. [State: approval-requested](#state-approval-requested)
7. [State: approval-responded](#state-approval-responded)
8. [State: output-denied](#state-output-denied)
9. [State Transition Diagram](#state-transition-diagram)
10. [Component-to-State Mapping](#component-to-state-mapping)

---

## Overview

Tool states represent the lifecycle phases of a tool invocation from parameter generation through result display. Each state has distinct visual characteristics and semantic meaning.

### State Categories

| Category | States | Characteristic |
|----------|--------|-----------------|
| **Input Phases** | input-streaming, input-available | Generating or preparing tool parameters |
| **Execution Phases** | (implicit during output-available transition) | Actually running the tool |
| **Result Phases** | output-available, output-error, output-denied | Showing results or failures |
| **Approval Phases** | approval-requested, approval-responded | Handling user authorization gates |

### Quick Reference Table

| State | Phase | Triggered By | Next State | Visual | Terminal |
|-------|-------|--------------|-----------|--------|----------|
| input-streaming | Input | LLM starts generating | input-available | Gray dashed | No |
| input-available | Input | Input complete | output-* or approval-* | Blue | No |
| approval-requested | Approval | Tool marked approval | approval-responded | Red/Warning | No |
| approval-responded | Approval | User submits decision | output-* | Blue (brief) | No |
| output-available | Result | Tool succeeds | None | Green/Themed | **Yes** |
| output-error | Result | Tool fails | None | Red | **Yes** |
| output-denied | Result | User denies approval | None | Amber | **Yes** |

---

## State: input-streaming

### Purpose

Indicates that the LLM is **actively streaming tool input parameters** from its reasoning process to the backend. The tool's input schema is not yet complete; the LLM is still generating parameters character by character.

### When It Appears

**Trigger**: LLM begins generating a tool call
- User asks a question that requires a tool
- LLM invokes a tool and starts streaming its arguments
- Backend receives partial/incomplete parameter data from LLM streaming

**Timing**: Appears immediately when tool call begins, lasts until input streaming completes

**Duration**: Typically 100-300ms (very brief)

### Visual Appearance

#### Component Used
`ToolInputStreaming` (from `components/ToolStateViews.tsx`)

#### HTML/Tailwind Styling
```html
<div className="border-2 border-dashed border-gray-400 bg-gray-50 rounded-lg p-4 flex items-center gap-2">
  {/* Pulsing dot animation */}
  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
  
  {/* Label */}
  <span className="text-gray-600 text-sm font-medium">
    Preparing {toolName} request...
  </span>
</div>
```

#### Visual Details

| Aspect | Value |
|--------|-------|
| **Border** | 2px dashed gray-400 |
| **Background** | Light gray (bg-gray-50) |
| **Text Color** | Medium gray (text-gray-600) |
| **Animation** | Pulsing dot (opacity 0.5 → 1.0) |
| **Emoji** | None (just pulsing dot) |
| **Corner Radius** | lg (8px) |
| **Padding** | 4 (1rem) |

#### Example Screenshots

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│  • Preparing runSiteAudit... │  (dot pulsing)
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘

┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│ • Preparing deleteAuditReport... │  (dot pulsing)
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

### Transition Behavior

#### Next State
When input streaming completes: `input-available`

#### Automatic Transition
Yes — transitions automatically (user does not interact with this state)

#### Transition Timing
- Immediate when LLM finishes generating input parameters
- No explicit event; driven by AI SDK
- Typically within 100-300ms

### Semantics and Meaning

**Semantic Meaning**:
- Tool parameters are currently being determined by LLM
- User should see immediate feedback that computation is happening
- Tool has not begun executing yet
- No user decision needed

**User Perspective**:
- "The AI is figuring out what parameters to use"
- "Something is loading/processing"
- No action required; wait for it to complete

### Implementation Details

#### Rendering Condition

```typescript
if (part.type.startsWith('tool-') && part.state === 'input-streaming') {
  return (
    <ToolInputStreaming 
      label={`Preparing ${toolName} request...`}
    />
  );
}
```

#### Component Props

```typescript
interface ToolInputStreamingProps {
  label: string;  // e.g., "Preparing runSiteAudit request..."
}
```

#### Backend Emission

```typescript
// AI SDK emits this part during streaming:
{
  type: "tool-runSiteAudit",
  state: "input-streaming",
  input: { domain: "exa..." }  // Partial data
}
```

---

## State: input-available

### Purpose

Indicates that **all tool input parameters have been streamed and validated successfully**. The tool has complete, valid parameters and is ready for execution or approval.

### When It Appears

**Trigger**: Input streaming completes and Zod validation passes
- LLM finishes generating tool arguments
- Zod schema validates the complete input
- Backend transitions from input-streaming state

**Timing**: Appears after input-streaming, before tool execution or approval

**Duration**: Lasts until execution begins or approval gate is reached (typically 50ms-1s)

### Visual Appearance

#### Component Used
`ToolInputAvailable` (from `components/ToolStateViews.tsx`)

#### HTML/Tailwind Styling
```html
<div className="border-2 border-blue-400 bg-blue-50 rounded-lg p-4 flex items-center gap-2">
  {/* Animated ping dot */}
  <div className="relative w-2 h-2">
    <div className="absolute w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
  </div>
  
  {/* Label */}
  <span className="text-blue-600 text-sm font-medium">
    {label}
  </span>
</div>
```

#### Visual Details

| Aspect | Value |
|--------|-------|
| **Border** | 2px solid blue-400 |
| **Background** | Light blue (bg-blue-50) |
| **Text Color** | Medium blue (text-blue-600) |
| **Animation** | Ping dot (expands/fades) |
| **Emoji** | None (animated ping dot) |
| **Corner Radius** | lg (8px) |
| **Padding** | 4 (1rem) |

#### Contextual Labels

The label varies based on context:

| Tool | Label | Meaning |
|------|-------|---------|
| runSiteAudit | "Auditing {domain}..." | Executing audit |
| deleteAuditReport | "Checking approval automatically..." | Paused at approval gate (automatic) |
| deleteAuditReport | "Waiting for approval decision..." | Paused at approval gate (user) |
| deleteAuditReport | "Approved — deleting report..." | User approved; proceeding |

#### Example Screenshots

```
┌──────────────────────────────────┐
│ ◉ Auditing example.com...       │  (dot animating)
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ ◉ Waiting for approval decision..│  (dot animating)
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ ◉ Approved — deleting report...  │  (dot animating)
└──────────────────────────────────┘
```

### Transition Behavior

#### Next States

| Condition | Next State | Reason |
|-----------|-----------|--------|
| Tool has no approval gate | output-available | Tool executes immediately |
| Tool has approval gate (no user required) | output-available | Auto-approval continues execution |
| Tool has approval gate (user required) | approval-requested | Execution paused; awaits user |
| Tool execution fails | output-error | Exception during execute() |

#### Automatic Transition
Depends on tool configuration:
- No approval gate → automatic (to output-available)
- Approval gate → blocked at approval-requested

#### Transition Timing
- No approval: Immediate → output-available (or output-error)
- With approval: Remains until user responds
- Execution phase: 400-600ms typically

### Semantics and Meaning

**Semantic Meaning**:
- Tool has validated, executable parameters
- Execution is in progress or awaiting decision
- User can trust that parameters are valid
- No data loss or validation errors

**User Perspective**:
- "The AI has determined what to do"
- "The operation is running"
- "The system is waiting for your permission"
- "A decision has been made; waiting for confirmation"

### Implementation Details

#### Rendering Condition

```typescript
if (part.type.startsWith('tool-') && part.state === 'input-available') {
  // Special case: approval-requested state rendered by DeleteApprovalPrompt
  if (part.type === 'tool-deleteAuditReport' && part.approval) {
    // Render DeleteApprovalPrompt instead
    return <DeleteApprovalPrompt input={part.input} ... />;
  }
  
  return (
    <ToolInputAvailable 
      label={getLabel(part)}
    />
  );
}
```

#### Component Props

```typescript
interface ToolInputAvailableProps {
  label: string;  // Contextual status message
}
```

#### Backend Emission

```typescript
{
  type: "tool-runSiteAudit",
  state: "input-available",
  input: { domain: "example.com" }
}
```

---

## State: output-available

### Purpose

Indicates that **tool execution completed successfully** and a structured result is ready to display. This is the terminal success state.

### When It Appears

**Trigger**: Tool execute() completes and returns valid result
- Tool execution finishes without errors
- Result passes validation (if any)
- For approval tools: user approved and execution completed

**Timing**: Appears after input-available and tool execution phase

**Duration**: Persistent (terminal state)

### Visual Appearance

#### Component Used (Tool-Specific)

##### For runSiteAudit: AuditCard

```html
<div className="border-2 border-blue-300 rounded-lg p-6 bg-white">
  {/* Circular progress gauge */}
  <svg width="120" height="120">
    <!-- Circle showing score% -->
  </svg>
  
  {/* Grade badge */}
  <span className={gradeClass}>
    {result.grade}
  </span>
  
  {/* Issues list */}
  <ul className="mt-4 space-y-2">
    {result.issues.map(issue => (
      <li key={issue} className="text-sm">• {issue}</li>
    ))}
  </ul>
  
  {/* Timestamp */}
  <small className="text-gray-500">
    {new Date(result.checkedAt).toLocaleString()}
  </small>
</div>
```

##### For deleteAuditReport: DeleteResultCard

```html
<div className="border-2 border-green-300 rounded-lg p-6 bg-white">
  <div className="flex items-center gap-3 mb-4">
    <span className="text-4xl">🗑️</span>
    <h3 className="font-bold text-gray-800">Deletion Confirmed</h3>
  </div>
  
  <p className="text-gray-700 mb-2">
    Report <strong>{result.reportId}</strong> for <strong>{result.domain}</strong>
    has been successfully deleted.
  </p>
  
  <small className="text-gray-500">
    {new Date(result.deletedAt).toLocaleString()}
  </small>
</div>
```

#### Visual Details: AuditCard

| Aspect | Value |
|--------|-------|
| **Border** | 2px solid blue-300 |
| **Background** | White |
| **Container** | Card with shadow, rounded corners |
| **Score Display** | SVG circular gauge |
| **Grade Badge** | Color-coded (A: green, B: blue, C: amber, D: red) |
| **Font** | Small for issues, smaller for timestamp |

#### Visual Details: DeleteResultCard

| Aspect | Value |
|--------|-------|
| **Border** | 2px solid green-300 |
| **Background** | White |
| **Icon** | Large trash emoji (🗑️) |
| **Text** | Confirmation message with bold domain/reportId |
| **Timestamp** | Muted gray text |

#### Example Screenshots

```
AuditCard (runSiteAudit success):
┌─────────────────────────────────┐
│           ◯◯◯◯◯◯◯◯              │
│          ◯       ◯ 85            │
│         ◯         ◯              │
│        ◯    A     ◯              │
│         ◯         ◯              │
│          ◯       ◯               │
│           ◯◯◯◯◯◯◯◯               │
│                                  │
│ Issues:                          │
│ • Optimize images               │
│                                  │
│ Checked at: Jan 15, 2024...      │
└─────────────────────────────────┘

DeleteResultCard (deleteAuditReport success):
┌─────────────────────────────────┐
│  🗑️  Deletion Confirmed         │
│                                  │
│ Report report-001 for            │
│ example.com has been deleted.    │
│                                  │
│ Deleted at: Jan 15, 2024...      │
└─────────────────────────────────┘
```

### Transition Behavior

#### Next State
None — **terminal state**

#### User Interaction
- No automatic transitions
- User can view result
- User can request new operation (submit new message)

### Semantics and Meaning

**Semantic Meaning**:
- Tool operation completed successfully
- Result is valid and displayable
- No errors occurred
- Final state of this tool invocation

**User Perspective**:
- "The operation succeeded"
- "Here are your results"
- "I can trust this data"
- "Ready for next action"

### Implementation Details

#### Rendering Condition

```typescript
if (part.type === 'tool-runSiteAudit' && part.state === 'output-available') {
  return <AuditCard result={part.output} />;
}

if (part.type === 'tool-deleteAuditReport' && part.state === 'output-available') {
  return <DeleteResultCard result={part.output} />;
}
```

#### Component Props

**AuditCard**:
```typescript
interface AuditCardProps {
  result: {
    domain: string;
    score: number;
    grade: 'A' | 'B' | 'C' | 'D';
    issues: string[];
    checkedAt: string;
  };
}
```

**DeleteResultCard**:
```typescript
interface DeleteResultCardProps {
  result: {
    domain: string;
    reportId: string;
    deleted: boolean;
    deletedAt: string;
  };
}
```

#### Backend Emission

```typescript
{
  type: "tool-runSiteAudit",
  state: "output-available",
  input: { domain: "example.com" },
  output: {
    domain: "example.com",
    score: 85,
    grade: "A",
    issues: [],
    checkedAt: "2024-01-15T14:23:45.123Z"
  }
}
```

---

## State: output-error

### Purpose

Indicates that **tool execution failed** with an error or exception. This is the terminal error state.

### When It Appears

**Trigger**: Tool execution raises an error
- Zod validation fails on input
- Tool execute() throws an exception
- Network error during tool execution
- LLM provides invalid parameters

**Timing**: Appears when error is detected during input validation or execution

**Duration**: Persistent (terminal state)

### Visual Appearance

#### Component Used
`ToolOutputError` (from `components/ToolStateViews.tsx`)

#### HTML/Tailwind Styling
```html
<div className="border-2 border-red-400 bg-red-50 rounded-lg p-4 flex items-center gap-2">
  {/* Warning icon */}
  <span className="text-lg">⚠️</span>
  
  {/* Error message */}
  <div className="text-red-700 text-sm">
    <strong>Tool failed:</strong> {message}
  </div>
</div>
```

#### Visual Details

| Aspect | Value |
|--------|-------|
| **Border** | 2px solid red-400 |
| **Background** | Light red (bg-red-50) |
| **Text Color** | Medium red (text-red-700) |
| **Icon** | Warning emoji (⚠️) |
| **Font** | Bold prefix "Tool failed:" |
| **Corner Radius** | lg (8px) |
| **Padding** | 4 (1rem) |

#### Example Screenshots

```
┌────────────────────────────────────────┐
│ ⚠️  Tool failed: domain cannot be empty │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ⚠️  Tool failed: Request timeout after   │
│     600ms                               │
└────────────────────────────────────────┘
```

### Transition Behavior

#### Next State
None — **terminal state**

#### Error Recovery
User can:
- Request clarification from LLM (continue conversation)
- Ask LLM to retry with corrected parameters
- No automatic retry

### Semantics and Meaning

**Semantic Meaning**:
- Something went wrong during tool execution
- Error is not user-recoverable via UI
- LLM should provide explanation or ask for clarification
- Error message indicates root cause

**User Perspective**:
- "Something went wrong"
- "The tool failed"
- "I need to try a different approach"
- "Ask the AI to explain or retry"

### Implementation Details

#### Rendering Condition

```typescript
if (part.type.startsWith('tool-') && part.state === 'output-error') {
  return (
    <ToolOutputError 
      message={part.error || "Unknown error"}
    />
  );
}
```

#### Component Props

```typescript
interface ToolOutputErrorProps {
  message: string;  // Error description
}
```

#### Backend Emission

```typescript
{
  type: "tool-runSiteAudit",
  state: "output-error",
  input: { domain: "" },
  error: "domain cannot be empty string"
}
```

---

## State: approval-requested

### Purpose

Indicates that **tool execution has been paused awaiting user approval**. The tool input is valid but marked with `toolApproval: "user-approval"`, so execution is blocked until the user confirms or denies.

### When It Appears

**Trigger**: Tool marked with approval gate reaches input-available state
- Tool parameters are complete and valid
- Tool configuration includes `toolApproval: "user-approval"`
- Backend pauses execution and requests user decision

**Timing**: Appears after input-available, before approval-responded

**Duration**: Persistent until user clicks confirm or cancel (user-dependent)

### Visual Appearance

#### Component Used (Conditional)

**If automatic approval is being checked**:
```html
<ToolInputAvailable label="Checking approval automatically..." />
```

**If user interaction is required** (typical):
```html
<DeleteApprovalPrompt input={...} onRespond={...} />
```

#### HTML/Tailwind Styling (DeleteApprovalPrompt)

```html
<div className="border-2 border-red-400 bg-red-50 rounded-lg p-4">
  <div className="flex items-center gap-2 mb-3">
    <span className="text-lg">⚠️</span>
    <h3 className="font-bold text-red-800">Confirm Deletion</h3>
  </div>
  
  <p className="text-red-700 text-sm mb-4">
    Are you sure you want to delete the audit report for 
    <strong> {input.domain}</strong> (Report ID: <strong>{input.reportId}</strong>)? 
    This action cannot be undone.
  </p>
  
  <div className="flex gap-2">
    <button
      onClick={() => onRespond(true)}
      className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700"
    >
      Confirm Delete
    </button>
    <button
      onClick={() => onRespond(false)}
      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
    >
      Cancel
    </button>
  </div>
</div>
```

#### Visual Details

| Aspect | Value |
|--------|-------|
| **Border** | 2px solid red-400 |
| **Background** | Light red (bg-red-50) |
| **Heading** | Bold red text with warning emoji |
| **Body Text** | Red text, includes domain/reportId in bold |
| **Buttons** | Red (confirm/destructive), Gray (cancel) |
| **Corner Radius** | lg (8px) |
| **Padding** | 4 (1rem) |

#### Example Screenshots

```
┌─────────────────────────────────────────┐
│  ⚠️  Confirm Deletion                   │
│                                          │
│  Are you sure you want to delete the    │
│  audit report for example.com (Report   │
│  ID: report-001)? This action cannot be │
│  undone.                                │
│                                          │
│  [Confirm Delete]  [Cancel]             │
└─────────────────────────────────────────┘
```

### Transition Behavior

#### Next States

| User Action | Next State | Result |
|-------------|-----------|--------|
| Clicks "Confirm Delete" | approval-responded | Execution continues |
| Clicks "Cancel" | approval-responded | Transitions to output-denied |

#### User Interaction
**Required** — user must click a button to proceed

#### Transition Timing
- User-dependent (typically 1-5 seconds)
- Immediate to approval-responded upon user action

### Semantics and Meaning

**Semantic Meaning**:
- Operation is destructive or sensitive
- User must explicitly authorize before execution
- LLM has determined the action is appropriate
- Final decision rests with user

**User Perspective**:
- "Are you sure about this?"
- "This is a destructive operation"
- "I need to confirm before it happens"
- "The AI is asking for my permission"

### Implementation Details

#### Rendering Condition

```typescript
if (part.type === 'tool-deleteAuditReport' && part.state === 'input-available' && part.approval) {
  // Special case: render approval prompt instead of ToolInputAvailable
  return (
    <DeleteApprovalPrompt 
      input={part.input}
      onRespond={(approved) => addToolApprovalResponse({
        toolCallId: part.toolCallId,
        result: approved ? "approved" : "denied"
      })}
    />
  );
}
```

#### Component Props

```typescript
interface DeleteApprovalPromptProps {
  input: {
    domain: string;
    reportId: string;
  };
  onRespond: (approved: boolean) => void;
}
```

#### Backend Emission

```typescript
{
  type: "tool-deleteAuditReport",
  state: "input-available",
  input: { domain: "example.com", reportId: "report-001" },
  approval: { type: "user-approval", automatic: false }
}
```

#### Frontend Response to User Action

```typescript
// User clicks "Confirm Delete"
addToolApprovalResponse({
  toolCallId: "call_xyz789",
  result: "approved"
});

// OR

// User clicks "Cancel"
addToolApprovalResponse({
  toolCallId: "call_xyz789",
  result: "denied"
});
```

---

## State: approval-responded

### Purpose

Indicates that **user has submitted an approval decision** and the system is processing it. This is a brief transitional state.

### When It Appears

**Trigger**: User clicks "Confirm" or "Cancel" button in approval prompt
- Frontend sends user decision to backend
- LLM receives approval/denial context
- Backend prepares to execute or transition to denied

**Timing**: Brief transitory state, appears after approval-requested

**Duration**: Very brief (50-100ms), may not be visually perceived

### Visual Appearance

#### Component Used
`ToolInputAvailable` (brief state indicator)

```html
<div className="border-2 border-blue-400 bg-blue-50 rounded-lg p-4 flex items-center gap-2">
  <div className="relative w-2 h-2">
    <div className="absolute w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
  </div>
  
  <span className="text-blue-600 text-sm font-medium">
    {approved ? "Approved — deleting report..." : "Denied — cancelling..."}
  </span>
</div>
```

#### Visual Details

| Aspect | Value |
|--------|-------|
| **Border** | 2px solid blue-400 |
| **Background** | Light blue (bg-blue-50) |
| **Text** | "Approved — deleting..." or "Denied — cancelling..." |
| **Duration** | Very brief (may flash) |

#### Example Screenshots

```
┌─────────────────────────────┐
│ ◉ Approved — deleting...    │  (brief)
└─────────────────────────────┘

OR

┌─────────────────────────────┐
│ ◉ Denied — cancelling...    │  (brief)
└─────────────────────────────┘
```

### Transition Behavior

#### Next States

| Approval Result | Next State | Reason |
|-----------------|-----------|--------|
| User approved | output-available (after execution) | Tool executes and returns result |
| User denied | output-denied | Tool is not executed |

#### Automatic Transition
Yes — immediately proceeds based on user decision

#### Transition Timing
- If approved: ~400ms (tool execution latency)
- If denied: Immediate to output-denied

### Semantics and Meaning

**Semantic Meaning**:
- User decision has been recorded
- System is acting on that decision
- Operation is either proceeding or being cancelled
- No further user input needed

**User Perspective**:
- "My decision is being processed"
- "The system is acting on my choice"
- "Almost done"

### Implementation Details

#### Rendering Condition

```typescript
if (part.type === 'tool-deleteAuditReport' && part.state === 'approval-responded') {
  const approved = part.approval?.result === 'approved';
  return (
    <ToolInputAvailable 
      label={approved ? "Approved — deleting report..." : "Denied — cancelling..."}
    />
  );
}
```

#### Component Props
Uses `ToolInputAvailable` with contextual label

#### Backend Behavior

```typescript
// If approved, execution continues:
execute: async ({ domain, reportId }) => {
  await new Promise(r => setTimeout(r, 400));
  return {
    domain,
    reportId,
    deleted: true,
    deletedAt: new Date().toISOString()
  };
}

// If denied, execution is skipped:
// → transitions directly to output-denied state
```

---

## State: output-denied

### Purpose

Indicates that **user explicitly rejected/denied an approval request**. The destructive operation was not executed. This is a terminal state.

### When It Appears

**Trigger**: User clicks "Cancel" in approval prompt
- Approval was requested
- User submitted denial
- Backend transitions from approval-responded to output-denied
- Tool execute() is **not** called

**Timing**: Appears after approval-requested → approval-responded (denied path)

**Duration**: Persistent (terminal state)

### Visual Appearance

#### Component Used
`ToolOutputDenied` (from `components/ToolStateViews.tsx`)

#### HTML/Tailwind Styling
```html
<div className="border-2 border-amber-400 bg-amber-50 rounded-lg p-4 flex items-center gap-2">
  {/* Blocked emoji */}
  <span className="text-lg">🚫</span>
  
  {/* Denial message */}
  <span className="text-amber-700 text-sm font-medium">
    Action was not approved
  </span>
</div>
```

#### Visual Details

| Aspect | Value |
|--------|-------|
| **Border** | 2px solid amber-400 |
| **Background** | Light amber (bg-amber-50) |
| **Text Color** | Medium amber (text-amber-700) |
| **Icon** | Blocked emoji (🚫) |
| **Font** | Medium weight |
| **Corner Radius** | lg (8px) |
| **Padding** | 4 (1rem) |

#### Example Screenshots

```
┌────────────────────────────────┐
│  🚫  Action was not approved   │
└────────────────────────────────┘
```

### Transition Behavior

#### Next State
None — **terminal state**

#### User Interaction
- No further interaction with this tool invocation
- User can request new operation (new message)
- Report was not deleted (safe state)

### Semantics and Meaning

**Semantic Meaning**:
- Destructive operation was cancelled
- User exercised their veto power
- Tool was never executed
- Data remains unchanged
- No error occurred; user intentionally rejected

**User Perspective**:
- "I cancelled the operation"
- "The report was not deleted"
- "Everything is safe"
- "The system respected my decision"

### Distinction from output-error

| State | Meaning | Cause | Data Integrity |
|-------|---------|-------|-----------------|
| output-denied | User rejected | User decision | ✓ Safe |
| output-error | Tool failed | Exception/error | ? Unclear |

**Key Difference**: `output-denied` is intentional user action; `output-error` is an unexpected failure.

### Implementation Details

#### Rendering Condition

```typescript
if (part.type.startsWith('tool-') && part.state === 'output-denied') {
  return <ToolOutputDenied />;
}
```

#### Component Props
No props required

```typescript
interface ToolOutputDeniedProps {}
```

#### Backend Emission

```typescript
{
  type: "tool-deleteAuditReport",
  state: "output-denied",
  input: { domain: "example.com", reportId: "report-001" },
  approval: { type: "user-approval", result: "denied" }
}
```

---

## State Transition Diagram

### Complete State Machine (ASCII)

```
╔════════════════════════════════════════════════════════════════╗
║                    ALL TOOL STATES                              ║
╚════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────┐
│   START: LLM generates tool     │
└────────────────┬────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ input-streaming  │◄─ LLM is streaming parameters
        │  (Gray dashed)   │
        └────────┬─────────┘
                 │
         ┌───────▼────────┐
         │ input-available│◄─ Input complete & valid
         │   (Blue)       │
         └─────────┬──────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    (no approval)     (approval gate)
        │                     │
        ▼                     ▼
    [execute]    ┌─────────────────────┐
        │        │ approval-requested  │◄─ Awaiting user
        │        │  (Red warning)      │   decision
        │        └────────┬────────────┘
        │                 │
        │          (user clicks)
        │                 │
        │        ┌────────▼──────────┐
        │        │approval-responded │◄─ User decided
        │        │ (Blue, brief)     │
        │        └────────┬──────────┘
        │                 │
        │        ┌────────┴──────────┐
        │        │                   │
        │    (approved)          (denied)
        │        │                   │
        │        ▼                   ▼
        │    [execute]      ┌──────────────────┐
        │        │          │  output-denied   │◄─ TERMINAL
        │        │          │  (Amber, 🚫)    │
        │        │          └──────────────────┘
        └────────┼─────────────────┐
                 │                 │
         ┌───────▼─────────┐      ╔═════════════════════╗
         │                 │      ║  ERROR CONDITIONS   ║
         │ execute()       │      ║ (at any point)      ║
         │                 │      ║                     ║
         ├─ Success ───────┼──────▶ output-error (red) ║
         │                 │      ║ (terminal)          ║
         │ Failure ────────┼──────▶                     ║
         └─────────────────┘      ╚═════════════════════╝
                 │
         ┌───────▼──────────┐
         │output-available  │◄─ TERMINAL
         │ (Themed: green,  │   Success result
         │  blue, amber, or │   (AuditCard or
         │  red depending   │    DeleteResultCard)
         │  on grade/result)│
         └──────────────────┘

TERMINAL STATES (no further transitions):
  ✓ output-available  (tool succeeded)
  ✓ output-error      (tool failed)
  ✓ output-denied     (user rejected)

TRANSITORY STATES (brief):
  ▪ input-streaming   (100-300ms)
  ▪ input-available   (50ms-1s)
  ▪ approval-requested (user-dependent)
  ▪ approval-responded (50-400ms)
```

### Tool-Specific State Paths

#### Path 1: runSiteAudit (No Approval)
```
input-streaming (300ms)
    ↓
input-available (50ms)
    ↓
[execute ~600ms]
    ↓
output-available (TERMINAL)

Total: ~950ms
```

#### Path 2: deleteAuditReport (Approved)
```
input-streaming (300ms)
    ↓
input-available (50ms)
    ↓
approval-requested (awaits user)
    ↓ (user clicks Confirm)
approval-responded (100ms)
    ↓
[execute ~400ms]
    ↓
output-available (TERMINAL)

Total: ~850ms + user response time (e.g., 2s)
```

#### Path 3: deleteAuditReport (Denied)
```
input-streaming (300ms)
    ↓
input-available (50ms)
    ↓
approval-requested (awaits user)
    ↓ (user clicks Cancel)
approval-responded (50ms)
    ↓
output-denied (TERMINAL)

Total: ~400ms + user response time (e.g., 2s)
```

---

## Component-to-State Mapping

### Quick Reference

| State | Component | Props | Import From |
|-------|-----------|-------|-------------|
| input-streaming | `ToolInputStreaming` | `label: string` | `ToolStateViews.tsx` |
| input-available | `ToolInputAvailable` | `label: string` | `ToolStateViews.tsx` |
| output-available (audit) | `AuditCard` | `result: AuditResult` | `AuditCard.tsx` |
| output-available (delete) | `DeleteResultCard` | `result: DeleteOutput` | `DeleteReportUI.tsx` |
| output-error | `ToolOutputError` | `message: string` | `ToolStateViews.tsx` |
| approval-requested | `DeleteApprovalPrompt` | `input: DeleteInput`, `onRespond: fn` | `DeleteReportUI.tsx` |
| approval-responded | `ToolInputAvailable` | `label: string` | `ToolStateViews.tsx` |
| output-denied | `ToolOutputDenied` | None | `ToolStateViews.tsx` |

### Rendering Logic Summary

```typescript
// In app/page.tsx

function RenderToolPart(part) {
  const { type, state, input, output, error, approval } = part;
  
  switch (state) {
    case 'input-streaming':
      return <ToolInputStreaming label={`Preparing ${toolName}...`} />;
    
    case 'input-available':
      if (approval?.type === 'user-approval') {
        // Special case: show approval prompt
        if (type === 'tool-deleteAuditReport') {
          return <DeleteApprovalPrompt input={input} onRespond={...} />;
        }
      }
      return <ToolInputAvailable label={getContextLabel(input, type)} />;
    
    case 'approval-responded':
      const approved = approval?.result === 'approved';
      return <ToolInputAvailable label={approved ? "Approved..." : "Denied..."} />;
    
    case 'output-available':
      if (type === 'tool-runSiteAudit') {
        return <AuditCard result={output} />;
      } else if (type === 'tool-deleteAuditReport') {
        return <DeleteResultCard result={output} />;
      }
    
    case 'output-error':
      return <ToolOutputError message={error} />;
    
    case 'output-denied':
      return <ToolOutputDenied />;
    
    default:
      return <div>Unknown state: {state}</div>;
  }
}
```

---

