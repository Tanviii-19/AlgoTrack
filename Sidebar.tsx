import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  X, 
  Info, 
  RefreshCw,
  LogOut,
  Award,
  BookOpen,
  Code
} from 'lucide-react';
import { dsaData } from './data';
import { UserProgress, ViewType } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProblemTable from './components/ProblemTable';
import MockTestPanel from './components/MockTestPanel';
import AnalyticsPanel from './components/AnalyticsPanel';

export default function App() {
  // Sync state from LocalStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('algotrack_progress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse progress:", e);
        }
      }
    }
    return {};
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<ViewType>('Overview');
  const [trackName, setTrackName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('algotrack_name') || 'Dev Revision';
    }
    return 'Dev Revision';
  });

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [logoutToast, setLogoutToast] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('algotrack_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('algotrack_name', trackName);
  }, [trackName]);

  // Overall statistics
  const totalProblemsList = dsaData.flatMap((cat) => cat.problems);
  const totalProblemsCount = totalProblemsList.length;
  const totalCompletedCount = totalProblemsList.filter((p) => userProgress[p.id]?.completed).length;
  const overallPercentage = totalProblemsCount === 0 ? 0 : Math.round((totalCompletedCount / totalProblemsCount) * 100);

  const easyCompletedCount = totalProblemsList.filter((p) => p.difficulty === 'Easy' && userProgress[p.id]?.completed).length;
  const mediumCompletedCount = totalProblemsList.filter((p) => p.difficulty === 'Medium' && userProgress[p.id]?.completed).length;
  const hardCompletedCount = totalProblemsList.filter((p) => p.difficulty === 'Hard' && userProgress[p.id]?.completed).length;

  // Filters categories based on sidebar choice
  const getFilteredCategoriesByView = () => {
    if (activeView === 'Data Structures') {
      const dsList = [
        'Arrays',
        'Hash Map / Hashing',
        'Linked List',
        'Stack / Monotonic Stack',
        'Heap / Top K Elements',
        'Trees (DFS)',
        'Trees (BFS)',
        'Binary Search Tree',
        'Trie',
        'Graphs'
      ];
      return dsaData.filter(cat => dsList.includes(cat.category));
    }
    if (activeView === 'Algorithms') {
      const algoList = [
        'Two Pointers',
        'Sliding Window',
        'Prefix Sum',
        'Fast & Slow Pointers (Cycle Detection)',
        'Binary Search',
        'Backtracking',
        'Union Find',
        'Dynamic Programming',
        'Greedy',
        'Bit Manipulation'
      ];
      return dsaData.filter(cat => algoList.includes(cat.category));
    }
    return dsaData; // Overview or Settings or Mock Tests
  };

  const filteredCategories = getFilteredCategoriesByView();

  // Callbacks
  const handleToggleProblem = (id: number, checked: boolean) => {
    setUserProgress((prev) => {
      const updated = { ...prev };
      if (!updated[id]) {
        updated[id] = { completed: false, date: '', starred: false, note: '' };
      }
      updated[id].completed = checked;
      updated[id].date = checked ? new Date().toLocaleDateString() : '';
      return updated;
    });
  };

  const handleUpdateNote = (id: number, note: string) => {
    setUserProgress((prev) => {
      const updated = { ...prev };
      if (!updated[id]) {
        updated[id] = { completed: false, date: '', starred: false, note: '' };
      }
      updated[id].note = note;
      return updated;
    });
  };

  const handleToggleStar = (id: number) => {
    setUserProgress((prev) => {
      const updated = { ...prev };
      if (!updated[id]) {
        updated[id] = { completed: false, date: '', starred: false, note: '' };
      }
      updated[id].starred = !updated[id].starred;
      return updated;
    });
  };

  const handleMarkAll = (categoryIdx: number, status: boolean) => {
    const category = dsaData[categoryIdx];
    setUserProgress((prev) => {
      const updated = { ...prev };
      category.problems.forEach((p) => {
        if (!updated[p.id]) {
          updated[p.id] = { completed: false, date: '', starred: false, note: '' };
        }
        updated[p.id].completed = status;
        updated[p.id].date = status ? new Date().toLocaleDateString() : '';
      });
      return updated;
    });
  };

  const handleGlobalReset = () => {
    if (confirm("Are you sure you want to clear all revision progress? This cannot be undone.")) {
      setUserProgress({});
      alert("All progress cleared successfully.");
    }
  };

  const handleLogout = () => {
    setLogoutToast(true);
    setTimeout(() => {
      setLogoutToast(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200 font-sans">
      
      {/* Header Panel */}
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        activeView={activeView}
        setActiveView={setActiveView}
        userName={trackName}
      />

      {/* Sidebar Panel */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        onGlobalReset={handleGlobalReset}
        onOpenHelp={() => setHelpModalOpen(true)}
        onLogout={handleLogout}
        trackName={trackName}
      />

      {/* Main Container */}
      <main className="lg:ml-64 pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-between">
        
        {/* Main Content Areas depending on selected Tab */}
        <div className="flex-1 space-y-6">
          
          {(activeView === 'Overview' || activeView === 'Data Structures' || activeView === 'Algorithms') && (
            <>
              {/* Header Title Area */}
              <div className="text-left">
                <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  {activeView === 'Overview' ? 'Syllabus Dashboard' : activeView}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {activeView === 'Overview' 
                    ? 'Track completion, star critical questions, write runtime complexities notes, and structure your revision.'
                    : `Filtered view containing only topic cards related to ${activeView}.`
                  }
                </p>
              </div>

              {/* Global Progress Statistics Banners */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Progress bar and percentages */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col justify-between text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Progress</span>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-black text-[#0058bc] dark:text-blue-400">{overallPercentage}%</span>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 mb-1">{totalCompletedCount} / {totalProblemsCount}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-3">
                    <div 
                      style={{ width: `${overallPercentage}%` }} 
                      className="h-full bg-[#0058bc] dark:bg-blue-400 transition-all duration-500" 
                    />
                  </div>
                </div>

                {/* Easy Count */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Easy Target</span>
                  <span className="text-2xl font-extrabold text-[#00b8a3] mt-1">{easyCompletedCount}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">Solved</span>
                </div>

                {/* Medium Count */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Medium Target</span>
                  <span className="text-2xl font-extrabold text-[#ffb800] mt-1">{mediumCompletedCount}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">Solved</span>
                </div>

                {/* Hard Count */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hard Target</span>
                  <span className="text-2xl font-extrabold text-[#ff2d55] mt-1">{hardCompletedCount}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">Solved</span>
                </div>
              </div>

              {/* Collapsible Topics Component */}
              <ProblemTable 
                categories={filteredCategories}
                userProgress={userProgress}
                searchTerm={searchTerm}
                onToggleProblem={handleToggleProblem}
                onUpdateNote={handleUpdateNote}
                onToggleStar={handleToggleStar}
                onMarkAll={handleMarkAll}
              />
            </>
          )}

          {activeView === 'Mock Tests' && (
            <MockTestPanel 
              userProgress={userProgress} 
              onToggleProblem={handleToggleProblem} 
            />
          )}

          {activeView === 'Settings' && (
            <AnalyticsPanel 
              userProgress={userProgress} 
              onClearData={handleGlobalReset}
              trackName={trackName}
              setTrackName={setTrackName}
            />
          )}

        </div>

        {/* Dynamic footer text */}
        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-xs max-w-xl font-medium leading-relaxed">
            "Focus on quality over quantity. Revise the logic, time complexity, and edge cases for every problem."
          </p>
          <button 
            onClick={handleGlobalReset}
            className="flex items-center gap-1 px-4 py-2 border border-rose-200 dark:border-rose-900/60 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset All Revision Data
          </button>
        </footer>

      </main>

      {/* Floating help modal/dialog */}
      {helpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up text-left flex flex-col max-h-[85vh]">
            
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/20">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0058bc]" />
                <h3 className="text-md font-bold text-slate-800 dark:text-slate-100">Help & Big-O Cheat Sheet</h3>
              </div>
              <button 
                onClick={() => setHelpModalOpen(false)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* How to use */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-[#0058bc] tracking-wider">How to use AlgoTrack</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select a topic in the syllabus accordion and solve the problems on LeetCode by clicking their titles. Once successfully resolved, toggle the checkbox on the left to flag them as completed. Maintain space-time optimization tips in the "Notes" field. 
                </p>
              </div>

              {/* Time Complexities Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-[#0058bc] tracking-wider">Common Space-Time Target Benchmarks</h4>
                <div className="border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/30 font-bold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="px-4 py-2">Data Structure</th>
                        <th className="px-4 py-2">Access / Search</th>
                        <th className="px-4 py-2">Insertion / Deletion</th>
                        <th className="px-4 py-2">Space Complexity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono text-[11px]">
                      <tr>
                        <td className="px-4 py-2 font-semibold">Array / Vector</td>
                        <td className="px-4 py-2 text-emerald-500">O(1) / O(N)</td>
                        <td className="px-4 py-2 text-rose-500">O(N) / O(N)</td>
                        <td className="px-4 py-2">O(N)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-semibold">Hash Table</td>
                        <td className="px-4 py-2 text-emerald-500">O(1)</td>
                        <td className="px-4 py-2 text-emerald-500">O(1)</td>
                        <td className="px-4 py-2">O(N)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-semibold">Stack / Queue</td>
                        <td className="px-4 py-2 text-rose-500">O(N)</td>
                        <td className="px-4 py-2 text-emerald-500">O(1)</td>
                        <td className="px-4 py-2">O(N)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-semibold">Binary Search Tree</td>
                        <td className="px-4 py-2 text-amber-500">O(log N)</td>
                        <td className="px-4 py-2 text-amber-500">O(log N)</td>
                        <td className="px-4 py-2">O(N)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revision tips */}
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-700/60 pt-4">
                <h4 className="text-xs font-bold uppercase text-[#0058bc] tracking-wider">Top Revision Strategies</h4>
                <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                  <li><strong>Active Recall:</strong> Avoid looking at code drafts immediately. Write pseudo-logic diagrams in your custom note boxes.</li>
                  <li><strong>Spaced Repetition:</strong> Re-visit starred / favorite questions every 3 days.</li>
                  <li><strong>Time Pressure:</strong> Generate mock tests under our "Mock Interview" view to simulate a strict real-world countdown.</li>
                </ul>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex justify-end bg-slate-50 dark:bg-slate-900/20">
              <button
                onClick={() => setHelpModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-xs font-bold cursor-pointer"
              >
                Close Help
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Logout simulation toast */}
      {logoutToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white border border-slate-700/80 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in text-left">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <div>
            <p className="text-xs font-bold">Logged out of cloud session (Demo Mode)</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Feel free to continue experimenting; your progress remains locally active.</p>
          </div>
        </div>
      )}

    </div>
  );
}
