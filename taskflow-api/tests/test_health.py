def test_health_ok(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_root_lists_main_routes(client):
    response = client.get("/")
    assert response.status_code == 200
    body = response.json()
    assert body["name"] == "TaskFlow API"
    assert body["docs"] == "/docs"
    assert "register" in body["endpoints"]
    assert "tasks" in body["endpoints"]
