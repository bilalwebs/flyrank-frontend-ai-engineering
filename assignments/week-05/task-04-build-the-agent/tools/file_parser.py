"""Resume file parsing tools.

Provides real file parsing for PDF, DOCX, and TXT formats.
The parse_resume function is exposed as an @tool for the OpenAI Agents SDK,
making it a genuine tool the agent invokes during its reasoning loop.
"""

from __future__ import annotations

from pathlib import Path

from agents.decorators import tool


SUPPORTED_EXTENSIONS = frozenset({".pdf", ".docx", ".txt"})


def _parse_pdf(file_path: str) -> str:
    """Extract text from a PDF file using pypdf.

    Args:
        file_path: Absolute path to the PDF file.

    Returns:
        Extracted text from all pages.
    """
    from pypdf import PdfReader

    reader = PdfReader(file_path)
    text_parts: list[str] = []

    for page in reader.pages:
        text = page.extract_text()
        if text:
            text_parts.append(text.strip())

    return "\n\n".join(text_parts)


def _parse_docx(file_path: str) -> str:
    """Extract text from a DOCX file using python-docx.

    Args:
        file_path: Absolute path to the DOCX file.

    Returns:
        Concatenated paragraph text.
    """
    from docx import Document

    doc = Document(file_path)
    paragraphs = [para.text for para in doc.paragraphs if para.text.strip()]
    return "\n".join(paragraphs)


def _parse_txt(file_path: str) -> str:
    """Read plain text from a TXT file.

    Args:
        file_path: Absolute path to the TXT file.

    Returns:
        File contents as string.
    """
    return Path(file_path).read_text(encoding="utf-8")


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
        ValueError: If the file type is not supported.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    extension = path.suffix.lower()

    if extension not in SUPPORTED_EXTENSIONS:
        supported = ", ".join(sorted(SUPPORTED_EXTENSIONS))
        raise ValueError(
            f"Unsupported file type: '{extension}'. Supported formats: {supported}"
        )

    parser = _PARSERS[extension]
    text = parser(file_path)

    if not text.strip():
        raise ValueError(f"No text content could be extracted from: {file_path}")

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
    """
    return parse_file(file_path)
