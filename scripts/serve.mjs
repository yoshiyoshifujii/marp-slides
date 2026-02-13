#!/usr/bin/env node
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 8000);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
};

const server = http.createServer(async (req, res) => {
  try {
    const reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const safePath = path.normalize(reqPath).replace(/^(\.\.(\/|\\|$))+/, '');
    let target = path.join(root, safePath);

    let info = await stat(target).catch(() => null);
    if (info?.isDirectory()) {
      target = path.join(target, 'index.html');
      info = await stat(target).catch(() => null);
    }

    if (!info?.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
    });
    createReadStream(target).pipe(res);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
