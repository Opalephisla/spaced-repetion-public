import React from 'react';
import { Icon } from './Icon';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const Navbar = ({ onHistoryClick, onHomeClick }) => {
  const { user, isAuthenticated, signInWithGoogle, signOut } = useAuth();
  const { syncWithGoogle, loadFromGoogleDrive, isSyncing, lastSyncTime } = useApp();

  return (
    <nav className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Icon type="heart" className="w-8 h-8 text-blue-500" />
        <span className="text-xl font-bold">LearnFlow</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            <button
              onClick={syncWithGoogle}
              disabled={isSyncing}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
              title="Sync with Google Drive"
            >
              <Icon type="cloud" />
              <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
            </button>
            
            <button
              onClick={loadFromGoogleDrive}
              disabled={isSyncing}
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
              title="Load from Google Drive"
            >
              <Icon type="download" />
              <span>Load</span>
            </button>
          </>
        )}
        
        <button
          onClick={onHistoryClick}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Icon type="bell" />
          <span>History</span>
        </button>
        
        <button
          onClick={onHomeClick}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Icon type="home" />
          <span>Home</span>
        </button>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img 
                  src={user?.picture} 
                  alt={user?.name} 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-300">{user?.name}</span>
              </div>
              <button
                onClick={signOut}
                className="text-red-400 hover:text-red-300 transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Icon type="user" />
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};