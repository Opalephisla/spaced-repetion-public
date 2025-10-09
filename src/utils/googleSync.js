export const syncToGoogle = async (userData) => {
  const accessToken = JSON.parse(localStorage.getItem('google_access_token') || 'null');
  const refreshToken = JSON.parse(localStorage.getItem('google_refresh_token') || 'null');
  
  if (!accessToken) {
    throw new Error('No Google access token found');
  }

  try {
    const response = await fetch('/.netlify/functions/sync-google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken || ''
      },
      body: JSON.stringify({
        userData
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear stored tokens
        localStorage.removeItem('google_access_token');
        localStorage.removeItem('google_refresh_token');
        throw new Error('Authentication expired. Please sign in again.');
      }
      throw new Error(result.error || 'Failed to sync data to Google');
    }

    return result;
  } catch (error) {
    console.error('Error syncing to Google:', error);
    throw error;
  }
};

export const loadFromGoogle = async () => {
  const accessToken = JSON.parse(localStorage.getItem('google_access_token') || 'null');
  const refreshToken = JSON.parse(localStorage.getItem('google_refresh_token') || 'null');
  
  if (!accessToken) {
    throw new Error('No Google access token found');
  }

  try {
    const response = await fetch('/.netlify/functions/sync-google', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken || ''
      }
    });

    const result = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear stored tokens
        localStorage.removeItem('google_access_token');
        localStorage.removeItem('google_refresh_token');
        throw new Error('Authentication expired. Please sign in again.');
      }
      throw new Error(result.error || 'Failed to load data from Google');
    }

    return result;
  } catch (error) {
    console.error('Error loading from Google:', error);
    throw error;
  }
};