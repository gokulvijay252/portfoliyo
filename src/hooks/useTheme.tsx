import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: {
    bg: string;
    heading: string;
    text: string;
    textSecondary: string;
    cardBg: string;
    cardBgHover: string;
    cardBorder: string;
    cardBorderHover: string;
    navBg: string;
    iconBg: string;
  };
}

const DARK = {
  bg: 'linear-gradient(to right, #000428, #004e92)',
  heading: '#FDB902',
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.8)',
  cardBg: 'rgba(255,255,255,0.1)',
  cardBgHover: 'rgba(255,255,255,0.2)',
  cardBorder: '1px solid rgba(255,255,255,0.2)',
  cardBorderHover: '1px solid rgba(255,255,255,0.4)',
  navBg: 'linear-gradient(to right, #000428, #004e92)',
  iconBg: 'rgba(255,255,255,0.15)',
};

const LIGHT = {
  bg: 'linear-gradient(135deg, #e8f0fe 0%, #d4e4f7 50%, #c0d4ec 100%)',
  heading: '#1c2b3a',
  text: '#1c2b3a',
  textSecondary: '#3a5068',
  cardBg: 'rgba(255,255,255,0.7)',
  cardBgHover: 'rgba(255,255,255,0.9)',
  cardBorder: '1px solid rgba(28,43,58,0.12)',
  cardBorderHover: '1px solid rgba(28,43,58,0.25)',
  navBg: 'linear-gradient(135deg, #e8f0fe 0%, #d4e4f7 50%, #c0d4ec 100%)',
  iconBg: 'rgba(28,43,58,0.1)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const theme = darkMode ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
