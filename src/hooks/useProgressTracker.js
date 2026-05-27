import { useState, useEffect, useMemo, useCallback } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAllCombinedWeeks } from '../utils/trackMerger';
import { generateTaskId, generateLegacyId, generateHabitId } from '../utils/idGenerator';

export const useProgressTracker = (user, isLocalMode) => {
  const [completedItems, setCompletedItems] = useState({});
  
  // Sync data from Cloud or LocalStorage
  useEffect(() => {
    if (isLocalMode) {
      const savedData = localStorage.getItem('gtm-tracker-progress-v2');
      if (savedData) {
        try { setCompletedItems(JSON.parse(savedData)); } catch { console.error("Local load fail"); }
      }
    } else if (user) {
      const docRef = doc(db, 'users', user.uid, 'tracker_data', 'progress_v2');
      const unsubscribe = onSnapshot(docRef, { includeMetadataChanges: true }, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Only update if we aren't currently writing to the cloud to avoid race conditions
          if (!docSnap.metadata.hasPendingWrites) {
            setCompletedItems(data.completedItems || {});
          }
        }
      }, (error) => console.error("Cloud sync error:", error));
      return () => unsubscribe();
    }
  }, [user, isLocalMode]);

  // Centralized combined weeks for calculations
  const allCombinedWeeks = useMemo(() => getAllCombinedWeeks(), []);

  // Performance optimized progress and streak calculation
  const stats = useMemo(() => {
    const counts = {
      overall: { done: 0, total: 0 },
      gtme: { done: 0, total: 0 },
      swe: { done: 0, total: 0 },
      habits: { done: 0, total: 0 }
    };
    
    const allDays = [];
    const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    allCombinedWeeks.forEach(({ gtme, swe }) => {
      const weekNumber = gtme?.weekNumber || swe?.weekNumber;

      DAYS_OF_WEEK.forEach(dayName => {
        let dayAllDone = true;

        // Check GTME Checklists
        if (gtme) {
          const gtmeDay = gtme.days.find(d => d.day === dayName);
          if (gtmeDay) {
            let gtmeTaskDone = 0;
            gtmeDay.instructions.forEach((inst) => {
              counts.gtme.total++;
              counts.overall.total++;
              const id = generateTaskId('w', weekNumber, dayName, inst);
              if (completedItems[id]) {
                counts.gtme.done++;
                counts.overall.done++;
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
             sweDay.instructions.forEach((inst) => {
               counts.swe.total++;
               counts.overall.total++;
               const id = generateTaskId('swe-w', weekNumber, dayName, inst);
               if (completedItems[id]) {
                 counts.swe.done++;
                 counts.overall.done++;
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
            counts.habits.total++;
            counts.overall.total++;
            const id = generateHabitId(weekNumber, dayName, habit);
            if (completedItems[id]) {
               counts.habits.done++;
               counts.overall.done++;
            } else {
               dayAllDone = false;
            }
        });

        allDays.push({ isCompleted: dayAllDone });
      });
    });

    // Streak Logic
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

    const calcPct = (c) => c.total > 0 ? Math.round((c.done / c.total) * 100) : 0;

    return {
      progress: {
        overall: calcPct(counts.overall),
        gtme: calcPct(counts.gtme),
        swe: calcPct(counts.swe),
        habits: calcPct(counts.habits)
      },
      streak: { current: tempStreak, max: maxStreak }
    };
  }, [completedItems, allCombinedWeeks]);

  const saveCompletedItems = useCallback(async (newCompleted) => {
    setCompletedItems(newCompleted);

    if (isLocalMode) {
      localStorage.setItem('gtm-tracker-progress-v2', JSON.stringify(newCompleted));
    } else if (user) {
      try {
        const docRef = doc(db, 'users', user.uid, 'tracker_data', 'progress_v2');
        await setDoc(docRef, { completedItems: newCompleted }, { merge: true });
      } catch (error) { console.error("Cloud save error:", error); }
    }
  }, [isLocalMode, user]);

  // Migration Effect: Convert legacy IDs to stable IDs
  useEffect(() => {
    if (Object.keys(completedItems).length === 0) return;

    let hasLegacyData = false;
    const newCompleted = { ...completedItems };
    const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    allCombinedWeeks.forEach(({ gtme, swe }) => {
      const weekNumber = gtme?.weekNumber || swe?.weekNumber;
      DAYS_OF_WEEK.forEach(dayName => {
        // GTME Migration
        if (gtme) {
          const gtmeDay = gtme.days.find(d => d.day === dayName);
          if (gtmeDay) {
            gtmeDay.instructions.forEach((inst, idx) => {
              const legacyId = generateLegacyId('w', weekNumber, dayName, idx);
              if (completedItems[legacyId]) {
                const stableId = generateTaskId('w', weekNumber, dayName, inst);
                if (!newCompleted[stableId]) {
                  newCompleted[stableId] = true;
                  delete newCompleted[legacyId];
                  hasLegacyData = true;
                }
              }
            });
          }
        }
        // SWE Migration
        if (swe) {
          const sweDay = swe.days.find(d => d.day === dayName);
          if (sweDay) {
            sweDay.instructions.forEach((inst, idx) => {
              const legacyId = generateLegacyId('swe-w', weekNumber, dayName, idx);
              if (completedItems[legacyId]) {
                const stableId = generateTaskId('swe-w', weekNumber, dayName, inst);
                if (!newCompleted[stableId]) {
                  newCompleted[stableId] = true;
                  delete newCompleted[legacyId];
                  hasLegacyData = true;
                }
              }
            });
          }
        }
      });
    });

    if (hasLegacyData) {
      console.log("Migrated legacy tracker IDs to stable semantic IDs");
      saveCompletedItems(newCompleted);
    }
  }, [allCombinedWeeks, completedItems, saveCompletedItems]);

  const toggleHabit = async (weekNumber, dayName, habitName) => {
    const id = generateHabitId(weekNumber, dayName, habitName);
    const newCompleted = { ...completedItems, [id]: !completedItems[id] };
    await saveCompletedItems(newCompleted);
  };

  const toggleInstruction = async (trackPrefix, weekNumber, dayName, instructionIdx, instructionText) => {
    const id = generateTaskId(trackPrefix, weekNumber, dayName, instructionText);
    const newCompleted = { ...completedItems, [id]: !completedItems[id] };
    await saveCompletedItems(newCompleted);
  };

  const getDayProgress = useCallback((trackPrefix, weekNum, dayName, instructions) => {
    let done = 0;
    instructions.forEach((inst) => {
      const id = generateTaskId(trackPrefix, weekNum, dayName, inst);
      if (completedItems[id]) done++;
    });
    return { 
      done, 
      total: instructions.length, 
      isAllDone: done === instructions.length && instructions.length > 0 
    };
  }, [completedItems]);

  return { 
    completedItems, 
    progress: stats.progress, 
    streak: stats.streak, 
    toggleInstruction, 
    toggleHabit, 
    getDayProgress 
  };
};
