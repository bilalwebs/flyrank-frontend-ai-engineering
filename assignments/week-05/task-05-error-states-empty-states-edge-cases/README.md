# AI Job Application Assistant

> Week 05 — Error Handling, Empty States & Edge Case Improvements

> An AI-powered resume analysis tool that provides ATS scoring, missing skills detection, and improvement suggestions using the OpenAI Agents SDK.

## Features

- **Resume Upload** — PDF, DOCX, and TXT support with real file parsing
- **Job Description Input** — Paste any job description for comparison
- **Resume Review** — Strengths, weaknesses, and formatting analysis
- **ATS Compatibility Score** — 0-100 score with detailed explanation
- **Missing Skills Detection** — Skills required by the JD but absent from the resume
- **Improvement Suggestions** — Prioritized, actionable recommendations
- **Multi-Provider Support** — OpenAI, Groq, and Gemini (configurable via `.env`)
- Production-ready error handling
- Empty state onboarding
- Loading skeletons and progress indicators
- Retry workflow after failures
- Input validation before analysis
- Responsive UI across desktop and mobile

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
task-05-error-states-empty-states-edge-cases/
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
cd task-05-error-states-empty-states

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

## Assignment Mapping (FE-08)

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

## Error Handling

The application implements comprehensive error handling across all layers to ensure production-ready UX.

### Empty States

When the app opens, users see contextual empty states instead of blank areas:

| State              | Message                             | CTA            |
| ------------------ | ----------------------------------- | -------------- |
| First visit        | Onboarding card with 3-step guide   | —             |
| No resume uploaded | "No resume uploaded yet."           | Upload Resume  |
| No job description | "Paste a Job Description to begin." | —             |
| No analysis yet    | "No analysis available."            | Analyze Resume |

### Loading States

Analysis progress is communicated through:

- **Progress bar** with stage-specific messages (e.g., "Extracting resume content...", "Calculating ATS compatibility score...")
- **Skeleton card placeholders** showing shimmer-animated content shapes
- **Disabled Analyze button** while analysis runs (prevents duplicate clicks)
- **Loading text** changes to "Analyzing..." during processing

### Error States

Every error maps to a user-friendly message via `utils/errors.py`:

| Error Type            | User Message                                                                   |
| --------------------- | ------------------------------------------------------------------------------ |
| No resume uploaded    | "Please upload a resume file before analyzing."                                |
| No job description    | "Please paste a job description before analyzing."                             |
| Empty resume file     | "The uploaded resume contains no readable text."                               |
| File too large (>5MB) | "The file is too large. Please upload a file smaller than 5 MB."               |
| Unsupported file type | "Unsupported file type. Please upload a PDF, DOCX, or TXT file."               |
| Corrupted file        | "The file appears to be corrupted and cannot be read."                         |
| Missing API key       | "API key not configured. Please set your API key in the .env file."            |
| Provider timeout      | "The AI provider took too long to respond."                                    |
| Rate limit exceeded   | "Rate limit exceeded. Please wait a moment and try again."                     |
| Network failure       | "Could not connect to the AI provider. Please check your internet connection." |
| Provider unavailable  | "The AI provider is currently unavailable. Please try a different provider."   |
| Invalid response      | "The AI provider returned an invalid response."                                |
| Model refusal         | "The AI model declined to analyze the content."                                |
| Invalid JSON          | "The AI response could not be parsed."                                         |
| Unknown error         | "An unexpected error occurred. Please try again."                              |

Stack traces are **never** exposed to users. Technical details are available in an expander for debugging.

### Edge Cases Handled

- File uploaded but no JD → validation error
- JD provided but no resume → validation error
- Empty resume (0 bytes) → empty file error
- Resume with only whitespace → empty resume error
- Very short JD (<20 chars) → warning shown
- Very long JD → accepted with no issues
- Same file uploaded twice → works correctly
- Click Analyze repeatedly → button disabled during analysis
- API returns empty response → InvalidResponseError
- Invalid JSON from model → InvalidJSONError
- Model refuses request → ModelRefusalError
- Rate limit hit → RateLimitError with retry hint
- Slow internet → timeout error with retry suggestion
- Provider unavailable → ProviderUnavailableError with switch suggestion

