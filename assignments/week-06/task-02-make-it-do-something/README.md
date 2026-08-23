# Week 06 — Task 02: Make It Do Something

A portfolio website with one fully working dynamic feature: a **Netlify Forms-powered contact form** that receives real submissions in production.

## Project Overview

This project transforms a static portfolio into an interactive web application by integrating a fully functional contact form. The form uses Netlify Forms — a backend-as-a-service feature built into Netlify — to handle form submissions without writing any server-side code. Visitors can fill out the form, submit it, and the data appears instantly in the Netlify dashboard.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.3.1 | React framework (App Router) |
| React | 19.2.8 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.3.3 | Utility-first styling |
| Framer Motion | 12.x | Animations |
| Lucide React | 0.511.x | Icons |
| Netlify Forms | — | Form handling backend |

## Dynamic Feature: Contact Form (Netlify Forms)

The contact form is the single dynamic feature in this project. It includes:

- **Name** field — required, min 2 characters
- **Email** field — required, validated with regex
- **Subject** field — required, min 3 characters
- **Message** field — required, min 10 characters (textarea)

### Features

- Client-side validation with error messages on blur and submit
- Loading spinner while the form is submitting
- Success confirmation after submission
- Error message if submission fails
- Honeypot field to prevent spam bots
- Accessible labels, ARIA attributes, and keyboard navigation
- Responsive layout for all screen sizes
- `prefers-reduced-motion` support disables animations

## How Netlify Forms Work

Netlify detects forms at **build time** by scanning your HTML output for forms with the `data-netlify="true"` attribute. When a user submits the form:

1. The browser sends a `POST` request to the page URL with the form data
2. Netlify intercepts this request before it reaches your server
3. Netlify stores the submission data in its backend
4. You can view submissions in the Netlify Dashboard under **Forms**

No backend code, no API keys, no database — Netlify handles everything.

### Required Attributes

```html
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

- `name="contact"` — identifies the form in the Netlify dashboard
- `method="POST"` — Netlify only works with POST submissions
- `data-netlify="true"` — tells Netlify to capture this form
- `data-netlify-honeypot="bot-field"` — spam protection
- Hidden `form-name` input — ensures the form name is sent for static HTML

## What is a Backend?

A backend is the server-side component of a web application that:

- **Stores data** — databases, file systems, or cloud storage
- **Processes logic** — authentication, validation, business rules
- **Handles requests** — receives data from the frontend and responds

Traditional backends require writing server code (Node.js, Python, etc.) and managing databases. **Netlify Forms is a serverless backend** — it provides form handling without you writing any backend code. Netlify's servers receive, validate, and store your form submissions automatically.

## How Data Flows from User to Netlify

```
┌──────────────┐     POST /contact      ┌────────────────┐
│  User fills  │ ──────────────────────▶ │  Netlify CDN   │
│  form and    │   (application/         │  Intercepts    │
│  clicks Send │    x-www-form-urlencoded)│  the request   │
└──────────────┘                         └───────┬────────┘
                                                 │
                                                 ▼
                                         ┌────────────────┐
                                         │  Netlify Forms │
                                         │  Backend       │
                                         │  Stores data   │
                                         └───────┬────────┘
                                                 │
                                                 ▼
                                         ┌────────────────┐
                                         │  Netlify       │
                                         │  Dashboard     │
                                         │  View entries  │
                                         └────────────────┘
```

1. User fills out the form fields (name, email, subject, message)
2. Client-side validation runs — errors are shown if validation fails
3. If valid, the form data is serialized as URL-encoded strings
4. A `POST` request is sent to the current page URL
5. Netlify's CDN intercepts the request (no server code needed)
6. Data is stored in Netlify's backend database
7. Submissions appear instantly in the Netlify Dashboard under **Forms > contact**

## Installation

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Setup

```bash
# Navigate to the project
cd assignments/week-06/task-02-make-it-do-something

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## Run Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## Deployment Instructions

### Deploy to Netlify

1. **Push your code** to a Git repository (GitHub, GitLab, or Bitbucket)

2. **Connect to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click **"Add new site" > "Import an existing project"**
   - Select your Git provider and repository

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Deploy:**
   - Click **"Deploy site"**
   - Netlify will install dependencies, build, and deploy

5. **Verify the form:**
   - Visit your deployed site
   - Fill out and submit the contact form
   - Go to **Site Dashboard > Forms > contact** to see submissions

### Build Settings Summary

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | 20 (set in Netlify UI if needed) |

### Important Notes

- The form **only works on Netlify** — local submissions return 404 because there is no Netlify backend locally
- Netlify Free tier includes **100 submissions/month**
- Enable spam filtering in the Netlify Dashboard under **Forms > spam filtering**
- For custom domains, ensure DNS is configured to point to Netlify

## File Structure

```
task-02-make-it-do-something/
├── app/
│   ├── globals.css          # Global styles + reduced-motion support
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page composing all sections
├── components/
│   ├── contact/
│   │   ├── ContactForm.tsx  # Full form with Netlify attributes
│   │   ├── FormField.tsx    # Reusable label + input/textarea
│   │   ├── FormStatus.tsx   # Success/error banners
│   │   └── SubmitButton.tsx # Animated submit with loading state
│   ├── layout/
│   │   ├── Background.tsx   # Animated gradient orbs
│   │   ├── Footer.tsx       # Site footer
│   │   └── Header.tsx       # Sticky nav with mobile menu
│   └── portfolio/
│       ├── AboutSection.tsx  # Bio and stats
│       ├── HeroSection.tsx   # Hero with name and CTA
│       └── SkillsSection.tsx # Filterable skill bars
├── constants/
│   └── portfolio.ts         # Static data (skills, nav, profile)
├── hooks/
│   └── useContactForm.ts    # Form state, validation, submission
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   └── validation.ts        # Client-side validation logic
├── public/                  # Static assets
├── eslint.config.mjs        # ESLint config
├── next.config.ts           # Next.js config
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS config for Tailwind
└── tsconfig.json            # TypeScript config (strict mode)
```

## Accessibility

- All form inputs have associated `<label>` elements via `htmlFor`
- Error messages use `role="alert"` for screen reader announcements
- `aria-invalid` and `aria-describedby` link inputs to their errors
- Honeypot field is hidden with `.sr-only` class
- Keyboard navigation works for all interactive elements
- `prefers-reduced-motion` disables all animations
- Focus indicators are visible on all interactive elements
- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<footer>`)

---

Built by Muhammad Bilal Hussain — FlyRank Frontend AI Engineering Internship
