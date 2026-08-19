# Developer Portfolio — Next.js Template

A premium one-page developer portfolio template built with Next.js, featuring a dark theme, glassmorphism design, and responsive layout. Designed for AI engineers, software developers, and technical professionals.

**Live locally:** `npm run dev` → [http://localhost:3000](http://localhost:3000)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Typography | Inter (Google Fonts) |
| Icons | Devicon CDN (skills), inline SVG (UI) |
| Images | `next/image` with remote pattern config |

---

## Getting Started

```bash
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
├── app/
│   ├── globals.css          # Theme tokens, animations, glassmorphism utilities
│   ├── layout.tsx           # Root layout, Inter font, SEO metadata
│   └── page.tsx             # Page composition — assembles all sections
│
├── components/
│   ├── Header.tsx           # Sticky navbar, active section tracking, mobile menu
│   ├── Hero.tsx             # Two-column hero with profile photo and floating badges
│   ├── About.tsx            # Bio section with photo and info grid
│   ├── Skills.tsx           # Skill cards with Devicon icons and progress bars
│   ├── Projects.tsx         # Featured project cards with images and action buttons
│   ├── Experience.tsx       # Vertical career timeline with glowing nodes
│   ├── Certificates.tsx     # Credential cards in responsive grid
│   ├── Blog.tsx             # Article cards with cover images
│   ├── Contact.tsx          # Contact info + form (Name, Email, Subject, Message)
│   ├── Footer.tsx           # Brand, quick links, contact, social icons
│   └── FloatingShapes.tsx   # Ambient background blur orbs and shapes
│
├── public/
│   ├── profile/             # Profile and working photos
│   ├── projects/            # Project screenshots
│   └── blog/                # Blog cover images
│
├── next.config.ts           # Image remote patterns, Turbopack config
├── tsconfig.json            # TypeScript strict config
├── postcss.config.mjs       # Tailwind CSS PostCSS plugin
├── eslint.config.mjs        # ESLint flat config
└── package.json
```

---

## Sections

| Section | Description |
|---|---|
| **Header** | Sticky navigation with section links, active state tracking, CTA button, mobile hamburger menu |
| **Hero** | Two-column intro with name, role tags, description, action buttons, social icons, profile photo with animated glow |
| **About** | Glass card with photo, professional bio, and personal info grid |
| **Skills** | Grid of technology cards with official icons, names, and animated progress bars |
| **Projects** | Featured project cards with cover images, descriptions, tech badges, GitHub and Live Demo buttons |
| **Experience** | Vertical timeline displaying career positions with alternating card layout |
| **Certificates** | Credential cards showing issuer, title, year, and verification status |
| **Blog** | Article cards with cover images, categories, dates, and read time |
| **Contact** | Two-column layout with contact information and a form |
| **Footer** | Brand block, navigation links, contact details, and social icons |

---

## Features

- Dark theme with glassmorphism card design
- Gradient text and neon glow accents
- Floating background shapes with blur effects
- Animated progress bars on skill cards
- Smooth hover transitions and card elevation
- Responsive grid layouts across all breakpoints
- Sticky header with active section detection on scroll
- Mobile-friendly hamburger navigation
- `next/image` optimization for all portfolio images

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#070B16` | Page background |
| Surface | `#0E1528` | Card backgrounds |
| Primary | `#4F8CFF` | Links, buttons, highlights |
| Secondary | `#7C5CFF` | Gradients, decorative |
| Success | `#00D084` | Badges, status indicators |
| Text | `#FFFFFF` | Headings, body |
| Muted | `#B7C1D6` | Descriptions, labels |
| Border | `rgba(255,255,255,0.08)` | Dividers, card edges |

### Typography

| Element | Size | Weight |
|---|---|---|
| Hero | 64px desktop / 40px mobile | Bold |
| Section Title | 34px | Bold |
| Card Title | 22px | Semibold |
| Body | 16–18px | Regular |
| Label | 12–14px | Medium |

### Effects

- Glassmorphism: `backdrop-filter: blur(20px)`
- Gradient text via `background-clip: text`
- Floating keyframe animations (6s / 8s cycles)
- Pulse glow on background orbs
- Shimmer sweep on card surfaces
- Hover: elevation, border glow, image zoom

---

## Customization

### Adding Images

Place images in `public/` following this structure:

```
public/
├── profile/
│   ├── photo.jpg        # Hero — 400×400px square
│   └── working.jpg      # About — 500×625px portrait
├── projects/
│   ├── project1.jpg     # 600×375px landscape
│   ├── project2.jpg     # 600×375px landscape
│   └── project3.jpg     # 600×375px landscape
└── blog/
    ├── article1.jpg     # 600×338px landscape
    ├── article2.jpg     # 600×338px landscape
    └── article3.jpg     # 600×338px landscape
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.jfif`, `.svg`

### Updating Content

Edit the data arrays at the top of each component file to update:

- `components/Skills.tsx` — Skill names, levels, and icon URLs
- `components/Projects.tsx` — Project titles, descriptions, tags, and links
- `components/Experience.tsx` — Job titles, companies, dates, and descriptions
- `components/Certificates.tsx` — Certificate names, issuers, and years
- `components/Blog.tsx` — Article titles, categories, dates, and read times
- `components/Contact.tsx` — Contact information and social links

### Changing Colors

Update CSS custom properties in `app/globals.css` under the `@theme inline` block.

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Mobile (< 640px) | Single column, stacked cards, hamburger nav |
| Tablet (640px+) | 2-column grids, full navbar |
| Laptop (1024px+) | 3-column grids, expanded layouts |
| Desktop (1280px+) | 4-column skill grid, 5-column certificates |

---

## Accessibility

- Skip-to-content link
- Semantic HTML5 elements
- Associated `<label>` elements on all form inputs
- `aria-label` on icon-only buttons
- `prefers-reduced-motion` disables animations
- Full keyboard navigability

---

## Deployment

This project uses Next.js static export. Deploy to any static hosting provider:

```bash
npm run build
```

The `out/` directory can be deployed to:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

For Vercel, connect your repository and it will auto-detect the Next.js configuration.

---

## License

MIT
