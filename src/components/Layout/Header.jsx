import { NavLink, useLocation } from 'react-router-dom';
import { Trophy, Bookmark, Printer, LogOut, Code, Flame, LayoutDashboard, ListChecks, CheckCircle2 } from 'lucide-react';

export default function Header({ isLocalMode, user, progress, streak, setShowResources, handleLogout }) {
  const location = useLocation();
  const path = location.pathname;

  // Determine which progress to show based on the active route
  let displayProgress = progress.overall;
  let progressLabel = "Overall Progress";
  let barColor = "bg-emerald-500";

  if (path === '/gtme') {
    displayProgress = progress.gtme;
    progressLabel = "GTME Track Progress";
    barColor = "bg-indigo-600";
  } else if (path === '/swe') {
    displayProgress = progress.swe;
    progressLabel = "SWE Track Progress";
    barColor = "bg-purple-600";
  } else if (path === '/habits') {
    displayProgress = progress.habits;
    progressLabel = "Daily Habits Progress";
    barColor = "bg-emerald-500";
  }
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 pb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 lg:gap-3">
            <Trophy className="text-indigo-600 w-6 h-6 lg:w-7 lg:h-7" />
            <div className="flex items-center gap-2 lg:gap-3">
              <h1 className="text-lg lg:text-xl font-bold text-slate-900">LifeOS</h1>
              {isLocalMode && (
                <span className="bg-amber-100 text-amber-800 text-[10px] lg:text-xs font-bold px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-md border border-amber-200 uppercase tracking-wide flex items-center gap-1">
                  <Code size={10} className="lg:w-3 lg:h-3"/> <span className="hidden sm:inline">Local Dev</span>
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="text-xs lg:text-sm font-medium text-slate-600 hidden md:block">
              <span className="text-slate-900">{user.email}</span>
            </div>
            <button onClick={() => setShowResources(true)} className="flex items-center gap-1 lg:gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-2 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors">
              <Bookmark size={16} /> <span className="hidden lg:inline">Resources</span>
            </button>
            <button onClick={() => window.print()} className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              <Printer size={16} /> <span className="hidden lg:inline">Print</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1 lg:gap-2 bg-red-50 hover:bg-red-100 text-red-600 p-2 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors">
              <LogOut size={16} /> <span className="hidden lg:inline">Exit</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Hidden on Mobile, shown on Large screens */}
        <div className="hidden lg:flex items-center gap-8 mt-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex items-center gap-2 py-3 border-b-2 font-bold text-sm transition-all ${isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink 
            to="/gtme" 
            className={({ isActive }) => `flex items-center gap-2 py-3 border-b-2 font-bold text-sm transition-all ${isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            <ListChecks size={18} /> GTME Track
          </NavLink>
          <NavLink 
            to="/swe" 
            className={({ isActive }) => `flex items-center gap-2 py-3 border-b-2 font-bold text-sm transition-all ${isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            <Code size={18} /> SWE Track
          </NavLink>
          <NavLink 
            to="/habits" 
            className={({ isActive }) => `flex items-center gap-2 py-3 border-b-2 font-bold text-sm transition-all ${isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            <CheckCircle2 size={18} /> Daily Habits
          </NavLink>
        </div>
        
        <div className="py-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-sm font-medium text-slate-600 mb-2">
            <div className="flex items-center gap-4">
              <span>{progressLabel} ({displayProgress}%)</span>
              {streak && streak.current > 0 && (
                <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-2 py-0.5 rounded border border-orange-100 font-bold" title={`Max Streak: ${streak.max} Days`}>
                  <Flame size={16} className={streak.current > 2 ? "animate-pulse" : ""} />
                  {streak.current} Day Streak!
                </div>
              )}
            </div>
            <span className="text-emerald-500 font-bold">{displayProgress === 100 ? 'Completed!' : ''}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className={`h-2.5 rounded-full transition-all duration-500 ease-out ${barColor}`} style={{ width: `${displayProgress}%` }}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
