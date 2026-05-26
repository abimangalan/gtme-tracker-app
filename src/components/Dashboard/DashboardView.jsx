import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressOverview from './ProgressOverview';
import MonthHeatmap from './MonthHeatmap';
import WeeklyChecklist from './WeeklyChecklist';
import PhaseNavigation from './PhaseNavigation';
import { getCombinedWeeksForPhase } from '../../utils/trackMerger';

export default function DashboardView({ 
  completedItems,
  streak,
  toggleHabit, 
  getDayProgress,
  setSelectedDay 
}) {
  const [activePhase, setActivePhase] = useState(0);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);

  const combinedWeeks = getCombinedWeeksForPhase(activePhase);
  const currentWeek = combinedWeeks[activeWeekIndex] || combinedWeeks[0];

  const handlePrevWeek = () => {
    setActiveWeekIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextWeek = () => {
    setActiveWeekIndex(prev => Math.min(combinedWeeks.length - 1, prev + 1));
  };

  const handlePhaseChange = (newPhase) => {
    setActivePhase(newPhase);
    setActiveWeekIndex(0); // Reset to first week of the month
  };

  return (
    <div className="space-y-6">
      <PhaseNavigation 
        activePhase={activePhase} 
        setActivePhase={handlePhaseChange} 
      />

      <ProgressOverview 
        combinedWeeks={combinedWeeks} 
        completedItems={completedItems} 
        streak={streak} 
      />

      <MonthHeatmap 
        combinedWeeks={combinedWeeks}
        completedItems={completedItems} 
        getDayProgress={getDayProgress} 
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            Weekly Execution
            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Week {activeWeekIndex + 1} of {combinedWeeks.length}
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevWeek}
              disabled={activeWeekIndex === 0}
              className={`p-2 rounded-lg border transition-all ${activeWeekIndex === 0 ? 'bg-slate-50 text-slate-300 border-slate-100' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNextWeek}
              disabled={activeWeekIndex === combinedWeeks.length - 1}
              className={`p-2 rounded-lg border transition-all ${activeWeekIndex === combinedWeeks.length - 1 ? 'bg-slate-50 text-slate-300 border-slate-100' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {currentWeek && (
          <WeeklyChecklist 
            key={`${activePhase}-${activeWeekIndex}`}
            gtmeWeek={currentWeek.gtme}
            sweWeek={currentWeek.swe}
            completedItems={completedItems}
            toggleHabit={toggleHabit}
            getDayProgress={getDayProgress}
            setSelectedDay={setSelectedDay}
          />
        )}
      </div>
    </div>
  );
}

