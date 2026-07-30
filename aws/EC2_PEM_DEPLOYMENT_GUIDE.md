# Complete AWS EC2 Deployment Guide Using `.pem` Key

This document provides a step-by-step procedure to connect to your **Amazon EC2 instance** using your `.pem` key file and deploy **TechyGuide Blocks** on `block.techyguide.in`.

---

## 📋 Prerequisites & Information Needed

Before starting, ensure you have:
1. **Your `.pem` file** (e.g., `techyguide-key.pem` saved on your computer).
2. **EC2 Public IP Address** (e.g., `54.210.xx.xx`) from your AWS EC2 Console.
3. **EC2 Username**:
   - For **Ubuntu** (recommended): `ubuntu`
   - For **Amazon Linux 2 / 2023**: `ec2-user`
4. **Domain DNS A-Record**: `block.techyguide.in` pointing to your EC2 Public IP.

---

## 🔑 Phase 1: Connect to EC2 Instance Using `.pem` File

### Method A: Using Windows PowerShell / Command Prompt

1. Open PowerShell or Command Prompt on your computer.
2. Navigate to the folder containing your `.pem` key:
   ```powershell
   cd "C:\Users\YourUsername\Downloads"
   ```

3. Set safe permissions on the `.pem` file (Windows SSH requires restrictive key permissions):
   ```powershell
   icacls techyguide-key.pem /reset
   icacls techyguide-key.pem /grant:r "%username%:R"
   icacls techyguide-key.pem /inheritance:r
   ```

4. Connect via SSH:
   ```powershell
   ssh -i "techyguide-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
   ```
   *(Replace `techyguide-key.pem` with your key's filename and `YOUR_EC2_PUBLIC_IP` with your actual server IP).*

---

### Method B: Using Git Bash / Linux / macOS Terminal

1. Open Git Bash or Terminal.
2. Navigate to the directory containing your `.pem` file:
   ```bash
   cd /c/Users/YourUsername/Downloads
   ```

3. Set read-only permissions (`chmod 400`):
   ```bash
   chmod 400 techyguide-key.pem
   ```

4. Connect via SSH:
   ```bash
   ssh -i techyguide-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
   ```

---

## 🚀 Phase 2: Server Environment Setup

Once connected to your EC2 instance via SSH, execute the following setup commands:

### Step 1: Update System & Install Required Packages

```bash
# Update Ubuntu packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 LTS, Docker, Nginx, Certbot, Git
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git nginx certbot python3-certbot-nginx docker.io docker-compose-v2

# Start and enable Docker & Nginx
sudo systemctl enable --now docker
sudo systemctl enable --now nginx

# Add user to Docker group
sudo usermod -aG docker $USER
```

*Note: Type `exit` and reconnect with your SSH command so the docker permissions take effect.*

---

## 📦 Phase 3: Deploy Application Code & Docker Backend

### Step 1: Clone the Repository on EC2

```bash
sudo mkdir -p /opt/techyguide-app
sudo chown -R $USER:$USER /opt/techyguide-app
cd /opt/techyguide-app

# Clone your codebase
git clone https://github.com/diptiban1987/techyblocks.git .
```

### Step 2: Build & Start backend Compiler Container

```bash
cd /opt/techyguide-app
docker compose -f aws/docker-compose.yml up -d --build
```

Verify backend health check:
```bash
curl http://127.0.0.1:3000/health
# Output: {"ok":true,"service":"techyguide-compile-api"}
```

---

## 🌐 Phase 4: Build Frontend & Configure Nginx

### Step 1: Build Webpack Static Assets

```bash
cd /opt/techyguide-app
npm install

# Set Backend API URL environment variable
export BACKEND_API_URL="https://block.techyguide.in/api"
npm run build:prod

# Copy static assets to web folder
sudo mkdir -p /opt/techyguide-blocks
sudo cp -r dist/* /opt/techyguide-blocks/
```

### Step 2: Configure Nginx Virtual Host

Create Nginx site configuration file:
```bash
sudo nano /etc/nginx/sites-available/block.techyguide.in
```

Paste the following configuration into the file:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name block.techyguide.in;

    root /opt/techyguide-blocks;
    index index.html;

    # Static Web App Routing
    location = / { try_files /index.html =404; }
    location = /app.html { try_files /app.html =404; }
    location / { try_files $uri $uri/ /index.html; }

    # Static Asset Caching
    location ~* \.(js|css|webp|png|jpe?g|gif|svg|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # C++ Compile Backend API Proxy
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

Enable configuration and test Nginx:
```bash
# Link to active sites
sudo ln -s /etc/nginx/sites-available/block.techyguide.in /etc/nginx/sites-enabled/

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 Phase 5: Enable Free SSL Certificate (HTTPS)

Run Certbot to secure your domain with HTTPS:

```bash
sudo certbot --nginx -d block.techyguide.in --redirect
```

Certbot will ask for an email address and automatically update your Nginx configuration to enable HTTPS redirect.

---

## ✅ Phase 6: Post-Deployment Verification

1. **Open Web IDE**: Open `https://block.techyguide.in/app.html` in your web browser.
2. **Verify Backend**: Open `https://block.techyguide.in/health` in your web browser (should display `{"ok":true...}`).
3. **Test ESP32 C++ Upload**: Place ESP32 blocks, click **Upload**, and confirm code compiles successfully.
