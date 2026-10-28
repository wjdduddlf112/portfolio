import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '..', 'dist');
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
const entry = html.match(/<script\b[^>]*\bsrc="([^\"]+)"/);
if (!entry || !entry[1].includes('/assets/')) throw new Error('Cannot determine the deployment base.');
const base = entry[1].slice(0, entry[1].lastIndexOf('/assets/') + 1);
if (!/^\/[a-zA-Z0-9/_-]*\/$/.test(base) && base !== '/') throw new Error('Unsupported deployment base.');

// Pages serves this document with HTTP 404. Redirect to the real index, then
// restore the original route, query and fragment before BrowserRouter mounts.
await writeFile(resolve(dist, '404.html'), `<!doctype html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>포트폴리오로 이동</title>
<script>
  const base = ${JSON.stringify(base)};
  if (location.pathname.startsWith(base)) {
    const route = '/' + location.pathname.slice(base.length) + location.search + location.hash;
    location.replace(base + '?__portfolio_path=' + encodeURIComponent(route));
  }
</script></head><body><p>포트폴리오를 여는 중입니다. <a href="${base}">홈으로 이동</a></p></body></html>`);
await writeFile(resolve(dist, '.nojekyll'), '');
console.log(`GitHub Pages fallback ready: ${base}404.html`);
