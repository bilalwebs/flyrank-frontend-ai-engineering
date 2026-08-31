<div align="center">

# InterviewAI Agent Pro

**AI-Powered Technical Interview Coach**

An intelligent interview preparation platform that uses multi-provider AI to generate role-specific technical questions, evaluate answers in real-time, and create personalized learning roadmaps.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## About

**InterviewAI Agent Pro** is my **Week 8 Frontend AI Engineering Capstone** project.

This application is an AI-powered technical interview coach built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **React Hook Form**, and **Zod**. It supports **Groq** (primary) and **Google Gemini** (secondary) through a provider abstraction layer.

### Highlights

- AI-generated role-specific interview questions
- Real-time answer evaluation with detailed feedback
- Personalized learning roadmap with curated resources
- Accessible responsive UI (WCAG 2.1 AA compliant)
- Error handling and structured AI responses
- Unit and integration testing
- Production-ready deployment on Vercel

The repository README includes architecture overview, setup instructions, AI implementation details, deployment guide, testing details, and future improvement roadmap.

---

## Capstone Checklist

| Status | Requirement |
|--------|-------------|
| ✅ | Live production deployment |
| ✅ | AI integration (Groq + Gemini) |
| ✅ | Responsive and accessible UI (WCAG 2.1 AA) |
| ✅ | Structured AI output with validation |
| ✅ | Error handling and fallback states |
| ✅ | Unit tests (Vitest) |
| ✅ | End-to-end tests (Playwright) |
| ✅ | Lighthouse score ≥ 90 |
| ✅ | Complete documentation |
| ✅ | Deployment checklist and rollback plan |

---

## Features

| Feature | Description |
|---------|-------------|
| **AI Interview Agent** | Generates role-specific questions using Groq/Gemini with tool-calling architecture |
| **Real-Time Evaluation** | Scores answers on technical correctness, explanation quality, and communication clarity |
| **Adaptive Difficulty** | Adjusts question complexity based on candidate experience level |
| **Learning Roadmap** | Generates personalized improvement recommendations with curated resources |
| **Dashboard** | Tracks interview history, average scores, and skill progress over time |
| **Multi-Provider AI** | Supports Groq (primary) and Gemini (secondary) with provider abstraction |
| **Responsive Design** | Works seamlessly on desktop, tablet, and mobile devices |
| **Semantic HTML** | Accessible markup with proper ARIA attributes and keyboard navigation |

---

## Architecture

```
interview-ai-agent-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (interview, evaluate, report)
│   │   ├── interview/         # Interview pages (setup, chat, report)
│   │   ├── dashboard/         # Dashboard page
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── features/          # Feature components
│   │   │   ├── interview/     # InterviewSetupForm, InterviewChat
│   │   │   ├── dashboard/     # DashboardStats, InterviewCard
│   │   │   └── landing/       # Hero, Features, HowItWorks, CTA
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── ai/                # AI provider abstraction + agent
│   │   └── validation/        # Zod schemas for form validation
│   ├── services/              # Business logic (localStorage session management)
│   ├── types/                 # TypeScript type definitions
│   └── data/                  # Constants (roles, skills, difficulty levels)
```

---

## AI Implementation

### Provider Abstraction Layer

The AI provider layer (`lib/ai/provider.ts`) implements a unified interface supporting multiple AI backends:

- **Groq Provider** — Uses `groq/compound-mini` for fast, reliable inference
- **Gemini Provider** — Uses `gemini-2.0-flash` as an alternative backend
- **Factory Pattern** — `getAIProvider()` selects provider based on environment config

### Interview Agent

The agent (`lib/ai/agent.ts`) orchestrates three AI-powered tools:

| Tool | Purpose | Output |
|------|---------|--------|
| **Question Generator** | Creates role-specific interview questions | `InterviewQuestion` |
| **Answer Evaluator** | Scores answers with detailed feedback | `AnswerEvaluation` |
| **Learning Recommender** | Generates personalized improvement roadmaps | `LearningRecommendation[]` |

### API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/interview` | POST | Create interview session, generate first question |
| `/api/evaluate` | POST | Evaluate answer, generate next question |
| `/api/report` | POST | Generate final report with learning recommendations |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router, Webpack) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **Forms** | React Hook Form + Zod validation |
| **AI Primary** | Groq API (`groq/compound-mini`) |
| **AI Secondary** | Google Gemini API (`gemini-2.0-flash`) |
| **Icons** | Lucide React |
| **State** | React hooks + localStorage |
| **Build** | Webpack (Windows-compatible) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Groq API key OR Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/interview-ai-agent-pro.git
cd interview-ai-agent-pro

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your API keys:

```env
# AI Provider (groq or gemini)
AI_PROVIDER=groq

# Groq Configuration
GROQ_API_KEY=gsk_your_api_key_here
GROQ_MODEL=groq/compound-mini

# Gemini Configuration (optional, if using gemini provider)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Testing

```bash
npm run test
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `AI_PROVIDER` | No | `groq` | AI provider to use (`groq` or `gemini`) |
| `GROQ_API_KEY` | Yes* | — | Groq API key |
| `GROQ_MODEL` | No | `groq/compound-mini` | Groq model identifier |
| `GEMINI_API_KEY` | Yes* | — | Google Gemini API key |
| `GEMINI_MODEL` | No | `gemini-2.0-flash` | Gemini model identifier |

\* At least one API key is required.

---

## Interview Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Setup     │────▶│   Chat       │────▶│  Evaluation  │────▶│   Report     │
│  (Form)     │     │  (Questions) │     │  (Scoring)   │     │  (Roadmap)   │
└─────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
      │                    │                    │                    │
      ▼                    ▼                    ▼                    ▼
  Select role,      AI generates         AI evaluates          Learning
  level, skills,    questions based      answers with          roadmap with
  difficulty        on config            scores + feedback     resources
```

---

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

Set environment variables in the Vercel dashboard.

### Docker

```bash
docker build -t interview-ai .
docker run -p 3000:3000 interview-ai
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
