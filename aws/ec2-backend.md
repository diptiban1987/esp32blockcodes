# Host the TechyGuide compile/upload backend on AWS

This guide deploys the Arduino compile/upload API as a Docker container on an EC2 instance. It requires `arduino-cli` and the ESP32 core to be installed.

## Option A: Docker on EC2 (recommended)

### 1. Launch an EC2 instance

- AMI: Ubuntu 22.04 LTS
- Instance type: `t3.medium` or larger (compiling ESP32 firmware needs CPU and memory)
- Storage: at least 20 GB
- Security group: open port `3000` (or place behind an ALB)

### 2. Install Docker

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker ubuntu
# Log out and back in
```

### 3. Copy project files

From your local machine:

```bash
cd TECHYGUIDE_APP_DEVELOPMENT
scp -r . ubuntu@YOUR_EC2_IP:/home/ubuntu/techyguide
```

On the server:

```bash
cd /home/ubuntu/techyguide
```

### 4. Run the backend

```bash
cp aws/backend.env.sample aws/backend.env
nano aws/backend.env   # set CORS_ORIGIN to your CloudFront domain

docker compose -f aws/docker-compose.yml up -d --build
```

View logs:

```bash
docker compose -f aws/docker-compose.yml logs -f
```

Test:

```bash
curl http://YOUR_EC2_IP:3000/health
```

## Option B: Elastic Beanstalk

1. Zip the project with `aws/server.js` as the entry point.
2. Create a new Elastic Beanstalk web server environment.
3. Upload the zip.
4. Set environment variables (`PORT`, `ARDUINO_DATA_DIR`, `ARDUINO_LIBRARIES_DIR`, `CORS_ORIGIN`).
5. Use a platform that supports Docker or Node.js.

> Note: The current `server/compileServer.js` expects `arduino-cli` in PATH. If you use a Node.js Elastic Beanstalk platform, you must install `arduino-cli` and the ESP32 core in a platform hook or `.ebextensions` script.

## CloudFront setup

After the backend is running:

1. Open your CloudFront distribution.
2. Add an origin: `http://YOUR_EC2_IP:3000` (or your ALB).
3. Add a cache behavior:
   - Path pattern: `/api/*`
   - Origin: your backend origin
   - Allowed HTTP methods: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
   - Cache policy: disable caching or use a managed cache policy that forwards headers/methods.

## CORS

Set `CORS_ORIGIN` in `aws/backend.env` to your CloudFront domain so only your frontend can call the API:

```env
CORS_ORIGIN=https://your-cloudfront-domain.cloudfront.net
```

## Security notes

- Do not expose the EC2 instance directly to the internet unless necessary. Use an ALB or CloudFront.
- Keep the EC2 security group locked down; allow port 3000 only from the ALB/CloudFront security group.
- The compile endpoint receives and compiles C++ code. Run it in an isolated environment and keep `arduino-cli` updated.