### Button States

- **Analyze Button**: Disabled while loading, shows "Analyzing..." text
- **Retry Button**: Appears after failure, runs the previous request again
- **File inputs**: Disabled during analysis to prevent state changes

### Validation

Pre-analysis validation checks (in order):

1. Resume file is uploaded
2. Job description is provided
3. File size < 5 MB
4. File extension is supported (.pdf, .docx, .txt)
5. JD length >= 20 characters
6. Provider API key is configured
7. Provider is supported

### Logging

Every error is logged with:

- Timestamp
- Provider name
- Exception type
- Error message
- Full stack trace (in debug level)

Logs are written to `logs/app.log` and never exposed to users.

### User Feedback

Uses Streamlit alert components:

- `st.success()` — analysis completed
- `st.warning()` — short JD, missing API key
- `st.error()` — validation failures, analysis errors
- `st.info()` — retry available, short JD hint

## Testing Error Scenarios

The application was tested against common production failures.

### Tested Cases

- No resume uploaded
- No job description provided
- Empty resume file
- Unsupported file type
- File larger than 5 MB
- Missing API Key
- Network interruption
- Provider timeout
- Rate limit response
- Invalid AI response
- Model refusal
- Retry after failure

All scenarios display user-friendly messages without exposing internal exceptions.

## Testing Matrix

| Scenario | Status |
|----------|--------|
| No Resume Uploaded | ✅ |
| No Job Description | ✅ |
| Empty Resume File | ✅ |
| Unsupported File | ✅ |
| Large File | ✅ |
| Missing API Key | ✅ |
| Network Failure | ✅ |
| Provider Timeout | ✅ |
| Rate Limit | ✅ |
| Retry Flow | ✅ |
| Successful Analysis | ✅ |

## Responsive Design

The application is responsive across multiple screen sizes.

Verified on:

- Desktop
- Laptop
- Tablet
- Mobile layout

The application maintains usability across desktop, laptop, tablet, and mobile layouts while preserving loading, empty, and error states. Components adapt gracefully to varying viewport sizes without losing critical functionality or visual hierarchy. All interactive elements remain accessible and responsive regardless of device orientation or screen resolution.

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

## FE-08 Checklist

- ✅ Empty states
- ✅ Loading states
- ✅ Skeleton placeholders
- ✅ Validation
- ✅ Retry workflow
- ✅ Friendly error messages
- ✅ Edge case handling
- ✅ Responsive UI
- ✅ Logging
- ✅ Production-ready UX

## Checkpoint Verification

Week-05 Task-05 implementation includes:

- Happy path resume analysis
- Empty states
- Loading skeletons
- Validation states
- Retry workflow
- Error handling
- Edge case handling
- Responsive layout

Evidence is included in the project submission through screenshots and demo recording.

## Summary

Week-05 (FE-08) focused on delivering production-grade user experience improvements to the AI Job Application Assistant. The implementation prioritizes graceful handling of edge cases and user-friendly communication across all application states. Key enhancements include comprehensive error handling that translates technical exceptions into clear, actionable messages; empty states that guide users through the initial onboarding experience; loading indicators that provide visual feedback during analysis; robust validation before processing; a retry workflow for failed requests; and responsive layout design that maintains functionality across all device types. These improvements ensure the application remains intuitive and reliable regardless of user actions, network conditions, or API provider responses.

## License

This project is part of the FlyRank Frontend AI Engineering Internship.

## Acknowledgements

- [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) for the agent framework
- [Streamlit](https://streamlit.io/) for the UI framework
- [Pydantic](https://docs.pydantic.dev/) for data validation
- [pypdf](https://pypdf.readthedocs.io/) and [python-docx](https://python-docx.readthedocs.io/) for file parsing
