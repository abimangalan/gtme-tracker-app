import React from 'react';
import { Bookmark, X, ExternalLink } from 'lucide-react';
import { resourceData } from '../../data/resourceData';

export default function ResourcesModal({ showResources, setShowResources }) {
  if (!showResources) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:hidden">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-wider text-sm">
            <Bookmark size={18} /> Required Course Materials & Links
          </div>
          <button onClick={() => setShowResources(false)} className="text-slate-400 hover:text-slate-700 bg-slate-200/50 hover:bg-slate-200 rounded-full p-1.5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto bg-slate-50/30">
          <div className="grid md:grid-cols-2 gap-6">
            {resourceData.map((section, sIdx) => (
              <div key={sIdx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">{section.category}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                      >
                        <ExternalLink size={16} className="shrink-0 mt-0.5 text-slate-400 group-hover:text-indigo-500" />
                        <span className="leading-snug">{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button onClick={() => setShowResources(false)} className="px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm bg-slate-800 text-white hover:bg-slate-700 hover:shadow-md">
            Close Library
          </button>
        </div>
      </div>
    </div>
  );
}
