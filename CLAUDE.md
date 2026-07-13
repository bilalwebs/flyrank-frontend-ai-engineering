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
