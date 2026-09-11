from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from app.llm import chat

STATIC_DIR = Path(__file__).resolve().parent.parent / "static"

app = FastAPI(
    title="AI Workspace",
    description="Assistente web com integração LLM (Groq)",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


class ChatResponse(BaseModel):
    reply: str


@app.get("/")
def index():
    return FileResponse(STATIC_DIR / "index.html")


@app.post("/api/chat", response_model=ChatResponse)
async def api_chat(body: ChatRequest):
    reply = await chat([m.model_dump() for m in body.messages])
    return ChatResponse(reply=reply)


@app.get("/health")
def health():
    return {"status": "ok"}
