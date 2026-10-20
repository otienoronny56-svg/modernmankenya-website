const fs = require('fs');
const path = require('path');

function getJpegDimensions(buffer) {
  let i = 2;
  while (i < buffer.length - 8) {
    if (buffer[i] === 0xFF && (buffer[i + 1] === 0xC0 || buffer[i + 1] === 0xC2)) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    i++;
  }
  return null;
}

const moreDir = path.join(__dirname, '..', 'public', 'images', 'more');
const moreFiles = fs.readdirSync(moreDir);

const filesWithMeta = moreFiles.map(file => {
  const filePath = path.join(moreDir, file);
  const buf = fs.readFileSync(filePath);
  const dim = getJpegDimensions(buf);
  const size = fs.statSync(filePath).size;
  return {
    filename: file,
    path: `/images/more/${file}`,
    size,
    width: dim ? dim.width : null,
    height: dim ? dim.height : null,
    aspect: dim ? (dim.height > dim.width * 1.15 ? 'portrait' : dim.width > dim.height * 1.15 ? 'landscape' : 'square') : 'unknown'
  };
});

console.log(`Analyzed ${filesWithMeta.length} files in public/images/more.`);
console.log('Sample 3:', JSON.stringify(filesWithMeta.slice(0, 3), null, 2));

const outPath = path.join(__dirname, 'more_images_meta.json');
fs.writeFileSync(outPath, JSON.stringify(filesWithMeta, null, 2));
console.log(`Wrote metadata to ${outPath}`);
