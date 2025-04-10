// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const DEFAULT_THEME = "classic";

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(DEFAULT_THEME);

  // 앱 로드 시 로컬 스토리지에서 테마 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("selected_theme");
    if (savedTheme) {
      setThemeName(savedTheme);
    }
  }, []);

  // 테마 변경 함수
  const applyTheme = (name) => {
    if (!name) return;
    
    setThemeName(name);
    localStorage.setItem("selected_theme", name);
    
    // 다크 모드 처리
    if (name === 'dark' || name === 'neon' || name === 'matrix' || name === 'galaxy') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const themeClass = `theme-${themeName}`;
  const themeColor = themeName;

  return (
    <ThemeContext.Provider value={{ themeName, themeClass, themeColor, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}