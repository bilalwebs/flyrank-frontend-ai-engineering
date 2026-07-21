# Claude Instructions

Guidelines for AI-assisted frontend development in the **FlyRank Frontend AI Engineering** repository.

## Project Goal

Build clean, production-ready web applications while learning modern frontend skills with AI coding assistants.

## Tech Stack

- **Framework:** Next.js, React
- **Language:** TypeScript (preferred over JavaScript)
- **Styling:** Tailwind CSS

## Coding Conventions

### Components

- Use **React functional components** — no class components.
- Keep components small and focused on one job.
- Prefer **reusable components** over copy-pasted UI.
- Use clear, descriptive names (e.g. `UserCard`, `SubmitButton`).

### TypeScript

- Prefer **TypeScript** for all new files (`.ts`, `.tsx`).
- Define props with interfaces or types — avoid `any`.
- Let TypeScript catch errors early; don't silence types unnecessarily.

### Code Quality

- Write **clean, readable code** — simple logic beats clever tricks.
- Follow existing patterns in the project before introducing new ones.
- Follow **ESLint** rules; fix lint warnings before finishing a task.
- Add comments only when the *why* isn't obvious from the code.

### Commits

- Use **Conventional Commits** for clear history:

  ```
  feat: add login form
  fix: correct mobile nav spacing
  docs: update setup instructions
  refactor: extract shared button styles
  ```

### File Organization

- Put shared UI in a `components/` folder.
- Keep page-level logic in `app/` or `pages/` (depending on the project).
- Co-locate small helpers near the code that uses them.

## Working with AI

- Make small, focused changes — one feature or fix at a time.
- Match the style and structure of existing code in the repo.
- Explain trade-offs briefly when there are multiple valid approaches.
- Never accept AI output without reading it — verify types, imports, accessibility, and edge cases.
- Save prompts and outputs for assignment documentation when the task is part of the internship track.

## Prompt Engineering

When asking AI to generate code or documentation:

1. **Assign a role** — e.g. senior frontend engineer specializing in React and TypeScript.
2. **Provide context** — project goal, file location, and why the feature exists.
3. **Set constraints** — stack, libraries, patterns to follow, and things to avoid.
4. **Request structure** — ask for purpose, props, code, usage example, and best practices.
5. **Decompose steps** — require edge-case analysis and accessibility review before code.
6. **Verify output** — ask the model to check requirements and suggest test cases.

Prefer cumulative prompt improvements (one technique at a time) over vague one-shot requests.

## Forms

- All forms must use **React Hook Form** with **Zod** validation via `@hookform/resolvers`.
- Define schemas in a separate file (e.g. `lib/validation/`) and infer TypeScript types with `z.infer`.
- Show validation errors with accessible messaging (`role="alert"`, `aria-describedby`, `aria-invalid`).
- Disable submit buttons while `isSubmitting` is true.

## Accessibility

- Use semantic HTML (`form`, `label`, `input`, `button`, heading hierarchy).
- Associate every input with a visible `<label htmlFor="...">`.
- Ensure all interactive elements are keyboard accessible without custom widgets unless necessary.
- Add ARIA attributes only when native semantics are insufficient.
- External links that open in a new tab must use `rel="noopener noreferrer"`.

## Project Rules Learned

1. Use TypeScript for all React components.
2. All forms must use React Hook Form with Zod validation. Never manage form state manually with useState unless there is a specific reason.
3. Use Tailwind CSS only. Avoid inline styles.
4. Build reusable components instead of page-specific components.
5. Every form must include semantic HTML, associated labels, keyboard accessibility, and appropriate ARIA attributes.
