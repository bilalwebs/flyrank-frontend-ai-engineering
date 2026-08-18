"""OpenAI provider using the native Responses API."""

from __future__ import annotations

from agents import Model, ModelProvider, OpenAIResponsesModel


class OpenAIProvider(ModelProvider):
    """Provides OpenAI models via the Responses API.

    Each provider implements the SDK's ModelProvider interface so the agent
    never knows which backend is being used.
    """

    def __init__(self, api_key: str, model: str) -> None:
        self._api_key = api_key
        self._model = model

    def get_model(self, model_name: str | None = None) -> Model:
        """Return an OpenAI Responses model.

        Args:
            model_name: Optional override. If None, uses the configured model.
        """
        return OpenAIResponsesModel(
            model=model_name or self._model,
        )
