// Shared by every page: language switch, DOM helper, and checks on WORKS.
(function () {
  const LANGS = ['pt', 'en'];
  const STORAGE_KEY = 'mdl_preferred_lang';
  const TYPES = ['painting', 'drawing', 'sculpture', 'photo'];
  const OPTIONAL = ['year', 'medium', 'widthCm', 'heightCm', 'signature', 'collection', 'description'];
  const LABELS = {
    year: { pt: 'Ano', en: 'Year' },
    medium: { pt: 'Técnica', en: 'Medium' },
    size: { pt: 'Dimensões', en: 'Dimensions' },
    signature: { pt: 'Assinatura', en: 'Signature' },
    collection: { pt: 'Coleção', en: 'Collection' }
  };

  let lang = 'pt';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) lang = saved;
  } catch (e) {}

  function filled(value) {
    if (typeof value === 'number') return Number.isFinite(value);
    if (typeof value === 'string') return value.trim() !== '';
    if (value && typeof value === 'object') return LANGS.some(l => filled(value[l]));
    return false;
  }

  // Required fields are checked here; broken entries are skipped with a console error.
  // Empty optional fields are listed in the console so they can be filled in.
  function checkWorks(list) {
    const ids = new Set();
    return list.filter(w => {
      const errors = [];
      if (!filled(w.id)) errors.push('id');
      else if (ids.has(w.id)) errors.push('duplicate id');
      if (!TYPES.includes(w.type)) errors.push('type');
      if (!filled(w.title?.pt)) errors.push('title.pt');
      if (!filled(w.alt?.pt)) errors.push('alt.pt');
      if (errors.length) {
        console.error(`[works] skipped "${w.id ?? '?'}": ${errors.join(', ')}`);
        return false;
      }
      ids.add(w.id);

      const missing = [];
      if (!filled(w.title.en)) missing.push('title.en');
      if (!filled(w.alt.en)) missing.push('alt.en');
      OPTIONAL.forEach(key => { if (!filled(w[key])) missing.push(key); });
      if (missing.length) console.info(`[works] "${w.id}" incomplete: ${missing.join(', ')}`);
      return true;
    });
  }

  function applyLang() {
    const root = document.documentElement;
    root.setAttribute('data-active-lang', lang);
    root.lang = lang;
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      const active = btn.dataset.setLang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-label-pt]').forEach(el => {
      el.setAttribute('aria-label', el.getAttribute('data-label-' + lang));
    });
  }

  function setLang(next) {
    if (!LANGS.includes(next)) return;
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyLang();
    document.dispatchEvent(new Event('langchange'));
  }

  const numberFormat = () => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });

  window.site = {
    works: checkWorks(WORKS),

    get lang() { return lang; },

    pick(value) {
      return (value && (value[lang] || value.pt)) || '';
    },

    // For short UI strings built in JavaScript; static text uses data-lang instead.
    t(pt, en) {
      return lang === 'en' ? en : pt;
    },

    findWork(id) {
      return this.works.find(w => w.id === id) || null;
    },

    cm(n) {
      return numberFormat().format(n) + ' cm';
    },

    size(work) {
      if (!filled(work.widthCm) || !filled(work.heightCm)) return '';
      const f = numberFormat();
      return `${f.format(work.widthCm)} × ${f.format(work.heightCm)} cm`;
    },

    // Filled-in facts about a work, labelled in the current language.
    details(work) {
      return [
        [LABELS.year, work.year],
        [LABELS.medium, this.pick(work.medium)],
        [LABELS.size, this.size(work)],
        [LABELS.signature, work.signature],
        [LABELS.collection, this.pick(work.collection)]
      ]
        .filter(([, value]) => filled(value))
        .map(([label, value]) => ({ label: label[lang], value: String(value) }));
    },

    photoUrl(id) {
      return `images/normal/${encodeURIComponent(id)}.jpg`;
    },

    // Creates an element without innerHTML, so text from WORKS can never run as markup.
    h(tag, attrs = {}, ...children) {
      const el = document.createElement(tag);
      for (const [name, value] of Object.entries(attrs)) {
        if (value === false || value == null) continue;
        el.setAttribute(name, value === true ? '' : value);
      }
      el.append(...children.flat().filter(c => c != null && c !== false));
      return el;
    },

    onLangChange(fn) {
      document.addEventListener('langchange', fn);
    },

    // Clicking the backdrop (outside the content) closes a <dialog>.
    bindBackdrop(dialog) {
      dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    }
  };

  document.querySelectorAll('[data-set-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.setLang));
  });

  applyLang();
})();
