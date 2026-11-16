import os

from groq import Groq


class GroqClient:
    def __init__(
        self,
        model: str = "openai/gpt-oss-20b",
        api_key: str | None = None,
        timeout: int = 300,
    ):
        self.model = model
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        self.timeout = timeout

        # Deterministic settings so the same question gives consistent
        # situation analysis -> same retrieval query -> same evidence.
        # (Groq treats seed as best-effort reproducibility.)
        self.temperature = 0
        self.seed = 42

        if not self.api_key:
            raise RuntimeError("GROQ_API_KEY is not set.")

        self.client = Groq(
            api_key=self.api_key,
            timeout=self.timeout,
        )

    def generate(
        self,
        system_prompt: str,
        user_prompt: str,
    ) -> str:

        messages = [
            {
                "role": "system",
                "content": system_prompt
                + "\n\nReturn ONLY one valid JSON object. No markdown. No explanation outside JSON.",
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ]

        try:
            # First try Groq JSON mode.
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=self.temperature,
                seed=self.seed,
                response_format={"type": "json_object"},
            )

            content = response.choices[0].message.content

            if content and content.strip():
                return content.strip()

        except Exception:
            # Fall back to normal generation.
            pass

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=self.temperature,
                seed=self.seed,
            )

            content = response.choices[0].message.content

            if not content or not content.strip():
                raise RuntimeError("Groq returned an empty response.")

            return content.strip()

        except Exception as exc:
            raise RuntimeError(
                f"Groq generation failed: {exc}"
            ) from exc