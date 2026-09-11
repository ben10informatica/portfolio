from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import auth, tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow API",
    description="API REST de gerenciamento de tarefas com autenticação JWT",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)


@app.get("/", tags=["Health"])
def root():
    return {
        "name": "TaskFlow API",
        "docs": "/docs",
        "endpoints": {
            "register": "POST /auth/register",
            "login": "POST /auth/login",
            "tasks": "GET/POST /tasks",
        },
    }


@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}
