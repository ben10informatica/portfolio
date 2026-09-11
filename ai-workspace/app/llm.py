import httpx

from app.config import settings

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = (
    "Você é um assistente de produtividade para desenvolvedores. "
    "Responda em português, de forma clara e objetiva. "
    "Ajude com código, planejamento de tarefas, revisão de ideias e dúvidas técnicas."
)


async def chat(messages: list[dict[str, str]]) -> str:
    if not settings.groq_api_key:
        return (
            "⚠️ GROQ_API_KEY não configurada. "
            "Copie .env.example para .env e adicione sua chave gratuita em https://console.groq.com/"
        )

    payload = {
        "model": settings.groq_model,
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}, *messages],
        "temperature": 0.7,
        "max_tokens": 1024,
    }

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            GROQ_URL,
            headers={"Authorization": f"Bearer {settings.groq_api_key}"},
            json=payload,
        )
        response.raise_for_status()
        data = response.json()

    return data["choices"][0]["message"]["content"]
