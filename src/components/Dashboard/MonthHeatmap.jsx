import { generateHabitId } from '../../utils/idGenerator';

const HABITS = [
  { id: 'gtme', label: 'GTME Training' },
  { id: 'swe', label: 'SWE Upskilling' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'affirmation', label: 'Affirmation' },
  { id: 'exercise', label: 'Exercise' }
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function MonthHeatmap({ 
  combinedWeeks = [],
  completedItems, 
  getDayProgress 
}) {
  // Flatten all 28 days of the current month
  const days = [];
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
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50/50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider">Monthly Momentum</h2>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1">
             <div className="w-2.5 h-2.5 rounded-sm bg-slate-200"></div>
             <span className="text-[10px] font-bold text-slate-400 uppercase">Planned</span>
           </div>
           <div className="flex items-center gap-1">
             <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
             <span className="text-[10px] font-bold text-slate-400 uppercase">Done</span>
           </div>
        </div>
      </div>
      
      <div className="relative group">
        <div className="overflow-x-auto no-scrollbar pb-1">
          <div className="inline-block min-w-full align-middle">
            <div className="p-4">
              {/* Day Numbers Row - Aligned with cells */}
              <div className="flex items-center mb-2">
                <div className="sticky left-0 z-30 w-24 lg:w-28 shrink-0 bg-white"></div> {/* Sticky Spacer */}
                <div className="sticky left-[96px] lg:left-[112px] z-20 w-8 h-4 bg-gradient-to-r from-white to-transparent pointer-events-none -ml-8"></div>
                <div className="flex gap-2 -ml-8">
                  {days.map((_, idx) => (
                    <div key={idx} className="w-[18px] lg:w-5 flex items-center justify-center text-[10px] text-slate-300 font-black">
                      {(idx + 1) % 7 === 0 || idx === 0 ? idx + 1 : ''}
                    </div>
                  ))}
                </div>
              </div>

              {/* Habit Rows */}
              <div className="space-y-2">
                {HABITS.map(habit => (
                  <div key={habit.id} className="flex items-center">
                    {/* Sticky Label (Grounded with solid background) */}
                    <div className="sticky left-0 z-30 w-24 lg:w-28 shrink-0 flex items-center justify-end pr-3 bg-white py-0.5">
                      <span className="text-[10px] lg:text-xs font-bold text-slate-500 whitespace-nowrap uppercase tracking-tight">
                        {habit.label}
                      </span>
                    </div>

                    {/* Smooth Left-Fade Overlay (masks grid as it slides left) */}
                    <div className="sticky left-[96px] lg:left-[112px] z-20 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none -ml-8"></div>

                    {/* Cells Grid */}
                    <div className="flex gap-2 -ml-8">
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
                            title={`${habit.label} - Day ${idx + 1}`}
                            className={`w-[18px] h-[18px] lg:w-5 lg:h-5 rounded-sm transition-all duration-200 border-b-2 ${
                              isWeekendAndRest ? 'bg-slate-50 border-transparent opacity-40' :
                              completed ? 'bg-emerald-500 border-emerald-600/20' : 'bg-slate-100 border-slate-200/50'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Improved Integrated Scroll Affordance (Right Side Fade) */}
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 lg:group-hover:opacity-0 transition-opacity"></div>
      </div>

      {/* Footer / Caption */}
      <div className="bg-slate-50/50 px-4 py-2 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase italic tracking-tighter">
          Visualizing 28-day performance cycles
        </span>
        <div className="lg:hidden flex items-center gap-1 text-[10px] text-indigo-400 font-black uppercase">
          Swipe to view more <span className="animate-pulse">→</span>
        </div>
      </div>
    </div>
  );
}
