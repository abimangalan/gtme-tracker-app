import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { scheduleData } from '../data/scheduleData';

export const useProgressTracker = (user, isLocalMode) => {
  const [completedItems, setCompletedItems] = useState({});
  const [progress, setProgress] = useState(0);

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
    scheduleData.forEach(phase => {
      phase.weeks.forEach(week => {
        week.days.forEach(day => {
          day.instructions.forEach((_, idx) => {
            total++;
            if (completedItems[`w${week.weekNumber}-${day.day}-i${idx}`]) done++;
          });
        });
      });
    });
    setProgress(Math.round((done / total) * 100) || 0);
  }, [completedItems]);

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

  return { completedItems, setCompletedItems, progress, toggleInstruction, getDayProgress };
};