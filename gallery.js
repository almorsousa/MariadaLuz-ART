// Gallery page: header, bio slideshow, zoomable paintings, archive grid, lightbox.
(function () {
  const h = site.h;

  const featured = site.works.filter(w => w.featured);
  const archive = site.works.filter(w => !w.featured);
  const photos = site.works.filter(w => w.type === 'photo');

  const featuredGrid = document.getElementById('featuredGrid');
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbTitle = document.getElementById('lbTitle');
  const lbMeta = document.getElementById('lbMeta');

  const ZOOM_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>';

  // Image for a work. A missing file removes its tile instead of showing a broken icon.
  function photo(work) {
    const img = h('img', { src: site.photoUrl(work.id), alt: site.pick(work.alt), loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', () => {
      console.warn(`[gallery] missing image: ${site.photoUrl(work.id)}`);
      img.closest('[data-work]')?.remove();
    });
    return img;
  }

  function renderFeatured() {
    featuredGrid.replaceChildren(...featured.map(work => {
      const zoom = h('span', { class: 'featured-zoom' });
      zoom.innerHTML = ZOOM_ICON +
        '<span data-lang="pt">Ampliar</span><span data-lang="en">Zoom</span>';
      return h('a', { class: 'featured-item', href: `viewer.html?id=${encodeURIComponent(work.id)}`, 'data-work': work.id },
        h('span', { class: 'featured-frame' }, photo(work), zoom),
        h('span', { class: 'featured-caption' },
          h('span', { class: 'fc-title' }, site.pick(work.title)),
          h('span', { class: 'fc-meta' },
            h('span', { 'data-lang': 'pt' }, 'Alta qualidade'),
            h('span', { 'data-lang': 'en' }, 'High quality'))));
    }));
  }

  function renderArchive() {
    galleryGrid.replaceChildren(...archive.map(work =>
      h('button', { type: 'button', class: 'gallery-item', 'data-work': work.id, 'aria-label': site.pick(work.title) }, photo(work))
    ));
  }

  // Bio slideshow: every photo-type work, one at a time.
  const slideshow = document.getElementById('slideshow');
  let slides = [];
  let current = 0;

  function buildSlideshow() {
    const dots = h('div', { class: 'slide-dots' });
    slides = photos.map((work, i) => {
      const img = h('img', { src: site.photoUrl(work.id), loading: 'lazy' });
      const dot = h('button', { type: 'button', class: 'slide-dot' });
      const slide = { work, img, dot };
      img.addEventListener('error', () => dropSlide(slide));
      dot.addEventListener('click', () => show(slides.indexOf(slide)));
      dots.append(dot);
      return slide;
    });
    slideshow.replaceChildren(...slides.map(s => s.img), dots);
    refreshSlides();
    show(0);
  }

  function refreshSlides() {
    slides.forEach((s, i) => {
      s.img.alt = site.pick(s.work.alt);
      s.dot.setAttribute('aria-label', site.t(`Foto ${i + 1}`, `Photo ${i + 1}`));
    });
  }

  function dropSlide(slide) {
    console.warn(`[gallery] missing photo: ${site.photoUrl(slide.work.id)}`);
    slides = slides.filter(s => s !== slide);
    slide.img.remove();
    slide.dot.remove();
    show(current);
  }

  function show(i) {
    if (!slides.length) return;
    current = (i + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.img.classList.toggle('active', k === current);
      s.dot.classList.toggle('active', k === current);
    });
  }

  // Lightbox (archive works)
  let shown = [];
  let index = 0;

  function openLightbox(id) {
    shown = [...galleryGrid.querySelectorAll('[data-work]')].map(el => el.dataset.work);
    if (!shown.length) return;
    index = Math.max(0, shown.indexOf(id));
    showLightboxItem();
    lightbox.showModal();
  }

  function showLightboxItem() {
    const work = site.findWork(shown[index]);
    if (!work) return;
    lbImg.src = site.photoUrl(work.id);
    lbImg.alt = site.pick(work.alt);
    lbTitle.textContent = site.pick(work.title);
    lbMeta.textContent = [work.year, site.pick(work.medium), site.size(work)].filter(Boolean).join(' · ');
    lbMeta.hidden = !lbMeta.textContent;
  }

  function stepLightbox(delta) {
    if (!shown.length) return;
    index = (index + delta + shown.length) % shown.length;
    showLightboxItem();
  }

  galleryGrid.addEventListener('click', e => {
    const item = e.target.closest('[data-work]');
    if (item) openLightbox(item.dataset.work);
  });

  document.getElementById('lbPrev').addEventListener('click', () => stepLightbox(-1));
  document.getElementById('lbNext').addEventListener('click', () => stepLightbox(1));
  document.getElementById('lbClose').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
  site.bindBackdrop(lightbox);

  // Sticky header: appears once the hero has scrolled away
  const header = document.getElementById('siteHeader');
  const hero = document.querySelector('.hero');
  function updateHeader() {
    header.classList.toggle('visible', hero.getBoundingClientRect().bottom < 0);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  site.onLangChange(() => {
    renderFeatured();
    renderArchive();
    refreshSlides();
    if (lightbox.open) showLightboxItem();
  });

  renderFeatured();
  renderArchive();
  buildSlideshow();
  setInterval(() => show(current + 1), 7000);
})();
