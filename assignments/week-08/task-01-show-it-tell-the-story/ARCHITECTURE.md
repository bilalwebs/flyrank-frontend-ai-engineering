# Architecture Documentation

## Application Structure

This is a **Next.js 16 App Router** application using **React Server Components** as the default rendering strategy. The architecture follows a layered pattern:

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
├─────────────────────────────────────────────┤
│              Next.js Server                  │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Pages   │→ │Components│→ │   Data    │  │
│  │ (Routes) │  │ (UI/3D)  │  │  Layer    │  │
│  └─────────┘  └──────────┘  └───────────┘  │
│       ↓              ↓             ↓         │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Metadata │  │  Types   │  │Validation │  │
│  │ & SEO    │  │(TS defs) │  │  (Zod)    │  │
│  └─────────┘  └──────────┘  └───────────┘  │
├─────────────────────────────────────────────┤
│          External Services                   │
│  (Vercel, Google Analytics - future)         │
└─────────────────────────────────────────────┘
```

---

## Component Hierarchy

### Server Components (16)

These render on the server and ship as HTML. No client-side JavaScript.

```
app/layout.tsx (Root Layout)
├── components/layout/Header.tsx ─────── [CLIENT]
├── components/layout/Footer.tsx
└── children (pages)
    ├── app/page.tsx (Home)
    │   ├── components/sections/Hero.tsx
    │   ├── components/sections/FeaturedSkills.tsx
    │   │   └── components/ui/SkillCard.tsx
    │   ├── components/sections/FeaturedProjects.tsx
    │   │   └── components/ui/ProjectCard.tsx
    │   └── components/sections/CTASection.tsx
    │       └── components/ui/Button.tsx
    │
    ├── app/about/page.tsx
    │   ├── components/sections/AboutHero.tsx
    │   ├── components/sections/ExperienceTimeline.tsx
    │   └── components/sections/StatsSection.tsx
    │
    ├── app/skills/page.tsx
    │   ├── components/sections/SkillsHero.tsx
    │   └── components/sections/SkillsGrid.tsx
    │       └── components/sections/SkillsCategory.tsx
    │           └── components/ui/SkillCard.tsx
    │
    ├── app/projects/page.tsx
    │   ├── components/sections/ProjectsHero.tsx
    │   ├── components/sections/FeaturedProject.tsx
    │   └── components/sections/ProjectsGrid.tsx
    │       └── components/ui/ProjectCard.tsx
    │
    ├── app/contact/page.tsx
    │   ├── components/sections/ContactHero.tsx
    │   ├── components/sections/ContactForm.tsx ──── [CLIENT]
    │   └── components/sections/ContactInfo.tsx
    │       └── components/ui/SocialLinks.tsx
    │
    └── app/health/page.tsx (force-dynamic)
```

### Client Components (4)

These ship to the browser and use React hooks for interactivity.

| Component | Why Client? |
|-----------|-------------|
| `Header.tsx` | Needs `usePathname()` for active route detection |
| `MobileNav.tsx` | Needs `useState` for open/close, `useEffect` for Escape key |
| `ContactForm.tsx` | Needs React Hook Form, form state, submission handling |
| `app/page.tsx` (Home) | Needs `useState`, `useEffect`, keyboard events, lazy loading |

### 3D Components (4)

These are dynamically imported and lazy-loaded.

```
app/page.tsx (Home)
└── React.lazy(() => Scene) ──── [CODE-SPLIT]
    ├── components/three/Scene.tsx
    │   ├── Canvas wrapper
    │   ├── WebGL detection
    │   └── Suspense fallback
    ├── components/three/SceneContent.tsx
    │   ├── components/three/Lighting.tsx
    │   ├── components/three/FloatingShape.tsx
    │   └── Stars + OrbitControls
    └── components/ui/ControlPanel.tsx
```

---

## Data Flow

### Static Data Flow (Server Components)

```
data/portfolio.ts  ──────→  Section Component  ──────→  HTML
       │                          │
       │ (imported at build)      │ (props passed)
       ▼                          ▼
  types/index.ts           Tailwind CSS classes
  (TypeScript types)       (rendered in browser)
```

All portfolio content (hero text, skills, projects, experience) is defined in `data/portfolio.ts` and imported directly by Server Components. No API calls. No state management. Just data → HTML.

### Dynamic Data Flow (Client Components)

```
User Interaction (click, keyboard)
        │
        ▼
Client Component (useState)
        │
        ├──→ Update local state
        ├──→ Trigger aria-live announcement
        └──→ Re-render with new props
```

### Contact Form Flow

```
User fills form
        │
        ▼
React Hook Form (onChange validation)
        │
        ├──→ Zod schema validates each field
        ├──→ Error messages shown with role="alert"
        │
        ▼
