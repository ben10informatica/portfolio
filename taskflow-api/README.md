# TaskFlow API

API REST de tarefas com autenticação JWT, Swagger e Docker.

## Stack

Python · FastAPI · SQLAlchemy · SQLite · JWT · Docker

## Como rodar

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Docs: `http://localhost:8000/docs`

## Docker

```bash
docker compose up --build
```

## O que mostra no currículo

- Cadastro/login com JWT
- CRUD isolado por usuário
- OpenAPI automático
- Container pronto
