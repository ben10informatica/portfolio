import os
import tempfile

import pytest
from fastapi.testclient import TestClient

_db_fd, _db_path = tempfile.mkstemp(suffix=".db")
os.environ["DATABASE_URL"] = f"sqlite:///{_db_path}"
os.environ["SECRET_KEY"] = "test-secret-key-not-for-production"

from app.database import Base, SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.models import Task, User  # noqa: E402


@pytest.fixture(scope="session", autouse=True)
def _create_schema():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    os.close(_db_fd)
    os.unlink(_db_path)


@pytest.fixture(autouse=True)
def _clean_db():
    db = SessionLocal()
    try:
        db.query(Task).delete()
        db.query(User).delete()
        db.commit()
    finally:
        db.close()


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def register(
    client: TestClient,
    email: str = "demo@example.com",
    password: str = "secret123",
    full_name: str = "Demo User",
):
    return client.post(
        "/auth/register",
        json={"email": email, "password": password, "full_name": full_name},
    )


def auth_header(
    client: TestClient,
    email: str = "demo@example.com",
    password: str = "secret123",
    full_name: str = "Demo User",
) -> dict[str, str]:
    register(client, email=email, password=password, full_name=full_name)
    login = client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )
    token = login.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
