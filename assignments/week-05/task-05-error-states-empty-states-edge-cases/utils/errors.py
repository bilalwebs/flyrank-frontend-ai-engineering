"""Custom error hierarchy for the AI Job Application Assistant.

Every error maps to a specific user-facing category so the UI can render
a friendly message without exposing internals. The logger captures the
full exception chain for debugging.
"""

from __future__ import annotations


# ── Base ────────────────────────────────────────────────────────────────
class AppError(Exception):
    """Base exception for all application errors."""

    user_message: str = "An unexpected error occurred. Please try again."
    error_code: str = "UNKNOWN"
    severity: str = "error"  # error | warning | info

    def __init__(self, message: str = "", *, provider: str = "") -> None:
        self.provider = provider
        self.internal_message = message
        super().__init__(self.user_message)


# ── Validation ──────────────────────────────────────────────────────────
class ValidationError(AppError):
    """Input validation failed before analysis."""

    user_message = "Please check your input and try again."
    error_code = "VALIDATION"


class ResumeNotFoundError(ValidationError):
    """No resume file was uploaded."""

    user_message = "Please upload a resume file before analyzing."
    error_code = "RESUME_MISSING"


class JobDescriptionNotFoundError(ValidationError):
    """No job description was provided."""

    user_message = "Please paste a job description before analyzing."
    error_code = "JD_MISSING"


class EmptyResumeError(ValidationError):
    """Resume file contains no usable text."""

    user_message = "The uploaded resume contains no readable text. Please upload a different file."
    error_code = "RESUME_EMPTY"


class ShortInputError(ValidationError):
    """Input is too short to be meaningful."""

    user_message = "The provided text is too short to analyze meaningfully."
    error_code = "INPUT_SHORT"


# ── File errors ─────────────────────────────────────────────────────────
class FileError(AppError):
    """File handling error."""

    user_message = "There was a problem with the uploaded file."
    error_code = "FILE"


class UnsupportedFileTypeError(FileError):
    """File extension is not supported."""

    user_message = "Unsupported file type. Please upload a PDF, DOCX, or TXT file."
    error_code = "FILE_UNSUPPORTED"


class FileTooLargeError(FileError):
    """File exceeds the size limit."""

    user_message = "The file is too large. Please upload a file smaller than 5 MB."
    error_code = "FILE_TOO_LARGE"


class CorruptedFileError(FileError):
    """File is corrupted or unreadable."""

    user_message = "The file appears to be corrupted and cannot be read. Please upload a different file."
    error_code = "FILE_CORRUPTED"


# ── Provider / API errors ──────────────────────────────────────────────
class ProviderError(AppError):
    """LLM provider returned an error."""

    user_message = "The AI provider encountered an error. Please try again."
    error_code = "PROVIDER"


class MissingAPIKeyError(ProviderError):
    """API key is not configured for the selected provider."""

    user_message = "API key not configured. Please set your API key in the .env file."
    error_code = "API_KEY_MISSING"
    severity = "warning"


class ProviderTimeoutError(ProviderError):
    """Provider did not respond within the timeout window."""

    user_message = "The AI provider took too long to respond. Please try again."
    error_code = "PROVIDER_TIMEOUT"


class RateLimitError(ProviderError):
    """Provider rate limit was exceeded."""

    user_message = "Rate limit exceeded. Please wait a moment and try again."
    error_code = "RATE_LIMIT"
    severity = "warning"


class NetworkError(ProviderError):
    """Network connectivity issue."""

    user_message = "Could not connect to the AI provider. Please check your internet connection."
    error_code = "NETWORK"


class ProviderUnavailableError(ProviderError):
    """Provider service is currently unavailable."""

    user_message = "The AI provider is currently unavailable. Please try a different provider."
    error_code = "PROVIDER_UNAVAILABLE"


class UnsupportedProviderError(ProviderError):
    """Provider is not supported by the application."""

    user_message = "The selected provider is not supported. Please choose OpenAI, Groq, or Gemini."
    error_code = "PROVIDER_UNSUPPORTED"


class InvalidResponseError(ProviderError):
    """Provider returned an invalid or empty response."""

    user_message = "The AI provider returned an invalid response. Please try again."
    error_code = "INVALID_RESPONSE"


class ModelRefusalError(ProviderError):
    """Model refused to process the request."""

    user_message = "The AI model declined to analyze the content. Please try rephrasing your inputs."
    error_code = "MODEL_REFUSAL"


class InvalidJSONError(ProviderError):
    """Provider response was not valid JSON."""

    user_message = "The AI response could not be parsed. Please try again."
    error_code = "INVALID_JSON"


# ── Agent errors ────────────────────────────────────────────────────────
class AgentError(AppError):
    """Agent orchestration error."""

    user_message = "Analysis failed due to an internal error. Please try again."
    error_code = "AGENT"


class ParsingError(AgentError):
    """Resume parsing failed."""

    user_message = "Failed to parse the resume file. Please upload a different file."
    error_code = "PARSING"


class AnalysisError(AgentError):
    """Analysis pipeline failed."""

    user_message = "Resume analysis failed. Please try again or switch providers."
    error_code = "ANALYSIS"


# ── Mapping helpers ─────────────────────────────────────────────────────
_ERROR_MAP: dict[str, type[AppError]] = {
    "timeout": ProviderTimeoutError,
    "rate_limit": RateLimitError,
    "rate limit": RateLimitError,
    "429": RateLimitError,
    "401": MissingAPIKeyError,
    "403": MissingAPIKeyError,
    "connection": NetworkError,
    "connect": NetworkError,
    "refused": ModelRefusalError,
    "refusal": ModelRefusalError,
    "empty response": InvalidResponseError,
    "empty": InvalidResponseError,
    "json": InvalidJSONError,
    "json decode": InvalidJSONError,
    "unavailable": ProviderUnavailableError,
    "permission": FileError,
}


def classify_error(exc: Exception, *, provider: str = "") -> AppError:
    """Wrap any exception into the appropriate AppError subclass.

    Inspects the exception message for known keywords and maps to the
    best-matching error type. Falls back to AgentError for unknowns.
    """
    msg = str(exc).lower()
    exc_type = type(exc).__name__

    # Already an AppError — just set provider if missing
    if isinstance(exc, AppError):
        if not exc.provider:
            exc.provider = provider
        return exc

    # Keyword-based classification
    for keyword, error_cls in _ERROR_MAP.items():
        if keyword in msg:
            return error_cls(message=str(exc), provider=provider)

    # Fallback based on exception type name
    if "timeout" in exc_type.lower():
        return ProviderTimeoutError(message=str(exc), provider=provider)
    if "permission" in exc_type.lower():
        return FileError(message=str(exc), provider=provider)
    if "filenotfound" in exc_type.lower():
        return FileError(message=str(exc), provider=provider)

    return AgentError(message=str(exc), provider=provider)
