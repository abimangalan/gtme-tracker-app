import { useState } from 'react';
import { Calendar } from 'lucide-react';
import DayCard from '../Dashboard/DayCard';
import PhaseNavigation from '../Dashboard/PhaseNavigation';
import { sweData } from '../../data/sweData';

export default function SweView({ getDayProgress, setSelectedDay }) {
  const [activePhase, setActivePhase] = useState(0);
  const currentPhase = sweData[activePhase];

  if (!currentPhase || currentPhase.weeks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <PhaseNavigation 
          activePhase={activePhase} 
          setActivePhase={setActivePhase} 
        />
        <div className="mt-8 text-center">
          <p className="text-lg font-medium">No SWE track data available for this month.</p>
          <p className="text-sm">Please select a different month from the navigation above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="print:block">
      <PhaseNavigation 
        activePhase={activePhase} 
        setActivePhase={setActivePhase} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:hidden">
        {currentPhase.weeks.map((week) => (
          <div key={week.weekNumber} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-1">
                <Calendar size={14} /> Week {week.weekNumber}
              </div>
              <h3 className="text-white font-semibold leading-tight">{week.title}</h3>
            </div>

            <div className="p-3 space-y-3 flex-1 bg-slate-50/50">
              {week.days.map((day, idx) => {
                const dayProgress = getDayProgress('swe-w', week.weekNumber, day.day, day.instructions);
                return (
                  <DayCard 
                    key={idx} 
                    day={day} 
                    weekNumber={week.weekNumber} 
                    dayProgress={dayProgress} 
                    setSelectedDay={(data) => setSelectedDay({ trackPrefix: 'swe-w', ...data })} 
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
