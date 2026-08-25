# Next Project Plan

AI Personal Productivity Assistant — the next portfolio case study.

---

## Why This Project

### Career Relevance

The "Frontend AI Engineer" role requires building products that combine modern frontend with AI capabilities. This project sits at exactly that intersection:

- **Frontend engineering** — Dashboard UI, real-time updates, responsive design
- **AI integration** — Natural language processing, intelligent suggestions, pattern analysis
- **Full-stack skills** — Database, API routes, authentication, deployment
- **Product thinking** — User workflows, prioritization, feedback loops

Recruiters at AI-focused companies (Vercel, Anthropic, OpenAI, Railway) look for engineers who can ship products, not just write code. This project demonstrates product-level thinking.

### AI Engineering Practice

Unlike the portfolio (which uses AI as a development tool), this project uses AI as a **product feature**. The difference:

| Portfolio (Current) | Productivity Assistant (Next) |
|---------------------|-------------------------------|
| AI helps me build | AI is what the user interacts with |
| I prompt the AI | The user prompts the AI |
| AI generates code | AI generates task priorities |
| One-time development | Ongoing AI feature development |

This teaches me how to:
- Integrate LLM APIs into production applications
- Handle AI hallucinations and edge cases
- Build fallback systems when AI fails
- Measure AI feature quality (accuracy, latency, cost)

---

## Project Goal

Build a web application where users manage tasks through natural language commands and receive AI-powered productivity insights.

**Success criteria:**
- User can add/complete/edit tasks via text commands
- AI suggests daily priorities based on deadlines and history
- Dashboard shows productivity trends over time
- App loads in under 2 seconds
- Deployed and accessible via public URL

---

## Features

### Core Features

**1. AI Assistant Chat**
- Natural language task management ("Add meeting with team tomorrow at 3pm")
- Context-aware suggestions ("You have 3 urgent tasks due Friday")
- Conversational interface (not just command-response)

**2. Task Management**
- Create, edit, complete, delete tasks
- Priority levels (urgent, high, medium, low)
- Due dates with overdue detection
- Tags/categories for organization

**3. Productivity Dashboard**
- Tasks completed per day/week
- Time spent per category
- Streak tracking (consecutive productive days)
- Weekly summary with AI-generated insights

**4. Authentication**
- Email/password login
- Session persistence
- User profile settings

**5. Analytics**
- Completion rate over time
- Most productive hours (based on task timestamps)
- Category breakdown (what gets done vs. procrastinated)

### Stretch Features (If Time Permits)

- Calendar view integration
- Slack/email notification for deadlines
- Team collaboration (shared task lists)
- Voice input for hands-free task creation
- Mobile app (React Native or PWA)

---

## Tech Stack

| Layer | Technology | Reasoning |
|-------|-----------|-----------|
| **Framework** | Next.js 15 (App Router) | Server Components for dashboard, API routes for backend |
| **Language** | TypeScript | Type safety across full stack |
| **Styling** | Tailwind CSS | Consistent with portfolio, fast development |
| **Database** | PostgreSQL + Prisma | Relational data (tasks, users, history), type-safe queries |
| **Auth** | NextAuth.js | Production-ready auth without rolling my own |
| **AI** | OpenAI API (GPT-4o) | Natural language understanding, summarization |
| **Charts** | Recharts | Declarative React charts for dashboard |
| **Deployment** | Vercel | Free, fast, auto-deploys from GitHub |
| **State** | React Server Components + useState | Minimal client state, server-driven UI |

### Why Not...

- **Firebase?** — PostgreSQL gives more control over queries. Firebase is great but limits complex analytics.
- **MongoDB?** — Task relationships (user → tasks → history) are naturally relational.
- **Claude API?** — OpenAI is more established for production apps. Can switch later.
- **Redux?** — Overkill for this scope. Server Components + local state is sufficient.
- **Prisma vs Drizzle?** — Prisma has better DX and migration tools for a solo project.

---

## Architecture

```
User
  │
  ▼
Next.js App Router
  │
  ├── Server Components (Dashboard, Task List)
  │     └── Prisma → PostgreSQL
  │
  ├── Client Components (Chat, Forms)
  │     └── React state + API calls
  │
  ├── API Routes
  │     ├── /api/tasks → CRUD operations
  │     ├── /api/ai → OpenAI integration
  │     └── /api/analytics → Aggregation queries
  │
  └── Auth (NextAuth.js)
        └── Session management
```

---

## Expected Learning Outcomes

### Technical Skills

1. **LLM Integration** — How to prompt, handle streaming responses, manage token costs
2. **Full-Stack Development** — Database design, API routes, authentication in one project
3. **Real-Time UX** — Optimistic updates, loading states, error boundaries
4. **Data Visualization** — Building charts that tell a story, not just display numbers
5. **Production Deployment** — Environment variables, CI/CD, monitoring

### Engineering Practices

1. **Feature Scoping** — Cutting features to ship an MVP within 2-3 weeks
2. **Error Handling** — What happens when the AI API is down? When the database is slow?
3. **Cost Management** — OpenAI API calls cost money. How to cache, batch, and optimize.
4. **Testing Strategy** — Unit tests for utilities, integration tests for API routes, manual tests for AI features

### Product Skills

1. **User Thinking** — Building something people actually want to use
2. **Feedback Loops** — How to gather and incorporate user feedback
3. **Prioritization** — What to build first, what to cut, what to defer

---

## Timeline

| Week | Milestone |
|------|-----------|
| Week 1 | Project setup, database schema, auth, basic CRUD |
| Week 2 | AI assistant chat, natural language task commands |
| Week 3 | Dashboard, charts, analytics |
| Week 4 | Polish, testing, deployment, case study writing |

**Total estimated time:** 40-60 hours across 4 weeks.

---

## Portfolio Integration

After completion, this project will be added to the portfolio as:

**Title:** AI Personal Productivity Assistant
**Featured:** Yes (replaces one current featured project)
**Tags:** Next.js, TypeScript, OpenAI, Prisma, PostgreSQL, Recharts

The case study will follow the three-beat format documented in `NEXT_CASE_STUDY_PLAN.md`.
