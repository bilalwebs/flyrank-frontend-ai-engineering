# React App Development with AI

## Assignment Objective

Build a production-ready single-page developer portfolio using React, TypeScript, and Tailwind CSS, leveraging AI coding assistants throughout the development lifecycle. The goal was to demonstrate the ability to:

- Architect a React application from scratch
- Build reusable, accessible UI components
- Implement mobile-first responsive design
- Integrate form validation with React Hook Form and Zod
- Use AI tools to accelerate development while maintaining code quality
- Perform manual review and polish of AI-generated code

## AI Tools Used

- **OpenCode** — Used as the primary AI coding assistant for generating components, writing TypeScript types, configuring Tailwind, and building the complete application across multiple phased prompts
- **ChatGPT / OpenAI** — Assisted with planning, architecture decisions, prompt engineering strategies, and troubleshooting edge cases
- **Cursor**— Provided guidance on accessibility patterns, semantic HTML, and ARIA best practices

Each AI tool was used for different aspects of the workflow, with OpenCode handling the majority of code generation, while ChatGPT and Claude contributed to planning and refinement.

## Development Workflow

The project was built in 10 sequential phases, each focusing on a specific layer of the application:

1. **Planning** — Analyzed requirements, defined architecture, created implementation roadmap
2. **Architecture** — Updated folder structure, component tree, data flow, and design tokens
3. **Foundation Setup** — Configured Vite, Tailwind theme, fonts, TypeScript types, portfolio data, and global styles
4. **Reusable UI Components** — Built Button, SectionTitle, ProjectCard, SkillCard, and SocialLinks as reusable primitives
5. **Layout Components** — Created Header (sticky nav, mobile hamburger menu, IntersectionObserver) and Footer
6. **Hero Section** — Full-viewport introduction with gradient background, avatar, CTA buttons, and animations
7. **About Section** — Profile, bio, education, experience timeline, and stat cards with glassmorphism design
8. **Skills Section** — Categorized skill grid with color-coded category labels
9. **Projects Section** — Project cards with images, tags, and action links
10. **Contact Section** — Form with Zod validation, email info, social links, and success state
11. **Application Integration** — Assembled all components in App.tsx with correct section order
12. **Final Production Polish** — Responsive audit, accessibility review, performance optimization, SEO, and documentation

## Technologies Used

| Technology      | Version | Purpose               |
| --------------- | ------- | --------------------- |
| React           | ^19.2.7 | UI library            |
| TypeScript      | ~6.0.2  | Type safety           |
| Vite            | ^8.1.1  | Build tool            |
| Tailwind CSS    | ^3.4.19 | Utility-first styling |
| React Hook Form | ^7.83.0 | Form state management |
| Zod             | ^4.4.3  | Schema validation     |
| PostCSS         | ^8.5.23 | CSS processing        |
| Autoprefixer    | ^10.5.4 | CSS vendor prefixes   |
| ESLint          | ^10.6.0 | Code linting          |

## How AI Assisted

### Planning

AI analyzed the requirements and produced a folder structure, component tree, data flow diagram, and a phased implementation roadmap that served as the blueprint for the entire project.

### Folder Structure

The AI recommended a clean separation of concerns with `layout/`, `sections/`, and `ui/` component directories, a centralized `types/` folder, a `data/` folder for portfolio content, and a `lib/validation/` folder for schema definitions.

### Architecture

AI suggested using a single `PortfolioData` interface with nested data types, ensuring all sections receive typed props from a central data source, enabling easy content updates without touching components.

### Component Design

AI generated reusable, props-driven components with clear TypeScript interfaces. Each component was designed to be composable, receiving data through props rather than hardcoding content.

### Type Definitions

AI created comprehensive TypeScript types and interfaces covering all data shapes, including union types for skill categories and discriminated unions for the polymorphic Button component.

### Tailwind Configuration

AI configured the Tailwind theme with custom colors (primary, background, text, accent, surface), font families (Space Grotesk for headings, Inter for body), and extended utilities for animations.

### Responsive Design

