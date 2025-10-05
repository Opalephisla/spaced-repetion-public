import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HomeView } from './views/HomeView';
import { StudyView } from './views/StudyView';
import { NotificationHistoryModal } from './views/NotificationHistoryModal';
import { NotificationToast } from './components/NotificationToast';
import { useNotifications } from './hooks/useNotifications';

const AppContent = () => {
  const { inAppNotifs, dismissNotification, notifications, setNotifications } = useApp();
  const [currentView, setCurrentView] = useState('home');
  const [studySession, setStudySession] = useState(null);
  const [sessionResults, setSessionResults] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useNotifications();

  const handleStartStudy = (session) => {
    setStudySession(session);
    setCurrentView('study');
  };

  const handleExitStudy = (results) => {
    console.log('=== handleExitStudy called ===');
    console.log('Results:', results);
    console.log('Current view before:', currentView);
    
    if (results) {
      console.log('Has results - going to summary');
      setSessionResults(results);
      setCurrentView('summary');
      console.log('State updated to summary');
    } else {
      console.log('No results - going to home');
      setCurrentView('home');
      console.log('State updated to home');
    }
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
  
      {currentView === 'home' && (
        <HomeView
          onStartStudy={handleStartStudy}
          onShowHistory={() => setShowHistoryModal(true)}
        />
      )}
  
      {currentView === 'study' && studySession && (
        <StudyView session={studySession} onExit={handleExitStudy} />
      )}
  
      {currentView === 'summary' && sessionResults && (
        <div className="min-h-screen text-white px-4 py-4 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center w-full">
            <div className="bg-slate-800 rounded-xl p-12">
              <h2 className="text-3xl font-bold text-white mb-2">Session Complete!</h2>
              <p className="text-gray-400 mb-8">
                Great work on completing your study session for the "{sessionResults.deckName}" deck.
              </p>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-900/50 rounded-lg p-6 border border-green-500/50">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {sessionResults.correct}
                  </div>
                  <div className="text-gray-400">Correct Answers</div>
                </div>
                <div className="bg-red-900/50 rounded-lg p-6 border border-red-500/50">
                  <div className="text-4xl font-bold text-red-400 mb-2">
                    {sessionResults.incorrect}
                  </div>
                  <div className="text-gray-400">Incorrect Answers</div>
                </div>
              </div>
  
              <div className="text-center mb-8">
                <p className="text-gray-400">Total Reviewed: {sessionResults.total}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  Accuracy: {sessionResults.total > 0 ? Math.round((sessionResults.correct / sessionResults.total) * 100) : 0}%
                </p>
              </div>
  
              <button
                onClick={() => {
                  setSessionResults(null);
                  setCurrentView('home');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Fallback for unexpected states */}
      {currentView !== 'home' && currentView !== 'study' && currentView !== 'summary' && (
        <div className="min-h-screen flex items-center justify-center text-white">
          <div>Unknown view: {currentView}</div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;