import React, { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // بررسی localStorage برای ذخیره حالت قبلی
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return saved === 'true';
      }
      // اگر در localStorage نبود، از تنظیمات سیستم استفاده کن
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // اعمال کلاس dark به html element در زمان بارگذاری اولیه
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const saved = localStorage.getItem('darkMode');
      const shouldBeDark = saved === 'true' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    // اعمال کلاس dark به html element
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        console.log('Dark mode enabled - class added to html');
      } else {
        root.classList.remove('dark');
        console.log('Dark mode disabled - class removed from html');
      }
      // ذخیره در localStorage
      localStorage.setItem('darkMode', String(isDark));
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const newValue = !prev;
      console.log('Toggling dark mode to:', newValue);
      return newValue;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

