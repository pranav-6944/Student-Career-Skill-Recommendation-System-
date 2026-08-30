def test_successful_login(client, test_user, db_session):
    response = client.post(
        "/api/auth/login",
        json={"email": "student@test.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert data["user"]["email"] == "student@test.com"
    
    # Audit fields check
    import models
    user_db = db_session.query(models.User).filter(models.User.email == "student@test.com").first()
    assert user_db.login_attempts == 1
    assert user_db.last_login_at is not None

def test_failed_login_audit(client, test_user, db_session):
    response = client.post(
        "/api/auth/login",
        json={"email": "student@test.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    
    import models
    user_db = db_session.query(models.User).filter(models.User.email == "student@test.com").first()
    assert user_db.login_attempts == 1
    assert user_db.last_login_at is None

def test_logout_invalidates_token(client, test_user):
    # Login first
    login_res = client.post("/api/auth/login", json={"email": "student@test.com", "password": "password123"})
    token = login_res.json()["token"]
    
    # Verify token works
    profile_res = client.get("/api/profile", headers={"token": token})
    assert profile_res.status_code == 200
    
    # Logout
    logout_res = client.post("/api/auth/logout", headers={"token": token})
    assert logout_res.status_code == 200
    
    # Verify token no longer works
    profile_res_after = client.get("/api/profile", headers={"token": token})
    assert profile_res_after.status_code == 401
    assert profile_res_after.json()["detail"] == "Invalid or expired token"
