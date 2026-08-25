# FlyRank Audit Assistant

> AI-powered SEO audit and analysis tool with real-time tool execution, structured output rendering, and approval workflows.

---

## Project Overview

FlyRank Audit Assistant is a Next.js application that demonstrates production-grade AI SDK integration with tool calling, streaming responses, and structured UI components. Users can request SEO audits for any domain and manage reports through an interactive chat interface.

### Key Features

- **Real-time Tool Execution** — Streaming states for each phase of tool invocation
- **Structured Output Rendering** — Type-safe UI components for audit results
- **Approval Workflows** — User confirmation gates for destructive operations (report deletion)
- **Rate Limiting** — API abuse prevention with per-IP request limits
- **Input Validation** — Zod schema validation for all API inputs
- **Dark Mode** — Automatic via `prefers-color-scheme`

---

## Screenshots

| Chat Interface | Audit Result | Approval Workflow |
|---------------|--------------|-------------------|
| ![Chat](docs/screenshot-chat.png) | ![Audit](docs/screenshot-audit.png) | ![Approval](docs/screenshot-approval.png) |

*Replace with actual screenshots before deployment.*

---

## Tech Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.3.1 | Server and API routes |
| React | 19.2.8 | UI component framework |
| TypeScript | 5.x | Type safety (strict mode) |
| AI SDK | 7.0.66 | Tool calling and streaming |
| @ai-sdk/react | 4.0.69 | React hooks for chat |
| @ai-sdk/openai | 4.0.42 | OpenAI-compatible provider |
| Zod | 4.4.3 | Schema validation |
| Tailwind CSS | 4.3.3 | Styling |
| Groq API | Latest | LLM inference |

---

## Installation

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Groq API key ([Get one free](https://console.groq.com))

### Setup

```bash
# Clone the repository
git clone https://github.com/bilalwebs/flyrank-frontend-ai-engineering.git
cd flyrank-frontend-ai-engineering/assignments/week-05/task-01-tool-results-and-structured-output-ui

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Groq API key to .env.local
# GROQ_API_KEY=gsk_your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | Yes | — | Groq API key for LLM inference |
| `GROQ_MODEL` | No | `openai/gpt-oss-120b` | Model identifier |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User (Browser)                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              React Chat UI (page.tsx)                 │
│  - useChat hook from @ai-sdk/react                   │
│  - Tool state rendering (streaming, approval, etc.)  │
│  - Input validation (client-side)                    │
└──────────────────────┬──────────────────────────────┘
                       │ POST /api/chat
                       ▼
┌─────────────────────────────────────────────────────┐
│           API Route (app/api/chat/route.ts)           │
│  ┌──────────────────────────────────────────────┐    │
│  │  Rate Limiter (lib/rate-limit.ts)             │    │
│  │  - 10 requests per minute per IP              │    │
│  │  - Retry-After header on 429                  │    │
│  └──────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────┐    │
│  │  Input Validator (lib/validation.ts)          │    │
│  │  - Zod schema validation                      │    │
│  │  - Max message length: 2000 chars             │    │
│  │  - Max messages per request: 50               │    │
│  └──────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────┐    │
│  │  streamText() from AI SDK                     │    │
│  │  - Groq provider (OpenAI-compatible)          │    │
│  │  - Tool definitions with Zod schemas          │    │
│  │  - Approval workflow for deleteAuditReport    │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Tools (lib/tool.ts)                      │
│  ┌─────────────────┐  ┌─────────────────────────┐   │
│  │  runSiteAudit    │  │  deleteAuditReport      │   │
│  │  - No approval   │  │  - Requires approval    │   │
│  │  - SEO scoring   │  │  - Destructive action   │   │
│  └─────────────────┘  └─────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Groq API (LLM Backend)                   │
│  - openai/gpt-oss-120b                               │
│  - Streaming responses                               │
│  - Tool calling support                              │
└─────────────────────────────────────────────────────┘
```

---

## Technical Decisions

### Why Groq?

Groq provides free, fast LLM inference with OpenAI-compatible API. This allows:
- Zero-cost development and testing
- Sub-second response times
- No vendor lock-in (swap to any OpenAI-compatible provider)

### Why AI SDK?

Vercel's AI SDK provides:
- First-class React hooks (`useChat`)
- Streaming tool execution states
- Built-in approval workflows
- Type-safe tool definitions with Zod

### Why Rate Limiting?

Production APIs need abuse prevention. The in-memory rate limiter:
- Limits to 10 requests per minute per IP
- Returns `Retry-After` header for client retry logic
- Auto-cleans stale entries every 5 minutes

---

## Security Features

| Feature | Implementation |
|---------|----------------|
| Rate Limiting | In-memory per-IP, 10 req/min |
| Input Validation | Zod schema on all API inputs |
| Max Input Length | 2000 chars per message |
| Max Messages | 50 per request |
| Security Headers | X-Frame-Options, CSP, Referrer-Policy |
| API Key Protection | Server-side only, never exposed to client |
| Error Sanitization | Generic error messages in production |

---

## AI Tools Transparency

### How AI Helped

This project was built with AI assistance throughout development.

**AI Tools Used:**
- **OpenCode** (mimo-v2.5-free) — Architecture decisions, code generation, debugging

**What AI Generated:**
- Initial tool definitions and Zod schemas
- Streaming UI components
- Approval workflow implementation
- Rate limiter and validation utilities

**What Was Manually Verified:**
- All code was lint-checked and tested after generation
- Security patterns were verified against OWASP guidelines
- Input validation edge cases were manually tested
- API error handling was verified with network failures

**AI did not replace understanding.** Every concept — from streaming SSE to approval workflows — was studied and verified.

---

## Limitations

1. **In-memory rate limiting** — Resets on server restart; use Redis for production
2. **Simulated audits** — Tool returns random scores; integrate real SEO APIs for production
3. **No persistence** — Chat history is session-only; add database for multi-session
4. **Single model** — Currently locked to Groq; extend for multi-provider support
5. **No authentication** — Add user auth for production deployment

---

## Development

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm run start
```

---

## License

This project is part of the FlyRank Frontend AI Engineering Internship.

---

*Built with AI assistance. Reviewed, tested, and verified by hand.*
