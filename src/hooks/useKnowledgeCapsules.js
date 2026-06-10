import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const useKnowledgeCapsules = (user) => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.uid === 'local_dev') {
      setLoading(false);
      return;
    }

    const colRef = collection(db, 'users', user.uid, 'knowledge_capsules');
    const q = query(colRef, orderBy('addedAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setCapsules(items);
        setLoading(false);
      },
      (err) => {
        console.error('Capsules sync error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addCapsule = useCallback(async (capsuleData) => {
    if (!user || user.uid === 'local_dev') return;
    const colRef = collection(db, 'users', user.uid, 'knowledge_capsules');
    await addDoc(colRef, { ...capsuleData, consumed: false, addedAt: serverTimestamp() });
  }, [user]);

  const updateCapsule = useCallback(async (capsuleId, updates) => {
    if (!user || user.uid === 'local_dev') return;
    const docRef = doc(db, 'users', user.uid, 'knowledge_capsules', capsuleId);
    await updateDoc(docRef, updates);
  }, [user]);

  const deleteCapsule = useCallback(async (capsuleId) => {
    if (!user || user.uid === 'local_dev') return;
    const docRef = doc(db, 'users', user.uid, 'knowledge_capsules', capsuleId);
    await deleteDoc(docRef);
  }, [user]);

  return { capsules, loading, error, addCapsule, updateCapsule, deleteCapsule };
};