User clicks Submit
        │
        ▼
handleSubmit() fires
        │
        ├──→ isSubmitting = true (button disabled)
        ├──→ Mock API call (setTimeout 1s)
        │
        ├──→ Success: show success message, reset form
        └──→ Error: show error banner, re-enable button
```

### 3D Scene Data Flow

```
app/page.tsx (State: isAnimating, isWireframe, colorIndex)
        │
        ├──→ Scene (React.lazy)
        │      ├──→ SceneContent (React.memo)
        │      │      ├──→ Lighting (React.memo)
        │      │      ├──→ FloatingShape (color, isWireframe, isAnimating)
        │      │      └──→ Stars + OrbitControls
        │      └──→ WebGL detection + fallback
        │
        └──→ ControlPanel
               ├──→ Animation toggle
               ├──→ Wireframe toggle
               ├──→ Reset camera (CustomEvent)
               └──→ Color picker (aria-checked radio group)

Keyboard shortcuts (Space, W, R, arrows)
        │
        └──→ Same state updates via window.addEventListener
```

---

## User Journey

### First Visit

```
Landing on /
        │
        ├──→ Hero section loads (Server-rendered)
        ├──→ Featured skills render
        ├──→ Featured projects render
        │
        ├──→ 3D scene lazy-loads in background
        │      └──→ SceneLoader shown during load
        │      └──→ 3D canvas rendered when ready
        │
        └──→ User can interact immediately
```

### Navigation

```
Click Nav Link
        │
        ├──→ Client-side navigation (no full page reload)
        ├──→ Next.js fetches RSC payload for new page
        ├──→ New page content rendered
        └──→ Scroll to top (smooth scroll)
```

### Contact Form

```
Navigate to /contact
        │
        ├──→ ContactHero + ContactInfo (Server-rendered)
        ├──→ ContactForm (Client Component hydrated)
        │
        ├──→ User types in field
        │      └──→ Real-time Zod validation
        │      └──→ Error shown if invalid
        │
        ├──→ User submits
        │      ├──→ Button disabled + spinner
        │      ├──→ Mock 1s delay
        │      └──→ Success/error state
        │
        └──→ User can click "Send another message" to reset
```

---

## File Organization Principles

| Principle | Implementation |
|-----------|---------------|
| **Co-location** | Validation schema in `lib/validation/contact.ts` near the form |
| **Separation of concerns** | Data in `data/`, types in `types/`, components in `components/` |
| **Reusable UI** | `components/ui/` contains generic, prop-driven components |
| **Page sections** | `components/sections/` contains page-specific composed sections |
| **Data-driven** | Content changes require editing `data/` files, not component code |
| **Type safety** | All interfaces in `types/index.ts`, no `any` types |

---

## Build Pipeline

```
Source Code (.tsx, .ts, .css)
        │
        ▼
TypeScript Compiler (tsc)
        │
        ├──→ Type checking (strict mode)
        │
        ▼
ESLint
        │
        ├──→ core-web-vitals rules
        ├──→ TypeScript rules
        │
        ▼
Turbopack (Next.js bundler)
        │
        ├──→ Server Components → HTML
        ├──→ Client Components → JavaScript chunks
        ├──→ 3D Components → Separate chunk (lazy-loaded)
        ├──→ Static assets → /public
        │
        ▼
Output (.next/)
        │
        ├──→ Static HTML (8 pages)
        ├──→ JavaScript chunks
        ├────→ robots.txt (dynamic)
        └──→ sitemap.xml (dynamic)
```

---

## Security Architecture

```
Request
        │
        ▼
Next.js Middleware / Headers
        │
        ├──→ X-Frame-Options: DENY (clickjacking protection)
        ├──→ X-Content-Type-Options: nosniff (MIME sniffing protection)
        ├──→ Referrer-Policy: strict-origin-when-cross-origin
        │
        ▼
Page Render
        │
        ├──→ Error boundary catches runtime errors
        ├──→ Error message NOT exposed to user
        └──→ Generic "Something went wrong" shown
```

---

## Performance Architecture

```
Initial Load
        │
        ├──→ Static HTML served (pre-rendered)
        ├──→ Minimal CSS (Tailwind utility classes)
        ├──→ Geist font loaded via next/font
        │
        ├──→ JavaScript chunks loaded
        │      ├──→ Core React + Next.js
        │      ├──→ Client Components (Header, MobileNav, ContactForm)
        │      └──→ 3D chunk (lazy-loaded, not blocking)
        │
        └──→ Images
               ├──→ AVIF/WebP format
               ├──→ Lazy loaded (except hero avatar)
               └──→ Responsive sizes attribute
```
