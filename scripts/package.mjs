import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { zipSync } from 'fflate';

const root = resolve(import.meta.dirname, '..');
const directory = join(root, 'dist');
const files = {};
async function collect(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) await collect(path);
    else files[relative(directory, path).replaceAll('\\', '/')] = new Uint8Array(await readFile(path));
  }
}
await collect(directory);
if (!files['index.html'] || !files['_redirects']) throw new Error('먼저 npm run build를 실행하세요.');
const zip = zipSync(files, { level: 6 });
await writeFile(join(root, 'dist.zip'), zip);
console.log(`dist.zip 생성 완료: ${Object.keys(files).length}개 파일, ${(zip.byteLength / 1024 / 1024).toFixed(2)} MB`);
