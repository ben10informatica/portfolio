"""Entry point da aplicação FastAPI."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks, users

app = FastAPI(
    title="Gerenciador de Tarefas API",
    description="API RESTful com autenticação JWT e CRUD de tarefas",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])


@app.get("/")
def root():
    return {"message": "Gerenciador de Tarefas API", "docs": "/docs"}


@app.get("/health")
def health_check():
    return {"status": "ok"}

