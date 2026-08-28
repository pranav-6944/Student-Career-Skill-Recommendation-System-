"""
Seed script — run once to populate the database with:
1. Admin user: admin@careerpath.ai / admin123
2. Demo student: Ashwini Kate / student123
3. All career roles from data/careers.json
4. All learning resources from data/courses.json

Usage:
    python seed_db.py
"""

import json
import os
import sys

# Make sure project root is in path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models import User, StudentProfile, CareerRole, CareerSkill, LearningResource


def seed():
    app = create_app()

    with app.app_context():
        db.create_all()

        print("[INFO] Seeding database...")

        # ─── 1. Admin User ───
        if not User.query.filter_by(email='admin@careerpath.ai').first():
            admin = User(name='Admin', email='admin@careerpath.ai', role='admin')
            admin.set_password('admin123')
            db.session.add(admin)
            print("  [+] Admin user created: admin@careerpath.ai / admin123")
        else:
            print("  [-] Admin user already exists")

        # ─── 2. Demo Student ───
        if not User.query.filter_by(email='ashwini@student.com').first():
            student = User(name='Ashwini Kate', email='ashwini@student.com', role='student')
            student.set_password('student123')
            db.session.add(student)
            db.session.flush()  # Get student.id

            profile = StudentProfile(
                user_id=student.id,
                degree='B.Sc Computer Science',
                university='Savitribai Phule Pune University',
                cgpa=8.4,
                year=3
            )
            db.session.add(profile)
            print("  [+] Demo student created: ashwini@student.com / student123")
        else:
            print("  [-] Demo student already exists")

        # ─── 3. Career Roles ───
        careers_path = os.path.join(os.path.dirname(__file__), 'data', 'careers.json')
        with open(careers_path, 'r') as f:
            careers_data = json.load(f)

        existing_titles = {c.title for c in CareerRole.query.all()}
        added = 0

        for career_data in careers_data:
            if career_data['title'] in existing_titles:
                continue

            career = CareerRole(
                title=career_data['title'],
                department=career_data.get('department', ''),
                description=career_data.get('description', ''),
                salary_range=career_data.get('salary_range', '')
            )
            db.session.add(career)
            db.session.flush()

            for skill_data in career_data.get('required_skills', []):
                cs = CareerSkill(
                    career_id=career.id,
                    skill_name=skill_data['name'],
                    is_required=skill_data.get('required', True),
                    weight=skill_data.get('weight', 0.5)
                )
                db.session.add(cs)

            added += 1

        print(f"  [+] Career roles added: {added} (skipped {len(existing_titles)} existing)")

        # ─── 4. Learning Resources ───
        courses_path = os.path.join(os.path.dirname(__file__), 'data', 'courses.json')
        with open(courses_path, 'r') as f:
            courses_data = json.load(f)

        existing_courses = {r.course_title for r in LearningResource.query.all()}
        course_added = 0

        for course in courses_data:
            if course['course_title'] in existing_courses:
                continue
            resource = LearningResource(
                skill_name=course['skill_name'],
                course_title=course['course_title'],
                platform=course.get('platform', ''),
                url=course.get('url', '#'),
                duration=course.get('duration', ''),
                level=course.get('level', ''),
                rating=course.get('rating'),
                is_free=course.get('is_free', False),
                priority=course.get('priority', 'medium')
            )
            db.session.add(resource)
            course_added += 1

        print(f"  [+] Learning resources added: {course_added}")

        db.session.commit()
        print("\nDatabase seeded successfully!")
        print("\nLogin credentials:")
        print("   Admin:   admin@careerpath.ai  /  admin123")
        print("   Student: ashwini@student.com  /  student123")
        print("\nRun the app with: python run.py")



if __name__ == '__main__':
    seed()
