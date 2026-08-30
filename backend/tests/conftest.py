import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from database import Base, get_db
from main import app
import models

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    # Create the database tables
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        # Drop the tables after each test to ensure a clean state
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
            
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()

@pytest.fixture(scope="function")
def test_user(client):
    response = client.post(
        "/api/auth/signup",
        json={"email": "student@test.com", "password": "password123", "full_name": "Test Student"}
    )
    return response.json()

@pytest.fixture(scope="function")
def test_admin(client, db_session):
    # Admin must be promoted directly in DB since signup forces STUDENT
    response = client.post(
        "/api/auth/signup",
        json={"email": "admin@test.com", "password": "adminpassword", "full_name": "Test Admin"}
    )
    user_data = response.json()
    
    # Promote to admin
    db_user = db_session.query(models.User).filter(models.User.email == user_data["email"]).first()
    db_user.role = "ADMIN"
    db_session.commit()
    
    return {"email": "admin@test.com", "password": "adminpassword", "id": user_data["id"]}
