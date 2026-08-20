import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { altitudeDeg, dailySamples, moonAltitudeDeg, moonPhaseIndex, nightMetrics, sunEquatorial, thresholdPeriods, weeklyNightSamples, weeklySamples } from './lib/visibility.mjs';

test('an object on the meridian reaches its expected culmination altitude', () => {
  const date = new Date('2026-01-01T00:00:00Z');
  const longitudeDeg = 1.5;
  const daysSinceJ2000 = date.getTime() / 86400000 + 2440587.5 - 2451545;
  const raDeg = ((280.46061837 + 360.98564736629 * daysSinceJ2000 + longitudeDeg) % 360 + 360) % 360;
  const altitude = altitudeDeg({ date, latitudeDeg: 41, longitudeDeg, raDeg, decDeg: 40 });
  assert.ok(Math.abs(altitude - 89) < 0.01);
});

test('the approximate solar position is near the equator at the March equinox', () => {
  assert.ok(Math.abs(sunEquatorial(new Date('2026-03-20T14:46:00Z')).decDeg) < 0.2);
});

test('the local lunar model identifies the four principal phases', () => {
  assert.equal(moonPhaseIndex(new Date('2026-08-12T17:37:00Z')), 0);
  assert.equal(moonPhaseIndex(new Date('2026-08-20T02:46:00Z')), 2);
  assert.equal(moonPhaseIndex(new Date('2026-08-28T04:18:00Z')), 4);
  assert.equal(moonPhaseIndex(new Date('2026-09-04T07:51:00Z')), 6);
});

test('the local lunar model crosses the Barcelona horizon near the published moonrise', () => {
  const location = { latitudeDeg: 41.41, longitudeDeg: 2.16 };
  const before = moonAltitudeDeg({ date: new Date('2026-08-02T20:50:00Z'), ...location });
  const after = moonAltitudeDeg({ date: new Date('2026-08-02T21:05:00Z'), ...location });
  assert.ok(before < 0);
  assert.ok(after > 0);
});

test('night planning returns useful observing metrics', () => {
  const metrics = nightMetrics({ date: new Date('2026-01-15T00:00:00Z'), latitudeDeg: 41, longitudeDeg: 1.5, raDeg: 83.82, decDeg: -5.3875, thresholdsDeg: [30] });
  assert.ok(metrics.darknessHours > 10);
  assert.ok(metrics.maxAltitudeDeg > 43 && metrics.maxAltitudeDeg < 44);
  assert.ok(metrics.hoursAbove[30] > 4);
});

test('weekly night planning keeps low and circumpolar objects', () => {
  const common = { year: 2026, latitudeDeg: 41, longitudeDeg: 1.5, thresholdsDeg: [30] };
  const m8 = weeklyNightSamples({ ...common, raDeg: 270.904167, decDeg: -24.386667 });
  const m81 = weeklyNightSamples({ ...common, raDeg: 148.888219, decDeg: 69.065295 });
  assert.equal(m8.length, 53);
  assert.ok(Math.max(...m8.map(({ maxAltitudeDeg }) => maxAltitudeDeg)) > 24);
  assert.ok(Math.min(...m81.map(({ maxAltitudeDeg }) => maxAltitudeDeg)) > 20);
});

test('every photo has a valid fixed object or an explicit variable-visibility marker', async () => {
  const root = resolve(import.meta.dirname, '..');
  const catalog = JSON.parse(await readFile(resolve(root, 'src/data/astronomical-objects.json'), 'utf8'));
  const ids = new Set(catalog.map(({ id }) => id));
  const byId = new Map(catalog.map((object) => [object.id, object]));
  assert.equal(ids.size, catalog.length, 'astronomical object ids must be unique');
  assert.equal(catalog.filter(({ status }) => status === 'photographed').length, 85);
  assert.equal(catalog.filter(({ status }) => status === 'pending').length, 15);
  for (const object of catalog) {
    assert.ok(object.raDeg >= 0 && object.raDeg < 360, `${object.id} has invalid right ascension`);
    assert.ok(object.decDeg >= -90 && object.decDeg <= 90, `${object.id} has invalid declination`);
  }
  const files = (await readdir(resolve(root, 'src/content/fotos'))).filter((file) => file.endsWith('.md'));
  let fixedPhotos = 0;
  let variablePhotos = 0;
  for (const file of files) {
    const source = await readFile(resolve(root, 'src/content/fotos', file), 'utf8');
    const objectId = source.match(/^objecte_astronomic:\s*"([^"]+)"/m)?.[1];
    const variable = /^visibilitat_variable:\s*true$/m.test(source);
    assert.notEqual(Boolean(objectId), variable, `${file} must use exactly one visibility mode`);
    if (objectId) {
      assert.ok(ids.has(objectId), `${file} references missing object ${objectId}`);
      assert.equal(byId.get(objectId).status, 'photographed', `${file} references an object not marked as photographed`);
      const chart = source.match(/^visibilitat:\s*\n\s+imatge:\s*"([^"]+)"\s*\n\s+dies_sobre_30:\s*(\d+)/m);
      assert.ok(chart, `${file} is missing its visibility chart metadata`);
      await access(resolve(root, 'public/imagenes/visibilidad', chart[1]));
      assert.ok(Number.isInteger(Number(chart[2])), `${file} has an invalid visibility day count`);
      fixedPhotos += 1;
    } else variablePhotos += 1;
  }
  assert.equal(fixedPhotos, 94);
  assert.equal(variablePhotos, 2);
});

test('the reference year produces 365 daily and 53 ISO weekly samples', () => {
  const daily = dailySamples({ year: 2026, latitudeDeg: 41, longitudeDeg: 1.5, raDeg: 305.557091, decDeg: 40.256679 });
  assert.equal(daily.length, 365);
  assert.equal(weeklySamples(daily).length, 53);
  assert.equal(weeklySamples(daily)[16].date, '2026-04-23');
  assert.equal(daily.filter(({ altitudeDeg }) => altitudeDeg > 30).length, 167);
});

test('threshold periods join an observing season across the year boundary', () => {
  const periods = thresholdPeriods([
    { date: '2026-01-01', altitudeDeg: 31 },
    { date: '2026-01-02', altitudeDeg: 29 },
    { date: '2026-01-03', altitudeDeg: 29 },
    { date: '2026-01-04', altitudeDeg: 31 },
    { date: '2026-01-05', altitudeDeg: 32 },
  ], 30);
  assert.deepEqual(periods, [{ start: '2026-01-04', end: '2026-01-01', wrapsYear: true }]);
});
