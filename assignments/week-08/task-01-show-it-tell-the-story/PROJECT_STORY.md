# Project Story

## Why I Built This

I needed a portfolio. Not a template from a website builder, but something I built myself — something that proves I can write code, not just fill in blanks.

The FlyRank Frontend AI Engineering Internship gave me the structure. Week by week, I learned prompting, React, TypeScript, accessibility, performance, and 3D development. The portfolio became the thing that tied it all together.

I wanted a project where every decision was mine: what framework to use, how to structure components, when to use Server vs Client Components, how to make a 3D scene accessible. AI helped me get there faster, but I had to understand everything it generated.

---

## Starting Point

Week 07, Task 01: "Break Your Own Site." The assignment was to build a portfolio from scratch using Next.js, React, TypeScript, and Tailwind CSS. No templates. No copy-paste. Build it, then break it, then fix it.

I started with an empty Next.js project. The first phase was just types, data files, and a global CSS file. No pages. No components. Just the foundation.

---

## How the Project Evolved

### Phase 1-2: Foundation and Layout
I set up the project structure, created TypeScript interfaces for every data type (SiteConfig, NavItem, HeroData, Skill, Project, etc.), and built the root layout with a Header, Footer, and mobile navigation drawer.

The Header was the first Client Component — it needed `usePathname` to highlight the active route. Everything else was a Server Component by default.

### Phase 3-5: Components and Pages
I built reusable UI components first: Button (polymorphic — can render as link or button), SectionTitle, SkillCard, ProjectCard, and SocialLinks. Then I used them across all five pages.

The home page came together quickly: Hero, FeaturedSkills, FeaturedProjects, CTASection. Each section was its own component, pulling data from `data/portfolio.ts`.

### Phase 6-8: Polish and Forms
The contact form was the most complex interactive piece. React Hook Form with Zod validation. Loading states. Error handling. Success states. I had to make it accessible — `aria-describedby` on error messages, `role="alert"`, visible labels on every input.

### Phase 9-10: Error Handling and SEO
I added the health check endpoint, custom 404, error boundary with retry, and loading skeletons. Then came the SEO layer: metadata on every page, Open Graph tags, JSON-LD structured data, dynamic robots.txt and sitemap.xml.

### Week 07, Task 02: Deployment Ready
I added security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy), an Analytics placeholder, a PWA manifest, and the FlyRank Graduate Badge in the footer. I also wrote deployment guides and a launch checklist.

### Week 07, Task 03: 3D Experience
This was the hardest part. I added React Three Fiber to create an interactive 3D torus knot scene. The shape floats, rotates, changes color on click, and responds to keyboard shortcuts.

I learned about lazy loading heavy dependencies, using `React.lazy()` and `Suspense` to keep the initial bundle small. I learned about DPR capping to prevent GPU overload on high-DPI screens. I learned about `useMemo` for Three.js materials.

### Week 07, Task 04: Accessibility and Performance Audit
The final phase. I audited everything. Found 7 accessibility issues and 5 performance issues. Fixed them all:

- Added `aria-live="assertive"` regions for screen reader announcements
- Implemented full keyboard navigation for the color picker (WAI-ARIA Radio Group pattern)
- Added visible focus indicators on the 3D canvas
- Fixed heading hierarchy (h3 → h2)
- Added `frameloop="never"` for reduced motion users
- Wrapped scene components with `React.memo`
- Reduced geometry from 128/32 to 64/16 segments (75% polygon reduction)
- Reduced star particles from 3000 to 2500

---

## Biggest Challenges

### 1. Server vs Client Components
Understanding when to use Server Components vs Client Components was confusing at first. The rule I learned: if it needs `useState`, `useEffect`, or browser APIs, it must be a Client Component. Otherwise, keep it a Server Component for better performance.

Only 4 of my 20 components are Client Components: Header (needs `usePathname`), MobileNav (needs `useState` and `useEffect`), ContactForm (needs React Hook Form), and the 3D page (needs `useState`, `useEffect`, keyboard events).

### 2. 3D Accessibility
Making a Three.js canvas accessible is genuinely hard. A canvas is a black box to screen readers — you can't describe individual pixels. The solution was to add an `aria-label` on the container, an `aria-live` region for status changes, and a keyboard-navigable control panel that provides the same functionality as clicking the shape.

### 3. AI-Generated Code Quality
AI generates code fast, but not always correctly. I found that:
- AI sometimes creates components with unused imports
- AI doesn't always follow the project's existing patterns
- AI can generate O(n^2) solutions when O(1) exists
- AI doesn't catch lint errors — you have to run the linter yourself

The lesson: AI is a productivity multiplier, not a replacement for understanding. Every line it generated was reviewed, tested, and often modified.

### 4. Form Validation Accessibility
Making form validation accessible is more than just showing error messages. Each error needs:
- `role="alert"` so screen readers announce it immediately
- `aria-describedby` linking the input to its error message
- `aria-invalid="true"` on the input field
- A visible `<label htmlFor>` association
- The submit button must be disabled while submitting

---

## Important Decisions

### Tailwind CSS v4 (not v3)
Tailwind v4 uses native CSS `@theme` instead of a JavaScript config file. This meant no `tailwind.config.js` — the theme is defined in `globals.css`. It's simpler and faster.

### Data-Driven Content
All portfolio content lives in `data/portfolio.ts`. To change any text, skill, or project, you edit one file. This separation of content from presentation makes the site easy to maintain.

### Mock Contact Form
The contact form simulates a 1-second API call with `setTimeout`. In production, you'd replace this with a real backend (Next.js API route, serverless function, or third-party service like Formspree). The `.env.example` file has placeholders for `CONTACT_API_URL` and `CONTACT_API_KEY`.

### No Testing Framework (Known Gap)
I chose to focus on the features and accessibility first, and documented the testing gap in FIX_LOG.md. Automated testing with Vitest and Playwright is the most important next step.

---

## What I Learned

1. **React Server Components change everything.** Most of the site renders on the server. The client JavaScript bundle is tiny because only interactive components ship to the browser.

2. **Accessibility is not optional.** It's not a feature you add at the end — it's a constraint you design with from the start. Adding `aria-live` regions, keyboard navigation, and focus management is much harder as an afterthought.

3. **Performance is measurable.** Before this project, I thought "fast" was subjective. Now I know about Lighthouse scores, Core Web Vitals (LCP, FID, CLS), bundle analysis, and lazy loading. You can't improve what you can't measure.

4. **AI is a tool, not a skill.** Knowing how to prompt AI is useful, but the real skill is understanding the code it generates. If you can't explain why a piece of code works, you don't actually know it.

5. **Documentation matters.** The README, deployment guide, and audit reports aren't just homework — they're the first thing a reviewer reads. Good documentation shows that you understand the project, not just the code.

6. **Three.js is powerful but complex.** React Three Fiber makes it more approachable, but you still need to understand the underlying concepts: materials, geometry, lighting, rendering loops, and GPU limitations.

7. **Small decisions compound.** Choosing Server Components over Client Components, using `React.memo` on scene components, reducing polygon count by 75% — none of these are dramatic changes. But together, they make the difference between a site that feels slow and one that feels instant.

---

*This portfolio is proof that with the right tools, the right approach, and a willingness to learn, a single developer can build something that looks and performs like a team effort.*
