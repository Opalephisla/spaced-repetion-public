import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { HomeView } from './views/HomeView';
import { StudyView } from './views/StudyView';
import { NotificationHistoryModal } from './views/NotificationHistoryModal';
import { NotificationToast } from './components/NotificationToast';
import { AuthCallback } from './components/AuthCallback';
import { useNotifications } from './hooks/useNotifications';

const AppContent = () => {
  const { inAppNotifs, dismissNotification, notifications, setNotifications } = useApp();
  const [currentView, setCurrentView] = useState('home');
  const [studySession, setStudySession] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useNotifications();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/auth/callback') {
      setCurrentView('auth-callback');
    }
  }, []);

  const handleStartStudy = (session) => {
    setStudySession(session);
    setCurrentView('study');
  };

  const handleExitStudy = () => {
    setStudySession(null);
    setCurrentView('home');
  };

  const handleClearHistory = () => {
    setNotifications([]);
    setShowHistoryModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="fixed top-4 right-4 z-[60] space-y-2 max-w-sm w-full sm:w-auto">
        {inAppNotifs.map(notif => (
          <NotificationToast
            key={notif.id}
            notification={notif}
            onDismiss={dismissNotification}
          />
        ))}
      </div>

      {showHistoryModal && (
        <NotificationHistoryModal
          history={notifications}
          onClose={() => setShowHistoryModal(false)}
          onClear={handleClearHistory}
        />
      )}

      {currentView === 'auth-callback' && <AuthCallback />}

      {currentView === 'home' && (
        <HomeView
          onStartStudy={handleStartStudy}
          onShowHistory={() => setShowHistoryModal(true)}
        />
      )}

      {currentView === 'study' && studySession && (
        <StudyView session={studySession} onExit={handleExitStudy} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;