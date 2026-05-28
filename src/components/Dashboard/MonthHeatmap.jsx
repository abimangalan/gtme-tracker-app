import { useRef, useEffect, useState } from 'react';
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
  const scrollRef = useRef(null);
  // Fade is shown only when content is mid-scroll (not at either extreme)
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft >= scrollWidth - clientWidth - 1;
      setShowFade(!atStart && !atEnd);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col relative z-0 isolate">
      {/* 1. Header Section - Strongly Anchored */}
      <div className="px-4 lg:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xs lg:text-sm font-black text-slate-900 uppercase tracking-widest leading-none">
              Monthly Momentum
            </h2>
            <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              28-Day Performance Visualization
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-lg border border-slate-100 self-start sm:self-auto">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-sm bg-slate-100 border border-slate-200"></div>
               <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase">Planned</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-sm bg-emerald-500"></div>
               <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase">Achieved</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* 2. Main Data Region - High Density */}
      <div className="relative overflow-hidden group">
        
        {/* MOBILE ONLY: Frozen Overlay Panel */}
        {/*
          The overlay sits at left-0 of this wrapper.
          The scrollable container below is shifted right by ml-32 on mobile,
          so its clipping left-edge aligns with the overlay's right edge.
          Data cells are therefore PHYSICALLY CONTAINED within the scroll container
          and can never appear behind the overlay — no z-index tricks needed.
        */}
        <div className="lg:hidden absolute left-0 top-0 bottom-0 z-30 w-32 bg-white pointer-events-none flex flex-col p-4 overflow-hidden">
           {/* Vertical Spacer for Axis */}
           <div className="h-6 mb-3"></div>
           {/* Habit Label Column */}
           <div className="space-y-1.5 flex flex-col flex-1">
             {HABITS.map(habit => (
               <div key={habit.id} className="h-[21px] flex items-center justify-end pr-3">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-tight whitespace-nowrap">
                   {habit.label}
                 </span>
               </div>
             ))}
           </div>
        </div>

        {/*
          Dynamic Fade — sibling of the overlay, positioned at the overlay's right edge (left-32).
          Shown only when the user is mid-scroll (not at start, not at end).
          This signals "content is hidden behind the label panel."
        */}
        {showFade && (
          <div className="lg:hidden absolute top-0 bottom-0 left-32 z-20 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        )}

        {/*
          Scrollable Container.
          On mobile: ml-32 shifts it right so its left clipping edge = overlay right edge (x=128).
          Data cells inside can never appear at x < 128 in the viewport — the container clips them.
          On desktop: lg:ml-0 restores normal layout (no overlay, no shift needed).
        */}
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar scroll-smooth ml-32 lg:ml-0">
          <div className="inline-block min-w-full align-middle pt-4 pr-4 pb-4 pl-0 lg:p-6">
            <div className="flex flex-col">
              
              {/* Day Markers Axis */}
              <div className="flex items-center mb-3">
                {/* Spacer — desktop only. Mobile uses ml-32 on the container instead. */}
                <div className="hidden lg:block w-32 shrink-0 pr-3"></div>
                
                <div className="flex gap-1 lg:gap-1.5 ml-2">
                  {days.map((_, idx) => (
                    <div key={idx} className="w-[18px] lg:w-5 shrink-0 flex items-center justify-center">
                      {((idx + 1) % 7 === 1 || idx === 0) && (
                        <span className="text-[9px] font-black text-slate-300 uppercase">D{idx + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Grid Rows */}
              <div className="space-y-1.5">
                {HABITS.map(habit => (
                  <div key={habit.id} className="flex items-center group/row">
                    {/* Label — desktop only. Mobile label is rendered in the overlay above. */}
                    <div className="hidden lg:flex w-32 shrink-0 items-center justify-end pr-3 py-1.5 transition-colors">
                      <span className="text-[11px] font-black text-slate-600 whitespace-nowrap uppercase tracking-tight group-hover/row:text-indigo-600 transition-colors">
                        {habit.label}
                      </span>
                    </div>
                    {/* No mobile spacer — ml-32 on the container already provides the 128px offset. */}

                    {/* Data Cells */}
                    <div className="flex gap-1 lg:gap-1.5 ml-2">
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
                            className={`w-[18px] h-[18px] lg:w-5 lg:h-5 rounded-sm shrink-0 transition-all duration-300 ${
                              isWeekendAndRest ? 'bg-slate-50 border border-slate-100 opacity-40' :
                              completed ? 'bg-emerald-500 border border-emerald-600/10 shadow-sm' : 'bg-slate-100 border border-slate-200/50 hover:border-slate-300'
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
      </div>

      {/* 3. Integrated Footer - Anchored to Widget */}
      <div className="bg-slate-900 px-4 lg:px-6 py-2.5 flex justify-between items-center mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none">
            Active Performance Pulse
          </span>
        </div>
        <div className="lg:hidden flex items-center gap-2 bg-slate-800/50 px-2 py-1 rounded-md">
          <span className="text-[8px] text-indigo-300 font-black uppercase tracking-tighter">Swipe Cycle</span>
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-indigo-500/30"></div>
             <div className="w-1 h-1 rounded-full bg-indigo-500/60"></div>
             <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
