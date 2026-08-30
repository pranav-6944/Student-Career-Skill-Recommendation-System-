import os
import json
import logging
import google.generativeai as genai

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_skills_from_text(text: str) -> list[str]:
    """
    Process raw resume text through Gemini AI to extract unique technical skills.
    Replaces the heavy local GLiNER ML model.
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
    
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
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
        logger.error(f"Error extracting skills via Gemini: {e}")
        return []
