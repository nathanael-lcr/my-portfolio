"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    console.log('ThemeProvider mounted');
    
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Check browser preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('Prefers dark:', prefersDark);
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
    
    console.log('HTML classes:', document.documentElement.classList.toString());
  }, []);

  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('New theme will be:', newTheme);
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    console.log('HTML classes after toggle:', document.documentElement.classList.toString());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}