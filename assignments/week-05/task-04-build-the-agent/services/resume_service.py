"""Business logic layer between the Streamlit UI and the analysis agent.

Handles file I/O (temp files for uploads), input validation, and error
translation. Contains no AI logic — that lives in the agent layer.
"""

from __future__ import annotations

import tempfile
from pathlib import Path

from agent.resume_analyzer import analyze_resume
from models.schemas import AnalysisResult
from tools.file_parser import SUPPORTED_EXTENSIONS
from utils.logger import get_logger

logger = get_logger(__name__)


async def analyze_uploaded_resume(
    file_content: bytes,
    file_name: str,
    job_description: str,
) -> AnalysisResult:
    """Process an uploaded resume file and run the full analysis pipeline.

    Saves the uploaded bytes to a temp file, invokes the agent, then
    cleans up. The caller never touches disk or the LLM directly.

    Args:
        file_content: Raw bytes of the uploaded file.
        file_name: Original filename (used to determine format).
        job_description: The target job description text.

    Returns:
        AnalysisResult with all fields populated.

    Raises:
        ValueError: If inputs are invalid or file type is unsupported.
        RuntimeError: If analysis fails.
    """
    if not file_content:
        raise ValueError("Uploaded file is empty.")
    if not file_name or not file_name.strip():
        raise ValueError("File name cannot be empty.")
    if not job_description or not job_description.strip():
        raise ValueError("Job description cannot be empty.")

    suffix = Path(file_name).suffix.lower()
    if suffix not in SUPPORTED_EXTENSIONS:
        supported = ", ".join(sorted(SUPPORTED_EXTENSIONS))
        raise ValueError(
            f"Unsupported file type: '{suffix}'. "
            f"Please upload one of: {supported}"
        )

    tmp_path: Path | None = None
    try:
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        tmp.write(file_content)
        tmp.close()
        tmp_path = Path(tmp.name)

        logger.info("Uploaded file saved to temp: %s (%d bytes)", tmp_path, len(file_content))

        result = await analyze_resume(str(tmp_path), job_description)
        logger.info("Analysis completed successfully for: %s", file_name)
        return result

    except (ValueError, RuntimeError):
        raise
    except Exception as e:
        logger.error("Unexpected error during analysis of %s: %s", file_name, e)
        raise RuntimeError(f"Analysis failed: {e}") from e
    finally:
        if tmp_path and tmp_path.exists():
            tmp_path.unlink(missing_ok=True)
            logger.debug("Temp file cleaned up: %s", tmp_path)
