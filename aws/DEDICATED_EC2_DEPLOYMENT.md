# TechyGuide Blocks — Dedicated AWS EC2 Deployment & Specification Guide

This guide details the **hardware requirements, architecture, and step-by-step setup** for deploying **TechyGuide Blocks** on a **dedicated AWS EC2 instance**.

---

## 1. AWS Resource Requirements (Share with AWS Admin)

Provide these exact specifications to your AWS Administrator to provision the dedicated instance:

### 🖥️ 1.1 EC2 Instance Specification
| Property | Recommended Value | Minimum Value | Notes |
|----------|-------------------|---------------|-------|
| **Instance Type** | `t3.medium` (or `t3a.medium`) | `t3.small` | ESP32 C++ compilation (`xtensa-esp32-elf-g++`) is CPU & RAM intensive. |
| **vCPU** | 2 vCPUs | 2 vCPUs | Dual-core accelerates Webpack build & C++ compilation. |
| **Memory (RAM)** | **4 GB RAM** | **2 GB RAM** (+ 2GB Swap) | 4 GB ensures zero out-of-memory crashes during heavy C++ header compiles. |
| **Storage (EBS)** | **30 GB General Purpose SSD (gp3)** | 20 GB gp3 | OS (~5GB) + Docker (~3GB) + ESP32 toolchains & libs (~4GB) + build cache. |
| **Operating System** | **Ubuntu 22.04 LTS (x86_64)** or **24.04 LTS** | Ubuntu 22.04 | Standard Linux distro supported by Docker and `arduino-cli`. |
| **Elastic IP** | 1 Static Elastic IP | 1 Elastic IP | Ensures server IP address never changes when restarted. |

---

### 🛡️ 1.2 Security Group (Inbound Firewall Rules)

| Type | Protocol | Port Range | Source | Purpose |
|------|----------|------------|--------|---------|
| **SSH** | TCP | `22` | Admin IP / Subnet | Secure SSH management |
| **HTTP** | TCP | `80` | `0.0.0.0/0` | Web access & Let's Encrypt SSL challenge |
| **HTTPS** | TCP | `443` | `0.0.0.0/0` | Secure web application access |

> ⚠️ **IMPORTANT:** Do **NOT** open Port `3000` to the internet. Port 3000 is used by the backend compilation container internally and will be proxied through Nginx securely over Port 443.

---

### 🌐 1.3 DNS Configuration
In Route 53 (or your DNS manager):
- **Record Type:** `A` Record
- **Name:** `blocks.techyguide.in` (or your chosen domain/subdomain)
- **Target Value:** Elastic IP address of the new dedicated EC2 instance

---

## 2. System Architecture on the Dedicated Server

```
                                  [ User Browser ]
                                         │
                                   HTTPS (Port 443)
                                         │
                                         ▼
                             ┌───────────────────────┐
                             │    Nginx Web Server   │
                             │  (SSL via Certbot)    │
                             └───────────┬───────────┘
                                         │
                  ┌──────────────────────┴──────────────────────┐
                  │                                             │
                  ▼                                             ▼
        [ Static Web Application ]                    [ Backend API Proxy ]
     Root Path: /opt/techyguide-blocks            Path: /api/* → 127.0.0.1:3000
  (index.html, app.html, bundle.js)                               │
                                                                 ▼
                                                  ┌──────────────────────────────┐
                                                  │ Docker Container (backend)   │
                                                  │ Node 18 + Express            │
                                                  │ arduino-cli + ESP32 Core     │
                                                  └──────────────────────────────┘
```

---

## 3. Server Setup & Installation Steps

### Step 1: System Update & Swap Configuration (For 2GB instances)
If using a `t3.small` (2 GB RAM), create a 2 GB swap file to prevent compiler OOM errors:

```bash
# Update Ubuntu packages
sudo apt update && sudo apt upgrade -y

# Create 2GB Swap space (Skip if using t3.medium with 4GB RAM)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

### Step 2: Install Required Software (Docker & Nginx)

```bash
# Install Node.js 18, Docker, Nginx, Git, and Certbot
sudo apt-get update
sudo apt-get install -y curl git nginx certbot python3-certbot-nginx docker.io docker-compose-v2

# Enable and start Docker & Nginx services
sudo systemctl enable --now docker
sudo systemctl enable --now nginx

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

---

### Step 3: Deploy Backend Compilation Service (Docker)

1. Clone or copy the repository to `/opt/techyguide-app`:
```bash
sudo mkdir -p /opt/techyguide-app
sudo chown -R $USER:$USER /opt/techyguide-app
cd /opt/techyguide-app

# Clone your GitHub repository
git clone.
```

2. Launch the backend container:
```bash
# Build and start the backend compile container in detached mode
docker compose -f aws/docker-compose.yml up -d --build
```

3. Verify backend health check:
```bash
curl http://127.0.0.1:3000/health
# Expected Output: {"ok":true,"service":"techyguide-compile-api"}
```

---

### Step 4: Build & Deploy Static Frontend

1. Install dependencies and build production web assets:
```bash
cd /opt/techyguide-app
npm install

# Set Backend API URL to relative /api path
export BACKEND_API_URL="https://blocks.techyguide.in/api"
npm run build:prod
```

2. Copy compiled static files to web root directory:
```bash
sudo mkdir -p /opt/techyguide-blocks
sudo cp -r dist/* /opt/techyguide-blocks/
```

---

### Step 5: Configure Nginx Reverse Proxy

Create Nginx site configuration file:

```bash
sudo nano /etc/nginx/sites-available/blocks.techyguide.in
```

Paste the following Nginx configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name blocks.techyguide.in;

    # Root folder for static web files
    root /opt/techyguide-blocks;
    index index.html;

    # ── Static SPA Routing ──
    location = / {
        try_files /index.html =404;
    }

    location = /app.html {
        try_files /app.html =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets (bundle, images, styles)
    location ~* \.(js|css|webp|png|jpe?g|gif|svg|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # ── Backend C++ Compilation API Proxy ──
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Extended timeouts for C++ compilation jobs
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }

    location = /health {
        proxy_pass http://127.0.0.1:3000/health;
    }
}
```

Enable the configuration and reload Nginx:

```bash
# Link configuration
sudo ln -s /etc/nginx/sites-available/blocks.techyguide.in /etc/nginx/sites-enabled/

# Verify configuration syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

### Step 6: Install Free SSL Certificate (HTTPS)

Run Certbot to automatically configure SSL for `blocks.techyguide.in`:

```bash
sudo certbot --nginx -d blocks.techyguide.in --redirect
```

---

## 4. Verification Checklist

After deployment, run the following verification checks:

1. **Frontend IDE Load:** Visit `https://blocks.techyguide.in/app.html` in your browser. Verify the Blockly workspace loads cleanly.
2. **Backend API Check:** Visit `https://blocks.techyguide.in/health` in your browser. Should return `{"ok":true,"service":"techyguide-compile-api"}`.
3. **Arduino C++ Code Compilation:** Add an ESP32 block in Board Mode, click **Upload**, and confirm it compiles code via the backend.
4. **MicroPython Web Serial:** Connect an ESP32 board via USB, click MicroPython upload, and verify Web Serial connection works directly in browser.
