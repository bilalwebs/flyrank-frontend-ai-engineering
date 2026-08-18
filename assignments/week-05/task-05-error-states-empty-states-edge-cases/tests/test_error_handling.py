"""Comprehensive tests for error handling, edge cases, validation, and retry.

Covers every requirement from Week-05 Task-05:
- Empty states
- Loading states
- Error states
- Edge cases
- Button states
- User feedback
- Validation
- Retry
"""

from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import AsyncMock, patch

import pytest

_project_root = Path(__file__).resolve().parent.parent
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))

from models.schemas import AnalysisResult
from utils.errors import (
    AgentError,
    AnalysisError,
    AppError,
    CorruptedFileError,
    EmptyResumeError,
    FileError,
    FileTooLargeError,
    InvalidJSONError,
    InvalidResponseError,
    JobDescriptionNotFoundError,
    MissingAPIKeyError,
    ModelRefusalError,
    NetworkError,
    ParsingError,
    ProviderError,
    ProviderTimeoutError,
    ProviderUnavailableError,
    RateLimitError,
    ResumeNotFoundError,
    ShortInputError,
    UnsupportedFileTypeError,
    UnsupportedProviderError,
    classify_error,
)
from utils.errors import ValidationError as AppValidationError
from utils.logger import log_error, get_logger


# ═══════════════════════════════════════════════════════════════════════
# 1. Error Class Hierarchy
# ═══════════════════════════════════════════════════════════════════════
class TestErrorHierarchy:
    """Verify that all custom errors inherit from AppError."""

    def test_all_errors_inherit_app_error(self) -> None:
        error_classes = [
            AppValidationError,
            ResumeNotFoundError,
            JobDescriptionNotFoundError,
            EmptyResumeError,
            ShortInputError,
            FileError,
            UnsupportedFileTypeError,
            FileTooLargeError,
            CorruptedFileError,
            ProviderError,
            MissingAPIKeyError,
            ProviderTimeoutError,
            RateLimitError,
            NetworkError,
            ProviderUnavailableError,
            UnsupportedProviderError,
            InvalidResponseError,
            ModelRefusalError,
            InvalidJSONError,
            AgentError,
            ParsingError,
            AnalysisError,
        ]
        for cls in error_classes:
            assert issubclass(cls, AppError), f"{cls.__name__} must inherit from AppError"

    def test_app_error_has_required_fields(self) -> None:
        err = AppError("test", provider="openai")
        assert err.user_message
        assert err.error_code
        assert err.severity in ("error", "warning", "info")
        assert err.provider == "openai"
        assert err.internal_message == "test"

    def test_app_error_is_exception(self) -> None:
        with pytest.raises(AppError):
            raise AppError("test")


# ═══════════════════════════════════════════════════════════════════════
# 2. Error Classification
# ═══════════════════════════════════════════════════════════════════════
class TestClassifyError:
    """Test the classify_error helper maps exceptions to correct types."""

    def test_timeout_classified(self) -> None:
        err = classify_error(Exception("connection timeout after 30s"))
        assert isinstance(err, ProviderTimeoutError)

    def test_rate_limit_429_classified(self) -> None:
        err = classify_error(Exception("429 rate limit exceeded"))
        assert isinstance(err, RateLimitError)

    def test_auth_error_classified(self) -> None:
        err = classify_error(Exception("401 unauthorized"))
        assert isinstance(err, MissingAPIKeyError)

    def test_connection_error_classified(self) -> None:
        err = classify_error(Exception("connection refused"))
        assert isinstance(err, NetworkError)

    def test_refusal_classified(self) -> None:
        err = classify_error(Exception("model refused to answer"))
        assert isinstance(err, ModelRefusalError)

    def test_empty_response_classified(self) -> None:
        err = classify_error(Exception("empty response from provider"))
        assert isinstance(err, InvalidResponseError)

    def test_json_error_classified(self) -> None:
        err = classify_error(Exception("json decode error"))
        assert isinstance(err, InvalidJSONError)

    def test_unavailable_classified(self) -> None:
        err = classify_error(Exception("service unavailable"))
        assert isinstance(err, ProviderUnavailableError)

    def test_unknown_error_falls_back(self) -> None:
        err = classify_error(Exception("something weird happened"))
        assert isinstance(err, AgentError)

    def test_already_app_error_passthrough(self) -> None:
        original = RateLimitError("too many requests", provider="groq")
        result = classify_error(original)
        assert result is original
        assert result.provider == "groq"

    def test_exception_type_timeout(self) -> None:
        err = classify_error(TimeoutError("timed out"))
        assert isinstance(err, ProviderTimeoutError)

    def test_exception_type_permission(self) -> None:
        err = classify_error(PermissionError("access denied"))
        assert isinstance(err, FileError)

    def test_exception_type_filenotfound(self) -> None:
        err = classify_error(FileNotFoundError("no such file"))
        assert isinstance(err, FileError)


