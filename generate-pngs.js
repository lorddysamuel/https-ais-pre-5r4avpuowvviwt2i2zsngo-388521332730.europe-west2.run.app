// generate-pngs.js
// Small script to rasterize existing SVG icons into PNGs using sharp.
// Usage:
//   npm install sharp
//   node generate-pngs.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const tasks = [
  { src: 'icon-192.svg', outputs: [{ size: 192, out: 'icon-192.png' }, { size: 32, out: 'favicon-32x32.png' }] },
  { src: 'icon-512.svg', outputs: [{ size: 512, out: 'icon-512.png' }, { size: 180, out: 'apple-touch-icon-180x180.png' }] }
];

(async () => {
  for (const t of tasks) {
    if (!fs.existsSync(t.src)) {
      console.error(`Source not found: ${t.src}. Skipping.`);
      continue;
    }

    for (const o of t.outputs) {
      const outPath = path.join(process.cwd(), o.out);
      try {
        await sharp(t.src)
          .resize(o.size, o.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png({ quality: 90 })
          .toFile(outPath);
        console.log(`Wrote ${outPath}`);
      } catch (err) {
        console.error(`Failed to write ${outPath}:`, err);
      }
    }
  }

  console.log('Done. Add and commit the generated PNG files to include them in the repo.');
})();
