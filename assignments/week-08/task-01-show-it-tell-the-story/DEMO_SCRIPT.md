# Demo Script

**Duration:** 3-5 minutes
**Format:** Live walkthrough with narration

---

## Introduction (30 seconds)

> "Hi, I'm [Your Name]. This is my developer portfolio — a full-stack showcase project built during the FlyRank Frontend AI Engineering Internship.
>
> The goal was to create a production-quality portfolio that demonstrates real frontend skills: component architecture, accessibility, performance optimization, 3D interaction, and AI-assisted development.
>
> Let me walk you through it."

---

## Demo Walkthrough (2-3 minutes)

### 1. Homepage (30 seconds)

> "This is the homepage. It features a hero section with my avatar and tagline, followed by my top 6 skills and 2 featured projects."

**Show:**
- Hero section with name, tagline, and CTA buttons
- Featured Skills section (skill cards with progress bars)
- Featured Projects section (project cards with images and links)
- CTA section at the bottom

**Highlight:**
- "Notice the responsive layout — this works on mobile, tablet, and desktop."
- "The navigation includes a mobile hamburger menu with keyboard support."

### 2. Projects Page (30 seconds)

> "The projects page showcases all my work."

**Show:**
- Projects hero section
- Featured project highlight (larger card)
- Grid of all projects with images, tags, and links
- GitHub and live demo links on each card

**Highlight:**
- "Each project card has an image, description, technology tags, and links to the source code and live demo."

### 3. 3D Interactive Experience (45 seconds)

> "Now let me show the main feature — an interactive 3D scene built with React Three Fiber."

**Show:**
- The 3D torus knot rendering on the homepage
- Click on the shape to change colors (cycle through 6 colors)
- Use the control panel to toggle animation on/off
- Toggle wireframe mode
- Reset camera position

**Keyboard shortcuts demo:**
- Press Space to pause/resume animation
- Press W to toggle wireframe
- Press R to reset camera
- Use arrow keys to navigate the color picker

**Highlight:**
- "This entire 3D scene is lazy-loaded — it doesn't affect the initial page load performance."
- "It respects the user's reduced motion preference and includes full keyboard navigation."

### 4. Contact Flow (30 seconds)

> "The contact form demonstrates form validation with React Hook Form and Zod."

**Show:**
- Navigate to the Contact page
- Try submitting an empty form — show validation errors
- Enter an invalid email — show email validation error
- Fill in valid data and submit
- Show the loading spinner and success state

**Highlight:**
- "All validation errors are announced to screen readers using `aria-live` regions."
- "The submit button is disabled during submission to prevent duplicate sends."

### 5. Accessibility Features (15 seconds)

> "Accessibility was a key focus throughout this project."

**Show:**
- Press Tab to reveal the skip-to-content link
- Navigate the entire site using only keyboard
- Point out the visible focus indicators on interactive elements

**Highlight:**
- "The 3D color picker uses the WAI-ARIA Radio Group pattern with arrow key navigation."

---

## Technical Explanation (30 seconds)

### Architecture Decision

> "One important architecture decision was using React Server Components as the default. Of the 20 components in this project, 16 are Server Components. Only the header, mobile nav, contact form, and 3D page are Client Components. This means most of the site ships as static HTML — the JavaScript bundle stays small and the site loads fast."

### Design Decision

> "For styling, I chose Tailwind CSS v4 with a custom theme. The primary color (#4c5fd5) and accent color (#e8a33d) are defined as CSS custom properties, making it easy to rebrand the entire site by changing two values. The dark mode uses `prefers-color-scheme` system preference — no manual toggle needed."

---

## AI Explanation (20 seconds)

> "AI assisted significantly with the 3D scene implementation. I used OpenCode to generate the initial React Three Fiber components — Scene, FloatingShape, Lighting, and SceneContent. The AI handled the Three.js boilerplate and material setup, which let me focus on the accessibility layer: adding aria-live regions, keyboard navigation for the color picker, and reduced motion support.
>
> Every piece of AI-generated code was manually reviewed, lint-checked, and tested. The prompts are documented in `prompts.md`."

---

## Honest Limitation (15 seconds)

> "One thing that still needs improvement is automated testing. The project has 24 manual test cases that all pass, but there's no Jest, Vitest, or Playwright setup. This is the most significant gap in the project and would be the first thing I address in a real production environment."

---

## Closing (15 seconds)

> "In the future, I'd add automated testing with Vitest and Playwright, integrate a real backend for the contact form, convert the OG image from SVG to PNG for better social sharing, and add internationalization support.
>
> This project demonstrates that with AI assistance, a single developer can build something that looks and performs like a team effort — as long as you understand and verify every line of code.
>
> Thank you."

---

## Tips for Delivery

1. **Keep the browser open** — Show the actual site, not slides
2. **Resize the browser** — Demonstrate responsive design live
3. **Use actual keyboard** — Show the keyboard shortcuts in real time
4. **Show the code briefly** — If the reviewer asks, show a component file
5. **Be honest** — If something doesn't work perfectly, acknowledge it
6. **Time yourself** — Practice to stay within 3-5 minutes
