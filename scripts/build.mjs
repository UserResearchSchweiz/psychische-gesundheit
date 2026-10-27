import { cp, mkdir, rm } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL('index.html', root), new URL('index.html', output));
await cp(new URL('src/', root), new URL('src/', output), { recursive: true });
await cp(new URL('public/', root), new URL('public/', output), { recursive: true });
console.log('Statische Seite unter dist/ erstellt.');
