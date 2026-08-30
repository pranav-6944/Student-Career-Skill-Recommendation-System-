import os
import json
import logging
import httpx
from dotenv import load_dotenv

load_dotenv(override=True)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_skills_from_text(text: str) -> list[str]:
    """
    Process raw resume text through Gemini AI via HTTP REST API to extract unique technical skills.
    This avoids the gRPC IPv6 hang issues present in the google-generativeai SDK.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("GEMINI_API_KEY not found. Returning empty skills.")
        return []
        
    prompt = f"""
    You are an expert technical recruiter and AI resume parser.
    Extract all distinct technical skills, tools, programming languages, and frameworks from the following resume text.
    Return ONLY a raw JSON list of strings (e.g. ["Python", "React", "Docker"]).
    Do NOT include markdown formatting (like ```json), just return the raw JSON array.
    
    Resume Text:
    {text}
    """
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.1}
    }
    
    try:
        response = httpx.post(url, json=payload, timeout=60.0)
        response.raise_for_status()
        data = response.json()
        
        candidates = data.get("candidates", [])
        if not candidates:
            return []
            
        response_text = candidates[0].get("content", {}).get("parts", [])[0].get("text", "").strip()
        
        # Clean markdown formatting if Gemini mistakenly included it
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.startswith('```'):
            response_text = response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
            
        skills = json.loads(response_text.strip())
        
        if isinstance(skills, list):
            # Title-case for uniformity
            return sorted(list(set([str(s).title() for s in skills])))
        else:
            logger.error("Gemini did not return a JSON array.")
            return []
    except Exception as e:
        logger.error(f"Error extracting skills via Gemini REST API: {e}")
        return []
