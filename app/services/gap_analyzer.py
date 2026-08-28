"""
Gap Analyzer — identifies matched vs missing skills for a career
and maps missing skills to recommended learning resources.
"""

from app.models import LearningResource


def get_gap(student_skills, career):
    """
    Compute skill gap for a single career.

    Args:
        student_skills: list of skill name strings
        career:         CareerRole model object

    Returns:
        dict with matched_skills, missing_skills, match_pct, career
    """
    from app.services.career_matcher import compute_match
    result = compute_match(student_skills, career.skills)

    # Enrich with weight and required flag
    career_skill_map = {cs.skill_name: cs for cs in career.skills}

    matched_detail = []
    for skill_name in result['matched']:
        cs = career_skill_map.get(skill_name)
        matched_detail.append({
            'name': skill_name,
            'weight': cs.weight if cs else 0.5,
            'required': cs.is_required if cs else True
        })

    missing_detail = []
    for skill_name in result['missing']:
        cs = career_skill_map.get(skill_name)
        missing_detail.append({
            'name': skill_name,
            'weight': cs.weight if cs else 0.5,
            'required': cs.is_required if cs else True,
            'priority': 'high' if (cs and cs.weight >= 0.8) else 'medium'
        })

    # Sort missing by weight (most important first)
    missing_detail.sort(key=lambda x: x['weight'], reverse=True)

    return {
        'career': career,
        'match_pct': result['match_pct'],
        'matched_skills': matched_detail,
        'missing_skills': missing_detail,
        'total_required': len(career.skills),
        'matched_count': len(matched_detail),
        'missing_count': len(missing_detail)
    }


def get_learning_recommendations(missing_skill_names):
    """
    Fetch learning resources for a list of missing skill names.

    Args:
        missing_skill_names: list of strings

    Returns:
        list of LearningResource objects, ordered by priority (high → medium → low)
    """
    if not missing_skill_names:
        return []

    resources = LearningResource.query.filter(
        LearningResource.skill_name.in_(missing_skill_names)
    ).all()

    priority_order = {'high': 0, 'medium': 1, 'low': 2}
    resources.sort(key=lambda r: priority_order.get(r.priority, 2))

    return resources


def overall_readiness(career_matches):
    """
    Compute overall career readiness as the average of top-3 match percentages.

    Args:
        career_matches: list of CareerMatch model objects

    Returns:
        float 0–100
    """
    if not career_matches:
        return 0.0
    top3 = sorted(career_matches, key=lambda m: m.match_pct, reverse=True)[:3]
    return round(sum(m.match_pct for m in top3) / len(top3), 1)
