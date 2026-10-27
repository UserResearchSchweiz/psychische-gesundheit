import http from 'node:http';
import { watch } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const project = fileURLToPath(new URL('../', import.meta.url));
const root = resolve(project, process.argv[2] || '.');
const port = Number(process.env.PORT || 5173);
const types = { '.ttf': 'font/ttf', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const liveReload = !process.argv[2];
const clients = new Set();
const reloadScript = `<script>
(() => {
  const events = new EventSource('/__reload');
  events.addEventListener('reload', () => location.reload());
  window.addEventListener('pagehide', () => events.close());
})();
</script>`;
let reloadTimer;
if (liveReload) {
  for (const directory of ['src', 'public']) {
    watch(resolve(root, directory), { recursive: true }, scheduleReload);
  }
  watch(resolve(root, 'index.html'), scheduleReload);
}
function scheduleReload() {
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    for (const client of clients) client.write('event: reload\ndata: changed\n\n');
  }, 150);
}
const heartbeat = setInterval(() => {
  for (const client of clients) client.write(': keepalive\n\n');
}, 15000);
heartbeat.unref();
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (liveReload && pathname === '/__reload') {
      response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      response.write(': connected\n\n');
      clients.add(response);
      response.on('close', () => clients.delete(response));
      return;
    }
    const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    const relative = file.slice(root.length + 1);
    if (!file.startsWith(root + sep) || relative.split(sep).some(part => part.startsWith('.')) || !types[extname(file)]) {
      response.writeHead(404).end('Nicht gefunden');
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)], 'Cache-Control': 'no-store' });
    response.end(liveReload && extname(file) === '.html'
      ? body.toString().replace('</body>', `${reloadScript}</body>`)
      : body);
  } catch {
    response.writeHead(404).end('Nicht gefunden');
  }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Prototyp: http://localhost:${port}`));
