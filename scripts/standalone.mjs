import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { Script } from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
const scriptTag = html.match(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/);
const styleTag = html.match(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (!scriptTag || !styleTag) throw new Error('Expected one bundled script and stylesheet.');
const base = scriptTag[1].slice(0, scriptTag[1].lastIndexOf('/assets/') + 1);

function localAsset(path) {
  if (/^(?:[a-z]+:)?\/\//i.test(path)) throw new Error('Standalone assets must be local.');
  const absolute = resolve(dist, (path.startsWith(base) ? path.slice(base.length) : path).replace(/^\//, ''));
  if (!absolute.startsWith(dist + sep)) throw new Error('Asset path is outside dist.');
  return absolute;
}

const javascript = await readFile(localAsset(scriptTag[1]), 'utf8');
// Fail the build instead of silently producing a file that still needs ES-module imports.
new Script(javascript);
const chunks = (await readdir(resolve(dist, 'assets'))).filter(file => file.endsWith('.js'));
if (chunks.length !== 1) throw new Error('Standalone build requires a single bundled script.');
let css = await readFile(localAsset(styleTag[1]), 'utf8');
const embedded = new Map();
for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
  const path = match[1].trim().replace(/^['"]|['"]$/g, '');
  if (path.startsWith('data:') || embedded.has(path)) continue;
  if (!path.endsWith('.woff2')) throw new Error(`Unsupported standalone CSS asset: ${path}`);
  embedded.set(path, `data:font/woff2;base64,${(await readFile(localAsset(path))).toString('base64')}`);
}
css = css.replace(/url\(([^)]+)\)/g, (match, raw) => {
  const path = raw.trim().replace(/^['"]|['"]$/g, '');
  return embedded.has(path) ? `url("${embedded.get(path)}")` : match;
});
const favicon = (await readFile(resolve(dist, 'favicon.svg'))).toString('base64');
const bodyScript = `window.__PORTFOLIO_STANDALONE__=true;\n${javascript}`.replace(/<\/script/gi, '<\\/script');
// This variant has no external modules, font requests or dependency on a running server.
let standalone = html
  .replace(/<script id="portfolio-bootstrap">[\s\S]*?<\/script>\s*/, '')
  .replace(scriptTag[0], '')
  .replace(styleTag[0], `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`)
  .replace(`href="${base}favicon.svg"`, `href="data:image/svg+xml;base64,${favicon}"`)
  .replace('</body>', `<script>${bodyScript}</script>\n</body>`);
if (/<script\b[^>]*\bsrc=/.test(standalone) || /<link\b[^>]*rel="stylesheet"/.test(standalone)) throw new Error('Standalone HTML still requires external code.');
await writeFile(resolve(dist, 'portfolio.html'), standalone);
await writeFile(resolve(root, 'portfolio.html'), standalone);
console.log(`Standalone HTML ready: portfolio.html (${(Buffer.byteLength(standalone) / 1024 / 1024).toFixed(2)} MB; ${embedded.size} local font subsets embedded)`);
