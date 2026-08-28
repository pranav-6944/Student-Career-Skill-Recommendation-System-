# CareerPath AI — Student Career & Skill Recommendation System

CareerPath AI is an intelligent career guidance platform designed for college students. It analyzes student resumes (PDF/DOCX) using NLP, extracts technical skills, education, and project experience, and compares them against predefined career role standards to compute match percentages, identify skill gaps, and provide curated learning roadmaps.

---

## 🌟 Key Features

- **📄 NLP Resume Parsing & Scoring**: Parses PDF and DOCX files to extract skills, education, work experience, projects, and certifications, scoring resume quality from 0–100.
- **🎯 Career Matching Engine**: Calculates weighted match scores across multiple career paths (Data Analyst, Software Developer, ML Engineer, Web Developer, etc.).
- **📊 Skill Gap Analysis**: Breaks down matched vs. missing skills for any target career with priority tagging (High/Medium).
- **📚 Curated Learning Paths**: Pairs missing skills directly with courses from Coursera, Udemy, YouTube, and Mode Analytics.
- **👨‍💼 Admin Management Panel**: Provides real-time platform statistics, student directory management, and custom career role CRUD operations.

---

## 🛠️ Technology Stack

- **Backend**: Flask 3.x, Python 3.13, SQLAlchemy, Werkzeug, Flask-Login
- **NLP & Document Extraction**: `PyPDF2`, `python-docx`, Phrase matching
- **Frontend**: HTML5, Jinja2 Templating, Tailwind CSS, Google Fonts, Material Symbols
- **Database**: SQLite (`careerpath.db`)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Python 3.10+** installed.

### 2. Installation
Clone the repository and install requirements:
```bash
git clone https://github.com/pranav-6944/Student-Career-Skill-Recommendation-System-.git
cd Student-Career-Skill-Recommendation-System-
pip install -r requirements.txt
```

### 3. Database Seeding
Initialize the database with sample career roles, master skills, learning courses, and default accounts:
```bash
python seed_db.py
```

### 4. Run the Server
Launch the Flask development server:
```bash
python run.py
```

Open your browser and navigate to `http://127.0.0.1:5000`.

---

## 🔑 Default Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@careerpath.ai` | `admin123` |
| **Demo Student** | `ashwini@student.com` | `student123` |

---

## 📂 Project Structure

```
├── app/
│   ├── routes/          # Auth, Student, Resume, Admin blueprints
│   ├── services/        # Resume parser, Skill extractor, Career matcher, Gap analyzer
│   ├── templates/       # Jinja2 templates for all UI views
│   ├── static/          # CSS, images, and user upload directory
│   └── models.py        # SQLAlchemy database schemas
├── data/
│   ├── careers.json     # Predefined career roles & required skills
│   ├── skills_db.json   # Master skill vocabulary & aliases
│   └── courses.json     # Curated learning resources
├── config.py            # Flask configuration
├── run.py               # Entry point
├── seed_db.py           # Database seeder script
└── requirements.txt     # Dependencies
```
