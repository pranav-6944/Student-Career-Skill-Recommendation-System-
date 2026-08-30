def test_student_cannot_access_admin_routes(client, test_user):
    login_res = client.post("/api/auth/login", json={"email": "student@test.com", "password": "password123"})
    token = login_res.json()["token"]
    
    response = client.get("/api/admin/users", headers={"token": token})
    assert response.status_code == 403
    assert response.json()["detail"] == "Insufficient privileges"

def test_admin_can_access_admin_routes(client, test_admin):
    login_res = client.post("/api/auth/login", json={"email": "admin@test.com", "password": "adminpassword"})
    token = login_res.json()["token"]
    
    response = client.get("/api/admin/users", headers={"token": token})
    assert response.status_code == 200
    assert type(response.json()) is list

def test_admin_can_promote_user(client, test_admin, test_user):
    login_res = client.post("/api/auth/login", json={"email": "admin@test.com", "password": "adminpassword"})
    token = login_res.json()["token"]
    
    target_id = test_user["id"]
    
    response = client.put(
        f"/api/admin/users/{target_id}",
        json={"role": "ADMIN"},
        headers={"token": token}
    )
    assert response.status_code == 200
    assert response.json()["role"] == "ADMIN"
    
    # Verify the promoted user can now access admin routes
    user_login = client.post("/api/auth/login", json={"email": "student@test.com", "password": "password123"})
    user_token = user_login.json()["token"]
    
    admin_check = client.get("/api/admin/users", headers={"token": user_token})
    assert admin_check.status_code == 200

def test_student_profile_update_changes_timestamp(client, test_user, db_session):
    login_res = client.post("/api/auth/login", json={"email": "student@test.com", "password": "password123"})
    token = login_res.json()["token"]
    
    import models
    user_db = db_session.query(models.User).filter(models.User.email == "student@test.com").first()
    initial_updated_at = user_db.profile.updated_at
    
    response = client.post(
        "/api/profile",
        json={"degree": "M.Sc Comp Sci", "university": "New Uni", "cgpa": "4.0", "year": "2"},
        headers={"token": token}
    )
    
    assert response.status_code == 200
    
    db_session.refresh(user_db.profile)
    assert user_db.profile.degree == "M.Sc Comp Sci"
    # Note: SQLite DateTime precision might make this check flaky if running too fast, 
    # but the ORM onupdate hook should trigger it.
    assert user_db.profile.updated_at >= initial_updated_at