# ═══════════════════════════════════════════════════════════════════════
# 3. File Parser Error Handling
# ═══════════════════════════════════════════════════════════════════════
class TestFileParserErrors:
    """Test file parser raises correct errors for edge cases."""

    def test_empty_file_raises(self, tmp_path: Path) -> None:
        from tools.file_parser import parse_file
        empty = tmp_path / "empty.txt"
        empty.write_text("")
        with pytest.raises(EmptyResumeError):
            parse_file(str(empty))

    def test_whitespace_only_file_raises(self, tmp_path: Path) -> None:
        from tools.file_parser import parse_file
        ws = tmp_path / "spaces.txt"
        ws.write_text("   \n\n   \t  ")
        with pytest.raises(EmptyResumeError):
            parse_file(str(ws))

    def test_unsupported_extension_raises(self, tmp_path: Path) -> None:
        from tools.file_parser import parse_file
        bad = tmp_path / "resume.exe"
        bad.write_text("content")
        with pytest.raises(UnsupportedFileTypeError):
            parse_file(str(bad))

    def test_file_not_found_raises(self) -> None:
        from tools.file_parser import parse_file
        with pytest.raises(FileNotFoundError):
            parse_file("/nonexistent/file.pdf")

    def test_valid_txt_parses(self, tmp_path: Path) -> None:
        from tools.file_parser import parse_file
        valid = tmp_path / "resume.txt"
        valid.write_text("John Doe\nSoftware Engineer")
        text = parse_file(str(valid))
        assert "John Doe" in text


