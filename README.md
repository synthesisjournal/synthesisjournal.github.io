# Synthesis: Nature, History, and Revolution

This is a tiny, no-build website meant for GitHub Pages.

## Files

- `index.html` — single-page site + article viewer (uses `?id=...`)
- `app.js` — edit `EDITOR_EMAIL` and the `ARTICLES` list to publish
- `styles.css` — minimal styling
- `.nojekyll` — prevents GitHub Pages from running Jekyll

## Publishing (fast path)

1. Create a GitHub Pages repository (see GitHub Docs “Quickstart for GitHub Pages”).
2. Upload these files to the repository root.
3. In repo **Settings → Pages**, set:
   - **Build and deployment**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`

After it deploys, your site will be at `https://YOUR-USERNAME.github.io/` (if you used the `username.github.io` repository name).

## Updating content

Edit `app.js` and add a new article object to `ARTICLES`. Commit the change. GitHub Pages redeploys automatically.
