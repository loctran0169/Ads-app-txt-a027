const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Route to serve app-ads.txt
app.get('/app-ads.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  
  // You can either serve a static file or generate content dynamically
  // Option 1: Serve static file
  res.sendFile(path.join(__dirname, 'public', 'app-ads.txt'));
  
  // Option 2: Generate content dynamically (uncomment if needed)
  /*
  const appAdsContent = `# App-ads.txt file for technify.vn
# This file contains advertising app-ads.txt entries
# Format: <domain>, <publisher ID>, <type>, <certification authority ID>

# Example entries (replace with your actual data):
# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
# facebook.com, 123456789, DIRECT, abc123def456
`;
  res.send(appAdsContent);
  */
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'App-ads.txt hosting service',
    endpoints: {
      'app-ads.txt': '/app-ads.txt',
      'health': '/health'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`App-ads.txt available at: http://localhost:${PORT}/app-ads.txt`);
}); 