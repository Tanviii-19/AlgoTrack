import { 
  LayoutDashboard, 
  Binary, 
  Terminal, 
  Award, 
  Settings, 
  RefreshCw, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onGlobalReset: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
  trackName: string;
}

export default function Sidebar({
  activeView,
  setActiveView,
  onGlobalReset,
  onOpenHelp,
  onLogout,
  trackName
}: SidebarProps) {
  const menuItems = [
    { id: 'Overview' as ViewType, name: 'Overview', icon: LayoutDashboard },
    { id: 'Data Structures' as ViewType, name: 'Data Structures', icon: Binary },
    { id: 'Algorithms' as ViewType, name: 'Algorithms', icon: Terminal },
    { id: 'Mock Tests' as ViewType, name: 'Mock Tests', icon: Award },
    { id: 'Settings' as ViewType, name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-slate-50 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800/80 flex flex-col py-6 z-30 transition-all duration-200 hidden lg:flex">
      {/* Sidebar Profile Header */}
      <div className="px-6 mb-8 text-left">
        <h2 className="font-sans text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
          {trackName}
        </h2>
        <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">
          Student Track
        </p>
      </div>

      {/* Navigation Options */}
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all text-left cursor-pointer ${
                isActive
                  ? 'text-[#0058bc] dark:text-[#adc6ff] bg-blue-50/80 dark:bg-blue-950/40 border-r-4 border-[#0058bc] dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0058bc] hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <IconComponent className={`w-4.5 h-4.5 ${isActive ? 'text-[#0058bc] dark:text-[#adc6ff]' : ''}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Utility Actions */}
      <div className="px-4 mt-auto pt-4 border-t border-slate-200 dark:border-slate-800/80">
        <button
          onClick={onGlobalReset}
          className="w-full py-2 px-3 bg-[#0058bc] hover:bg-[#004bb3] dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          Global Reset
        </button>

        <div className="mt-4 space-y-1">
          <button
            onClick={onOpenHelp}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-[#0058bc] dark:text-slate-400 dark:hover:text-[#adc6ff] transition-colors text-xs font-semibold cursor-pointer text-left"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & Cheat Sheet</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-rose-500 hover:text-rose-600 transition-colors text-xs font-semibold cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
