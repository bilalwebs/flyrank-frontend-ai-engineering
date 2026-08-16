# TOOL_DOCUMENTATION.md – Complete Tool Reference

## Table of Contents

1. [Tool: runSiteAudit](#tool-runsiteaudit)
2. [Tool: deleteAuditReport](#tool-deleteauditreport)
3. [Tool Lifecycle Comparison](#tool-lifecycle-comparison)
4. [Error Scenarios](#error-scenarios)
5. [Integration Examples](#integration-examples)

---

## Tool: runSiteAudit

### Overview

| Property | Value |
|----------|-------|
| **Tool Name** | `runSiteAudit` |
| **Purpose** | Analyze a website domain and generate an SEO audit score report |
| **LLM Context** | Non-approval tool; executes immediately after parameter streaming |
| **Latency** | ~600ms (simulated) |
| **Approval Required** | No |
| **Destructive** | No (read-only operation) |
| **Status** | Implemented ✓ |

---

### Description

Performs an SEO audit on a specified website domain and returns a structured analysis report including:
- Overall SEO score (0-100 scale)
- Letter grade (A, B, C, D)
- List of identified issues
- Audit execution timestamp

The tool is designed to be invoked when a user requests an audit of a specific domain. It simulates network latency and generates realistic-looking audit results.

---

### Input Schema

#### Definition

```typescript
const runSiteAuditInput = z.object({
  domain: z.string()
    .describe('The website domain to audit, e.g. "example.com"')
});

type RunSiteAuditInput = z.infer<typeof runSiteAuditInput>;
```

#### Input Object Structure

```typescript
{
  domain: string;  // Required. Format: "example.com" (without protocol)
}
```

#### Validation Rules

| Field | Type | Required | Validation | Example |
|-------|------|----------|-----------|---------|
| `domain` | string | Yes | Non-empty string | "google.com" |
| | | | No HTTP/HTTPS prefix | ✗ "https://example.com" |
| | | | Alphanumeric + dots/hyphens | "my-domain.co.uk" |

#### Valid Input Examples

```typescript
{ domain: "example.com" }
{ domain: "google.com" }
{ domain: "my-website.co.uk" }
{ domain: "subdomain.example.org" }
```

#### Invalid Input Examples

```typescript
{ domain: "https://example.com" }  // ✗ Protocol included
{ domain: "" }                      // ✗ Empty string
{ domain: 123 }                     // ✗ Not a string
{ }                                 // ✗ Missing domain
{ domain: "example.com", extra: "field" }  // ✗ Extra fields ignored
```

---

### Output Schema

#### Return Type Definition

```typescript
interface AuditResult {
  domain: string;                    // Input domain
  score: number;                     // 60-100 range
  grade: 'A' | 'B' | 'C' | 'D';     // Letter grade
  issues: string[];                  // List of issues found
  checkedAt: string;                 // ISO 8601 timestamp
}
```

#### Output Field Descriptions

| Field | Type | Value Range | Meaning |
|-------|------|------------|---------|
| `domain` | string | Input echo | The domain that was audited (mirrors input) |
| `score` | number | 60–100 | Overall SEO health score (higher is better) |
| `grade` | 'A' \| 'B' \| 'C' \| 'D' | See mapping | Letter grade equivalent to score |
| `issues` | string[] | 0–N items | Identified SEO problems (empty if score ≥ 80) |
| `checkedAt` | string | ISO 8601 | Date-time when audit was performed (UTC) |

#### Score-to-Grade Mapping

```typescript
score >= 90  →  grade: 'A'   (excellent)
score >= 75  →  grade: 'B'   (good)
score >= 60  →  grade: 'C'   (fair)
score < 60   →  grade: 'D'   (poor)
```

#### Issue Generation Logic

```typescript
if (score < 65) {
  issues: [
    "Poor mobile performance",
    "Missing meta tags",
    "Slow page load time",
  ];
} else if (score < 80) {
  issues: ["Optimize images", "Add structured data"];
} else {
  issues: [];  // No issues for high scores
}
```

#### Sample Output

```typescript
{
  domain: "example.com",
  score: 85,
  grade: "A",
  issues: [],
  checkedAt: "2024-01-15T14:23:45.123Z"
}
```

```typescript
{
  domain: "blog.example.com",
  score: 62,
  grade: "C",
  issues: [
    "Poor mobile performance",
    "Missing meta tags",
    "Slow page load time"
  ],
  checkedAt: "2024-01-15T14:23:45.123Z"
}
```

---

### Execution Flow

#### 1. Invocation Trigger

**LLM Generates**:
```typescript
// Tool call from LLM reasoning
ToolCall {
  id: "call_abc123",
  toolName: "runSiteAudit",
  args: { domain: "example.com" }
}
```

**Frontend State**: None yet (pending backend processing)

---

#### 2. Input Streaming Phase

**Backend Processing**:
- LLM is streaming the tool call arguments
- Parameters may be incomplete or partially generated
- State: "input-streaming"

**UI Component**: `ToolInputStreaming`
```typescript
<ToolInputStreaming label="Preparing runSiteAudit request..." />
```

**Visual**: Gray dashed border, pulsing gray dot

---

#### 3. Input Available Phase

**Backend Processing**:
- Input streaming complete
- Zod schema validation passed: `{ domain: "example.com" }`
- Ready to execute tool

**State**: "input-available"

**UI Component**: `ToolInputAvailable`
```typescript
<ToolInputAvailable label="Auditing example.com..." />
```

**Visual**: Blue border, animated ping dot

---

#### 4. Tool Execution

**Backend Processing**:
```typescript
execute: async ({ domain }) => {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 600));
  
  // Calculate score (deterministic based on domain hash, or random)
  const score = Math.floor(Math.random() * 41) + 60;  // 60-100
  
  // Determine grade
  let grade: 'A' | 'B' | 'C' | 'D';
  if (score >= 90) grade = 'A';
  else if (score >= 75) grade = 'B';
  else if (score >= 60) grade = 'C';
  else grade = 'D';
  
  // Generate issues
  const issues: string[] = [];
  if (score < 65) {
    issues.push("Poor mobile performance", "Missing meta tags", "Slow page load time");
  } else if (score < 80) {
    issues.push("Optimize images", "Add structured data");
  }
  
  // Return structured result
  return {
    domain,
    score,
    grade,
    issues,
    checkedAt: new Date().toISOString(),
  };
}
```

**Simulated Behavior**:
- No actual network request to domain
- Score randomly generated (pseudo-realistic)
- Issues correlate with score quality
- Timestamp captures execution moment

---

#### 5. Output Available Phase

**Backend Processing**:
- Tool execution completed successfully
- Result parsed and formatted
- State: "output-available"

**Streamed Output**:
```typescript
{
  type: "tool-runSiteAudit",
  state: "output-available",
  input: { domain: "example.com" },
  output: {
    domain: "example.com",
    score: 82,
    grade: "B",
    issues: ["Optimize images"],
    checkedAt: "2024-01-15T14:23:45.123Z"
  }
}
```

**UI Component**: `AuditCard`
```typescript
<AuditCard result={output} />
```

**Visual Features**:
- Circular SVG progress gauge (82% filled)
- Grade badge: "B" (blue background)
- Issues list: "Optimize images"
- Timestamp: "Jan 15, 2024 at 2:23 PM"

---

#### 6. Final State (Terminal)

- State does not transition further
- User can request another audit or different operation
- Message remains in chat history

---

### State Transitions

```
┌──────────────────────┐
│  input-streaming     │
│  LLM generating args │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│  input-available     │
│  Ready to execute    │
└──────────┬───────────┘
           │
           ↓
        execute()
           │
           ├─ Success ──→  ┌──────────────────────┐
           │                │ output-available     │
           │                │ (TERMINAL)           │
           │                └──────────────────────┘
           │
           └─ Error   ──→  ┌──────────────────────┐
                           │ output-error         │
                           │ (TERMINAL)           │
                           └──────────────────────┘
```

**Time per Transition**:
| Transition | Duration | Trigger |
|-----------|----------|---------|
| input-streaming → input-available | ~100-300ms | LLM finishes generating params |
| input-available → output-available | ~600ms | Tool execute() completes |
| **Total** | **~700-900ms** | Tool cycle completion |

---

### Component Integration

#### AuditCard Component

**File**: `components/AuditCard.tsx`

**Props**:
```typescript
interface AuditCardProps {
  result: AuditResult;  // Tool output object
}
```

**Rendering**:
```typescript
<div className="border-2 border-blue-300 rounded-lg p-4">
  {/* Circular progress gauge */}
  <svg width="100" height="100">
    {/* SVG circle showing score% */}
  </svg>
  
  {/* Grade badge */}
  <span className={gradeColorClass(result.grade)}>
    {result.grade}
  </span>
  
  {/* Issues list */}
  {result.issues.length > 0 ? (
    <ul>
      {result.issues.map(issue => <li key={issue}>{issue}</li>)}
    </ul>
  ) : (
    <p>No issues found</p>
  )}
  
  {/* Timestamp */}
  <small>{new Date(result.checkedAt).toLocaleString()}</small>
</div>
```

**Color Mapping**:
- A: bg-green-100, text-green-800
- B: bg-blue-100, text-blue-800
- C: bg-amber-100, text-amber-800
- D: bg-red-100, text-red-800

---

## Tool: deleteAuditReport

### Overview

| Property | Value |
|----------|-------|
| **Tool Name** | `deleteAuditReport` |
| **Purpose** | Permanently delete a previously generated audit report |
| **LLM Context** | Approval tool; execution paused until user confirms |
| **Latency** | ~400ms (simulated) |
| **Approval Required** | Yes (`user-approval`) |
| **Destructive** | Yes (irreversible operation) |
| **Status** | Implemented ✓ |

---

### Description

Removes a specific audit report from the system with explicit user approval. This tool demonstrates the approval workflow pattern where sensitive operations require explicit user confirmation before execution.

When invoked, the tool:
1. Reaches `input-available` state without executing
2. Transitions to `approval-requested` state
3. Displays confirmation prompt to user
4. Waits for user to confirm or deny
5. Either executes deletion or cancels based on user decision

---

### Input Schema

#### Definition

```typescript
const deleteAuditReportInput = z.object({
  domain: z.string()
    .describe('The domain whose report should be deleted'),
  reportId: z.string()
    .describe('The ID of the report to delete')
});

type DeleteAuditReportInput = z.infer<typeof deleteAuditReportInput>;
```

#### Input Object Structure

```typescript
{
  domain: string;    // Required. The domain being deleted
  reportId: string;  // Required. Unique report identifier
}
```

#### Validation Rules

| Field | Type | Required | Validation | Example |
|-------|------|----------|-----------|---------|
| `domain` | string | Yes | Domain name | "example.com" |
| `reportId` | string | Yes | Alphanumeric ID | "report-2024-001" |

#### Valid Input Examples

```typescript
{ domain: "example.com", reportId: "report-001" }
{ domain: "blog.example.org", reportId: "audit-20240115" }
{ domain: "staging.test.com", reportId: "tmp-xyz-123" }
```

#### Invalid Input Examples

```typescript
{ domain: "example.com" }  // ✗ Missing reportId
{ reportId: "report-001" }  // ✗ Missing domain
{ domain: "", reportId: "report-001" }  // ✗ Empty domain
{ domain: "example.com", reportId: 123 }  // ✗ reportId not string
```

---

### Output Schema

#### Return Type Definition

```typescript
interface DeleteOutput {
  domain: string;        // The deleted domain
  reportId: string;      // The deleted report ID
  deleted: boolean;      // Always true on success
  deletedAt: string;     // ISO 8601 timestamp
}
```

#### Output Field Descriptions

| Field | Type | Value | Meaning |
|-------|------|-------|---------|
| `domain` | string | Input echo | The domain that was deleted (mirrors input) |
| `reportId` | string | Input echo | The report ID that was deleted (mirrors input) |
| `deleted` | boolean | true | Indicates successful deletion |
| `deletedAt` | string | ISO 8601 | Date-time when deletion occurred (UTC) |

#### Sample Output

```typescript
{
  domain: "example.com",
  reportId: "report-001",
  deleted: true,
  deletedAt: "2024-01-15T14:25:30.456Z"
}
```

#### Output Semantics

- `deleted: true` always indicates successful tool execution
- `deletedAt` captures the precise moment of deletion
- Fields mirror input for audit trail purposes

---

### Execution Flow

#### 1. Invocation Trigger

**LLM Generates**:
```typescript
ToolCall {
  id: "call_xyz789",
  toolName: "deleteAuditReport",
  args: { domain: "example.com", reportId: "report-001" }
}
```

**Backend Check**: Tool has `toolApproval: "user-approval"` → execution will be gated

---

#### 2. Input Streaming Phase

**Backend Processing**:
- LLM streaming tool arguments (domain and reportId)
- State: "input-streaming"

**UI Component**: `ToolInputStreaming`
```typescript
<ToolInputStreaming label="Preparing deleteAuditReport request..." />
```

**Visual**: Gray dashed border, pulsing dot

---

#### 3. Input Available Phase

**Backend Processing**:
- Input streaming complete
- Zod validation passed
- Tool is marked with `toolApproval: "user-approval"`
- **Execution PAUSED** (not automatic)
- State: "input-available" (but approval check triggers immediate transition)

**State**: "input-available" → automatically advances to "approval-requested"

---

#### 4. Approval Requested Phase

**Backend Processing**:
- Tool execution blocked by approval gate
- LLM waits for user response
- State: "approval-requested"

**Streamed Message**:
```typescript
{
  type: "tool-deleteAuditReport",
  state: "approval-requested",
  input: { domain: "example.com", reportId: "report-001" },
  approval: { type: "user-approval", automatic: false }
}
```

**UI Component**: `DeleteApprovalPrompt` (conditional)
```typescript
<DeleteApprovalPrompt 
  input={{ domain: "example.com", reportId: "report-001" }}
  onRespond={(approved) => sendApprovalResponse(...)}
/>
```

**Visual**:
- Light red background (#fee2e2)
- Red text warning
- Message: "Are you sure you want to delete the audit report for **example.com** (report-001)? This action cannot be undone."
- Two buttons:
  - "Confirm Delete" (red, bold)
  - "Cancel" (gray)

---

#### 5. User Decision

**User Action 1: Clicks "Confirm Delete"**

Frontend:
```typescript
const handleApproval = () => {
  addToolApprovalResponse({
    toolCallId: "call_xyz789",
    result: "approved",
  });
};
```

Backend:
- Receives approval response
- State: "approval-responded"
- Proceeds to execute()

---

**User Action 2: Clicks "Cancel"**

Frontend:
```typescript
const handleDenial = () => {
  addToolApprovalResponse({
    toolCallId: "call_xyz789",
    result: "denied",
  });
};
```

Backend:
- Receives denial response
- State: "approval-responded"
- Skips execute(), transitions to "output-denied"

---

#### 6. Approval Responded Phase (if Approved)

**Backend Processing**:
- User approved deletion
- State: "approval-responded"
- LLM notified of approval
- Proceeds to execute()

**UI Component**: `ToolInputAvailable` (brief)
```typescript
<ToolInputAvailable label="Approved — deleting report..." />
```

**Visual**: Blue state indicator (momentary)

---

#### 7. Tool Execution (if Approved)

**Backend Processing**:
```typescript
execute: async ({ domain, reportId }) => {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 400));
  
  // Return deletion confirmation
  return {
    domain,
    reportId,
    deleted: true,
    deletedAt: new Date().toISOString(),
  };
}
```

**Simulated Behavior**:
- No actual database deletion (simulated only)
- Latency: 400ms
- Always returns success

---

#### 8. Output Available Phase (if Approved)

**Backend Processing**:
- Tool executed successfully
- State: "output-available"

**Streamed Output**:
```typescript
{
  type: "tool-deleteAuditReport",
  state: "output-available",
  input: { domain: "example.com", reportId: "report-001" },
  output: {
    domain: "example.com",
    reportId: "report-001",
    deleted: true,
    deletedAt: "2024-01-15T14:25:30.456Z"
  }
}
```

**UI Component**: `DeleteResultCard`
```typescript
<DeleteResultCard result={output} />
```

**Visual**:
- White card with shadow
- Trash emoji (🗑️) icon
- Message: "Report **report-001** for **example.com** has been deleted."
- Timestamp: "Jan 15, 2024 at 2:25 PM"

---

#### 9. Output Denied Phase (if Rejected)

**Backend Processing**:
- User denied deletion
- State transitions directly to "output-denied"
- Tool execute() is NOT called

**Streamed Output**:
```typescript
{
  type: "tool-deleteAuditReport",
  state: "output-denied",
  input: { domain: "example.com", reportId: "report-001" },
  approval: { type: "user-approval", automatic: false }
}
```

**UI Component**: `ToolOutputDenied`
```typescript
<ToolOutputDenied />
```

**Visual**:
- Amber border (#fef3c7)
- Blocked emoji (🚫)
- Message: "Action was not approved"

---

#### 10. Final State (Terminal)

- No further transitions
- Message persists in chat history
- User can request another operation

---

### State Transitions (Approval Path)

```
┌──────────────────────┐
│  input-streaming     │
│  LLM generating args │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│  input-available     │
│  (immediately routes │
│   to approval check) │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────────┐
│  approval-requested      │
│  (renders prompt)        │
│  (awaits user decision)  │
└──────────┬───────────────┘
           │
    ┌──────┴──────┐
    │             │
(approve)    (deny)
    │             │
    ↓             ↓
┌─────────────┐  ┌──────────────┐
│approval-    │  │output-denied │
│responded    │  │(TERMINAL)    │
└──────┬──────┘  └──────────────┘
       │
       ↓
   execute()
       │
       ├─ Success ──→  ┌──────────────────────┐
       │                │ output-available     │
       │                │ (TERMINAL)           │
       │                └──────────────────────┘
       │
       └─ Error   ──→  ┌──────────────────────┐
                       │ output-error         │
                       │ (TERMINAL)           │
                       └──────────────────────┘
```

**Time per Transition**:
| Transition | Duration | Trigger |
|-----------|----------|---------|
| input-streaming → input-available | ~100-300ms | LLM finishes generating params |
| input-available → approval-requested | Immediate | Approval gate activated |
| approval-requested → approval-responded | User dependent | User clicks confirm/cancel |
| approval-responded → output-available | ~400ms | Tool execute() completes |
| **Total (if approved)** | **~500-900ms + user delay** | Entire cycle |
| **Total (if denied)** | **~100-300ms + user delay** | Approval phase only |

---

### Component Integration

#### DeleteApprovalPrompt Component

**File**: `components/DeleteReportUI.tsx`

**Props**:
```typescript
interface DeleteApprovalPromptProps {
  input: {
    domain: string;
    reportId: string;
  };
  onRespond: (approved: boolean) => void;
}
```

**Rendering**:
```typescript
<div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
  <div className="flex items-center gap-2 mb-3">
    <span className="text-xl">⚠️</span>
    <h3 className="font-bold text-red-800">Confirm Deletion</h3>
  </div>
  
  <p className="text-red-700 mb-4">
    Are you sure you want to delete the audit report for <strong>{input.domain}</strong> 
    (Report ID: <strong>{input.reportId}</strong>)? This action cannot be undone.
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

#### DeleteResultCard Component

**File**: `components/DeleteReportUI.tsx`

**Props**:
```typescript
interface DeleteResultCardProps {
  result: DeleteOutput;
}
```

**Rendering**:
```typescript
<div className="border-2 border-green-300 rounded-lg p-4 bg-white">
  <div className="flex items-center gap-3 mb-3">
    <span className="text-3xl">🗑️</span>
    <h3 className="font-bold text-gray-800">Deletion Complete</h3>
  </div>
  
  <p className="text-gray-700 mb-2">
    Report <strong>{result.reportId}</strong> for <strong>{result.domain}</strong> 
    has been deleted.
  </p>
  
  <small className="text-gray-500">
    Deleted at: {new Date(result.deletedAt).toLocaleString()}
  </small>
</div>
```

---

## Tool Lifecycle Comparison

### Side-by-Side Comparison

| Aspect | runSiteAudit | deleteAuditReport |
|--------|--------------|-------------------|
| **Approval** | None | Required (user-approval) |
| **Destructive** | No | Yes |
| **Input Validation** | Single field (domain) | Two fields (domain, reportId) |
| **Output** | Structured report (score, grade, issues) | Confirmation (deleted: true) |
| **States** | 3 (input-streaming, input-available, output-available) | 7 (includes approval states) |
| **Typical Duration** | ~700-900ms | ~500-900ms + user time |
| **Failure Mode** | output-error | output-error or output-denied |
| **UI Component (Success)** | AuditCard | DeleteResultCard |
| **UI Component (Failure)** | ToolOutputError | ToolOutputDenied or ToolOutputError |

---

### Approval Workflow Pattern

```
Non-Approval Tool (runSiteAudit):
  input-streaming
    ↓
  input-available
    ↓
  [execute immediately]
    ↓
  output-available (or output-error)

Approval Tool (deleteAuditReport):
  input-streaming
    ↓
  input-available
    ↓
  approval-requested
    ↓ (user decides)
  approval-responded
    ↓ (if approved)
  [execute]
    ↓
  output-available (or output-error)
    ↓ (if denied)
  output-denied (terminal)
```

---

## Error Scenarios

### Tool: runSiteAudit – Error Cases

#### Scenario 1: Invalid Input (Empty String)

**LLM Provides**:
```typescript
{ domain: "" }
```

**Zod Validation**:
```
Error: "domain must be a non-empty string"
```

**State**: output-error
**UI**: ToolOutputError with message "Tool failed: domain must be a non-empty string"

---

#### Scenario 2: Wrong Input Type

**LLM Provides**:
```typescript
{ domain: 123 }
```

**Zod Validation**:
```
Error: "domain must be a string"
```

**State**: output-error
**UI**: ToolOutputError

---

#### Scenario 3: Network Timeout (Simulated)

**During execute()**:
```typescript
// Simulated with setTimeout
throw new Error("Request timeout after 600ms");
```

**State**: output-error
**UI**: ToolOutputError

---

### Tool: deleteAuditReport – Error Cases

#### Scenario 1: User Denies Approval

**Backend**: Receives `result: "denied"` from frontend
**State**: output-denied (NOT output-error)
**UI**: ToolOutputDenied with 🚫 emoji

---

#### Scenario 2: Approval Timeout

**User**: Does not respond within time limit
**Backend**: Can be configured to auto-deny or escalate
**State**: output-denied (if auto-denied)

---

#### Scenario 3: Missing reportId

**LLM Provides**:
```typescript
{ domain: "example.com" }
```

**Zod Validation**:
```
Error: "reportId is required"
```

**State**: output-error (before approval gate)
**UI**: ToolOutputError

---

## Integration Examples

### Example 1: Audit Workflow

**User**: "Audit my website example.com"

**LLM Flow**:
1. Calls runSiteAudit with `{ domain: "example.com" }`
2. Receives output: `{ domain: "example.com", score: 78, grade: "B", ... }`
3. Formats response: "The audit shows your site scores a B (78/100). You should optimize images and add structured data."

**UI Flow**:
1. Show ToolInputStreaming (100-300ms)
2. Show ToolInputAvailable with "Auditing example.com..." (600ms)
3. Show AuditCard with score gauge and issues (terminal)

**Timeline**: ~700-900ms total

---

### Example 2: Approval Workflow

**User**: "Delete the report for example.com, report-001"

**LLM Flow**:
1. Calls deleteAuditReport with `{ domain: "example.com", reportId: "report-001" }`
2. Execution PAUSED at approval gate
3. Waits for user decision
4. (User clicks "Confirm Delete")
5. Receives output: `{ domain: "example.com", reportId: "report-001", deleted: true, ... }`
6. Formats response: "The report has been successfully deleted."

**UI Flow**:
1. Show ToolInputStreaming (100-300ms)
2. Show ToolInputAvailable (50ms)
3. Show approval-requested → DeleteApprovalPrompt (awaits user, e.g., 2 seconds)
4. Show ToolInputAvailable "Approved — deleting..." (400ms)
5. Show DeleteResultCard with deletion confirmation (terminal)

**Timeline**: ~600ms + user decision time

---

### Example 3: Error Handling

**User**: "Audit" (without domain)

**LLM Flow**:
1. Calls runSiteAudit with `{ domain: "" }` or missing domain
2. Zod validation fails
3. Error propagated to UI

**UI Flow**:
1. Show ToolInputStreaming
2. Show ToolInputAvailable
3. Show ToolOutputError with validation message

**Result**: User sees clear error; LLM can ask for clarification

---

