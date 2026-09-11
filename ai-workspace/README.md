# AI Workspace

Assistente web de produtividade com chat inteligente integrado ao Groq LLM (gratuito).

## Stack

- Python + FastAPI
- Groq API (Llama 3.3)
- Frontend HTML/CSS/JS

## Como rodar

```bash
pip install -r requirements.txt
copy .env.example .env
# Adicione sua GROQ_API_KEY em .env
uvicorn app.main:app --reload --port 8001
```

Acesse `http://localhost:8001`

## Funcionalidades

- Chat com histórico de conversa
- Sugestões de prompts prontos
- Interface responsiva estilo workspace
- API REST documentada em `/docs`

## Destaques para currículo

- Integração com LLM em produção
- API async com FastAPI
- UX de chat profissional
- Configuração via variáveis de ambiente
