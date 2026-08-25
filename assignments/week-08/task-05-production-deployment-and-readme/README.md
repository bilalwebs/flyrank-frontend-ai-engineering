# FlyRank Audit Assistant

> AI-powered SEO audit and analysis tool with real-time tool execution, structured output rendering, and approval workflows.

---

## Project Overview

FlyRank Audit Assistant is a production-ready Next.js application that demonstrates AI SDK integration with tool calling, streaming responses, and structured UI components. Users can request SEO audits for any domain and manage reports through an interactive chat interface.

### Target Users

- **SEO professionals** who need quick domain audits
- **Web developers** checking site health before deployment
- **Marketing teams** evaluating website performance
- **Students** learning about AI tool integration

---

## Features

- **Real-time Tool Execution** — Streaming states for each phase of tool invocation
- **Structured Output Rendering** — Type-safe UI components for audit results
- **Approval Workflows** — User confirmation gates for destructive operations
- **Rate Limiting** — API abuse prevention with per-IP request limits
- **Input Validation** — Schema validation for all API inputs
- **Dark Mode** — Automatic via `prefers-color-scheme`
- **Responsive Design** — Works on desktop and mobile
- **Error Handling** — Graceful error display and recovery

---

## Screenshots

| Chat Interface | Audit Result | Approval Workflow |
|---------------|--------------|-------------------|
| ![Chat](docs/screenshot-chat.png) | ![Audit](docs/screenshot-audit.png) | ![Approval](docs/screenshot-approval.png) |

*Replace with actual screenshots before deployment.*

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Groq API key ([Get one free](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/bilalwebs/flyrank-frontend-ai-engineering.git
cd flyrank-frontend-ai-engineering/assignments/week-08/task-05-production-deployment-and-readme

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
│  │  - Request body validation                    │    │
│  │  - Max message count: 50                      │    │
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
- Security patterns were verified against best practices
- Input validation edge cases were manually tested
- API error handling was verified with network failures

**AI did not replace understanding.** Every concept — from streaming SSE to approval workflows — was studied and verified.

---

## Security Decisions

| Feature | Implementation |
|---------|----------------|
| Rate Limiting | In-memory per-IP, 10 req/min |
| Input Validation | Request body validation |
| Max Input Length | 2000 chars per message |
| Max Messages | 50 per request |
| Security Headers | X-Frame-Options, CSP, Referrer-Policy |
| API Key Protection | Server-side only, never exposed to client |
| Error Sanitization | Generic error messages in production |

---

## Deployment Steps

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel dashboard
3. Add `GROQ_API_KEY` environment variable
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual

```bash
npm run build
npm run start
```

---

## Known Limitations

1. **In-memory rate limiting** — Resets on server restart; use Redis for production
2. **Simulated audits** — Tool returns random scores; integrate real SEO APIs for production
3. **No persistence** — Chat history is session-only; add database for multi-session
4. **Single model** — Currently locked to Groq; extend for multi-provider support
5. **No authentication** — Add user auth for production deployment

---

## License

This project is part of the FlyRank Frontend AI Engineering Internship.

---

*Built with AI assistance. Reviewed, tested, and verified by hand.*
