import { Calendar } from 'lucide-react';
import DayCard from './DayCard';
import { scheduleData } from '../../data/scheduleData';

export default function WeeklyGrid({ activePhase, getDayProgress, setSelectedDay }) {
  const currentPhase = scheduleData[activePhase];

  if (!currentPhase) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <p className="text-lg font-medium">No track data available for this month.</p>
        <p className="text-sm">Please select a different month from the navigation above.</p>
      </div>
    );
  }

  return (
    <div className="print:block">
      {/* Screen Layout */}
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
                const dayProgress = getDayProgress('w', week.weekNumber, day.day, day.instructions);
                return <DayCard key={idx} day={day} weekNumber={week.weekNumber} dayProgress={dayProgress} setSelectedDay={(data) => setSelectedDay({ trackPrefix: 'w', ...data })} />;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Print Layout */}
      <div className="hidden print:block space-y-8">
        {scheduleData.map((phase, pIdx) => (
          <div key={pIdx} className="break-inside-avoid mb-8">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4">{phase.phase}</h2>
            <div className="grid grid-cols-4 gap-4">
              {phase.weeks.map((week) => (
                <div key={week.weekNumber} className="border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 px-3 py-2 border-b border-slate-300">
                    <span className="font-bold text-sm">Week {week.weekNumber}:</span>
                    <div className="text-xs font-semibold">{week.title}</div>
                  </div>
                  <div className="p-2 space-y-2">
                    {week.days.map((day, dIdx) => (
                      <div key={dIdx} className="text-xs mb-2 pb-2 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                        <span className="font-bold">{day.day}</span> <span className="text-slate-500">({day.type})</span>
                        <p className="mt-1 font-medium">{day.task}</p>
                        <ul className="mt-1 pl-3 list-disc text-slate-600">
                          {day.instructions.map((inst, i) => <li key={i}>{inst}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
