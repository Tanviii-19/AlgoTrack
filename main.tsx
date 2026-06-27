import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Bell } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  userName: string;
}

export default function Header({
  searchTerm,
  onSearchChange,
  activeView,
  setActiveView,
  userName,
}: HeaderProps) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('algotrack_theme') === 'dark' || 
             document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('algotrack_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('algotrack_theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 flex flex-col md:flex-row justify-between items-center px-6 py-3 md:h-16 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700 transition-colors duration-200">
      <div className="flex items-center justify-between w-full md:w-auto gap-6 mb-2 md:mb-0">
        <div className="flex items-center gap-2">
          <span className="font-sans text-2xl font-extrabold tracking-tight text-[#0058bc] dark:text-[#adc6ff]">
            AlgoTrack
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50">
            v1.2
          </span>
        </div>
        
        {/* Navigation subtabs inside Header (matching screenshot) */}
        <div className="hidden sm:flex gap-4 ml-6 items-center">
          <button
            onClick={() => setActiveView('Overview')}
            className={`text-sm font-semibold pb-1 border-b-2 transition-all cursor-pointer ${
              activeView === 'Overview' || activeView === 'Data Structures' || activeView === 'Algorithms'
                ? 'text-[#0058bc] dark:text-[#adc6ff] border-[#0058bc] dark:border-[#adc6ff]'
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('Mock Tests')}
            className={`text-sm font-semibold pb-1 border-b-2 transition-all cursor-pointer ${
              activeView === 'Mock Tests'
                ? 'text-[#0058bc] dark:text-[#adc6ff] border-[#0058bc] dark:border-[#adc6ff]'
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Problems
          </button>
          <button
            onClick={() => setActiveView('Settings')}
            className={`text-sm font-semibold pb-1 border-b-2 transition-all cursor-pointer ${
              activeView === 'Settings'
                ? 'text-[#0058bc] dark:text-[#adc6ff] border-[#0058bc] dark:border-[#adc6ff]'
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Roadmap
          </button>
        </div>
      </div>

      {/* Global Search Input (matching screenshot) */}
      <div className="w-full md:flex-1 md:max-w-md mx-0 md:mx-6 relative mb-2 md:mb-0">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          id="global-search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search problems or categories..."
          className="w-full bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0058bc]/20 focus:border-[#0058bc] dark:focus:ring-blue-500/20 dark:focus:border-blue-500 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 justify-between w-full md:w-auto">
        {/* Navigation subtabs for tiny mobile view */}
        <div className="flex sm:hidden gap-3">
          <button
            onClick={() => setActiveView('Overview')}
            className={`text-xs font-bold ${activeView === 'Overview' ? 'text-[#0058bc]' : 'text-slate-500'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('Mock Tests')}
            className={`text-xs font-bold ${activeView === 'Mock Tests' ? 'text-[#0058bc]' : 'text-slate-500'}`}
          >
            Practice
          </button>
        </div>

        <div className="flex items-center gap-3 ml-auto md:ml-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-[#1e293b] rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2 z-50 animate-fade-in text-slate-700 dark:text-slate-300">
                <div className="px-4 py-2 font-semibold text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/80 uppercase tracking-wider">
                  Notifications
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 border-b border-slate-50 dark:border-slate-700/50 cursor-pointer">
                    <p className="text-xs font-medium text-slate-900 dark:text-slate-100">🔥 Daily Streak Secured!</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Solve a problem today to extend your DSA streak.</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer">
                    <p className="text-xs font-medium text-slate-900 dark:text-slate-100">🚀 Faang Elite Prep Tip</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Focus on Sliding Window and Trees this week. High test frequency!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                alt={userName}
                src="/src/assets/images/student_avatar_1782582279733.jpg"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">
                {userName}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider font-semibold uppercase">
                Student Track
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
