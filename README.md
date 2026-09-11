# Portfólio — Projetos Variados

Coleção de projetos para currículo e vagas **home office**, cobrindo stacks diferentes.

## Projetos

| Projeto | Stack | Foco | Pasta |
|---------|-------|------|-------|
| **Site Portfólio** | React, TypeScript, Vite | Frontend | [`site/`](./site/) |
| **TaskFlow API** | Python, FastAPI, JWT, Docker | Backend REST | [`taskflow-api/`](./taskflow-api/) |
| **AI Workspace** | Python, FastAPI, Groq LLM | IA aplicada | [`ai-workspace/`](./ai-workspace/) |
| **YouTube Dashboard** | React, TypeScript, Express API | Full-Stack | [`youtube-dashboard/`](./youtube-dashboard/) |

## Como rodar tudo

```bash
# 1. Site portfólio
cd portfolio/site && npm install && npm run dev

# 2. TaskFlow API
cd portfolio/taskflow-api && pip install -r requirements.txt && uvicorn app.main:app --reload

# 3. AI Workspace
cd portfolio/ai-workspace && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8001

# 4. YouTube Dashboard (requer API na raiz do repo)
cd .. && npm run build && npm run server
cd portfolio/youtube-dashboard && npm install && npm run dev
```

## Deploy sugerido

| Projeto | Plataforma |
|---------|------------|
| Site + YouTube Dashboard | Vercel / Netlify |
| TaskFlow API + AI Workspace | Railway / Render |
| YouTube API (raiz) | Railway / Render |

## Próximos passos

- [ ] Subir cada projeto no GitHub (repo separado ou monorepo)
- [ ] Deploy com link live em cada README
- [ ] Adicionar screenshot/GIF no README de cada projeto
- [ ] LinkedIn com 1 post por projeto
