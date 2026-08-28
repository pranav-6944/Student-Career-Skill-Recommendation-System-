"""
Resume Parser — extracts raw text from PDF and DOCX files
and scores the resume based on section completeness.
"""

import re
import os


def parse_resume(filepath):
    """Parse a resume file (PDF or DOCX) and return raw text."""
    ext = os.path.splitext(filepath)[1].lower()
    if ext == '.pdf':
        return _parse_pdf(filepath)
    elif ext in ('.docx', '.doc'):
        return _parse_docx(filepath)
    return ''


def _parse_pdf(filepath):
    """Extract text from a PDF file using PyPDF2."""
    try:
        import PyPDF2
        text = []
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text.append(page_text)
        return '\n'.join(text)
    except Exception as e:
        print(f"[PDF Parser Error] {e}")
        return ''


def _parse_docx(filepath):
    """Extract text from a DOCX file using python-docx."""
    try:
        import docx
        doc = docx.Document(filepath)
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return '\n'.join(paragraphs)
    except Exception as e:
        print(f"[DOCX Parser Error] {e}")
        return ''


def extract_sections(text):
    """
    Identify key sections from resume text.
    Returns a dict with keys: education, experience, skills, projects, certifications.
    """
    text_lower = text.lower()
    sections = {
        'education': _extract_section(text, ['education', 'academic', 'qualification']),
        'experience': _extract_section(text, ['experience', 'work history', 'employment', 'internship']),
        'skills': _extract_section(text, ['skills', 'technical skills', 'core competencies', 'technologies']),
        'projects': _extract_section(text, ['projects', 'project work', 'personal projects', 'academic projects']),
        'certifications': _extract_section(text, ['certification', 'certificates', 'courses', 'training']),
    }
    return sections


def _extract_section(text, keywords):
    """Extract text block after a section heading."""
    lines = text.split('\n')
    result = []
    capturing = False
    section_headers = [
        'education', 'experience', 'skills', 'projects', 'certifications',
        'achievements', 'awards', 'publications', 'references', 'objective',
        'summary', 'profile', 'contact', 'languages', 'hobbies', 'interests'
    ]

    for line in lines:
        line_lower = line.lower().strip()
        # Check if we hit a new section header
        if any(kw in line_lower for kw in keywords) and len(line_lower) < 50:
            capturing = True
            continue
        # Stop at next section header
        if capturing and any(kw in line_lower for kw in section_headers if kw not in keywords) and len(line_lower) < 50:
            break
        if capturing and line.strip():
            result.append(line.strip())

    return '\n'.join(result)


def score_resume(sections, skills_found):
    """
    Score resume 0–100 based on:
    - Education present: 20pts
    - Experience present: 20pts
    - Skills found (more = higher): up to 25pts
    - Projects present: 20pts
    - Certifications present: 15pts
    """
    score = 0

    if sections.get('education') and len(sections['education']) > 10:
        score += 20
    if sections.get('experience') and len(sections['experience']) > 10:
        score += 20
    if sections.get('projects') and len(sections['projects']) > 10:
        score += 20
    if sections.get('certifications') and len(sections['certifications']) > 5:
        score += 15

    # Skills score: proportional up to 25 pts
    num_skills = len(skills_found)
    skills_score = min(25, int((num_skills / 10) * 25))
    score += skills_score

    return min(score, 100)
