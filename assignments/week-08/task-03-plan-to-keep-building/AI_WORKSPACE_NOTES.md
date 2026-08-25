# AI Workspace Notes

How the AI coding workspace will be maintained for future projects.

---

## Portfolio Identity

### Who I Am

- **Name:** Muhammad Bilal Hussain
- **Role:** Frontend AI Engineer
- **Focus:** Building accessible, performant web applications with AI integration
- **Internship:** FlyRank Frontend AI Engineering

### What the Portfolio Represents

This portfolio is not a template. Every component, every design decision, and every line of code was built from scratch with AI assistance, then manually reviewed and verified. It demonstrates:

1. **Technical competence** — Modern React, TypeScript, Three.js, GLSL shaders
2. **AI literacy** — Effective use of AI tools while understanding the output
3. **Engineering judgment** — Knowing when to use Server vs Client Components, when to optimize, when to ship
4. **Accessibility commitment** — WCAG compliance, keyboard navigation, screen reader support
5. **Professional documentation** — Architecture docs, case studies, demo scripts

### Personalization Notes

- Name: Muhammad Bilal Hussain (replace "Your Name" everywhere)
- GitHub: bilalwebs
- Email: Replace placeholder in `data/site.ts`
- Projects: Add real projects as they're completed
- Skills: Update levels honestly after each project

---

## Coding Preferences

### Language and Style

- **TypeScript always** — No JavaScript files. Strict mode enabled.
- **No `any` types** — Define proper interfaces in `types/index.ts`
- **Functional components only** — No class components
- **Named exports** — `export function ComponentName()` not `export default`
- **Props interfaces** — Defined above the component, not inline

### Component Patterns

```typescript
// Preferred: Server Component by default
export function MyComponent({ data }: MyComponentProps) {
  return <div>{/* renders on server */}</div>
}

// Only when needed: Client Component
"use client"
export function InteractiveComponent({ onAction }: Props) {
  const [state, setState] = useState()
  return <div onClick={onAction}>{/* renders on client */}</div>
}
```

### File Organization

```
components/
├── layout/          # Header, Footer, Nav (shared across pages)
├── sections/        # Page-specific composed sections
├── ui/              # Reusable, prop-driven UI components
├── hero/            # Shader hero components
└── three/           # Three.js/React Three Fiber components

data/                # All content (portfolio, navigation, site config)
lib/                 # Utilities, validation schemas, helpers
types/               # TypeScript interfaces (one file, all types)
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Component | PascalCase | `ProjectCard.tsx` |
| Utility | camelCase | `formatDate.ts` |
| Data file | camelCase | `portfolio.ts` |
| CSS file | camelCase | `globals.css` |
| Interface | PascalCase | `Project`, `SkillGroup` |
| Type alias | PascalCase | `SkillCategory` |

---

## Technology Stack

### Core (Non-Negotiable)

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 15+ | Framework (App Router) |
| React | 19+ | UI library |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 4+ | Styling |

### 3D / Visual (Portfolio-specific)

| Technology | Version | Role |
|------------|---------|------|
| Three.js | 0.185+ | 3D rendering |
| React Three Fiber | 9+ | React renderer for Three.js |
| @react-three/drei | 10+ | R3F helpers |
| GLSL | — | Custom shaders |

### Forms

| Technology | Version | Role |
|------------|---------|------|
| React Hook Form | 7+ | Form state management |
| Zod | 4+ | Schema validation |
| @hookform/resolvers | 5+ | Bridge between Hook Form and Zod |

### Future Projects

| Technology | When to Use |
|------------|-------------|
| Prisma | Database ORM |
| PostgreSQL | Relational data |
| NextAuth.js | Authentication |
| OpenAI API | AI features |
| Recharts | Data visualization |
| Playwright | E2E testing |
| Vitest | Unit testing |

---

## Design Style

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#4c5fd5` | Buttons, links, focus rings |
| `--color-primary-hover` | `#3b4fc4` | Hover states |
| `--color-accent` | `#e8a33d` | Highlights, badges |
| `--background` | `#ffffff` / `#0a0a0a` | Light/dark backgrounds |
| `--foreground` | `#171717` / `#ededed` | Light/dark text |

### Typography

- **Font:** Geist Sans (headings, body)
- **Mono:** Geist Mono (code, technical content)
- **Sizes:** Tailwind's `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-4xl`, `text-5xl`, `text-7xl`
- **Weights:** `font-normal`, `font-medium`, `font-semibold`, `font-bold`

### Spacing and Layout

- Max width: `max-w-6xl` (1152px)
- Padding: `px-4 sm:px-6 lg:px-8`
- Section spacing: `py-20 sm:py-32`
- Grid gaps: `gap-6` or `gap-8`

### Dark Mode

- System preference based (`prefers-color-scheme`)
- No manual toggle (keep it simple)
- All components use `dark:` Tailwind variants

### Animation Principles

- Respect `prefers-reduced-motion`
- Use `transition-colors` for hover effects
- Use `animate-bounce` sparingly (only for scroll indicators)
- No auto-playing animations except shaders (with reduced motion fallback)

---

## Future Workflow

### Starting a New Project

1. **Plan** — Write the project plan (features, tech stack, timeline)
2. **Scaffold** — `npx create-next-app@latest` with TypeScript + Tailwind
3. **AI assistance** — Use OpenCode for code generation, following the prompt engineering principles from CLAUDE.md
4. **Manual review** — Every AI-generated file gets lint-checked and build-verified
5. **Iterate** — Small focused changes, one feature at a time
6. **Test** — Lint, build, manual testing at minimum
7. **Deploy** — Vercel for web apps
8. **Document** — Case study, README, portfolio update

### AI Prompt Strategy

1. **Assign a role** — "You are a senior frontend engineer specializing in React and TypeScript"
2. **Provide context** — Project goal, file location, existing patterns
3. **Set constraints** — Tech stack, naming conventions, things to avoid
4. **Request structure** — Ask for purpose, props, code, usage
5. **Verify output** — Always lint and build after AI generates code

### Quality Gates

Before any commit:
- [ ] `npm run lint` — 0 errors, 0 warnings
- [ ] `npm run build` — Successful
- [ ] Manual test — Key user flows work
- [ ] Code review — Read every changed file

---

## Maintenance Notes

| Task | Frequency |
|------|-----------|
| Update skill levels | After each project |
| Add new projects | After each completion |
| Refresh bio/tagline | Every 6 months |
| Review accessibility | Quarterly |
| Check for dependency updates | Monthly |
| Full portfolio audit | Annually |
