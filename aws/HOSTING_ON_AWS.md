# Hosting TechyGuide Blocks on AWS — Detailed Deployment Guide

This guide deploys the **TechyGuide Blocks** app (the Blockly IDE + ESP32 simulator) to your existing AWS EC2 instance that already runs a Node.js app at **techyguide.in**.

The most important goal of this guide is: **the new app must NOT interfere with the existing Node.js app that serves techyguide.in.** Every section below is written with that isolation in mind.

---

## 0. Understand what you are deploying

The TechyGuide Blocks app has **two independent parts**:

| Part | What it is | Runtime | Port | Required? |
|------|------------|---------|------|-----------|
| **Frontend** | Static files produced by Webpack (`dist/`) | Any static host (Nginx / S3) | 80 / 443 | **Yes** |
| **Backend (compile/upload API)** | Node.js + Express + `arduino-cli` (`aws/server.js`) | Node 18 + Docker | 3000 | **Optional** |

- The **frontend** is the Blockly workspace. It builds with `npm run build:prod` and outputs to `dist/`.
- The **backend** (`aws/server.js`) only handles Arduino C++ **compile & upload** via `/api/*`. It needs `arduino-cli` and the ESP32 core installed (heaviest component, ~1 GB+).
- **MicroPython upload** uses the browser's Web Serial API directly — it does **not** need the backend. So if you only want to demo the simulator + MicroPython, you can skip the backend entirely.

### Two-route model (important)

The frontend has two HTML entry points (see `webpack.config.js`):

- `/` → `index.html` — landing page (static, no JS bundle).
- `/app.html` → the Blockly IDE (loads `bundle.js`).

So your reverse proxy must serve both `/` and `/app.html` from the TechyGuide static files, and **not** fall through to the existing techyguide.in app.

---

## 1. Isolation strategy — how we avoid interfering with techyguide.in

Your existing app at `techyguide.in` is one Node.js process (likely behind Nginx on port 80/443). We isolate the new app on **five independent layers** so there is zero overlap:

### 1.1 Subdomain isolation (RECOMMENDED)
Serve TechyGuide at a **separate subdomain**: **`blocks.techyguide.in`**

- Different DNS record → different Nginx `server` block → no shared routing logic.
- The existing techyguide.in app keeps its own `server { server_name techyguide.in; ... }` block untouched.
- Nginx selects which app to serve based on the `Host` header, so both can share port 80/443 with **no port conflict**.

### 1.2 Process isolation
- The existing techyguide.in app keeps its current process manager (PM2 / systemd / etc.) and its current port.
- The TechyGuide backend runs as a **separate** PM2 process or Docker container on its own port (`3000`).
- They never share a Node process, a port, or a working directory.

### 1.3 Port isolation
- Existing techyguide.in app: unchanged (whatever port it uses now).
- TechyGuide backend: `3000` (only bound locally; never opened in the EC2 security group — see §4).
- Nginx proxies `/api/*` from `blocks.techyguide.in` to `127.0.0.1:3000`.

### 1.4 Filesystem isolation
- Existing app: leave its directory (e.g. `/var/www/techyguide.in` or `/home/ubuntu/techyguide-in`) untouched.
- New app: `/opt/techyguide-blocks` (frontend static) and `/opt/techyguide-blocks-backend` (backend source).
- A dedicated Linux user `techyguide` owns the new directories. Do **not** reuse the existing app's user.

### 1.5 Resource isolation
- The compile backend is CPU/RAM-heavy (it runs `arduino-cli` + ESP32 toolchain). Run it in a **Docker container** with memory/cpu limits so a big compile job can never starve the existing techyguide.in app.
- If your EC2 instance is small (t2.micro/t3.micro), see §9 — you may want the backend on a **separate** instance or skip it.

> **Bottom line:** different subdomain, different Nginx server block, different process, different port, different directory, different user. There is no shared state to corrupt.

---

## 2. Prerequisites on the EC2 instance

Check what you have first:

```bash
# Existing app — confirm it is running and on what port
sudo nginx -t                          # Nginx config currently valid
sudo netstat -tlnp | grep -E ':80|:443'  # what owns 80/443
pm2 list 2>/dev/null || systemctl status node  # how the existing app runs
```

Install what is missing for the **new** app only:

```bash
# Node 18 (only if not already present; the existing app may already have Node)
node -v   # need >= 18

# If missing:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 (process manager) — install if not present
sudo npm install -g pm2

# Docker (ONLY if you will run the compile backend)
docker --version || (sudo apt-get update && sudo apt-get install -y docker.io && sudo usermod -aG docker $USER)
# log out / log back in for docker group to take effect

# Certbot for HTTPS on the new subdomain
sudo apt-get install -y certbot python3-certbot-nginx
```

