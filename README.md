# App-ads.txt Hosting Service

A serverless application to serve app-ads.txt files via Netlify.

## Features

- Serves app-ads.txt file with proper headers
- Health check endpoint
- CORS enabled
- Serverless functions for optimal performance
- Automatic caching headers

## Project Structure

```
├── netlify/
│   └── functions/
│       ├── app-ads.js      # Serves the app-ads.txt file
│       ├── health.js       # Health check endpoint
│       └── index.js        # Main index function
├── public/
│   ├── app-ads.txt         # Your app-ads.txt content
│   └── _redirects          # Netlify redirects configuration
├── netlify.toml            # Netlify configuration
└── package.json            # Dependencies and scripts
```

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 2: Deploy via Git Integration

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically deploy on every push to your main branch

### Option 3: Manual Deploy

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `public` folder to Netlify's deploy interface

## Configuration

The `netlify.toml` file contains the deployment configuration:

- **Build settings**: Publishes the `public` directory
- **Redirects**: Routes requests to appropriate serverless functions
- **Headers**: Sets proper content-type and caching headers for app-ads.txt

## Endpoints

- `/app-ads.txt` - Serves your app-ads.txt file
- `/health` - Health check endpoint
- `/` - Service information

## Environment Variables

No environment variables are required for basic functionality.

## Local Development

To run locally with Netlify Dev:

```bash
npm install
netlify dev
```

This will start a local development server that mimics the Netlify environment.

## Customization

To modify the app-ads.txt content, edit the file in `public/app-ads.txt`.

To add new endpoints, create new functions in the `netlify/functions/` directory and update the redirects in `netlify.toml`.