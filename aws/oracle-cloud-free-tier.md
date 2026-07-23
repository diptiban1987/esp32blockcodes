# Deploy the TechyGuide backend on Oracle Cloud Free Tier

Oracle Cloud Free Tier gives you an **always-free** VM (1 CPU, 1 GB RAM, 200 GB storage) — perfect for running the Arduino compile/upload backend.

## 1. Sign up and create a VM

1. Go to [cloud.oracle.com](https://cloud.oracle.com) and sign up for the Free Tier.
2. Create a VM instance:
   - **Name:** `techyguide-backend`
   - **Image:** Canonical Ubuntu 22.04
   - **Shape:** VM.Standard.E2.1.Micro (Always Free) or ARM Ampere A1 (Always Free)
   - **Networking:** Create a VCN with public subnet and allow SSH (port 22) + HTTP (port 3000)
   - **SSH keys:** Generate and download the private key
3. Note the public IP address of the VM.

## 2. SSH into the VM

```bash
chmod 600 ~/Downloads/techyguide-backend-key.pem
ssh -i ~/Downloads/techyguide-backend-key.pem ubuntu@YOUR_VM_PUBLIC_IP
```

## 3. Install Docker

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker ubuntu
# Log out and back in
```

## 4. Open firewall port 3000

In the OCI console:
- Go to your VCN → Security Lists → Ingress Rules
- Add rule: Source CIDR `0.0.0.0/0`, Destination Port Range `3000`

## 5. Copy project files to the VM

From your local machine:

```bash
cd TECHYGUIDE_APP_DEVELOPMENT
scp -i ~/Downloads/techyguide-backend-key.pem -r . ubuntu@YOUR_VM_PUBLIC_IP:/home/ubuntu/techyguide
```

## 6. Run the backend with Docker

On the VM:

```bash
cd /home/ubuntu/techyguide
cp aws/backend.env.sample aws/backend.env
nano aws/backend.env
```

Set:

```env
PORT=3000
ARDUINO_DATA_DIR=/arduino-data
ARDUINO_LIBRARIES_DIR=/arduino-libraries
CORS_ORIGIN=https://your-netlify-or-cloudflare-domain.com
```

Start the container:

```bash
docker compose -f aws/docker-compose.yml up -d --build
```

## 7. Verify

```bash
curl http://YOUR_VM_PUBLIC_IP:3000/health
```

You should see:

```json
{ "ok": true, "service": "techyguide-compile-api" }
```

## 8. Use a clean HTTPS domain (optional but recommended)

Free VM IPs can change. For a stable demo URL:

1. Get a free subdomain from [nip.io](https://nip.io) or [sslip.io](https://sslip.io):
   - Example: `https://techyguide-YOUR_IP.nip.io`
2. Or use Cloudflare Tunnel for HTTPS + stable domain:
   ```bash
   docker run --net=host cloudflare/cloudflared:latest tunnel --no-autoupdate run --token YOUR_TOKEN
   ```

## 9. Update frontend environment variable

Build the frontend with the backend URL:

```bash
set BACKEND_API_URL=http://YOUR_VM_PUBLIC_IP:3000
npm run build:prod
```

Then deploy `dist/` to Netlify or Cloudflare Pages.

## Keeping the VM alive

- Monitor disk space: `arduino-cli` + ESP32 core + libraries can use several GB.
- The free VM may stop if your always-free resources are exceeded, but it will not be deleted.
- Back up your `arduino-data` volume if you install many libraries.
