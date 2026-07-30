# Technical Response & Infrastructure Approval: AWS Lightsail for TechyGuide Blocks

**Project:** TechyGuide Blocks  
**Target Platform:** AWS Lightsail (4 GB RAM / 2 vCPU / 80 GB SSD)  
**Target Domain:** `block.techyguide.in`  
**Date:** 30 July 2026  

---

## 1. Executive Summary & Verdict

We have thoroughly reviewed the **Infrastructure Review & Deployment Proposal** from the TechyGuide infrastructure team.

### ✅ **Final Verdict: Fully Approved & Recommended!**

We **100% agree** with the team's suggestion to use **AWS Lightsail** (4 GB RAM / 2 vCPU / 60–80 GB SSD) instead of standard EC2, and to standardize on **`block.techyguide.in`**.

- **Why Lightsail is excellent here:** Under the hood, AWS Lightsail runs on the exact same AWS Nitro / EC2 hardware platform, but includes bundled bandwidth, integrated static IPs, simplified snapshot management, and predictable flat-rate monthly pricing ($20/month for 4GB RAM / 2 vCPU / 80GB SSD).
- **Zero compatibility issues:** Docker, Node.js 18+, Nginx, `arduino-cli`, and ESP32 toolchains run **identically** on Lightsail Ubuntu 24.04 / 22.04 LTS as they do on EC2.

---

## 2. Detailed Answers to the Team's Questions

### Q1: Why EC2 vs. Lightsail? Is Lightsail suitable?
- **Answer:** **Yes, Lightsail is 100% suitable.** 
- There are **no technical limitations** in AWS Lightsail for this application. The original recommendation specified EC2 simply as a generic AWS term. Since your team already manages `techyguide.in` and `course.techyguide.in` on Lightsail, deploying TechyGuide Blocks on a dedicated Lightsail instance is the **ideal choices** for operational consistency, snapshot backups, and cost control.

---

### Q2: Domain Name (`block.techyguide.in`)
- **Answer:** **Adopted.** 
- We have standardized all configurations, Nginx server blocks, SSL scripts, and build environment variables to use **`block.techyguide.in`**.

---

### Q3: Storage Increase (30 GB → 60–80 GB SSD)
- **Answer:** **Fully Endorsed.**
- Increasing storage to **60–80 GB SSD** is a great decision. While the core Docker container and toolchains take ~8–10 GB, having 80 GB ensures ample buffer space for Docker image builds, `arduino-cli` build caches, OS logs, and future expansion.

---

### Q4: Project Storage & Backups
- **Answer:** **Client-Side (Local) with optional S3 cloud sync.**
- Currently, TechyGuide Blocks is an interactive SPA. Student projects are saved directly in the browser (`localStorage`) and can be exported/imported as standard `.json` project files.
- **Future Cloud Storage:** When user accounts are enabled, student project JSON payloads can be backed up to **Amazon S3** or stored in a lightweight database.

---

### Q5: Production Database
- **Answer:** **None required for initial release.**
- The C++ compilation backend (`aws/server.js`) is **stateless**. It receives a POST request containing C++ code text, compiles it in-memory/tmp, returns the compiled binary `.bin`, and cleans up temporary files immediately. No database is required for compilation.

---

### Q6: Compilation Security & Isolation
- **Answer:** **Containerized & Non-Root Execution.**
- All code compilations take place inside a dedicated, isolated Docker container (`aws/Dockerfile.backend`).
- The Express server runs as an unprivileged process inside the container.
- Compilation jobs operate in transient `/tmp/builds` directories that are automatically wiped after each request.
- Resource limits (CPU & Memory) are enforced in `docker-compose.yml` so no single compilation job can degrade server performance.

---

### Q7: Authentication & LMS Integration Roadmap
- **Answer:** **Open access initially, SSO with LearnDash (`course.techyguide.in`) on roadmap.**
- **Phase 1 (Current):** Open IDE access at `block.techyguide.in`.
- **Phase 2 (Roadmap):** Integration via JWT / OAuth2 / Single Sign-On (SSO) with your existing WordPress / LearnDash LMS at `course.techyguide.in`, allowing students to log in with their existing LMS credentials.

---

## 3. Final Standardized Infrastructure Specifications

| Component | Final Approved Specification |
|-----------|------------------------------|
| **Hosting Platform** | **AWS Lightsail** |
| **Instance Size** | **4 GB RAM / 2 vCPU / 80 GB SSD** ($20/mo bundle) |
| **Operating System** | **Ubuntu 24.04 LTS** (or 22.04 LTS) |
| **Domain** | **`block.techyguide.in`** |
| **Static IP** | Yes (Lightsail Attached Static IP) |
| **Web Server / Reverse Proxy** | **Nginx** |
| **SSL Certificate** | **Let's Encrypt (Certbot)** |
| **Backend Runtime** | **Docker + Node.js 18 + arduino-cli** |

---

## 4. Quick Deployment Steps on Lightsail

### Step 1: Provision Lightsail Instance
1. In AWS Lightsail Console, create instance:
   - **Platform:** Linux/Unix
   - **Blueprint:** OS Only → Ubuntu 24.04 LTS
   - **Plan:** $20/month (4 GB RAM, 2 vCPU, 80 GB SSD, 4 TB Transfer)
   - **Name:** `techyguide-blocks-prod`
2. Create & attach a **Lightsail Static IP** to the instance.
3. In DNS, create A Record: `block.techyguide.in` → Lightsail Static IP.

### Step 2: Server Setup Commands (Run via SSH)

```bash
# 1. System update & install Docker + Nginx + Certbot
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx docker.io docker-compose-v2
sudo systemctl enable --now docker nginx
sudo usermod -aG docker $USER

# 2. Clone repository & start Backend Container
sudo mkdir -p /opt/techyguide-app
sudo chown -R $USER:$USER /opt/techyguide-app
git clone https://github.com/diptiban1987/techyblocks.git /opt/techyguide-app
cd /opt/techyguide-app
docker compose -f aws/docker-compose.yml up -d --build

# 3. Build Static Frontend Assets
npm install
export BACKEND_API_URL="https://block.techyguide.in/api"
npm run build:prod
sudo mkdir -p /opt/techyguide-blocks
sudo cp -r dist/* /opt/techyguide-blocks/

# 4. Nginx Configuration
sudo nano /etc/nginx/sites-available/block.techyguide.in
```

**Nginx Configuration File:**
```nginx
server {
    listen 80;
    server_name block.techyguide.in;

    root /opt/techyguide-blocks;
    index index.html;

    location = / { try_files /index.html =404; }
    location = /app.html { try_files /app.html =404; }
    location / { try_files $uri $uri/ /index.html; }

    location ~* \.(js|css|webp|png|jpe?g|gif|svg|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }

    location = /health {
        proxy_pass http://127.0.0.1:3000/health;
    }
}
```

```bash
# Enable Nginx config & test
sudo ln -s /etc/nginx/sites-available/block.techyguide.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 5. Enable SSL HTTPS
sudo certbot --nginx -d block.techyguide.in --redirect
```

---

## 5. Summary Confirmation
Everything in the team's proposal is **100% aligned with best practices**. Proceed with provisioning the **AWS Lightsail 4 GB RAM / 2 vCPU / 80 GB SSD** instance.
