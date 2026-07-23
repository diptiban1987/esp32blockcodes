const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8082;
const dist = path.join(__dirname, 'dist');

http.createServer((req, res) => {
  if (req.url === '/') req.url = '/index.html';
  const filePath = path.join(dist, req.url);
  try {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    const mime = {
      '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
      '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
      '.json': 'application/json', '.txt': 'text/plain',
    };
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(port, () => console.log(Server on http://127.0.0.1:));
