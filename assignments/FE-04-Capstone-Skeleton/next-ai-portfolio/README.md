# Developer Portfolio

A production-ready multi-page developer portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Part of the FlyRank Frontend AI Engineering program (FE-04 Capstone Skeleton).

## Features

- **App Router** — 6 pages (Home, About, Skills, Projects, Contact, Health) with Server Components by default, Client Components only where interactivity is needed
- **Form Validation** — Contact form built with React Hook Form + Zod 4, including loading, success, and error states
- **Dark Mode** — Automatic light/dark theme via `prefers-color-scheme: media` query
- **Accessibility** — Skip-to-content link, semantic landmarks, `aria-current` for active nav, `aria-modal` for mobile menu, keyboard trap in mobile drawer, `prefers-reduced-motion` respect, focus-visible outlines
- **SEO** — Open Graph, Twitter Cards, `metadataBase`, canonical URL, JSON-LD structured data, theme-color meta tags
- **Health Check** — `/health` route with runtime metadata (Node.js version, Next.js version, NODE_ENV, timestamp)
- **Error Handling** — Custom 404 page, error boundary with retry button, loading skeleton UI
- **Responsive** — Mobile-first design with accessible slide-in navigation drawer
- **Performance** — Turbopack dev server, lazy-loaded images with `next/image`, CSS `@media (prefers-reduced-motion: reduce)` for reduced motion

## Tech Stack

| Technology      | Version  |
| --------------- | -------- |
| Next.js         | 16.2.12  |
| React           | 19.2.4   |
| TypeScript      | ^5       |
| Tailwind CSS    | ^4       |
| React Hook Form | ^7.83.0  |
| Zod             | ^4.0.0   |
| ESLint          | ^9       |

## Project Structure

```
next-ai-portfolio/
├── app/
│   ├── about/              # /about — AboutHero, ExperienceTimeline, StatsSection
│   ├── contact/            # /contact — ContactHero, ContactForm (client), ContactInfo
│   ├── health/             # /health — Runtime metadata display
│   ├── projects/           # /projects — ProjectsHero, FeaturedProject, ProjectsGrid
│   ├── skills/             # /skills — SkillsHero, SkillsGrid (all categories)
│   ├── error.tsx           # Client Component error boundary with Try Again
│   ├── globals.css         # Tailwind v4 imports, CSS custom properties, theme
│   ├── layout.tsx          # Root layout — fonts, metadata, Header/Footer shell
│   ├── loading.tsx         # Skeleton placeholder UI
│   ├── not-found.tsx       # Custom 404 with Return Home link
│   └── page.tsx            # / — Hero, FeaturedSkills, FeaturedProjects, CTASection
├── components/
│   ├── layout/             # Header (sticky, backdrop-blur), MobileNav (slide drawer), Footer
│   ├── sections/           # 16 page-specific section components
│   └── ui/                 # 5 reusable primitives: Button, SectionTitle, SkillCard, ProjectCard, SocialLinks
├── data/                   # Static content files
│   ├── navigation.ts       # Nav items array
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

## Pages

| Route       | Sections                                                    | Type        |
| ----------- | ----------------------------------------------------------- | ----------- |
| `/`         | Hero, FeaturedSkills, FeaturedProjects, CTASection          | Server      |
| `/about`    | AboutHero (bio + stats), ExperienceTimeline, StatsSection   | Server      |
| `/skills`   | SkillsHero, SkillsGrid (5 categories from data)             | Server      |
| `/projects` | ProjectsHero, FeaturedProject, ProjectsGrid (all projects)  | Server      |
| `/contact`  | ContactHero, ContactForm (client), ContactInfo              | Server+Client |
| `/health`   | Runtime metadata cards + JSON preview                       | Dynamic     |
| `404`       | Custom not-found page with Return Home link                 | Server      |
| Error       | Client boundary with error message and Try Again button     | Client      |
| Loading     | Skeleton placeholders (title, subtitle, 3 card grid)        | Server      |

## Component Library

### Layout Components (3)

| Component    | Type     | Description                          |
| ------------ | -------- | ------------------------------------ |
| `Header`     | Client   | Sticky nav, active link highlighting, mobile menu toggle |
| `MobileNav`  | Client   | Slide drawer, keyboard trap, Escape-to-close, backdrop overlay |
| `Footer`     | Server   | Copyright and SocialLinks            |

### UI Primitives (5)

| Component      | Description                                              |
| -------------- | -------------------------------------------------------- |
| `Button`       | Polymorphic (button/Link/a), 4 variants, 3 sizes, loading spinner, disabled state |
| `SectionTitle` | Consistent heading + optional subtitle across pages      |
| `SkillCard`    | Skill name, icon, and animated progress bar              |
| `ProjectCard`  | Image (next/image), tags, GitHub/Live links, featured badge |
| `SocialLinks`  | Renders social links from data                           |

### Section Components (16)

Hero, FeaturedSkills, FeaturedProjects, CTASection, AboutHero, ExperienceTimeline, StatsSection, SkillsHero, SkillsCategory, SkillsGrid, ProjectsHero, FeaturedProject, ProjectsGrid, ContactHero, ContactForm, ContactInfo

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Turbopack dev server (http://localhost:3000) |
| `npm run build`   | Production build          |
| `npm start`       | Start production server   |
| `npm run lint`    | Run ESLint (flat config)  |

## Installation

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint    # Must exit with zero errors
npm run build   # Must succeed. Verify route mapping:
                #   ┌ /                    (static)
                #   ├ /about               (static)
                #   ├ /contact             (static)
                #   ├ /health              (dynamic)
                #   ├ /projects            (static)
                #   └ /skills              (static)
```

