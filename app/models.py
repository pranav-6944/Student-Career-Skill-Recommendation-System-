from datetime import datetime
import json
from app import db, login_manager
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='student')   # 'student' | 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    profile = db.relationship('StudentProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    resumes = db.relationship('Resume', backref='user', lazy=True, cascade='all, delete-orphan')
    career_matches = db.relationship('CareerMatch', backref='user', lazy=True, cascade='all, delete-orphan')

    def __init__(self, name=None, email=None, role='student', **kwargs):
        super().__init__(**kwargs)
        if name: self.name = name
        if email: self.email = email
        if role: self.role = role

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'


class StudentProfile(db.Model):
    __tablename__ = 'student_profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    degree = db.Column(db.String(100))
    university = db.Column(db.String(150))
    cgpa = db.Column(db.Float)
    year = db.Column(db.Integer)          # 1, 2, 3, 4
    phone = db.Column(db.String(20))
    linkedin = db.Column(db.String(200))
    github = db.Column(db.String(200))

    def __init__(self, user_id=None, degree=None, university=None, cgpa=None, year=None, phone=None, linkedin=None, github=None, **kwargs):
        super().__init__(**kwargs)
        if user_id: self.user_id = user_id
        if degree: self.degree = degree
        if university: self.university = university
        if cgpa is not None: self.cgpa = cgpa
        if year: self.year = year
        if phone: self.phone = phone
        if linkedin: self.linkedin = linkedin
        if github: self.github = github

    def __repr__(self):
        return f'<Profile {self.degree}>'


class Resume(db.Model):
    __tablename__ = 'resumes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    original_filename = db.Column(db.String(200))
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    parsed_text = db.Column(db.Text)
    resume_score = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='pending')  # pending|processing|done|failed

    # Relationships
    extracted_skills = db.relationship('ExtractedSkill', backref='resume', lazy=True, cascade='all, delete-orphan')

    def __init__(self, user_id=None, filename=None, original_filename=None, parsed_text=None, resume_score=0, status='pending', **kwargs):
        super().__init__(**kwargs)
        if user_id: self.user_id = user_id
        if filename: self.filename = filename
        if original_filename: self.original_filename = original_filename
        if parsed_text: self.parsed_text = parsed_text
        if resume_score: self.resume_score = resume_score
        if status: self.status = status

    def __repr__(self):
        return f'<Resume {self.filename}>'


class ExtractedSkill(db.Model):
    __tablename__ = 'extracted_skills'

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resumes.id'), nullable=False)
    skill_name = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Float, default=1.0)

    def __init__(self, resume_id=None, skill_name=None, confidence=1.0, **kwargs):
        super().__init__(**kwargs)
        if resume_id: self.resume_id = resume_id
        if skill_name: self.skill_name = skill_name
        if confidence: self.confidence = confidence

    def __repr__(self):
        return f'<Skill {self.skill_name}>'


class CareerRole(db.Model):
    __tablename__ = 'career_roles'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100))
    description = db.Column(db.Text)
    salary_range = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    skills = db.relationship('CareerSkill', backref='career', lazy=True, cascade='all, delete-orphan')
    matches = db.relationship('CareerMatch', backref='career', lazy=True, cascade='all, delete-orphan')

    def __init__(self, title=None, department=None, description=None, salary_range=None, **kwargs):
        super().__init__(**kwargs)
        if title: self.title = title
        if department: self.department = department
        if description: self.description = description
        if salary_range: self.salary_range = salary_range

    def get_skill_names(self):
        return [s.skill_name for s in self.skills]

    def __repr__(self):
        return f'<CareerRole {self.title}>'


class CareerSkill(db.Model):
    __tablename__ = 'career_skills'

    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey('career_roles.id'), nullable=False)
    skill_name = db.Column(db.String(100), nullable=False)
    is_required = db.Column(db.Boolean, default=True)
    weight = db.Column(db.Float, default=0.5)   # 0.0 – 1.0

    def __init__(self, career_id=None, skill_name=None, is_required=True, weight=0.5, **kwargs):
        super().__init__(**kwargs)
        if career_id: self.career_id = career_id
        if skill_name: self.skill_name = skill_name
        self.is_required = is_required
        if weight is not None: self.weight = weight

    def __repr__(self):
        return f'<CareerSkill {self.skill_name}>'


class CareerMatch(db.Model):
    __tablename__ = 'career_matches'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    career_id = db.Column(db.Integer, db.ForeignKey('career_roles.id'), nullable=False)
    match_pct = db.Column(db.Float, default=0.0)
    _matched_skills = db.Column('matched_skills', db.Text, default='[]')
    _missing_skills = db.Column('missing_skills', db.Text, default='[]')
    computed_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_id=None, career_id=None, match_pct=0.0, computed_at=None, **kwargs):
        super().__init__(**kwargs)
        if user_id: self.user_id = user_id
        if career_id: self.career_id = career_id
        if match_pct is not None: self.match_pct = match_pct
        if computed_at: self.computed_at = computed_at

    @property
    def matched_skills(self):
        return json.loads(self._matched_skills or '[]')

    @matched_skills.setter
    def matched_skills(self, value):
        self._matched_skills = json.dumps(value)

    @property
    def missing_skills(self):
        return json.loads(self._missing_skills or '[]')

    @missing_skills.setter
    def missing_skills(self, value):
        self._missing_skills = json.dumps(value)

    def __repr__(self):
        return f'<CareerMatch {self.match_pct:.1f}%>'


class LearningResource(db.Model):
    __tablename__ = 'learning_resources'

    id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(100), nullable=False)
    course_title = db.Column(db.String(200), nullable=False)
    platform = db.Column(db.String(100))
    url = db.Column(db.String(500))
    duration = db.Column(db.String(50))
    level = db.Column(db.String(50))
    rating = db.Column(db.Float)
    is_free = db.Column(db.Boolean, default=False)
    priority = db.Column(db.String(20), default='medium')  # high|medium|low

    def __init__(self, skill_name=None, course_title=None, platform=None, url=None, duration=None, level=None, rating=None, is_free=False, priority='medium', **kwargs):
        super().__init__(**kwargs)
        if skill_name: self.skill_name = skill_name
        if course_title: self.course_title = course_title
        if platform: self.platform = platform
        if url: self.url = url
        if duration: self.duration = duration
        if level: self.level = level
        if rating is not None: self.rating = rating
        self.is_free = is_free
        if priority: self.priority = priority

    def __repr__(self):
        return f'<Resource {self.course_title}>'
