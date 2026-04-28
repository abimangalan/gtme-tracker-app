import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useProgressTracker } from './hooks/useProgressTracker';
import { isConfigured } from './config/firebase';

import Header from './components/Layout/Header';
import LoginScreen from './components/Auth/LoginScreen';
import SetupScreen from './components/Auth/SetupScreen';
import PhaseNavigation from './components/Dashboard/PhaseNavigation';
import WeeklyGrid from './components/Dashboard/WeeklyGrid';
import DayDetailsModal from './components/Modals/DayDetailsModal';
import ResourcesModal from './components/Modals/ResourcesModal';

export default function App() {
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showResources, setShowResources] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const auth = useAuth(isLocalMode, setIsLocalMode, () => setResetKey(k => k + 1));
  const tracker = useProgressTracker(auth.user, isLocalMode);

  // Re-bind the external reset hook for logout
  const handleLogout = async () => {
    await auth.handleLogout();
    tracker.setCompletedItems({});
  };

  if (auth.authChecking) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-pulse text-indigo-600 font-bold">Loading...</div></div>;
  }

  if (!isConfigured && !isLocalMode) {
    return <SetupScreen enableLocalMode={auth.enableLocalMode} />;
  }

  if (!auth.user) {
    return <LoginScreen handleLogin={auth.handleLogin} enableLocalMode={auth.enableLocalMode} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12 relative">
      <Header 
        isLocalMode={isLocalMode} 
        user={auth.user} 
        progress={tracker.progress} 
        setShowResources={setShowResources} 
        handleLogout={handleLogout} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PhaseNavigation 
          activePhase={activePhase} 
          setActivePhase={setActivePhase} 
        />
        
        <WeeklyGrid 
          activePhase={activePhase} 
          getDayProgress={tracker.getDayProgress} 
          setSelectedDay={setSelectedDay} 
        />
      </main>

      <DayDetailsModal 
        selectedDay={selectedDay} 
        setSelectedDay={setSelectedDay} 
        getDayProgress={tracker.getDayProgress} 
        toggleInstruction={tracker.toggleInstruction} 
        completedItems={tracker.completedItems} 
      />

      <ResourcesModal 
        showResources={showResources} 
        setShowResources={setShowResources} 
      />
    </div>
  );
}
