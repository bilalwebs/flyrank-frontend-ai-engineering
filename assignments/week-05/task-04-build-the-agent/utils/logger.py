"""Centralized logging configuration for the application.

Usage:
    from utils.logger import get_logger
    logger = get_logger(__name__)
"""

from __future__ import annotations

import logging
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
