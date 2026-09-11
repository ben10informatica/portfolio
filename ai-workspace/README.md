# AI Workspace

Chat web de produtividade com Groq (Llama).

![Screenshot do AI Workspace](docs/screenshot.png)

## Stack

Python · FastAPI · Groq · HTML/CSS/JS

## Como rodar

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# coloque GROQ_API_KEY no .env
uvicorn app.main:app --reload --port 8001
```

Abra `http://localhost:8001`.

## O que mostra no currículo

- Integração com LLM
- API async
- UI de chat
