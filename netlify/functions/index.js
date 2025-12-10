exports.handler = async (event, context) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
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

    // Handle root endpoint
    if (event.path === '/' || event.path === '') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'App-ads.txt hosting service',
          endpoints: {
            'app-ads.txt': '/app-ads.txt',
            'health': '/health'
          },
          timestamp: new Date().toISOString()
        })
      };
    }

    // Handle 404 for other paths
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ 
        error: 'Not found',
        path: event.path,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error in index function:', error);
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
