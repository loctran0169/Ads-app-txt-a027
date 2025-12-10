const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Set CORS headers
    const headers = {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }

    // Read the app-ads.txt file
    const appAdsPath = path.join(__dirname, '../../public/app-ads.txt');
    const appAdsContent = fs.readFileSync(appAdsPath, 'utf8');

    return {
      statusCode: 200,
      headers,
      body: appAdsContent
    };
  } catch (error) {
    console.error('Error serving app-ads.txt:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