Create the isolated user and directories:

```bash
sudo useradd -m -s /bin/bash techyguide
sudo mkdir -p /opt/techyguide-blocks /opt/techyguide-blocks-backend
sudo chown -R techyguide:techyguide /opt/techyguide-blocks /opt/techyguide-blocks-backend
```

---

## 3. DNS — create the new subdomain

In Route 53 (or wherever `techyguide.in` DNS is managed):

1. Create an **A record**: `blocks.techyguide.in` → your EC2 instance's public IP.
   - (Or a CNAME to the existing record if you use an Elastic IP / hostname.)
2. Wait for propagation:

```bash
dig +short blocks.techyguide.in   # should return the EC2 public IP
```

> This DNS record is the single thing that lets Nginx route `blocks.*` separately from the bare domain. It does **not** touch the existing `techyguide.in` record.

---

## 4. EC2 Security Group — open ports carefully

**Do NOT** open port 3000 to the internet. The compile backend must only be reachable through Nginx on the new subdomain.

| Port | Open to | Why |
|------|---------|-----|
| 22 | your IP only | SSH |
| 80 | 0.0.0.0/0 | HTTP → redirects to HTTPS |
| 443 | 0.0.0.0/0 | HTTPS for both `techyguide.in` and `blocks.techyguide.in` |
| 3000 | **127.0.0.1 only** (do NOT add an inbound rule) | TechyGuide backend, local-only |

Since both apps share ports 80/443 via Nginx virtual hosts, **no new public port is opened for the new app.** This is the key to not disturbing the existing security footprint.

---

## 5. Build and deploy the FRONTEND (static files)

This is the required part. Do this on your local machine (or a CI runner), not necessarily on the server.

### 5.1 Build locally

```bash
cd TECHYGUIDE_APP_DEVELOPMENT
npm install
npm run build:prod
```

Output lands in `dist/` (`index.html`, `app.html`, `bundle.js`, `assets/`).

### 5.2 (Optional) Point the frontend at the backend API

If you are ALSO running the backend, bake its URL into the bundle at build time so the frontend knows where to call `/api/*`:

```bash
BACKEND_API_URL=https://blocks.techyguide.in/api npm run build:prod
```

> `webpack.config.js` injects this into `__API_BASE_URL__` (see `src/upload/uploadPanel.js`). If you skip the backend, leave it unset — the frontend will use relative `/api/*` and simply fail gracefully on the compile button (MicroPython upload still works via Web Serial).

### 5.3 Upload `dist/` to the server

From your local machine:

```bash
# Assumes your SSH key / user; adjust to your setup
scp -r dist/* ubuntu@YOUR_EC2_IP:/tmp/techyguide-dist/
```

On the server, move into place (as the dedicated user):

```bash
sudo cp -r /tmp/techyguide-dist/* /opt/techyguide-blocks/
sudo chown -R techyguide:techyguide /opt/techyguide-blocks
```

---

## 6. (Optional) Deploy the BACKEND — compile/upload API

Skip this entire section if you only need the simulator + MicroPython upload. Otherwise:

### 6.1 Copy the backend source to the server

```bash
# From local machine — copy the project (the backend needs package.json, aws/, server/)
rsync -avz --exclude node_modules --exclude dist --exclude build \
  . ubuntu@YOUR_EC2_IP:/tmp/techyguide-src/
```

On the server:

```bash
sudo cp -r /tmp/techyguide-src /opt/techyguide-blocks-backend
sudo chown -R techyguide:techyguide /opt/techyguide-blocks-backend
cd /opt/techyguide-blocks-backend
sudo -u techyguide npm install --omit=dev
```

### 6.2 Configure the backend environment

```bash
cd /opt/techyguide-blocks-backend/aws
cp backend.env.sample backend.env
```

Edit `backend.env` — set CORS to the new subdomain only:

```env
PORT=3000
ARDUINO_DATA_DIR=/arduino-data
ARDUINO_LIBRARIES_DIR=/arduino-libraries
CORS_ORIGIN=https://blocks.techyguide.in
```

> Setting `CORS_ORIGIN` to the new subdomain means the existing `techyguide.in` app **cannot** call this API even if it tried — fully isolated.

### 6.3 Run the backend in Docker (recommended — has resource limits)

```bash
cd /opt/techyguide-blocks-backend
sudo docker compose -f aws/docker-compose.yml up -d --build
```

