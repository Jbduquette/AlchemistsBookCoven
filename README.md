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
- `package.json`: the `build`, `preview` and `deploy` commands, and the pinned netlify-cli.
- `preview.mjs`: local server used by `npm run preview`.

## Deploy

After cloning, run `npm install` once. Then:

```bash
npm run deploy
```

That builds `dist/` and deploys it with the project's own netlify-cli, pinned to 27.10.0 in `package.json` and `package-lock.json`. The version is pinned because the CLI runs with your Netlify login, so a new release is never pulled in unreviewed, and a global netlify-cli on the machine is never used. To upgrade, run `npm install --save-dev --save-exact netlify-cli@<version>` with a release that is at least two weeks old.

`npm run preview` serves `dist/` at http://localhost:5210 with the same headers as Netlify.
