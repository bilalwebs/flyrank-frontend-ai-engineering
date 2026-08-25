# AI Job Application Assistant

> An AI-powered resume analysis agent that evaluates resumes against job descriptions, scores ATS compatibility, detects missing skills, and provides actionable improvement suggestions — built with the OpenAI Agents SDK, Streamlit, and a clean multi-provider architecture.

---

## Project Overview

The AI Job Application Assistant is a Python-based AI agent that helps job seekers optimize their resumes for specific positions. Users upload a resume (PDF, DOCX, or TXT), paste a job description, and receive a comprehensive analysis including ATS compatibility scoring, skills gap detection, and prioritized improvement recommendations.

### What the Agent Does

1. **Parses uploaded resumes** using real file parsing tools (not just reading raw text)
2. **Analyzes content quality** — strengths, weaknesses, formatting issues
3. **Scores ATS compatibility** on a 0-100 scale with weighted criteria
4. **Detects missing skills** required by the job description but absent from the resume
5. **Generates improvement suggestions** prioritized by impact

### Target Users

- **Job seekers** applying for technical positions who want to optimize their resumes
- **Career changers** transitioning between industries who need to align their experience
- **University students** entering the job market for the first time
- **Engineers** who want a data-driven approach to resume improvement

### Key Differentiator

Unlike generic resume review tools, this is a **real AI agent** — not a chatbot wrapper. The agent:
- Uses the `@tool` decorator to invoke actual file parsing during its reasoning loop
- Returns structured Pydantic output (not free-form text)
- Works with three different LLM providers via the Strategy Pattern
- Follows a clean layered architecture where the UI never calls the LLM directly

---

## Setup Instructions

### Prerequisites

- Python 3.12+
- pip
- An API key from at least one LLM provider (OpenAI, Groq, or Gemini)

### Installation

```bash
# Clone the repository
git clone https://github.com/bilalwebs/flyrank-frontend-ai-engineering.git
cd flyrank-frontend-ai-engineering/assignments/week-05/task-04-build-the-agent

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys
```

**`.env` configuration:**

```env
# Provider: "openai" | "groq" | "gemini"
PROVIDER=openai

# OpenAI (if using OpenAI)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Groq (if using Groq)
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile

# Gemini (if using Gemini)
GEMINI_API_KEY=AI...
GEMINI_MODEL=gemini-2.0-flash
```

### Run

```bash
streamlit run app.py
```

