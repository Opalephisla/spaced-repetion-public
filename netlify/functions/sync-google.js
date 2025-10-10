const { google } = require('googleapis');
const { Storage } = require('@google-cloud/storage');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Refresh-Token',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid authorization header' })
      };
    }

    const accessToken = authHeader.split(' ')[1];
    const refreshToken = event.headers['x-refresh-token'] || event.headers['X-Refresh-Token'];
    
    // Set up Google Drive API client with proper credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.VITE_GOOGLE_CLIENT_ID,
      process.env.VITE_GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({ 
      access_token: accessToken,
      refresh_token: refreshToken
    });
    
    // Set up token refresh callback
    oauth2Client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // Store the new refresh token if provided
        oauth2Client.setCredentials({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token
        });
      }
    });
    
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    if (event.httpMethod === 'POST') {
      // Save data to Google Drive
      const { userData } = JSON.parse(event.body);
      
      const fileName = 'learnflow-data.json';
      const fileContent = JSON.stringify(userData, null, 2);
      
      // Check if file exists
      let fileId = null;
      try {
        const searchResponse = await drive.files.list({
          q: `name='${fileName}' and trashed=false`,
          fields: 'files(id, name)',
          spaces: 'drive'
        });
        
        if (searchResponse.data.files.length > 0) {
          fileId = searchResponse.data.files[0].id;
        }
      } catch (error) {
        console.error('Error searching for existing file:', error);
      }

      if (fileId) {
        // Update existing file
        await drive.files.update({
          fileId,
          media: {
            body: fileContent,
            mimeType: 'application/json'
          }
        });
      } else {
        // Create new file
        await drive.files.create({
          requestBody: {
            name: fileName
          },
          media: {
            body: fileContent,
            mimeType: 'application/json'
          }
        });
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Data synced to Google Drive' })
      };

    } else if (event.httpMethod === 'GET') {
      // Load data from Google Drive
      const fileName = 'learnflow-data.json';
      
      try {
        const searchResponse = await drive.files.list({
          q: `name='${fileName}' and trashed=false`,
          fields: 'files(id, name)',
          spaces: 'drive'
        });
        
        if (searchResponse.data.files.length === 0) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ userData: null, message: 'No saved data found' })
          };
        }

        const fileId = searchResponse.data.files[0].id;
        const fileResponse = await drive.files.get({
          fileId,
          alt: 'media'
        });

        const userData = JSON.parse(fileResponse.data);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ userData, message: 'Data loaded from Google Drive' })
        };

      } catch (error) {
        console.error('Error loading data from Google Drive:', error);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ userData: null, message: 'No saved data found or error loading' })
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Google sync error:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Sync failed';
    let statusCode = 500;
    
    if (error.code === 401 || error.message?.includes('unauthorized') || error.message?.includes('invalid_token')) {
      errorMessage = 'Token expired or invalid. Please re-authenticate.';
      statusCode = 401;
    } else if (error.code === 403 || error.message?.includes('insufficient permissions')) {
      errorMessage = 'Insufficient permissions for Google Drive access';
      statusCode = 403;
    } else if (error.message?.includes('quota exceeded')) {
      errorMessage = 'Google API quota exceeded. Please try again later.';
      statusCode = 429;
    } else if (error.message?.includes('network') || error.code === 'ENOTFOUND') {
      errorMessage = 'Network error. Please check your connection.';
      statusCode = 502;
    }
    
    return {
      statusCode,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};