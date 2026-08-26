import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_LOCATION, analyzeNight, analyzeWeek, isoWeekStart, isoWeeksInYear, sampleInstant, thresholdIntervals } from '../src/lib/planning/engine.mjs';
import { loadPlanningSession, savePlanningSession } from '../src/lib/planning/session.mjs';
import { findLocalObject, parseSesameXml } from '../src/lib/planning/simbad.mjs';
import { formatCatalogDesignations } from '../src/lib/catalog-formatting.mjs';

const m42 = { displayName: 'M42', raDeg: 83.82208, decDeg: -5.39111, source: 'gallery' };

test('catalogue designations receive display spaces without changing surrounding text', () => {
  assert.equal(formatCatalogDesignations('M31, NGC2237, IC434, LDN1235 y Sh2-119'), 'M 31, NGC 2237, IC 434, LDN 1235 y Sh 2-119');
  assert.equal(formatCatalogDesignations('PK064+05.1 · VdB152 · WR134 · PN G080.3-10.4'), 'PK 064+05.1 · VdB 152 · WR 134 · PN G 080.3-10.4');
  assert.equal(formatCatalogDesignations('12P/Pons-Brooks'), '12P/Pons-Brooks');
});

test('L’Ampolla is the default observer', () => {
  assert.equal(DEFAULT_LOCATION.latitudeDeg, 40.80194);
  assert.equal(DEFAULT_LOCATION.longitudeDeg, 0.69361);
});

test('a planning sample contains topocentric lunar and target data', () => {
  const sample = sampleInstant({ date: new Date('2026-01-15T22:00:00Z'), location: DEFAULT_LOCATION, object: m42 });
  assert.ok(sample.objectAltitudeDeg > 30);
  assert.ok(sample.objectAzimuthDeg >= 0 && sample.objectAzimuthDeg < 360);
  assert.ok(sample.moonSeparationDeg >= 0 && sample.moonSeparationDeg <= 180);
  assert.ok(sample.moonIlluminationFraction >= 0 && sample.moonIlluminationFraction <= 1);
});

test('threshold crossings are interpolated between five-minute samples', () => {
  const samples = [
    { timestampUtc: '2026-01-01T20:00:00.000Z', value: 29 },
    { timestampUtc: '2026-01-01T20:05:00.000Z', value: 31 },
    { timestampUtc: '2026-01-01T20:10:00.000Z', value: 29 },
  ];
  const [interval] = thresholdIntervals(samples, (sample) => sample.value, 30, 'above');
  assert.equal(interval.startUtc, '2026-01-01T20:02:30.000Z');
  assert.equal(interval.endUtc, '2026-01-01T20:07:30.000Z');
});

test('night analysis produces five-minute samples and effective intervals', () => {
  const night = analyzeNight({ nightDateUtc: '2026-01-15', location: DEFAULT_LOCATION, object: m42 });
  assert.equal(night.samples.length, 289);
  assert.equal(night.status, 'available');
  assert.ok(night.effectiveMinutes > 300);
  assert.ok(night.usefulCulmination);
});

test('week analysis always compares seven UTC nights', () => {
  const week = analyzeWeek({ isoYear: 2026, isoWeek: 3, location: DEFAULT_LOCATION, object: m42 });
  assert.equal(week.nights.length, 7);
  assert.equal(week.weekStartUtc, '2026-01-12T00:00:00.000Z');
});

test('ISO week helpers handle 53-week years', () => {
  assert.equal(isoWeekStart(2026, 1).toISOString(), '2025-12-29T00:00:00.000Z');
  assert.equal(isoWeeksInYear(2026), 53);
});

test('planning location persists only in the supplied session storage', () => {
  const data = new Map();
  const storage = { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  assert.deepEqual(loadPlanningSession(storage).location, DEFAULT_LOCATION);
  const state = { version: 1, location: { name: 'Test', latitudeDeg: 10, longitudeDeg: -20, elevationM: 0 } };
  savePlanningSession(storage, state);
  assert.deepEqual(loadPlanningSession(storage), state);
  assert.deepEqual(loadPlanningSession({ getItem: () => null }).location, DEFAULT_LOCATION);
});

test('local objects are resolved before an external lookup, ignoring catalogue spaces', () => {
  const objects = [{ id: 'ngc7000', catalogName: 'NGC7000', commonName: 'North America Nebula' }];
  assert.equal(findLocalObject(objects, 'NGC 7000'), objects[0]);
  assert.equal(findLocalObject(objects, 'North America Nebula'), objects[0]);
  assert.equal(findLocalObject(objects, 'M31'), undefined);
});

test('Sesame XML is reduced to name and J2000 coordinates', () => {
  const object = parseSesameXml('<Sesame><oname>M 31</oname><jradeg>10.6847083</jradeg><jdedeg>41.26875</jdedeg></Sesame>', 'M31');
  assert.deepEqual(object, { displayName: 'M 31', canonicalName: 'M 31', raDeg: 10.6847083, decDeg: 41.26875, epoch: 'J2000', frame: 'ICRS', source: 'simbad' });
});
