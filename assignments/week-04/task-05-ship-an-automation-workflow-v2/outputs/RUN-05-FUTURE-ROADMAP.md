
# AI Portfolio — Future Improvement Roadmap

## Current Status

The portfolio is a functional, production-ready Next.js 16 site with six routes (Home, About, Skills, Projects, Contact, Health), a data-driven content model, dark mode, and strong baseline accessibility and SEO coverage. No backend, testing suite, or dynamic content system exists yet — all content is static and sourced from `data/portfolio.ts`.

## Priority Improvements

1. **Automated testing** — No unit or E2E tests currently exist. This is the highest-risk gap as the codebase grows.
2. **Live contact form** — The form currently uses mock submission; `CONTACT_API_URL`/`CONTACT_API_KEY` are reserved but unused.
3. **Real project assets** — Placeholder SVG images should be replaced with actual screenshots and photos before external sharing.

## UI/UX Improvements

- Add filtering and sorting controls to the projects grid (by tag, status, or featured flag)
- Audit the five page-level "Hero" components (Hero, AboutHero, SkillsHero, ProjectsHero, ContactHero) for shared structure that could be consolidated into a single reusable base
- Add empty/loading states for any future dynamic sections (e.g., a blog listing)

## Performance Improvements

- Run and publish Lighthouse / Core Web Vitals benchmarks to validate the static-first, image-optimized approach
- Monitor bundle size as new Client Components are added (theme toggle, nav, form, and reveal animations are already client-side)
- Confirm `next/image` `sizes` attributes are tuned per breakpoint as new imagery is added

## Accessibility Improvements

- Extend existing strengths (skip link, ARIA-wired mobile drawer, focus-visible rings, reduced-motion support) with periodic automated audits (e.g., axe-core in CI)
- Add accessibility checks to the future test suite so regressions are caught before merge
- Verify color contrast ratios specifically within the new gradient/glassmorphism design tokens, since decorative gradients can reduce text contrast if not carefully tuned

## SEO Improvements

- Add `sitemap.xml` and `robots.txt` (currently not mentioned in the project)
- Extend Person JSON-LD with additional structured data if a blog or CMS is added (Article schema)
- Monitor Open Graph image rendering once real project screenshots replace placeholders

## Future Features

- Contact Form API integration (real backend, server-side validation)
- Blog via MDX or a headless CMS
- AI Chat feature (aligns with the internship's AI-engineering focus)
- Analytics integration
- Authentication and database layer (only if the site expands beyond a static portfolio)
- Internationalization (next-intl)
- RSS feed for blog content

## Estimated Development Roadmap (Next 3 Phases)

### Phase 1 — Stability & Trust (2–3 weeks)

Establish a test suite (Vitest + Playwright), wire the contact form to a real API, replace placeholder images, and add `sitemap.xml`/`robots.txt`. Goal: make the current feature set production-safe and verifiable.

### Phase 2 — Content Expansion (3–4 weeks)

Introduce a blog via MDX or a headless CMS, add Article structured data, implement project grid filtering/sorting, and consolidate duplicated Hero-section logic. Goal: give the portfolio room to grow without adding backend complexity.

### Phase 3 — Platform Maturity (4–6 weeks)

Add analytics, an AI Chat feature aligned with internship learning goals, and evaluate whether authentication/database integration is justified by real requirements (e.g., a CMS admin panel). Goal: move deliberately toward the "Most Powerful" stack option only where genuinely needed, avoiding premature complexity.