The app opens at [http://localhost:8501](http://localhost:8501).

### Run Tests

```bash
pytest tests/ -v
```

---

## Usage Examples

### Example 1: Basic Resume Analysis

1. Open the app at `localhost:8501`
2. Select **OpenAI** as the provider in the sidebar
3. Upload your resume (PDF, DOCX, or TXT)
4. Paste the job description you're applying for
5. Click **Analyze Resume**
6. View results: ATS Score, Review, Skills Gap, Suggestions

### Example 2: Switching Providers

To use Groq (free, fast) instead of OpenAI:

1. Change `PROVIDER=groq` in `.env`
2. Add your Groq API key: `GROQ_API_KEY=gsk_...`
3. Restart the app: `streamlit run app.py`
4. No code changes required

### Example 3: Understanding the ATS Score

The ATS score breakdown shows:
- **Skills match** (30 points) — How many required skills appear in the resume
- **Experience alignment** (25 points) — Whether experience level matches the job
- **Education match** (15 points) — Degree requirements
- **Keyword optimization** (20 points) — Presence of industry-specific terms
- **Format compatibility** (10 points) — Parsing-friendly formatting

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User (Browser)                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Streamlit UI (app.py)                    │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ Sidebar      │  │ Upload Card  │  │ Results    │  │
│  │ - Provider   │  │ - Resume     │  │ - ATS Ring │  │
│  │ - Status     │  │ - JD Input   │  │ - Review   │  │
│  │              │  │ - Analyze    │  │ - Skills   │  │
│  └─────────────┘  └──────────────┘  └────────────┘  │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│           Service Layer (resume_service.py)           │
│  - Validates inputs                                   │
│  - Manages temp file lifecycle                        │
│  - Calls agent, returns AnalysisResult                │
│  - Cleanup in finally block                           │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│         Agent Layer (resume_analyzer.py)              │
│  ┌──────────────────────────────────────────────┐    │
│  │  OpenAI Agents SDK                           │    │
│  │  - Agent with combined instructions          │    │
│  │  - @tool: parse_resume (file parsing)        │    │
│  │  - output_type: AnalysisResult (Pydantic)    │    │
│  │  - Runner.run() for execution                │    │
│  └──────────────────────────────────────────────┘    │
└───────┬──────────────────────────┬───────────────────┘
        │                          │
        ▼                          ▼
┌───────────────────┐  ┌──────────────────────────────┐
│  Tools Layer       │  │  Provider Layer               │
│  file_parser.py    │  │  (Strategy Pattern)            │
│  - @tool decorated │  │  ┌──────────┐ ┌──────────┐   │
│  - PDF via pypdf   │  │  │ OpenAI   │ │ Groq     │   │
│  - DOCX via docx   │  │  │ Provider │ │ Provider │   │
│  - TXT via stdlib  │  │  └──────────┘ └──────────┘   │
└───────────────────┘  │  ┌──────────┐ ┌──────────┐   │
                       │  │ Gemini   │ │ Factory  │   │
                       │  │ Provider │ │          │   │
                       │  └──────────┘ └──────────┘   │
                       └──────────────────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  LLM Backend      │
                       │  OpenAI / Groq /  │
                       │  Gemini           │
                       └──────────────────┘
```

### Design Principles

1. **UI never calls the LLM** — The agent is the sole orchestrator
2. **Strategy Pattern for providers** — Switch LLM backends without changing code
3. **Structured output** — Pydantic models guarantee validated JSON
4. **Real tools** — File parsing is a genuine agent tool, not a helper function
5. **Separation of concerns** — UI, service, agent, tools, providers are independent layers

---

## V2 Evaluation Results

### Build Quality

| Check | Result |
|-------|--------|
| Python syntax | Valid (no errors) |
| Type hints | Present throughout |
| Imports | Clean, no circular dependencies |
| `.env.example` | Complete with all variables |

### Testing

| Module | Tests | Status |
|--------|-------|--------|
| `test_config.py` | Settings defaults, provider config | Pass |
| `test_schemas.py` | AnalysisResult validation, boundaries, JSON roundtrip | Pass |
| `test_file_parser.py` | TXT, DOCX, PDF parsing, edge cases | Pass |
| `test_provider_factory.py` | All providers, unsupported provider, case insensitivity | Pass |
| `test_resume_service.py` | Empty file, empty JD, unsupported type, successful mock | Pass |

### Architecture Quality

| Principle | Implementation |
|-----------|---------------|
| Separation of concerns | 7 distinct layers (UI, service, agent, tools, providers, models, config) |
| Single responsibility | Each module does one thing well |
| Dependency direction | UI → Service → Agent → Tools/Providers (no circular) |
| Configuration externalized | `.env` + pydantic-settings, no hardcoded values |
| Error handling | Try/catch in service layer, validation in schemas, logging throughout |

### Provider Support

| Provider | API Type | Model | Structured Output |
|----------|----------|-------|-------------------|
| OpenAI | Responses API | gpt-4o | Native `output_type` |
| Groq | Chat Completions | llama-3.3-70b-versatile | JSON parsing fallback |
| Gemini | Chat Completions | gemini-2.0-flash | JSON parsing fallback |

### Prompt Engineering

| Module | Purpose | Lines |
|--------|---------|-------|
| `system_prompt.py` | Agent role, behavioral rules, workflow | 29 |
| `resume_prompt.py` | Content quality, structure, formatting criteria | 45 |
| `ats_prompt.py` | Weighted scoring methodology (100-point system) | 34 |
| `suggestion_prompt.py` | Prioritization rules, grounding requirements | 37 |

---

## Limitations

### Current Limitations

1. **Single-user application** — No authentication or user accounts. Each session is independent.
2. **No chat history** — Analysis results are not persisted. Refreshing the page loses everything.
3. **Synchronous analysis** — The agent runs synchronously; results appear all at once, not streamed token-by-token.
4. **ATS score is AI-estimated** — The score reflects the agent's analysis, not a real ATS engine comparison.
5. **File size limited** — Streamlit's default upload limit (~200MB) applies.
6. **No offline mode** — Requires an active internet connection for LLM API calls.
7. **Provider-specific quirks** — Groq and Gemini use JSON parsing fallback instead of native structured outputs.

### What Could Improve

| Area | Current | Future |
|------|---------|--------|
| Persistence | None | Database + session history |
| Streaming | Synchronous | Token-by-token UI updates |
| Multi-user | Single user | Authentication + profiles |
| Coverage | Resume only | Cover letter, LinkedIn, portfolio |
| Validation | Pydantic only | Input/output guardrails from Agents SDK |
| Export | None | PDF/JSON download |

---

## AI Transparency

### How AI Helped

This project was built with AI assistance throughout the entire development process. Here is an honest accounting of what AI contributed and what was manually verified.

**AI Tools Used:**
- **OpenCode** (mimo-v2.5-free model) — Primary AI coding assistant for architecture decisions, code generation, debugging, and documentation

**Where AI Accelerated Development:**
- Architecture design — AI helped identify the clean layered architecture and Strategy Pattern for providers
- Provider implementation — AI generated the boilerplate for three LLM providers using the OpenAI Agents SDK
- Pydantic schema — AI structured the `AnalysisResult` model with proper field descriptions and validation
- Prompt engineering — AI drafted the four prompt modules (system, resume, ATS, suggestions)
- Streamlit UI — AI generated the dark-mode SaaS dashboard with custom CSS, SVG score ring, and responsive layout
- Test suite — AI created 20+ test cases with programmatically generated fixtures

**What AI Generated:**
- All initial provider implementations
- The file parser with `@tool` decorator
- Service layer with temp file lifecycle management
- Configuration system using pydantic-settings
- 6 test modules with mock-based testing
- README and BUILD_LOG documentation

**What Was Manually Reviewed and Verified:**
- Every file was lint-checked and tested after generation
- Architecture decisions were validated against the OpenAI Agents SDK documentation
- The agent's `analyze_resume` function was tested with real resume files
- Provider switching was verified across all three backends
- Edge cases (empty files, invalid providers, missing API keys) were manually tested
- The BUILD_LOG documents 4 specific problems encountered and solved

**Manual Improvements Made:**
- Removed 3 over-engineered files during planning (base_provider.py, parser_decorators.py, file_utils.py)
- Simplified provider architecture to use SDK's native `ModelProvider` interface
- Added JSON schema reminder for non-OpenAI providers that don't support structured outputs
- Implemented `_parse_json_from_text` fallback with markdown fence stripping
- Added comprehensive error handling in the service layer

**AI did not replace understanding.** Every concept — from the Strategy Pattern to the OpenAI Agents SDK's `output_type` to Pydantic's `model_validate_json` — was studied and verified, not blindly accepted.

---

## License

This project is part of the FlyRank Frontend AI Engineering Internship.

---

*Built with AI assistance. Reviewed, tested, and verified by hand.*
