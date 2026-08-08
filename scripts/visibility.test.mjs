import test from 'node:test';
import assert from 'node:assert/strict';
import { altitudeDeg, dailySamples, nightMetrics, sunEquatorial, weeklyNightSamples, weeklySamples } from './lib/visibility.mjs';

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

test('night planning returns useful observing metrics', () => {
  const metrics = nightMetrics({ date: new Date('2026-01-15T00:00:00Z'), latitudeDeg: 41, longitudeDeg: 1.5, raDeg: 83.82, decDeg: -5.3875, thresholdsDeg: [20, 25, 30] });
  assert.ok(metrics.darknessHours > 10);
  assert.ok(metrics.maxAltitudeDeg > 43 && metrics.maxAltitudeDeg < 44);
  assert.ok(metrics.hoursAbove[30] > 4);
});

test('weekly night planning keeps low and circumpolar objects', () => {
  const common = { year: 2026, latitudeDeg: 41, longitudeDeg: 1.5, thresholdsDeg: [20, 25, 30] };
  const m8 = weeklyNightSamples({ ...common, raDeg: 270.904167, decDeg: -24.386667 });
  const m81 = weeklyNightSamples({ ...common, raDeg: 148.888219, decDeg: 69.065295 });
  assert.equal(m8.length, 52);
  assert.ok(Math.max(...m8.map(({ maxAltitudeDeg }) => maxAltitudeDeg)) > 24);
  assert.ok(Math.min(...m81.map(({ maxAltitudeDeg }) => maxAltitudeDeg)) > 20);
});

test('a regular year produces 365 daily and 52 weekly samples', () => {
  const daily = dailySamples({ year: 2026, latitudeDeg: 41, longitudeDeg: 1.5, raDeg: 305.557091, decDeg: 40.256679 });
  assert.equal(daily.length, 365);
  assert.equal(weeklySamples(daily).length, 52);
  assert.equal(daily.filter(({ altitudeDeg }) => altitudeDeg > 30).length, 167);
});
