"""
Skill Extractor — matches skills from resume text against
the master skills vocabulary using keyword + alias matching.
"""

import json
import os
import re

# Load skills database once at module level
_SKILLS_DB_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'skills_db.json')
_SKILLS_DB = []

def _load_skills():
    global _SKILLS_DB
    if not _SKILLS_DB:
        with open(_SKILLS_DB_PATH, 'r') as f:
            _SKILLS_DB = json.load(f)
    return _SKILLS_DB


def extract_skills(text):
    """
    Extract skills from resume text by matching against the skills vocabulary.

    Returns:
        List of dicts: [{'skill': 'Python', 'confidence': 1.0}, ...]
    """
    skills_db = _load_skills()
    text_lower = text.lower()
    found = {}

    for skill_entry in skills_db:
        name = skill_entry['name']
        aliases = skill_entry.get('aliases', [])

        # Build all patterns to search
        search_terms = [name.lower()] + [a.lower() for a in aliases]

        for term in search_terms:
            # Use word boundary matching for single words, substring for multi-word
            if ' ' in term:
                pattern = re.escape(term)
            else:
                pattern = r'\b' + re.escape(term) + r'\b'

            if re.search(pattern, text_lower):
                if name not in found:
                    found[name] = {
                        'skill': name,
                        'confidence': 1.0 if term == name.lower() else 0.9
                    }
                break  # Found this skill, move to next

    # Return sorted by skill name
    return sorted(found.values(), key=lambda x: x['skill'])


def get_skill_names(text):
    """Convenience function — returns just the list of skill name strings."""
    return [s['skill'] for s in extract_skills(text)]


def get_all_skill_names():
    """Return all canonical skill names from the database."""
    skills_db = _load_skills()
    return [s['name'] for s in skills_db]
