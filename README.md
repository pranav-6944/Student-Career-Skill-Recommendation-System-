# CareerPath AI — Student Career & Skill Recommendation System

CareerPath AI is an intelligent career guidance platform designed for college students. It analyzes student resumes (PDF/DOCX) using NLP, extracts technical skills, education, and project experience, and compares them against predefined career role standards to compute match percentages, identify skill gaps, and provide curated learning roadmaps.

---

## 🌟 Key Features

- **📄 NLP Resume Parsing & Scoring**: Parses PDF and DOCX files to extract skills using advanced natural language processing (spaCy) and provides a resume score.
- **🎯 Career Matching Engine**: Calculates weighted match scores across multiple career paths (Data Analyst, Software Developer, ML Engineer, Web Developer, etc.).
- **📊 Skill Gap Analysis**: Breaks down matched vs. missing skills for any target career with priority tagging (High/Medium).
- **📚 Curated Learning Paths**: Pairs missing skills directly with courses from Coursera, Udemy, YouTube, and Mode Analytics.
- **👨‍💼 Admin Management Panel**: Provides real-time platform statistics, student directory management, and custom career role CRUD operations.
- **🔐 Secure Authentication**: Includes full user authentication with secure password hashing (`bcrypt`) and persistent session management.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend API**: Python 3.10+, FastAPI, Uvicorn
- **Database**: SQLite (`careerpath.db`), SQLAlchemy ORM
- **NLP & Document Extraction**: `spaCy`, `PyPDF2`, `python-docx`
- **Authentication**: `bcrypt`

---

## 🚀 Quick Start Guide

This project is separated into a frontend (React/Vite) and a backend (FastAPI). **You must run both simultaneously** for the application to work.

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)

### 2. Backend Setup (FastAPI)

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
```

Create a virtual environment:
```bash
# On Windows
python -m venv venv
.\venv\Scripts\activate

# On Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

Install the required Python packages:
```bash
pip install -r requirements.txt
```

Download the spaCy English NLP model:
```bash
python -m spacy download en_core_web_sm
```

Run the FastAPI server:
```bash
python main.py
```
*The backend API will now be running at `http://localhost:8000`.*

### 3. Frontend Setup (React / Vite)

Open a **new** terminal and stay in the root directory:

```bash
# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
*(If `npm run dev` doesn't work, you can start it on port 3000 explicitly using `node "node_modules/vite/bin/vite.js" --port 3000`)*

*The frontend UI will now be running at `http://localhost:3000`.*

---

## 🔑 Using the Platform

1. **Access the App**: Navigate to `http://localhost:3000` in your web browser.
2. **Sign Up**: Click "Go to App" and select "Sign up for free". Create a new account with your email and password.
3. **Upload Resume**: Go to the Dashboard and upload a PDF or DOCX resume. The Python backend will extract your skills and save them to your profile.
4. **View Profile**: Navigate to the "Profile" tab to view and update your University, Degree, and CGPA. This data is securely stored in the SQLite database.

---

## 📂 Project Structure

```
├── backend/
│   ├── main.py          # FastAPI application entry point & routes
│   ├── database.py      # SQLAlchemy engine setup
│   ├── models.py        # SQLite Database tables (User, Profile)
│   ├── schemas.py       # Pydantic validation schemas
│   ├── nlp_engine.py    # spaCy NLP processing logic
│   ├── parsers.py       # PDF and DOCX extraction utilities
│   └── requirements.txt # Python dependencies
├── components/          # React UI components (Dashboard, Authentication, etc.)
├── src/                 # React context (theme, sessions) and global CSS
├── public/              # Static assets (favicons)
├── package.json         # Node.js dependencies
└── vite.config.ts       # Vite bundler configuration
```
