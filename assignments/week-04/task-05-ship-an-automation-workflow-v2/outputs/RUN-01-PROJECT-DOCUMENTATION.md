
# Project Overview

**Project Name:** AI Portfolio — Muhammad Bilal Hussain

**Purpose:** A premium, production-ready developer portfolio built to showcase the work, skills, and experience of Muhammad Bilal Hussain, a Frontend AI Engineer. The project is part of the **FlyRank Frontend AI Engineering** internship program.

**Problem Being Solved:** Provides a professional, accessible, and modern online presence to introduce the developer, showcase projects, display skills and certificates, and offer a way for visitors to make contact — replacing the need for a static, hard-to-maintain personal site.

**Design Inspiration:** Modern SaaS products (Vercel, Linear, Stripe, Claude), with a focus on clean typography, generous spacing, subtle animations, and full accessibility.

**Content Model:** All content is data-driven (`data/portfolio.ts`), allowing the site to be customized without modifying component code.

---

# Features

- **Premium UI** — SaaS-inspired design system with semantic color tokens, gradient accents, glassmorphism, grid backgrounds, and glow effects
- **App Router** — Server Components by default; Client Components only where interactivity is needed (nav, theme toggle, scroll reveal, contact form)
- **Dark Mode** — Manual theme toggle (light/dark) with class-based `dark` variant, `localStorage` persistence, and system-preference default (no flash via inline init script)
- **Sticky Navigation** — Backdrop blur, active-link pill highlighting with `aria-current`, GitHub shortcut, and an accessible slide-in mobile drawer
- **Scroll Reveal** — Subtle fade-up entrance animations via `IntersectionObserver`, fully disabled for `prefers-reduced-motion`
- **Contact Form** — React Hook Form + Zod validation with accessible error messaging, loading, and success states
- **Accessibility** — Semantic landmarks, skip-to-content link, focus-visible rings, keyboard-navigable mobile menu, ARIA labels, sufficient color contrast
- **SEO** — Open Graph, Twitter cards, canonical URL, theme-color meta tags, and Person JSON-LD structured data
- **Health Check** — `/health` route with runtime metadata (Node.js version, Next.js version, NODE_ENV, timestamp)
- **Error Handling** — Custom 404, error boundary with retry, and skeleton loading UI
- **Performance** — Static-first pages, lazy-loaded `next/image`, CSS custom properties for theming, and no client-side JS on presentational pages

### Pages

| Route         | Sections                                                                      | Type          |
| ------------- | ----------------------------------------------------------------------------- | ------------- |
| `/`         | Hero, FeaturedSkills, FeaturedProjects, CTASection                            | Server        |
| `/about`    | AboutHero (bio, detail cards, skill badges), ExperienceTimeline, StatsSection | Server        |
| `/skills`   | SkillsHero, SkillsGrid (5 categories from data)                               | Server        |
| `/projects` | ProjectsHero, FeaturedProject, ProjectsGrid                                   | Server        |
| `/contact`  | ContactHero, ContactForm (client), ContactInfoSection                         | Server+Client |
| `/health`   | Runtime metadata cards + JSON preview                                         | Dynamic       |
| `404`       | Custom not-found page                                                         | Server        |
| Error         | Client boundary with error message and retry                                  | Client        |
| Loading       | Skeleton placeholders                                                         | Server        |

### Accessibility Details

