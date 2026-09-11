from tests.conftest import auth_header


def test_tasks_require_auth(client):
    assert client.get("/tasks").status_code == 401
    assert client.post("/tasks", json={"title": "Estudar"}).status_code == 401


def test_task_crud(client):
    headers = auth_header(client)

    created = client.post(
        "/tasks",
        json={"title": "Estudar FastAPI", "priority": "high", "description": "JWT + CRUD"},
        headers=headers,
    )
    assert created.status_code == 201
    task = created.json()
    assert task["title"] == "Estudar FastAPI"
    assert task["completed"] is False
    assert task["priority"] == "high"

    listed = client.get("/tasks", headers=headers)
    assert listed.status_code == 200
    assert len(listed.json()) == 1

    fetched = client.get(f"/tasks/{task['id']}", headers=headers)
    assert fetched.status_code == 200
    assert fetched.json()["description"] == "JWT + CRUD"

    updated = client.patch(
        f"/tasks/{task['id']}",
        json={"completed": True},
        headers=headers,
    )
    assert updated.status_code == 200
    assert updated.json()["completed"] is True

    done = client.get("/tasks", params={"completed": True}, headers=headers)
    assert len(done.json()) == 1

    pending = client.get("/tasks", params={"completed": False}, headers=headers)
    assert pending.json() == []

    deleted = client.delete(f"/tasks/{task['id']}", headers=headers)
    assert deleted.status_code == 204
    assert client.get(f"/tasks/{task['id']}", headers=headers).status_code == 404


def test_invalid_priority_is_rejected(client):
    headers = auth_header(client)
    response = client.post(
        "/tasks",
        json={"title": "X", "priority": "urgent"},
        headers=headers,
    )
    assert response.status_code == 422


def test_owner_isolation(client):
    alice = auth_header(client, email="alice@example.com", full_name="Alice")
    bob = auth_header(client, email="bob@example.com", full_name="Bob")

    created = client.post("/tasks", json={"title": "Tarefa da Alice"}, headers=alice)
    task_id = created.json()["id"]

    assert client.get("/tasks", headers=bob).json() == []
    assert client.get(f"/tasks/{task_id}", headers=bob).status_code == 404
    assert client.patch(f"/tasks/{task_id}", json={"completed": True}, headers=bob).status_code == 404
    assert client.delete(f"/tasks/{task_id}", headers=bob).status_code == 404

    still_there = client.get(f"/tasks/{task_id}", headers=alice)
    assert still_there.status_code == 200
    assert still_there.json()["title"] == "Tarefa da Alice"
