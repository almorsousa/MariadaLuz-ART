# Maria da Luz — Gallery

Website created to showcase the art of the late artist Maria da Luz.
[mariadaluz.art](https://mariadaluz.art)

A small static gallery: plain HTML, CSS and JavaScript, no build step. Open `index.html` in a browser to run it.

## Structure

| Path | Purpose |
|---|---|
| `works.js` | The list of artworks. Edit this to add or change works. |
| `index.html` | Gallery page |
| `viewer.html` | Single-artwork viewer (deep zoom, size comparison) |
| `site.css` | Styles for both pages |
| `site.js`, `gallery.js`, `viewer.js` | Behaviour |
| `export-images.sh` | Makes the gallery copies and deep-zoom tiles from the originals |
| `images/hq/` | Featured works: high-quality originals, deep-zoom tiles and `index.js` |
| `images/normal/` | Every other work: full-size originals, plus the web-sized copy of every work shown in the gallery |
| `images/silhouette_BW.png` | Site image that is not artwork (the size comparison silhouette) |

## Adding a work

1. Copy the original image into `images/normal/` (or into `images/hq/` for a featured work).
2. Run `./export-images.sh <id>` (requires ImageMagick and libvips).
3. Add an entry to `works.js`. Empty fields are hidden on the site, and missing ones are listed in the browser console.

To make a work zoomable in the gallery, set `featured: true` in `works.js` and add its id to `TILED` in `export-images.sh`.

## Reusing this project

Copy the folder, replace the images, and edit `works.js`. Change the text and contact details in `index.html`.

## License

Dual license is used.
- **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)** for the artwork in `images/`.
- **MIT** for the code (see `LICENSE`).
