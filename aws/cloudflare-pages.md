# Deploy TechyGuide frontend to Cloudflare Pages (free tier)

Cloudflare Pages offers unlimited free bandwidth, a global CDN, and Git integration.

## Steps

1. Push the `TECHYGUIDE_APP_DEVELOPMENT` folder to a GitHub/GitLab repository.
2. Go to the [Cloudflare Pages dashboard](https://dash.cloudflare.com/?to=/:account/pages).
3. Click **Create a project → Connect to Git**.
4. Select your repository and click **Begin setup**.
5. Configure build:
   - **Project name:** `techyguide-demo`
   - **Production branch:** `main` (or your default branch)
   - **Build command:** `npm run build:prod`
   - **Build output directory:** `dist`
6. Add environment variable:
   - Key: `BACKEND_API_URL`
   - Value: `https://your-oracle-vm-ip.nip.io`
7. Click **Save and Deploy**.

## SPA routing

Cloudflare Pages automatically serves `index.html` for unknown routes if a `404.html` is present, but for SPAs it's safer to add a `_redirects` file in `dist/` (created automatically after build):

```
/* /index.html 200
```

You can also configure this in **Pages → Settings → Functions → Redirects**.

## Notes

- Leave `BACKEND_API_URL` empty for a frontend-only demo.
- Cloudflare Pages does not proxy `/api/*` to an external backend as easily as Netlify. If you need relative API URLs, use Cloudflare Workers or a Pages Function to forward `/api/*` requests.