AI implemented mobile-first responsive patterns using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`), ensuring the portfolio looks polished across all screen sizes.

### Accessibility

AI added semantic HTML (`header`, `main`, `footer`, `section`, `article`, `nav`), ARIA attributes (`aria-label`, `aria-expanded`, `aria-controls`, `aria-current`, `aria-invalid`, `aria-describedby`, `role="list"`, `role="alert"`), keyboard event handling (Escape to close mobile menu), and a skip-to-content link for keyboard users.

### Performance Optimization

AI added image dimension attributes to prevent Cumulative Layout Shift, set `loading="lazy"` on below-the-fold images, and `fetchPriority="high"` on the LCP hero image.

### Documentation

AI generated comprehensive documentation including this assignment report, the GitHub README, and a chronological prompt log.

## Manual Improvements

After reviewing the AI-generated code, the following manual improvements were applied:

### Bug Fixes

- **Button form props** — Added `type` and `disabled` props to support form submission in the Contact section
- **SectionTitle ID prop** — Added optional `id` prop for `aria-labelledby` linking
- **SkillCategory expansion** — Extended from 3 to 5 categories (Frontend, Languages, Frameworks, Tools, AI)
- **HeroData buttons** — Replaced single `ctaText` string with `HeroButton[]` array for two CTA buttons

### Responsive Fixes

- Added `scroll-padding-top` CSS variable to prevent sections from hiding behind the sticky header
- Replaced hardcoded `4rem` header height with a CSS variable for consistency
- Added resize listener to close mobile menu when viewport width exceeds the mobile breakpoint

### Accessibility Improvements

- Added `prefers-reduced-motion` media query to disable animations for users with motion sensitivity
- Increased skip-link z-index to prevent overlap with the sticky header
- Added `disabled:cursor-not-allowed` style for disabled buttons
- Ensured all interactive elements are keyboard accessible

### Performance Optimizations

- Added explicit `width` and `height` attributes to hero and about images to prevent CLS
- Added `fetchPriority="high"` to the hero avatar (LCP element)
- Added `loading="lazy"` to below-the-fold project card images

### SEO Improvements

- Added Open Graph meta tags for social media sharing
- Added Twitter Card meta tags
- Added `theme-color` meta tag
- Expanded meta description with relevant keywords
- Created SVG favicon

## Challenges Faced

1. **Form Validation Integration** — Setting up React Hook Form with Zod required careful prop wiring to ensure accessible error messages with proper `aria-invalid` and `aria-describedby` associations
2. **Responsive Navigation** — Implementing the mobile hamburger menu with smooth animations while maintaining keyboard accessibility (Escape to close, focus trapping) required multiple iterations
3. **TypeScript Type Safety** — Designing the polymorphic Button component that renders as `<a>` or `<button>` based on props required discriminated union types to ensure type safety without escaping with `any`
4. **IntersectionObserver Scroll Spy** — Fine-tuning the root margins so the active nav state updates at the right visual threshold without flickering
5. **AI Hallucinations** — AI occasionally generated non-existent Tailwind classes or incorrect TypeScript syntax that required manual correction during code review

## Lessons Learned

1. **Phased prompting works** — Breaking the project into sequential phases with specific constraints produced more reliable AI output than attempting to generate everything at once
2. **AI accelerates, but doesn't replace review** — Every AI-generated component needed manual inspection for accessibility, responsiveness, and edge cases
3. **Clear type definitions are critical** — Investing time in precise TypeScript interfaces at the beginning prevented cascading issues across components
4. **Accessibility must be intentionally designed** — AI can generate basic ARIA attributes, but manual review is essential to ensure screen reader flow and keyboard navigation work correctly
5. **Prompt engineering matters** — Providing role, context, constraints, and output format in each prompt significantly improved the quality and relevance of AI-generated code

## Final Outcome

A fully functional, responsive, accessible developer portfolio built with React 19, TypeScript, Tailwind CSS, and validated with React Hook Form + Zod. The project was completed successfully using an AI-assisted workflow with manual review at every stage. All components are reusable, props-driven, and properly typed. The final build passes both TypeScript compilation and ESLint with zero errors. The portfolio demonstrates modern frontend best practices including mobile-first responsive design, semantic HTML, ARIA accessibility, keyboard navigation, performance optimization, and SEO metadata.
