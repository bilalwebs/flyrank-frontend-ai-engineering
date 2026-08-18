"""Tests for the resume service layer."""

from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import AsyncMock, patch

import pytest

_project_root = Path(__file__).resolve().parent.parent
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))

from models.schemas import AnalysisResult


class TestAnalyzeUploadedResume:
    """Tests for the analyze_uploaded_resume service function."""

    @pytest.mark.asyncio
    async def test_empty_file_content_raises(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        from utils.errors import ResumeNotFoundError

        with pytest.raises(ResumeNotFoundError):
            await analyze_uploaded_resume(b"", "resume.pdf", "Some JD")

    @pytest.mark.asyncio
    async def test_empty_job_description_raises(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        from utils.errors import JobDescriptionNotFoundError

        with pytest.raises(JobDescriptionNotFoundError):
            await analyze_uploaded_resume(b"content", "resume.pdf", "")

    @pytest.mark.asyncio
    async def test_unsupported_file_type_raises(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        from utils.errors import UnsupportedFileTypeError

        with pytest.raises(UnsupportedFileTypeError):
            await analyze_uploaded_resume(b"content", "resume.exe", "Some JD")

    @pytest.mark.asyncio
    async def test_successful_analysis(self, sample_txt_path: Path) -> None:
        from services.resume_service import analyze_uploaded_resume

        mock_result = AnalysisResult(
            resume_review="Good resume.",
            strengths=["Strong skills"],
            weaknesses=["Could be longer"],
            formatting_issues=[],
            ats_risks=[],
            ats_score=85,
            ats_score_explanation="Strong match.",
            missing_skills=["Go"],
            suggestions=["Add Go experience"],
        )

        with patch(
            "services.resume_service.analyze_resume",
            new_callable=AsyncMock,
            return_value=mock_result,
        ):
            file_bytes = sample_txt_path.read_bytes()
            result = await analyze_uploaded_resume(
                file_content=file_bytes,
                file_name="resume.txt",
                job_description="Looking for a developer.",
            )
            assert result.ats_score == 85
            assert "Go" in result.missing_skills
