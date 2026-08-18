"""Tests for the AnalysisResult schema."""

from __future__ import annotations

import sys
from pathlib import Path

import pytest
from pydantic import ValidationError

_project_root = Path(__file__).resolve().parent.parent
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))

from models.schemas import AnalysisResult


class TestAnalysisResult:
    """Tests for the AnalysisResult Pydantic model."""

    def _make_valid_result(self) -> dict:
        return {
            "resume_review": "The resume is well-structured overall.",
            "strengths": ["Strong Python skills", "Quantified achievements"],
            "weaknesses": ["Missing cloud experience"],
            "formatting_issues": ["Inconsistent date formats"],
            "ats_risks": ["Non-standard section headers"],
            "ats_score": 72,
            "ats_score_explanation": "Good keyword match but formatting issues reduce score.",
            "missing_skills": ["Kubernetes", "Docker"],
            "suggestions": ["Add Kubernetes experience", "Standardize section headers"],
        }

    def test_valid_result_creates(self) -> None:
        result = AnalysisResult(**self._make_valid_result())
        assert result.ats_score == 72
        assert len(result.strengths) == 2

    def test_ats_score_boundaries(self) -> None:
        data = self._make_valid_result()

        data["ats_score"] = 0
        result = AnalysisResult(**data)
        assert result.ats_score == 0

        data["ats_score"] = 100
        result = AnalysisResult(**data)
        assert result.ats_score == 100

    def test_ats_score_out_of_range_rejected(self) -> None:
        data = self._make_valid_result()
        data["ats_score"] = 101
        with pytest.raises(ValidationError):
            AnalysisResult(**data)

        data["ats_score"] = -1
        with pytest.raises(ValidationError):
            AnalysisResult(**data)

    def test_missing_required_field_rejected(self) -> None:
        data = self._make_valid_result()
        del data["resume_review"]
        with pytest.raises(ValidationError):
            AnalysisResult(**data)

    def test_empty_lists_are_valid(self) -> None:
        data = self._make_valid_result()
        data["strengths"] = []
        data["missing_skills"] = []
        result = AnalysisResult(**data)
        assert result.strengths == []

    def test_json_roundtrip(self) -> None:
        data = self._make_valid_result()
        result = AnalysisResult(**data)
        json_str = result.model_dump_json()
        restored = AnalysisResult.model_validate_json(json_str)
        assert restored.ats_score == result.ats_score
        assert restored.suggestions == result.suggestions
