// Builds dist/ for Netlify from index.html (the artifact source, which has no <html>/<head> wrapper).
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';

const src = readFileSync('index.html', 'utf8');
const headEnd = src.indexOf('</style>') + '</style>'.length;
const head = src.slice(0, headEnd);
let body = src.slice(headEnd);

const scriptMatch = body.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('inline script not found');
body = body.replace(scriptMatch[0], '<script src="app.js"></script>');

// Stamp each cover URL with a hash of the file, so a browser that cached an older
// response (or a 404 from before the file existed) fetches the current image.
body = body.replace(/src="(covers\/[^"?]+)"/g, (match, path) => {
  if (!existsSync(path)) return match;
  const hash = createHash('md5').update(readFileSync(path)).digest('hex').slice(0, 8);
  return `src="${path}?v=${hash}"`;
});

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
writeFileSync('dist/app.js', scriptMatch[1].trim() + '\n');
writeFileSync('dist/index.html', `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
${head.trim()}
</head>
<body>
${body.trim()}
</body>
</html>
`);
cpSync('favicon.svg', 'dist/favicon.svg');
if (existsSync('covers')) cpSync('covers', 'dist/covers', { recursive: true });
console.log('Built dist/');
