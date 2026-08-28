# AI_NOTES.md - Student Career & Skill Recommendation System

## Project Overview
- **Name**: CareerPath AI - Student Career & Skill Recommendation System
- **Design Tool**: Google Stitch MCP (Gemini 3.1 Pro)
- **Stitch Project ID**: 8714857041009259942
- **Design System ID**: assets/332433763138960182
- **GitHub Repository**: https://github.com/pranav-6944/Student-Career-Skill-Recommendation-System-.git


## Stitch Screens Generated
All screens located at: Downloads\Main Projects\Student Career & Skill Recommendation System\stitch_student_career_skill_recommendation_system\

| Folder | Screen | Screen ID |
|--------|--------|-----------|
| careerpath_ai_landing_page | Landing Page | 06650bdf98824afe84c5467e8b043133 |
| student_dashboard_ashwini_kate | Dashboard | 505828e7e5bf4f889f0cfd91d541c7a3 |
| resume_upload_analysis_careerpath_ai | Resume Upload | 0dfeae3c574e493ca7b290646697d1d3 |
| career_matches_careerpath_ai | Career Matches | 4ed85774cb5c465182842144728d907c |
| skill_gap_analysis_careerpath_ai | Skill Gap | 47b5391278ec4316af6aab28991b3d94 |
| learning_recommendations_careerpath_ai | Learning | 86e609ff27ff41c09fe69afc86ed2a1a |
| admin_overview_careerpath_ai | Admin Dashboard | d9726b05466942cfb6c9249aa47dc80f |
| careerpath_ai_logo | Logo Asset | 85ffb84dff2d4fc0b3f5b4f7cf42e205 |

## Design Tokens
- Primary: #4F46E5 (Indigo)
- Secondary: #7C3AED (Purple)
- Success (matched skills): #10B981
- Warning (missing skills): #F59E0B
- Headline Font: Plus Jakarta Sans 700
- Body Font: Inter
- Corner Radius: 8px
- Card BG: #FFFFFF | Page BG: #F8FAFC

## Sample Data Used
- Student: Ashwini Kate, B.Sc Computer Science, 3rd Year
- Skills: Python, SQL, Pandas, NumPy, Power BI, Excel
- Top Career: Data Analyst - 82% Match
- Missing Skills: Statistics, Advanced Excel
- Resume Score: 72/100
- Career Readiness: 68%
- Admin: Prof. Rajesh Kumar

## User Flow
Landing → Register/Login → Dashboard → Resume Upload → Analysis → Career Matches → Skill Gap → Learning Recommendations

## Implementation Status: COMPLETED

### Project Structure & File Map
- **App Factory & Entry Point**:
  - `run.py` (L1-8): Entry point (`python run.py`)
  - `config.py` (L1-17): Flask config (`careerpath.db`, upload limits)
  - `app/__init__.py` (L1-30): Flask factory, SQLAlchemy, Flask-Login setup
- **Database Models (`app/models.py`)**:
  - `User` (L14-34): Authentication & roles (`student`, `admin`)
  - `StudentProfile` (L36-49): Degree, university, CGPA, year
  - `Resume` (L51-66): Uploaded file info, parsed text, score, status
  - `ExtractedSkill` (L68-77): NLP extracted skills per resume
  - `CareerRole` (L79-95): Role title, department, description, salary
  - `CareerSkill` (L97-107): Skills required per career with weights
  - `CareerMatch` (L109-138): Match percentage, matched/missing skills JSON
  - `LearningResource` (L140-154): Course recommendations, platforms, URLs
- **Backend Services**:
  - `app/services/resume_parser.py` (L1-105): PyPDF2 & python-docx extraction, section parsing, 0-100 scoring engine
  - `app/services/skill_extractor.py` (L1-67): PhraseMatcher & vocabulary matching against `data/skills_db.json`
  - `app/services/career_matcher.py` (L1-65): Weighted skill intersection algorithm (`compute_match`, `match_all_careers`)
  - `app/services/gap_analyzer.py` (L1-80): Skill gap breakdown and course recommendation mapping
- **Routes & Blueprints**:
  - `app/routes/auth.py`: `/login`, `/register`, `/logout`
  - `app/routes/student.py`: `/student/dashboard`, `/student/profile`, `/student/career-matches`, `/student/skill-gap`, `/student/learning`
  - `app/routes/resume.py`: `/resume/`, `/resume/upload`, `/resume/analysis`
  - `app/routes/admin.py`: `/admin/`, `/admin/students`, `/admin/students/<id>`, `/admin/careers`
- **Templates (`app/templates/`)**:
  - `base.html`: Shared Tailwind + Google Fonts + Material Symbols layout + global `toggleMobileMenu()` JavaScript drawer script.
  - `partials/student_sidebar.html`: Responsive student navigation with desktop sidebar, mobile sticky top bar, and backdrop drawer.
  - `partials/admin_sidebar.html`: Responsive admin navigation with desktop sidebar, mobile sticky top bar, and backdrop drawer.
  - `auth/login.html`, `auth/register.html`: Touch-friendly forms with responsive grid stacking.
  - `student/`: Dashboard, Resume Upload, Career Matches, Skill Gap, Learning Path, Profile with mobile-friendly card grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
  - `admin/`: Overview, Students, Careers, Student Detail with horizontally scrollable tables and responsive action buttons.
- **Seed Script (`seed_db.py`)**: Populates 10 career roles, 20+ courses, 60+ master skills, admin user & demo student.


## Test Credentials
- **Admin**: `admin@careerpath.ai` / `admin123`
- **Student**: `ashwini@student.com` / `student123`

## Running the Application
```powershell
python seed_db.py
python run.py
```
App runs at: `http://127.0.0.1:5000`