## Environment Variables

See `.env.example`:

```
NEXT_PUBLIC_SITE_URL        # Your deployed URL (used in SEO metadata)
NEXT_PUBLIC_APP_NAME        # Application name
NEXT_PUBLIC_CONTACT_EMAIL   # Contact email address
CONTACT_API_URL             # (Optional) Contact form API endpoint
CONTACT_API_KEY             # (Optional) Contact form API key
```

## Data Customization

All portfolio content lives in `data/portfolio.ts`. Replace the placeholder values:

- **Hero** — Name, tagline, description, avatar path
- **About** — Bio paragraphs, education, internship, experience timeline, stats
- **Skills** — 5 categories with named skills (level 0-100)
- **Projects** — Title, description, image, tags, optional GitHub/Live URLs, featured flag
- **Contact** — Email, GitHub, LinkedIn URLs

## Deployment

Deploy to Vercel:

1. Push the repository to GitHub
2. Import the project in the Vercel dashboard
3. Add environment variables from `.env.example`
4. Deploy (framework preset: Next.js, detected automatically)

No custom Vercel config is needed — `next.config.ts` handles Turbopack settings.

## Accessibility

| Feature                          | Implementation                                      |
| -------------------------------- | --------------------------------------------------- |
| Skip-to-content link             | First focusable element in `<body>`                 |
| Semantic landmarks               | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` |
| Active nav indicator             | `aria-current="page"` on current route              |
| Mobile menu                      | `aria-expanded`, `aria-controls`, `aria-modal`, `role="dialog"` |
| Keyboard navigation              | Escape closes mobile nav, focus-visible outlines    |
| Reduced motion                   | `@media (prefers-reduced-motion: reduce)` disables animations |
| Form validation                  | `aria-invalid`, `aria-describedby`, `role="alert"` for errors |
| Image alt text                   | Descriptive `alt` on all `next/image` components    |
| External links                   | `target="_blank"` + `rel="noopener noreferrer"`     |

## Performance

- Static pages pre-rendered at build time (5 of 6 routes)
- Images lazy-loaded via `next/image` with explicit `sizes`
- CSS custom properties for theme without runtime JavaScript
- No client-side JavaScript on purely presentational pages
- App Router streaming-ready architecture

## Future Improvements

- Replace placeholder SVG images in `public/images/` with real photos and illustrations
- Wire ContactForm to a real API endpoint
- Add blog page with MDX or CMS integration
- Add filtering/sorting for the projects grid
- Add animations with Framer Motion or CSS transitions
- Add unit and E2E tests (Vitest + Playwright)
- Internationalization (next-intl)
- RSS feed for blog posts
