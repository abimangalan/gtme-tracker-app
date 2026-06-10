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
import KnowledgeCapsulesView from './components/KnowledgeCapsules/KnowledgeCapsulesView';
import DayDetailsModal from './components/Modals/DayDetailsModal';
import BottomNav from './components/Layout/BottomNav';
import PWAInstallBanner from './components/Layout/PWAInstallBanner';

export default function App() {
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Isolate navigation state per tab to ensure it persists during navigation
  const [tabState, setTabState] = useState({
    dashboard: { phase: 0, week: 0 },
    gtme: { phase: 0 },
    swe: { phase: 1 }, // SWE starts at Month 2
    habits: { phase: 0 }
  });

  const auth = useAuth(isLocalMode, setIsLocalMode, () => {});
  const tracker = useProgressTracker(auth.user, isLocalMode);

  const updateTabState = (tab, newState) => {
    setTabState(prev => ({
      ...prev,
      [tab]: { ...prev[tab], ...newState }
    }));
  };

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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-32 lg:pb-12 relative">
      <Header
        isLocalMode={isLocalMode}
        user={auth.user}
        progress={tracker.progress}
        streak={tracker.streak}
        handleLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8">
        <Routes>
          <Route path="/" element={
            <DashboardView
              state={tabState.dashboard}
              setState={(s) => updateTabState('dashboard', s)}
              completedItems={tracker.completedItems}
              streak={tracker.streak}
              toggleHabit={tracker.toggleHabit}
              getDayProgress={tracker.getDayProgress}
              setSelectedDay={setSelectedDay}
            />
          } />
          <Route path="/gtme" element={
            <WeeklyGrid
              state={tabState.gtme}
              setState={(s) => updateTabState('gtme', s)}
              getDayProgress={tracker.getDayProgress}
              setSelectedDay={setSelectedDay}
            />
          } />
          <Route path="/swe" element={
            <SweView
              state={tabState.swe}
              setState={(s) => updateTabState('swe', s)}
              getDayProgress={tracker.getDayProgress}
              setSelectedDay={setSelectedDay}
            />
          } />
          <Route path="/habits" element={
            <HabitsView
              state={tabState.habits}
              setState={(s) => updateTabState('habits', s)}
              completedItems={tracker.completedItems}
              toggleHabit={tracker.toggleHabit}
            />
          } />
          <Route path="/capsules" element={
            <KnowledgeCapsulesView user={auth.user} />
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

      <BottomNav />
      <PWAInstallBanner />
    </div>
  );
}
