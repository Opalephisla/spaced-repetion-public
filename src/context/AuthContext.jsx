import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = storage.get('google_user', null);
    const savedToken = storage.get('google_access_token', null);
    
    if (savedUser && savedToken) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const signInWithGoogle = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId === 'placeholder-google-client-id') {
      alert('Google OAuth is not properly configured. Please set up your Google Client ID in Netlify environment variables.');
      return;
    }

    // Google OAuth 2.0 authorization URL
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const scope = encodeURIComponent('profile email https://www.googleapis.com/auth/drive.appdata');
    const responseType = 'code';
    const state = Math.random().toString(36).substring(2, 15);
    
    storage.set('oauth_state', state);
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}&access_type=offline&prompt=consent`;
    
    window.location.href = authUrl;
  };

  const handleAuthCallback = async (code, state) => {
    setIsLoading(true);
    
    try {
      const savedState = storage.get('oauth_state');
      if (state !== savedState) {
        throw new Error('Invalid state parameter');
      }

      // Exchange code for tokens
      const tokenResponse = await fetch('/.netlify/functions/auth-google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: window.location.origin + '/auth/callback'
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json().catch(() => ({}));
        const errorMessage = errorData.details || errorData.error || 'Failed to exchange code for tokens';
        throw new Error(errorMessage);
      }

      const tokens = await tokenResponse.json();
      
      // Get user profile
      const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`
        }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to get user profile');
      }

      const profile = await profileResponse.json();
      
      // Store user data and tokens
      storage.set('google_user', profile);
      storage.set('google_access_token', tokens.access_token);
      storage.set('google_refresh_token', tokens.refresh_token);
      
      setUser(profile);
      setIsAuthenticated(true);
      
      // Clean up
      storage.remove('oauth_state');
      
    } catch (error) {
      console.error('Authentication error:', error);
      alert(`Authentication failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    storage.remove('google_user');
    storage.remove('google_access_token');
    storage.remove('google_refresh_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signInWithGoogle,
    signOut,
    handleAuthCallback
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};