from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
import bcrypt
from typing import List, Optional
import uuid
import datetime

from parsers import extract_text_from_pdf, extract_text_from_docx
from nlp_engine import extract_skills_from_text
import database, models, schemas

# Initialize database tables
database.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="CareerPath AI - Backend Service")

# Allow CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev
    allow_credentials=False, # Must be false when allow_origins is ["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# --- DEPENDENCIES ---

def get_current_user(token: Optional[str] = Header(None), email: Optional[str] = None, db: Session = Depends(database.get_db)):
    if token:
        session = db.query(models.UserSession).filter(
            models.UserSession.token == token,
            models.UserSession.is_active == True
        ).first()
        
        if not session:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
            
        user = db.query(models.User).filter(models.User.id == session.user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
        
    elif email:
        # Fallback for frontend backwards compatibility
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
        
    else:
        raise HTTPException(status_code=401, detail="Authentication required (token or email)")

def get_current_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Insufficient privileges")
    return current_user

# --- ROUTES ---

@app.get("/")
def health_check():
    return {"status": "ok", "message": "CareerPath AI Backend is running!"}

# --- AUTH ROUTES ---

@app.post("/api/auth/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    # Ensure public signup routes cannot create ADMIN
    db_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        full_name=user.full_name,
        role="STUDENT"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create empty profile
    db_profile = models.Profile(user_id=db_user.id)
    db.add(db_profile)
    db.commit()
    
    return db_user

@app.post("/api/auth/login", response_model=schemas.UserLoginResponse)
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    # Increment login attempts
    db_user.login_attempts += 1
    
    if not verify_password(user.password, db_user.password_hash):
        db.commit() # Save incremented attempt
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Successful login
    db_user.last_login_at = datetime.datetime.utcnow()
    db.commit()
    
    # Create session
    token = str(uuid.uuid4())
    db_session = models.UserSession(
        user_id=db_user.id,
        token=token,
        ip_address="127.0.0.1", # Normally from request
        is_active=True
    )
    db.add(db_session)
    db.commit()
    
    return {"token": token, "user": db_user}

@app.post("/api/auth/logout")
def logout(token: str = Header(...), db: Session = Depends(database.get_db)):
    db_session = db.query(models.UserSession).filter(models.UserSession.token == token).first()
    if not db_session or not db_session.is_active:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
        
    db_session.is_active = False
    db.commit()
    return {"message": "Logged out successfully"}

# --- PROFILE ROUTES ---

@app.get("/api/profile", response_model=schemas.ProfileResponse)
def get_profile(current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    db_profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return db_profile

@app.post("/api/profile", response_model=schemas.ProfileResponse)
def update_profile(profile_update: schemas.ProfileBase, current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    db_profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    db_profile.degree = profile_update.degree
    db_profile.university = profile_update.university
    db_profile.cgpa = profile_update.cgpa
    db_profile.year = profile_update.year
    if profile_update.extracted_skills:
        db_profile.extracted_skills = profile_update.extracted_skills
        
    db.commit()
    db.refresh(db_profile)
    return db_profile

# --- ADMIN ROUTES ---

@app.get("/api/admin/users", response_model=List[schemas.UserResponse])
def get_all_users(admin: models.User = Depends(get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.User).all()

@app.put("/api/admin/users/{user_id}", response_model=schemas.UserResponse)
def update_user_by_admin(user_id: int, user_update: schemas.AdminUserUpdate, admin: models.User = Depends(get_current_admin), db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if user_update.email:
        # Check uniqueness
        existing = db.query(models.User).filter(models.User.email == user_update.email).first()
        if existing and existing.id != user_id:
            raise HTTPException(status_code=400, detail="Email already taken")
        db_user.email = user_update.email
        
    if user_update.full_name:
        db_user.full_name = user_update.full_name
        
    if user_update.role:
        if user_update.role not in ["STUDENT", "ADMIN"]:
            raise HTTPException(status_code=400, detail="Invalid role")
        db_user.role = user_update.role
        
    db.commit()
    db.refresh(db_user)
    return db_user

# --- NLP ROUTE ---

@app.post("/api/extract-resume")
async def extract_resume(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
        
    ext = file.filename.split('.')[-1].lower()
    if ext not in ['pdf', 'docx']:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
        
    file_bytes = await file.read()
    
    raw_text = ""
    if ext == 'pdf':
        raw_text = extract_text_from_pdf(file_bytes)
    elif ext == 'docx':
        raw_text = extract_text_from_docx(file_bytes)
        
    if not raw_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text from the document.")
        
    extracted_skills = extract_skills_from_text(raw_text)
    
    # Save extracted skills to database
    db_profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if db_profile:
        old_skills = set([s.strip() for s in db_profile.extracted_skills.split(',') if s.strip()])
        new_skills = set(extracted_skills)
        merged = list(old_skills.union(new_skills))
        db_profile.extracted_skills = ",".join(merged)
        db.commit()
    
    return {
        "filename": file.filename,
        "skills": extracted_skills
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
