import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthCallback = () => {
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      alert('Authentication failed: ' + error);
      window.location.href = '/';
      return;
    }

    if (code && state) {
      handleAuthCallback(code, state).then(() => {
        window.location.href = '/';
      }).catch(error => {
        console.error('Auth callback error:', error);
        window.location.href = '/';
      });
    }
  }, [handleAuthCallback]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-white mt-4">Completing authentication...</p>
      </div>
    </div>
  );
};