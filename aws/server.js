// aws/server.js — Standalone Express backend for the compile/upload API.
// This wraps server/compileServer.js so it can run on AWS EC2 / ECS / EKS.
//
// Environment variables:
//   PORT                — HTTP port (default 3000)
//   ARDUINO_DATA_DIR    — arduino-cli data directory
//   ARDUINO_LIBRARIES_DIR — installed libraries directory
//   CORS_ORIGIN         — allowed frontend origin(s), e.g. https://app.example.com
//
// Run locally:  npm run server
// Run Docker:   see aws/Dockerfile.backend

const express = require("express");
const cors = require("cors");
const compileServer = require("../server/compileServer");

const app = express();
const PORT = process.env.PORT || 3000;

// SERVER_BASE_URL — the public HTTPS URL of this Lightsail server.
// REQUIRED for Cloud OTA: ESP32 devices need an absolute URL to download firmware.
// Set this in docker-compose.yml environment or as a system env var.
// Example: SERVER_BASE_URL=https://block.techyguide.in
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "";
if (!SERVER_BASE_URL) {
  console.warn("[server] WARNING: SERVER_BASE_URL is not set.");
  console.warn("[server] Cloud OTA firmware download URLs will be RELATIVE, which the ESP32 cannot use remotely.");
  console.warn("[server] Set SERVER_BASE_URL=https://block.techyguide.in in your Docker environment.");
} else {
  console.log(`[server] SERVER_BASE_URL: ${SERVER_BASE_URL}`);
}

if (process.env.CORS_ORIGIN) {
  app.use(cors({ origin: process.env.CORS_ORIGIN.split(","), credentials: true }));
} else {
  app.use(cors());
}

app.use(express.json({ limit: "10mb" }));

// Health check for load balancers / Elastic Beanstalk
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "techyguide-compile-api" });
});

// Compile/upload router from server/compileServer.js
app.use("/api", compileServer);

app.listen(PORT, () => {
  console.log(`TechyGuide compile server listening on port ${PORT}`);
  console.log(`Arduino data dir: ${process.env.ARDUINO_DATA_DIR || "default"}`);
  console.log(`Arduino libraries dir: ${process.env.ARDUINO_LIBRARIES_DIR || "default"}`);
});
