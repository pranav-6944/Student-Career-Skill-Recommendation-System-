"""
Career Matcher — computes weighted match percentage between
a student's skill set and each career role's required skills.
"""


def compute_match(student_skills, career_skills):
    """
    Compute career match percentage using weighted intersection.

    Args:
        student_skills: list of skill name strings (e.g. ['Python', 'SQL'])
        career_skills:  list of CareerSkill model objects

    Returns:
        dict with keys: match_pct, matched, missing
    """
    student_set = {s.lower() for s in student_skills}
    matched = []
    missing = []
    total_weight = 0.0
    matched_weight = 0.0

    for cs in career_skills:
        skill_name = cs.skill_name
        weight = cs.weight or 0.5
        total_weight += weight

        if skill_name.lower() in student_set:
            matched.append(skill_name)
            matched_weight += weight
        else:
            missing.append(skill_name)

    if total_weight == 0:
        match_pct = 0.0
    else:
        match_pct = round((matched_weight / total_weight) * 100, 1)

    return {
        'match_pct': match_pct,
        'matched': matched,
        'missing': missing
    }


def match_all_careers(student_skills, careers):
    """
    Run compute_match against all CareerRole objects.

    Args:
        student_skills: list of skill name strings
        careers:        list of CareerRole model objects

    Returns:
        list of dicts sorted by match_pct descending
    """
    results = []
    for career in careers:
        result = compute_match(student_skills, career.skills)
        results.append({
            'career': career,
            'match_pct': result['match_pct'],
            'matched': result['matched'],
            'missing': result['missing']
        })

    results.sort(key=lambda x: x['match_pct'], reverse=True)
    return results


def get_match_label(match_pct):
    """Return a human-readable label and CSS color class for a match percentage."""
    if match_pct >= 75:
        return 'High Match', 'success'
    elif match_pct >= 50:
        return 'Medium Match', 'warning'
    else:
        return 'Low Match', 'error'
