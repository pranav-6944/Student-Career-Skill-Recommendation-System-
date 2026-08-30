def test_special_characters_in_profile(client, test_user):
    login_res = client.post("/api/auth/login", json={"email": "student@test.com", "password": "password123"})
    token = login_res.json()["token"]
    
    special_payload = {
        "degree": "👨‍🎓 B.Sc; DROP TABLE users;--",
        "university": "漢字 University",
        "cgpa": "💯",
        "year": "2024"
    }
    
    response = client.post("/api/profile", json=special_payload, headers={"token": token})
    assert response.status_code == 200
    data = response.json()
    
    # Verify no truncation and exact saving
    assert data["degree"] == "👨‍🎓 B.Sc; DROP TABLE users;--"
    assert data["university"] == "漢字 University"
    assert data["cgpa"] == "💯"

def test_extremely_long_input(client, test_user):
    login_res = client.post("/api/auth/login", json={"email": "student@test.com", "password": "password123"})
    token = login_res.json()["token"]
    
    long_string = "A" * 50000
    
    response = client.post(
        "/api/profile",
        json={"degree": long_string, "university": "Test", "cgpa": "1.0", "year": "1"},
        headers={"token": token}
    )
    
    assert response.status_code == 200
    assert response.json()["degree"] == long_string
