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
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
      {/* 1. Header Section - Strongly Anchored */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">
              Monthly Momentum
            </h2>
            <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-tighter">
              28-Day Performance Visualization
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm self-start sm:self-auto">
             <div className="flex items-center gap-1.5">
               <div className="w-2.5 h-2.5 rounded-sm bg-slate-200"></div>
               <span className="text-[9px] font-black text-slate-500 uppercase">Planned</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
               <span className="text-[9px] font-black text-slate-500 uppercase">Achieved</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* 2. Main Data Region - High Density */}
      <div className="relative group flex-1">
        <div className="overflow-x-auto no-scrollbar">
          <div className="inline-block min-w-full align-middle p-5 lg:p-6">
            <div className="flex flex-col">
              
              {/* Day Markers Axis */}
              <div className="flex items-center mb-4">
                <div className="w-24 lg:w-32 shrink-0"></div>
                <div className="flex gap-1 lg:gap-1.5">
                  {[1, 7, 14, 21, 28].map((num) => (
                    <div 
                      key={num} 
                      style={{ marginLeft: num === 1 ? 0 : 'calc(6 * (18px + 4px))' }} 
                      className="text-[9px] font-black text-slate-400 uppercase w-5 text-center"
                    >
                      D{num}
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Grid Rows */}
              <div className="space-y-1 lg:space-y-1.5">
                {HABITS.map(habit => (
                  <div key={habit.id} className="flex items-center group/row">
                    {/* Sticky Column - Integrated with Row */}
                    <div className="sticky left-0 z-30 w-24 lg:w-32 shrink-0 flex items-center justify-end pr-4 bg-white/90 backdrop-blur-md group-hover/row:bg-white transition-colors">
                      <span className="text-[10px] lg:text-xs font-black text-slate-600 whitespace-nowrap uppercase tracking-tight group-hover/row:text-indigo-600 transition-colors">
                        {habit.label}
                      </span>
                    </div>

                    {/* The Grid Blocks */}
                    <div className="flex gap-1 lg:gap-1.5 relative">
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
                            className={`w-[18px] h-[18px] lg:w-5 lg:h-5 rounded-sm transition-all duration-300 border-b border-r ${
                              isWeekendAndRest ? 'bg-slate-50 border-slate-100 opacity-30' :
                              completed ? 'bg-emerald-500 border-emerald-600/20' : 'bg-slate-100 border-slate-200/40'
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

        {/* Integrated Edge Fade (Affordance) */}
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white via-white/20 to-transparent pointer-events-none"></div>
      </div>

      {/* 3. Integrated Footer - Anchored to Widget */}
      <div className="bg-slate-900 px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Live Consistency Tracking
          </span>
        </div>
        <div className="lg:hidden flex items-center gap-1.5">
          <span className="text-[9px] text-indigo-400 font-black uppercase tracking-tighter">Swipe to explore cycle</span>
          <div className="flex gap-0.5">
             <div className="w-1 h-1 rounded-full bg-indigo-500/40"></div>
             <div className="w-1 h-1 rounded-full bg-indigo-500/70"></div>
             <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
