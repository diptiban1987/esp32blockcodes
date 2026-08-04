# AWS Lightsail Networking & Firewall Port Configuration Guide

**Project:** TechyGuide Blocks (`block.techyguide.in`)  
**Platform:** AWS Lightsail (Ubuntu 24.04 / 22.04 LTS)  
**Target Domain:** `block.techyguide.in`  

---

## 1. Summary of Required Ports

| Port | Protocol | Purpose / Application | Access Level | AWS Lightsail Firewall Action |
|------|----------|-----------------------|--------------|-------------------------------|
| **80** | TCP | HTTP (Nginx Web Server & Let's Encrypt Certbot) | Public | **ADD RULE (Custom / HTTP)** |
| **443** | TCP | HTTPS (`https://block.techyguide.in` Secure Web IDE) | Public | **ADD RULE (Custom / HTTPS)** |
| **22** | TCP | SSH (Command line administration) | Admin / Public | **DEFAULT (Enabled)** |
| **3389** | TCP | XRDP (Remote Desktop GUI Access) | Admin / Public | **ADD RULE (Custom TCP: 3389)** |
| **9090** | TCP | Cockpit (Web-based Linux Server Admin UI) | Admin / Public | **ADD RULE (Custom TCP: 9090)** |
| **3000** | TCP | Express C++ Compilation Backend (Internal Docker) | Internal Only | **DO NOT OPEN** (Proxied via Nginx over Port 443) |

---

## 2. Step-by-Step Guide to Configure Ports in AWS Lightsail

Follow these exact steps in your AWS Lightsail Web Console:

### Step 1: Open Lightsail Networking Console
1. Log into your **AWS Lightsail Console**: [https://lightsail.aws.amazon.com/](https://lightsail.aws.amazon.com/)
2. Under the **Instances** tab, click on your server instance (e.g., `techyguide-blocks-prod`).
3. Click on the **Networking** tab at the top menu.

---

### Step 2: Add Firewall Rules in IPv4 Firewall

Scroll down to the **IPv4 Firewall** section. You will see default rules (like SSH Port 22 and HTTP Port 80). 

Add the following rules step-by-step:

#### Rule 1: HTTP (Port 80)
1. Click **+ Add rule**.
2. **Application:** Select `HTTP` (or `Custom`).
3. **Protocol:** `TCP`
4. **Port / Port Range:** `80`
5. Click **Create** / **Save**.

#### Rule 2: HTTPS (Port 443)
1. Click **+ Add rule**.
2. **Application:** Select `HTTPS` (or `Custom`).
3. **Protocol:** `TCP`
4. **Port / Port Range:** `443`
5. Click **Create** / **Save**.

#### Rule 3: XRDP (Port 3389) — Remote Desktop
1. Click **+ Add rule**.
2. **Application:** Select `Custom` (or `RDP`).
3. **Protocol:** `TCP`
4. **Port / Port Range:** `3389`
5. *(Optional Security Tip)*: Check "Restrict to a single IP address" and enter your admin PC IP address for maximum security.
6. Click **Create** / **Save**.

#### Rule 4: Cockpit (Port 9090) — Web Admin UI
1. Click **+ Add rule**.
2. **Application:** Select `Custom`.
3. **Protocol:** `TCP`
4. **Port / Port Range:** `9090`
5. *(Optional Security Tip)*: Check "Restrict to a single IP address" if only you access Cockpit.
6. Click **Create** / **Save**.

---

## 3. Important Architectural Note on Port 3000 (Backend)

> [!IMPORTANT]
> **Do NOT open Port 3000 in the AWS Lightsail Firewall!**

- The C++ compilation backend (`aws/server.js`) runs inside a Docker container bound locally to `127.0.0.1:3000`.
- All frontend calls from `block.techyguide.in` travel securely over **HTTPS (Port 443)** to **Nginx**.
- Nginx internally forwards `/api/*` traffic to `http://127.0.0.1:3000`.
- Keeping Port 3000 closed to the public prevents direct unauthorized access to the compilation engine while ensuring maximum security.

---

## 4. Verification & Testing Commands

Once you have added the firewall rules in AWS Lightsail, connect to your server via SSH and verify that the services are listening on the ports:

### A. Check Listening Ports on Ubuntu Server
Run the following command on the server terminal:
```bash
sudo ss -tulpn | grep -E '22|80|443|3389|9090|3000'
```
Expected output:
- `0.0.0.0:80` (Nginx)
- `0.0.0.0:443` (Nginx SSL)
- `0.0.0.0:3389` (xrdp)
- `0.0.0.0:9090` (cockpit-ws)
- `127.0.0.1:3000` (node / docker backend)

### B. Check UFW Firewall Status (Internal OS Firewall)
If Ubuntu internal UFW firewall is enabled, ensure these ports are allowed internally as well:
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3389/tcp
sudo ufw allow 9090/tcp
sudo ufw enable
sudo ufw status
```

---

## 5. Accessing Your Installed Services

| Service | Access URL / Client | Port Used | Notes |
|---------|---------------------|-----------|-------|
| **TechyGuide Web IDE** | `https://block.techyguide.in` | 443 | Main application |
| **Cockpit Admin Web UI** | `https://<YOUR-LIGHTSAIL-STATIC-IP>:9090` | 9090 | Log in with Ubuntu system user credentials |
| **XRDP Remote Desktop** | Use RDP Client (Windows `mstsc` / Mac `Microsoft Remote Desktop`) → `<YOUR-LIGHTSAIL-STATIC-IP>:3389` | 3389 | Connects to Ubuntu GUI desktop |
| **SSH Terminal** | `ssh -i your-key.pem ubuntu@<YOUR-LIGHTSAIL-STATIC-IP>` | 22 | Terminal management |

---

## 6. Associated Deployment Documents

- [LIGHTSAIL_RESPONSE_AND_GUIDE.md](file:///k:/Application%20softwares/TECHYGUIDE_APP_DEVELOPMENT/aws/LIGHTSAIL_RESPONSE_AND_GUIDE.md) — Full Lightsail Server Provisioning & Nginx Setup Guide
- [EC2_PEM_DEPLOYMENT_GUIDE.md](file:///k:/Application%20softwares/TECHYGUIDE_APP_DEVELOPMENT/aws/EC2_PEM_DEPLOYMENT_GUIDE.md) — SSH `.pem` key connection guide
- [DEDICATED_EC2_DEPLOYMENT.md](file:///k:/Application%20softwares/TECHYGUIDE_APP_DEVELOPMENT/aws/DEDICATED_EC2_DEPLOYMENT.md) — Comprehensive backend & frontend build specs