# ═══════════════════════════════════════════════════════════════════════
# 4. Service Layer Validation
# ═══════════════════════════════════════════════════════════════════════
class TestServiceValidation:
    """Test resume_service validation before analysis."""

    @pytest.mark.asyncio
    async def test_empty_content_raises_resume_not_found(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        with pytest.raises(ResumeNotFoundError):
            await analyze_uploaded_resume(b"", "resume.pdf", "Some JD text here")

    @pytest.mark.asyncio
    async def test_empty_filename_raises_resume_not_found(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        with pytest.raises(ResumeNotFoundError):
            await analyze_uploaded_resume(b"content", "", "Some JD text here")

    @pytest.mark.asyncio
    async def test_empty_jd_raises_job_description_not_found(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        with pytest.raises(JobDescriptionNotFoundError):
            await analyze_uploaded_resume(b"content", "resume.pdf", "")

    @pytest.mark.asyncio
    async def test_whitespace_only_jd_raises(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        with pytest.raises(JobDescriptionNotFoundError):
            await analyze_uploaded_resume(b"content", "resume.pdf", "   ")

    @pytest.mark.asyncio
    async def test_short_jd_raises(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        with pytest.raises(ShortInputError):
            await analyze_uploaded_resume(b"content", "resume.pdf", "short")

    @pytest.mark.asyncio
    async def test_unsupported_file_type_raises(self) -> None:
        from services.resume_service import analyze_uploaded_resume
        with pytest.raises(UnsupportedFileTypeError):
            await analyze_uploaded_resume(b"content", "resume.exe", "Valid JD text here")

    @pytest.mark.asyncio
    async def test_file_too_large_raises(self) -> None:
        from services.resume_service import analyze_uploaded_resume, MAX_FILE_SIZE_BYTES
        large_content = b"x" * (MAX_FILE_SIZE_BYTES + 1)
        with pytest.raises(FileTooLargeError):
            await analyze_uploaded_resume(large_content, "resume.pdf", "Valid JD text here")

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
            result = await analyze_uploaded_resume(
                file_content=sample_txt_path.read_bytes(),
                file_name="resume.txt",
                job_description="Looking for a developer with 5+ years experience.",
            )
            assert result.ats_score == 85

    @pytest.mark.asyncio
    async def test_agent_error_classified_in_service(self, sample_txt_path: Path) -> None:
        """Service layer should classify unknown exceptions."""
        from services.resume_service import analyze_uploaded_resume
        with patch(
            "services.resume_service.analyze_resume",
            new_callable=AsyncMock,
            side_effect=RuntimeError("connection timeout after 30s"),
        ):
            with pytest.raises(AppError):
                await analyze_uploaded_resume(
                    file_content=sample_txt_path.read_bytes(),
                    file_name="resume.txt",
                    job_description="Valid job description for analysis.",
                )


# ═══════════════════════════════════════════════════════════════════════
# 5. Agent Error Handling
# ═══════════════════════════════════════════════════════════════════════
class TestAgentErrors:
    """Test agent error classification and JSON parsing."""

    def test_empty_response_raises(self) -> None:
        from agent.resume_analyzer import _parse_json_from_text
        with pytest.raises(InvalidResponseError):
            _parse_json_from_text("")

    def test_whitespace_response_raises(self) -> None:
        from agent.resume_analyzer import _parse_json_from_text
        with pytest.raises(InvalidResponseError):
            _parse_json_from_text("   ")

    def test_invalid_json_raises(self) -> None:
        from agent.resume_analyzer import _parse_json_from_text
        with pytest.raises(InvalidJSONError):
            _parse_json_from_text("This is just plain text, no JSON here.")

    def test_model_refusal_detected(self) -> None:
        from agent.resume_analyzer import _check_model_refusal
        with pytest.raises(ModelRefusalError):
            _check_model_refusal("I cannot assist with analyzing resumes.")

    def test_valid_json_parses(self) -> None:
        from agent.resume_analyzer import _parse_json_from_text
        import json
        data = {
            "resume_review": "Good.",
            "strengths": ["Python"],
            "weaknesses": ["No cloud"],
            "formatting_issues": [],
            "ats_risks": [],
            "ats_score": 75,
            "ats_score_explanation": "Decent match.",
            "missing_skills": ["AWS"],
            "suggestions": ["Add AWS experience"],
        }
        result = _parse_json_from_text(json.dumps(data))
        assert result.ats_score == 75

    def test_json_in_markdown_fences_parses(self) -> None:
        from agent.resume_analyzer import _parse_json_from_text
        import json
        data = {
            "resume_review": "Good.",
            "strengths": ["Python"],
            "weaknesses": [],
            "formatting_issues": [],
            "ats_risks": [],
            "ats_score": 80,
            "ats_score_explanation": "Good.",
            "missing_skills": [],
            "suggestions": ["Improve summary"],
        }
        fenced = f"```json\n{json.dumps(data)}\n```"
        result = _parse_json_from_text(fenced)
        assert result.ats_score == 80


# ═══════════════════════════════════════════════════════════════════════
# 6. Edge Cases
# ═══════════════════════════════════════════════════════════════════════
class TestEdgeCases:
    """Test boundary conditions and unusual inputs."""

    @pytest.mark.asyncio
    async     def test_file_with_only_spaces_raises_empty(self, tmp_path: Path) -> None:
        from tools.file_parser import parse_file
        ws = tmp_path / "spaces_only.txt"
        ws.write_text("   \n\n   \t  ")
        with pytest.raises(EmptyResumeError):
            parse_file(str(ws))

    @pytest.mark.asyncio
    async def test_very_long_jd_accepted(self, sample_txt_path: Path) -> None:
        from services.resume_service import analyze_uploaded_resume
        long_jd = "Requirements: Python developer " * 500
        mock_result = AnalysisResult(
            resume_review="Analyzed.",
            strengths=[],
            weaknesses=[],
            formatting_issues=[],
            ats_risks=[],
            ats_score=50,
            ats_score_explanation="Partial match.",
            missing_skills=[],
            suggestions=["Improve"],
        )
        with patch(
            "services.resume_service.analyze_resume",
            new_callable=AsyncMock,
            return_value=mock_result,
        ):
            result = await analyze_uploaded_resume(
                file_content=sample_txt_path.read_bytes(),
                file_name="resume.txt",
                job_description=long_jd,
            )
            assert result.ats_score == 50

    def test_score_boundary_zero(self) -> None:
        data = {
            "resume_review": "Poor.",
            "strengths": [],
            "weaknesses": ["Everything"],
            "formatting_issues": ["Bad"],
            "ats_risks": ["Critical"],
            "ats_score": 0,
            "ats_score_explanation": "Needs full rewrite.",
            "missing_skills": ["Python"],
            "suggestions": ["Rewrite"],
        }
        result = AnalysisResult(**data)
        assert result.ats_score == 0

    def test_score_boundary_hundred(self) -> None:
        data = {
            "resume_review": "Perfect.",
            "strengths": ["Everything"],
            "weaknesses": [],
            "formatting_issues": [],
            "ats_risks": [],
            "ats_score": 100,
            "ats_score_explanation": "Perfect match.",
            "missing_skills": [],
            "suggestions": [],
        }
        result = AnalysisResult(**data)
        assert result.ats_score == 100

    def test_score_out_of_range_rejected(self) -> None:
        from pydantic import ValidationError as PydanticValidationError
        data = {
            "resume_review": "Good.",
            "strengths": [],
            "weaknesses": [],
            "formatting_issues": [],
            "ats_risks": [],
            "ats_score": 101,
            "ats_score_explanation": "Good.",
            "missing_skills": [],
            "suggestions": [],
        }
        with pytest.raises(PydanticValidationError):
            AnalysisResult(**data)


# ═══════════════════════════════════════════════════════════════════════
# 7. Logging
# ═══════════════════════════════════════════════════════════════════════
class TestLogging:
    """Test that error logging captures all required context."""

    def test_log_error_captures_context(self, caplog) -> None:
        logger = get_logger("test_logger")
        exc = ValueError("something broke")
        with caplog.at_level("ERROR", logger="test_logger"):
            log_error(logger, exc, provider="groq", context="resume_upload")
        assert any("test_logger" in record.name for record in caplog.records)
        assert any("groq" in record.message for record in caplog.records)
        assert any("resume_upload" in record.message for record in caplog.records)

    def test_log_error_without_provider(self, caplog) -> None:
        logger = get_logger("test_no_provider")
        exc = RuntimeError("generic failure")
        with caplog.at_level("ERROR", logger="test_no_provider"):
            log_error(logger, exc, context="agent")
        assert any("agent" in record.message for record in caplog.records)


# ═══════════════════════════════════════════════════════════════════════
# 8. Provider Validation
# ═══════════════════════════════════════════════════════════════════════
class TestProviderValidation:
    """Test provider configuration validation."""

    def test_unsupported_provider_raises(self) -> None:
        from providers.factory import get_provider
        with patch("providers.factory.settings") as mock_settings:
            mock_settings.PROVIDER = "anthropic"
            with pytest.raises(ValueError):
                get_provider()

    def test_missing_api_key_raises(self) -> None:
        from services.resume_service import _validate_provider
        with patch("services.resume_service.settings") as mock_settings:
            mock_settings.PROVIDER = "openai"
            mock_settings.OPENAI_API_KEY = ""
            mock_settings.GROQ_API_KEY = "key"
            mock_settings.GEMINI_API_KEY = "key"
            with pytest.raises(MissingAPIKeyError):
                _validate_provider()

    def test_valid_provider_passes(self) -> None:
        from services.resume_service import _validate_provider
        with patch("services.resume_service.settings") as mock_settings:
            mock_settings.PROVIDER = "openai"
            mock_settings.OPENAI_API_KEY = "test-key"
            mock_settings.GROQ_API_KEY = ""
            mock_settings.GEMINI_API_KEY = ""
            _validate_provider()  # Should not raise


# ═══════════════════════════════════════════════════════════════════════
# 9. Retry Support
# ═══════════════════════════════════════════════════════════════════════
class TestRetrySupport:
    """Verify that failed analyses can be retried."""

    @pytest.mark.asyncio
    async def test_retry_after_failure_succeeds(self, sample_txt_path: Path) -> None:
        from services.resume_service import analyze_uploaded_resume
        mock_result = AnalysisResult(
            resume_review="Good on retry.",
            strengths=["Persistence"],
            weaknesses=[],
            formatting_issues=[],
            ats_risks=[],
            ats_score=70,
            ats_score_explanation="Better on retry.",
            missing_skills=[],
            suggestions=["Keep going"],
        )
        call_count = 0

        async def flaky_analyze(*args, **kwargs):
            nonlocal call_count
            call_count += 1
            if call_count == 1:
                raise RuntimeError("connection timeout")
            return mock_result

        with patch(
            "services.resume_service.analyze_resume",
            side_effect=flaky_analyze,
        ):
            # First call fails
            with pytest.raises(AppError):
                await analyze_uploaded_resume(
                    file_content=sample_txt_path.read_bytes(),
                    file_name="resume.txt",
                    job_description="Valid job description for testing retry.",
                )

            # Retry succeeds
            result = await analyze_uploaded_resume(
                file_content=sample_txt_path.read_bytes(),
                file_name="resume.txt",
                job_description="Valid job description for testing retry.",
            )
            assert result.ats_score == 70
            assert call_count == 2


# ═══════════════════════════════════════════════════════════════════════
# 10. User Feedback Messages
# ═══════════════════════════════════════════════════════════════════════
class TestUserFeedbackMessages:
    """Verify every error type has a non-empty user_message."""

    def test_all_errors_have_user_messages(self) -> None:
        errors = [
            ResumeNotFoundError(),
            JobDescriptionNotFoundError(),
            EmptyResumeError(),
            ShortInputError(),
            UnsupportedFileTypeError(),
            FileTooLargeError(),
            CorruptedFileError(),
            MissingAPIKeyError(),
            ProviderTimeoutError(),
            RateLimitError(),
            NetworkError(),
            ProviderUnavailableError(),
            UnsupportedProviderError(),
            InvalidResponseError(),
            ModelRefusalError(),
            InvalidJSONError(),
            AgentError(),
            AnalysisError(),
        ]
        for err in errors:
            assert err.user_message, f"{type(err).__name__} missing user_message"
            assert len(err.user_message) > 10, f"{type(err).__name__} user_message too short"

    def test_all_errors_have_error_codes(self) -> None:
        errors = [
            ResumeNotFoundError(),
            JobDescriptionNotFoundError(),
            EmptyResumeError(),
            ShortInputError(),
            UnsupportedFileTypeError(),
            FileTooLargeError(),
            CorruptedFileError(),
            MissingAPIKeyError(),
            ProviderTimeoutError(),
            RateLimitError(),
            NetworkError(),
            ProviderUnavailableError(),
            UnsupportedProviderError(),
            InvalidResponseError(),
            ModelRefusalError(),
            InvalidJSONError(),
            AgentError(),
            AnalysisError(),
        ]
        for err in errors:
            assert err.error_code, f"{type(err).__name__} missing error_code"
            assert err.error_code != "UNKNOWN", f"{type(err).__name__} has default error_code"


# ═══════════════════════════════════════════════════════════════════════
# 11. Duplicate Upload / Same File
# ═══════════════════════════════════════════════════════════════════════
class TestDuplicateUpload:
    """Verify same file uploaded twice works fine."""

    @pytest.mark.asyncio
    async def test_same_file_twice(self, sample_txt_path: Path) -> None:
        from services.resume_service import analyze_uploaded_resume
        mock_result = AnalysisResult(
            resume_review="Same result.",
            strengths=[],
            weaknesses=[],
            formatting_issues=[],
            ats_risks=[],
            ats_score=60,
            ats_score_explanation="OK.",
            missing_skills=[],
            suggestions=[],
        )
        content = sample_txt_path.read_bytes()

        with patch(
            "services.resume_service.analyze_resume",
            new_callable=AsyncMock,
            return_value=mock_result,
        ):
            r1 = await analyze_uploaded_resume(content, "resume.txt", "Valid JD for testing upload.")
            r2 = await analyze_uploaded_resume(content, "resume.txt", "Valid JD for testing upload.")
            assert r1.ats_score == r2.ats_score
