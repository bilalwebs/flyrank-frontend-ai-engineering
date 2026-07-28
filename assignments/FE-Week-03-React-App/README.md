# React AI Portfolio

* [ ] A responsive, accessible developer portfolio built with React and Tailwind CSS using an AI-assisted development workflow.

This project is the **Week 3 assignment** of the FlyRank Frontend AI Engineering program, demonstrating modern frontend skills alongside AI-powered coding practices.

## Features

- [ ] **Hero Section** — Full-viewport introduction with name, title, tagline, CTA buttons, and avatar image
- [ ] **About Section** — Bio, education, internship, career goal, experience timeline, and stat cards
- [ ] **Skills Section** — Categorized skill cards grouped by Frontend, Languages, Frameworks, Tools, and AI
- [ ] **Projects Section** — Project showcase with image, description, tech tags, and external links
- [ ] **Contact Section** — Contact form with Zod validation via React Hook Form, email info, and social links
- [ ] **Reusable UI Components** — Button, SectionTitle, ProjectCard, SkillCard, SocialLinks
- [ ] **Responsive Design** — Mobile-first layout with smooth breakpoints across all screen sizes
- [ ] **Accessibility** — Semantic HTML, ARIA attributes, keyboard navigation, skip-to-content link, focus management
- [ ] **Dark Theme** — Consistent dark color scheme with accent colors
- [ ] **Smooth Scrolling** — Navigation with IntersectionObserver-powered active section highlighting
- [ ] **AI-assisted Development** — Built iteratively with phased AI prompts and manual code review

## Tech Stack

| Technology      | Version |
| --------------- | ------- |
| React           | ^19.2.7 |
| TypeScript      | ~6.0.2  |
| Vite            | ^8.1.1  |
| Tailwind CSS    | ^3.4.19 |
| React Hook Form | ^7.83.0 |
| Zod             | ^4.4.3  |
| ESLint          | ^10.6.0 |
| PostCSS         | ^8.5.23 |
| Autoprefixer    | ^10.5.4 |

## Project Structure

```
react-ai-portfolio/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── images/
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── sections/
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Skills.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── SkillCard.tsx
│   │       └── SocialLinks.tsx
│   ├── data/
│   │   └── portfolio.ts
│   ├── lib/
│   │   └── validation/
│   │       └── contact.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

## Installation

```bash
git clone <repository-url>
cd assignments/FE-Week-03-React-App/react-ai-portfolio
npm install
```

## Running the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

Produces an optimized production build in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Lint

```bash
npm run lint
```

Runs ESLint across all source files to catch TypeScript and code quality issues.

## Screenshots

### Home

![Home screenshot](assets/screenshots/home.png)

### About

![About screenshot](assets/screenshots/about.png)

### Skills

![Skills screenshot](assets/screenshots/skills.png)

### Projects

![Projects screenshot](assets/screenshots/projects.png)

### Contact

![Contact screenshot](assets/screenshots/contact.png)

## Future Improvements

- **Dark / Light Mode** — Add a theme toggle with persisted user preference
- **Blog Section** — Write and display articles on frontend and AI topics
- **CMS Integration** — Manage portfolio content via a headless CMS
- **Backend API** — Build a serverless API to handle contact form submissions
- **Page Animations** — Add scroll-triggered and micro-interaction animations
- **Internationalization** — Support multiple languages via i18n
