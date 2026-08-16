# EVIDENCE.md – Screenshot Checklist and Demonstration Guide

## Purpose

This document provides a structured checklist for capturing screenshots that demonstrate the FE-07 implementation. Screenshots serve as visual evidence that all requirements have been met and all tool states are functioning correctly.

## Screenshot Checklist

### Category 1: Initial Application State

#### Screenshot 1.1: Home Page / Chat Interface
**Purpose**: Show the initial application state with the chat input field ready for interaction.

**What to Show**:
- [ ] Next.js app loaded and running (http://localhost:3000)
- [ ] Empty chat history (no messages yet)
- [ ] Text input field visible
- [ ] Send button ready
- [ ] Application title "FlyRank Audit Assistant" visible (if displayed)

**Instructions to Capture**:
1. Run the application: `npm run dev`
2. Open browser to http://localhost:3000
3. Capture screenshot of empty chat interface
4. Should show clean slate for user interaction

**Expected Elements**:
- Input form at bottom or top
- Messages container (empty)
- Professional styling with Tailwind CSS
- Responsive layout

**Filename Suggestion**: `screenshot-01-home-page.png`

---

### Category 2: Non-Approval Tool Flow (runSiteAudit)

#### Screenshot 2.1: Tool Input Streaming
**Purpose**: Demonstrate the `input-streaming` state while LLM generates audit parameters.

**What to Show**:
- [ ] Gray dashed border container
- [ ] Pulsing gray dot animation
- [ ] Label text: "Preparing runSiteAudit request..." or similar
- [ ] State is brief but captured

**Instructions to Capture**:
1. Type a message like: "Audit example.com"
2. Watch for the gray dashed box to appear
3. The pulsing dot will animate during streaming
4. Capture quickly or use browser DevTools to slow execution
5. Screenshot the pulsing indicator

**Expected Elements**:
- Dashed gray border (2px dashed)
- Animated pulsing dot (gray-400 color)
- Text in gray
- Rounded corners

**Timing Note**: This state lasts only 100-300ms, so fast capture or DevTools slowdown is needed

**Filename Suggestion**: `screenshot-02-input-streaming.png`

---

#### Screenshot 2.2: Tool Input Available
**Purpose**: Demonstrate the `input-available` state showing tool execution in progress.

**What to Show**:
- [ ] Blue border container
- [ ] Animated ping dot (expands outward)
- [ ] Label text: "Auditing example.com..." or similar
- [ ] Input has been validated and execution is proceeding

**Instructions to Capture**:
1. Continue from previous screenshot or make another audit request
2. Look for blue bordered box with animated dot
3. Label should show tool is executing
4. Ping animation creates expanding circles
5. Capture the animated state

**Expected Elements**:
- Solid blue border (2px solid)
- Light blue background
- Animated ping dot (blue-500 color)
- Text in blue
- Rounded corners

**Duration**: ~50ms-600ms depending on tool execution time

**Filename Suggestion**: `screenshot-03-input-available.png`

---

#### Screenshot 2.3: Tool Output Available (AuditCard)
**Purpose**: Demonstrate successful tool execution with structured result rendering.

**What to Show**:
- [ ] Audit Card component displayed
- [ ] Circular progress gauge showing score percentage
- [ ] Letter grade badge (A, B, C, or D)
- [ ] Issues list (or "No issues found")
- [ ] Timestamp of audit execution
- [ ] Professional card styling with border and shadow

**Instructions to Capture**:
1. Wait for audit tool to complete execution
2. Look for white card with blue border
3. SVG circular gauge should show score (e.g., 82%)
4. Grade badge displayed with color coding
5. Issues list visible (if any)
6. Timestamp at bottom
7. Capture complete card

**Expected Elements**:
- Blue border (#bee3f8)
- White background
- Circular SVG gauge (percentage filled)
- Grade badge with appropriate color (A=green, B=blue, C=amber, D=red)
- Bulleted list of issues
- ISO timestamp formatted to locale
- Card shadow and rounded corners

**Grade Color Mapping**:
- A: Green background and text
- B: Blue background and text
- C: Amber background and text
- D: Red background and text

**Filename Suggestion**: `screenshot-04-audit-card-success.png`

---

#### Screenshot 2.4: Tool Output Error (Validation Error)
**Purpose**: Demonstrate error handling when tool receives invalid input.

**What to Show**:
- [ ] Red bordered error container
- [ ] Warning emoji (⚠️)
- [ ] Error message with "Tool failed:" prefix
- [ ] Clear indication of what went wrong

**Instructions to Capture**:
1. Type a message that would cause validation error
2. Wait for error state to appear
3. Look for red bordered box with warning emoji
4. Error message should explain the problem
5. Capture the error display

**Ways to Trigger Error**:
- LLM generates invalid domain (empty string)
- LLM provides wrong type (number instead of string)
- Network timeout during execution

**Expected Elements**:
- Red border (#f87171)
- Light red background
- Warning emoji (⚠️)
- Bold "Tool failed:" prefix
- Error message text
- Rounded corners

**Example Error Messages**:
- "Tool failed: domain cannot be empty string"
- "Tool failed: domain must be a string"
- "Tool failed: Request timeout after 600ms"

**Filename Suggestion**: `screenshot-05-output-error.png`

---

### Category 3: Approval Workflow (deleteAuditReport)

#### Screenshot 3.1: Tool Input Streaming (Delete)
**Purpose**: Show input-streaming state for approval-required tool.

**What to Show**:
- [ ] Gray dashed container (same as non-approval tool)
- [ ] Pulsing dot animation
- [ ] Label: "Preparing deleteAuditReport request..." or similar
- [ ] Indicates delete operation is being prepared

**Instructions to Capture**:
1. Type message like: "Delete the report for example.com, report-001"
2. Watch for gray dashed box
3. Capture pulsing indicator
4. Should look similar to audit tool streaming

**Expected Elements**:
- Dashed gray border
- Pulsing gray dot
- Gray text
- Rounded corners

**Filename Suggestion**: `screenshot-06-delete-input-streaming.png`

---

#### Screenshot 3.2: Approval Requested (DeleteApprovalPrompt)
**Purpose**: Demonstrate user approval gate with confirmation prompt.

**What to Show**:
- [ ] Red bordered warning card
- [ ] Warning emoji (⚠️) at top
- [ ] "Confirm Deletion" heading in red
- [ ] Message explaining what will be deleted
- [ ] Bold domain and reportId in the message
- [ ] "Confirm Delete" button (red, destructive styling)
- [ ] "Cancel" button (gray, neutral styling)
- [ ] Text: "This action cannot be undone"

**Instructions to Capture**:
1. Trigger delete tool by asking to delete a report
2. Tool will reach approval gate
3. DeleteApprovalPrompt will render
4. Two buttons: red "Confirm Delete" and gray "Cancel"
5. Capture the prompt before clicking either button

**Expected Elements**:
- Red border (#fca5a5)
- Light red background (#fee2e2)
- Warning emoji (⚠️)
- Bold red heading text
- Body text with domain/reportId in bold
- Red "Confirm Delete" button (bold, destructive color)
- Gray "Cancel" button (neutral)
- Rounded corners

**Critical Message Parts**:
- Shows which domain is affected
- Shows which reportId is affected
- Warning: "This action cannot be undone"
- Clear call to action

**Filename Suggestion**: `screenshot-07-approval-prompt.png`

---

#### Screenshot 3.3: Approval Responded (Approved)
**Purpose**: Show transitional state after user approves, before execution completes.

**What to Show**:
- [ ] Blue bordered container (ToolInputAvailable)
- [ ] Animated ping dot
- [ ] Label text: "Approved — deleting report..." or similar
- [ ] Indicates user decision is being acted upon

**Instructions to Capture**:
1. From approval prompt, click "Confirm Delete"
2. Brief transition state will appear (50-400ms)
3. Message indicates approval and action
4. Capture if possible (may be quick)
5. Next screenshot will be final result

**Expected Elements**:
- Blue border
- Light blue background
- Animated ping dot
- Blue text indicating approval and action proceeding
- Rounded corners

**Duration**: Very brief (may flash)

**Filename Suggestion**: `screenshot-08-approval-responded-approved.png`

---

#### Screenshot 3.4: Output Available (DeleteResultCard - Approved)
**Purpose**: Show successful deletion result when user approved.

**What to Show**:
- [ ] White card with green border
- [ ] Trash emoji (🗑️) icon
- [ ] Heading: "Deletion Confirmed" or similar
- [ ] Message: "Report [reportId] for [domain] has been deleted"
- [ ] Timestamp of deletion
- [ ] Professional card styling
- [ ] Clear confirmation that operation succeeded

**Instructions to Capture**:
1. After approval-responded state, deletion completes
2. DeleteResultCard will display
3. Should show green border (success indicator)
4. Trash emoji visually indicates deletion
5. Domain and reportId are shown
6. Timestamp is formatted to locale
7. Capture complete result card

**Expected Elements**:
- Green border (#86efac)
- White background
- Trash emoji (🗑️) large/prominent
- Bold heading "Deletion Confirmed"
- Body text: "Report [reportId] for [domain] has been deleted"
- Timestamp: formatted date/time
- Card shadow and rounded corners

**Filename Suggestion**: `screenshot-09-delete-result-card.png`

---

#### Screenshot 3.5: Output Denied (User Cancels)
**Purpose**: Show result when user cancels/denies approval.

**What to Show**:
- [ ] Amber bordered container
- [ ] Blocked emoji (🚫)
- [ ] Message: "Action was not approved"
- [ ] Clear indication operation was cancelled
- [ ] No destructive action was performed

**Instructions to Capture**:
1. Trigger delete operation again
2. When approval prompt appears, click "Cancel"
3. Briefly transitions through approval-responded
4. Then shows output-denied state
5. Capture the denial message

**Expected Elements**:
- Amber border (#f59e0b)
- Light amber background (#fef3c7)
- Blocked emoji (🚫)
- Amber text
- Message: "Action was not approved"
- Rounded corners

**Semantic Meaning**:
- User explicitly rejected the operation
- No error occurred; user made a choice
- Report was NOT deleted (safe)
- Different from error state

**Filename Suggestion**: `screenshot-10-output-denied.png`

---

### Category 4: Full Conversation Flow

#### Screenshot 4.1: Complete Chat History
**Purpose**: Show a full conversation demonstrating multiple tool invocations and states.

**What to Show**:
- [ ] User message: first audit request
- [ ] Assistant response with tool states and result
- [ ] User message: second interaction (approval request)
- [ ] Assistant response with approval flow
- [ ] Multiple tools used in same session
- [ ] Proper styling and message formatting
- [ ] Chat scrollable and well-organized

**Instructions to Capture**:
1. Perform the following interactions in order:
   - User: "Audit example.com"
   - (Tool executes, shows all states)
   - User: "Can you delete the report for example.com, report-001?"
   - (Tool goes to approval gate)
   - Click "Confirm Delete"
   - (Tool executes deletion)
2. Once complete, scroll to show full conversation
3. Capture screenshot showing history

**Expected Elements**:
- User messages on one side (typically right/blue)
- Assistant messages on other side (typically left/gray)
- Multiple tool invocations with state transitions
- AuditCard visible
- DeleteApprovalPrompt visible
- DeleteResultCard visible
- Proper spacing and formatting
- Chat interface remains clean

**Filename Suggestion**: `screenshot-11-full-chat-history.png`

---

#### Screenshot 4.2: Error Scenario in Context
**Purpose**: Show error handling within full conversation.

**What to Show**:
- [ ] User message that causes error
- [ ] Tool execution with error state
- [ ] Red bordered error box with ⚠️
- [ ] Error message clearly displayed
- [ ] Conversation continues normally after error
- [ ] User can ask for retry or different action

**Instructions to Capture**:
1. In same session, trigger an error:
   - User: "Audit" (without domain)
   - Or: "Delete the report" (without specifying reportId)
2. LLM should make a best effort but may generate incomplete input
3. Tool will fail validation or execution
4. Error state renders in red
5. Capture the error in conversation context

**Expected Elements**:
- Previous successful interactions visible
- Error box in red with warning emoji
- Clear error message
- Conversation after error can continue
- No crash or UI breakdown

**Filename Suggestion**: `screenshot-12-error-in-context.png`

---

### Category 5: Component-Level Details

#### Screenshot 5.1: Close-up of AuditCard
**Purpose**: Detail view of audit result component structure.

**What to Show**:
- [ ] Circular progress gauge (close-up)
- [ ] Score percentage displayed (e.g., 85%)
- [ ] Grade badge with color
- [ ] Grade letter clearly visible
- [ ] Issues list (if any)
- [ ] Timestamp precision
- [ ] SVG rendering quality

**Instructions to Capture**:
1. Get an audit result (AuditCard)
2. Take a zoomed-in or cropped screenshot
3. Focus on the gauge and badges
4. Show detail of typography and spacing
5. Verify color scheme (grade colors)

**Verification Points**:
- Circular gauge is SVG and renders correctly
- Score percentage fills correctly (85% fills 85% of circle)
- Grade badge: A=green, B=blue, C=amber, D=red
- Letter is centered in badge
- Issues are bulleted and readable
- Timestamp is formatted (e.g., "Jan 15, 2024 at 2:23 PM")

**Filename Suggestion**: `screenshot-13-audit-card-detail.png`

---

#### Screenshot 5.2: Close-up of Approval Prompt
**Purpose**: Detail view of approval gate interaction.

**What to Show**:
- [ ] Warning emoji (⚠️) clearly visible
- [ ] Red heading text
- [ ] Body text fully readable
- [ ] Domain and reportId in bold
- [ ] "Confirm Delete" button styling (red, bold)
- [ ] "Cancel" button styling (gray)
- [ ] Button hover/active states (if captured with hover)
- [ ] Overall card design and spacing

**Instructions to Capture**:
1. Trigger approval prompt for delete operation
2. Take close-up screenshot
3. Focus on text readability and button clarity
4. Optional: hover over buttons to show active state
5. Show fine details of styling

**Verification Points**:
- Warning emoji is visible
- Red text (hex #991b1b or similar)
- Domain name is bold and clear
- ReportId is bold and clear
- Text wraps appropriately
- "Confirm Delete" button is red (destructive)
- "Cancel" button is gray (neutral)
- Buttons are clearly clickable

**Filename Suggestion**: `screenshot-14-approval-prompt-detail.png`

---

#### Screenshot 5.3: State Indicators (Comparison)
**Purpose**: Show different state indicator components side-by-side for comparison.

**What to Show**:
- [ ] input-streaming indicator (gray dashed, pulsing)
- [ ] input-available indicator (blue solid, ping)
- [ ] output-error indicator (red, warning emoji)
- [ ] output-denied indicator (amber, blocked emoji)
- [ ] Each with distinct visual characteristics
- [ ] Animations visible (or frozen frames)

**Instructions to Capture**:
This is a composite screenshot showing multiple state indicators.

**Options**:
1. **Multiple audit requests**: Perform several audits in quick succession to capture different states
2. **Manual assembly**: Capture each state individually and arrange in documentation
3. **Video**: If screenshots alone are insufficient, video can show state transitions

**Filename Suggestion**: `screenshot-15-state-indicators-comparison.png`

---

### Category 6: Responsive Design and Layout

#### Screenshot 6.1: Desktop View
**Purpose**: Show application layout on desktop browser.

**What to Show**:
- [ ] Full width chat interface
- [ ] Input form at appropriate size
- [ ] Messages with proper spacing
- [ ] Components rendered at desktop scale
- [ ] Responsive layout working correctly

**Instructions to Capture**:
1. Open application on desktop (1920x1080 or similar)
2. Capture full screen
3. Should show optimal layout
4. Text readable, buttons easily clickable
5. No horizontal scrolling needed

**Filename Suggestion**: `screenshot-16-desktop-view.png`

---

#### Screenshot 6.2: Mobile/Tablet View (Optional)
**Purpose**: Demonstrate responsive design on smaller screens.

**What to Show**:
- [ ] Application adapts to mobile width
- [ ] Touch-friendly button sizing
- [ ] Text remains readable
- [ ] Cards stack appropriately
- [ ] Input form accessible at bottom

**Instructions to Capture**:
1. Open browser DevTools
2. Toggle device toolbar (mobile/tablet size)
3. Resize to iPhone/iPad dimensions
4. Capture responsive layout
5. Verify no text overflow or layout breaking

**Filename Suggestion**: `screenshot-17-mobile-view.png`

---

## Evidence Compilation Instructions

### How to Use This Checklist

1. **For Each Screenshot**:
   - [ ] Read the "What to Show" section
   - [ ] Follow "Instructions to Capture"
   - [ ] Verify all "Expected Elements" are visible
   - [ ] Use suggested filename for organization
   - [ ] Save in `evidence/` folder

2. **Documentation**:
   - Capture screenshots as you test
   - Keep filenames consistent with suggestions
   - Organize by category folder if helpful
   - Note any deviations or interesting findings

3. **Validation Checklist**:
   - [ ] All 7 tool states captured in screenshots
   - [ ] Both tools demonstrated (audit + delete)
   - [ ] Error handling shown
   - [ ] Approval workflow complete
   - [ ] Component styling verified
   - [ ] Color scheme matches specification
   - [ ] Animations visible (in video or description)

### Organizing Evidence Folder

```
evidence/
├── 01-initial-state/
│   └── screenshot-01-home-page.png
├── 02-non-approval-tool/
│   ├── screenshot-02-input-streaming.png
│   ├── screenshot-03-input-available.png
│   ├── screenshot-04-audit-card-success.png
│   └── screenshot-05-output-error.png
├── 03-approval-workflow/
│   ├── screenshot-06-delete-input-streaming.png
│   ├── screenshot-07-approval-prompt.png
│   ├── screenshot-08-approval-responded.png
│   ├── screenshot-09-delete-result-card.png
│   └── screenshot-10-output-denied.png
├── 04-full-flow/
│   ├── screenshot-11-full-chat-history.png
│   └── screenshot-12-error-in-context.png
├── 05-component-details/
│   ├── screenshot-13-audit-card-detail.png
│   ├── screenshot-14-approval-prompt-detail.png
│   └── screenshot-15-state-indicators-comparison.png
└── 06-responsive/
    ├── screenshot-16-desktop-view.png
    └── screenshot-17-mobile-view.png
```

---

## Demonstration Walkthrough

### Step-by-Step Script for Live Demo

**Prerequisites**:
- Application running: `npm run dev`
- Browser open to http://localhost:3000

---

### Demo Scenario 1: Basic Audit Flow (2-3 minutes)

**Step 1**: Show home page
- [ ] Screenshot 1.1 (home page)
- Point out: input field, send button, empty chat

**Step 2**: Request first audit
- Type: "Can you audit my website at example.com?"
- [ ] Screenshot 2.1 (input-streaming)
- Point out: gray dashed border, pulsing dot
- Duration: brief (100-300ms)

**Step 3**: Watch tool execution
- [ ] Screenshot 2.2 (input-available)
- Point out: blue border, ping dot animation, label shows "Auditing example.com"
- Duration: ~600ms

**Step 4**: View result
- [ ] Screenshot 2.3 (AuditCard)
- Point out: circular gauge, grade badge, issues list, timestamp
- Explain: all tool output rendered in structured format

**Talking Points**:
- "Tool states progress automatically"
- "Each state has distinct visual appearance"
- "Result is formatted and easy to read"
- "Timestamp shows when audit was performed"

---

### Demo Scenario 2: Error Handling (1-2 minutes)

**Step 1**: Trigger error
- Type: "Audit" (without domain)
- LLM will attempt, but may generate incomplete/invalid input

**Step 2**: View error state
- [ ] Screenshot 5 (output-error)
- Point out: red border, warning emoji, error message
- Explain: "Tool validates input and rejects invalid requests"

**Step 3**: Recover gracefully
- Type: "Let's try again with google.com"
- Tool executes normally
- [ ] Screenshot 2.3 (AuditCard success)
- Point out: "Error didn't crash app; we can continue"

**Talking Points**:
- "Error handling is robust"
- "Users see clear error messages"
- "Application remains stable"
- "Conversation can continue after error"

---

### Demo Scenario 3: Approval Workflow (3-4 minutes)

**Step 1**: Request deletion
- Type: "Delete the audit report for google.com, report-001"
- [ ] Screenshot 6 (input-streaming for delete)

**Step 2**: Show approval gate
- Tool reaches approval gate
- [ ] Screenshot 7 (approval-prompt)
- Point out: warning message, domain/reportId shown, two buttons
- Explain: "Destructive operations require approval"

**Step 3a (Path A - Approve)**: User approves
- Click "Confirm Delete"
- [ ] Screenshot 8 (approval-responded)
- [ ] Screenshot 9 (delete-result-card)
- Point out: "Deletion confirmed, timestamp shows when deleted"
- Explain: "User approved the operation, it executed successfully"

**Step 3b (Path B - Deny)**: User denies (alternative)
- Instead of Step 3a, click "Cancel"
- [ ] Screenshot 10 (output-denied)
- Point out: "Blocked emoji, message says not approved"
- Explain: "User can veto destructive operations"

**Talking Points**:
- "Sensitive operations have approval gates"
- "Users control destructive actions"
- "Two clear paths: approved or denied"
- "No guessing about what happened"

---

### Demo Scenario 4: Full Conversation (2-3 minutes)

**Step 1**: Show complete history
- Scroll to show all messages from entire demo
- [ ] Screenshot 11 (full chat history)

**Step 2**: Point out elements
- Multiple audit results (AuditCards)
- Approval interaction
- Error handling
- Conversation is coherent and organized

**Step 3**: Explain workflow
- "User initiates action"
- "LLM determines which tool to use"
- "Tool execution streams to UI"
- "Each state is rendered distinctly"
- "User can see exactly what's happening"

**Talking Points**:
- "Full transparency in tool execution"
- "Progressive UI updates"
- "Professional, polished interface"
- "Handles both success and failure gracefully"

---

## Success Criteria

A complete evidence submission should demonstrate:

### Functional Requirements Met ✓
- [ ] Tool invocation visible in UI
- [ ] Tool input parameters shown
- [ ] Tool output rendered as structured component
- [ ] Two different tools used (audit + delete)
- [ ] Approval workflow working
- [ ] Error handling functional

### State Visibility Met ✓
- [ ] All 7 tool states visible in screenshots or video
- [ ] Each state has distinct visual appearance
- [ ] State transitions are clear
- [ ] Terminal states confirmed

### UI Quality Met ✓
- [ ] Professional styling with Tailwind CSS
- [ ] Colors match specification
- [ ] Animations present (or visible in video)
- [ ] Responsive layout works
- [ ] Typography readable
- [ ] Components well-organized

### Error Handling Met ✓
- [ ] Error state renders correctly
- [ ] Error messages are informative
- [ ] Application remains stable
- [ ] User can recover from errors

### Approval Workflow Met ✓
- [ ] Approval prompt displays correctly
- [ ] User can confirm or deny
- [ ] Approval decision affects tool execution
- [ ] Denied operations don't execute

---

## Notes

- **Screenshots are the primary evidence**. Video recordings are optional but helpful for capturing animations.
- **No fabrication**: Use only actual application output. Don't create fake results.
- **Consistent style**: Keep background, browser size, and lighting consistent across screenshots.
- **Annotations are helpful**: If screenshots are presented in a document, use arrows or circles to highlight key elements.
- **Error scenarios should be natural**: Don't force errors; capture them as they naturally occur during testing.

---

**Last Updated**: January 2024  
**For**: FE-07 – Tool Results and Structured Output in the UI  
**Evidence Checklist Version**: 1.0

