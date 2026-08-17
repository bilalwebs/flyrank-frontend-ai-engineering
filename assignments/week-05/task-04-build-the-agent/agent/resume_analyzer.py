"""Resume analysis agent using the OpenAI Agents SDK.

This is the ONLY orchestrator. The UI never calls the LLM directly.
The agent uses tools for file parsing and returns structured AnalysisResult.

OpenAI uses native structured outputs (output_type).
Groq/Gemini use text output with JSON parsing (structured outputs unsupported).
"""

from __future__ import annotations

import json
import re
import time

from agents import Agent, RunConfig, Runner

from models.schemas import AnalysisResult
from prompts.ats_prompt import ATS_SCORING_CRITERIA
from prompts.resume_prompt import RESUME_ANALYSIS_GUIDELINES
from prompts.suggestion_prompt import SUGGESTION_GUIDELINES
from prompts.system_prompt import SYSTEM_INSTRUCTIONS
from providers.factory import get_provider
from tools.file_parser import parse_resume
from utils.logger import get_logger

logger = get_logger(__name__)

_AGENT_INSTRUCTIONS = "\n\n".join([
    SYSTEM_INSTRUCTIONS,
    RESUME_ANALYSIS_GUIDELINES,
    ATS_SCORING_CRITERIA,
    SUGGESTION_GUIDELINES,
])

_JSON_SCHEMA_REMINDER = """

IMPORTANT — Return your analysis as a single valid JSON object matching this schema exactly:
{
  "resume_review": "string — comprehensive review",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "formatting_issues": ["string"],
  "ats_risks": ["string"],
  "ats_score": 0,
  "ats_score_explanation": "string",
  "missing_skills": ["string"],
  "suggestions": ["string"]
}

Rules:
- Return ONLY the raw JSON object. No markdown fences, no explanation, no extra text.
- ats_score must be an integer between 0 and 100.
- Every field is required.
"""


def _build_agent(model_name: str, *, structured: bool = True) -> Agent:
    """Create a fresh Agent with the resolved model name.

    Args:
        model_name: The model identifier for the configured provider.
        structured: If True, use output_type for native structured outputs.

    Returns:
        A configured Agent instance.
    """
    kwargs: dict = {
        "name": "Resume Analyzer",
        "instructions": _AGENT_INSTRUCTIONS,
        "tools": [parse_resume],
        "model": model_name,
    }
    if structured:
        kwargs["output_type"] = AnalysisResult

    return Agent(**kwargs)


def _parse_json_from_text(text: str) -> AnalysisResult:
    """Extract and validate a JSON AnalysisResult from raw model text.

    Handles common issues: markdown fences, leading/trailing text.
    """
    text = text.strip()

    # Strip markdown code fences if present
    text = re.sub(r"^```(?:json)?\s*\n?", "", text)
    text = re.sub(r"\n?```\s*$", "", text)
    text = text.strip()

    # Try to find a JSON object in the text
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        text = match.group(0)

    return AnalysisResult.model_validate_json(text)


async def analyze_resume(resume_path: str, job_description: str) -> AnalysisResult:
    """Run the complete resume analysis workflow.

    Orchestrates: file parsing (via tool) → resume review → ATS scoring →
    missing skills detection → improvement suggestions.

    Args:
        resume_path: Absolute path to the uploaded resume file.
        job_description: The target job description text.

    Returns:
        A validated AnalysisResult with all analysis fields populated.

    Raises:
        ValueError: If inputs are invalid.
        RuntimeError: If the LLM call fails.
    """
    if not resume_path or not resume_path.strip():
        raise ValueError("Resume path cannot be empty.")
    if not job_description or not job_description.strip():
        raise ValueError("Job description cannot be empty.")

    provider, model_name = get_provider()

    # OpenAI supports structured outputs natively; others need text→JSON parsing
    use_structured = provider is not None

    agent = _build_agent(model_name, structured=use_structured)

    # For non-OpenAI, append JSON schema instructions to agent prompt
    if not use_structured:
        agent.instructions = _AGENT_INSTRUCTIONS + _JSON_SCHEMA_REMINDER

    run_config = RunConfig(model_provider=provider) if provider else RunConfig()

    user_input = (
        f"Analyze the resume at the following file path against the job description below.\n\n"
        f"Resume file path: {resume_path}\n\n"
        f"Job Description:\n{job_description}"
    )

    logger.info("Analysis started for resume: %s (model: %s, structured: %s)",
                resume_path, model_name, use_structured)
    start_time = time.time()

    try:
        result = await Runner.run(
            agent,
            user_input,
            run_config=run_config,
        )
        elapsed = time.time() - start_time

        # OpenAI returns validated AnalysisResult directly
        if use_structured:
            logger.info("Analysis completed in %.2fs", elapsed)
            return result.final_output

        # Groq/Gemini: parse JSON from text output
        raw_text = str(result.final_output)
        logger.debug("Raw model output (first 500 chars): %s", raw_text[:500])

        parsed = _parse_json_from_text(raw_text)
        logger.info("Analysis completed in %.2fs (parsed from text)", elapsed)
        return parsed

    except Exception as e:
        elapsed = time.time() - start_time
        logger.error("Analysis failed after %.2fs: %s", elapsed, e)
        raise RuntimeError(f"Resume analysis failed: {e}") from e
