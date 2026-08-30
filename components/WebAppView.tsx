import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard, FileText, Briefcase, BarChart2, GraduationCap, User, Shield,
  UploadCloud, CheckCircle2, AlertTriangle, ArrowRight, Search, Plus, Trash2,
  ExternalLink, Star, Award, BookOpen, Clock, Sparkles, Loader2, Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/src/themeContext';

interface CareerRoleItem {
  id: number;
  title: string;
  department: string;
  salary: string;
  matchPct: number;
  matchedSkills: string[];
  missingSkills: string[];
}

interface WebAppViewProps {
  initialMode?: 'webapp' | 'admin';
  onLogout?: () => void;
}

export const WebAppView: React.FC<WebAppViewProps> = ({ initialMode = 'webapp', onLogout }) => {
  const { role, currentUser } = useTheme();

  const [activeView, setActiveView] = useState<'dashboard' | 'resume' | 'careers' | 'gap' | 'learning' | 'profile' | 'admin'>(
    initialMode === 'admin' && role === 'admin' ? 'admin' : 'dashboard'
  );

  // Student Profile State
  const [studentName, setStudentName] = useState(currentUser?.name || 'Student');
  const [degree, setDegree] = useState('B.Sc Computer Science');
  const [university, setUniversity] = useState('Your University');
  const [cgpa, setCgpa] = useState('');
  const [year, setYear] = useState('1');
  const [profileSaveMsg, setProfileSaveMsg] = useState('');

  // Fetch initial profile from backend
  useEffect(() => {
    if (!currentUser?.email) return;
    
    fetch(`http://127.0.0.1:8000/api/profile?email=${encodeURIComponent(currentUser.email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.detail) return; // Error or not found
        setDegree(data.degree || 'B.Sc Computer Science');
        setUniversity(data.university || 'Your University');
        setCgpa(data.cgpa || '');
        setYear(data.year || '1');
        
        if (data.extracted_skills) {
          const skillsArray = data.extracted_skills.split(',').map((s: string) => s.trim()).filter(Boolean);
          if (skillsArray.length > 0) {
            setExtractedSkills(skillsArray);
            setResumeScore(Math.min(100, 50 + (skillsArray.length * 4)));
          }
        }
      })
      .catch(err => console.error("Failed to fetch profile", err));
  }, [currentUser?.email]);

  // Resume & Extracted Skills State
  const [resumeName, setResumeName] = useState('No resume uploaded');
  const [resumeScore, setResumeScore] = useState(0);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Career Filter & Selected Career
  const [selectedCareerId, setSelectedCareerId] = useState<number>(1);
  const [matchFilter, setMatchFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Base Career Definitions
  const [adminCareers, setAdminCareers] = useState([
    {
      id: 1, title: 'Data Analyst', department: 'Data & Analytics', salary: '₹4.5 – 12 LPA',
      targetSkills: ['Python', 'SQL', 'Pandas', 'Excel', 'Power BI', 'Statistics', 'Advanced Excel', 'Tableau']
    },
    {
      id: 2, title: 'Business Analyst', department: 'Business & Strategy', salary: '₹6 – 15 LPA',
      targetSkills: ['Excel', 'SQL', 'Power BI', 'Requirements Analysis', 'JIRA', 'Agile']
    },
    {
      id: 3, title: 'Web Developer', department: 'Web & Mobile', salary: '₹4 – 14 LPA',
      targetSkills: ['HTML', 'JavaScript', 'Git', 'Python', 'React', 'REST APIs', 'Node.js']
    },
    {
      id: 4, title: 'Data Scientist', department: 'AI & Machine Learning', salary: '₹8 – 20 LPA',
      targetSkills: ['Python', 'Pandas', 'NumPy', 'SQL', 'Machine Learning', 'Statistics', 'Scikit-learn', 'TensorFlow']
    },
    {
      id: 5, title: 'Software Developer', department: 'Software Engineering', salary: '₹5 – 18 LPA',
      targetSkills: ['Python', 'Git', 'HTML', 'Data Structures', 'Algorithms', 'JavaScript', 'REST APIs']
    }
  ]);

  // Dynamically compute match percentages and matched/missing skills based on the user's extracted skills
  const careerList: CareerRoleItem[] = React.useMemo(() => {
    return adminCareers.map(career => {
      const lowerExtracted = extractedSkills.map(s => s.toLowerCase());
      const matched = career.targetSkills.filter(s => lowerExtracted.includes(s.toLowerCase()));
      const missing = career.targetSkills.filter(s => !lowerExtracted.includes(s.toLowerCase()));
      const matchPct = career.targetSkills.length > 0 ? Math.round((matched.length / career.targetSkills.length) * 100) : 0;
      
      return {
        id: career.id,
        title: career.title,
        department: career.department,
        salary: career.salary,
        matchPct,
        matchedSkills: matched,
        missingSkills: missing
      };
    }).sort((a, b) => b.matchPct - a.matchPct);
  }, [adminCareers, extractedSkills]);

  const readinessScore = React.useMemo(() => {
    if (careerList.length === 0) return 0;
    const top3 = careerList.slice(0, 3);
    const sum = top3.reduce((acc, curr) => acc + curr.matchPct, 0);
    return (sum / top3.length).toFixed(1);
  }, [careerList]);

  // Admin Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newSkillsStr, setNewSkillsStr] = useState('');

  // Real File Upload & Parser Handler connecting to Python FastAPI
  const handleProcessFile = async (file: File) => {
    setIsParsing(true);
    setUploadSuccessMsg('');
    setResumeName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`http://127.0.0.1:8000/api/extract-resume?email=${encodeURIComponent(currentUser?.email || '')}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract skills from resume. Please ensure the backend is running.');
      }

      const data = await response.json();

      // Update state with actual NLP extracted skills
      if (data.skills && data.skills.length > 0) {
        setExtractedSkills(data.skills);
        // Calculate a dynamic score based on the number of skills found for UI
        setResumeScore(Math.min(100, 50 + (data.skills.length * 4)));
        setUploadSuccessMsg(`Successfully parsed ${file.name} using Real NLP! Found ${data.skills.length} skills.`);
      } else {
        setExtractedSkills([]);
        setResumeScore(30);
        setUploadSuccessMsg(`Parsed ${file.name}, but couldn't find any known technical skills in the text.`);
      }
    } catch (error) {
      console.error(error);
      setUploadSuccessMsg(`Error parsing resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setExtractedSkills([]);
      setResumeScore(0);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleSimulateResumeUpload = (preset: 'datascience' | 'webdev') => {
    setIsParsing(true);
    setUploadSuccessMsg('');
    setTimeout(() => {
      if (preset === 'datascience') {
        setResumeName('Ashwini_Kate_DataScience_CV.pdf');
        setResumeScore(88);
        setExtractedSkills(['Python', 'SQL', 'Pandas', 'NumPy', 'Statistics', 'Power BI', 'Excel', 'Scikit-learn']);
      } else {
        setResumeName('Ashwini_Kate_FullStack_Resume.docx');
        setResumeScore(94);
        setExtractedSkills(['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'REST APIs', 'Python']);
      }
      setIsParsing(false);
      setUploadSuccessMsg('Preset resume successfully loaded and parsed!');
    }, 800);
  };

  const handleAddCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const skills = newSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const newRole = {
      id: Date.now(),
      title: newTitle,
      department: newDept || 'Technology',
      salary: newSalary || '₹5 – 12 LPA',
      targetSkills: skills,
    };
    setAdminCareers([...adminCareers, newRole]);
    setNewTitle('');
    setNewDept('');
    setNewSalary('');
    setNewSkillsStr('');
  };

  const handleDeleteCareer = (id: number) => {
    setAdminCareers(adminCareers.filter(c => c.id !== id));
  };

  const selectedCareer = careerList.find(c => c.id === selectedCareerId) || careerList[0];

  const filteredCareers = careerList.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (matchFilter === 'high') return c.matchPct >= 75;
    if (matchFilter === 'medium') return c.matchPct >= 50 && c.matchPct < 75;
    if (matchFilter === 'low') return c.matchPct < 50;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx,.doc,.txt"
        className="hidden"
      />

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* User Profile Summary Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-white shadow-md">
              {role === 'admin' ? 'AD' : studentName.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {role === 'admin' ? 'Admin Panel' : studentName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {role === 'admin' ? 'Administrator' : degree}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1.5">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveView('resume')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === 'resume' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <FileText className="w-4 h-4" />
              Resume Upload & Parser
            </button>

            <button
              onClick={() => setActiveView('careers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === 'careers' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <Briefcase className="w-4 h-4" />
              Career Matches ({careerList.length})
            </button>

            <button
              onClick={() => setActiveView('gap')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === 'gap' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <BarChart2 className="w-4 h-4" />
              Skill Gap Matrix
            </button>

            <button
              onClick={() => setActiveView('learning')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === 'learning' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <GraduationCap className="w-4 h-4" />
              Learning Path
            </button>

            <button
              onClick={() => setActiveView('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === 'profile' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <User className="w-4 h-4" />
              My Profile
            </button>

            {/* ADMIN CONSOLE BUTTON — VISIBLE ONLY IF ROLE IS ADMIN! */}
            {role === 'admin' && (
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveView('admin')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${activeView === 'admin' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
                    }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin Console
                </button>
              </div>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-[11px] text-slate-500">
            <p className="font-bold text-slate-700 dark:text-slate-300">CareerPath AI v2.0</p>
            <p>Role: <span className={`uppercase font-bold ${role === 'admin' ? 'text-amber-500' : 'text-indigo-600 dark:text-indigo-400'}`}>{role}</span></p>
          </div>
          {/* Log Out Button in Sidebar */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-900/40 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Log Out
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area with Generous Spacing */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8">

        {/* 1. DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Student Career Dashboard</h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time overview of extracted skills, readiness score, and top career matches.</p>
              </div>
              <Button size="sm" onClick={() => setActiveView('resume')} className="gap-2 shadow-md">
                <UploadCloud className="w-4 h-4" />
                Upload New Resume
              </Button>
            </div>

            {/* Stat Cards Grid with Spacing & 2px Borders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Resume Score</span>
                  <Badge variant="success">Good</Badge>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 mt-3">{resumeScore}/100</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{resumeName}</p>
              </Card>

              <Card className="p-6">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Extracted Skills</span>
                <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-3">{extractedSkills.length}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified from resume</p>
              </Card>

              <Card className="p-6">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Career Matches</span>
                <p className="text-3xl sm:text-4xl font-black text-sky-600 dark:text-sky-400 mt-3">{careerList.length}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Roles mapped</p>
              </Card>

              <Card className="p-6">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Career Readiness</span>
                <p className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 mt-3">{readinessScore}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Top-3 average</p>
              </Card>
            </div>

            {/* Recommendations & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              <Card className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Top Recommended Career Roles</h3>
                  <button onClick={() => setActiveView('careers')} className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                    View all ({careerList.length}) →
                  </button>
                </div>

                <div className="space-y-5">
                  {careerList.slice(0, 3).map((role) => (
                    <div key={role.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">{role.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{role.department} · {role.salary}</p>
                        </div>
                        <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{role.matchPct}%</span>
                      </div>
                      <Progress value={role.matchPct} indicatorClassName="bg-emerald-500" />
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-500 dark:text-slate-400 truncate max-w-[70%]">
                          Matched: <span className="text-slate-800 dark:text-slate-200 font-semibold">{role.matchedSkills.join(', ')}</span>
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => { setSelectedCareerId(role.id); setActiveView('gap'); }}
                          className="text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0"
                        >
                          Skill Gap →
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="lg:col-span-4 p-6 sm:p-8 space-y-6">
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Extracted Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((sk, idx) => (
                    <Badge key={idx} variant="success" className="text-xs">
                      ✓ {sk}
                    </Badge>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-3">
                    ⚠️ Missing Core Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {careerList[0]?.missingSkills?.slice(0, 3).map((ms, idx) => (
                      <Badge key={idx} variant="warning" className="text-xs">
                        ! {ms}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

            </div>
          </div>
        )}

        {/* 2. RESUME UPLOAD VIEW */}
        {activeView === 'resume' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Resume Parser & Analyzer</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Upload your resume file or test sample resume presets to trigger instant NLP extraction.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Dropzone Container with Interactive Click & Drag Handling */}
              <Card className="lg:col-span-8 p-6 sm:p-8 space-y-6">

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-3 border-dashed border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 rounded-3xl p-10 sm:p-12 flex flex-col items-center justify-center space-y-4 hover:border-indigo-500 transition-all cursor-pointer group text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {isParsing ? <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" /> : <UploadCloud className="w-8 h-8" />}
                  </div>

                  <div>
                    <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {isParsing ? 'Parsing Resume with NLP Engine...' : 'Drag & Drop your PDF or DOCX resume here'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Supports PDF, DOCX, DOC, TXT files up to 10MB
                    </p>
                  </div>

                  <Button size="sm" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="shadow-md">
                    Select File from Computer
                  </Button>
                </div>

                {/* Upload Success Alert */}
                {uploadSuccessMsg && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{uploadSuccessMsg}</span>
                  </div>
                )}

                {/* Demo Presets */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-left space-y-3">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Instant Demo Presets (Click to Test):
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" variant="outline" onClick={() => handleSimulateResumeUpload('datascience')}>
                      <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-500" />
                      Load Data Science Resume
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSimulateResumeUpload('webdev')}>
                      <Sparkles className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                      Load Full-Stack Dev Resume
                    </Button>
                  </div>
                </div>

                {/* Parsed Output Card */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Parsed File:</span>
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{resumeName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Parsed Quality Score:</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{resumeScore} / 100</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">Extracted Entity Skills ({extractedSkills.length}):</span>
                    <div className="flex flex-wrap gap-2">
                      {extractedSkills.map((s, idx) => (
                        <Badge key={idx} variant="success" className="text-xs">✓ {s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tips & Extraction Info */}
              <Card className="lg:col-span-4 p-6 sm:p-8 space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Parsing Guidelines</h3>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Include explicit technical skills section to boost NLP scoring.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Name specific frameworks (e.g. React, Pandas, Docker) in projects.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>List certifications with issuer names (e.g. Coursera, AWS).</span>
                  </li>
                </ul>
              </Card>

            </div>
          </div>
        )}

        {/* 3. CAREER MATCHES VIEW */}
        {activeView === 'careers' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Career Role Matches</h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Comparing your extracted qualifications against predefined industry roles.</p>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search roles or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['all', 'high', 'medium', 'low'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setMatchFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold capitalize transition-all cursor-pointer ${matchFilter === f ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {f === 'all' ? 'All Roles' : f === 'high' ? 'High Match (>75%)' : f === 'medium' ? 'Medium (50-75%)' : 'Low (<50%)'}
                </button>
              ))}
            </div>

            {/* Career Cards Grid with Generous Spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCareers.map((c) => (
                <Card key={c.id} className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">{c.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.department} · {c.salary}</p>
                    </div>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{c.matchPct}%</span>
                  </div>

                  <Progress value={c.matchPct} indicatorClassName="bg-emerald-500" />

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 font-bold block mb-1.5">Matched Skills ({c.matchedSkills.length}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {c.matchedSkills.map((s, idx) => (
                          <Badge key={idx} variant="success" className="text-[10px]">✓ {s}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 dark:text-slate-400 font-bold block mb-1.5">Missing Skills ({c.missingSkills.length}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {c.missingSkills.map((s, idx) => (
                          <Badge key={idx} variant="warning" className="text-[10px]">! {s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <Button
                      size="sm"
                      onClick={() => { setSelectedCareerId(c.id); setActiveView('gap'); }}
                      className="flex-1 text-xs font-bold"
                    >
                      Skill Gap Matrix →
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => { setSelectedCareerId(c.id); setActiveView('learning'); }}
                      className="flex-1 text-xs font-bold"
                    >
                      Learning Path
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 4. SKILL GAP MATRIX VIEW */}
        {activeView === 'gap' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Skill Gap Matrix</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Comparing your profile against target career standards for <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedCareer.title}</span>.</p>
            </div>

            {/* Target Role Selector */}
            <div className="flex items-center gap-2 flex-wrap bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold px-2">Target Role:</span>
              {careerList.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCareerId(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${selectedCareerId === c.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {c.title} ({c.matchPct}%)
                </button>
              ))}
            </div>

            {/* Matrix Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <Card className="p-6 sm:p-8 border-l-8 border-l-emerald-500">
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-2 flex items-center gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  Matched Skills ({selectedCareer.matchedSkills.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Qualifications you already possess for this position</p>

                <div className="space-y-3">
                  {selectedCareer.matchedSkills.map((s, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">✓ {s}</span>
                      <Badge variant="success" className="text-[10px]">Verified</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 sm:p-8 border-l-8 border-l-amber-500">
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-2 flex items-center gap-2.5">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  Skills to Develop ({selectedCareer.missingSkills.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Acquire these skills to boost match to 95%+</p>

                <div className="space-y-3">
                  {selectedCareer.missingSkills.map((s, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">! {s}</span>
                      <Button size="sm" variant="outline" onClick={() => setActiveView('learning')} className="text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-white dark:bg-slate-950">
                        Find Courses →
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        )}

        {/* 5. LEARNING PATH VIEW */}
        {activeView === 'learning' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Personalized Learning Roadmap</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Curated courses mapped to your missing skills for <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedCareer.title}</span>.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              <div className="lg:col-span-8 space-y-5">
                {[
                  {
                    title: "Statistics for Data Science & Machine Learning",
                    platform: "Coursera",
                    duration: "8 weeks",
                    rating: 4.8,
                    skill: "Statistics",
                    url: "https://www.coursera.org/search?query=statistics+for+data+science",
                    free: false,
                  },
                  {
                    title: "Advanced Excel for Data Analysts – VLOOKUP to Power Query",
                    platform: "Udemy",
                    duration: "12 hours",
                    rating: 4.6,
                    skill: "Advanced Excel",
                    url: "https://www.udemy.com/courses/search/?q=advanced+excel+for+data+analysts",
                    free: true,
                  },
                  {
                    title: "Complete Tableau Bootcamp",
                    platform: "YouTube",
                    duration: "6 hours",
                    rating: 4.7,
                    skill: "Tableau",
                    url: "https://www.youtube.com/results?search_query=tableau+bootcamp+for+beginners",
                    free: true,
                  },
                ].map((course, idx) => (
                  <Card key={idx} className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <Badge variant="warning" className="text-[10px]">
                          Fills gap: {course.skill}
                        </Badge>
                        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{course.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {course.platform} · {course.duration} · ⭐ {course.rating}
                          {course.free && <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-extrabold">· FREE</span>}
                        </p>
                      </div>
                      <a href={course.url} target="_blank" rel="noreferrer">
                        <Button size="sm" className="gap-1.5 text-xs font-bold shadow-md">
                          Start <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="lg:col-span-4 p-6 sm:p-8 space-y-5">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Target Certifications
                </h3>
                <ul className="space-y-3 text-xs">
                  {['Google Data Analytics Professional', 'IBM Data Science Certification', 'HackerRank SQL Gold Badge'].map((cert, idx) => (
                    <li key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cert}</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">Target</span>
                    </li>
                  ))}
                </ul>
              </Card>

            </div>
          </div>
        )}

        {/* 6. PROFILE VIEW */}
        {activeView === 'profile' && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Student Profile Settings</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Update your academic credentials and degree details.</p>
            </div>

            <Card className="p-6 sm:p-8 space-y-5">
              {/* Account Email — read-only */}
              {currentUser?.email && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Account Email</label>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                    <span>📧</span> {currentUser.email}
                    <span className="ml-auto text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Read-only</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Degree</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Year of Study</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">University / College</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">CGPA</label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                />
              </div>

              {profileSaveMsg && (
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2">
                  ✓ {profileSaveMsg}
                </div>
              )}

              <Button
                size="sm"
                className="w-full py-3 font-extrabold shadow-md"
                onClick={async () => {
                  try {
                    const response = await fetch(`http://127.0.0.1:8000/api/profile?email=${encodeURIComponent(currentUser?.email || '')}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        degree,
                        university,
                        cgpa,
                        year,
                        extracted_skills: extractedSkills.join(",")
                      })
                    });
                    
                    if (!response.ok) throw new Error("Failed to save profile");
                    
                    setProfileSaveMsg('Profile saved to database successfully!');
                  } catch (e) {
                    setProfileSaveMsg('Error saving profile');
                  }
                  setTimeout(() => setProfileSaveMsg(''), 3000);
                }}
              >
                Save Profile Changes
              </Button>
            </Card>

          </div>
        )}

        {/* 7. ADMIN VIEW — ACCESSIBLE ONLY IF ROLE IS ADMIN */}
        {activeView === 'admin' && role === 'admin' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Shield className="w-7 h-7 text-amber-500" />
                  Institutional Admin Console
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Manage student records, view system analytics, and configure career role skills.</p>
              </div>
              <Badge variant="warning" className="px-3.5 py-1.5">Admin Authorized</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              <Card className="lg:col-span-5 p-6 sm:p-8 space-y-5">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Add New Career Role</h3>
                <form onSubmit={handleAddCareer} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Role Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. DevOps Engineer"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
                    <input
                      type="text"
                      placeholder="e.g. Cloud & DevOps"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Salary Range</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹8 – 20 LPA"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Required Skills (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Docker, Kubernetes, Linux, Git"
                      value={newSkillsStr}
                      onChange={(e) => setNewSkillsStr(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <Button size="sm" type="submit" variant="emerald" className="w-full py-3 font-extrabold shadow-md">
                    <Plus className="w-4 h-4 mr-1" />
                    Create Career Role
                  </Button>
                </form>
              </Card>

              <div className="lg:col-span-7 space-y-6">
                <Card className="p-6 sm:p-8 space-y-5">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Configured Career Roles ({careerList.length})</h3>
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {careerList.map((c) => (
                      <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-slate-900 dark:text-white">{c.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{c.department} · {c.matchedSkills.concat(c.missingSkills).join(', ')}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCareer(c.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                          title="Delete role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
};
