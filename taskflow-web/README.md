# TaskFlow Web

Frontend pequeno em React + TypeScript para a [TaskFlow API](../taskflow-api/).

Não é um produto publicado: roda só na sua máquina e **depende da API local**. Sem isso, login e CRUD não funcionam.

## Stack

React 18 · TypeScript · Vite 5

## O que faz

- Cadastro e login (JWT via fluxo OAuth2 password da API)
- Listar, criar, editar, concluir e apagar tarefas
- Filtro: todas / abertas / concluídas
- Aviso se `/health` da API não responder

## Como rodar

Em um terminal, a API:

```bash
cd taskflow-api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Em outro, este frontend:

```bash
cd taskflow-web
npm install
npm run dev
```

Abra `http://localhost:5175`. O Vite faz proxy de `/api` para `http://127.0.0.1:8000`.

Build de verificação (não publica nada):

```bash
npm run build
```

## Limitações (honestas)

- Sem deploy, sem HTTPS, sem refresh token
- Token fica no `localStorage` (ok para demo, não para produção)
- Sem testes E2E; a API é que tem pytest
- Não substitui o Swagger em `/docs` — é só a UI de tarefas
