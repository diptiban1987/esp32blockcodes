# Deploy TechyGuide frontend to Netlify (free tier)

Netlify's free tier includes 100 GB bandwidth/month, drag-and-drop deploys, and Git integration.

## Option 1: Drag-and-drop (fastest)

1. Build locally with your backend URL:

   ```bash
   cd TECHYGUIDE_APP_DEVELOPMENT
   set BACKEND_API_URL=https://your-oracle-vm-ip.nip.io
   npm run build:prod
   ```

2. Go to [netlify.com](https://netlify.com) and log in.
3. Drag the `dist/` folder onto the Netlify dashboard.
4. Netlify gives you a URL like `https://techyguide-demo-xxx.netlify.app`.

## Option 2: Git-based deploy (recommended)

1. Push the `TECHYGUIDE_APP_DEVELOPMENT` folder to a GitHub/GitLab/Bitbucket repository.
2. In Netlify, click **Add new site → Import an existing project**.
3. Choose your repo.
4. Set build settings:
   - **Build command:** `npm run build:prod`
   - **Publish directory:** `dist`
5. Add environment variable:
   - Key: `BACKEND_API_URL`
   - Value: `https://your-oracle-vm-ip.nip.io`
6. Click **Deploy**.

## Redirects / SPA behavior

The included `netlify.toml` makes all routes serve `index.html` so the single-page app works on refresh.

## Notes

- If you do **not** have a backend yet, leave `BACKEND_API_URL` empty. The Arduino C++ compile/upload button will fail, but the rest of the demo works.
- To proxy `/api/*` through Netlify (so the frontend can use relative URLs), uncomment the second `[[redirects]]` section in `netlify.toml` and set your backend URL.
