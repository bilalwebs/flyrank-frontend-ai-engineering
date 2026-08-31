export interface AIProvider {
  generate(prompt: string, systemPrompt?: string): Promise<string>;
  generateJSON<T>(prompt: string, systemPrompt?: string): Promise<T>;
}

export interface AIProviderOptions {
  apiKey: string;
  model: string;
}

export function createGroqProvider(options: AIProviderOptions): AIProvider {
  return {
    async generate(prompt: string, systemPrompt?: string): Promise<string> {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${options.apiKey}`,
        },
        body: JSON.stringify({
          model: options.model,
          messages: [
            ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
            { role: "user" as const, content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content ?? "";
    },

    async generateJSON<T>(prompt: string, systemPrompt?: string): Promise<T> {
      const jsonSystemPrompt = `${systemPrompt ?? ""}\n\nYou MUST respond with valid JSON only. No markdown, no explanation, just raw JSON.`;
      const result = await this.generate(prompt, jsonSystemPrompt);
      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned) as T;
    },
  };
}

export function createGeminiProvider(options: AIProviderOptions): AIProvider {
  return {
    async generate(prompt: string, systemPrompt?: string): Promise<string> {
      const contents = [];
      if (systemPrompt) {
        contents.push({ role: "user" as const, parts: [{ text: systemPrompt }] });
        contents.push({ role: "model" as const, parts: [{ text: "Understood. I will follow these instructions." }] });
      }
      contents.push({ role: "user" as const, parts: [{ text: prompt }] });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${options.model}:generateContent?key=${options.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    },

    async generateJSON<T>(prompt: string, systemPrompt?: string): Promise<T> {
      const jsonSystemPrompt = `${systemPrompt ?? ""}\n\nYou MUST respond with valid JSON only. No markdown, no explanation, just raw JSON.`;
      const result = await this.generate(prompt, jsonSystemPrompt);
      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned) as T;
    },
  };
}

export function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER as "groq" | "gemini") ?? "groq";

  if (provider === "gemini" && process.env.GEMINI_API_KEY) {
    return createGeminiProvider({
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
    });
  }

  if (process.env.GROQ_API_KEY) {
    return createGroqProvider({
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL ?? "groq/compound-mini",
    });
  }

  throw new Error("No AI provider configured. Set GROQ_API_KEY or GEMINI_API_KEY.");
}
