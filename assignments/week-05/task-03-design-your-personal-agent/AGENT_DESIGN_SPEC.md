# AGENT_DESIGN_SPEC.md

# AI Job Application Assistant

## Software Design Specification

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| Document Title | AI Job Application Assistant - Design Specification |
| Assignment     | FL-06: Design Your Personal Agent                   |
| Track          | General AI Fluency                                  |
| Week           | 5                                                   |
| Phase          | Build                                               |
| Document Type  | Product Design Specification                        |
| Status         | Final                                               |
| Version        | 1.0                                                 |
| Author         | Muhammad Bilal Hussain                              |
| Date           | August 2026                                         |

---

## 1. Project Overview

### Agent Name

AI Job Application Assistant

### Purpose

The AI Job Application Assistant is a personal, scripted AI agent that helps a job seeker prepare stronger job applications. It reviews resumes, analyzes job descriptions, quantifies ATS compatibility, and generates professional application materials such as cover letters, LinkedIn summaries, and interview questions. The agent operates on a single-user, single-session basis and produces outputs the user can export, review, and refine.

### Problem Statement

Preparing a job application requires repetitive, time-consuming work: tailoring a resume to a specific role, interpreting what a job description actually asks for, writing a cover letter, and anticipating interview questions. Mistakes in this process have real consequences. An ATS may reject a well-qualified candidate because keywords are missing, or a cover letter may fail because it does not reflect the target role. Generic advice from blog posts does not account for the user's specific resume and the specific job description.

### Goals

- Review an uploaded resume and identify strengths, weaknesses, and ATS risks.
- Analyze a job description and extract key requirements, skills, and responsibilities.
- Produce an ATS compatibility score with clear, actionable reasons.
- Generate ATS-friendly resume suggestions without altering the user's facts.
- Generate professional cover letters, LinkedIn summaries, and interview questions tailored to the resume and job description.
- Keep all processing grounded in the user's uploaded materials and explicitly stated preferences.
- Support the entire workflow in one session and export outputs to Markdown.

### Non-Goals

- Automated job search, job aggregation, or application submission.
- Resume rewriting that changes facts (dates, employers, titles, or credentials).
- Multi-user accounts, cloud storage, or shared workspaces.
- Persistent memory across sessions.
- Integration with job boards, LinkedIn, or email providers.
- Guaranteed interview or job placement outcomes.
- Resume formatting or PDF generation.
- Mobile application or API service.

---

## 2. Job To Be Done

The single job this agent performs: **turn one resume plus one job description into a complete, ATS-ready application package in one session.**

When the user is applying for a role, they provide their resume and the job description. The agent analyzes both, reports how well the resume matches the role, produces specific suggestions for improvement, and generates a cover letter, a LinkedIn summary, and a set of interview questions. The user reviews each output, refines it, and exports it as Markdown.

The agent intentionally handles one application at a time. This keeps the system simple, keeps outputs grounded in a single source of truth, and matches how job applications are actually prepared.

---

## 3. Target User

The primary user is the author of this specification, a software engineering intern applying for frontend and AI-related roles.

### Background

- A software engineering intern with frontend, AI engineering, and data science coursework.
- Comfortable with technical writing and version control, but new to structured job search tooling.
- Applies to roles individually, one application at a time.

### Goals

- Understand how a specific resume measures up against a specific job description.
- Fix ATS compatibility issues before submitting.
- Produce role-specific cover letters and LinkedIn summaries quickly.
- Prepare for interviews with questions grounded in the actual job description.

### Pain Points

- Manual resume tailoring is slow and inconsistent between applications.
- ATS keyword matching is opaque; it is unclear what to change and why.
- Generic AI outputs require heavy editing because they are not grounded in the user's actual experience.
- Time is limited; the 10-hour build must prioritize the highest-value workflow.

### Expected Outcomes

- A fast, repeatable workflow for any new job description.
- Clear, evidence-based suggestions that name the specific skill, keyword, or phrasing to change.
- Professional, personalized documents ready for a final human review.
- Confidence that nothing in the generated output invents experience or credentials.

---

## 4. Usage Frequency

