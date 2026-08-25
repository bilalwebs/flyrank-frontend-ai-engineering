# Project Story — AI Job Application Assistant

> The journey of building an AI agent that actually does useful work — not just a chatbot wrapper, but a real tool with structured output, file parsing, and clean architecture.

---

## Why I Built This

I was frustrated with the gap between "AI demos" and "AI tools that actually help people." Most AI resume reviewers are just chatbot wrappers — you paste your resume, get a wall of generic text, and walk away with the same resume you started with.

I wanted to build something different: an AI agent that:
- **Parses real files** — not just reads pasted text, but actually opens PDFs and DOCX files
- **Returns structured data** — not free-form paragraphs, but scored, categorized, actionable output
- **Works with multiple LLMs** — because lock-in to one provider is a single point of failure
- **Follows clean architecture** — because spaghetti code doesn't scale, even for a "small" project

The job application process is stressful enough. A tool that actually helps you improve your resume — with specific, grounded suggestions — is worth building.

---

## The Journey

### Phase 1: Planning and Architecture (Day 1)

I started by reading the FL-07 assignment requirements thoroughly. The OpenAI Agents SDK was the framework, but I needed to understand its patterns before writing code.

**Key decisions:**
- **Strategy Pattern for providers** — Three LLM backends (OpenAI, Groq, Gemini) behind a common interface. Switching providers means changing one line in `.env`, not rewriting agent code.
- **Separation of concerns** — Seven distinct layers: UI, service, agent, tools, providers, models, config. Each does one thing well.
- **Structured output via Pydantic** — The agent returns `AnalysisResult`, not free-form text. The UI renders parsed fields, not markdown soup.

**What I removed during planning:**
- `base_provider.py` — The SDK already provides `ModelProvider`. Reinventing it was over-engineering.
- `parser_decorators.py` — Merged into `file_parser.py`. One module, one job.
- `file_utils.py` — Validation belongs in the parser, not a separate utility.

Starting with 30 files, I reduced to 29 before writing any code. Better to cut early than carry dead weight.

### Phase 2: Foundation (Day 1-2)

The foundation layer was straightforward but critical:

- `config/settings.py` — pydantic-settings with `.env` support. Every setting loaded from environment, never hardcoded.
- `models/schemas.py` — The `AnalysisResult` Pydantic model. Every field required, every description precise. This is the contract between the agent and the UI.

**Lesson learned:** Taking time to define the data model upfront saved hours of debugging later. When the agent returns structured JSON, you know exactly what the UI will receive.

### Phase 3: Provider Layer (Day 2)

The provider layer was the most technically interesting part. Three providers, three different API patterns:

- **OpenAI** — Uses the SDK's native `OpenAIResponsesModel` for the Responses API. Structured outputs work natively with `output_type`.
- **Groq** — Uses `AsyncOpenAI(base_url=groq)` with `OpenAIChatCompletionsModel`. Groq doesn't support the Responses API, only Chat Completions.
- **Gemini** — Same pattern as Groq, different base URL. Google's OpenAI-compatible endpoint makes this seamless.

**The breakthrough:** Realizing that Groq and Gemini could use the SDK's global client pattern (`set_default_openai_client`) instead of custom provider classes. This eliminated an entire layer of abstraction.

### Phase 4: Agent and Tools (Day 2-3)

This is where the project became an actual AI agent, not just a chatbot wrapper.

**The `@tool` decorator:** The `parse_resume` function is decorated with `@tool` from the OpenAI Agents SDK. This means the LLM genuinely invokes it during its reasoning loop — it's not called by the UI or a helper function. The agent decides when to parse the file, calls the tool, and uses the result in its analysis.

**Combined prompts:** Four separate prompt modules (system, resume, ATS, suggestions) are joined into a single instruction set. This keeps concerns separated while giving the agent a unified persona.

