const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.modernmanke.com';
const today = new Date().toISOString().split('T')[0];

const staticUrls = [
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${BASE_URL}/gallery`, priority: '0.95', changefreq: 'daily' },
  { loc: `${BASE_URL}/book-appointment`, priority: '0.95', changefreq: 'weekly' },
  { loc: `${BASE_URL}/occasions`, priority: '0.90', changefreq: 'weekly' },
  { loc: `${BASE_URL}/the-craft`, priority: '0.90', changefreq: 'weekly' },
  { loc: `${BASE_URL}/ready-to-wear`, priority: '0.90', changefreq: 'daily' },
  { loc: `${BASE_URL}/about`, priority: '0.85', changefreq: 'monthly' },
  { loc: `${BASE_URL}/contact`, priority: '0.85', changefreq: 'monthly' },
  { loc: `${BASE_URL}/reviews`, priority: '0.80', changefreq: 'weekly' },
  { loc: `${BASE_URL}/journal`, priority: '0.80', changefreq: 'weekly' },
  { loc: `${BASE_URL}/services/alterations`, priority: '0.75', changefreq: 'monthly' },
  { loc: `${BASE_URL}/services/gift-vouchers`, priority: '0.75', changefreq: 'monthly' },
  { loc: `${BASE_URL}/privacy`, priority: '0.30', changefreq: 'yearly' },
  { loc: `${BASE_URL}/terms`, priority: '0.30', changefreq: 'yearly' },
  { loc: `${BASE_URL}/returns`, priority: '0.30', changefreq: 'yearly' },
];

const occasions = [
  'executive-wear',
  'black-tie-wedding',
  'african-wear',
  'diplomatic-attire',
  'ruracio-traditional',
  'smart-casual',
  'contemporary-african',
];

const bespokeCategories = [
  'kaunda-suits',
  'weddings',
  'corporate-wardrobes',
  'bespoke-shirts',
  'occasion-wear',
  'the-craft',
];

const galleryCategories = [
  'suits',
  'evening-dinner',
  'kaunda-suits',
  'smart-casual',
  'traditional',
  'kaftan-agbada',
  'modern-kids',
  'modern-women',
  'shirts',
  'accessories',
];

let productSlugs = [];
try {
  const pPath = path.join(__dirname, '..', 'data', 'custom_products.json');
  if (fs.existsSync(pPath)) {
    const list = JSON.parse(fs.readFileSync(pPath, 'utf8'));
    if (Array.isArray(list)) {
      productSlugs = list.map((p) => p.slug).filter(Boolean);
    }
  }
} catch (e) {
  console.warn('Could not read custom_products.json:', e);
}

const allUrls = [
  ...staticUrls,
  ...occasions.map((slug) => ({ loc: `${BASE_URL}/occasions/${slug}`, priority: '0.85', changefreq: 'weekly' })),
  ...bespokeCategories.map((cat) => ({ loc: `${BASE_URL}/bespoke/${cat}`, priority: '0.85', changefreq: 'weekly' })),
  ...galleryCategories.map((cat) => ({ loc: `${BASE_URL}/gallery?category=${cat}`, priority: '0.80', changefreq: 'weekly' })),
  ...productSlugs.map((slug) => ({ loc: `${BASE_URL}/ready-to-wear/${slug}`, priority: '0.80', changefreq: 'weekly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc.replace(/&/g, '&amp;')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Generated public/sitemap.xml with ${allUrls.length} verified URLs.`);
