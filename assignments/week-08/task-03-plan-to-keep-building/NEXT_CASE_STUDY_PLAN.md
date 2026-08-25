# Next Case Study Plan

How future projects will be added to the portfolio as case studies.

---

## Where the Next Case Study Will Go

### Portfolio Section Location

The projects section follows this hierarchy:

```
Homepage (/)
  └── FeaturedProjects component → shows top 2 featured projects

Projects Page (/projects)
  └── ProjectsHero
  └── FeaturedProject → highlights 1 project with larger card
  └── ProjectsGrid → shows all projects in responsive grid
```

A new case study enters at the **data layer** and flows upward through components automatically.

### Component/File Location

| Layer | File | What to Change |
|-------|------|----------------|
| Data | `data/portfolio.ts` | Add entry to `projects[]` array |
| Types | `types/index.ts` | No change needed (Project interface already defined) |
| Components | `components/ui/ProjectCard.tsx` | No change needed (renders from data) |
| Components | `components/sections/FeaturedProject.tsx` | No change needed (picks first `featured: true`) |
| Components | `components/sections/ProjectsGrid.tsx` | No change needed (maps over all projects) |
| Assets | `public/images/` | Add project screenshot or thumbnail |

### How a New Project Card Appears

1. Add object to `projects[]` in `data/portfolio.ts`
2. Add image to `public/images/project-[name].svg` (or .png/.webp)
3. The `ProjectsGrid` component automatically renders a new `ProjectCard`
4. If `featured: true`, it also appears in `FeaturedProject` and `FeaturedProjects` on homepage

No component code changes required. The architecture is data-driven.

---

## Case Study Structure

Following the Week-02 three-beat format:

### Beat 1: Problem

- What problem existed?
- Who was affected?
- What was the current state?
- Why did it matter?

**Questions to answer:**
- What pain point did I notice?
- Was this a personal problem or a team/business problem?
- What happened if the problem wasn't solved?

### Beat 2: What I Built

- Technical solution overview
- Architecture decisions
- Technologies chosen and why
- Key implementation details
- Challenges faced and how I solved them

**Questions to answer:**
- What did I build, specifically?
- Which frameworks/libraries did I use and why?
- What was the hardest part?
- What tradeoffs did I make?

### Beat 3: What Came Of It

- Measurable results (performance, usage, grades)
- What improved compared to before
- Lessons learned
- What I would do differently
- How it connects to my career goals

**Questions to answer:**
- Did it work? How do I know?
- What would I change if I built it again?
- What did this teach me about engineering?

---

## Example Case Study Structure

### AI Personal Productivity Assistant

**Problem:**
I was juggling internship tasks, coursework, and personal projects across three different tools — Notion for notes, Todoist for tasks, and Google Calendar for scheduling. Context switching between tools wasted 20-30 minutes daily. I needed a unified system that understood my workflow and suggested priorities.

**What I Built:**
A full-stack web application with an AI assistant that manages tasks, analyzes productivity patterns, and suggests daily priorities. Built with Next.js App Router for the frontend, TypeScript for type safety, and an AI layer that processes natural language commands ("move deadline for API integration to Friday" → updates task + sends Slack notification). The dashboard visualizes productivity trends using Recharts.

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, OpenAI API, Recharts, NextAuth.js

**Key decisions:**
- Chose Server Components for the dashboard (faster load, smaller bundle)
- Used Prisma for type-safe database queries instead of raw SQL
- Implemented streaming responses for AI commands (feels instant)
- Added optimistic UI updates so the interface never feels slow

**Challenges:**
- AI hallucinated task priorities → added context window with user history
- Real-time updates were complex → settled for polling every 30s (simpler, reliable)
- Authentication was time-consuming → used NextAuth instead of rolling my own

**What Came Of It:**
- Reduced daily context-switching from 30 minutes to 5
- Got positive feedback from 3 classmates who tried it
- Deepened understanding of Server Components and streaming AI responses
- Learned that simpler solutions (polling) often beat complex ones (WebSockets) for MVPs
- Would add offline support with service workers next time

---

## Adding a Case Study: Checklist

- [ ] Problem statement written (2-3 sentences)
- [ ] Solution described with architecture diagram
- [ ] Technologies listed with reasoning
- [ ] Challenges documented with solutions
- [ ] Results measured (numbers, not opinions)
- [ ] Lessons learned stated honestly
- [ ] Project added to `data/portfolio.ts`
- [ ] Image added to `public/images/`
- [ ] Featured status set (`featured: true` or `false`)
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
