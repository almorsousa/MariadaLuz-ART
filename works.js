// ══════════════════════════════════════════════════════════════
// WORKS — the only file you edit to add or change an artwork.
//
// Each entry needs: id, type, title, alt. Everything else is optional:
// leave a field as '' (or null) until the information is known, and
// the site hides it. Missing fields are listed in the browser console.
//
// id        matches the image files: images/normal/<id>.jpg (and images/hq/ for featured works)
// type      'painting' | 'drawing' | 'sculpture' | 'photo'
// featured  true = zoomable row on the gallery page (opens the viewer)
// title     { pt, en }
// alt       { pt, en } — describe what is shown, for screen readers
// year      e.g. '1985' or 'c. 1960'
// medium    { pt, en }  e.g. 'Óleo sobre tela' / 'Oil on canvas'
// widthCm / heightCm   physical size of the artwork in centimetres
// signature  where and how it is signed
// collection { pt, en } where the work is held
// description { pt, en } short note about the work
//
// Array order is the display order.
// ══════════════════════════════════════════════════════════════
const WORKS = [
  {
    id: 'hq_1',
    type: 'painting',
    featured: true,
    title: { pt: 'Figuras em pé', en: 'Standing Figures' },
    alt: {
      pt: 'Mulheres com panos coloridos e uma criança de camisa branca, de pé num campo verde.',
      en: 'Women in colorful wraps and a child in a white shirt, standing in a green field.'
    },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: 23.6,
    heightCm: 34.4,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'hq_2',
    type: 'painting',
    featured: true,
    title: { pt: 'Mulher de perfil', en: 'Woman in Profile' },
    alt: {
      pt: 'Mulher de perfil, com o cabelo em carrapito, diante de um conjunto de casas.',
      en: 'Woman in profile, hair in a bun, in front of a row of houses.'
    },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: 24.0,
    heightCm: 28.8,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'hq_3',
    type: 'painting',
    featured: true,
    title: { pt: 'Mulher com lenço azul', en: 'Woman in Blue Headscarf' },
    alt: {
      pt: 'Mulher com lenço azul, rodeada de folhagem verde e flores cor de laranja.',
      en: 'Woman in a blue headscarf, surrounded by green leaves and orange flowers.'
    },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: 28.9,
    heightCm: 43.7,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_1',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura I', en: 'Painting I' },
    alt: { pt: 'Pintura I de Maria da Luz', en: 'Painting I by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: 80,
    heightCm: 82,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_2',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura II', en: 'Painting II' },
    alt: { pt: 'Pintura II de Maria da Luz', en: 'Painting II by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: 64,
    heightCm: 80,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_3',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura III', en: 'Painting III' },
    alt: { pt: 'Pintura III de Maria da Luz', en: 'Painting III by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: 56,
    heightCm: 70,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_4',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura IV', en: 'Painting IV' },
    alt: { pt: 'Pintura IV de Maria da Luz', en: 'Painting IV by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_5',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura V', en: 'Painting V' },
    alt: { pt: 'Pintura V de Maria da Luz', en: 'Painting V by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_6',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura VI', en: 'Painting VI' },
    alt: { pt: 'Pintura VI de Maria da Luz', en: 'Painting VI by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_7',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura VII', en: 'Painting VII' },
    alt: { pt: 'Pintura VII de Maria da Luz', en: 'Painting VII by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_8',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura VIII', en: 'Painting VIII' },
    alt: { pt: 'Pintura VIII de Maria da Luz', en: 'Painting VIII by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_9',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura IX', en: 'Painting IX' },
    alt: { pt: 'Pintura IX de Maria da Luz', en: 'Painting IX by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_10',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura X', en: 'Painting X' },
    alt: { pt: 'Pintura X de Maria da Luz', en: 'Painting X by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_11',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura XI', en: 'Painting XI' },
    alt: { pt: 'Pintura XI de Maria da Luz', en: 'Painting XI by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_12',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura XII', en: 'Painting XII' },
    alt: { pt: 'Pintura XII de Maria da Luz', en: 'Painting XII by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'quadro_13',
    type: 'painting',
    featured: false,
    title: { pt: 'Pintura XIII', en: 'Painting XIII' },
    alt: { pt: 'Pintura XIII de Maria da Luz', en: 'Painting XIII by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'bw_pen_2',
    type: 'drawing',
    featured: false,
    title: { pt: 'Desenho I', en: 'Drawing I' },
    alt: { pt: 'Desenho I de Maria da Luz', en: 'Drawing I by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'bw_pen_3',
    type: 'drawing',
    featured: false,
    title: { pt: 'Desenho II', en: 'Drawing II' },
    alt: { pt: 'Desenho II de Maria da Luz', en: 'Drawing II by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'bw_pen_4',
    type: 'drawing',
    featured: false,
    title: { pt: 'Desenho III', en: 'Drawing III' },
    alt: { pt: 'Desenho III de Maria da Luz', en: 'Drawing III by Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'photo_1',
    type: 'photo',
    featured: false,
    title: { pt: 'Fotografia I', en: 'Photograph I' },
    alt: { pt: 'Fotografia I de Maria da Luz', en: 'Photograph I of Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'photo_2',
    type: 'photo',
    featured: false,
    title: { pt: 'Fotografia II', en: 'Photograph II' },
    alt: { pt: 'Fotografia II de Maria da Luz', en: 'Photograph II of Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'photo_3',
    type: 'photo',
    featured: false,
    title: { pt: 'Fotografia III', en: 'Photograph III' },
    alt: { pt: 'Fotografia III de Maria da Luz', en: 'Photograph III of Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  },
  {
    id: 'photo_4',
    type: 'photo',
    featured: false,
    title: { pt: 'Fotografia IV', en: 'Photograph IV' },
    alt: { pt: 'Fotografia IV de Maria da Luz', en: 'Photograph IV of Maria da Luz' },
    year: '',
    medium: { pt: '', en: '' },
    widthCm: null,
    heightCm: null,
    signature: '',
    collection: { pt: '', en: '' },
    description: { pt: '', en: '' }
  }
];
