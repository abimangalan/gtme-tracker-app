import { generateHabitId } from '../../utils/idGenerator';

const HABITS = [
  { id: 'gtme', label: 'GTME Training' },
  { id: 'swe', label: 'SWE Upskilling' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'affirmation', label: 'Affirmation' },
  { id: 'exercise', label: 'Exercise' }
];

export default function MonthHeatmap({ 
  combinedWeeks = [],
  completedItems, 
  getDayProgress 
}) {
  const days = [];
  const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  combinedWeeks.forEach(({ gtme, swe }) => {
    DAYS_OF_WEEK.forEach(dayName => {
      const weekNum = gtme?.weekNumber || swe?.weekNumber;
      
      days.push({
        weekNumber: weekNum,
        dayName: dayName,
        gtmeDay: gtme ? gtme.days.find(d => d.day === dayName) : null,
        sweDay: swe ? swe.days.find(d => d.day === dayName) : null
      });
    });
  });

  const isHabitCompleted = (weekNum, dayName, habitId, dayData) => {
    if (habitId === 'gtme') {
      if (!dayData.gtmeDay) return false;
      const progress = getDayProgress('w', weekNum, dayName, dayData.gtmeDay.instructions);
      return progress.isAllDone;
    }
    if (habitId === 'swe') {
      if (!dayData.sweDay) return false;
      const progress = getDayProgress('swe-w', weekNum, dayName, dayData.sweDay.instructions);
      return progress.isAllDone;
    }
    const key = generateHabitId(weekNum, dayName, habitId);
    return !!completedItems[key];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 lg:p-6 mb-8 overflow-hidden">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Monthly Heatmap</h2>
      
      {/* Scrollable Container */}
      <div className="relative flex overflow-x-auto no-scrollbar pb-2">
        {/* Habit Labels Column - Sticky on mobile */}
        <div className="sticky left-0 z-20 flex flex-col justify-between pr-4 mt-6 space-y-2 bg-white border-r border-slate-100 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.05)]">
          {HABITS.map(habit => (
            <div key={habit.id} className="text-[10px] lg:text-xs font-bold text-slate-500 h-5 lg:h-6 flex items-center justify-end whitespace-nowrap">
              {habit.label}
            </div>
          ))}
        </div>
        
        {/* Heatmap Grid - With min-width to ensure square size */}
        <div className="flex-1 min-w-[700px] ml-2">
          {/* Day Numbers Row */}
          <div className="grid grid-cols-[repeat(28,minmax(0,1fr))] gap-1 mb-2">
            {days.map((_, idx) => (
              <div key={idx} className="flex items-center justify-center text-[10px] text-slate-400 font-bold">
                {idx + 1}
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            {HABITS.map(habit => (
              <div key={habit.id} className="grid grid-cols-[repeat(28,minmax(0,1fr))] gap-1 h-5 lg:h-6">
                {days.map((day, idx) => {
                  const completed = isHabitCompleted(day.weekNumber, day.dayName, habit.id, day);
                  
                  let isWeekendAndRest = false;
                  if (habit.id === 'gtme') {
                      isWeekendAndRest = (!day.gtmeDay || day.gtmeDay.instructions.length === 0);
                  } else if (habit.id === 'swe') {
                      isWeekendAndRest = (!day.sweDay || day.sweDay.instructions.length === 0);
                  }
                  
                  return (
                    <div 
                      key={idx}
                      title={`${habit.label} - Week ${day.weekNumber} ${day.dayName}`}
                      className={`w-full h-full rounded-sm transition-all duration-200 ${
                        isWeekendAndRest ? 'bg-slate-50 border border-slate-100/50' :
                        completed ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Hint */}
      <div className="lg:hidden flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-400 font-medium italic">
        <span>← Swipe to view more days →</span>
      </div>
    </div>
  );
}
