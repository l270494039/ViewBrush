<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# ViewBrush

ViewBrush is a Vite + React app for uploading a pet photo, generating an AI portrait preview, and reviewing the framed result in different room scenes.

## Run locally

Prerequisites: Node.js 20+

1. Install dependencies with `npm install`
2. Create `.env.local` and set `GEMINI_API_KEY=your_key`
3. Start the app with `npm run dev:3001`

The local server now handles both the Vite frontend and the `/api/generate-portrait` endpoint, so the upload and generate flow works from one process.

The dev helper script always replaces any older process on the same port, writes a PID file, and exposes instance info at `/__dev-info` so it is easy to verify that the page you are seeing is the latest workspace instance.

## Other scripts

- `npm run dev:start`: Start the local app in the background on port `3001`
- `npm run dev:restart`: Restart the managed local app on port `3001`
- `npm run dev:stop`: Stop the managed local app
- `npm run dev:status`: Show the current managed dev server state
- `npm run lint`: Type-check the app
- `npm run build`: Create the production client bundle and server bundle
- `npm run preview`: Build and serve the production bundle

If you only want to test the flow without spending image-generation quota, set
`VIEWBRUSH_FORCE_MOCK_GENERATION=true`. The app will return built-in mock preview
images instead of calling Gemini.

## Deploy on Render

This repo includes a `render.yaml` blueprint for a Node web service.

1. Push this project to GitHub
2. In Render, create a new Blueprint and select the repo
3. Set `GEMINI_API_KEY` in the Render environment settings
4. Deploy

The production server reads environment variables from Render directly. For local development it will also load `.env.local` and `.env` from the project root.

If you want Render to run in demo mode without real image generation, set
`VIEWBRUSH_FORCE_MOCK_GENERATION=true` in Render Environment and redeploy.
