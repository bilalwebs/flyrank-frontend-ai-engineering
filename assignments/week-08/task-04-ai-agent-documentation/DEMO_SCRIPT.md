# Demo Script — AI Job Application Assistant

> A 3-5 minute live demo walkthrough for recording a screen capture presentation.

---

## Pre-Demo Setup

Before recording, ensure:

- [ ] Python 3.12+ virtual environment is active
- [ ] `.env` is configured with at least one API key (OpenAI recommended)
- [ ] `streamlit run app.py` is running at `localhost:8501`
- [ ] A sample resume file is ready (PDF or DOCX)
- [ ] A sample job description is ready (paste from a real job posting)
- [ ] Screen recording software is active (OBS, Loom, or QuickTime)
- [ ] Browser is zoomed to 100% with bookmarks bar hidden

---

## Demo Script

### Opening (0:00 - 0:30)

**What to say:**

> "Hi, I'm Muhammad Bilal Hussain, and this is my AI Job Application Assistant — an AI agent that evaluates your resume against a job description, scores ATS compatibility, detects missing skills, and gives you actionable improvement suggestions."

**What to show:**
- Browser with the app open at `localhost:8501`
- The dark-mode SaaS dashboard UI

### Project Overview (0:30 - 1:00)

**What to say:**

> "The project is built with Python, Streamlit, and the OpenAI Agents SDK. It supports three LLM providers — OpenAI, Groq, and Gemini — switchable via configuration without code changes. The agent is the sole orchestrator; the UI never calls the LLM directly."

**What to show:**
- Point to the sidebar showing the provider selector
- Briefly show the folder structure in VS Code (optional)

### Upload and Analyze (1:00 - 2:30)

**What to say:**

> "Let me walk through a real analysis. I'll upload a resume and paste a job description."

**Steps to perform live:**

1. **Upload resume** — Click "Upload Resume" card, select a PDF resume file
   > "The app supports PDF, DOCX, and TXT formats. File parsing uses real tools — pypdf for PDFs, python-docx for DOCX files."

2. **Paste job description** — Paste a real job description into the text area
   > "I'm pasting a real job description for a Frontend Developer position. The agent will compare the resume against these specific requirements."

3. **Click "Analyze Resume"** — Click the blue button
   > "Now the agent is working. It's invoking the file parser tool to read the resume, then analyzing it against the job description using the LLM."

4. **Wait for results** — (5-15 seconds depending on provider)
   > "The analysis is complete. Let's walk through the results."

### Results Walkthrough (2:30 - 3:30)

**What to say and show for each section:**

1. **ATS Score Ring**
   > "First, the ATS compatibility score. This is a 0-100 score based on weighted criteria — skills match, experience alignment, education, keyword optimization, and format compatibility. The green ring gives a quick visual indicator."

2. **Resume Review**
   > "The review section covers strengths, weaknesses, and formatting issues. Notice how the agent references specific sections from the resume — it's not giving generic advice."

3. **Missing Skills**
   > "Here are the skills required by the job description that aren't in the resume. This is the most actionable section — these are concrete gaps to address."

4. **Improvement Suggestions**
   > "Finally, prioritized suggestions. These are grounded in the actual resume content, not boilerplate tips."

### Provider Switching (3:30 - 4:00)

**What to say:**

> "One of the key features is multi-provider support. Let me show how easy it is to switch."

**Steps:**

1. Change `PROVIDER=groq` in `.env` (or show the sidebar selector)
   > "Groq is free and fast — great for development. Gemini is another option. No code changes needed — just configuration."

### Closing (4:00 - 4:30)

**What to say:**

> "The agent follows a clean layered architecture — UI, service, agent, tools, providers — each with a single responsibility. The agent uses the OpenAI Agents SDK's `output_type` with a Pydantic model to guarantee structured JSON output. The `@tool` decorator makes file parsing a real agent capability, not just a helper function."

> "This project taught me how to design AI agents that are genuinely useful — not just chatbot wrappers, but systems with real tools, structured output, and clean architecture."

---

## Key Points to Emphasize

| Point | Why It Matters |
|-------|---------------|
| Real AI agent | Not a chatbot wrapper — uses `@tool` for actual file parsing |
| Structured output | Pydantic `output_type` guarantees validated JSON |
| Multi-provider | Strategy Pattern allows switching LLM backends |
| Clean architecture | 7 distinct layers, no circular dependencies |
| Tested | 20+ test cases, all passing |

---

## Recording Tips

- **Speak slowly** — Screen recordings feel faster than live presentations
- **Pause after actions** — Give viewers time to see what changed on screen
- **Highlight the agent** — Emphasize that this is a real agent, not a simple API call
- **Keep it under 5 minutes** — Shorter demos are watched completely
- **End with the architecture** — Leave viewers with the impression of clean design

---

## Backup Screenshots

If live demo fails, have these ready:

1. The full dashboard with results loaded
2. The ATS score ring showing a high score (80+)
3. The missing skills section
4. The provider selector in the sidebar
5. The VS Code folder structure

---

*Demo prepared by Muhammad Bilal Hussain. Built with AI assistance.*