The `aws/Dockerfile.backend` installs `node:18-slim`, `arduino-cli`, and the ESP32 core. First build takes ~10–15 minutes (it downloads the ESP32 toolchain, ~1 GB).

To add **resource limits** so a compile job can never starve the existing app, edit `aws/docker-compose.yml` and add to the `backend` service:

```yaml
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1G
        reservations:
          memory: 256M
```

Verify it is up (local only):

```bash
curl http://127.0.0.1:3000/health
# {"ok":true,"service":"techyguide-compile-api"}
```

### 6.4 (Alternative) Run the backend with PM2 instead of Docker

If you cannot use Docker, install `arduino-cli` + ESP32 core manually (see `aws/ec2-backend.md`) and run:

```bash
cd /opt/techyguide-blocks-backend
sudo -u techyguide pm2 start aws/server.js --name techyguide-backend --env-file aws/backend.env
sudo -u techyguide pm2 save
sudo -u techyguide pm2 startup systemd   # generate the boot-enable command, then run what it prints as root
```

> Keep this as a **separate PM2 daemon list** from the existing techyguide.in app. Do not start/stop the existing app's PM2 entries while managing this one.

---

## 7. Nginx reverse proxy — the isolation point

This is the most critical file. We add a **new** `server` block for `blocks.techyguide.in` and leave the existing techyguide.in block completely untouched.

### 7.1 Create the new site file

```bash
sudo nano /etc/nginx/sites-available/blocks.techyguide.in
```

```nginx
# ── TechyGuide BLOCKS frontend + API ──────────────────────────
# Separate server block — does NOT touch techyguide.in config.

server {
    listen 80;
    listen [::]:80;
    server_name blocks.techyguide.in;

    # Redirect all HTTP to HTTPS (certbot will manage the 443 block)
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name blocks.techyguide.in;

    # certbot will insert ssl_certificate / ssl_certificate_key here.

    root /opt/techyguide-blocks;
    index index.html;

    # ── Static frontend ──
    # Landing page
    location = / {
        try_files /index.html =404;
    }
    # The Blockly IDE
    location = /app.html {
        try_files /app.html =404;
    }
    # All other static assets (bundle.js, assets/*, board/*, logo/*)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Long-cache the immutable hashed bundle
    location ~* \.(js|css|webp|png|jpe?g|gif|svg|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # ── Backend API (only if you ran §6) ──
    # Proxy /api/* to the local compile server. NOT exposed on another port.
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        # Compiles can take a while
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }

    # Health check passthrough (handy)
    location = /health {
        proxy_pass http://127.0.0.1:3000/health;
    }
}
```

### 7.2 Enable the site and reload

```bash
sudo ln -s /etc/nginx/sites-available/blocks.techyguide.in /etc/nginx/sites-enabled/
sudo nginx -t          # MUST pass — if not, do NOT reload; fix first
sudo systemctl reload nginx
```

> **Important:** `nginx -t` validates the ENTIRE config, including the existing techyguide.in site. If it fails, your existing app keeps running (reload only happens on a passing test). If it passes, `reload` is graceful — zero downtime for the existing app.

### 7.3 Get the SSL certificate for the new subdomain

```bash
sudo certbot --nginx -d blocks.techyguide.in --redirect
```

Certbot edits only the `blocks.techyguide.in` server block to add the certificate lines. It does not modify the existing techyguide.in cert.

---

## 8. Verify — without touching the existing app

Check each layer independently:

```bash
# 1. Backend (local only — must NOT be reachable from the internet)
curl http://127.0.0.1:3000/health
# From your LAPTOP, this should FAIL (security group blocks it):
#   curl http://YOUR_EC2_IP:3000/health   ← must time out / refuse

# 2. Frontend over HTTPS
curl -I https://blocks.techyguide.in/            # 200, index.html
curl -I https://blocks.techyguide.in/app.html    # 200, app.html
curl -I https://blocks.techyguide.in/bundle.js   # 200, immutable cache

# 3. API proxy (only if backend running)
curl https://blocks.techyguide.in/health
curl https://blocks.techyguide.in/api/libs       # lists installed Arduino libs

# 4. CRITICAL — confirm the existing app is unaffected
curl -I https://techyguide.in/                   # still 200, still the OLD app
```

If step 4 returns the TechyGuide landing page instead of the existing app, your Nginx `server_name` matching is wrong — check that the existing techyguide.in block has `server_name techyguide.in;` (not a catch-all `_` or empty) and that it takes precedence correctly.

---

## 9. Resource planning — will it fit on your current instance?

