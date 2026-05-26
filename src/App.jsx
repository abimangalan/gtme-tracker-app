import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useProgressTracker } from './hooks/useProgressTracker';
import { isConfigured } from './config/firebase';

import Header from './components/Layout/Header';
import LoginScreen from './components/Auth/LoginScreen';
import SetupScreen from './components/Auth/SetupScreen';
import DashboardView from './components/Dashboard/DashboardView';
import WeeklyGrid from './components/Dashboard/WeeklyGrid';
import SweView from './components/Views/SweView';
import HabitsView from './components/Views/HabitsView';
import DayDetailsModal from './components/Modals/DayDetailsModal';
import ResourcesModal from './components/Modals/ResourcesModal';

export default function App() {
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showResources, setShowResources] = useState(false);

  const auth = useAuth(isLocalMode, setIsLocalMode, () => {});
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
        streak={tracker.streak}
        setShowResources={setShowResources} 
        handleLogout={handleLogout} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Routes>
          <Route path="/" element={
            <DashboardView 
              completedItems={tracker.completedItems}
              streak={tracker.streak}
              toggleHabit={tracker.toggleHabit}
              getDayProgress={tracker.getDayProgress}
              setSelectedDay={setSelectedDay}
            />
          } />
          <Route path="/gtme" element={
            <WeeklyGrid 
              getDayProgress={tracker.getDayProgress} 
              setSelectedDay={setSelectedDay} 
            />
          } />
          <Route path="/swe" element={
            <SweView 
              getDayProgress={tracker.getDayProgress} 
              setSelectedDay={setSelectedDay} 
            />
          } />
          <Route path="/habits" element={
            <HabitsView 
              completedItems={tracker.completedItems}
              toggleHabit={tracker.toggleHabit}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
