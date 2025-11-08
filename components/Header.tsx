"use client";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  
  console.log('Header rendering, current theme:', theme);

  const handleClick = () => {
    console.log('Button clicked!');
    toggleTheme();
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center m-6 z-50">
      <div className="font-bold text-2xl dark:text-white">NL</div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          type="button"
          className=" p-2 md:p-3 rounded-full bg-neutral-300/40 dark:bg-neutral-700/40 backdrop-blur-md hover:bg-neutral-400/40 dark:hover:bg-neutral-600/40 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 md:w-5 md:h-5 text-neutral-800 dark:text-neutral-200" />
          ) : (
            <Sun className="w-4 h-4 md:w-5 md:h-5 text-neutral-200" />
          )}
        </button>

        <div className="font-figtree text-sm md:text-lg font-medium bg-neutral-300/40 dark:bg-neutral-700/40 backdrop-blur-md py-1.5 md:py-2 px-4 md:px-9 rounded-full cursor-pointer hover:bg-neutral-400/40 dark:hover:bg-neutral-600/40 transition-colors dark:text-white">
          Get in touch
        </div>
      </div>
    </div>
  );
}