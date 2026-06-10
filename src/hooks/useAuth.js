import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  signOut 
} from 'firebase/auth';
import { auth, googleProvider, isConfigured } from '../config/firebase';

export const useAuth = (isLocalMode, setIsLocalMode, setCompletedItems) => {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    if (isLocalMode || !isConfigured) {
      setAuthChecking(false);
      return;
    }

    // Capture the login result when returning from a PWA redirect login
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect auth resolution failed:", error);
      });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, [isLocalMode]);

  const handleLogin = async () => {
    try {
      // signInWithPopup works in all modern browsers including iOS 16.4+ PWA.
      // It avoids the Safari ITP cross-origin storage block that causes sign-in
      // loops when signInWithRedirect passes through firebaseapp.com.
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        // Genuine popup block (very old iOS PWA < 16.4) — fall back to redirect
        await signInWithRedirect(auth, googleProvider).catch(e => console.error('Login failed', e));
      } else if (
        error.code !== 'auth/popup-closed-by-user' &&
        error.code !== 'auth/cancelled-popup-request'
      ) {
        console.error('Login failed', error);
      }
    }
  };

  const handleLogout = async () => {
    if (isLocalMode) {
      setIsLocalMode(false);
      setCompletedItems({});
    } else {
      try { 
        await signOut(auth); 
        setCompletedItems({}); 
      } 
      catch (error) { 
        console.error("Logout failed", error); 
      }
    }
  };

  const enableLocalMode = () => {
    setIsLocalMode(true);
    setUser({ uid: 'local_dev', email: 'Local Developer (No Sync)' });
  };

  return { user, setUser, authChecking, handleLogin, handleLogout, enableLocalMode };
};