"""Tests for the provider factory."""

from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import patch

import pytest

_project_root = Path(__file__).resolve().parent.parent
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))

from providers.factory import get_provider
from providers.openai_provider import OpenAIProvider


class TestProviderFactory:
    """Tests for the provider factory function."""

    def test_openai_returns_provider_and_model(self) -> None:
        with patch("providers.factory.settings") as mock_settings:
            mock_settings.PROVIDER = "openai"
            mock_settings.OPENAI_API_KEY = "test-key"
            mock_settings.OPENAI_MODEL = "gpt-4o"
            provider, model_name = get_provider()
            assert isinstance(provider, OpenAIProvider)
            assert model_name == "gpt-4o"

    def test_groq_returns_none_provider_and_model(self) -> None:
        with patch("providers.factory.settings") as mock_settings:
            mock_settings.PROVIDER = "groq"
            mock_settings.GROQ_API_KEY = "test-key"
            mock_settings.GROQ_MODEL = "llama-3.3-70b-versatile"
            provider, model_name = get_provider()
            assert provider is None
            assert model_name == "llama-3.3-70b-versatile"

    def test_gemini_returns_none_provider_and_model(self) -> None:
        with patch("providers.factory.settings") as mock_settings:
            mock_settings.PROVIDER = "gemini"
            mock_settings.GEMINI_API_KEY = "test-key"
            mock_settings.GEMINI_MODEL = "gemini-2.0-flash"
            provider, model_name = get_provider()
            assert provider is None
            assert model_name == "gemini-2.0-flash"

    def test_unsupported_provider_raises(self) -> None:
        with patch("providers.factory.settings") as mock_settings:
            mock_settings.PROVIDER = "anthropic"
            with pytest.raises(ValueError, match="Unsupported provider"):
                get_provider()

    def test_provider_is_case_insensitive(self) -> None:
        with patch("providers.factory.settings") as mock_settings:
            mock_settings.PROVIDER = "OPENAI"
            mock_settings.OPENAI_API_KEY = "test-key"
            mock_settings.OPENAI_MODEL = "gpt-4o"
            provider, model_name = get_provider()
            assert isinstance(provider, OpenAIProvider)
            assert model_name == "gpt-4o"
