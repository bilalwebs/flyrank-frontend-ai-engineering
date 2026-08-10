
# AI Portfolio — Muhammad Bilal Hussain

A premium, production-ready developer portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. The design is inspired by modern SaaS products (Vercel, Linear, Stripe, Claude) with a focus on clean typography, generous spacing, subtle animations, and full accessibility.

Part of the **FlyRank Frontend AI Engineering** internship program.

## Description

This multi-page portfolio showcases the work of Muhammad Bilal Hussain, a Frontend AI Engineer. It includes a redesigned hero, sticky navigation with a manual theme toggle, an about section with detail cards and skill badges, project cards with live status indicators, and a contact section with email, GitHub, LinkedIn, and location.

All content is data-driven (`data/portfolio.ts`), so the site can be customized without touching component code.

## Features

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

## Tech Stack

| Technology      | Version |
| --------------- | ------- |
| Next.js         | 16.2.12 |
| React           | 19.2.4  |
| TypeScript      | ^5      |
| Tailwind CSS    | ^4      |
| React Hook Form | ^7.83.0 |
| Zod             | ^4.0.0  |
| ESLint          | ^9      |

## Installation

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

See `.env.example`:

```
NEXT_PUBLIC_SITE_URL        # Your deployed URL (used in SEO metadata)
NEXT_PUBLIC_APP_NAME        # Application name
NEXT_PUBLIC_CONTACT_EMAIL   # Contact email address
CONTACT_API_URL             # (Optional) Contact form API endpoint
CONTACT_API_KEY             # (Optional) Contact form API key
```

> Note: `data/site.ts` and `data/portfolio.ts` currently hold placeholder values. Replace the name, URLs, email, and location with your real details.

## Folder Structure

```
next-ai-portfolio/
├── app/
│   ├── about/              # /about — AboutHero, ExperienceTimeline, StatsSection
│   ├── contact/            # /contact — ContactHero, ContactForm, ContactInfoSection
│   ├── health/              # /health — Runtime metadata display (dynamic)
│   ├── projects/            # /projects — ProjectsHero, FeaturedProject, ProjectsGrid
│   ├── skills/              # /skills — SkillsHero, SkillsGrid (all categories)
│   ├── error.tsx            # Client error boundary with Try Again
│   ├── globals.css          # Design tokens, dark variant, utilities, reveal animation
│   ├── layout.tsx           # Root layout — fonts, theme init script, metadata, JSON-LD
│   ├── loading.tsx          # Skeleton placeholder UI
│   ├── not-found.tsx        # Custom 404 with Return Home button
│   └── page.tsx             # / — Hero, FeaturedSkills, FeaturedProjects, CTASection
├── components/
│   ├── layout/               # Header (sticky, blur), MobileNav (drawer), Footer
│   ├── sections/              # Page-specific section components
│   └── ui/                    # Reusable primitives: Button, SectionTitle, Container, Badge,
│                               #   Reveal, ThemeToggle, SkillCard, ProjectCard, SocialLinks, icons
├── data/                      # Static content
│   ├── navigation.ts          # Nav items
│   ├── site.ts                # SiteConfig metadata
│   └── portfolio.ts           # Hero, About, Skills, Projects, Contact data
├── lib/
│   └── validation/
│       └── contact.ts         # Zod schema + inferred type for contact form
├── types/
│   └── index.ts                # All TypeScript interfaces
├── public/                     # Static assets (images, favicon)
├── .env.example                # Environment variable reference
├── prompts.md                  # Development prompt log
├── next.config.ts               # Turbopack configuration
├── postcss.config.mjs            # PostCSS with @tailwindcss/postcss
└── eslint.config.mjs             # Flat config ESLint
```

## Usage

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

All portfolio content lives in `data/portfolio.ts` and `data/site.ts`:

- **Hero** — Greeting, name, role, description, availability, skill chips, buttons, avatar
- **About** — Bio paragraphs, detail cards (education / internship / focus), skill badges, experience timeline, stats
- **Skills** — 5 categories with named skills (level 0–100)
- **Projects** — Title, description, image, tags, status, optional GitHub / Live URLs, featured flag
- **Contact** — Email, GitHub, LinkedIn, location

## Deployment

### Vercel

1. Push the repository to GitHub.
2. In the Vercel dashboard, select **New Project** and import the repository.
3. The Next.js framework preset is detected automatically.
4. Add any environment variables from `.env.example`.
5. Deploy. Static routes are pre-rendered at build time; `/health` renders on demand.

### Other Platforms

The project is a standard Next.js app — it can also run on any Node.js host that supports Next.js 16 (e.g., a VPS with `npm run build && npm start`, or containerized via a Node 20+ base image).

## Future Improvements

- Replace placeholder SVG images in `public/images/` with real photos
- Wire the contact form to a real API endpoint (e.g., the `CONTACT_API_URL` env var)
- Add a blog with MDX or a headless CMS
- Add filtering/sorting for the projects grid
- Add unit and E2E tests (Vitest + Playwright)
- Internationalization (next-intl)
- RSS feed for blog posts

## Author

**Muhammad Bilal Hussain**
Frontend AI Engineering Intern

GitHub: https://github.com/bilalwebs
LinkedIn: https://www.linkedin.com/in/muhammad-bilal-hussain

## License

Information not provided.
