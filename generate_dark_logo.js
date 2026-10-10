const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'node_modules', 'pngjs'));

const srcPath = path.join(__dirname, 'assets', 'logomakcom.png');
const destPath = path.join(__dirname, 'assets', 'logomakcom-dark.png');

const data = fs.readFileSync(srcPath);
const src = PNG.sync.read(data);
const dst = new PNG({ width: src.width, height: src.height });

for (let y = 0; y < src.height; y++) {
  for (let x = 0; x < src.width; x++) {
    const idx = (src.width * y + x) << 2;
    const r = src.data[idx];
    const g = src.data[idx + 1];
    const b = src.data[idx + 2];
    const a = src.data[idx + 3];

    if (a === 0) {
      dst.data[idx] = 0;
      dst.data[idx + 1] = 0;
      dst.data[idx + 2] = 0;
      dst.data[idx + 3] = 0;
      continue;
    }

    // Check if this pixel is the cyan/blue part:
    // Cyan has b > 160 && g > 130 && r < 120
    const isCyan = (b > 150 && g > 120 && b > r + 40);

    if (isCyan) {
      // Keep exact cyan color
      dst.data[idx] = r;
      dst.data[idx + 1] = g;
      dst.data[idx + 2] = b;
      dst.data[idx + 3] = a;
    } else {
      // It's the gray/charcoal text or dots!
      // In dark theme, transform gray (#616668) into crisp white (#FFFFFF)
      // while preserving anti-aliasing alpha!
      dst.data[idx] = 255;
      dst.data[idx + 1] = 255;
      dst.data[idx + 2] = 255;
      dst.data[idx + 3] = a;
    }
  }
}

const buffer = PNG.sync.write(dst);
fs.writeFileSync(destPath, buffer);
console.log('Created logomakcom-dark.png successfully!');
