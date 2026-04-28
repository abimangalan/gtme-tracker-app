import React from 'react';
import { Database, Code } from 'lucide-react';
import { isLocalhost } from '../../config/firebase';

export default function SetupScreen({ enableLocalMode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
        <Database className="text-orange-500 mx-auto mb-4" size={48} />
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Database Setup Required</h1>
        <p className="text-slate-600 mb-6 leading-relaxed">
          To enable cloud sync, you need to add your Firebase config to the code. {isLocalhost ? "However, you can easily bypass this for local development and testing right now." : ""}
        </p>
        {isLocalhost && (
          <button onClick={enableLocalMode} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 mx-auto transition-all shadow-md">
            <Code size={20} /> Skip Setup & Run Locally (Dev Mode)
          </button>
        )}
      </div>
    </div>
  );
}
