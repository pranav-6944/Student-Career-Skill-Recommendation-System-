<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/graduation-cap.svg" width="80" alt="Logo">
  <br>
  <h1>CareerPath AI 🚀</h1>
  <p><b>Intelligent Career Guidance & Skill Recommendation System for College Students</b></p>
  <p>
    <img src="https://img.shields.io/badge/Frontend-React_18-blue?style=flat-square&logo=react" alt="React">
    <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi" alt="FastAPI">
    <img src="https://img.shields.io/badge/AI_Engine-Gemini_2.5_Flash-4285F4?style=flat-square&logo=google" alt="Gemini AI">
    <img src="https://img.shields.io/badge/Database-SQLite-003B57?style=flat-square&logo=sqlite" alt="SQLite">
  </p>
</div>

<hr />

## 📖 Table of Contents
- [🎯 Aim and Purpose](#-aim-and-purpose)
- [🚩 The Problem](#-the-problem)
- [💡 The Solution](#-the-solution)
- [✨ Key Features](#-key-features)
- [🏆 Objectives & Outcomes](#-objectives--outcomes)
- [🛠️ Technology Stack](#-technology-stack)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [🔑 How to Use](#-how-to-use)

---

## 🎯 Aim and Purpose

### 🎯 Aim
To **democratize access to personalized, high-quality career counseling** using Artificial Intelligence, enabling students to seamlessly navigate the complex transition from academia to the professional tech industry.

### 🌟 Purpose
Many students graduate with degrees but lack the targeted skills demanded by the modern job market. **CareerPath AI** serves as an automated, intelligent mentor. It reads a student's resume, identifies exact missing skills, and provides a customized, step-by-step roadmap to acquire them.

---

## 🚩 The Problem
| Challenge | Description |
| :--- | :--- |
| **📉 The Skill Gap** | University curricula often lag behind rapidly evolving industry standards (e.g., Cloud Computing, DevOps, AI). |
| **🤯 Overwhelming Choices** | Students are bombarded with thousands of potential career paths (Data Scientist, ML Engineer, DevOps, Frontend) without knowing which fits their current skills. |
| **💤 Generic Advice** | Traditional career counseling is often generic and not tailored to a student's specific technical background and achievements. |

---

## 💡 The Solution

CareerPath AI provides a **hyper-personalized, data-driven approach** to career building:

1. **📄 Intelligent Resume Parsing:** Extracts exact technical skills using Google's Gemini AI directly from your PDF or DOCX resume.
2. **⚖️ Profile Evaluation:** Compares your extracted skills against predefined, industry-standard career profiles to calculate a precise "Match Percentage".
3. **🤖 Dynamic Career Synthesis:** If you don't perfectly match standard roles, the AI dynamically invents a highly accurate, custom career role tailored specifically to your unique skill set.
4. **🗺️ Actionable Roadmaps:** Generates a custom 3-to-5 step learning path (complete with course names, platforms, and durations) to teach you the exact skills you are missing.

---

## ✨ Key Features

- 🧠 **AI-Powered Extraction:** 100% serverless AI integration bypassing legacy NLP libraries for instant text parsing.
- 🎨 **Beautiful UI/UX:** A stunning dark-mode optimized interface built with Tailwind CSS and Lucide icons.
- 🔐 **Secure Authentication:** Complete user lifecycle management with Bcrypt password hashing.
- 👨‍💼 **Admin Dashboard:** Role-based access control allowing administrators to add, edit, and delete standard career paths in real-time.

---

## 🏆 Objectives & Outcomes

### 📌 Objectives:
- To seamlessly extract technical skills from unstructured documents.
- To maintain an up-to-date administrative database of industry-standard career roles.
- To utilize **Generative AI (Gemini 2.5 Flash)** for dynamic career synthesis and intelligent curriculum design.
- To provide a beautiful, responsive, and intuitive dashboard for students to track their career progress.

### 🌟 Outcomes:
- **For Students:** Clarity on their current market value, a specific target job title, and a free, actionable learning roadmap to get hired.
- **For Educators & Admins:** A high-level overview of student skill trends and the ability to update target career profiles as the industry evolves.

---

## 🛠️ Technology Stack

Our modern, decoupled architecture ensures high performance and maintainability.

### 🎨 Frontend
- **React 18 & TypeScript:** Robust, type-safe user interface.
- **Vite:** Blazing fast frontend tooling and bundling.
- **Tailwind CSS:** Utility-first CSS framework for beautiful, responsive design.
- **Lucide React:** Beautiful SVG icons.

### ⚙️ Backend
- **Python 3.10+ & FastAPI:** High-performance async backend framework.
- **SQLite & SQLAlchemy:** Lightweight, reliable relational database and ORM.
- **Google Gemini AI:** Advanced Resume Parsing, Career Synthesis, and Learning Path Generation via `httpx` REST API.
- **pdfplumber & python-docx:** Robust document text extraction.
- **Bcrypt:** Secure password hashing.

---

## 🚀 Quick Start Guide

This project is separated into a frontend (`React/Vite`) and a backend (`FastAPI`). **You must run both simultaneously** for the application to function correctly.

### 1️⃣ Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)
- **Gemini API Key:** Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).

### 2️⃣ Backend Setup (FastAPI)

Open a terminal and navigate to the `backend` directory:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
# On Windows
python -m venv venv
.\venv\Scripts\activate

# On Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Set up your Environment Variables:
Create a `.env` file in the `backend` folder and add your Gemini API key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Run the backend server:
```bash
python main.py
```
*The backend API will run at `http://localhost:8000`.*

### 3️⃣ Frontend Setup (React / Vite)

Open a **new** terminal and stay in the root directory:

```bash
# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
*(If `npm run dev` fails, start it explicitly using `node node_modules/vite/bin/vite.js`)*

*The frontend UI will run at `http://localhost:5173` (or the port Vite assigns).*

---

## 🔑 How to Use

1. 🌐 **Access the App:** Open the URL provided by Vite in your browser.
2. ✍️ **Sign Up:** Click "Go to App" -> "Sign up for free". Create a new student account.
3. 📄 **Upload Resume:** Go to your Dashboard and upload a PDF/DOCX resume. The Gemini AI engine will extract your skills in seconds.
4. 🔍 **Discover Careers:** Navigate to the "Careers" tab to view match percentages for standard roles, or let the AI synthesize a custom role based on your exact profile.
5. 📚 **Learn & Grow:** Go to the "Learning Paths" tab to generate a custom curriculum designed to fill your specific skill gaps.

---
<div align="center">
  <i>Built with ❤️ for students stepping into the tech industry.</i>
</div>
