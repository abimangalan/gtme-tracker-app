import React from 'react';
import { Trophy, Bookmark, Printer, LogOut, Code } from 'lucide-react';

export default function Header({ isLocalMode, user, progress, setShowResources, handleLogout }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Trophy className="text-indigo-600" size={28} />
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900 hidden sm:block">GTM Engineering Tracker</h1>
              {isLocalMode && (
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 uppercase tracking-wide flex items-center gap-1">
                  <Code size={12}/> Local Dev Mode
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-slate-600 hidden md:block">
              Signed in as <span className="text-slate-900">{user.email}</span>
            </div>
            <button onClick={() => setShowResources(true)} className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              <Bookmark size={16} /> <span className="hidden sm:inline">Resources</span>
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              <Printer size={16} /> <span className="hidden sm:inline">Print</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              <LogOut size={16} /> <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
            <span>Overall Progress ({progress}%)</span>
            <span className="text-indigo-600 font-bold">{progress === 100 ? 'Completed!' : ''}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
