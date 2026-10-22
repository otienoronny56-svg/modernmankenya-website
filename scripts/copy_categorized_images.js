const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'images');

const map = [
  ['WhatsApp Image 2026-10-21 at 10.39.31 AM.jpeg', 'two-piece-suit-blue.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.39.32 AM.jpeg', 'three-piece-suit-blue.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.39.32 AM (1).jpeg', 'three-piece-vest-look.jpeg'],
  ['double breast.jpeg', 'double-breasted-suit-navy.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.42.56 AM (2).jpeg', 'tuxedo-black-tie-classic.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.42.56 AM.jpeg', 'tuxedo-navy-shawl-red-vest.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.42.56 AM (1).jpeg', 'tuxedo-sky-blue-wedding.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.46.27 AM (1).jpeg', 'tuxedo-velvet-burgundy.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.46.27 AM (2).jpeg', 'smart-casual-beige-blazer-parking.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.46.27 AM (3).jpeg', 'three-piece-suit-olive-sage.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.46.28 AM.jpeg', 'two-piece-suit-ocean-blue-rooftop.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.46 AM.jpeg', 'agbada-navy-copper-embroidery.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.43 AM.jpeg', 'agbada-chocolate-brown.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.44 AM.jpeg', 'agbada-classic-1.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.44 AM (1).jpeg', 'agbada-classic-2.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.47 AM.jpeg', 'agbada-classic-3.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.47 AM (1).jpeg', 'agbada-classic-4.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.47 AM (2).jpeg', 'agbada-classic-5.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.48 AM.jpeg', 'agbada-classic-6.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.49 AM.jpeg', 'agbada-classic-7.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.47.49 AM (1).jpeg', 'agbada-classic-8.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.48.41 AM (1).jpeg', 'kaftan-groomsmen-entourage-green.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.48.41 AM.jpeg', 'kaftan-groomsmen-group-2.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.48.42 AM.jpeg', 'kaftan-groomsmen-group-3.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.48.42 AM (1).jpeg', 'kaftan-groomsmen-group-4.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.50.19 AM (2).jpeg', 'modern-kids-white-tuxedo.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.49.07 AM (1).jpeg', 'modern-kids-african-lavender.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.49.07 AM.jpeg', 'modern-kids-portrait-1.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.50.18 AM.jpeg', 'modern-kids-portrait-2.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.50.18 AM (1).jpeg', 'modern-kids-portrait-3.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.50.19 AM.jpeg', 'modern-kids-portrait-4.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.50.19 AM (1).jpeg', 'modern-kids-portrait-5.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.50.20 AM.jpeg', 'modern-kids-portrait-6.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.51.12 AM.jpeg', 'modern-kids-portrait-7.jpeg'],
  ['WhatsApp Image 2026-10-21 at 10.51.12 AM (1).jpeg', 'modern-kids-portrait-8.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.04.45 PM.jpeg', 'advocate-legal-barrister-navy-1.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.04.45 PM (1).jpeg', 'advocate-legal-barrister-navy-2.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.11.45 PM.jpeg', 'kaunda-safari-purple-suit-1.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.11.46 PM.jpeg', 'kaunda-safari-purple-suit-2.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.07 PM.jpeg', 'traditional-wedding-ruracio-groom-dance.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.08 PM.jpeg', 'tuxedo-ivory-black-velvet-entourage.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.08 PM (1).jpeg', 'traditional-bespoke-cream-groomsmen-cane.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.09 PM.jpeg', 'wedding-groom-white-tuxedo-groomsmen-beige.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.09 PM (1).jpeg', 'groomsmen-champagne-courtyard-circle.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.10 PM.jpeg', 'executive-three-piece-navy-ivory-waistcoat.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.10 PM (1).jpeg', 'bespoke-trousers-gurkha-side-adjusters.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.11 PM.jpeg', 'groomsmen-celebration-navy-vests-garden.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.11 PM (1).jpeg', 'executive-portrait-silver-hair-navy-suit.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.12 PM.jpeg', 'wedding-entourage-light-grey-suits-bride.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.12.12 PM (1).jpeg', 'traditional-wedding-ruracio-groom-gold-bride.jpeg'],
  ['WhatsApp Image 2026-10-21 at 1.13.30 PM.jpeg', 'wedding-groom-ivory-gold-embroidered-bride.jpeg']
];

map.forEach(([src, dst]) => {
  const s = path.join(imgDir, src);
  const d = path.join(imgDir, dst);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log(`Copied: ${dst}`);
  } else {
    console.log(`Missing: ${src}`);
  }
});
