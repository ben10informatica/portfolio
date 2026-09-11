import secrets

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import settings
from app.database import Base, engine, get_db
from app.models import Link
from app.schemas import HealthResponse, LinkCreate, LinkResponse

ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
RESERVED = {"health", "links", "docs", "redoc", "openapi.json"}

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ShortLink API",
    description="Encurtador de URLs local: cria um código curto, redireciona e conta cliques.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def make_code() -> str:
    return "".join(secrets.choice(ALPHABET) for _ in range(6))


def to_response(link: Link) -> LinkResponse:
    base = settings.base_url.rstrip("/")
    return LinkResponse(
        id=link.id,
        code=link.code,
        url=link.url,
        short_url=f"{base}/{link.code}",
        clicks=link.clicks,
        created_at=link.created_at,
    )


@app.get("/", tags=["Health"])
def root():
    return {
        "name": "ShortLink API",
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "create": "POST /links",
            "list": "GET /links",
            "redirect": "GET /{code}",
        },
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception as exc:
        raise HTTPException(status_code=503, detail="database unavailable") from exc
    return HealthResponse(status="ok")


@app.get("/links", response_model=list[LinkResponse], tags=["Links"])
def list_links(db: Session = Depends(get_db)):
    links = db.query(Link).order_by(Link.created_at.desc()).limit(50).all()
    return [to_response(link) for link in links]


@app.post("/links", response_model=LinkResponse, status_code=status.HTTP_201_CREATED, tags=["Links"])
def create_link(payload: LinkCreate, db: Session = Depends(get_db)):
    url = str(payload.url)
    for _ in range(8):
        code = make_code()
        if code.lower() in RESERVED:
            continue
        if db.query(Link).filter(Link.code == code).first():
            continue
        link = Link(code=code, url=url)
        db.add(link)
        db.commit()
        db.refresh(link)
        return to_response(link)
    raise HTTPException(status_code=500, detail="não foi possível gerar um código")


@app.get("/{code}", tags=["Links"])
def redirect(code: str, db: Session = Depends(get_db)):
    if len(code) < 4 or len(code) > 16:
        raise HTTPException(status_code=404, detail="link não encontrado")
    link = db.query(Link).filter(Link.code == code).first()
    if not link:
        raise HTTPException(status_code=404, detail="link não encontrado")
    link.clicks += 1
    db.commit()
    return RedirectResponse(url=link.url, status_code=status.HTTP_307_TEMPORARY_REDIRECT)
