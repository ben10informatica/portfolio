from tests.conftest import register


def test_register_and_me(client):
    created = register(client)
    assert created.status_code == 201
    body = created.json()
    assert body["email"] == "demo@example.com"
    assert body["full_name"] == "Demo User"
    assert "hashed_password" not in body

    login = client.post(
        "/auth/login",
        data={"username": "demo@example.com", "password": "secret123"},
    )
    assert login.status_code == 200
    token = login.json()["access_token"]
    assert login.json()["token_type"] == "bearer"

    me = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me.status_code == 200
    assert me.json()["email"] == "demo@example.com"


def test_register_duplicate_email(client):
    assert register(client).status_code == 201
    again = register(client)
    assert again.status_code == 409
    assert again.json()["detail"] == "E-mail já cadastrado"


def test_login_wrong_password(client):
    register(client)
    response = client.post(
        "/auth/login",
        data={"username": "demo@example.com", "password": "wrong-pass"},
    )
    assert response.status_code == 401


def test_me_requires_token(client):
    response = client.get("/auth/me")
    assert response.status_code == 401
