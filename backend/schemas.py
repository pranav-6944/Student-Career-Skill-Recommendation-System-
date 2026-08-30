from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

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
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    created_at: Optional[datetime] = None
    last_login_at: Optional[datetime] = None
    login_attempts: int = 0

    class Config:
        from_attributes = True

class UserLoginResponse(BaseModel):
    token: str
    user: UserResponse

class SessionResponse(BaseModel):
    token: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AdminUserUpdate(BaseModel):
    email: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
