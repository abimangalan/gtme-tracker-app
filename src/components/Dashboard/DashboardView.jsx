import React from 'react';
import ProgressOverview from './ProgressOverview';
import MonthHeatmap from './MonthHeatmap';
import WeeklyChecklist from './WeeklyChecklist';
import { scheduleData } from '../../data/scheduleData';
import { sweData } from '../../data/sweData';

export default function DashboardView({ 
  activePhase, 
  completedItems,
  streak,
  toggleHabit, 
  getDayProgress,
  setSelectedDay 
}) {
  const currentGtmePhase = scheduleData[activePhase] || { weeks: [] };
  const currentSwePhase = sweData[activePhase] || { weeks: [] };

  const combinedWeeksMap = new Map();
  if (currentGtmePhase.weeks) {
    currentGtmePhase.weeks.forEach(w => combinedWeeksMap.set(w.weekNumber, { gtme: w, swe: null }));
  }
  if (currentSwePhase.weeks) {
    currentSwePhase.weeks.forEach(w => {
      if (combinedWeeksMap.has(w.weekNumber)) {
        combinedWeeksMap.get(w.weekNumber).swe = w;
      } else {
        combinedWeeksMap.set(w.weekNumber, { gtme: null, swe: w });
      }
    });
  }

  const combinedWeeks = Array.from(combinedWeeksMap.values()).sort((a,b) => {
    const aNum = a.gtme?.weekNumber || a.swe?.weekNumber;
    const bNum = b.gtme?.weekNumber || b.swe?.weekNumber;
    return aNum - bNum;
  });

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
