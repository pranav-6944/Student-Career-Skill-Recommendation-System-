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

    def __repr__(self):
        return f'<Resume {self.filename}>'


class ExtractedSkill(db.Model):
    __tablename__ = 'extracted_skills'

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resumes.id'), nullable=False)
    skill_name = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Float, default=1.0)

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

    def __repr__(self):
        return f'<Resource {self.course_title}>'