The ESP32 compile backend is heavy. Estimate:

| Component | RAM (idle) | CPU spike | Disk |
|-----------|-----------|-----------|------|
| Existing techyguide.in app | ~150–400 MB | low | — |
| TechyGuide frontend (Nginx static) | ~10 MB | none | ~20 MB |
| TechyGuide backend (Docker, idle) | ~200 MB | none | ~1.5 GB (arduino-cli + ESP32 core) |
| TechyGuide backend during compile | +400–800 MB | 1 core, 30–60 s | — |

- **t3.micro (1 GB RAM):** Run frontend only. Put the backend on a **separate** EC2 instance, or skip it.
- **t3.small (2 GB):** Frontend + backend with Docker memory limit `1G`. Tight but workable.
- **t3.medium (4 GB) or larger:** Comfortable for both on one instance.

If you need a separate instance for the backend, repeat §2/§3/§4 on a new EC2 instance, run §6 there, and point the frontend build at it: `BACKEND_API_URL=https://api.techyguide.in/api npm run build:prod`.

---

## 10. Updating the app later (zero downtime for the existing app)

### Frontend update
```bash
# Build locally
npm run build:prod
scp -r dist/* ubuntu@EC2:/tmp/techyguide-dist/

# On server
sudo rm -rf /opt/techyguide-blocks/*
sudo cp -r /tmp/techyguide-dist/* /opt/techyguide-blocks/
sudo chown -R techyguide:techyguide /opt/techyguide-blocks
# Nginx serves static files — no reload needed, instant new version
```

### Backend update
```bash
cd /opt/techyguide-blocks-backend
sudo -u techyguide git pull           # or re-copy source
sudo -u techyguide npm install --omit=dev
sudo docker compose -f aws/docker-compose.yml up -d --build   # or: pm2 restart techyguide-backend
```

Neither of these touches the existing techyguide.in app's files, process, or Nginx block.

---

## 11. Rollback — undo everything without affecting techyguide.in

If the new app misbehaves, you can remove it cleanly:

```bash
# Stop backend
sudo docker compose -f /opt/techyguide-blocks-backend/aws/docker-compose.yml down
# (or: sudo -u techyguide pm2 delete techyguide-backend)

# Disable the Nginx site (existing app keeps serving)
sudo rm /etc/nginx/sites-enabled/blocks.techyguide.in
sudo nginx -t && sudo systemctl reload nginx

# Remove the DNS record for blocks.techyguide.in (optional)

# Files can stay in /opt/techyguide-blocks* — they harm nothing.
```

At no point during rollback is the existing `techyguide.in` app restarted or reconfigured.

---

## 12. Quick checklist

- [ ] DNS `blocks.techyguide.in` → EC2 IP
- [ ] Security group: ports 80/443 open, **3000 NOT open**
- [ ] Dedicated user `techyguide` + dirs `/opt/techyguide-blocks{,-backend}`
- [ ] `npm run build:prod` → `dist/` uploaded to `/opt/techyguide-blocks`
- [ ] (Optional) backend in Docker with resource limits, `CORS_ORIGIN=https://blocks.techyguide.in`
- [ ] New Nginx `server` block for `blocks.techyguide.in`; existing block untouched
- [ ] `nginx -t` passes, `systemctl reload nginx`
- [ ] `certbot --nginx -d blocks.techyguide.in`
- [ ] Verify: `https://blocks.techyguide.in/app.html` loads IDE
- [ ] Verify: `https://techyguide.in/` still serves the OLD app unchanged
- [ ] (Backend) `https://blocks.techyguide.in/health` returns `{"ok":true,...}`

---

## 13. Where this fits with the existing AWS docs

This document is the **end-to-end** guide focused on coexisting with techyguide.in. For the lower-level building blocks already in the repo, see:

- `aws/s3-cloudfront.md` — alternative: host the frontend on **S3 + CloudFront** (fully separate from the EC2 instance, zero interference by design; good if you want the frontend off the instance entirely).
- `aws/ec2-backend.md` — backend-only details (Docker, arduino-cli, CloudFront `/api/*` behavior).
- `aws/Dockerfile.backend` / `aws/docker-compose.yml` — the backend container image used in §6.
- `aws/server.js` — the Express backend entry point (`/health` + `/api/*`).

**Recommended combination for minimum interference:** host the **frontend on S3+CloudFront** (per `s3-cloudfront.md`, completely off your EC2 instance) and run only the **backend in Docker on EC2** behind the new `blocks.techyguide.in` Nginx block. The existing techyguide.in app then shares nothing but the machine's kernel.
