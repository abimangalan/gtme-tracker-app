import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { scheduleData } from '../data/scheduleData';

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

    scheduleData.forEach(phase => {
      phase.weeks.forEach(week => {
        DAYS_OF_WEEK.forEach(dayName => {
          let dayAllDone = true;

          const gtmeDay = week.days.find(d => d.day === dayName);
          if (gtmeDay) {
            let gtmeTaskDone = 0;
            gtmeDay.instructions.forEach((_, idx) => {
              total++;
              if (completedItems[`w${week.weekNumber}-${dayName}-i${idx}`]) {
                done++;
                gtmeTaskDone++;
              }
            });
            if (gtmeDay.instructions.length > 0 && gtmeTaskDone < gtmeDay.instructions.length) {
              dayAllDone = false;
            }
          }
          
          ['dsa', 'meditation', 'affirmation', 'exercise'].forEach(habit => {
              if (!completedItems[`habit-w${week.weekNumber}-${dayName}-${habit}`]) {
                 dayAllDone = false;
              }
          });

          allDays.push({ isCompleted: dayAllDone });
        });
      });
    });

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

  const toggleInstruction = async (weekNumber, dayName, instructionIdx) => {
    const id = `w${weekNumber}-${dayName}-i${instructionIdx}`;
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

  const getDayProgress = (weekNum, dayName, instructions) => {
    let done = 0;
    instructions.forEach((_, idx) => {
      if (completedItems[`w${weekNum}-${dayName}-i${idx}`]) done++;
    });
    return { done, total: instructions.length, isAllDone: done === instructions.length && instructions.length > 0 };
  };

  return { completedItems, setCompletedItems, progress, streak, toggleInstruction, toggleHabit, getDayProgress };
};