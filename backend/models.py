from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, default="student")

    profile = relationship("Profile", back_populates="user", uselist=False)

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    degree = Column(String, default="B.Sc Computer Science")
    university = Column(String, default="Your University")
    cgpa = Column(String, default="")
    year = Column(String, default="1")
    
    # Store skills as comma-separated string for simplicity
    extracted_skills = Column(String, default="")

    user = relationship("User", back_populates="profile")
