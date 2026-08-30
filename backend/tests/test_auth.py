def test_successful_signup(client):
    response = client.post(
        "/api/auth/signup",
        json={"email": "newuser@test.com", "password": "password123", "full_name": "New User"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "newuser@test.com"
    assert data["role"] == "STUDENT"
    assert "id" in data

def test_duplicate_email_signup(client, test_user):
    # Try to signup with the same email as test_user
    response = client.post(
        "/api/auth/signup",
        json={"email": "student@test.com", "password": "differentpassword", "full_name": "Another User"}
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

def test_admin_role_override_on_signup(client):
    # Attempt to create an admin account via public signup
    response = client.post(
        "/api/auth/signup",
        json={"email": "hacker@test.com", "password": "password", "full_name": "Hacker", "role": "ADMIN"}
    )
    assert response.status_code == 200
    data = response.json()
    # The system must override the requested role and force STUDENT
    assert data["role"] == "STUDENT"
