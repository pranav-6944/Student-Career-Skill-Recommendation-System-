from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_required, current_user
from functools import wraps
from app import db
from app.models import (User, StudentProfile, Resume, ExtractedSkill,
                         CareerRole, CareerSkill, CareerMatch, LearningResource)

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')


def admin_required(f):
    @wraps(f)
    @login_required
    def decorated(*args, **kwargs):
        if current_user.role != 'admin':
            flash('Access denied. Admin only.', 'danger')
            return redirect(url_for('student.dashboard'))
        return f(*args, **kwargs)
    return decorated


@admin_bp.route('/')
@admin_required
def dashboard():
    total_students = User.query.filter_by(role='student').count()
    total_careers = CareerRole.query.count()
    total_resumes = Resume.query.count()
    analyzed = Resume.query.filter_by(status='done').count()
    pending = Resume.query.filter_by(status='pending').count()
    failed = Resume.query.filter_by(status='failed').count()

    # Average career readiness
    all_matches = CareerMatch.query.all()
    if all_matches:
        avg_readiness = round(sum(m.match_pct for m in all_matches) / len(all_matches), 1)
    else:
        avg_readiness = 0

    # Recent students (last 10)
    recent_students = User.query.filter_by(role='student').order_by(
        User.created_at.desc()
    ).limit(10).all()

    # Top career matches count
    from sqlalchemy import func
    top_careers = db.session.query(
        CareerRole.title,
        func.count(CareerMatch.id).label('count')
    ).join(CareerMatch, CareerMatch.career_id == CareerRole.id
    ).group_by(CareerRole.id
    ).order_by(func.count(CareerMatch.id).desc()
    ).limit(5).all()

    return render_template('admin/dashboard.html',
                           total_students=total_students,
                           total_careers=total_careers,
                           total_resumes=total_resumes,
                           analyzed=analyzed,
                           pending=pending,
                           failed=failed,
                           avg_readiness=avg_readiness,
                           recent_students=recent_students,
                           top_careers=top_careers)


@admin_bp.route('/students')
@admin_required
def students():
    page = request.args.get('page', 1, type=int)
    query = request.args.get('q', '')

    students_q = User.query.filter_by(role='student')
    if query:
        students_q = students_q.filter(
            User.name.ilike(f'%{query}%') | User.email.ilike(f'%{query}%')
        )

    students_paginated = students_q.order_by(User.created_at.desc()).paginate(
        page=page, per_page=15, error_out=False
    )

    return render_template('admin/students.html',
                           students=students_paginated,
                           query=query)


@admin_bp.route('/students/<int:user_id>')
@admin_required
def student_detail(user_id):
    student = User.query.get_or_404(user_id)
    resume = Resume.query.filter_by(user_id=user_id, status='done').order_by(
        Resume.uploaded_at.desc()
    ).first()
    matches = CareerMatch.query.filter_by(user_id=user_id).order_by(
        CareerMatch.match_pct.desc()
    ).all()
    extracted_skills = [es.skill_name for es in resume.extracted_skills] if resume else []
    return render_template('admin/student_detail.html',
                           student=student,
                           resume=resume,
                           matches=matches,
                           extracted_skills=extracted_skills)


@admin_bp.route('/careers', methods=['GET', 'POST'])
@admin_required
def careers():
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        department = request.form.get('department', '').strip()
        description = request.form.get('description', '').strip()
        salary_range = request.form.get('salary_range', '').strip()
        skills_raw = request.form.get('skills', '')  # comma separated

        if not title:
            flash('Career title is required.', 'danger')
        else:
            career = CareerRole(
                title=title,
                department=department,
                description=description,
                salary_range=salary_range
            )
            db.session.add(career)
            db.session.flush()

            for skill_str in skills_raw.split(','):
                skill_str = skill_str.strip()
                if skill_str:
                    cs = CareerSkill(
                        career_id=career.id,
                        skill_name=skill_str,
                        is_required=True,
                        weight=0.7
                    )
                    db.session.add(cs)

            db.session.commit()
            flash(f'Career role "{title}" added successfully!', 'success')
            return redirect(url_for('admin.careers'))

    careers = CareerRole.query.order_by(CareerRole.title).all()
    return render_template('admin/careers.html', careers=careers)


@admin_bp.route('/careers/delete/<int:career_id>', methods=['POST'])
@admin_required
def delete_career(career_id):
    career = CareerRole.query.get_or_404(career_id)
    db.session.delete(career)
    db.session.commit()
    flash(f'Career "{career.title}" deleted.', 'info')
    return redirect(url_for('admin.careers'))


@admin_bp.route('/analyze/<int:resume_id>', methods=['POST'])
@admin_required
def analyze_resume(resume_id):
    """Admin-triggered re-analysis of a resume."""
    from app.routes.resume import do_upload
    resume = Resume.query.get_or_404(resume_id)
    flash(f'Re-analysis triggered for resume #{resume_id}.', 'info')
    return redirect(url_for('admin.students'))
