# Limitations

This document honestly describes what is incomplete, what could improve, and what the project would need for true production deployment.

---

## Current Limitations

### 1. No Automated Testing

**What's missing:** No test framework (Jest, Vitest, Playwright, Cypress) is installed. No `*.test.*` or `*.spec.*` files exist.

**What exists:** 24 manual test cases documented in `BREAK_REPORT.md`, all passing.

**Impact:** High. Automated tests catch regressions, enable confident refactoring, and are expected in production codebases.

**Future fix:** Add Vitest for unit/component tests and Playwright for E2E tests. Target: cover all form validation, navigation, and 3D interaction paths.

---

### 2. Contact Form Has No Backend

**What's missing:** The contact form uses a mock `setTimeout` to simulate an API call. No data is actually sent anywhere.

**What exists:** A 1-second mock delay with success/error states.

**Impact:** Medium. The form demonstrates the UI pattern but cannot receive real messages.

**Future fix:** Integrate with a backend service (Next.js API route, Vercel Serverless Function, or third-party like Formspree/EmailJS). Environment variables `CONTACT_API_URL` and `CONTACT_API_KEY` are already defined in `.env.example`.

---

### 3. Placeholder Content

**What's missing:** All personal data uses placeholders:
- Name: "Your Name"
- Email: "your.email@example.com"
- GitHub: "https://github.com/yourusername"
- LinkedIn: "https://linkedin.com/in/yourusername"
- Projects: Generic names ("Project Alpha", "Project Beta", "Project Gamma")
- Skills: Generic skill data

**Impact:** Medium. The portfolio demonstrates technical skill but doesn't represent a real person's work.

**Future fix:** Replace placeholder data in `data/site.ts` and `data/portfolio.ts` with real information, real projects, and real skill assessments.

---

### 4. OG Image is SVG

**What's missing:** The Open Graph image (`/images/og-image.svg`) is in SVG format. Most social media platforms (Facebook, Twitter, LinkedIn) require PNG or JPG for social share previews.

**Impact:** Low. Social sharing will show a broken or generic preview image.

**Future fix:** Convert the OG image to PNG (1200x630) and update `siteConfig.ogImage` to point to the new file.

---

### 5. No Internationalization

**What's missing:** The site is English-only. No `hreflang` tags, no translation system.

**Impact:** Low for a personal portfolio targeting English-speaking reviewers.

**Future fix:** Add `next-intl` or similar library for multi-language support if needed.

---

### 6. Health Endpoint Exposes Runtime Info

**What's missing:** The `/health` endpoint publicly displays Node.js version, environment, and timestamp.

**Impact:** Low. It's disallowed in `robots.txt` so search engines won't index it, but anyone with the URL can see it.

**Future fix:** Add authentication to the health endpoint, or restrict it to internal use only.

---

### 7. 3D Canvas Cannot Be Fully Described

**What's missing:** The Three.js canvas is a black box to screen readers. The scene is marked with `role="img"` and `aria-label`, but the visual content (shape, colors, movement) cannot be described programmatically.

**Impact:** Low. The control panel provides an alternative way to interact with the scene, and the canvas is labeled.

**Future fix:** Consider adding a text-based description of the current scene state that updates with the aria-live region.

---

### 8. No Dark Mode Toggle

**What's missing:** Dark mode follows system preference only (`prefers-color-scheme`). There is no manual toggle button.

**Impact:** Low. Users who want dark mode on a light system (or vice versa) cannot switch manually.

**Future fix:** Add a theme toggle component that persists preference to `localStorage`.

---

### 9. No Error Monitoring

**What's missing:** No error tracking service (Sentry, LogRocket, etc.) is integrated. Runtime errors are caught by the error boundary but not logged anywhere.

**Impact:** Low for a portfolio site. High for a production application.

**Future fix:** Add Sentry or similar service for production error monitoring.

---

### 10. No Analytics (Placeholder Only)

**What's missing:** The `Analytics.tsx` component reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` but the env var is commented out. No analytics are actually collected.

**Impact:** Low. Analytics can be added after deployment by setting the environment variable.

**Future fix:** Replace the measurement ID in Vercel environment variables.

---

## What Could Improve

| Area | Current State | Improvement |
|------|---------------|-------------|
| Testing | Manual only | Vitest + Playwright |
| Contact form | Mock submission | Real backend integration |
| Content | Placeholder data | Personalized real content |
| OG image | SVG format | PNG format |
| Dark mode | System only | Manual toggle |
| Error monitoring | None | Sentry integration |
| Analytics | Placeholder | Google Analytics |
| Caching | Default | Service worker for 3D assets |
| CI/CD | None | GitHub Actions pipeline |
| Performance monitoring | Lighthouse only | Vercel Analytics / Web Vitals |

---

## Future Roadmap

### Phase 1: Personalization
- Replace all placeholder content with real data
- Add actual project screenshots
- Write real bio and experience descriptions

### Phase 2: Testing
- Install Vitest + React Testing Library
- Write unit tests for form validation
- Write component tests for key interactions
- Install Playwright for E2E tests
- Add test scripts to package.json

### Phase 3: Backend Integration
- Implement contact form with Next.js API routes
- Add rate limiting
- Add email notification on form submission

### Phase 4: Production Hardening
- Add error monitoring (Sentry)
- Add analytics (Google Analytics)
- Convert OG image to PNG
- Add dark mode toggle
- Set up GitHub Actions CI/CD pipeline
- Add health endpoint authentication

---

*This project is honest about what it is and what it isn't. It's a strong learning project with production-ready patterns, but it's not yet a production-deployed application.*
