# Agent Context

## Project Overview
- Static gallery website showcasing the art of the late artist Maria da Luz.
- Live site: https://mariadaluz.art (custom domain set in `CNAME`).
- Repository: https://github.com/almorsousa/MariadaLuz-ART
- Goal: a simple, readable gallery that others can copy and adapt for their own collections.

## Principles
- Keep the codebase small, streamlined, and easy to read. Prefer one clear way to do a thing.
- Everything a gallery owner edits lives in one data file (`works.js`). Pages contain markup, not data.
- Robustness over cleverness: bad or missing data must be skipped or reported, never crash the page.

## Structure
- `index.html`: gallery page (markup only).
- `viewer.html`: single-artwork viewer with deep zoom and size comparison (markup only).
- `site.css`: all styles, shared by both pages.
- `works.js`: the list of works (titles, descriptions, sizes, placeholders). The only file to edit when adding or changing works.
- `site.js`: language switch, data checks, DOM helper, and shared formatting.
- `gallery.js`: gallery page behaviour (slideshow, grids, lightbox, header).
- `viewer.js`: viewer behaviour (details, OpenSeadragon deep zoom, size comparison).
- `export-images.sh`: creates the normal copies and deep-zoom tiles from the originals.
- `images/hq/`: high-quality folder for the featured works only. Holds their JPEG originals, the deep-zoom tiles, and `index.js` (artwork content under CC BY-NC-ND 4.0).
- `images/normal/`: every other work. Holds their full-size PNG originals, plus the web-sized JPEG copy of every work (what the gallery shows).
- `images/silhouette_BW.png`: site asset used by the size comparison. Not artwork, not an original.
- `CNAME`: custom domain for GitHub Pages. Do not change unless the domain changes.
- `LICENSE`: MIT license for code.
- `README.md`: project summary, how to add a work, and license notes.

## Conventions
- Plain HTML, CSS, and JavaScript. No framework, no package manager, no bundler, no build step.
- The one external library is OpenSeadragon, loaded from a pinned jsDelivr URL in `viewer.html`. Pin the version in both the script tag and the `OSD_ICONS` constant in `viewer.js`.
- Scripts are plain browser scripts (no ES modules), so the site works when `index.html` or `viewer.html` is opened directly from disk.
- Use `data-lang="pt"` / `data-lang="en"` on static text. Use `site.pick()` or `site.t()` for text built in JavaScript.
- Build DOM with `site.h()` and `textContent`. Do not build markup from strings that contain work data.
- Use native `<dialog>` for popups.
- Keep the look consistent between `index.html` and `viewer.html`; shared styles belong in `site.css`.
- Do not add a new file or dependency unless it clearly removes more code than it adds.

## Images
- Never modify, re-encode, rename, or delete the originals (`images/hq/*.jpg` and `images/normal/*.png`) without explicit user approval. `images/silhouette_BW.png` is a site asset, not an original.
- Web copies in `images/normal/*.jpg` and tiles in `images/hq/` are generated, never edited by hand. Regenerate them with `./export-images.sh [id ...]` after changing an original.
- A work with only a JPEG in `images/normal/` (no original) is a web copy that is kept as it is. The export script does not regenerate it.
- `export-images.sh` has a `TILED` list. Add an id there when a work is featured in the zoomable row, then run the script for that id.
- Do not publish photos that contain GPS metadata. The export script strips metadata from web copies.

## Adding a work (checklist)
1. Put the original image in `images/normal/` (for example `images/normal/quadro_14.png`). Featured works go in `images/hq/` as JPEG instead.
2. Run `./export-images.sh quadro_11`.
3. Add an entry to `works.js`. Fill `title`, `alt`, and any known fields. Leave the rest as `''`.
4. Open the page in a browser and check the console for `[works]` messages listing missing fields.

## Licensing
- Code: MIT (see `LICENSE`).
- Artwork in `images/`: CC BY-NC-ND 4.0. Do not repurpose or redistribute artwork.

## Git
- Default branch is the one cloned from GitHub. Pull before starting work.
- Keep commits small and descriptive.
- Do not force-push.

## Testing
- Open `index.html` and `viewer.html` directly in a browser (no server).
- Check: images load, PT/EN switch works on both pages, each featured work opens in the viewer, deep zoom loads, size comparison opens and closes, the lightbox navigates with arrows and Escape, and `viewer.html?id=unknown` shows the not-found message.
- Check the browser console for errors. `[works]` info messages are expected while fields are still empty.

---
GitHub project: https://github.com/almorsousa/MariadaLuz-ART
