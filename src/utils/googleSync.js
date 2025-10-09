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
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        userData,
        refreshToken
      })
    });

    if (!response.ok) {
      throw new Error('Failed to sync data to Google');
    }

    return await response.json();
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
        'X-Refresh-Token': refreshToken
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load data from Google');
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading from Google:', error);
    throw error;
  }
};