- **Before a new application** (most common): upload resume and job description, review the ATS score and suggestions, then generate the cover letter. Expected several times per month.
- **Before an interview**: after an application is submitted, generate interview questions for that specific role.
- **When updating the resume** (weekly or biweekly): run the resume review without a job description to keep the master resume clean and ATS-friendly.

Sessions are expected to last 15-30 minutes each. The agent is used on demand; it never runs unattended.

---

## 5. Features

The agent implements exactly seven features. No additional features are added in this build.

| # | Feature                      | Description                                                                                                                                                                                              |
| - | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Resume Review                | Analyzes the uploaded resume for structure, content, impact, and ATS compatibility. Produces a strengths and weaknesses report with evidence quoted from the resume.                                     |
| 2 | ATS Score                    | Computes a 0-100 ATS compatibility score against the job description, broken down into weighted categories (skills, keywords, section structure, formatting). Every point deducted must name the reason. |
| 3 | Resume Suggestions           | Generates specific, actionable edits to improve the ATS score. Suggestions are limited to rewording, reordering, and keyword alignment; facts are never changed without explicit user confirmation.      |
| 4 | Job Description Analysis     | Extracts the role's core responsibilities, required skills, preferred skills, and stated priorities, so the user can see exactly what the employer emphasized.                                           |
| 5 | Cover Letter Generator       | Writes a professional cover letter grounded in the resume and the job description analysis, using a template that keeps the letter to a realistic one-page length.                                       |
| 6 | LinkedIn Summary Generator   | Writes a concise LinkedIn profile summary aligned with the target role, derived from the resume and the user's stated professional identity.                                                             |
| 7 | Interview Question Generator | Produces a prioritized list of likely interview questions, generated from the job description's stated responsibilities and required skills.                                                             |

---

## 6. Tools Required

| Tool                 | Purpose                                                                                     | Access Plan                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI Responses API | All language and reasoning tasks: resume analysis, ATS scoring, document generation.        | Used as the sole model backend via the OpenAI SDK in a Python script. Model selected at runtime from environment configuration.                                     |
| PDF Parser           | Extract text from uploaded PDF resumes.                                                     | `pypdf` (Python library) extracts text to a string in memory; extracted text is passed to the model as context.                                                   |
| Text Input           | Accept resumes and job descriptions that are not in PDF form (paste or drag-and-drop text). | Streamlit file uploader and text area widgets; supports PDF upload or direct text paste, converted to plain strings.                                                |
| Markdown Export      | Download generated documents as local Markdown files.                                       | Python`markdown` library renders content in-app for preview; Streamlit download button produces a `.md` file from the generated text. No external storage used. |

Access notes: all tools are local to the running Python process. No cloud storage, database, or third-party integrations are required. This keeps the dependency surface small enough for a 10-hour build.

---

## 7. Data Sources

| Data Source          | Description                                                                                                        | Source                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Resume               | The user's current resume, including work history, education, and skills.                                          | User uploads a PDF, or pastes plain text, at the start of each session. Stored only in memory for the duration of the session. |
| Job Description      | The posting text for the role the user is applying to.                                                             | User pastes text or uploads a document. Stored only in memory for the duration of the session.                                 |
| LinkedIn Information | The user's professional headline, industry, and positioning preferences.                                           | Optional structured input the user fills in; used only to ground the LinkedIn Summary feature.                                 |
| User Notes           | Extra context: target seniority, tone preference, application deadline, or clarifications for missing information. | User-entered text in the session; appended to the analysis context.                                                            |

All data is ephemeral. It lives in session state only, is never written to disk, and is never used to train or fine-tune any model.

---

## 8. Platform Choice

### Selected Platform: Scripted Agent using OpenAI Agents SDK + Streamlit

**Why this platform is best for this project:**

- **Small, deterministic toolset.** The agent needs exactly three capabilities (analyze, score, generate), and the OpenAI Agents SDK makes each tool a small, well-named function with a single responsibility. This matches the "few, high-quality tools" principle: a PDF reader tool, a text normalization tool, and generation tools.
- **Full control over instructions and outputs.** System instructions, temperature, and output format are explicitly set in code. The agent behaves the same on every run, which makes evaluation cases reproducible.
- **Fast to build and debug.** A single Python script plus Streamlit covers the UI, the agent loop, and exports. There is no server, database, or frontend framework to manage. This is the smallest architecture that still meets the requirements.
- **Privacy and simplicity.** Everything runs locally from the user's machine; only the document content is sent to the model API. No data persists.
- **Maintainable.** The agent logic and the Streamlit UI are separated into modules, so the design can grow later without a rewrite.

