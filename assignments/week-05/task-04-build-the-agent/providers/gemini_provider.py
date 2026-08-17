"""Gemini provider using Google's OpenAI-compatible Chat Completions API."""

from __future__ import annotations

from openai import AsyncOpenAI

from agents import Model, ModelProvider, OpenAIChatCompletionsModel

GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai"


class GeminiProvider(ModelProvider):
    """Provides Gemini models via the Chat Completions API.

    Google exposes an OpenAI-compatible endpoint, so we use AsyncOpenAI
    with a custom base_url and the Chat Completions model class.
    """

    def __init__(self, api_key: str, model: str) -> None:
        self._model = model
        self._client = AsyncOpenAI(base_url=GEMINI_BASE_URL, api_key=api_key)

    def get_model(self, model_name: str | None = None) -> Model:
        """Return a Chat Completions model backed by Gemini.

        Args:
            model_name: Optional override. If None, uses the configured model.
        """
        return OpenAIChatCompletionsModel(
            model=model_name or self._model,
            openai_client=self._client,
        )
