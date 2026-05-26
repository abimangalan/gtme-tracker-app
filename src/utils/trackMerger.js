import { scheduleData } from '../data/scheduleData';
import { sweData } from '../data/sweData';

/**
 * Merges GTME and SWE tracks for a specific phase (month).
 * Returns a sorted array of combined weeks.
 */
export const getCombinedWeeksForPhase = (phaseIndex) => {
  const currentGtmePhase = scheduleData[phaseIndex] || { weeks: [] };
  const currentSwePhase = sweData[phaseIndex] || { weeks: [] };

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

  return Array.from(combinedWeeksMap.values()).sort((a, b) => {
    const aNum = a.gtme?.weekNumber || a.swe?.weekNumber;
    const bNum = b.gtme?.weekNumber || b.swe?.weekNumber;
    return aNum - bNum;
  });
};

/**
 * Returns all combined weeks across all phases.
 */
export const getAllCombinedWeeks = () => {
  const totalPhases = Math.max(scheduleData.length, sweData.length);
  const allWeeks = [];
  
  for (let i = 0; i < totalPhases; i++) {
    allWeeks.push(...getCombinedWeeksForPhase(i));
  }
  
  return allWeeks;
};
