import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { scheduleData } from '../data/scheduleData';
import { sweData } from '../data/sweData';

export const useProgressTracker = (user, isLocalMode) => {
  const [completedItems, setCompletedItems] = useState({});
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState({ current: 0, max: 0 });

  useEffect(() => {
    if (isLocalMode) {
      const savedData = localStorage.getItem('gtm-tracker-progress-v2');
      if (savedData) {
        try { setCompletedItems(JSON.parse(savedData)); } catch (e) { console.error("Local load fail"); }
      }
    } else if (user) {
      const docRef = doc(db, 'users', user.uid, 'tracker_data', 'progress_v2');
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setCompletedItems(docSnap.data().completedItems || {});
        }
      }, (error) => console.error("Cloud sync error:", error));
      return () => unsubscribe();
    }
  }, [user, isLocalMode]);

  useEffect(() => {
    let total = 0;
    let done = 0;
    const allDays = [];
    const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const totalPhases = Math.max(scheduleData.length, sweData.length);
    for (let phaseIndex = 0; phaseIndex < totalPhases; phaseIndex++) {
      const currentGtmePhase = scheduleData[phaseIndex] || { weeks: [] };
      const currentSwePhase = sweData[phaseIndex] || { weeks: [] };

      // Map combined weeks exactly as DashboardView
      const combinedWeeksMap = new Map();
      currentGtmePhase.weeks.forEach(w => combinedWeeksMap.set(w.weekNumber, { gtme: w, swe: null }));
      currentSwePhase.weeks.forEach(w => {
        if (combinedWeeksMap.has(w.weekNumber)) {
          combinedWeeksMap.get(w.weekNumber).swe = w;
        } else {
          combinedWeeksMap.set(w.weekNumber, { gtme: null, swe: w });
        }
      });

      const sortedWeekNumbers = Array.from(combinedWeeksMap.keys()).sort((a,b) => a - b);

      sortedWeekNumbers.forEach(num => {
        const { gtme, swe } = combinedWeeksMap.get(num);

        DAYS_OF_WEEK.forEach(dayName => {
          let dayAllDone = true;

          // Check GTME Checklists
          if (gtme) {
            const gtmeDay = gtme.days.find(d => d.day === dayName);
            if (gtmeDay) {
              let gtmeTaskDone = 0;
              gtmeDay.instructions.forEach((_, idx) => {
                total++;
                if (completedItems[`w${num}-${dayName}-i${idx}`]) {
                  done++;
                  gtmeTaskDone++;
                }
              });
              if (gtmeDay.instructions.length > 0 && gtmeTaskDone < gtmeDay.instructions.length) {
                dayAllDone = false;
              }
            }
          }

          // Check SWE Checklists
          if (swe) {
             const sweDay = swe.days.find(d => d.day === dayName);
             if (sweDay) {
               let sweTaskDone = 0;
               sweDay.instructions.forEach((_, idx) => {
                 total++;
                 if (completedItems[`swe-w${num}-${dayName}-i${idx}`]) {
                   done++;
                   sweTaskDone++;
                 }
               });
               if (sweDay.instructions.length > 0 && sweTaskDone < sweDay.instructions.length) {
                 dayAllDone = false;
               }
             }
          }
          
          // Check Extra Habits
          ['meditation', 'affirmation', 'exercise'].forEach(habit => {
              total++; // Add habit to total expected operations
              if (completedItems[`habit-w${num}-${dayName}-${habit}`]) {
                 done++;
              } else {
                 dayAllDone = false;
              }
          });

          allDays.push({ isCompleted: dayAllDone });
        });
      });
    }

    let maxStreak = 0;
    let lastActiveIdx = -1;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].isCompleted) {
        lastActiveIdx = i;
        break;
      }
    }

    let tempStreak = 0;
    if (lastActiveIdx !== -1) {
      let tempFreeze = false;
      for (let i = 0; i <= lastActiveIdx; i++) {
        if (allDays[i].isCompleted) {
          tempStreak++;
          if (tempStreak > maxStreak) maxStreak = tempStreak;
        } else {
          if (!tempFreeze && tempStreak > 0) {
            tempFreeze = true; // Use buffer
          } else {
            tempStreak = 0; // Break streak
            tempFreeze = false;
          }
        }
      }
    }

    setProgress(Math.round((done / total) * 100) || 0);
    setStreak({ current: tempStreak, max: maxStreak });
  }, [completedItems]);

  const toggleHabit = async (weekNumber, dayName, habitName) => {
    const id = `habit-w${weekNumber}-${dayName}-${habitName}`;
    const newCompleted = { ...completedItems, [id]: !completedItems[id] };
    
    setCompletedItems(newCompleted);

    if (isLocalMode) {
      localStorage.setItem('gtm-tracker-progress-v2', JSON.stringify(newCompleted));
    } else if (user) {
      try {
        const docRef = doc(db, 'users', user.uid, 'tracker_data', 'progress_v2');
        await setDoc(docRef, { completedItems: newCompleted }, { merge: true });
      } catch (error) { console.error("Cloud save error:", error); }
    }
  };

  const toggleInstruction = async (trackPrefix, weekNumber, dayName, instructionIdx) => {
    const prefix = trackPrefix || 'w';
    const id = `${prefix}${weekNumber}-${dayName}-i${instructionIdx}`;
    const newCompleted = { ...completedItems, [id]: !completedItems[id] };
    
    setCompletedItems(newCompleted);

    if (isLocalMode) {
      localStorage.setItem('gtm-tracker-progress-v2', JSON.stringify(newCompleted));
    } else if (user) {
      try {
        const docRef = doc(db, 'users', user.uid, 'tracker_data', 'progress_v2');
        await setDoc(docRef, { completedItems: newCompleted }, { merge: true });
      } catch (error) { console.error("Cloud save error:", error); }
    }
  };

  const getDayProgress = (trackPrefix, weekNum, dayName, instructions) => {
    const prefix = trackPrefix || 'w';
    let done = 0;
    instructions.forEach((_, idx) => {
      if (completedItems[`${prefix}${weekNum}-${dayName}-i${idx}`]) done++;
    });
    return { done, total: instructions.length, isAllDone: done === instructions.length && instructions.length > 0 };
  };

  return { completedItems, setCompletedItems, progress, streak, toggleInstruction, toggleHabit, getDayProgress };
};
