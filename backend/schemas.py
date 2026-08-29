from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class ProfileBase(BaseModel):
    degree: str
    university: str
    cgpa: str
    year: str
    extracted_skills: str = ""

class ProfileResponse(ProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str

    class Config:
        from_attributes = True

class UserLoginResponse(BaseModel):
    token: str
    user: UserResponse
