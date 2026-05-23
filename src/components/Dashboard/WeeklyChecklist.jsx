import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';

const EXTRA_HABITS = [
  { id: 'dsa', label: 'DSA' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'affirmation', label: 'Affirmation' },
  { id: 'exercise', label: 'Physical Exercise' }
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WeeklyChecklist({ 
  week, 
  completedItems, 
  toggleHabit, 
  getDayProgress,
  setSelectedDay
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold tracking-wider uppercase">
          <Calendar size={16} /> Week {week.weekNumber}: {week.title}
        </div>
      </div>

      <div className="p-4 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {DAYS_OF_WEEK.map((dayName, idx) => {
            const gtmeDay = week.days.find(d => d.day === dayName);
            let gtmeProgress = null;
            if (gtmeDay) {
              gtmeProgress = getDayProgress(week.weekNumber, dayName, gtmeDay.instructions);
            }

            let dayTotal = EXTRA_HABITS.length;
            let dayDone = 0;

            if (gtmeDay) {
              gtmeProgress = getDayProgress(week.weekNumber, dayName, gtmeDay.instructions);
              dayTotal += gtmeProgress.total;
              dayDone += gtmeProgress.done;
            }

            EXTRA_HABITS.forEach(habit => {
              if (completedItems[`habit-w${week.weekNumber}-${dayName}-${habit.id}`]) {
                dayDone++;
              }
            });

            const dayProgressPct = dayTotal > 0 ? (dayDone / dayTotal) * 100 : 0;

            return (
              <div key={idx} className="bg-white border text-center border-slate-200 rounded-lg p-3 flex flex-col shadow-sm">
                <div className="mb-3 border-b border-slate-100 pb-3">
                  <h4 className="text-slate-700 font-bold">{dayName}</h4>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${dayProgressPct === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                      style={{ width: `${dayProgressPct}%` }}
                    ></div>
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    {dayDone}/{dayTotal} Completed
                  </div>
                </div>
                
                <div className="space-y-3 flex-1 flex flex-col text-left">
                  {/* GTME Section */}
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">GTME Track</h5>
                    {gtmeDay ? (
                      <div 
                        className={`text-xs p-2 rounded border cursor-pointer flex items-center justify-between transition-colors
                          ${gtmeProgress.isAllDone 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                            : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'}`}
                        onClick={() => setSelectedDay({ weekNumber: week.weekNumber, ...gtmeDay })}
                      >
                        <span className="font-medium truncate max-w-[100px]">{gtmeProgress.isAllDone ? "Completed" : "Pending"}</span>
                        <ChevronRight size={14} />
                      </div>
                    ) : (
                      <div className="text-xs p-2 rounded border border-slate-100 bg-slate-50 text-slate-400 text-center">
                        Rest Day
                      </div>
                    )}
                  </div>

                  {/* Other Habits */}
                  <div className="pt-2">
                     <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-2">Daily Habits</h5>
                     <div className="space-y-2">
                       {EXTRA_HABITS.map(habit => {
                         const id = `habit-w${week.weekNumber}-${dayName}-${habit.id}`;
                         const isCompleted = !!completedItems[id];
                         
                         return (
                           <label key={habit.id} className="flex items-center gap-2 cursor-pointer group">
                             <input 
                               type="checkbox" 
                               checked={isCompleted}
                               onChange={() => toggleHabit(week.weekNumber, dayName, habit.id)}
                               className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                             />
                             <span className={`text-xs font-medium transition-colors ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-indigo-600'}`}>
                               {habit.label}
                             </span>
                           </label>
                         );
                       })}
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
