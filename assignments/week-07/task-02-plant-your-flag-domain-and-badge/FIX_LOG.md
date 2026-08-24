# Fix Log

**Project:** Portfolio Website - Break Your Own Site
**Date:** 2026-08-24

## Fixes Applied

| # | Problem | Before | Fix | After |
|---|---------|--------|-----|-------|
| 1 | No page metadata on About page | `app/about/page.tsx` had no `metadata` export | Added `export const metadata: Metadata` with title and description | Page now has proper `<title>About | Portfolio</title>` and meta description |
| 2 | No page metadata on Skills page | `app/skills/page.tsx` had no `metadata` export | Added `export const metadata: Metadata` with title and description | Page now has proper `<title>Skills | Portfolio</title>` and meta description |
| 3 | No page metadata on Projects page | `app/projects/page.tsx` had no `metadata` export | Added `export const metadata: Metadata` with title and description | Page now has proper `<title>Projects | Portfolio</title>` and meta description |
| 4 | No page metadata on Contact page | `app/contact/page.tsx` had no `metadata` export | Added `export const metadata: Metadata` with title and description | Page now has proper `<title>Contact | Portfolio</title>` and meta description |
| 5 | Contact form has no error handling | `onSubmit` was `async () =>` with no try/catch, no error state | Added `submitError` state, wrapped in try/catch, added error UI component | Form now shows user-friendly error message if submission fails |
| 6 | Error page exposes raw error.message | `{error.message \|\| "An unexpected error..."}` shown to users | Replaced with static `"An unexpected error occurred. Please try again."` | Raw error messages no longer leak to users |
| 7 | Duplicate skills in data | React and Next.js appeared in both "frontend" and "frameworks" categories | Removed React and Next.js from frameworks category | Each skill appears exactly once in its primary category |
| 8 | SocialLinks uses fragile string check | `!"github linkedin email".includes(link.platform)` | Replaced with `platformLabels` Record lookup using `?? link.label` | Clean, maintainable platform label resolution |
| 9 | Button passes onClick to Link | `onClick={onClick}` passed to Next.js Link component | Removed onClick from internal Link (not supported), kept on external `<a>` tags | Proper event handler attachment for internal vs external links |
| 10 | No robots.txt | No crawler directives file | Created `app/robots.ts` generating robots.txt with allow/disallow rules | Search engines now have proper crawl directives; `/health` disallowed |
| 11 | No sitemap.xml | No XML sitemap for search engines | Created `app/sitemap.ts` generating sitemap from navigation data | Search engines can now discover all pages via sitemap |
| 12 | No JSON-LD structured data | No schema.org markup | Added `<script type="application/ld+json">` with Person schema to layout | Search engines can parse structured person data |
| 13 | No security headers | Missing X-Frame-Options, X-Content-Type-Options, Referrer-Policy | Added `async headers()` in next.config.ts | All responses now include security headers |

## Known Limitations (Future Improvements)

| # | Issue | Reason Deferred | Priority |
|---|-------|-----------------|----------|
| 1 | OG image is SVG format | Social platforms require PNG/JPG; needs image conversion tool | Medium |
| 2 | Health endpoint exposes runtime info | Acceptable for portfolio demo; could add auth in production | Low |
| 3 | Placeholder data (Your Name, etc.) | This is the skeleton project; user must personalize | High (user action) |
| 4 | No automated tests | Requires test framework setup (Jest, Playwright) | Medium |
| 5 | No dark mode toggle | Currently uses system preference only | Low |
| 6 | No analytics integration | Could add Vercel Analytics or similar | Low |
