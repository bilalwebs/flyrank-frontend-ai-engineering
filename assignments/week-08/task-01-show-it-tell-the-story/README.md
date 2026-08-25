# Developer Portfolio — AI-Assisted Full-Stack Showcase

A modern, accessible, and performant developer portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Features an interactive 3D experience powered by React Three Fiber, comprehensive SEO optimization, and full keyboard/screen reader accessibility.

Built as the capstone project for the [FlyRank Frontend AI Engineering Internship](https://flyrank.ai).

---

## Project Overview

This portfolio is a personal showcase website designed for frontend developers. It serves as a single destination where recruiters, university reviewers, and employers can evaluate skills, review projects, and initiate contact.

**Who it is built for:** Frontend developers seeking internship or junior roles who want a production-quality portfolio that demonstrates real technical competence.

**Purpose:** To present projects, skills, and professional experience in a polished, accessible format while demonstrating mastery of modern web development practices.

**Value proposition:** Unlike template-based portfolios, this project was built from scratch with AI assistance, manually reviewed and verified at every stage. Every component, every line of code, and every design decision was made intentionally.

---

## Features

### Core Pages
- **Home** — Hero section with avatar, featured skills (top 6), featured projects, and call-to-action
- **About** — Professional bio, experience timeline, and statistics cards
- **Skills** — Categorized skill grid with progress bars and proficiency levels
- **Projects** — Project showcase with images, tags, GitHub/live links, and featured highlighting
- **Contact** — Form with React Hook Form + Zod validation, loading states, and error handling

### 3D Experience
- **Interactive 3D Scene** — React Three Fiber torus knot with click-to-change-color
- **Control Panel** — Toggle animation, wireframe mode, reset camera, pick colors
- **Keyboard Shortcuts** — Space (animation), W (wireframe), R (reset), arrow keys (color)
- **Lazy Loading** — Canvas loaded via `React.lazy()` to keep initial bundle small
- **WebGL Fallback** — Graceful degradation when WebGL is unavailable
- **Reduced Motion** — Respects `prefers-reduced-motion` OS setting

### Accessibility
- Skip-to-content link
- Semantic HTML throughout (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`)
- ARIA landmarks, labels, and live regions
- Keyboard navigation for all interactive elements
- WAI-ARIA Radio Group pattern for color picker
- Visible focus indicators (`focus-visible` ring)
- `aria-live="assertive"` status announcements for screen readers
- Form validation with accessible error messages (`role="alert"`, `aria-describedby`)

### SEO
- Root layout metadata with Open Graph and Twitter Card
- JSON-LD structured data (Person schema)
- Dynamic `robots.ts` and `sitemap.ts`
- Page-level metadata on all routes
- Canonical URLs via `metadataBase`

### Performance
- Server Component dominant architecture (16 of 20 components are Server)
- Lazy-loaded 3D canvas (~225KB gzip deferred)
- `React.memo` on scene components
- Geometry optimization (75% polygon reduction)
- AVIF/WebP image formats
- Static pre-rendering of 8 routes

### Security
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Error boundary does not expose raw errors

### Production Readiness
- TypeScript strict mode with 0 errors
- ESLint with core-web-vitals + TypeScript rules (0 warnings)
- Health check endpoint (`/health`)
- Custom 404 page
- Loading skeletons
- Error boundary with retry
- Analytics placeholder (ready for Google Analytics)
- PWA manifest

---

## Tech Stack

### Core

| Technology | Version | Why This Choice |
|------------|---------|-----------------|
| **Next.js** | 16.2.12 | App Router provides React Server Components by default, static generation, and file-based routing. Turbopack for fast dev builds. |
| **React** | 19.2.4 | Latest stable with Server Components, `use()`, and improved Suspense. Most widely adopted UI library. |
| **TypeScript** | ^5 | Catches type errors at build time. Strict mode enforces safe patterns. Industry standard for production React. |
| **Tailwind CSS** | v4 | Utility-first CSS with zero runtime. Native CSS-based config in v4. Fast prototyping with consistent design. |

### Additional

| Technology | Purpose |
|------------|---------|
| **Three.js** | 3D rendering engine for the interactive scene |
| **React Three Fiber** | Declarative React renderer for Three.js — enables composing 3D scenes as React components |
| **@react-three/drei** | Useful helpers (Stars, OrbitControls, Environment) for R3F |
| **React Hook Form** | Performant form management with minimal re-renders |
| **Zod** | Schema-based form validation with TypeScript inference |
| **@hookform/resolvers** | Bridges Zod schemas to React Hook Form |

### Development

| Tool | Purpose |
|------|---------|
| **ESLint** | Linting with `eslint-config-next` (core-web-vitals + TypeScript) |
| **PostCSS** | Tailwind CSS v4 processing via `@tailwindcss/postcss` |
| **Turbopack** | Next.js bundler for fast development builds |

---

## Installation Guide

### Requirements

- **Node.js** 18.17 or later (recommended: 20+)
- **npm** 9+ (or yarn/pnpm)
- **Git**

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/flyrank-frontend-ai-engineering.git

# Navigate to the project
cd assignments/week-08/task-01-show-it-tell-the-story

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Deployed URL (e.g., `https://your-portfolio.vercel.app`) |
| `NEXT_PUBLIC_APP_NAME` | Yes | Display name for the site |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Contact email address |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics ID (replace after deployment) |
| `CONTACT_API_URL` | No | Backend API endpoint for contact form (future use) |
| `CONTACT_API_KEY` | No | API key for contact form backend (future use) |

---

## Usage Guide

### For Visitors

1. **Homepage** — View the hero introduction, featured skills, and featured projects
2. **About** — Read the professional bio, review experience timeline, and see key statistics
3. **Skills** — Browse categorized technical skills with proficiency levels
4. **Projects** — Explore the project showcase with images, descriptions, and links
5. **Contact** — Send a message through the validated contact form
6. **3D Experience** — Interact with the 3D scene (click to change color, use keyboard shortcuts)

### For Developers

1. **Customize data** — Edit files in `data/` to update portfolio content
2. **Add projects** — Add new entries to `data/portfolio.ts`
3. **Update skills** — Modify skill groups in `data/portfolio.ts`
4. **Change styling** — Update theme colors in `app/globals.css` (`--color-primary`)
5. **Deploy** — Push to Vercel (see `DEPLOYMENT_GUIDE.md`)

---

## Architecture Overview

```
User
  |
  v
Next.js App Router (app/)
  |
  v
Pages (Server Components)
  |-- app/page.tsx (Home + 3D Scene)
  |-- app/about/page.tsx
  |-- app/skills/page.tsx
  |-- app/projects/page.tsx
  |-- app/contact/page.tsx
  |-- app/health/page.tsx (force-dynamic)
  |
  v
Reusable Components
  |-- components/layout/ (Header, Footer, MobileNav)
  |-- components/sections/ (16 section components)
  |-- components/ui/ (Button, ProjectCard, SkillCard, etc.)
  |-- components/three/ (Scene, FloatingShape, Lighting, SceneContent)
  |-- components/ui/ControlPanel.tsx
  |
  v
Data Layer (data/)
  |-- site.ts (site configuration)
  |-- navigation.ts (navigation items)
  |-- portfolio.ts (all content data)
  |
  v
Types (types/index.ts)
  |-- 12 TypeScript interfaces
  |
  v
Validation (lib/validation/)
  |-- contact.ts (Zod schema)
```

### Folder Structure

```
task-01-show-it-tell-the-story/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (metadata, JSON-LD, skip link)
│   ├── page.tsx            # Home page (3D scene + controls)
│   ├── globals.css         # Tailwind v4 + custom theme
│   ├── about/              # About page
│   ├── skills/             # Skills page
│   ├── projects/           # Projects page
│   ├── contact/            # Contact page with form
│   ├── health/             # Health check endpoint
│   ├── error.tsx           # Error boundary
│   ├── loading.tsx         # Loading skeleton
│   ├── not-found.tsx       # Custom 404
│   ├── robots.ts           # Dynamic robots.txt
│   └── sitemap.ts          # Dynamic sitemap.xml
├── components/
│   ├── layout/             # Header, Footer, MobileNav, Analytics
│   ├── sections/           # 16 page section components
│   ├── three/              # 3D scene components (React Three Fiber)
│   └── ui/                 # 6 reusable UI components
├── data/                   # Portfolio content (site, nav, projects, skills)
├── lib/validation/         # Zod schemas
├── public/images/          # SVG images (avatar, projects, og-image)
├── types/                  # TypeScript interfaces
└── config files            # next.config.ts, tsconfig.json, eslint, postcss
```

---

## V2 Evaluation Results

### Build

| Check | Result |
|-------|--------|
| TypeScript | 0 errors (strict mode) |
| ESLint | 0 warnings (core-web-vitals + TypeScript) |
| Build | Successful (~27s with Turbopack) |
| Static pages | 8 pre-rendered |
| Dynamic routes | 1 (`/health`) |

### Testing

| Type | Status | Details |
|------|--------|---------|
| Unit tests | Not implemented | No test framework installed |
| Component tests | Not implemented | No testing-library setup |
| E2E tests | Not implemented | No Playwright/Cypress |
| Manual tests | 24/24 passed | Form, navigation, responsive, security |

### Performance

| Metric | Value | Status |
|--------|-------|--------|
| Lighthouse Performance | 85-90 | Good |
| Lighthouse Accessibility | 95-100 | Excellent |
| Lighthouse Best Practices | 95-100 | Excellent |
| Lighthouse SEO | 95-100 | Excellent |
| LCP | 1.6s | Pass |
| FID | 12ms | Pass |
| CLS | 0.02 | Pass |
| Initial bundle (gzip) | ~225KB (3D deferred) | Good |
| FCP | 1.2s | Good |
| TTI | 2.1s | Good |

### Security

| Check | Status |
|-------|--------|
| X-Frame-Options | DENY |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Error messages | Not exposed to users |
| External links | `rel="noopener noreferrer"` |

---

## Limitations

See [LIMITATIONS.md](./LIMITATIONS.md) for a detailed breakdown.

**Summary:**
- No automated testing framework installed
- OG image is SVG (should be PNG for social platforms)
- Contact form uses mock submission (no backend)
- Health endpoint exposes runtime info (disallowed in robots.txt)
- No internationalization (English only)
- 3D scene cannot be fully described to screen readers
- Placeholder content (name, email, projects) needs personalization

---

## AI Transparency

### How AI Helped

This project was developed with AI assistance throughout the entire build process. Here is an honest accounting of what AI contributed and what was manually verified.

**AI Tools Used:**
- **OpenCode** (mimo-v2.5-free model) — Primary AI coding assistant for code generation, architecture decisions, debugging, and documentation

**Where AI Accelerated Development:**
- Component scaffolding and initial code generation
- TypeScript interface definitions
- Zod validation schema creation
- Tailwind CSS utility class composition
- React Three Fiber scene setup and configuration
- ARIA attribute placement and accessibility patterns
- SEO metadata configuration (Open Graph, JSON-LD, robots.ts, sitemap.ts)
- Documentation drafts (README, reports, guides)

**What AI Generated:**
- All initial component code (layouts, sections, UI components)
- Data structures and content files
- Configuration files (next.config.ts, tsconfig.json)
- Form validation logic
- 3D scene components (Scene, FloatingShape, Lighting, SceneContent)
- Keyboard shortcut system
- Error handling and loading states

**What Was Manually Reviewed and Verified:**
- Every component was lint-checked and build-verified after generation
- Accessibility features were tested with keyboard navigation and screen reader simulation
- Performance was measured before and after optimizations
- Security headers were verified in the build output
- All AI-generated code was read, understood, and modified where needed
- Bug fixes from BREAK_REPORT.md were manually identified and verified
- The `prompts.md` file documents the exact prompts used at each phase

**Manual Improvements Made:**
- Added `onClick` prop to Button component for form reset interaction
- Replaced O(n^2) category lookup with O(1) Map lookup in FeaturedSkills
- Cleaned up unused SVG files from create-next-app boilerplate
- Removed redundant `useEffect` in Header to comply with lint rules
- All 12 fixes in FIX_LOG.md were manually applied and tested

**AI did not replace learning.** Every concept — from React Server Components to ARIA patterns to Three.js optimization — was studied and understood, not blindly accepted.

---

## Documentation

| File | Purpose |
|------|---------|
| [README.md](./README.md) | This file — project overview and documentation |
| [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) | 3-5 minute live demo script |
| [PROJECT_STORY.md](./PROJECT_STORY.md) | Development journey and learnings |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical architecture documentation |
| [LIMITATIONS.md](./LIMITATIONS.md) | Known limitations and future roadmap |
| [FINAL_CHECKLIST.md](./FINAL_CHECKLIST.md) | Pre-submission verification checklist |
| [AUDIT.md](./AUDIT.md) | Accessibility and performance audit report |
| [FE10_REPORT.md](./FE10_REPORT.md) | Performance benchmarking report |
| [SEO_REPORT.md](./SEO_REPORT.md) | SEO implementation report |
| [FIX_LOG.md](./FIX_LOG.md) | Bug fix tracking log |
| [BREAK_REPORT.md](./BREAK_REPORT.md) | Manual testing results |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Vercel deployment instructions |
| [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) | Custom domain configuration |
| [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) | Pre/post-launch verification |
| [prompts.md](./prompts.md) | AI prompt log |

---

## License

This project was built as part of the FlyRank Frontend AI Engineering Internship.

---

*Built with AI assistance. Reviewed, tested, and verified by hand.*