| Feature              | Implementation                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------- |
| Skip-to-content link | First focusable element in`<body>`                                                     |
| Semantic landmarks   | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`                         |
| Active nav indicator | `aria-current="page"` + active pill styling                                            |
| Mobile menu          | `aria-expanded`, `aria-controls`, `aria-modal`, `role="dialog"`, Escape-to-close |
| Focus visibility     | Visible focus-visible rings on all interactive elements                                  |
| Reduced motion       | `@media (prefers-reduced-motion: reduce)` disables animations                          |
| Form validation      | `aria-invalid`, `aria-describedby`, `role="alert"` for errors                      |
| Image alt text       | Descriptive`alt` on all `next/image` components                                      |
| External links       | `target="_blank"` + `rel="noopener noreferrer"`                                      |

---

# Tech Stack

| Technology      | Version |
| --------------- | ------- |
| Next.js         | 16.2.12 |
| React           | 19.2.4  |
| TypeScript      | ^5      |
| Tailwind CSS    | ^4      |
| React Hook Form | ^7.83.0 |
| Zod             | ^4.0.0  |
| ESLint          | ^9      |

Bundler: Turbopack (dev and production).

---

# Folder Structure

```
next-ai-portfolio/
├── app/
│   ├── about/              # /about — AboutHero, ExperienceTimeline, StatsSection
│   ├── contact/            # /contact — ContactHero, ContactForm, ContactInfoSection
│   ├── health/             # /health — Runtime metadata display (dynamic)
│   ├── projects/           # /projects — ProjectsHero, FeaturedProject, ProjectsGrid
│   ├── skills/             # /skills — SkillsHero, SkillsGrid (all categories)
│   ├── error.tsx           # Client error boundary with Try Again
│   ├── globals.css         # Design tokens, dark variant, utilities, reveal animation
│   ├── layout.tsx          # Root layout — fonts, theme init script, metadata, JSON-LD
│   ├── loading.tsx         # Skeleton placeholder UI
│   ├── not-found.tsx       # Custom 404 with Return Home button
│   └── page.tsx            # / — Hero, FeaturedSkills, FeaturedProjects, CTASection
├── components/
│   ├── layout/             # Header (sticky, blur), MobileNav (drawer), Footer
│   ├── sections/           # Page-specific section components
│   └── ui/                 # Reusable primitives: Button, SectionTitle, Container, Badge,
│                            #   Reveal, ThemeToggle, SkillCard, ProjectCard, SocialLinks, icons
├── data/                   # Static content
│   ├── navigation.ts       # Nav items
│   ├── site.ts             # SiteConfig metadata
│   └── portfolio.ts        # Hero, About, Skills, Projects, Contact data
├── lib/
│   └── validation/
│       └── contact.ts      # Zod schema + inferred type for contact form
├── types/
│   └── index.ts            # All TypeScript interfaces
├── public/                 # Static assets (images, favicon)
├── .env.example            # Environment variable reference
├── prompts.md              # Development prompt log
├── next.config.ts          # Turbopack configuration
├── postcss.config.mjs      # PostCSS with @tailwindcss/postcss
└── eslint.config.mjs       # Flat config ESLint
```

### Component Library

**Layout Components**

| Component     | Type   | Description                                                                                     |
| ------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `Header`    | Client | Sticky nav, scroll shadow, active-link pills, theme toggle, GitHub shortcut, mobile menu toggle |
| `MobileNav` | Client | Slide drawer, Escape-to-close, outside click, focus management, theme toggle                    |
| `Footer`    | Server | Copyright, "Built with" line, nav + social links, back-to-top                                   |

**UI Primitives**

| Component        | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `Button`       | Polymorphic (button/Link/a), 4 variants, 3 sizes, loading spinner, hover lift                    |
| `Container`    | Reusable max-width wrapper (default / narrow / wide)                                             |
| `SectionTitle` | Eyebrow + heading + subtitle + gradient underline                                                |
| `Badge`        | Pills for statuses, categories, and counts                                                       |
| `Reveal`       | IntersectionObserver fade-up wrapper, respects reduced motion                                    |
| `ThemeToggle`  | Light/dark toggle with localStorage persistence                                                  |
| `SkillCard`    | Skill name, category badge, gradient proficiency bar                                             |
| `ProjectCard`  | Image, status + featured badges, tags, GitHub / Live Demo buttons (placeholder when unavailable) |
| `SocialLinks`  | Icon-button social links from data                                                               |
| `icons`        | Inline SVG icon set (no icon library dependency)                                                 |

**Section Components:** Hero, FeaturedSkills, FeaturedProjects, CTASection, AboutHero, ExperienceTimeline, StatsSection, SkillsHero, SkillsCategory, SkillsGrid, ProjectsHero, FeaturedProject, ProjectsGrid, ContactHero, ContactForm, ContactInfoSection.

---

# Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command              | Description                |
| -------------------- | -------------------------- |
| `npm run dev`      | Start Turbopack dev server |
| `npm run build`    | Production build           |
| `npm start`        | Start production server    |
| `npm run lint`     | Run ESLint (flat config)   |
| `npx tsc --noEmit` | Type-check the project     |

### Environment Variables

Defined in `.env.example`:

```
NEXT_PUBLIC_SITE_URL        # Your deployed URL (used in SEO metadata)
NEXT_PUBLIC_APP_NAME        # Application name
NEXT_PUBLIC_CONTACT_EMAIL   # Contact email address
CONTACT_API_URL             # (Optional) Contact form API endpoint
CONTACT_API_KEY             # (Optional) Contact form API key
```

> Note: `data/site.ts` and `data/portfolio.ts` currently hold placeholder values and should be replaced with real name, URLs, email, and location details.

---

# Usage

Once running, the site exposes the following routes: `/`, `/about`, `/skills`, `/projects`, `/contact`, and `/health` (see Features section for details on each).

All portfolio content lives in `data/portfolio.ts` and `data/site.ts` and can be customized without touching component code:

- **Hero** — Greeting, name, role, description, availability, skill chips, buttons, avatar
- **About** — Bio paragraphs, detail cards (education / internship / focus), skill badges, experience timeline, stats
- **Skills** — 5 categories with named skills (level 0–100)
- **Projects** — Title, description, image, tags, status, optional GitHub / Live URLs, featured flag
- **Contact** — Email, GitHub, LinkedIn, location

APIs: No backend or external API integration exists in the current stage. A `CONTACT_API_URL` / `CONTACT_API_KEY` environment variable pair is reserved for a future contact-form API integration, but the form currently uses mock submission.

---

# Deployment

### Vercel (Primary/Planned Hosting)

1. Push the repository to GitHub.
2. In the Vercel dashboard, select **New Project** and import the repository.
3. The Next.js framework preset is detected automatically.
4. Add any environment variables from `.env.example`.
5. Deploy. Static routes are pre-rendered at build time; `/health` renders on demand.

### Other Platforms

The project is a standard Next.js app and can also run on any Node.js host that supports Next.js 16 (e.g., a VPS with `npm run build && npm start`, or containerized via a Node 20+ base image).

### Performance Notes

- Static pages pre-rendered at build time (5 of 6 routes)
- Images lazy-loaded via `next/image` with explicit `sizes`
- CSS custom properties for theming with no runtime theme JavaScript (class applied pre-paint)
- No client-side JavaScript on purely presentational pages

---

# Future Improvements

- Replace placeholder SVG images in `public/images/` with real photos
- Wire the contact form to a real API endpoint (e.g., the `CONTACT_API_URL` env var)
- Add a blog with MDX or a headless CMS
- Add filtering/sorting for the projects grid
- Add unit and E2E tests (Vitest + Playwright)
- Internationalization (next-intl)
- RSS feed for blog posts

Additional forward-looking dynamic requirements noted for the broader project (per stack analysis): Contact Form API, Blog, CMS, AI Chat, Analytics, Authentication, and Database Integration.

---

# License

Information not provided.
