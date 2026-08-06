# NOTES

## Accessible Components Comparison

For this assignment, I built three components manually:

- Modal
- Disclosure
- Tabs

After that, I installed shadcn/ui and compared my implementation with the generated Dialog and Tabs components.

---

## What shadcn handled better

### 1. Better Focus Management

My modal implements focus trapping manually.

shadcn uses Radix UI, which automatically:

- traps keyboard focus
- restores focus after closing
- handles nested dialogs

---

### 2. Better Accessibility

My implementation includes:

- role="dialog"
- aria-modal
- aria-labelledby
- aria-describedby

shadcn also handles additional accessibility details internally, reducing the chance of mistakes.

---

### 3. Portal Rendering

My modal renders directly in the page.

shadcn renders dialogs using a React Portal, preventing z-index and layout issues.

---

### 4. Keyboard Support

My tabs support:

- Arrow Left
- Arrow Right

shadcn provides more complete keyboard behavior and edge-case handling.

---

### 5. Reusable Architecture

My components are written for this assignment.

shadcn components are reusable, composable, and production-ready.

---

## What I learned

This assignment helped me understand:

- ARIA roles
- Focus management
- Keyboard accessibility
- Focus trap
- Accessible modal dialogs
- Accessible tabs
- Disclosure pattern

Building the components manually helped me better understand what shadcn abstracts away.