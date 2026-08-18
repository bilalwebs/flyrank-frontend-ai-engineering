"""Factory that returns the correct ModelProvider based on configuration.

OpenAI uses the SDK's ModelProvider pattern (native Responses API).
Groq and Gemini use the SDK's global client pattern (Chat Completions API)
to avoid sending unsupported parameters like 'verbosity'.
"""

from __future__ import annotations

from openai import AsyncOpenAI

from agents import (
    ModelProvider,
    set_default_openai_api,
    set_default_openai_client,
    set_tracing_disabled,
)

from config.settings import settings
from providers.groq_provider import GROQ_BASE_URL
from providers.gemini_provider import GEMINI_BASE_URL
from providers.openai_provider import OpenAIProvider


def get_provider() -> tuple[ModelProvider | None, str]:
    """Create the correct provider and resolve the model name.

    Returns:
        A tuple of (ModelProvider | None, model_name).
        - For OpenAI: (OpenAIProvider, model_name)
        - For Groq/Gemini: (None, model_name) — uses default client set globally.
    """
    provider_name = settings.PROVIDER.lower().strip()

    if provider_name == "openai":
        return OpenAIProvider(
            api_key=settings.OPENAI_API_KEY,
            model=settings.OPENAI_MODEL,
        ), settings.OPENAI_MODEL

    # Groq and Gemini: use global client with Chat Completions API.
    # This avoids sending unsupported parameters (e.g. 'verbosity').
    if provider_name == "groq":
        client = AsyncOpenAI(base_url=GROQ_BASE_URL, api_key=settings.GROQ_API_KEY)
        model_name = settings.GROQ_MODEL
    elif provider_name == "gemini":
        client = AsyncOpenAI(base_url=GEMINI_BASE_URL, api_key=settings.GEMINI_API_KEY)
        model_name = settings.GEMINI_MODEL
    else:
        supported = ", ".join(["openai", "groq", "gemini"])
        raise ValueError(
            f"Unsupported provider: '{provider_name}'. "
            f"Supported providers: {supported}"
        )

    set_default_openai_client(client=client, use_for_tracing=False)
    set_default_openai_api("chat_completions")
    set_tracing_disabled(disabled=True)

    return None, model_name
