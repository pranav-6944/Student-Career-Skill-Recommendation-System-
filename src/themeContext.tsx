import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type UserRole = 'student' | 'admin';

export interface UserSession {
  email: string;
  name: string;
  role: UserRole;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserSession | null;
  setCurrentUser: (user: UserSession | null) => void;
  logout: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Read session from sessionStorage
const readSession = (): UserSession | null => {
  try {
    const raw = sessionStorage.getItem('careerpath_session');
    if (raw) return JSON.parse(raw) as UserSession;
  } catch { /* ignore */ }
  return null;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('careerpath_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [currentUser, setCurrentUserState] = useState<UserSession | null>(() => readSession());

  // Derive role from session
  const role: UserRole = currentUser?.role ?? 'student';

  const setRole = (newRole: UserRole) => {
    if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      sessionStorage.setItem('careerpath_session', JSON.stringify(updated));
      setCurrentUserState(updated);
    }
  };

  const setCurrentUser = (user: UserSession | null) => {
    if (user) {
      sessionStorage.setItem('careerpath_session', JSON.stringify(user));
      // Also clear any stale per-user profile data if switching users
      const prevEmail = readSession()?.email;
      if (prevEmail && prevEmail !== user.email) {
        // New user — previous localStorage logic removed, profile handled by DB now
      }
    } else {
      sessionStorage.removeItem('careerpath_session');
    }
    setCurrentUserState(user);
  };

  const logout = () => {
    sessionStorage.removeItem('careerpath_session');
    setCurrentUserState(null);
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
    <ThemeContext.Provider value={{ theme, toggleTheme, role, setRole, currentUser, setCurrentUser, logout }}>
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
