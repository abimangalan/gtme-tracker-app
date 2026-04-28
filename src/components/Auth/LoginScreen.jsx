import React from 'react';
import { Trophy, Code } from 'lucide-react';
import { isLocalhost } from '../../config/firebase';

export default function LoginScreen({ handleLogin, enableLocalMode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
        <Trophy className="text-indigo-600 mx-auto mb-4" size={48} />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">GTM Transition Tracker</h1>
        <p className="text-slate-600 mb-8">Sign in to sync your progress across devices.</p>
        <div className="space-y-4">
          <button onClick={handleLogin} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors">
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            Sign in with Google
          </button>
          {isLocalhost && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Or</span></div>
              </div>
              <button onClick={enableLocalMode} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Code size={18} /> Test Locally (No Login)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
