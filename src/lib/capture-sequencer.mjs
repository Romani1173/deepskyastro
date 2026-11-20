const positive = (value, fallback = 0) => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : fallback;

export function allocateFilterCounts(total, filters) {
  const active = filters.filter((filter) => positive(filter.weight) > 0);
  if (!active.length || total < active.length) return null;
  const weightTotal = active.reduce((sum, filter) => sum + positive(filter.weight), 0);
  const counts = active.map((filter) => ({ ...filter, count: 1, exact: total * positive(filter.weight) / weightTotal }));
  let remaining = total - active.length;
  while (remaining > 0) {
    let best = counts[0];
    for (const item of counts) {
      const deficit = item.exact - item.count;
      const bestDeficit = best.exact - best.count;
      if (deficit > bestDeficit + 1e-9 || (Math.abs(deficit - bestDeficit) < 1e-9 && positive(item.weight) > positive(best.weight))) best = item;
    }
    best.count += 1;
    remaining -= 1;
  }
  return counts;
}

export function simulateCapture(input, perIteration) {
  const exposure = positive(input.exposureSeconds);
  const iterations = Math.max(1, Math.floor(positive(input.iterations, 1)));
  const autofocusDuration = positive(input.autofocusDurationSeconds);
  const autofocusInterval = positive(input.autofocusIntervalSeconds);
  const filterChange = positive(input.filterChangeSeconds);
  const ditherDuration = positive(input.ditherDurationSeconds);
  const ditherEvery = Math.max(0, Math.floor(positive(input.ditherEvery, 0)));
  let elapsed = autofocusDuration;
  let nextAutofocus = autofocusInterval ? elapsed + autofocusInterval : Infinity;
  let autofocusCount = autofocusDuration ? 1 : 0;
  let ditherCount = 0;
  let filterChangeCount = 0;
  let lights = 0;
  let integration = 0;
  let previousFilter = null;
  const totals = Object.fromEntries(perIteration.map((filter) => [filter.id, 0]));
  const ensureFocus = () => {
    if (elapsed + 1e-9 < nextAutofocus) return;
    elapsed += autofocusDuration;
    autofocusCount += 1;
    nextAutofocus = elapsed + autofocusInterval;
  };
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    for (const filter of perIteration) {
      if (!filter.count) continue;
      if (previousFilter !== null && previousFilter !== filter.id) {
        elapsed += filterChange;
        filterChangeCount += 1;
      }
      previousFilter = filter.id;
      for (let frame = 1; frame <= filter.count; frame += 1) {
        ensureFocus();
        elapsed += exposure;
        integration += exposure;
        lights += 1;
        totals[filter.id] += 1;
        const moreInBlock = frame < filter.count;
        if (ditherEvery && frame % ditherEvery === 0 && moreInBlock) {
          elapsed += ditherDuration;
          ditherCount += 1;
        }
      }
    }
  }
  return {
    elapsedSeconds: elapsed,
    integrationSeconds: integration,
    lights,
    autofocusCount,
    autofocusSeconds: autofocusCount * autofocusDuration,
    ditherCount,
    ditherSeconds: ditherCount * ditherDuration,
    filterChangeCount,
    filterChangeSeconds: filterChangeCount * filterChange,
    totals,
  };
}

export function calculateCaptureSequence(input) {
  const totalSeconds = positive(input.totalSeconds);
  const exposure = positive(input.exposureSeconds);
  const iterations = Math.max(1, Math.floor(positive(input.iterations, 1)));
  const filters = (input.filters ?? []).filter((filter) => positive(filter.weight) > 0);
  if (!totalSeconds || !exposure || !filters.length) return { valid: false, reason: 'incomplete' };
  const maximumPerIteration = Math.floor(totalSeconds / exposure / iterations);
  let best = null;
  for (let count = filters.length; count <= maximumPerIteration; count += 1) {
    const allocation = allocateFilterCounts(count, filters);
    if (!allocation) continue;
    const simulation = simulateCapture(input, allocation);
    if (simulation.elapsedSeconds <= totalSeconds + 1e-9) best = { allocation, ...simulation };
  }
  if (!best) return { valid: false, reason: 'too-short' };
  return { valid: true, totalSeconds, remainingSeconds: totalSeconds - best.elapsedSeconds, iterations, ...best };
}
