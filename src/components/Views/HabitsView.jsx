import { useState } from 'react';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import PhaseNavigation from '../Dashboard/PhaseNavigation';
import { getAllCombinedWeeks } from '../../utils/trackMerger';
import { generateHabitId } from '../../utils/idGenerator';

const EXTRA_HABITS = [
  { id: 'meditation', label: 'Meditation', icon: '🧘' },
  { id: 'affirmation', label: 'Affirmation', icon: '✨' },
  { id: 'exercise', label: 'Physical Exercise', icon: '🏃' }
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function HabitsView({ completedItems, toggleHabit }) {
  const [activePhase, setActivePhase] = useState(0);
  
  // Filter weeks for the active phase
  const allWeeks = getAllCombinedWeeks();
  const phaseWeeks = allWeeks.filter(w => {
    const weekNum = w.gtme?.weekNumber || w.swe?.weekNumber;
    return Math.ceil(weekNum / 4) === (activePhase + 1);
  });

  return (
    <div className="space-y-6">
      <PhaseNavigation 
        activePhase={activePhase} 
        setActivePhase={setActivePhase} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phaseWeeks.map((week) => {
          const weekNumber = week.gtme?.weekNumber || week.swe?.weekNumber;
          const title = week.gtme?.title || week.swe?.title;

          return (
            <div key={weekNumber} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Calendar size={18} className="text-indigo-400" />
                  Week {weekNumber}: {title}
                </h3>
              </div>

              <div className="p-5">
                <div className="space-y-6">
                  {DAYS_OF_WEEK.map((dayName) => (
                    <div key={dayName} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{dayName}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {EXTRA_HABITS.map((habit) => {
                          const id = generateHabitId(weekNumber, dayName, habit.id);
                          const isCompleted = !!completedItems[id];

                          return (
                            <div 
                              key={habit.id}
                              onClick={() => toggleHabit(weekNumber, dayName, habit.id)}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                isCompleted 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-inner' 
                                  : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-white'
                              }`}
                            >
                              <div className="text-lg">{habit.icon}</div>
                              <div className="flex-1">
                                <p className={`text-xs font-bold ${isCompleted ? 'text-emerald-700' : 'text-slate-700'}`}>
                                  {habit.label}
                                </p>
                              </div>
                              {isCompleted ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} className="text-slate-300" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
