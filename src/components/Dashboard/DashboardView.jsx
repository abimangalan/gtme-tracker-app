import ProgressOverview from './ProgressOverview';
import MonthHeatmap from './MonthHeatmap';
import WeeklyChecklist from './WeeklyChecklist';
import { getCombinedWeeksForPhase } from '../../utils/trackMerger';

export default function DashboardView({ 
  activePhase, 
  completedItems,
  streak,
  toggleHabit, 
  getDayProgress,
  setSelectedDay 
}) {
  const combinedWeeks = getCombinedWeeksForPhase(activePhase);

  return (
    <div className="space-y-6">
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

      <div className="space-y-6">
        {combinedWeeks.map(({ gtme, swe }) => {
          const weekNumber = gtme?.weekNumber || swe?.weekNumber;
          return (
            <WeeklyChecklist 
              key={weekNumber}
              gtmeWeek={gtme}
              sweWeek={swe}
              completedItems={completedItems}
              toggleHabit={toggleHabit}
              getDayProgress={getDayProgress}
              setSelectedDay={setSelectedDay}
            />
          );
        })}
      </div>
    </div>
  );
}

