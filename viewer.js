// Viewer page: one artwork, its details, deep zoom (OpenSeadragon) and size comparison.
(function () {
  const h = site.h;
  const OSD_ICONS = 'https://cdn.jsdelivr.net/npm/openseadragon@6.1.1/build/openseadragon/images/';
  const FIGURE_HEIGHT_CM = 164; // reference person in the size comparison

  const $ = id => document.getElementById(id);

  const requested = new URLSearchParams(location.search).get('id');
  const work = requested ? site.findWork(requested) : site.works.find(w => w.featured);

  if (!work) {
    $('stage').hidden = true;
    $('notFound').hidden = false;
    document.title = 'Maria da Luz';
    return;
  }

  const artworkContainer = $('artworkContainer');
  const artworkImg = $('artworkImg');
  const barTitle = $('barTitle');
  const barSize = $('barSize');
  const capTitle = $('capTitle');
  const capSize = $('capSize');
  const workDetails = $('workDetails');
  const workDescription = $('workDescription');
  const openZoom = $('openZoom');
  const openScale = $('openScale');
  const zoomDialog = $('zoomDialog');
  const zoomView = $('zoomView');
  const zoomFullscreen = $('zoomFullscreen');
  const sizeDialog = $('sizeDialog');
  const vfsWrapper = $('vfsWrapper');
  const vfsPainting = $('vfsPainting');
  const vfsPerson = $('vfsPerson');
  const vfsPaintImg = $('vfsPaintImg');
  const vfsPaintDim = $('vfsPaintDim');
  const vfsPersonDim = $('vfsPersonDim');
  const vfsPaintLabel = $('vfsPaintLabel');
  const vfsPersonLabel = $('vfsPersonLabel');

  function render() {
    const title = site.pick(work.title);
    const size = site.size(work);

    document.title = `${title} — Maria da Luz`;
    barTitle.textContent = title;
    capTitle.textContent = title;
    barSize.textContent = size;
    barSize.hidden = !size;
    capSize.textContent = size ? size + ' · ' : '';
    artworkImg.alt = site.pick(work.alt);

    const rows = site.details(work).flatMap(({ label, value }) => [h('dt', {}, label), h('dd', {}, value)]);
    workDetails.replaceChildren(...rows);
    workDetails.hidden = !rows.length;

    workDescription.textContent = site.pick(work.description);
    workDescription.hidden = !workDescription.textContent;

    vfsPaintLabel.textContent = work.heightCm ? site.cm(work.heightCm) : '';
    vfsPersonLabel.textContent = site.cm(FIGURE_HEIGHT_CM);
    if (sizeDialog.open) layoutSize();
  }

  // ── Stage ──
  artworkImg.addEventListener('load', () => artworkContainer.classList.add('is-loaded'));
  artworkImg.addEventListener('error', () => console.error(`[viewer] missing image: ${site.photoUrl(work.id)}`));
  artworkImg.src = site.photoUrl(work.id);
  vfsPaintImg.src = site.photoUrl(work.id);

  if (!work.heightCm) openScale.hidden = true;

  function setVh() {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
  }
  setVh();
  window.addEventListener('resize', setVh);

  // ── Deep zoom ──
  // Tiles are read from images/hq/ (sizes in images/hq/index.js). Works without
  // tiles show the normal-size copy instead.
  let osd = null;

  function tileSource() {
    const tiles = (window.TILE_SIZES || {})[work.id];
    if (!tiles) return { type: 'image', url: site.photoUrl(work.id) };
    return {
      width: tiles.width,
      height: tiles.height,
      tileSize: tiles.tileSize,
      tileOverlap: tiles.overlap,
      getTileUrl: (level, x, y) => `images/hq/${encodeURIComponent(work.id)}_files/${level}/${x}_${y}.jpg`
    };
  }

  // Returns false if the zoom library is not available (for example, offline).
  function ensureZoom() {
    if (osd) return true;
    if (!window.OpenSeadragon) {
      console.error('[viewer] OpenSeadragon did not load; deep zoom is unavailable.');
      return false;
    }
    osd = OpenSeadragon({
      element: zoomView,
      prefixUrl: OSD_ICONS,
      tileSources: tileSource(),
      showNavigator: false,
      showFullPageControl: false,
      showRotationControl: false,
      maxZoomPixelRatio: 2.5,
      visibilityRatio: 1,
      constrainDuringPan: true
    });
    return true;
  }

  // The dialog must be open before the viewer is created, so OpenSeadragon can measure it.
  openZoom.addEventListener('click', () => {
    zoomDialog.showModal();
    if (!ensureZoom()) zoomDialog.close();
  });

  $('zoomClose').addEventListener('click', () => zoomDialog.close());

  zoomFullscreen.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else zoomDialog.requestFullscreen?.();
  });

  document.addEventListener('fullscreenchange', () => {
    const full = !!document.fullscreenElement;
    zoomFullscreen.querySelector('use').setAttribute('href', full ? '#icon-size-down' : '#icon-size-up');
  });

  zoomDialog.addEventListener('close', () => {
    if (document.fullscreenElement) document.exitFullscreen();
  });

  // ── Size comparison ──
  // Artwork taller than the figure: the figure stands on the artwork's baseline.
  // Otherwise both are aligned at the top.
  function applyScene(sceneH) {
    const big = work.heightCm > FIGURE_HEIGHT_CM;
    const paintingH = big ? sceneH : sceneH * work.heightCm / FIGURE_HEIGHT_CM;
    const personH = big ? sceneH * FIGURE_HEIGHT_CM / work.heightCm : sceneH;

    vfsWrapper.style.alignItems = big ? 'flex-end' : 'flex-start';
    vfsPainting.style.height = paintingH + 'px';
    vfsPerson.style.height = personH + 'px';
  }

  function layoutSize() {
    if (!work.heightCm) return;
    const availW = vfsWrapper.clientWidth;
    const availH = vfsWrapper.clientHeight;
    if (!availW || !availH) return;

    applyScene(availH);

    const paintingW = vfsPainting.offsetWidth;
    const personW = vfsPerson.offsetWidth;
    const gap = parseFloat(getComputedStyle(vfsWrapper).columnGap) || 0;
    const fixedW = vfsPaintDim.offsetWidth + gap + vfsPersonDim.offsetWidth;
    const widthFactor = (paintingW + personW) / availH;

    applyScene(Math.max(160, Math.min(availH, (availW - fixedW) / widthFactor)));
  }

  openScale.addEventListener('click', () => {
    sizeDialog.showModal();
    requestAnimationFrame(layoutSize);
  });

  $('sizeClose').addEventListener('click', () => sizeDialog.close());
  window.addEventListener('resize', () => { if (sizeDialog.open) layoutSize(); });

  site.onLangChange(render);
  render();
})();
