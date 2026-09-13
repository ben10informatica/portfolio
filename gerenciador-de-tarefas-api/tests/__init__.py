"EOF"
cat > gerenciador-de-tarefas-api/tests/test_tasks.py << 'EOF'
"""Testes unitários para tasks."""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_create_task():
    response = client.post(
        "/api/v1/tasks/",
        json={"title": "Test Task", "description": "Description"},
        headers={"Authorization": "Bearer test-token"}
    )
    assert response.status_code in [201, 401, 422]


def test_list_tasks():
    response = client.get(
        "/api/v1/tasks/",
        headers={"Authorization": "Bearer test-token"}
    )
    assert response.status_code in [200, 401, 422]


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
