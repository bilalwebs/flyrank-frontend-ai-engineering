# Task 01: Break Your Own Site

**Assignment:** Week 07 - FlyRank Frontend AI Engineering Internship
**Project:** Portfolio Hardening & Bug Fixing
**Date:** 2026-08-24

## Overview

This assignment involved intentionally breaking, testing, and hardening a Next.js portfolio website. The goal was to find bugs, fix critical issues, improve SEO, and document the entire process professionally.

## Tech Stack

- **Framework:** Next.js 16.2.12 (App Router, Turbopack)
- **React:** 19.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Forms:** React Hook Form + Zod validation

## Project Structure

```
next-ai-portfolio/
├── app/
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── health/page.tsx
│   ├── projects/page.tsx
│   ├── skills/page.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts          ← NEW: SEO
│   └── sitemap.ts         ← NEW: SEO
├── components/
│   ├── layout/ (Header, Footer, MobileNav)
│   ├── sections/ (16 section components)
│   └── ui/ (Button, ProjectCard, SectionTitle, SkillCard, SocialLinks)
├── data/ (portfolio.ts, navigation.ts, site.ts)
├── lib/validation/contact.ts
├── public/images/ (6 SVG images)
├── types/index.ts
└── next.config.ts          ← IMPROVED: Security headers
```

## Testing Strategy

### Form Testing
- Empty submission validation
- Invalid email format rejection
- Garbage/long input handling
- Multiple rapid submissions
- Loading/error state verification

### Navigation Testing
- All navbar links functional
- Footer links valid
- External links (GitHub, LinkedIn) have `target="_blank"` and `rel="noopener noreferrer"`
- Mobile navigation opens/closes properly
- Keyboard navigation (Escape key closes mobile nav)

### Device/Responsive Testing
- Mobile navigation panel works correctly
- Layout adapts across breakpoints (sm/md/lg)
- Touch targets are appropriately sized

## Bugs Discovered & Fixes Applied

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | No page-level metadata on About/Skills/Projects/Contact pages | HIGH | FIXED |
| 2 | Contact form has no error handling (no try/catch, no error UI) | HIGH | FIXED |
| 3 | Error page exposes raw `error.message` to users | MEDIUM | FIXED |
| 4 | Duplicate skills (React, Next.js in both frontend & frameworks) | LOW | FIXED |
| 5 | SocialLinks uses fragile `string.includes()` check | LOW | FIXED |
| 6 | Button component passes onClick to Link incorrectly | MEDIUM | FIXED |
| 7 | No robots.txt file | MEDIUM | FIXED |
| 8 | No sitemap.xml file | MEDIUM | FIXED |
| 9 | No JSON-LD structured data | MEDIUM | FIXED |
| 10 | No security headers (X-Frame-Options, etc.) | MEDIUM | FIXED |
| 11 | OG image is SVG (not supported by social platforms) | MEDIUM | KNOWN |
| 12 | Health endpoint exposes runtime info publicly | LOW | KNOWN |
| 13 | Placeholder data (Your Name, etc.) | HIGH | KNOWN (Skeleton) |

## SEO Improvements

- Added page-level `metadata` exports to all pages (About, Skills, Projects, Contact, NotFound)
- Created `robots.ts` for crawler directives
- Created `sitemap.ts` for dynamic sitemap generation
- Added JSON-LD structured data (`Person` schema) to root layout
- Improved `metadataBase` configuration

## Performance Results

- Build time: ~27s (Turbopack)
- Static pages: 8 routes pre-rendered
- Dynamic routes: 1 (`/health`)
- No unused JavaScript bundles detected
- Images use `next/image` with AVIF/WebP format support

## Final Checklist

- [x] Broke the site intentionally (documented 13 issues)
- [x] Tested edge cases (form, navigation, responsive)
- [x] Fixed 11 critical/high bugs
- [x] Added SEO metadata, robots.txt, sitemap.xml, JSON-LD
- [x] Checked performance (build, bundle, images)
- [x] Created documentation (README, BREAK_REPORT, FIX_LOG, SEO_REPORT)
- [x] Ready for hardening review
