def test_health_ok(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_root_lists_routes(client):
    response = client.get("/")
    assert response.status_code == 200
    body = response.json()
    assert body["name"] == "ShortLink API"
    assert "create" in body["endpoints"]
    assert "redirect" in body["endpoints"]


def test_create_and_list(client):
    created = client.post("/links", json={"url": "https://example.com/docs"})
    assert created.status_code == 201
    body = created.json()
    assert body["url"] == "https://example.com/docs"
    assert len(body["code"]) == 6
    assert body["short_url"].endswith(body["code"])
    assert body["clicks"] == 0

    listed = client.get("/links")
    assert listed.status_code == 200
    assert len(listed.json()) == 1
    assert listed.json()[0]["code"] == body["code"]


def test_redirect_increments_clicks(client):
    created = client.post("/links", json={"url": "https://example.com/app"})
    code = created.json()["code"]

    redirected = client.get(f"/{code}", follow_redirects=False)
    assert redirected.status_code == 307
    assert redirected.headers["location"] == "https://example.com/app"

    listed = client.get("/links")
    assert listed.json()[0]["clicks"] == 1


def test_unknown_code_is_404(client):
    response = client.get("/zzzzzz")
    assert response.status_code == 404


def test_invalid_url_rejected(client):
    response = client.post("/links", json={"url": "not-a-url"})
    assert response.status_code == 422
