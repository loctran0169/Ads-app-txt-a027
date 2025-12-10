const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Core middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '6h' }));

// Serve app-ads.txt with explicit headers
app.get('/app-ads.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(path.join(__dirname, 'public', 'app-ads.txt'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// SPA fallback to the futuristic roadmap page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Tech roadmap server running on port ${PORT}`);
});

