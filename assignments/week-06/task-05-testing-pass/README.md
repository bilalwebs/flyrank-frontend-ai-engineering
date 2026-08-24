# Task-05: Testing Pass (FE-09)

Professional automated testing infrastructure for the portfolio project with Vitest, React Testing Library, Playwright E2E, and CI integration.

## Tech Stack

- **Unit/Component Testing:** Vitest + React Testing Library + jsdom
- **E2E Testing:** Playwright (Chromium)
- **CI/CD:** GitHub Actions
- **Framework:** Next.js 16, React 19, TypeScript

## Quick Start

```bash
npm install
npm test              # Run unit/component tests
npm run test:watch    # Watch mode
npm test:e2e          # Run E2E tests (requires dev server)
```

## Test Structure

```
__tests__/
  setup.ts              # Vitest setup (jsdom mocks for Framer Motion)
  components/
    ContactForm.test.tsx    # 9 tests - form validation, submission, loading
    FormStatus.test.tsx     # 6 tests - success/error/idle states
    Footer.test.tsx         # 6 tests - social links, attribution
    Header.test.tsx         # 6 tests - navigation, mobile menu, social links
    ProjectsSection.test.tsx # 7 tests - project cards, tags, accessibility
    SkillsSection.test.tsx   # 8 tests - filtering, levels, ARIA attributes
  lib/
    validation.test.ts      # 13 tests - form validation logic

tests/
  e2e/
    portfolio.spec.ts   # 7 E2E tests - full user flow

.github/
  workflows/
    test.yml            # CI pipeline (lint, unit tests, E2E)
```

## Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all unit/component tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run with coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run E2E with Playwright UI |

## Coverage Summary

- **Total Tests:** 55 unit/component + 7 E2E = 62 tests
- **Test Files:** 7 unit + 1 E2E = 8 files
- **Components Covered:** ContactForm, FormStatus, Footer, Header, ProjectsSection, SkillsSection
- **Lib Covered:** validation.ts

## CI Pipeline

The GitHub Actions workflow (`.github/workflows/test.yml`) runs:
1. Lint check
2. Unit/component tests with Vitest
3. E2E tests with Playwright (Chromium)
4. Uploads Playwright report as artifact

## Key Testing Decisions

- **Vitest over Jest:** Native ESM support, faster with Vite, better Next.js integration
- **jsdom over happy-dom:** More complete browser API coverage for Framer Motion
- **IntersectionObserver mock:** Required for Framer Motion's `whileInView` animations
- **`getAllByText` for duplicates:** Skills/Projects have repeated levels/tags, used `getAllByText` with length assertions
- **Playwright over Cypress:** Better multi-browser support, faster execution, native async/await
