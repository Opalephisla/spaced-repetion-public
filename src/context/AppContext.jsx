import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { syncToGoogle, loadFromGoogle } from '../utils/googleSync';
import { STORAGE_KEYS, INITIAL_DECKS, INITIAL_CARDS } from '../constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [decks, setDecks] = useState(() => 
    storage.get(STORAGE_KEYS.DECKS, INITIAL_DECKS)
  );
  const [cards, setCards] = useState(() => 
    storage.get(STORAGE_KEYS.CARDS, INITIAL_CARDS)
  );
  const [progress, setProgress] = useState(() => 
    storage.get(STORAGE_KEYS.PROGRESS, {})
  );
  const [notifications, setNotifications] = useState(() => 
    storage.get(STORAGE_KEYS.NOTIFICATIONS, [])
  );
  const [notifiedIds, setNotifiedIds] = useState(() => 
    storage.get(STORAGE_KEYS.NOTIFIED_IDS, [])
  );
  const [lastSession, setLastSession] = useState(() => 
    storage.get(STORAGE_KEYS.LAST_SESSION, null)
  );
  const [inAppNotifs, setInAppNotifs] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(() => 
    storage.get('last_sync_time', null)
  );

  // Persist to localStorage
  useEffect(() => { storage.set(STORAGE_KEYS.DECKS, decks); }, [decks]);
  useEffect(() => { storage.set(STORAGE_KEYS.CARDS, cards); }, [cards]);
  useEffect(() => { storage.set(STORAGE_KEYS.PROGRESS, progress); }, [progress]);
  useEffect(() => { storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications); }, [notifications]);
  useEffect(() => { storage.set(STORAGE_KEYS.NOTIFIED_IDS, notifiedIds); }, [notifiedIds]);
  useEffect(() => { storage.set(STORAGE_KEYS.LAST_SESSION, lastSession); }, [lastSession]);
  useEffect(() => { storage.set('last_sync_time', lastSyncTime); }, [lastSyncTime]);

  // Initialize progress for new cards
  useEffect(() => {
    const newProgress = {};
    let hasChanges = false;

    cards.forEach(card => {
      if (!progress[card.id]) {
        newProgress[card.id] = {
          interval: 0,
          repetitions: 0,
          nextReview: new Date(0).toISOString()
        };
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setProgress(prev => ({ ...prev, ...newProgress }));
    }
  }, [cards, progress]);

  const addNotification = (title, message, type = 'info') => {
    const notif = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
      timestamp: new Date().toISOString()
    };
    
    setInAppNotifs(prev => [...prev, notif]);
    setNotifications(prev => 
      [notif, ...prev].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      )
    );
  };

  const dismissNotification = (id) => {
    setInAppNotifs(prev => prev.filter(n => n.id !== id));
  };

  const syncWithGoogle = async () => {
    setIsSyncing(true);
    try {
      const userData = {
        decks,
        cards,
        progress,
        notifications,
        notifiedIds,
        lastSession,
        syncTimestamp: new Date().toISOString()
      };

      await syncToGoogle(userData);
      setLastSyncTime(new Date().toISOString());
      addNotification('Sync Success', 'Your data has been synced with Google Drive', 'success');
    } catch (error) {
      console.error('Sync failed:', error);
      addNotification('Sync Failed', 'Failed to sync with Google Drive. Please try again.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const loadFromGoogleDrive = async () => {
    setIsSyncing(true);
    try {
      const response = await loadFromGoogle();
      
      if (response.userData) {
        const { userData } = response;
        setDecks(userData.decks || INITIAL_DECKS);
        setCards(userData.cards || INITIAL_CARDS);
        setProgress(userData.progress || {});
        setNotifications(userData.notifications || []);
        setNotifiedIds(userData.notifiedIds || []);
        setLastSession(userData.lastSession || null);
        setLastSyncTime(userData.syncTimestamp || new Date().toISOString());
        
        addNotification('Data Loaded', 'Your data has been loaded from Google Drive', 'success');
      } else {
        addNotification('No Data Found', 'No saved data found in Google Drive', 'info');
      }
    } catch (error) {
      console.error('Load failed:', error);
      addNotification('Load Failed', 'Failed to load data from Google Drive', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const value = {
    decks,
    setDecks,
    cards,
    setCards,
    progress,
    setProgress,
    notifications,
    setNotifications,
    notifiedIds,
    setNotifiedIds,
    lastSession,
    setLastSession,
    inAppNotifs,
    addNotification,
    dismissNotification,
    notificationsEnabled,
    setNotificationsEnabled,
    isSyncing,
    lastSyncTime,
    syncWithGoogle,
    loadFromGoogleDrive
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};