
import { Calendar, X, ListChecks, Info, Bookmark, ExternalLink, CheckSquare, Square } from 'lucide-react';
import { getTypeStyles, renderTextWithLinks } from '../../utils/helpers';
import { generateTaskId } from '../../utils/idGenerator';

export default function DayDetailsModal({ selectedDay, setSelectedDay, getDayProgress, toggleInstruction, completedItems }) {
  if (!selectedDay) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:hidden">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-wider text-sm">
            <Calendar size={16} /> Week {selectedDay.weekNumber} • {selectedDay.day}
          </div>
          <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-slate-700 bg-slate-200/50 hover:bg-slate-200 rounded-full p-1.5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide mb-3 ${getTypeStyles(selectedDay.type).bg} ${getTypeStyles(selectedDay.type).text}`}>
              {getTypeStyles(selectedDay.type).icon} {selectedDay.type}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedDay.task}</h2>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-8">
            <div className="flex gap-3">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">Strategic Context</h4>
                <p className="text-sm text-blue-800 leading-relaxed">{selectedDay.description}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
              <h4 className="flex items-center gap-2 text-base font-bold text-slate-900">
                <ListChecks className="text-indigo-500" size={18} /> Granular Execution Checklist
              </h4>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                {getDayProgress(selectedDay.trackPrefix, selectedDay.weekNumber, selectedDay.day, selectedDay.instructions).done} / {selectedDay.instructions.length} Tasks
              </span>
            </div>
            
            <div className="space-y-3">
              {selectedDay.instructions.map((instruction, idx) => {
                const id = generateTaskId(selectedDay.trackPrefix, selectedDay.weekNumber, selectedDay.day, instruction);
                const isChecked = !!completedItems[id];
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleInstruction(selectedDay.trackPrefix, selectedDay.weekNumber, selectedDay.day, idx, instruction)}
                    className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'}`}
                  >
                    <div className={`shrink-0 mt-0.5 transition-colors ${isChecked ? 'text-emerald-500' : 'text-slate-300'}`}>
                      {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
                    </div>
                    <span className={`text-sm leading-relaxed ${isChecked ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                      {renderTextWithLinks(instruction)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedDay.resources && selectedDay.resources.length > 0 && (
            <div className="mt-6 border-t border-slate-200 pt-5">
              <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3">
                <Bookmark className="text-indigo-500" size={18} /> Today's Resources
              </h4>
              <div className="flex flex-col gap-3">
                {selectedDay.resources.map((res, idx) => (
                  <a 
                    key={idx} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-2 p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg text-sm transition-colors"
                  >
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500 shrink-0" />
                    <span className="font-medium text-slate-700 group-hover:text-indigo-700">{res.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button onClick={() => setSelectedDay(null)} className="px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm bg-slate-800 text-white hover:bg-slate-700 hover:shadow-md">
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
