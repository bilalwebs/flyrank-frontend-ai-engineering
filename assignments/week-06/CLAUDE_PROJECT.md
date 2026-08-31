# Claude Project Continuity

Reusable AI project context for building consistent portfolio case studies across the FlyRank Frontend AI Engineering internship.

---

## Project Identity

| Field | Value |
|-------|-------|
| **Author** | Muhammad Bilal Hussain |
| **Role** | AI Engineer | Full Stack Developer |
| **Program** | FlyRank Frontend AI Engineering Internship |
| **Repository** | flyrank-frontend-ai-engineering |
| **Root** | `G:\Data_Science\flyrank-frontend-ai-engineering\assignments` |

---

## Writing Style

| Aspect | Convention |
|--------|------------|
| Tone | Professional, technical, concise |
| Language | English (US) |
| Headings | Title case for H1, sentence case for H2+ |
| Code blocks | Fenced with language tags |
| Tables | Markdown tables with headers |
| Lists | Bullet points for features, numbered for steps |

---

## Preferred Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.x (strict mode) |
| Styling | Tailwind CSS | 4.x |
| Forms | React Hook Form + Zod | Latest |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | Latest |
| Testing | Vitest + Playwright | Latest |
| Deployment | Vercel | — |

---

## Coding Conventions

### Components

- Use **React functional components** — no class components
- Keep components small and focused on one job
- Prefer **reusable components** over copy-pasted UI
- Use clear, descriptive names (e.g., `UserCard`, `SubmitButton`)

### TypeScript

- Prefer **TypeScript** for all new files (`.ts`, `.tsx`)
- Define props with interfaces or types — avoid `any`
- Let TypeScript catch errors early

### Code Quality

- Write **clean, readable code** — simple logic beats clever tricks
- Follow existing patterns in the project before introducing new ones
- Follow **ESLint** rules; fix lint warnings before finishing a task
- Add comments only when the *why* isn't obvious from the code

### Commits

Use **Conventional Commits**:

```
feat: add login form
fix: correct mobile nav spacing
docs: update setup instructions
refactor: extract shared button styles
```

---

## Portfolio Structure

Every case study follows this folder structure:

```
week-XX/
└── <project-name>/
    ├── src/
    │   ├── app/           # Next.js App Router
    │   ├── components/    # Reusable UI components
    │   ├── lib/           # Utilities and helpers
    │   └── types/         # TypeScript types
    ├── tests/             # Unit and E2E tests
    ├── README.md          # Main documentation (three-beat structure)
    ├── REFLECTION.md      # Personal reflection
    └── DEPLOYMENT.md      # Deployment instructions
```

---

## Prompt Strategy

When asking AI to generate code or documentation:

1. **Assign a role** — e.g., senior frontend engineer specializing in React and TypeScript
2. **Provide context** — project goal, file location, and why the feature exists
3. **Set constraints** — stack, libraries, patterns to follow, and things to avoid
4. **Request structure** — ask for purpose, props, code, usage example, and best practices
5. **Decompose steps** — require edge-case analysis and accessibility review before code
6. **Verify output** — ask the model to check requirements and suggest test cases

Prefer cumulative prompt improvements (one technique at a time) over vague one-shot requests.

---

## Reusable Context

Copy this context into new Claude projects to maintain consistency:

```
You are a senior frontend engineer specializing in React, TypeScript, and Next.js.

Project: FlyRank Frontend AI Engineering Portfolio
Stack: Next.js 16, TypeScript 5.x (strict), Tailwind CSS 4.x, React Hook Form + Zod
Style: Functional components, reusable UI, semantic HTML, accessible (WCAG 2.1 AA)
Testing: Vitest for unit tests, Playwright for E2E tests
Deployment: Vercel
Commits: Conventional Commits format

Rules:
- All forms use React Hook Form with Zod validation
- Tailwind CSS only — no inline styles
- Build reusable components, not page-specific ones
- Every form includes semantic HTML, associated labels, keyboard accessibility, and ARIA attributes
- TypeScript strict mode — no any types
- ESLint clean before finishing
```

---

## Accessibility Checklist

Every project must meet WCAG 2.1 AA:

- [ ] Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] All inputs have associated `<label>` elements
- [ ] Error messages use `role="alert"`
- [ ] Keyboard navigation works for all interactive elements
- [ ] `prefers-reduced-motion` disables animations
- [ ] Focus indicators are visible on all interactive elements
- [ ] External links use `rel="noopener noreferrer"`

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ButtonShowcase.tsx` |
| Hooks | camelCase with `use` prefix | `useButtonState.ts` |
| Utilities | camelCase | `validation.ts` |
| Constants | camelCase | `animations.ts` |
| Types | PascalCase | `button.ts` (contains interfaces) |
| Tests | Component name + `.test.tsx` | `ContactForm.test.tsx` |
