"""Resume file parsing tools.

Provides real file parsing for PDF, DOCX, and TXT formats.
The parse_resume function is exposed as an @tool for the OpenAI Agents SDK,
making it a genuine tool the agent invokes during its reasoning loop.
"""

from __future__ import annotations

from pathlib import Path

from agents.decorators import tool

from utils.errors import (
    CorruptedFileError,
    EmptyResumeError,
    FileError,
    UnsupportedFileTypeError,
)
from utils.logger import get_logger

logger = get_logger(__name__)

SUPPORTED_EXTENSIONS = frozenset({".pdf", ".docx", ".txt"})


def _parse_pdf(file_path: str) -> str:
    """Extract text from a PDF file using pypdf.

    Args:
        file_path: Absolute path to the PDF file.

    Returns:
        Extracted text from all pages.

    Raises:
        CorruptedFileError: If the PDF is malformed or unreadable.
    """
    try:
        from pypdf import PdfReader
    except ImportError:
        raise CorruptedFileError("PDF library not installed.", provider="parser")

    try:
        reader = PdfReader(file_path)
    except Exception as exc:
        raise CorruptedFileError(
            f"Cannot read PDF: {exc}", provider="parser"
        ) from exc

    text_parts: list[str] = []
    for page in reader.pages:
        try:
            text = page.extract_text()
        except Exception:
            logger.warning("Failed to extract text from a PDF page, skipping.")
            continue
        if text:
            text_parts.append(text.strip())

    return "\n\n".join(text_parts)


def _parse_docx(file_path: str) -> str:
    """Extract text from a DOCX file using python-docx.

    Args:
        file_path: Absolute path to the DOCX file.

    Returns:
        Concatenated paragraph text.

    Raises:
        CorruptedFileError: If the DOCX is malformed or unreadable.
    """
    try:
        from docx import Document
    except ImportError:
        raise CorruptedFileError("DOCX library not installed.", provider="parser")

    try:
        doc = Document(file_path)
    except Exception as exc:
        raise CorruptedFileError(
            f"Cannot read DOCX: {exc}", provider="parser"
        ) from exc

    paragraphs = [para.text for para in doc.paragraphs if para.text.strip()]
    return "\n".join(paragraphs)


def _parse_txt(file_path: str) -> str:
    """Read plain text from a TXT file.

    Args:
        file_path: Absolute path to the TXT file.

    Returns:
        File contents as string.

    Raises:
        CorruptedFileError: If the file cannot be read.
    """
    try:
        return Path(file_path).read_text(encoding="utf-8")
    except UnicodeDecodeError:
        # Try latin-1 as fallback
        try:
            return Path(file_path).read_text(encoding="latin-1")
        except Exception as exc:
            raise CorruptedFileError(
                f"Cannot decode text file: {exc}", provider="parser"
            ) from exc
    except Exception as exc:
        raise CorruptedFileError(
            f"Cannot read text file: {exc}", provider="parser"
        ) from exc


_PARSERS: dict[str, callable] = {
    ".pdf": _parse_pdf,
    ".docx": _parse_docx,
    ".txt": _parse_txt,
}


def parse_file(file_path: str) -> str:
    """Parse a resume file and return its text content.

    Supports PDF (via pypdf), DOCX (via python-docx), and TXT formats.

    Args:
        file_path: Absolute path to the resume file.

    Returns:
        Extracted text content.

    Raises:
        FileNotFoundError: If the file does not exist.
        UnsupportedFileTypeError: If the file type is not supported.
        EmptyResumeError: If no text could be extracted.
        CorruptedFileError: If the file is corrupted or unreadable.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    if path.stat().st_size == 0:
        raise EmptyResumeError(
            f"File is empty: {file_path}", provider="parser"
        )

    extension = path.suffix.lower()

    if extension not in SUPPORTED_EXTENSIONS:
        supported = ", ".join(sorted(SUPPORTED_EXTENSIONS))
        raise UnsupportedFileTypeError(
            f"Unsupported file type: '{extension}'. Supported formats: {supported}",
            provider="parser",
        )

    parser = _PARSERS[extension]
    text = parser(file_path)

    if not text or not text.strip():
        raise EmptyResumeError(
            f"No text content could be extracted from: {file_path}",
            provider="parser",
        )

    return text


@tool
def parse_resume(file_path: str) -> str:
    """Parse a resume file and extract its text content.

    This is a real tool that reads files from disk. It supports PDF, DOCX,
    and TXT formats. The agent should call this tool first to read the
    uploaded resume before performing analysis.

    Args:
        file_path: The absolute path to the resume file to parse.

    Returns:
        The full extracted text content of the resume.

    Raises:
        FileError: If the file cannot be parsed.
        EmptyResumeError: If the file has no readable text.
    """
    return parse_file(file_path)