### Alternative: Custom GPT (OpenAI)

A Custom GPT bundles the same instructions behind a chat interface with file upload support.

**Why the scripted agent is more appropriate:**

- **Deterministic tool execution.** The scripted agent defines explicit tools with explicit inputs and outputs. A Custom GPT decides its own behavior sequence, which makes results harder to reproduce and evaluate.
- **Structured exports.** The scripted agent produces downloadable Markdown files. A Custom GPT exports through chat text, which the user must copy manually.
- **Code-level quality.** The scripted agent's logic is version-controlled, testable, and inspectable. A Custom GPT's behavior is configured through a chat-based editor, with no audit trail.
- **Scoping discipline.** The scripted agent's seven features are enforced by code. A Custom GPT may drift into unrelated behavior because the model interprets instructions loosely.

The scripted agent is the better fit for a controlled, reproducible, single-user tool that must be built, verified, and documented within 10 hours.

---

## 9. Agent Instructions

The following system instructions guide the agent's behavior in every session:

- Analyze before generating. Read and understand the resume and job description in full before producing any score, suggestion, or document.
- Never invent user experience. Every statement in a generated document must be traceable to the resume, the job description, or explicit user input.
- Keep ATS compatibility. Use standard section headings (Experience, Education, Skills), conventional formatting, and role-relevant keywords. Recommend plain-text-safe layouts.
- Ask clarifying questions when information is missing. If the job description or resume is missing, or key fields are ambiguous, request the missing material before generating outputs.
- Generate professional outputs only. Use formal, concise, hiring-appropriate language. No slang, no informal tone, no fabricated statistics.
- Be honest about limitations. State when a suggestion is a guess, and clearly mark the ATS score as an estimate, not a guarantee.
- Protect user privacy. Never repeat full personal contact details in outputs unless the user asks, and never send data anywhere beyond the model API call.
- Keep documents human-reviewable. Every generated document is a draft for the user to verify, never a final submission.
- Present suggestions as options. When multiple fixes exist, give alternatives with trade-offs instead of a single command.

---

## 10. Evaluation Cases

The following cases verify the agent behaves correctly before and during development. Each case must pass before the feature it covers is considered complete.

| Scenario                                                           | Expected Result                                                                                                                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Resume uploaded without a job description                          | Agent asks the user to provide a job description before producing an ATS score or tailored documents; it may still produce a general resume review.                |
| Job description pasted without a resume                            | Agent asks the user to upload a resume; no generated documents are produced from an empty resume.                                                                  |
| Job description asks for skills absent from the resume             | Agent reports the gap, names the missing skills, and suggests how to reflect related experience honestly. It never adds the missing skills to the resume as facts. |
| Resume contains dates, employer names, and job titles              | All generated outputs preserve these facts exactly; no position, date, or credential is changed or invented.                                                       |
| Cover letter generation with a complete resume and job description | Output is a one-page, professional, role-specific letter; every claim can be traced to the resume or the job description.                                          |
| User asks for interview questions after analysis                   | Output lists 5-10 prioritized questions derived from the job description's stated responsibilities and required skills.                                            |
| PDF resume upload that is valid but poorly structured              | Agent extracts text successfully, flags the structure problems in the review, and keeps the ATS score low with itemized reasons.                                   |
| Generated output export                                            | User can download the cover letter, LinkedIn summary, and questions as separate Markdown files with correct filenames.                                             |

---

## 11. Risks