**JSON schema reminder:** For Groq and Gemini (which don't support native structured outputs), I added a JSON schema reminder to the agent instructions. The `_parse_json_from_text` function handles markdown fences and leading/trailing text that models sometimes produce.

### Phase 5: UI and Service Layer (Day 3)

The Streamlit UI was built to feel like a SaaS dashboard, not a homework assignment:

- Dark mode with custom CSS
- SVG-based ATS score ring with animated fill
- Three-column card layout for results
- Sidebar with provider selector and system status
- Responsive design for different screen sizes

**The service layer** is intentionally thin — it validates inputs, manages temp file cleanup, calls the agent, and returns results. The UI never touches the LLM. The agent is the sole orchestrator.

### Phase 6: Testing and Documentation (Day 3-4)

The test suite covers:
- Config defaults and provider selection
- Schema validation and boundary conditions
- File parser with TXT, DOCX, and PDF fixtures
- Provider factory with all providers and error cases
- Service layer with mock agent calls

Tests run without API keys — the agent is mocked, so CI/CD can validate logic without billing anyone.

---

## Challenges and How I Solved Them

### Challenge 1: Agent Model Resolution

**Problem:** When the agent doesn't specify a `model` parameter, the provider receives `None`. Need the provider to fall back to its configured model.

**Solution:** Each provider uses `model_name or self._model` — if the SDK passes `None`, the provider's configured model is used. The agent intentionally omits `model` so the provider is the single source of truth.

### Challenge 2: Streamlit Async Compatibility

**Problem:** Streamlit runs synchronously, but the OpenAI Agents SDK uses async (`Runner.run()`).

**Solution:** `asyncio.run()` in the button handler. Streamlit doesn't run its own event loop, so this works without `nest_asyncio`. If issues arise later, `nest_asyncio` is the fallback.

### Challenge 3: Non-OpenAI Provider Compatibility

**Problem:** Groq and Gemini don't support the OpenAI Responses API, only Chat Completions.

**Solution:** `OpenAIChatCompletionsModel` with `AsyncOpenAI(base_url=...)` for both. The OpenAI-compatible endpoints make this seamless. The factory pattern means the agent code never knows which provider it's using.

### Challenge 4: Temporary File Cleanup

**Problem:** Uploaded files need to be saved to disk for parsing, but must be cleaned up afterward.

**Solution:** `tempfile.NamedTemporaryFile(delete=False)` with a `finally` block calling `Path.unlink(missing_ok=True)`. Guarantees cleanup even on errors.

---

## What I Learned

### Technical Lessons

1. **The OpenAI Agents SDK's provider system is powerful** — `ModelProvider` + `OpenAIChatCompletionsModel` makes non-OpenAI providers straightforward
2. **`output_type` is the right abstraction** — Pydantic models as structured output eliminate all JSON parsing fragility
3. **Over-engineering is easy to spot in review** — Three extra files were removed before writing any code
4. **Prompt engineering benefits from modularity** — Splitting prompts by concern makes them independently testable
5. **Real tools matter** — Using `@tool` for file parsing makes the agent genuinely useful

### Process Lessons

1. **Plan before coding** — The architecture decisions made in Phase 1 saved hours in Phases 3-5
2. **Define the data model first** — `AnalysisResult` was the contract that everything else built around
3. **Test without API keys** — Mock-based testing means the test suite runs anywhere, anytime
4. **Remove before adding** — Cutting three files during planning was better than carrying dead weight

### AI Collaboration Lessons

1. **AI accelerates boilerplate** — Provider implementations, test fixtures, and UI styling were generated quickly
2. **Architecture decisions need human judgment** — AI suggested approaches, but I chose the Strategy Pattern and seven-layer architecture
3. **Every AI output needs verification** — Every file was lint-checked, tested, and reviewed after generation
4. **AI doesn't replace understanding** — I studied the OpenAI Agents SDK docs to verify provider patterns, not blindly trust AI output

---

## Impact

### For Job Seekers

The tool provides:
- **Objective scoring** — ATS compatibility on a 0-100 scale, not subjective opinions
- **Gap analysis** — Specific skills required by the JD but absent from the resume
- **Prioritized suggestions** — Actionable recommendations, not generic advice
- **Provider flexibility** — Use OpenAI for quality, Groq for speed, Gemini for cost

### For My Learning

The project reinforced:
- Clean architecture matters even for "small" projects
- Structured output is better than free-form text for UI rendering
- Real tools (file parsing) make agents genuinely useful
- Testing without external dependencies is essential for CI/CD

---

## What I'd Build Next

1. **Session persistence** — Store analysis history so users can track improvement over time
2. **Batch analysis** — Analyze multiple resumes against one JD for recruiters
3. **Export to PDF** — Download analysis as a formatted report
4. **Input/output guardrails** — Use the Agents SDK's guardrail system for safety
5. **Cover letter generation** — Extend the agent to draft tailored cover letters
6. **Real ATS comparison** — Compare AI score against actual ATS tool output

---

*Built with AI assistance. Reviewed, tested, and verified by hand.*
*Part of the FlyRank Frontend AI Engineering Internship.*
