# Strix Security Testing Guide for Student Career & Skill Recommendation System

This guide explains how to use Strix to security test the Student Career & Skill Recommendation System (CareerPath AI).

## Application Overview

CareerPath AI is a Flask-based web application that:
- Parses resumes (PDF/DOCX) using NLP (PyPDF2, python-docx)
- Extracts skills and matches against career roles
- Provides skill gap analysis and learning recommendations
- Includes admin management panel
- Uses SQLite database for storage
- Has a React/Vite frontend with Tailwind CSS

## Setup Instructions

### 1. Install Docker
- Download from: https://www.docker.com/products/docker-desktop/
- Install and ensure Docker daemon is running
- Verify installation: `docker --version`

### 2. Clone and Setup the Application (if not already done)
```bash
git clone https://github.com/pranav-6944/Student-Career-Skill-Recommendation-System-.git
cd Student-Career-Skill-Recommendation-System-
pip install -r requirements.txt
python seed_db.py  # Initialize database with sample data
```

### 3. Start the Application Backend
```bash
python run.py  # Starts Flask server on http://127.0.0.1:5000
```

## Running Strix Security Tests

### Basic Web Application Test
```bash
strix --target http://127.0.0.1:5000 --non-interactive
```

### Comprehensive Test with Skills
```bash
strix --target http://127.0.0.1:5000 \
      --skills sql_injection xss broken_auth ssrf \
      --non-interactive \
      --max-budget-usd 5.0
```

### Test with Authentication (if needed)
```bash
strix --target http://127.0.0.1:5000 \
      --auth-url http://127.0.0.1:5000/login \
      --auth-username admin@careerpath.ai \
      --auth-password admin123 \
      --skills sql_injection broken_auth \
      --non-interactive
```

## What Strix Will Test For

Given the technologies used in CareerPath AI, Strix will focus on:

### Backend (Flask/Python) Vulnerabilities:
- **SQL Injection** - In resume parsing or career matching queries
- **File Upload Vulnerabilities** - In resume upload functionality (PDF/DOCX)
- **Command Injection** - In NLP processing or document conversion
- **Path Traversal** - In file access or download functionality
- **Insecure Direct Object References (IDOR)** - In student/resume access
- **Authentication Bypass** - In admin panel or student login
- **Session Management Issues** - In Flask-Login implementation
- **Sensitive Data Exposure** - In database or API responses
- **Missing Input Validation** - In resume data or skill extraction

### Frontend (React/Vite) Vulnerabilities:
- **Cross-Site Scripting (XSS)** - In skill display or career recommendations
- **Cross-Site Request Forgery (CSRF)** - If API endpoints lack protection
- **Client-Side Logic Flaws** - In skill gap calculation or learning path generation

### Infrastructure Vulnerabilities:
- **Container Escapes** - If using Docker for deployment
- **Information Disclosure** - In error messages or debug endpoints
- **Insecure Configurations** - In Flask or production settings

## Expected Output

Strix will generate:
1. **Real-time findings** displayed during the scan
2. **Vulnerability reports** in `strix_runs/<timestamp>/vulnerability-reports/`
3. **Executive summary** in PDF format
4. **Remediation guidance** for each finding
5. **Proof-of-concept (PoC)** requests for each vulnerability

## Sample Vulnerabilities That Might Be Found

Based on similar applications, Strix might identify:

1. **CVE-2023-XXXX: SQL Injection in Resume Parser**
   - Location: `/upload-resume` endpoint
   - Impact: Database access, potential RCE
   - PoC: `'; UNION SELECT version(), user(), database()--`

2. **CVE-2023-XXXX: Path Traversal in Download Endpoint**
   - Location: `/download-resume/<id>` 
   - Impact: Arbitrary file read on server
   - PoC: `../../etc/passwd`

3. **CVE-2023-XXXX: XSS in Skill Display**
   - Location: Skill recommendation view
   - Impact: Session hijacking, malware distribution
   - PoC: `<script>alert('XSS')</script>` in resume skills

4. **CVE-2023-XXXX: IDOR in Admin Panel**
   - Location: `/admin/student/<id>`
   - Impact: Unauthorized access to student records
   - PoC: Accessing `/admin/student/1` when logged in as student with ID 2

## Remediation Steps

For any vulnerabilities found, Strix will provide specific remediation guidance. General recommendations for this application include:

1. **Use Parameterized Queries** - For all database operations
2. **Validate File Uploads** - Check file type, size, and content
3. **Sanitize User Input** - Especially for PDF/DOCX text extraction
4. **Implement Proper Access Controls** - Check permissions on all endpoints
5. **Use Security Headers** - CSP, X-Frame-Options, etc.
6. **Keep Dependencies Updated** - Regularly update Python/JS packages
7. **Implement Logging and Monitoring** - For suspicious activities
8. **Regular Security Testing** - Integrate Strix into CI/CD pipeline

## CI/CD Integration Example

Add to `.github/workflows/security.yml`:
```yaml
name: Security Scan
on: [push, pull_request]
jobs:
  strix-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and Start App
        run: |
          pip install -r requirements.txt
          python seed_db.py &
          python run.py &
          sleep 10
      - name: Run Strix Scan
        run: strix --target http://localhost:5000 --non-interactive --format sarif --output results.sarif
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: strix-security-report
          path: results.sarif
```

## Important Notes

1. **Only test systems you own or have explicit permission to test**
2. **Strix performs active security testing** - it will send exploit attempts
3. **Monitor resource usage** - Strix can be CPU/memory intensive during scans
4. **Review findings carefully** - Some may require manual verification
5. **Always remediate critical/high findings promptly**

## Troubleshooting

- **Docker issues**: Ensure Docker daemon is running (`docker info`)
- **Connection refused**: Verify the backend is running on the target port
- **Permission errors**: Run Docker commands with appropriate privileges
- **Memory issues**: Increase Docker memory allocation in settings
- **Scan too slow**: Reduce scope with specific skills or lower --max-budget-usd

---

*This guide was generated based on analysis of the CareerPath AI application and Strix capabilities.*