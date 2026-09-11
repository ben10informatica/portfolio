# ShortLink

Encurtador de URLs **local** — menor que o TaskFlow. API FastAPI + SQLite e uma UI React para criar o código, copiar o link e ver cliques.

Não há domínio público nem autenticação. Qualquer um que alcance a API na sua máquina pode criar links.

## Stack

| Camada | Tecnologia |
|--------|------------|
| API | Python · FastAPI · SQLAlchemy · SQLite |
| Web | React · TypeScript · Vite |

## Como rodar

Terminal 1 — API na porta **8002** (8000 é da TaskFlow, 8001 do AI Workspace):

```bash
cd shortlink/api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8002
```

- Health: http://127.0.0.1:8002/health
- Docs: http://127.0.0.1:8002/docs
- Redirect: `GET /{codigo}` (307)

Terminal 2 — UI:

```bash
cd shortlink/web
npm install
npm run dev
```

Abra `http://localhost:5176`. O Vite faz proxy de `/api` para a API. O **link curto em si** abre na porta da API (`http://127.0.0.1:8002/abc123`).

## Testes da API

```bash
cd shortlink/api
pip install -r requirements-dev.txt
pytest
```

Cobre health, criação, listagem, redirect com contagem de cliques, 404 e URL inválida.

## Limitações (honestas)

- Sem login: a lista é compartilhada no SQLite local
- Sem expiração, sem custom slug, sem estatísticas além do contador
- SQLite em arquivo local; apague `shortlink.db` para zerar
- Sem Docker e sem deploy
