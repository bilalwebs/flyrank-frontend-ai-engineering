# Prompts Used During Development

Chronological log of prompts used to build the Next.js AI Portfolio.

---

## Phase 1 — Foundation

**Prompt:** Set up the Next.js project with App Router, TypeScript, Tailwind CSS. Create types, data files, Zod validation schema, and global styles. Do not build any pages, components, or routes.

## Phase 2 — Layout Foundation

**Prompt:** Build the root layout with metadata, Header (Client Component with usePathname), MobileNav (accessible slide drawer), and Footer (Server Component). Include skip-to-content link and semantic landmarks.

## Phase 3 — Reusable UI Components

**Prompt:** Create Button (polymorphic with variants/sizes/loading), SectionTitle, SkillCard, ProjectCard (Next.js Image), and SocialLinks. All props-driven, strict TypeScript, no any.

## Phase 4 — Home Page

**Prompt:** Build the home page as a Server Component with Hero, FeaturedSkills, FeaturedProjects, and CTASection sections. Use data from data/portfolio.ts.

## Phase 5 — About Page

**Prompt:** Build the about page with AboutHero (profile image, bio, metadata), ExperienceTimeline (vertical timeline), and StatsSection (stat cards grid).

## Phase 6 — Skills Page

**Prompt:** Build the skills page with SkillsHero, SkillsCategory (reusable category wrapper), and SkillsGrid (renders all skill groups dynamically from data).

## Phase 7 — Projects Page

**Prompt:** Build the projects page with ProjectsHero, FeaturedProject (highlighted project card), and ProjectsGrid (remaining projects in responsive grid).

## Phase 8 — Contact Page

**Prompt:** Build the contact page with ContactHero, ContactForm (Client Component with React Hook Form + Zod validation, mock submission, loading/success states), and ContactInfoSection (with SocialLinks).

## Phase 9 — Health, Error Handling

**Prompt:** Create Health Check page (runtime metadata), Custom 404 (not-found.tsx), Error Boundary (error.tsx Client Component with retry), and Loading UI (skeleton placeholders).

## Phase 10 — Production Polish

**Prompt:** Enhanced SEO metadata, code quality improvements (category lookup optimization, clean up public folder), turbopack configuration, README.md, .env.example, and prompts.md.

## Phase 11 — Premium Redesign

**Prompt:** Upgrade the existing portfolio into a premium, production-ready foundation inspired by Vercel, Linear, Stripe, Claude, and ChatGPT. Redesign the design system (semantic color tokens, class-based dark mode with a manual theme toggle, gradient utilities, grid/glow backgrounds), upgrade every section (Hero, About cards, Project cards with status + demo placeholders, Contact cards, Footer), add reusable primitives (Container, Badge, Reveal, ThemeToggle, icon set), add scroll-reveal animations that respect `prefers-reduced-motion`, refresh all content to Muhammad Bilal Hussain / Frontend AI Engineer, and update README.md. Verify with lint, `tsc --noEmit`, and a production build.

---

## AI Tools Used

- **OpenCode** — Primary AI coding assistant for all code generation and project architecture
- **Manual Review** — Each phase was validated with lint and build checks, and fixes were applied for ESLint and TypeScript errors

## Manual Improvements

- Added `onClick` prop to Button component during Phase 8 for form reset interaction
- Replaced O(n^2) category lookup in FeaturedSkills with O(1) Map lookup
- Cleaned up unused SVG files from create-next-app boilerplate
- Removed redundant `useEffect` in Header to comply with `react-hooks/set-state-in-effect` rule