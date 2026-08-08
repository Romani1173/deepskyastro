import test from 'node:test';
import assert from 'node:assert/strict';
import { altitudeDeg, dailySamples, weeklySamples } from './lib/visibility.mjs';

test('an object on the meridian reaches its expected culmination altitude', () => {
  const date = new Date('2026-01-01T00:00:00Z');
  const longitudeDeg = 1.5;
  const daysSinceJ2000 = date.getTime() / 86400000 + 2440587.5 - 2451545;
  const raDeg = ((280.46061837 + 360.98564736629 * daysSinceJ2000 + longitudeDeg) % 360 + 360) % 360;
  const altitude = altitudeDeg({ date, latitudeDeg: 41, longitudeDeg, raDeg, decDeg: 40 });
  assert.ok(Math.abs(altitude - 89) < 0.01);
});

test('a regular year produces 365 daily and 52 weekly samples', () => {
  const daily = dailySamples({ year: 2026, latitudeDeg: 41, longitudeDeg: 1.5, raDeg: 305.557091, decDeg: 40.256679 });
  assert.equal(daily.length, 365);
  assert.equal(weeklySamples(daily).length, 52);
  assert.equal(daily.filter(({ altitudeDeg }) => altitudeDeg > 30).length, 167);
});
