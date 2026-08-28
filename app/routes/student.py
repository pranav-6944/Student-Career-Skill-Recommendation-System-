from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_required, current_user
from datetime import datetime
from app import db
from app.models import (Resume, ExtractedSkill, CareerRole, CareerMatch,
                         LearningResource, StudentProfile)
from app.services.career_matcher import match_all_careers, get_match_label
from app.services.gap_analyzer import get_gap, get_learning_recommendations, overall_readiness

student_bp = Blueprint('student', __name__, url_prefix='/student')


@student_bp.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'admin':
        return redirect(url_for('admin.dashboard'))

    # Get latest analyzed resume
    resume = Resume.query.filter_by(
        user_id=current_user.id, status='done'
    ).order_by(Resume.uploaded_at.desc()).first()

    extracted_skills = []
    career_matches = []
    readiness = 0

    if resume:
        extracted_skills = [es.skill_name for es in resume.extracted_skills]
        career_matches = CareerMatch.query.filter_by(
            user_id=current_user.id
        ).order_by(CareerMatch.match_pct.desc()).all()
        readiness = overall_readiness(career_matches)

    top_matches = career_matches[:3] if career_matches else []
    profile = current_user.profile

    return render_template('student/dashboard.html',
                           resume=resume,
                           extracted_skills=extracted_skills,
                           top_matches=top_matches,
                           readiness=readiness,
                           profile=profile,
                           total_matches=len(career_matches),
                           now=datetime.utcnow())


@student_bp.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    profile = current_user.profile

    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        degree = request.form.get('degree', '').strip()
        university = request.form.get('university', '').strip()
        cgpa = request.form.get('cgpa', '')
        year = request.form.get('year', '')
        phone = request.form.get('phone', '').strip()
        linkedin = request.form.get('linkedin', '').strip()
        github = request.form.get('github', '').strip()

        if name:
            current_user.name = name

        if not profile:
            profile = StudentProfile(user_id=current_user.id)
            db.session.add(profile)

        profile.degree = degree
        profile.university = university
        profile.cgpa = float(cgpa) if cgpa else None
        profile.year = int(year) if year else None
        profile.phone = phone
        profile.linkedin = linkedin
        profile.github = github

        db.session.commit()
        flash('Profile updated successfully!', 'success')
        return redirect(url_for('student.profile'))

    return render_template('student/profile.html', profile=profile)


@student_bp.route('/career-matches')
@login_required
def career_matches():
    filter_type = request.args.get('filter', 'all')

    career_matches = CareerMatch.query.filter_by(
        user_id=current_user.id
    ).order_by(CareerMatch.match_pct.desc()).all()

    # Filter
    if filter_type == 'high':
        career_matches = [m for m in career_matches if m.match_pct >= 75]
    elif filter_type == 'medium':
        career_matches = [m for m in career_matches if 50 <= m.match_pct < 75]
    elif filter_type == 'low':
        career_matches = [m for m in career_matches if m.match_pct < 50]

    # Add label to each
    for m in career_matches:
        m.label, m.label_class = get_match_label(m.match_pct)

    resume = Resume.query.filter_by(
        user_id=current_user.id, status='done'
    ).order_by(Resume.uploaded_at.desc()).first()

    readiness = overall_readiness(
        CareerMatch.query.filter_by(user_id=current_user.id).all()
    )

    return render_template('student/career_matches.html',
                           career_matches=career_matches,
                           filter_type=filter_type,
                           resume=resume,
                           readiness=readiness)


@student_bp.route('/skill-gap')
@login_required
def skill_gap():
    career_id = request.args.get('career_id', type=int)

    all_matches = CareerMatch.query.filter_by(
        user_id=current_user.id
    ).order_by(CareerMatch.match_pct.desc()).all()

    if not all_matches:
        flash('Please upload and analyze your resume first.', 'warning')
        return redirect(url_for('resume.upload'))

    # Default to best match
    if not career_id:
        career_id = all_matches[0].career_id

    career = CareerRole.query.get_or_404(career_id)

    resume = Resume.query.filter_by(
        user_id=current_user.id, status='done'
    ).order_by(Resume.uploaded_at.desc()).first()

    student_skills = [es.skill_name for es in resume.extracted_skills] if resume else []
    gap = get_gap(student_skills, career)

    return render_template('student/skill_gap.html',
                           gap=gap,
                           career=career,
                           all_matches=all_matches,
                           selected_career_id=career_id)


@student_bp.route('/learning')
@login_required
def learning():
    career_id = request.args.get('career_id', type=int)

    all_matches = CareerMatch.query.filter_by(
        user_id=current_user.id
    ).order_by(CareerMatch.match_pct.desc()).all()

    if not all_matches:
        flash('Please upload and analyze your resume first.', 'warning')
        return redirect(url_for('resume.upload'))

    if not career_id:
        career_id = all_matches[0].career_id

    career = CareerRole.query.get_or_404(career_id)
    target_match = next((m for m in all_matches if m.career_id == career_id), all_matches[0])

    missing_skills = target_match.missing_skills
    resources = get_learning_recommendations(missing_skills)

    # Also get general boost resources for matched skills
    matched_skills = target_match.matched_skills
    boost_resources = get_learning_recommendations(matched_skills[:3]) if matched_skills else []

    return render_template('student/learning.html',
                           resources=resources,
                           boost_resources=boost_resources,
                           career=career,
                           all_matches=all_matches,
                           selected_career_id=career_id,
                           missing_skills=missing_skills,
                           matched_skills=matched_skills)
