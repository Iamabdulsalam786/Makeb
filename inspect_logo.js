const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'node_modules', 'pngjs'));

const data = fs.readFileSync(path.join(__dirname, 'assets', 'logomakcom.png'));
const png = PNG.sync.read(data);

console.log(`Width: ${png.width}, Height: ${png.height}`);

// Check background pixel at (0, 0)
console.log(`Top-left pixel: R=${png.data[0]}, G=${png.data[1]}, B=${png.data[2]}, A=${png.data[3]}`);

// Count colors
const colorMap = {};
for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    const a = png.data[idx + 3];

    // If not pure white
    if (!(r > 245 && g > 245 && b > 245)) {
      const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
      colorMap[hex] = (colorMap[hex] || 0) + 1;
    }
  }
}

const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
console.log('Top 10 non-white colors:');
console.log(sortedColors.slice(0, 10));

// Find the key Cyan/Blue color and the Charcoal Gray color
let blueSamples = [];
let graySamples = [];

for (const [hex, count] of sortedColors) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (b > 180 && g > 130 && r < 100) {
    blueSamples.push({ hex, count, r, g, b });
  } else if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && r < 140) {
    graySamples.push({ hex, count, r, g, b });
  }
}

console.log('Dominant Cyan/Blue:', blueSamples[0]);
console.log('Dominant Charcoal/Gray:', graySamples[0]);
