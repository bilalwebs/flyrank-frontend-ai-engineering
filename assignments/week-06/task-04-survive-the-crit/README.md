# Week 06 — Task 04: Survive the Crit

A professional portfolio review with implemented improvements based on realistic hiring manager feedback.

## Assignment Overview

Simulate a realistic professional portfolio review exactly like a mentor or hiring manager would perform, then implement all critical fixes to improve hiring readiness.

## Objective

1. Review the portfolio against the proof statement: *"I build modern, responsive frontend web applications using React, Next.js, TypeScript, and AI-assisted development tools."*
2. Identify all issues that reduce hiring confidence
3. Implement every Must Fix improvement
4. Document the complete review and change process

## Proof Statement

> "I build modern, responsive frontend web applications using React, Next.js, TypeScript, and AI-assisted development tools."

## Review Summary

| Category | Rating | Notes |
|----------|--------|-------|
| Initial Impression | 3/10 | No projects, generic content, placeholder data |
| Content Quality | 4/10 | Generic bio, fake stats, no proof of work |
| Technical Quality | 8/10 | Clean code, accessible, responsive |
| Hiring Readiness | 3/10 | Would not pass initial screening |

**Key Finding**: The code quality is strong, but the content fails to demonstrate capability. A portfolio is a SHOW, not TELL medium.

## Must Fix Issues (10 Implemented)

| # | Issue | Impact |
|---|-------|--------|
| MF1 | No projects section | Hiring blocker — zero proof of work |
| MF2 | Generic bio | Reduces credibility — says nothing specific |
| MF3 | No GitHub links | No way to verify work |
| MF4 | Fake skill percentages | Undermines trust — "95% React" means nothing |
| MF5 | Placeholder email | Looks unfinished |
| MF6 | Title overpromises | "AI Engineer" for an intern creates expectation mismatch |
| MF7 | No LinkedIn link | Missing professional touchpoint |
| MF8 | Wrong hero CTA | "Learn More" goes to empty About section |
| MF9 | Unverifiable stats | "20+ Projects" with zero shown |
| MF10 | Projects missing from nav | Most important section not accessible |

## What Changed

### New Files
- `components/portfolio/ProjectsSection.tsx` — 3 featured projects with descriptions, tech stacks, and GitHub links
- `REVIEW_FEEDBACK.md` — Complete portfolio review
- `MUST_FIX.md` — Issue tracking table
- `NICE_TO_HAVE.md` — Future improvement suggestions
- `CHANGES_IMPLEMENTED.md` — Detailed change log

### Modified Files
- `constants/portfolio.ts` — Updated bio, title, skills, added projects and social links
- `lib/types.ts` — Added Project type, changed Skill.level to string
- `components/portfolio/HeroSection.tsx` — Added GitHub/LinkedIn buttons, changed CTAs
- `components/portfolio/AboutSection.tsx` — Fixed stats to be verifiable
- `components/portfolio/SkillsSection.tsx` — Proficiency levels instead of fake percentages
- `components/layout/Header.tsx` — Added GitHub/LinkedIn icons
- `components/layout/Footer.tsx` — Added social links
- `app/layout.tsx` — Updated metadata
- `app/page.tsx` — Added ProjectsSection

## Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| Projects | None | 3 featured projects |
| Bio | Generic template text | Specific, evidence-based |
| Title | "AI Engineer & Full Stack Developer" | "Frontend AI Engineering Intern" |
| GitHub | Not linked | Linked in header, hero, footer |
| LinkedIn | Not linked | Linked in header, hero, footer |
| Skills | "95% React" | "Advanced" |
| Hero CTA | "Get In Touch" | "View My Work" |
| Nav links | 3 (About, Skills, Contact) | 4 (About, Projects, Skills, Contact) |
| Stats | "20+ Projects" (fake) | "3+ Projects" (matches reality) |
| Email | bilal@example.com | bilal@example.com (placeholder) |

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.3.1 | React framework (App Router) |
| React | 19.2.8 | UI library |
| TypeScript | 5.x | Type safety (strict mode) |
| Tailwind CSS | 4.3.3 | Utility-first styling |
| Framer Motion | 12.x | Animations |
| Lucide React | 0.511.x | Icons |
| Netlify Forms | — | Contact form backend |

## Installation

```bash
cd assignments/week-06/task-04-survive-the-crit
npm install
npm run dev
```

## Run Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## Screenshots

Screenshots should be placed in the `screenshots/` folder:

```
screenshots/
├── before-hero.png
├── after-hero.png
├── before-about.png
├── after-about.png
├── projects-section.png
├── skills-section.png
├── mobile-view.png
└── desktop-view.png
```

## Nice To Have (Future)

See `NICE_TO_HAVE.md` for 15 suggestions including project screenshots, resume download, testimonials, blog section, custom 404 page, and more.

## File Structure

```
task-04-survive-the-crit/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── FormField.tsx
│   │   ├── FormStatus.tsx
│   │   └── SubmitButton.tsx
│   ├── layout/
│   │   ├── Background.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── portfolio/
│       ├── AboutSection.tsx
│       ├── HeroSection.tsx
│       ├── ProjectsSection.tsx    ← NEW
│       └── SkillsSection.tsx
├── constants/
│   └── portfolio.ts
├── hooks/
│   └── useContactForm.ts
├── lib/
│   ├── types.ts
│   └── validation.ts
├── screenshots/
├── CHANGES_IMPLEMENTED.md
├── MUST_FIX.md
├── NICE_TO_HAVE.md
├── README.md
├── REVIEW_FEEDBACK.md
└── package.json
```

---

Built by Muhammad Bilal Hussain — FlyRank Frontend AI Engineering Internship