| Risk                      | Description                                                                                                | Mitigation                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hallucination             | The model may invent experience, education, or skills that are not in the source materials.                | Strict grounding instructions; every generated fact must be traceable to the resume, job description, or user notes. User must review all drafts. |
| Missing information       | The user provides an incomplete resume or an ambiguous job description.                                    | Agent asks clarifying questions before generating and clearly marks estimates or assumptions.                                                     |
| Privacy concerns          | Sensitive personal and employment data passes through a model API.                                         | Data is used in memory only, never persisted, and no data is used for training. Document this in the UI.                                          |
| Incorrect ATS suggestions | ATS behavior is opaque and varies by vendor; the agent may give advice that does not match a specific ATS. | The ATS score is always labeled an estimate. Suggestions are framed as best practices with rationale.                                             |
| Outdated hiring advice    | Hiring practices and ATS behavior evolve; the model's knowledge may lag.                                   | Keep the knowledge cutoff noted in the UI; prefer recommendations grounded in the current job description over generic advice.                    |
| Over-tuned output         | Over-optimizing keywords can make the resume read poorly to human reviewers.                               | Suggestions explicitly balance keyword alignment with natural, professional language.                                                             |

---

## 12. Guardrails

### The Agent MUST

- Ask for and receive user confirmation before changing any factual resume content (dates, employers, titles, education).
- Protect uploaded files: process them in memory only, never write them to disk, and never retain them after the session ends.
- Verify missing information by asking the user rather than guessing.
- Cite the source of every claim in generated documents (resume, job description, or user notes).
- Mark the ATS score as an estimate with the reasons behind it.
- Produce only professional, job-appropriate language.
- Label all generated documents as drafts for human review.

### The Agent MUST NOT

- Invent work experience, education, titles, dates, or skills.
- Change factual resume details without explicit user approval.
- Automatically submit job applications or contact employers.
- Fabricate company information, salary figures, or statistics.
- Claim that an ATS score guarantees an interview or job offer.
- Access or require credentials for external services (LinkedIn, job boards, email).
- Persist, store, or log uploaded documents or user data.
- Claim to be a certified career coach, recruiter, or legal advisor.

---

## 13. Future Improvements

The following enhancements are explicitly out of scope for the initial 10-hour build but are natural extensions of the same architecture:

1. **Portfolio Review** - analyze a link or uploaded portfolio against the target role.
2. **GitHub Repository Analysis** - review public repositories for evidence of the skills the job requires.
3. **Company Research** - summarize the target company and its stated priorities from provided links.
4. **Email Drafting** - generate follow-up or thank-you email drafts after an interview.
5. **Multi-language Support** - produce application documents in additional languages.
6. **Salary Insights** - surface role-posting salary ranges when present in the job description.
7. **Mock Interview Mode** - an interactive practice loop that asks questions and gives feedback.
8. **Application History** - a local, user-controlled record of past analyses for tracking over time.

---

## 14. Development Scope

The project is achievable within approximately 10 hours because it uses a minimal architecture (one Python script, Streamlit UI, one model API), a small fixed feature set, and no external integrations.

### Milestone Plan

| Phase   | Work                                                                                                                                | Estimated Time |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Phase 1 | Project setup; Streamlit app skeleton; PDF and text input handling; session state; system instructions drafted.                     | 2 hours        |
| Phase 2 | Core analysis features: resume review, job description analysis, ATS score, resume suggestions. Model prompts and response parsing. | 3 hours        |
| Phase 3 | Generation features: cover letter, LinkedIn summary, interview questions; Markdown rendering and export.                            | 2.5 hours      |
| Phase 4 | Evaluation cases run; guardrail checks; UI polish; error states; documentation of the 10-hour build.                                | 2.5 hours      |

Buffer: 0 hours beyond the estimates above because each phase is independently verifiable and any single feature can be delivered without blocking the others.

---

## 15. Conclusion

The AI Job Application Assistant is a focused, single-purpose agent that turns one resume and one job description into a complete, ATS-aware application package in a single session. It is deliberately small: seven features, four tools, one user, and no external integrations, which keeps the 10-hour build realistic and the behavior verifiable. Grounding instructions, explicit guardrails, and reproducible evaluation cases keep the agent honest about what it can and cannot do. This design balances product value with engineering discipline and responsible AI practice, and it establishes a clean foundation for the future improvements listed above.

---

## References

1. FlyRank AI Fluency - Week 5 Assignment (FL-06: Design Your Personal Agent)
2. OpenAI - A Practical Guide to Building Agents
3. Anthropic - Writing Effective Tools for Agents
