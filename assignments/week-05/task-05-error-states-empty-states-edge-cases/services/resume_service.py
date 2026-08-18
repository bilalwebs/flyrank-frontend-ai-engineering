"""Business logic layer between the Streamlit UI and the analysis agent.

Handles file I/O (temp files for uploads), input validation, and error
translation. Contains no AI logic — that lives in the agent layer.
"""

from __future__ import annotations

import tempfile
from pathlib import Path

from agent.resume_analyzer import analyze_resume
from config.settings import settings
from models.schemas import AnalysisResult
from tools.file_parser import SUPPORTED_EXTENSIONS
from utils.errors import (
    AppError,
    EmptyResumeError,
    FileTooLargeError,
    JobDescriptionNotFoundError,
    MissingAPIKeyError,
    ResumeNotFoundError,
    ShortInputError,
    UnsupportedFileTypeError,
    UnsupportedProviderError,
    classify_error,
)
from utils.logger import get_logger, log_error

logger = get_logger(__name__)

MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB
MIN_JD_LENGTH = 20


def _validate_inputs(
    file_content: bytes,
    file_name: str,
    job_description: str,
) -> None:
    """Run all pre-analysis validation checks. Raises AppError on failure."""
    if not file_content:
        raise ResumeNotFoundError("No file content provided.")
    if not file_name or not file_name.strip():
        raise ResumeNotFoundError("File name is empty.")
    if len(file_content) > MAX_FILE_SIZE_BYTES:
        raise FileTooLargeError(
            f"File size {len(file_content)} bytes exceeds limit."
        )

    suffix = Path(file_name).suffix.lower()
    if suffix not in SUPPORTED_EXTENSIONS:
        supported = ", ".join(sorted(SUPPORTED_EXTENSIONS))
        raise UnsupportedFileTypeError(
            f"Unsupported file type: '{suffix}'. Supported: {supported}"
        )

    if not job_description or not job_description.strip():
        raise JobDescriptionNotFoundError("No job description provided.")

    stripped_jd = job_description.strip()
    if len(stripped_jd) < MIN_JD_LENGTH:
        raise ShortInputError(
            f"Job description too short ({len(stripped_jd)} chars). "
            f"Minimum: {MIN_JD_LENGTH} chars."
        )


def _validate_provider() -> None:
    """Check that the configured provider has an API key."""
    provider = settings.PROVIDER.lower().strip()
    key_map = {
        "openai": settings.OPENAI_API_KEY,
        "groq": settings.GROQ_API_KEY,
        "gemini": settings.GEMINI_API_KEY,
    }
    if provider not in key_map:
        raise UnsupportedProviderError(
            f"Provider '{provider}' is not supported.", provider=provider
        )
    if not key_map[provider]:
        raise MissingAPIKeyError(
            f"No API key configured for {provider}.", provider=provider
        )


async def analyze_uploaded_resume(
    file_content: bytes,
    file_name: str,
    job_description: str,
) -> AnalysisResult:
    """Process an uploaded resume file and run the full analysis pipeline.

    Validates inputs, checks provider configuration, saves the uploaded
    bytes to a temp file, invokes the agent, then cleans up.

    Args:
        file_content: Raw bytes of the uploaded file.
        file_name: Original filename (used to determine format).
        job_description: The target job description text.

    Returns:
        AnalysisResult with all fields populated.

    Raises:
        AppError: On any validation, file, or provider error.
    """
    _validate_inputs(file_content, file_name, job_description)
    _validate_provider()

    tmp_path: Path | None = None
    try:
        tmp = tempfile.NamedTemporaryFile(
            delete=False, suffix=Path(file_name).suffix.lower()
        )
        tmp.write(file_content)
        tmp.close()
        tmp_path = Path(tmp.name)

        logger.info(
            "Uploaded file saved to temp: %s (%d bytes)", tmp_path, len(file_content)
        )

        result = await analyze_resume(str(tmp_path), job_description)
        logger.info("Analysis completed successfully for: %s", file_name)
        return result

    except AppError:
        raise
    except Exception as exc:
        log_error(logger, exc, provider=settings.PROVIDER, context="resume_service")
        raise classify_error(exc, provider=settings.PROVIDER) from exc
    finally:
        if tmp_path and tmp_path.exists():
            tmp_path.unlink(missing_ok=True)
            logger.debug("Temp file cleaned up: %s", tmp_path)
