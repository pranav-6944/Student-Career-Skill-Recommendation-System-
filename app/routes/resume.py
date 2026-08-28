import os
import uuid
from datetime import datetime
from flask import (Blueprint, render_template, redirect, url_for,
                   flash, request, current_app)
from flask_login import login_required, current_user
from app import db
from app.models import Resume, ExtractedSkill, CareerMatch, CareerRole
from app.services.resume_parser import parse_resume, extract_sections, score_resume
from app.services.skill_extractor import extract_skills, get_skill_names
from app.services.career_matcher import match_all_careers

resume_bp = Blueprint('resume', __name__, url_prefix='/resume')

ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@resume_bp.route('/', methods=['GET'])
@login_required
def upload():
    # Get latest resume for status display
    latest = Resume.query.filter_by(
        user_id=current_user.id
    ).order_by(Resume.uploaded_at.desc()).first()
    return render_template('student/resume_upload.html', latest_resume=latest)


@resume_bp.route('/upload', methods=['POST'])
@login_required
def do_upload():
    if 'resume' not in request.files:
        flash('No file selected.', 'danger')
        return redirect(url_for('resume.upload'))

    file = request.files['resume']

    if file.filename == '':
        flash('No file selected.', 'danger')
        return redirect(url_for('resume.upload'))

    if not allowed_file(file.filename):
        flash('Only PDF, DOCX, and DOC files are allowed.', 'danger')
        return redirect(url_for('resume.upload'))

    # Save file with unique name
    original_name = file.filename
    ext = original_name.rsplit('.', 1)[1].lower()
    unique_name = f"{current_user.id}_{uuid.uuid4().hex[:8]}_{original_name}"
    upload_folder = current_app.config['UPLOAD_FOLDER']
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, unique_name)
    file.save(filepath)

    # Create Resume record (status: processing)
    resume_record = Resume(
        user_id=current_user.id,
        filename=unique_name,
        original_filename=original_name,
        status='processing'
    )
    db.session.add(resume_record)
    db.session.commit()

    # --- Run analysis synchronously ---
    try:
        # 1. Parse text
        raw_text = parse_resume(filepath)

        if not raw_text.strip():
            resume_record.status = 'failed'
            db.session.commit()
            flash('Could not extract text from the resume. Please try a different file.', 'danger')
            return redirect(url_for('resume.upload'))

        # 2. Extract sections & skills
        sections = extract_sections(raw_text)
        skills_found = extract_skills(raw_text)
        skill_names = [s['skill'] for s in skills_found]

        # 3. Score resume
        resume_score = score_resume(sections, skill_names)

        # 4. Save parsed data
        resume_record.parsed_text = raw_text
        resume_record.resume_score = resume_score

        # 5. Delete old extracted skills for this user's resumes
        old_resumes = Resume.query.filter_by(user_id=current_user.id).filter(
            Resume.id != resume_record.id
        ).all()

        # 6. Save extracted skills
        for s in skills_found:
            es = ExtractedSkill(
                resume_id=resume_record.id,
                skill_name=s['skill'],
                confidence=s['confidence']
            )
            db.session.add(es)

        # 7. Match against all careers & save
        careers = CareerRole.query.all()
        # Delete old matches for this user
        CareerMatch.query.filter_by(user_id=current_user.id).delete()

        match_results = match_all_careers(skill_names, careers)
        for r in match_results:
            cm = CareerMatch(
                user_id=current_user.id,
                career_id=r['career'].id,
                match_pct=r['match_pct'],
                computed_at=datetime.utcnow()
            )
            cm.matched_skills = r['matched']
            cm.missing_skills = r['missing']
            db.session.add(cm)

        resume_record.status = 'done'
        db.session.commit()

        flash(f'Resume analyzed successfully! Found {len(skill_names)} skills. Score: {resume_score}/100', 'success')
        return redirect(url_for('student.dashboard'))

    except Exception as e:
        db.session.rollback()
        resume_record.status = 'failed'
        try:
            db.session.commit()
        except Exception:
            pass
        flash(f'Analysis failed: {str(e)}', 'danger')
        return redirect(url_for('resume.upload'))


@resume_bp.route('/analysis')
@login_required
def analysis():
    resume = Resume.query.filter_by(
        user_id=current_user.id
    ).order_by(Resume.uploaded_at.desc()).first()

    if not resume:
        flash('No resume found. Please upload one.', 'warning')
        return redirect(url_for('resume.upload'))

    extracted_skills = [es.skill_name for es in resume.extracted_skills]
    career_matches = CareerMatch.query.filter_by(
        user_id=current_user.id
    ).order_by(CareerMatch.match_pct.desc()).limit(5).all()

    return render_template('student/resume_upload.html',
                           latest_resume=resume,
                           extracted_skills=extracted_skills,
                           career_matches=career_matches)
