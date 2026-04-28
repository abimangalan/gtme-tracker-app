import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, isConfigured } from '../config/firebase';

export const useAuth = (isLocalMode, setIsLocalMode, setCompletedItems) => {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    if (isLocalMode || !isConfigured) {
      setAuthChecking(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, [isLocalMode]);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } 
    catch (error) { console.error("Login failed", error); }
  };

  const handleLogout = async () => {
    if (isLocalMode) {
      setIsLocalMode(false);
      setCompletedItems({});
    } else {
      try { await signOut(auth); setCompletedItems({}); } 
      catch (error) { console.error("Logout failed", error); }
    }
  };

  const enableLocalMode = () => {
    setIsLocalMode(true);
    setUser({ uid: 'local_dev', email: 'Local Developer (No Sync)' });
  };

  return { user, setUser, authChecking, handleLogin, handleLogout, enableLocalMode };
};