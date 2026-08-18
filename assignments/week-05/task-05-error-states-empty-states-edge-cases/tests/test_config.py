"""Tests for the configuration module."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

_project_root = Path(__file__).resolve().parent.parent
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))


class TestSettings:
    """Tests for the Settings pydantic model."""

    def test_settings_loads_with_defaults(self) -> None:
        from config.settings import Settings

        s = Settings(_env_file=None)
        assert s.APP_NAME == "AI Job Application Assistant"
        assert s.APP_VERSION == "1.0.0"
        assert s.PROVIDER in ("openai", "groq", "gemini")

    def test_provider_defaults_to_openai(self) -> None:
        from config.settings import Settings

        s = Settings(_env_file=None)
        assert s.PROVIDER == "openai"

    def test_model_names_are_strings(self) -> None:
        from config.settings import Settings

        s = Settings(_env_file=None)
        assert isinstance(s.OPENAI_MODEL, str)
        assert isinstance(s.GROQ_MODEL, str)
        assert isinstance(s.GEMINI_MODEL, str)

    def test_settings_is_singleton(self) -> None:
        from config.settings import settings

        from config.settings import settings as settings2
        assert settings is settings2
