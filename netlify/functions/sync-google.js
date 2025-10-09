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
    
    // Set up Google Drive API client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    
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
          fields: 'files(id, name)'
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
            name: fileName,
            parents: ['appDataFolder']
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
          fields: 'files(id, name)'
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
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Sync failed' })
    };
  }
};