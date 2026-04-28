import React from 'react';
import { getTypeStyles } from '../../utils/helpers';

export default function DayCard({ day, weekNumber, dayProgress, setSelectedDay }) {
  const styles = getTypeStyles(day.type);
  
  return (
    <div onClick={() => setSelectedDay({ weekNumber, ...day })} className={`group relative p-3 rounded-lg border ${styles.bg} ${styles.border} cursor-pointer transition-all hover:shadow-md ${dayProgress.isAllDone ? 'opacity-60 grayscale bg-slate-100 border-slate-200' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${styles.text}`}>
          {styles.icon} {day.day}
        </div>
        <div className={`text-xs font-bold px-2 py-0.5 rounded-full border ${dayProgress.isAllDone ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white text-slate-500 border-slate-200'}`}>
          {dayProgress.done} / {dayProgress.total}
        </div>
      </div>
      <p className={`text-sm leading-snug line-clamp-2 ${dayProgress.isAllDone ? 'text-slate-500 line-through' : 'text-slate-800 font-medium'}`}>
        {day.task}
      </p>
    </div>
  );
}
