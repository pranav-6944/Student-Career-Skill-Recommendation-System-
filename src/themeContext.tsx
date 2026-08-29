import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type UserRole = 'student' | 'admin';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('careerpath_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  // Persist role in sessionStorage so it survives page refreshes within a session
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = sessionStorage.getItem('careerpath_role');
    return (saved === 'admin' || saved === 'student') ? saved : 'student';
  });

  const setRole = (newRole: UserRole) => {
    sessionStorage.setItem('careerpath_role', newRole);
    setRoleState(newRole);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('careerpath_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, role, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
