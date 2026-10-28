import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

// Local-only, dependency-free preview of the existing production build.
const script = fileURLToPath(import.meta.url);
const root = resolve(dirname(script), '..', 'dist');
const host = '127.0.0.1';
const port = 4173;
const origin = `http://${host}:${port}`;
const index = await readFile(resolve(root, 'index.html'), 'utf8');
const entry = index.match(/<script\b[^>]*\bsrc="([^\"]+)"/);
const base = entry ? entry[1].slice(0, entry[1].lastIndexOf('/assets/') + 1) : '/';
const url = origin + base;
const appId = 'youngil-personal-portfolio-preview';
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif' };

async function isRunning() {
  try {
    const response = await fetch(`${origin}/__portfolio_health`, { signal: AbortSignal.timeout(1000) });
    return response.ok && (await response.json()).app === appId;
  } catch { return false; }
}

if (process.argv.includes('--serve')) {
  const server = http.createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    try {
      const pathname = decodeURIComponent(new URL(request.url, url).pathname);
      if (pathname === '/__portfolio_health') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ app: appId }));
        return;
      }
      if (base !== '/' && !pathname.startsWith(base)) {
        const requested = new URL(request.url, origin);
        response.writeHead(302, { Location: base.replace(/\/$/, '') + requested.pathname + requested.search });
        response.end(); return;
      }
      const relative = '/' + pathname.slice(base.length);
      let file = resolve(root, `.${relative}`);
      if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
      if (relative === '/' || !extname(relative)) file = resolve(root, 'index.html');
      if (!(await stat(file)).isFile()) throw new Error('Not a file');
      const data = await readFile(file);
      response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream', 'Content-Length': data.length, 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end('File not found. Run npm run build if dist is missing.'); }
  });
  server.on('error', error => { console.error(error.message); process.exit(1); });
  server.listen(port, host, () => console.log(`Portfolio preview: ${url}`));
} else {
  await stat(resolve(root, 'index.html'));
  if (!(await isRunning())) {
    const child = spawn(process.execPath, [script, '--serve'], { cwd: dirname(script), detached: true, windowsHide: true, stdio: 'ignore' });
    child.unref();
    for (let attempt = 0; attempt < 30 && !(await isRunning()); attempt++) await new Promise(resolve => setTimeout(resolve, 200));
    if (!(await isRunning())) throw new Error(`Cannot start the portfolio preview. Port ${port} may be in use.`);
  }
  console.log(`Portfolio ready: ${url}`);
  if (process.argv.includes('--open')) {
    const browser = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', `Start-Process '${url}'`], { windowsHide: true, stdio: 'ignore' });
    browser.on('error', error => console.error(`Open ${url} in your browser. ${error.message}`));
  }
}
