# Deploying the TechyGuide demo snapshot

This folder contains files and instructions to host the **company demo snapshot** of TechyGuide.

## What is in this snapshot?

- Only Scratch and ESP32 blocks that are working as of the snapshot date.
- **No date-based auto-unlocking.** Future blocks are hidden because they are not included in `src/services/phaseConfig.js`.
- The phase admin panel is removed so the company cannot manually unlock later phases.

## Architecture

```
┌─────────────────────────────────────┐      ┌────────────────────────────────────┐
│  Frontend (static SPA)                │      │  Backend (Node.js + arduino-cli)   │
│  Netlify / Cloudflare Pages / S3      │◄────►│  Oracle Cloud Free Tier VM         │
│  Build output: dist/                  │      │  Compile & upload ESP32 firmware   │
└─────────────────────────────────────┘      └────────────────────────────────────┘
```

- **Frontend**: free static hosting (Netlify or Cloudflare Pages recommended).
- **Backend**: free Oracle Cloud VM running the Docker container from `aws/Dockerfile.backend`.

## Recommended free stack (Option B)

For a full company demo with working Arduino compile/upload:

1. **Frontend:** Cloudflare Pages or Netlify (free)
2. **Backend:** Oracle Cloud Free Tier VM (always-free)

Set the frontend build environment variable so it calls your backend:

```bash
set BACKEND_API_URL=https://your-oracle-vm-ip.nip.io
npm run build:prod
```

## Deployment guides

| Guide | Use case |
|-------|----------|
| [`netlify.md`](netlify.md) | Free static frontend hosting |
| [`cloudflare-pages.md`](cloudflare-pages.md) | Free static frontend hosting with unlimited bandwidth |
| [`oracle-cloud-free-tier.md`](oracle-cloud-free-tier.md) | Free VM backend with Arduino CLI + ESP32 core |
| [`s3-cloudfront.md`](s3-cloudfront.md) | AWS static frontend hosting (uses free tier, not forever free) |
| [`ec2-backend.md`](ec2-backend.md) | AWS backend hosting (uses free tier, not forever free) |

## Backend files

| File | Purpose |
|------|---------|
| `aws/server.js` | Standalone Express server wrapping the compile/upload API |
| `aws/Dockerfile.backend` | Docker image for the backend |
| `aws/docker-compose.yml` | Local/docker test of the backend |
| `aws/backend.env.sample` | Environment variable template |

## Quick start

1. Build the frontend:
   ```bash
   npm install
   set BACKEND_API_URL=https://your-oracle-vm-ip.nip.io
   npm run build:prod
   ```
2. Deploy `dist/` to Netlify or Cloudflare Pages.
3. Deploy the backend to Oracle Cloud Free Tier.
4. Configure the backend `CORS_ORIGIN` to match your frontend domain.

## Notes

- The current `server/compileServer.js` has Windows-style fallback paths. The Dockerfile sets `ARDUINO_DATA_DIR` and `ARDUINO_LIBRARIES_DIR` to Linux paths, so the server uses those instead.
- For a pure frontend demo (no hardware upload), you can skip the backend entirely and host only the static site.
