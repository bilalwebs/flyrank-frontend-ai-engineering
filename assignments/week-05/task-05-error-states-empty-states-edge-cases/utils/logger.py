"""Centralized logging configuration for the application.

Provides standard logging plus a ``log_error`` helper that records
timestamp, provider, exception type, message, and full stack trace.

Usage:
    from utils.logger import get_logger, log_error
    logger = get_logger(__name__)
    log_error(logger, exc, provider="openai")
"""

from __future__ import annotations

import logging
import traceback
from pathlib import Path

from config.settings import settings


_LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
_LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"
_LOG_DIR = Path(__file__).resolve().parent.parent / "logs"
_LOG_FILE = _LOG_DIR / "app.log"


def _ensure_log_dir() -> None:
    """Create the logs directory if it does not exist."""
    _LOG_DIR.mkdir(parents=True, exist_ok=True)


def setup_logging() -> None:
    """Configure root logger with console and file handlers.

    Called once at application startup. Subsequent calls are no-ops
    if handlers are already configured.
    """
    root = logging.getLogger()

    if root.handlers:
        return

    root.setLevel(getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO))
    formatter = logging.Formatter(_LOG_FORMAT, datefmt=_LOG_DATE_FORMAT)

    console = logging.StreamHandler()
    console.setFormatter(formatter)
    root.addHandler(console)

    _ensure_log_dir()
    file_handler = logging.FileHandler(_LOG_FILE, encoding="utf-8")
    file_handler.setFormatter(formatter)
    root.addHandler(file_handler)


def get_logger(name: str) -> logging.Logger:
    """Return a named logger.

    Ensures logging is configured before returning the logger.

    Args:
        name: Logger name, typically __name__ of the calling module.

    Returns:
        A configured logging.Logger instance.
    """
    setup_logging()
    return logging.getLogger(name)


def log_error(
    logger: logging.Logger,
    exc: Exception,
    *,
    provider: str = "",
    context: str = "",
) -> None:
    """Log a full error record with timestamp, provider, type, message, and stack trace.

    This is the single entry-point for error logging throughout the
    application.  The information is written to the log file only — it
    is **never** exposed to the user.

    Args:
        logger: The logger instance to write through.
        exc: The exception that occurred.
        provider: Active LLM provider name (e.g. "openai").
        context: Optional extra context (e.g. "resume_upload", "analysis").
    """
    exc_type = type(exc).__name__
    exc_msg = str(exc)
    provider_info = f" | provider={provider}" if provider else ""
    context_info = f" | context={context}" if context else ""

    logger.error(
        "ERROR OCCURRED%s%s | type=%s | message=%s",
        provider_info,
        context_info,
        exc_type,
        exc_msg,
    )
    logger.debug(
        "Full stack trace for %s:\n%s",
        exc_type,
        traceback.format_exc(),
    )
