# BUILD_LOG.md — AI Job Application Assistant

## Development Timeline

### Phase 1: Architecture & Planning
- Reviewed FL-07 assignment requirements thoroughly
- Researched OpenAI Agents SDK v0.21.1 API patterns (ModelProvider, @tool, output_type)
- Designed clean architecture with Strategy Pattern for providers
- Identified over-engineering in initial plan and simplified:
  - Removed separate `base_provider.py` (SDK provides ModelProvider interface)
  - Merged `parser_decorators.py` into `file_parser.py`
  - Merged `file_utils.py` into the parser module
- Final file count: 29 files (down from 30)

### Phase 2: Foundation
- Created folder structure with all `__init__.py` files
- Implemented `config/settings.py` using pydantic-settings with `.env` support
- Created `models/schemas.py` with `AnalysisResult` Pydantic model

### Phase 3: Provider Layer
- Implemented three providers using the Strategy Pattern:
  - `OpenAIProvider` — native Responses API via `OpenAIResponsesModel`
  - `GroqProvider` — Chat Completions via `AsyncOpenAI(base_url=groq)`
  - `GeminiProvider` — Chat Completions via `AsyncOpenAI(base_url=gemini)`
- Created `ProviderFactory` that reads config and returns the correct provider
- Key decision: Each provider implements the SDK's `ModelProvider` interface directly rather than creating a custom base class

### Phase 4: Agent & Tools
- Created `parse_resume` tool using `@tool` decorator from `agents.decorators`
  - Real file parsing: pypdf for PDF, python-docx for DOCX, stdlib for TXT
  - Tool is genuinely invoked by the LLM during its reasoning loop
- Designed `ResumeAnalyzerAgent` with:
  - Combined prompt from 4 template modules
  - `output_type=AnalysisResult` for structured JSON output
  - Single `analyze_resume()` async function as public API

### Phase 5: UI & Service Layer
- Built Streamlit UI with sidebar (provider selector, status) and main analysis area
- Created thin service layer for file I/O and error handling
- Used `asyncio.run()` for async agent calls in Streamlit's sync context

### Phase 6: Testing & Documentation
- Created 5 test modules with 20+ test cases
- Generated test fixtures programmatically (no manual sample files)
- Wrote README with architecture diagrams, workflow, and assignment mapping

---

## Problems Encountered

### 1. Agent Model Resolution
**Problem:** When the agent doesn't specify a `model` parameter, the provider's `get_model()` receives `None`. Need to ensure the provider falls back to its configured model.

**Solution:** Each provider uses `model_name or self._model` — if the SDK passes `None`, the provider's configured model is used. The agent intentionally omits the `model` parameter so the provider is the single source of truth.

### 2. Streamlit Async Compatibility
**Problem:** Streamlit runs synchronously, but the OpenAI Agents SDK uses async (`Runner.run()`).

**Solution:** Used `asyncio.run()` in the button handler. This works because Streamlit doesn't run its own event loop. If issues arise, `nest_asyncio` is the fallback.

### 3. Groq/Gemini Provider Compatibility
**Problem:** Groq and Gemini don't support the OpenAI Responses API, only Chat Completions.

**Solution:** Used `OpenAIChatCompletionsModel` with `AsyncOpenAI(base_url=...)` for both. The OpenAI-compatible endpoints from Groq and Google make this seamless. OpenAI uses `OpenAIResponsesModel` for the native API.

### 4. Temporary File Cleanup
**Problem:** Uploaded files need to be saved to disk for the parsing tool, but must be cleaned up afterward.

**Solution:** The service layer uses `tempfile.NamedTemporaryFile(delete=False)` with a `finally` block that calls `Path.unlink(missing_ok=True)`. This guarantees cleanup even on errors.

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Strategy Pattern for providers | Allows switching LLM backends without changing agent or UI code |
| SDK's `ModelProvider` interface | Avoids reinventing the wheel; the SDK already defines this contract |
| `output_type=AnalysisResult` | Guarantees structured JSON output; no parsing free-form text |
| Separate prompt modules | Prompts are version-controlled, reusable, and testable independently |
| Thin service layer | Keeps UI clean without adding unnecessary complexity |
| `@tool` for file parsing | Makes parsing a real agent tool, not just a helper function |

---

## Features Removed During Planning

| Feature | Reason |
|---------|--------|
| Cover letter generator | Out of FL-07 MVP scope |
| LinkedIn summary | Out of scope |
| Interview questions | Out of scope |
| Multi-user auth | Explicitly excluded |
| Database | Explicitly excluded |
| Chat history | Explicitly excluded |
| `providers/base_provider.py` | Redundant — SDK provides `ModelProvider` |
| `tools/parser_decorators.py` | Over-engineering — merged into `file_parser.py` |
| `utils/file_utils.py` | Over-engineering — validation lives in the parser |

---

## Testing Notes

- Tests run without API keys (mocked agent calls)
- File parser tests use programmatically generated fixtures
- PDF fixture creation is limited in some test environments (handled with `pytest.skip`)
- All schema tests validate boundary conditions (score 0, 100, out of range)

---

## Future Improvements

1. **Streaming output** — Stream analysis results token-by-token to the UI
2. **Session state** — Store analysis history in Streamlit session state
3. **Batch analysis** — Analyze multiple resumes against one JD
4. **Real ATS comparison** — Compare AI score against actual ATS tool output
5. **Export** — Download analysis as PDF or JSON
6. **Guardrails** — Add input/output guardrails from the Agents SDK
7. **Handoffs** — Multi-agent architecture (one for parsing, one for ATS, one for suggestions)

---

## Lessons Learned

1. **The OpenAI Agents SDK's provider system is powerful** — `ModelProvider` + `OpenAIChatCompletionsModel` makes non-OpenAI providers straightforward
2. **`output_type` is the right abstraction** — Pydantic models as structured output eliminate all JSON parsing fragility
3. **Over-engineering is easy to spot in review** — Three extra files were removed before writing any code
4. **Prompt engineering benefits from modularity** — Splitting prompts by concern (system, ATS, suggestions) makes them independently testable and versionable
5. **Real tools matter** — Using `@tool` for file parsing makes the agent genuinely useful, not just a chatbot wrapper
