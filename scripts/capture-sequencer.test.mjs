import test from 'node:test';
import assert from 'node:assert/strict';
import { allocateFilterCounts, calculateCaptureSequence, simulateCapture } from '../src/lib/capture-sequencer.mjs';

test('allocates approximate percentages while keeping every filter present', () => {
  const result = allocateFilterCounts(10, [{ id: 'ha', weight: 50 }, { id: 'oiii', weight: 30 }, { id: 'sii', weight: 20 }]);
  assert.deepEqual(result.map(({ id, count }) => ({ id, count })), [{ id: 'ha', count: 5 }, { id: 'oiii', count: 3 }, { id: 'sii', count: 2 }]);
});

test('keeps one global dither count across filters and omits dither after the final light', () => {
  const result = simulateCapture({ exposureSeconds: 60, iterations: 1, autofocusDurationSeconds: 140, autofocusIntervalSeconds: 3600, filterChangeSeconds: 5, ditherDurationSeconds: 15, ditherEvery: 3 }, [{ id: 'ha', count: 5 }, { id: 'oiii', count: 3 }]);
  assert.equal(result.ditherCount, 2);
  assert.equal(result.filterChangeCount, 1);
  assert.equal(result.elapsedSeconds, 140 + 8 * 60 + 2 * 15 + 5);
});

test('adds measured readout and preparation time only between lights', () => {
  const result = simulateCapture({ exposureSeconds: 300, iterations: 1, autofocusDurationSeconds: 0, autofocusIntervalSeconds: 0, filterChangeSeconds: 0, ditherDurationSeconds: 0, ditherEvery: 0, lightOverheadSeconds: 6 }, [{ id: 'ha', count: 3 }]);
  assert.equal(result.lightOverheadCount, 2);
  assert.equal(result.lightOverheadSeconds, 12);
  assert.equal(result.elapsedSeconds, 912);
});

test('returns equal complete iterations without exceeding the session', () => {
  const result = calculateCaptureSequence({ totalSeconds: 3 * 3600, exposureSeconds: 180, iterations: 3, autofocusDurationSeconds: 140, autofocusIntervalSeconds: 3600, filterChangeSeconds: 5, ditherDurationSeconds: 15, ditherEvery: 3, filters: [{ id: 'ha', name: 'Ha', weight: 60 }, { id: 'oiii', name: 'OIII', weight: 40 }] });
  assert.equal(result.valid, true);
  assert.ok(result.elapsedSeconds <= 3 * 3600);
  for (const filter of result.allocation) assert.equal(result.totals[filter.id], filter.count * 3);
});
