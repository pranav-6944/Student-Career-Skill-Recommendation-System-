from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
import bcrypt
from typing import List

from parsers import extract_text_from_pdf, extract_text_from_docx
from nlp_engine import extract_skills_from_text
import database, models, schemas

# Initialize database tables
database.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="CareerPath AI - Backend Service")

# Allow CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

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
    db_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        full_name=user.full_name,
        role="student"
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
    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Using the email as a simple token for demonstration purposes
    # In production, use JWT.
    return {"token": db_user.email, "user": db_user}

# --- PROFILE ROUTES ---

@app.get("/api/profile", response_model=schemas.ProfileResponse)
def get_profile(email: str, db: Session = Depends(database.get_db)):
    # Simple auth check using email directly
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    db_profile = db.query(models.Profile).filter(models.Profile.user_id == db_user.id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    return db_profile

@app.post("/api/profile", response_model=schemas.ProfileResponse)
def update_profile(email: str, profile_update: schemas.ProfileBase, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    db_profile = db.query(models.Profile).filter(models.Profile.user_id == db_user.id).first()
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

# --- NLP ROUTE ---

@app.post("/api/extract-resume")
async def extract_resume(email: str, file: UploadFile = File(...), db: Session = Depends(database.get_db)):
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
    
    # Save extracted skills to database if user is valid
    if email:
        db_user = db.query(models.User).filter(models.User.email == email).first()
        if db_user:
            db_profile = db.query(models.Profile).filter(models.Profile.user_id == db_user.id).first()
            if db_profile:
                # Merge old skills and new skills, deduplicate
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
