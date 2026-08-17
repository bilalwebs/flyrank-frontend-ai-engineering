"""Pydantic schemas for structured agent output.

The agent uses output_type=AnalysisResult to guarantee the LLM returns
validated JSON matching this exact shape. The UI renders parsed data only.
"""

from pydantic import BaseModel, Field


class AnalysisResult(BaseModel):
    """Structured output from the resume analysis agent.

    Every field is required so the LLM cannot omit sections.
    The UI renders only what this schema defines.
    """

    resume_review: str = Field(
        description="Comprehensive review of the resume covering content, presentation, and alignment with the job description."
    )
    strengths: list[str] = Field(
        description="Key strengths found in the resume that align with the job requirements."
    )
    weaknesses: list[str] = Field(
        description="Weaknesses, gaps, or areas that need improvement."
    )
    formatting_issues: list[str] = Field(
        description="Formatting problems that may affect ATS parsing or readability."
    )
    ats_risks: list[str] = Field(
        description="Specific risks for ATS compatibility."
    )
    ats_score: int = Field(
        description="ATS compatibility score from 0 to 100.",
        ge=0,
        le=100,
    )
    ats_score_explanation: str = Field(
        description="Detailed explanation of why the ATS score was assigned."
    )
    missing_skills: list[str] = Field(
        description="Skills required in the job description but absent from the resume."
    )
    suggestions: list[str] = Field(
        description="Prioritized, actionable improvement suggestions grounded in the uploaded resume."
    )
