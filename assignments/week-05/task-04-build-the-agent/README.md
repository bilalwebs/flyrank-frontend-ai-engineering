# AI Job Application Assistant

> An AI-powered resume analysis tool that provides ATS scoring, missing skills detection, and improvement suggestions using the OpenAI Agents SDK.

## Features

- **Resume Upload** — PDF, DOCX, and TXT support with real file parsing
- **Job Description Input** — Paste any job description for comparison
- **Resume Review** — Strengths, weaknesses, and formatting analysis
- **ATS Compatibility Score** — 0-100 score with detailed explanation
- **Missing Skills Detection** — Skills required by the JD but absent from the resume
- **Improvement Suggestions** — Prioritized, actionable recommendations
- **Multi-Provider Support** — OpenAI, Groq, and Gemini (configurable via `.env`)

## Architecture

```
Streamlit UI (app.py)
    |
    v
Service Layer (services/resume_service.py)
    |
    v
Agent Layer (agents/resume_analyzer.py)
    |-- OpenAI Agents SDK: Agent, Runner, output_type, @tool
    |-- tools/ for file parsing
    |-- providers/ for LLM backend
    |
    v
Provider Layer (providers/)
    |-- OpenAIProvider  (Responses API)
    |-- GroqProvider    (Chat Completions)
    |-- GeminiProvider  (Chat Completions)
    |
    v
LLM (OpenAI / Groq / Gemini)
```

**Key principle**: The UI never calls the LLM. The agent is the sole orchestrator.

## Folder Structure

```
task-04-build-the-agent/
|-- app.py                 # Streamlit entry point (UI layer)
|-- requirements.txt       # Dependencies
|-- .env.example           # Environment variable template
|-- README.md              # This file
|-- BUILD_LOG.md           # Engineering build diary
|
|-- config/                # Configuration (pydantic-settings)
|   |-- settings.py        # Central Settings class
|
|-- providers/             # LLM provider abstraction (Strategy Pattern)
|   |-- openai_provider.py # OpenAI Responses API
|   |-- groq_provider.py   # Groq Chat Completions
|   |-- gemini_provider.py # Gemini Chat Completions
|   |-- factory.py         # Provider factory (reads config)
|
|-- prompts/               # Prompt templates (never hardcoded in UI/agent)
|   |-- system_prompt.py   # Core agent role and rules
|   |-- resume_prompt.py   # Resume review guidelines
|   |-- ats_prompt.py      # ATS scoring criteria
|   |-- suggestion_prompt.py # Suggestion guidelines
|
|-- tools/                 # Real file parsing tools
|   |-- file_parser.py     # PDF/DOCX/TXT parsing + @tool wrapper
|
|-- agents/                # Agent orchestrator
|   |-- resume_analyzer.py # ResumeAnalyzerAgent (sole orchestrator)
|
|-- models/                # Pydantic schemas
|   |-- schemas.py         # AnalysisResult (structured output)
|
|-- services/              # Business logic layer
|   |-- resume_service.py  # Bridges UI and agent
|
|-- utils/                 # Shared utilities
|   |-- logger.py          # Logging configuration
|
|-- logs/                  # Runtime logs
|-- assets/                # Static assets
|-- docs/                  # Documentation
|-- tests/                 # pytest test suite
```

## Workflow Diagram

```
1. User opens Streamlit app
2. User selects provider in sidebar (OpenAI / Groq / Gemini)
3. User uploads resume (PDF, DOCX, or TXT)
4. User pastes job description
5. User clicks "Analyze Resume"
6. Service saves file to temp, calls agent
7. Agent invokes parse_resume tool (reads the file)
8. Agent analyzes resume text against job description
9. Agent returns structured AnalysisResult (JSON)
10. UI renders: ATS Score, Review, Skills Gap, Suggestions
```

## Installation

### Prerequisites

- Python 3.12+
- pip

### Setup

```bash
# Clone the repository
cd task-04-build-the-agent

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys
```

## Configuration

### `.env` File

```env
# Provider: "openai" | "groq" | "gemini"
PROVIDER=openai

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Groq
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile

# Gemini
GEMINI_API_KEY=AI...
GEMINI_MODEL=gemini-2.0-flash
```

### Provider Selection

The provider is set via the `PROVIDER` variable in `.env`. The UI also shows a provider selector in the sidebar. Switching providers requires no code changes — only configuration.

| Provider | API Type         | Supported Models                      |
| -------- | ---------------- | ------------------------------------- |
| OpenAI   | Responses API    | gpt-4o, gpt-4o-mini, o3-mini          |
| Groq     | Chat Completions | llama-3.3-70b-versatile, mixtral-8x7b |
| Gemini   | Chat Completions | gemini-2.0-flash, gemini-1.5-pro      |

## How to Run

```bash
streamlit run app.py
```

The app opens at `http://localhost:8501`.

## Running Tests

```bash
pytest tests/ -v
```

## Assignment Mapping (FL-07)

| Requirement              | Implementation                                            |
| ------------------------ | --------------------------------------------------------- |
| Resume Upload            | `app.py` file_uploader + `services/resume_service.py` |
| Resume Parsing           | `tools/file_parser.py` (@tool for PDF/DOCX/TXT)         |
| Job Description Input    | `app.py` text_area                                      |
| Resume Review            | Agent`output_type=AnalysisResult.resume_review`         |
| ATS Compatibility Score  | Agent`output_type=AnalysisResult.ats_score`             |
| Missing Skills Detection | Agent`output_type=AnalysisResult.missing_skills`        |
| Improvement Suggestions  | Agent`output_type=AnalysisResult.suggestions`           |
| OpenAI Agents SDK        | `agents/resume_analyzer.py` using Agent + Runner        |
| Multi-Provider           | `providers/` with Strategy Pattern                      |
| Structured Output        | Pydantic`AnalysisResult` with `output_type`           |
| Clean Architecture       | UI → Service → Agent → Tools/Providers → LLM          |
| Real Tool                | `@tool` decorated `parse_resume` function             |
| Prompt Engineering       | `prompts/` with 4 separate template modules             |

## Known Limitations

- Single-user application (no authentication)
- No chat history or session persistence
- Analysis is synchronous (no streaming to UI)
- File size limited by Streamlit's default upload limit (~200MB)
- ATS score is AI-estimated, not a real ATS engine

## Future Improvements

- Cover letter generation
- LinkedIn profile analysis
- Interview question generation
- Multi-user authentication and history
- Resume version tracking
- Real ATS engine comparison
- Streaming analysis output

## License

This project is part of the FlyRank Frontend AI Engineering Internship.

## Acknowledgements

- [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) for the agent framework
- [Streamlit](https://streamlit.io/) for the UI framework
- [Pydantic](https://docs.pydantic.dev/) for data validation
- [pypdf](https://pypdf.readthedocs.io/) and [python-docx](https://python-docx.readthedocs.io/) for file parsing
