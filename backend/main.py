from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from parsers import extract_text_from_pdf, extract_text_from_docx
from nlp_engine import extract_skills_from_text

app = FastAPI(title="CareerPath AI - NLP Extraction Service")

# Allow CORS for the React frontend running on port 3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], # Common Vite ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "CareerPath AI NLP Backend is running!"}

@app.post("/api/extract-resume")
async def extract_resume(file: UploadFile = File(...)):
    """
    Accepts a PDF or DOCX resume upload, extracts the text, 
    and uses spaCy NLP to extract technical skills.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
        
    ext = file.filename.split('.')[-1].lower()
    if ext not in ['pdf', 'docx']:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
        
    # Read file into memory
    file_bytes = await file.read()
    
    # Parse text based on extension
    raw_text = ""
    if ext == 'pdf':
        raw_text = extract_text_from_pdf(file_bytes)
    elif ext == 'docx':
        raw_text = extract_text_from_docx(file_bytes)
        
    if not raw_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text from the document.")
        
    # Run NLP Extraction
    extracted_skills = extract_skills_from_text(raw_text)
    
    return {
        "filename": file.filename,
        "skills": extracted_skills
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
