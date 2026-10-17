// Serves dist/ on http://localhost:5210 with the same headers netlify.toml sends,
// so the security policy can be checked locally before deploying.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, normalize, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const headers = {};
for (const m of readFileSync(join(here, 'netlify.toml'), 'utf8').matchAll(/^\s+([A-Za-z-]+) = "(.*)"$/gm)) headers[m[1]] = m[2];

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
const root = join(here, 'dist');

createServer((req, res) => {
  let path = normalize(join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
  if (!path.startsWith(root)) path = root;
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  const found = existsSync(path);
  res.writeHead(found ? 200 : 404, { ...headers, 'Content-Type': types[extname(path)] || 'text/plain' });
  res.end(found ? readFileSync(path) : 'Not found');
}).listen(5210, () => console.log('Previewing dist/ at http://localhost:5210'));
