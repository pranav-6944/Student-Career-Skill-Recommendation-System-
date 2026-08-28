import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, Briefcase, BarChart2, GraduationCap, User, Shield,
  UploadCloud, CheckCircle2, AlertTriangle, ArrowRight, Search, Plus, Trash2,
  ExternalLink, Star, Award, BookOpen, Clock, Sparkles
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

export const WebAppView: React.FC<{ initialMode?: 'webapp' | 'admin' }> = ({ initialMode = 'webapp' }) => {
  const { role } = useTheme();

  const [activeView, setActiveView] = useState<'dashboard' | 'resume' | 'careers' | 'gap' | 'learning' | 'profile' | 'admin'>(
    initialMode === 'admin' && role === 'admin' ? 'admin' : 'dashboard'
  );

  // Student Profile State
  const [studentName, setStudentName] = useState('Ashwini Kate');
  const [degree, setDegree] = useState('B.Sc Computer Science');
  const [university, setUniversity] = useState('Savitribai Phule Pune University');
  const [cgpa, setCgpa] = useState('8.4');
  const [year, setYear] = useState('3');
  
  // Resume & Extracted Skills State
  const [resumeName, setResumeName] = useState('Ashwini_Kate_Resume_2024.pdf');
  const [resumeScore, setResumeScore] = useState(78);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([
    'Python', 'SQL', 'Pandas', 'NumPy', 'Power BI', 'Excel', 'HTML', 'Git'
  ]);

  // Career Filter & Selected Career
  const [selectedCareerId, setSelectedCareerId] = useState<number>(1);
  const [matchFilter, setMatchFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Career Data
  const [careerList, setCareerList] = useState<CareerRoleItem[]>([
    {
      id: 1,
      title: 'Data Analyst',
      department: 'Data & Analytics',
      salary: '₹4.5 – 12 LPA',
      matchPct: 82.5,
      matchedSkills: ['Python', 'SQL', 'Pandas', 'Excel', 'Power BI'],
      missingSkills: ['Statistics', 'Advanced Excel', 'Tableau'],
    },
    {
      id: 2,
      title: 'Business Analyst',
      department: 'Business & Strategy',
      salary: '₹6 – 15 LPA',
      matchPct: 74.0,
      matchedSkills: ['Excel', 'SQL', 'Power BI'],
      missingSkills: ['Requirements Analysis', 'JIRA', 'Agile'],
    },
    {
      id: 3,
      title: 'Web Developer',
      department: 'Web & Mobile',
      salary: '₹4 – 14 LPA',
      matchPct: 71.5,
      matchedSkills: ['HTML', 'JavaScript', 'Git', 'Python'],
      missingSkills: ['React', 'REST APIs', 'Node.js'],
    },
    {
      id: 4,
      title: 'Data Scientist',
      department: 'AI & Machine Learning',
      salary: '₹8 – 20 LPA',
      matchPct: 65.0,
      matchedSkills: ['Python', 'Pandas', 'NumPy', 'SQL'],
      missingSkills: ['Machine Learning', 'Statistics', 'Scikit-learn', 'TensorFlow'],
    },
    {
      id: 5,
      title: 'Software Developer',
      department: 'Software Engineering',
      salary: '₹5 – 18 LPA',
      matchPct: 58.0,
      matchedSkills: ['Python', 'Git', 'HTML'],
      missingSkills: ['Data Structures', 'Algorithms', 'JavaScript', 'REST APIs'],
    },
  ]);

  // Admin Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newSkillsStr, setNewSkillsStr] = useState('');

  const handleAddCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const skills = newSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const newRole: CareerRoleItem = {
      id: Date.now(),
      title: newTitle,
      department: newDept || 'Technology',
      salary: newSalary || '₹5 – 12 LPA',
      matchPct: 60.0,
      matchedSkills: skills.slice(0, 2),
      missingSkills: skills.slice(2),
    };
    setCareerList([...careerList, newRole]);
    setNewTitle('');
    setNewDept('');
    setNewSalary('');
    setNewSkillsStr('');
  };

  const handleDeleteCareer = (id: number) => {
    setCareerList(careerList.filter(c => c.id !== id));
  };

  const handleSimulateResumeUpload = (preset: 'datascience' | 'webdev') => {
    if (preset === 'datascience') {
      setResumeName('Ashwini_Kate_DataScience_CV.pdf');
      setResumeScore(85);
      setExtractedSkills(['Python', 'SQL', 'Pandas', 'NumPy', 'Statistics', 'Power BI', 'Excel', 'Scikit-learn']);
    } else {
      setResumeName('Ashwini_Kate_FullStack_Resume.docx');
      setResumeScore(90);
      setExtractedSkills(['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'REST APIs', 'Python']);
    }
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
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside class="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* User Profile Info Header */}
          <div class="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/80 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-white shadow-md">
              {role === 'admin' ? 'AD' : studentName.substring(0, 2).toUpperCase()}
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-bold text-sm text-slate-900 dark:text-white truncate">
                {role === 'admin' ? 'Admin Panel' : studentName}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                {role === 'admin' ? 'Administrator' : degree}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav class="p-3 space-y-1">
            <button
              onClick={() => setActiveView('dashboard')}
              class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard class="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveView('resume')}
              class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'resume' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText class="w-4 h-4" />
              Resume Upload & Parser
            </button>

            <button
              onClick={() => setActiveView('careers')}
              class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'careers' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase class="w-4 h-4" />
              Career Matches ({careerList.length})
            </button>

            <button
              onClick={() => setActiveView('gap')}
              class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'gap' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 class="w-4 h-4" />
              Skill Gap Matrix
            </button>

            <button
              onClick={() => setActiveView('learning')}
              class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'learning' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap class="w-4 h-4" />
              Learning Path
            </button>

            <button
              onClick={() => setActiveView('profile')}
              class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'profile' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User class="w-4 h-4" />
              My Profile
            </button>

            {/* ADMIN CONSOLE BUTTON — VISIBLE ONLY IF ROLE IS ADMIN! */}
            {role === 'admin' && (
              <div class="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveView('admin')}
                  class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeView === 'admin' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
                  }`}
                >
                  <Shield class="w-4 h-4" />
                  Admin Console
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar Status Footer */}
        <div class="p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
          <p class="font-bold text-slate-700 dark:text-slate-300">CareerPath AI v2.0</p>
          <p>Role Context: <span class="uppercase font-bold text-indigo-600 dark:text-indigo-400">{role}</span></p>
        </div>
      </aside>

      {/* Main View Area */}
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* 1. DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Student Career Dashboard</h1>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Real-time overview of extracted skills, readiness score, and top career matches.</p>
              </div>
              <Button size="sm" onClick={() => setActiveView('resume')} class="gap-2">
                <UploadCloud class="w-4 h-4" />
                Upload New Resume
              </Button>
            </div>

            {/* Stat Cards Grid */}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card class="p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-slate-500 dark:text-slate-400 font-bold">Resume Score</span>
                  <Badge variant="success">Good</Badge>
                </div>
                <p class="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-2">{resumeScore}/100</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{resumeName}</p>
              </Card>

              <Card class="p-5">
                <span class="text-xs text-slate-500 dark:text-slate-400 font-bold">Extracted Skills</span>
                <p class="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">{extractedSkills.length}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified from resume</p>
              </Card>

              <Card class="p-5">
                <span class="text-xs text-slate-500 dark:text-slate-400 font-bold">Career Matches</span>
                <p class="text-3xl font-black text-sky-600 dark:text-sky-400 mt-2">{careerList.length}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Roles mapped</p>
              </Card>

              <Card class="p-5">
                <span class="text-xs text-slate-500 dark:text-slate-400 font-bold">Career Readiness</span>
                <p class="text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">74.5%</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Top-3 average</p>
              </Card>
            </div>

            {/* Top Matches & Skill Breakdown */}
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Top Recommendations (8 cols) */}
              <Card class="lg:col-span-8 p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="font-bold text-lg text-slate-900 dark:text-white">Top Recommended Career Roles</h3>
                  <button onClick={() => setActiveView('careers')} class="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                    View all ({careerList.length}) →
                  </button>
                </div>

                <div class="space-y-4">
                  {careerList.slice(0, 3).map((role) => (
                    <div key={role.id} class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-bold text-slate-900 dark:text-white text-base">{role.title}</p>
                          <p class="text-xs text-slate-500 dark:text-slate-400">{role.department} · {role.salary}</p>
                        </div>
                        <span class="text-base font-black text-emerald-600 dark:text-emerald-400">{role.matchPct}%</span>
                      </div>
                      <Progress value={role.matchPct} indicatorClassName="bg-emerald-500" />
                      <div class="flex items-center justify-between pt-1 text-xs">
                        <span class="text-slate-500 dark:text-slate-400 truncate max-w-[70%]">
                          Matched: <span class="text-slate-800 dark:text-slate-200 font-semibold">{role.matchedSkills.join(', ')}</span>
                        </span>
                        <button
                          onClick={() => { setSelectedCareerId(role.id); setActiveView('gap'); }}
                          class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex-shrink-0"
                        >
                          Skill Gap →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Skills Side Panel (4 cols) */}
              <Card class="lg:col-span-4 p-6 space-y-4">
                <h3 class="font-bold text-lg text-slate-900 dark:text-white">Extracted Skills</h3>
                <div class="flex flex-wrap gap-1.5">
                  {extractedSkills.map((sk, idx) => (
                    <Badge key={idx} variant="success" class="text-xs">
                      ✓ {sk}
                    </Badge>
                  ))}
                </div>

                <div class="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-2">
                    ⚠️ Missing Core Skills
                  </p>
                  <div class="flex flex-wrap gap-1.5">
                    {['Statistics', 'Advanced Excel', 'Machine Learning'].map((ms, idx) => (
                      <Badge key={idx} variant="warning" class="text-xs">
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
          <div class="space-y-6">
            <div>
              <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Resume Parser & Analyzer</h1>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Upload your resume file or test sample resume presets to trigger instant NLP extraction.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Dropzone Container */}
              <Card class="lg:col-span-8 p-8 text-center space-y-6">
                <div class="border-2 border-dashed border-indigo-500/40 bg-indigo-500/5 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-indigo-400 transition-colors">
                  <div class="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <UploadCloud class="w-8 h-8" />
                  </div>
                  <div>
                    <p class="text-base font-bold text-slate-900 dark:text-white">Drag & drop your PDF / DOCX resume here</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports PDF, DOCX files up to 5MB</p>
                  </div>
                  <Button size="sm">Select File from Computer</Button>
                </div>

                {/* Presets */}
                <div class="pt-4 border-t border-slate-200 dark:border-slate-800 text-left">
                  <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    Instant Demo Presets:
                  </p>
                  <div class="flex flex-wrap gap-3">
                    <Button size="sm" variant="outline" onClick={() => handleSimulateResumeUpload('datascience')}>
                      <Sparkles class="w-3.5 h-3.5 mr-2 text-indigo-500" />
                      Load Data Science Resume
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSimulateResumeUpload('webdev')}>
                      <Sparkles class="w-3.5 h-3.5 mr-2 text-emerald-500" />
                      Load Full-Stack Dev Resume
                    </Button>
                  </div>
                </div>

                {/* Output */}
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-500 dark:text-slate-400">Current Resume:</span>
                    <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">{resumeName}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-500 dark:text-slate-400">Parsed Score:</span>
                    <span class="text-sm font-black text-emerald-600 dark:text-emerald-400">{resumeScore} / 100</span>
                  </div>
                  <div>
                    <span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Extracted Skills ({extractedSkills.length}):</span>
                    <div class="flex flex-wrap gap-1.5">
                      {extractedSkills.map((s, idx) => (
                        <Badge key={idx} variant="success" class="text-xs">✓ {s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Extraction Standards */}
              <Card class="lg:col-span-4 p-6 space-y-4">
                <h3 class="font-bold text-base text-slate-900 dark:text-white">Extraction Standards</h3>
                <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-3">
                  <li class="flex items-start gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Explicit technical skills section boosts parsing score.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Include project names with explicit tech stack keywords.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Specify certifications with issuer (e.g. Coursera, AWS).</span>
                  </li>
                </ul>
              </Card>

            </div>
          </div>
        )}

        {/* 3. CAREER MATCHES VIEW */}
        {activeView === 'careers' && (
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Career Role Matches</h1>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Comparing your extracted qualifications against predefined industry roles.</p>
              </div>

              {/* Search */}
              <div class="relative w-full sm:w-64">
                <Search class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search roles or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div class="flex items-center gap-2 flex-wrap">
              {(['all', 'high', 'medium', 'low'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setMatchFilter(f)}
                  class={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-colors ${
                    matchFilter === f ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All Roles' : f === 'high' ? 'High Match (>75%)' : f === 'medium' ? 'Medium (50-75%)' : 'Low (<50%)'}
                </button>
              ))}
            </div>

            {/* Career Cards List */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCareers.map((c) => (
                <Card key={c.id} class="p-6 space-y-4">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="font-bold text-lg text-slate-900 dark:text-white">{c.title}</h3>
                      <p class="text-xs text-slate-500 dark:text-slate-400">{c.department} · {c.salary}</p>
                    </div>
                    <span class="text-xl font-black text-emerald-600 dark:text-emerald-400">{c.matchPct}%</span>
                  </div>

                  <Progress value={c.matchPct} indicatorClassName="bg-emerald-500" />

                  <div class="space-y-2 text-xs">
                    <div>
                      <span class="text-slate-500 dark:text-slate-400 block mb-1">Matched Skills ({c.matchedSkills.length}):</span>
                      <div class="flex flex-wrap gap-1">
                        {c.matchedSkills.map((s, idx) => (
                          <Badge key={idx} variant="success" class="text-[10px]">✓ {s}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span class="text-slate-500 dark:text-slate-400 block mb-1">Missing Skills ({c.missingSkills.length}):</span>
                      <div class="flex flex-wrap gap-1">
                        {c.missingSkills.map((s, idx) => (
                          <Badge key={idx} variant="warning" class="text-[10px]">! {s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 pt-2">
                    <Button
                      size="sm"
                      onClick={() => { setSelectedCareerId(c.id); setActiveView('gap'); }}
                      class="flex-1 text-xs"
                    >
                      Skill Gap Matrix →
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => { setSelectedCareerId(c.id); setActiveView('learning'); }}
                      class="flex-1 text-xs"
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
          <div class="space-y-6">
            <div>
              <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Skill Gap Matrix</h1>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Comparing your profile against target career standards for <span class="text-indigo-600 dark:text-indigo-400 font-bold">{selectedCareer.title}</span>.</p>
            </div>

            {/* Target Role Selector */}
            <div class="flex items-center gap-2 flex-wrap bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span class="text-xs text-slate-500 dark:text-slate-400 font-bold px-2">Target Role:</span>
              {careerList.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCareerId(c.id)}
                  class={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCareerId === c.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {c.title} ({c.matchPct}%)
                </button>
              ))}
            </div>

            {/* Matrix Side-by-Side */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Matched Skills */}
              <Card class="p-6 border-l-4 border-l-emerald-500">
                <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 class="w-5 h-5 text-emerald-500" />
                  Matched Skills ({selectedCareer.matchedSkills.length})
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Qualifications you already possess for this position</p>

                <div class="space-y-2.5">
                  {selectedCareer.matchedSkills.map((s, idx) => (
                    <div key={idx} class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span class="text-xs font-bold text-slate-900 dark:text-white">✓ {s}</span>
                      <Badge variant="success" class="text-[10px]">Verified</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Missing Skills */}
              <Card class="p-6 border-l-4 border-l-amber-500">
                <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-5 h-5 text-amber-500" />
                  Skills to Develop ({selectedCareer.missingSkills.length})
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Acquire these skills to boost match to 95%+</p>

                <div class="space-y-2.5">
                  {selectedCareer.missingSkills.map((s, idx) => (
                    <div key={idx} class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span class="text-xs font-bold text-slate-900 dark:text-white">! {s}</span>
                      <Button size="sm" variant="ghost" onClick={() => setActiveView('learning')} class="text-[11px] h-7 text-indigo-600 dark:text-indigo-400 font-bold">
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
          <div class="space-y-6">
            <div>
              <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Personalized Learning Roadmap</h1>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Curated courses mapped to your missing skills for <span class="text-indigo-600 dark:text-indigo-400 font-bold">{selectedCareer.title}</span>.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Course Cards (8 cols) */}
              <div class="lg:col-span-8 space-y-4">
                {[
                  {
                    title: "Statistics for Data Science & Machine Learning",
                    platform: "Coursera",
                    duration: "8 weeks",
                    rating: 4.8,
                    skill: "Statistics",
                    url: "https://www.coursera.org",
                    free: false,
                  },
                  {
                    title: "Advanced Excel for Data Analysts – VLOOKUP to Power Query",
                    platform: "Udemy",
                    duration: "12 hours",
                    rating: 4.6,
                    skill: "Advanced Excel",
                    url: "https://www.udemy.com",
                    free: true,
                  },
                  {
                    title: "Complete Tableau Bootcamp",
                    platform: "YouTube",
                    duration: "6 hours",
                    rating: 4.7,
                    skill: "Tableau",
                    url: "https://www.youtube.com",
                    free: true,
                  },
                ].map((course, idx) => (
                  <Card key={idx} class="p-5 hover:border-indigo-500/40 transition-colors">
                    <div class="flex items-start justify-between gap-4">
                      <div class="space-y-1">
                        <Badge variant="warning" class="text-[10px] mb-1">
                          Fills gap: {course.skill}
                        </Badge>
                        <h3 class="font-bold text-base text-slate-900 dark:text-white">{course.title}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                          {course.platform} · {course.duration} · ⭐ {course.rating}
                          {course.free && <span class="ml-2 text-emerald-600 dark:text-emerald-400 font-bold">· FREE</span>}
                        </p>
                      </div>
                      <a href={course.url} target="_blank" rel="noreferrer">
                        <Button size="sm" class="gap-1 text-xs">
                          Start <ExternalLink class="w-3 h-3" />
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Target Certifications (4 cols) */}
              <Card class="lg:col-span-4 p-6 space-y-4">
                <h3 class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Award class="w-5 h-5 text-amber-500" />
                  Target Certifications
                </h3>
                <ul class="space-y-3 text-xs">
                  {['Google Data Analytics Professional', 'IBM Data Science Certification', 'HackerRank SQL Gold Badge'].map((cert, idx) => (
                    <li key={idx} class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span class="font-semibold text-slate-800 dark:text-slate-200">{cert}</span>
                      <span class="text-indigo-600 dark:text-indigo-400 font-bold">Target</span>
                    </li>
                  ))}
                </ul>
              </Card>

            </div>
          </div>
        )}

        {/* 6. PROFILE VIEW */}
        {activeView === 'profile' && (
          <div class="space-y-6 max-w-2xl">
            <div>
              <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Student Profile Settings</h1>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Update your academic credentials and degree details.</p>
            </div>

            <Card class="p-6 space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Degree</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Year of Study</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">University / College</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">CGPA</label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                />
              </div>

              <Button size="sm" class="w-full">Save Profile Changes</Button>
            </Card>
          </div>
        )}

        {/* 7. ADMIN VIEW — ACCESSIBLE ONLY IF ROLE IS ADMIN */}
        {activeView === 'admin' && role === 'admin' && (
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield class="w-6 h-6 text-amber-500" />
                  Institutional Admin Console
                </h1>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Manage student records, view system analytics, and configure career role skills.</p>
              </div>
              <Badge variant="warning" class="px-3 py-1">Admin Authorized</Badge>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Add Career Form (5 cols) */}
              <Card class="lg:col-span-5 p-6 space-y-4">
                <h3 class="font-bold text-base text-slate-900 dark:text-white">Add New Career Role</h3>
                <form onSubmit={handleAddCareer} class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Role Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. DevOps Engineer"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                    <input
                      type="text"
                      placeholder="e.g. Cloud & DevOps"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹8 – 20 LPA"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Required Skills (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Docker, Kubernetes, Linux, Git"
                      value={newSkillsStr}
                      onChange={(e) => setNewSkillsStr(e.target.value)}
                      class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>

                  <Button size="sm" type="submit" variant="emerald" class="w-full gap-2 font-bold">
                    <Plus class="w-4 h-4" />
                    Create Career Role
                  </Button>
                </form>
              </Card>

              {/* Configured Career Roles (7 cols) */}
              <div class="lg:col-span-7 space-y-6">
                <Card class="p-6 space-y-4">
                  <h3 class="font-bold text-base text-slate-900 dark:text-white">Configured Career Roles ({careerList.length})</h3>
                  <div class="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {careerList.map((c) => (
                      <div key={c.id} class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                        <div class="min-w-0">
                          <p class="font-bold text-xs text-slate-900 dark:text-white">{c.title}</p>
                          <p class="text-[11px] text-slate-500 dark:text-slate-400">{c.department} · {c.matchedSkills.concat(c.missingSkills).join(', ')}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCareer(c.id)}
                          class="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete role"
                        >
                          <Trash2 class="w-4 h-4" />
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
