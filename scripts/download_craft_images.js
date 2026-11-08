const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'fabric-jacquard.jpg',
    // Rich black/gold floral/brocade jacquard cloth
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'fabric-pure-wool.jpg',
    // Fine worsted pure wool suiting fabric texture
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'fabric-wool-blend.jpg',
    // Classic navy twill blend suiting
    url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'fabric-cotton.jpg',
    // Crisp Egyptian cotton weave
    url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'lining-paisley.jpg',
    // Luxurious paisley silk fabric
    url: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'lining-geometric.jpg',
    // Obsidian / charcoal dark geometric silk texture
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'lining-plain-satin.jpg',
    // Deep midnight navy lustrous satin silk
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  }
];

const destDir = path.join(__dirname, '../public/images/craft');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'ModernManTailor/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status code ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  for (const img of images) {
    const filePath = path.join(destDir, img.name);
    try {
      console.log(`Downloading ${img.name}...`);
      await download(img.url, filePath);
      console.log(`Saved ${img.name} (${fs.statSync(filePath).size} bytes)`);
    } catch (e) {
      console.error(`Failed ${img.name}:`, e.message);
    }
  }
}

run();
