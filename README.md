# Alchemist's Book Coven

Website for the Alchemist's Book Coven podcast, hosted by Lili Duquette.

- Live site (Netlify): https://alchemists-book-coven.netlify.app
- The original single-file site is on the `main` branch and still served by GitHub Pages.

## Files

- `index.html`: the page. It has no `<html>`/`<head>` wrapper because it doubles as the Claude artifact source.
- `build.mjs`: wraps `index.html` into a standalone site in `dist/`, moves the script to `app.js`, and stamps each cover URL with a content hash so browsers never show a stale image.
- `covers/`: book cover images, referenced from `index.html`.
- `netlify.toml`: security headers and publish settings.
- `favicon.svg`: browser tab icon.

## Deploy

```bash
node build.mjs
npx netlify-cli deploy --prod --dir dist
```
