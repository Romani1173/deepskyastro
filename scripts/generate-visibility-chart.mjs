import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { dailySamples } from './lib/visibility.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const objectId = process.argv[2];
if (!objectId) throw new Error('Usage: npm run visibility:chart -- <object-id>');

const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const observatory = await readJson('src/data/observatory.json');
const objects = await readJson('src/data/astronomical-objects.json');
const object = objects.find(({ id }) => id === objectId);
if (!object) throw new Error(`Unknown astronomical object: ${objectId}`);

const samples = dailySamples({
  year: observatory.referenceYear,
  latitudeDeg: observatory.latitudeDeg,
  longitudeDeg: observatory.longitudeDeg,
  raDeg: object.raDeg,
  decDeg: object.decDeg,
});
const threshold = observatory.thresholdDeg;
const daysAbove = samples.filter(({ altitudeDeg }) => altitudeDeg > threshold).length;
const crossings = samples.slice(1).flatMap((sample, index) => {
  const previous = samples[index];
  return (previous.altitudeDeg - threshold) * (sample.altitudeDeg - threshold) <= 0
    && previous.altitudeDeg !== sample.altitudeDeg ? [sample] : [];
});
const maximum = samples.reduce((best, sample) => sample.altitudeDeg > best.altitudeDeg ? sample : best);

const width = 2048, height = 1365, left = 174, right = 1845, top = 230, bottom = 1140;
const x = (index) => left + index * (right - left) / (samples.length - 1);
const y = (altitude) => top + (90 - altitude) * (bottom - top) / 150;
const linePoints = samples.map(({ altitudeDeg }, index) => `${x(index).toFixed(1)},${y(altitudeDeg).toFixed(1)}`).join(' ');
const fillPoints = `${left},${bottom} ${linePoints} ${right},${bottom}`;
const altitudeTicks = [90, 60, 30, 0, -30, -60];
const monthStarts = Array.from({ length: 12 }, (_, month) => samples.findIndex(({ date }) => Number(date.slice(5, 7)) === month + 1));
const crossingMarkup = crossings.map(({ date, altitudeDeg }) => {
  const index = samples.findIndex((sample) => sample.date === date);
  const label = new Intl.DateTimeFormat('ca-ES', { day: '2-digit', month: '2-digit', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
  return `<line x1="${x(index)}" y1="${y(altitudeDeg)}" x2="${x(index)}" y2="${bottom}" stroke="#55d9b3" stroke-width="4" stroke-dasharray="14 12"/><text x="${x(index)}" y="1120" fill="#55d9b3" font-size="25" font-weight="700" text-anchor="middle">${label}</text>`;
}).join('');
const maxIndex = samples.findIndex(({ date }) => date === maximum.date);

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#091524"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="1024" y="70" fill="#f1f5fb" font-size="55" font-weight="700" text-anchor="middle">${object.catalogName}</text>
    <text x="1024" y="138" fill="#b7c6d9" font-size="35" text-anchor="middle">00:00 UTC · ${observatory.latitudeDeg}° N · ${observatory.longitudeDeg}° E</text>
    ${altitudeTicks.map((tick) => `<line x1="${left}" y1="${y(tick)}" x2="${right}" y2="${y(tick)}" stroke="#2a3d52" stroke-width="2"/><text x="136" y="${y(tick) + 10}" fill="#aabbd0" font-size="29" font-weight="700" text-anchor="end">${tick >= 0 ? '+' : ''}${tick}°</text>`).join('')}
    ${monthStarts.map((index, month) => `<line x1="${x(index)}" y1="${top}" x2="${x(index)}" y2="${bottom}" stroke="#25384c" stroke-width="2"/><text x="${x(index) + 38}" y="1200" fill="#aabbd0" font-size="29" font-weight="700" text-anchor="middle">${String(month + 1).padStart(2, '0')}</text>`).join('')}
    <polygon points="${fillPoints}" fill="#17384d" opacity=".88"/>
    <line x1="${left}" y1="${y(0)}" x2="${right}" y2="${y(0)}" stroke="#9db3c8" stroke-width="4"/>
    <line x1="${left}" y1="${y(threshold)}" x2="${right}" y2="${y(threshold)}" stroke="#55d9b3" stroke-width="5" stroke-dasharray="20 14"/>
    ${crossingMarkup}
    <polyline points="${linePoints}" fill="none" stroke="#55cfff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${x(maxIndex)}" cy="${y(maximum.altitudeDeg)}" r="10" fill="#ffc65c"/>
    <text x="${x(maxIndex)}" y="${y(maximum.altitudeDeg) - 35}" fill="#ffc65c" font-size="29" font-weight="700" text-anchor="middle">${maximum.altitudeDeg.toFixed(1)}°</text>
    <text x="${right - 275}" y="${y(threshold) - 25}" fill="#55d9b3" font-size="28" font-weight="700">+${threshold}°</text>
    <text x="1024" y="1288" fill="#aabbd0" font-size="27" text-anchor="middle">${daysAbove} d · &gt; +${threshold}° · 00:00 UTC</text>
  </g>
</svg>`;

const output = resolve(root, `public/imagenes/visibilidad/${objectId}-elevacion-anual.png`);
await sharp(Buffer.from(svg)).png().toFile(output);
console.log(`Generated ${output} (${daysAbove} days above ${threshold}°)`);
