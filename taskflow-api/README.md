# TaskFlow API

API REST de gerenciamento de tarefas com autenticação JWT, documentação Swagger e Docker.

## Stack

- Python 3.12
- FastAPI
- SQLAlchemy + SQLite
- JWT (python-jose)
- Docker

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Criar conta |
| POST | `/auth/login` | Login (retorna JWT) |
| GET | `/auth/me` | Perfil do usuário logado |
| GET | `/tasks` | Listar tarefas |
| POST | `/tasks` | Criar tarefa |
| PATCH | `/tasks/{id}` | Atualizar tarefa |
| DELETE | `/tasks/{id}` | Excluir tarefa |

Documentação interativa: `http://localhost:8000/docs`

## Como rodar

```bash
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

## Docker

```bash
docker compose up --build
```

## Teste rápido (curl)

```bash
# Registrar
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@test.com","password":"123456","full_name":"Dev Teste"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -d "username=dev@test.com&password=123456"

# Criar tarefa (substitua TOKEN)
curl -X POST http://localhost:8000/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudar FastAPI","priority":"high"}'
```

## Destaques para currículo

- Autenticação JWT completa
- CRUD com isolamento por usuário
- OpenAPI/Swagger automático
- Container Docker pronto para deploy
