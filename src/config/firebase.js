import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from 'firebase/firestore';

// ==========================================
// STEP 1: PASTE YOUR FIREBASE CONFIG HERE
// ==========================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// Check if user has configured Firebase yet
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

// Check if running on localhost for dev mode
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Initialize Firebase only if configured
let app, auth, db, googleProvider;
if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Modern, more robust offline persistence for PWAs
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });

  googleProvider = new GoogleAuthProvider();
}

export { app, auth, db, googleProvider, isConfigured, isLocalhost };
