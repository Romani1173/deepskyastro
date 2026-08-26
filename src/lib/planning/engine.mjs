import { Body, DefineStar, Equator, Horizon, Illumination, Observer } from 'astronomy-engine';

export const DEFAULT_LOCATION = Object.freeze({ name: 'L’Ampolla', latitudeDeg: 40.80194, longitudeDeg: 0.69361, elevationM: 0 });
export const SAMPLE_MINUTES = 5;
export const TWILIGHT_DEG = -18;
export const OBJECT_LIMIT_DEG = 30;
const STAR = Body.Star1;
const STEP_MS = SAMPLE_MINUTES * 60_000;

const horizontal = (body, date, observer) => {
  const equatorial = Equator(body, date, observer, true, true);
  return Horizon(date, observer, equatorial.ra, equatorial.dec, '');
};

const angularSeparation = (a, b) => {
  const rad = Math.PI / 180;
  const sine = Math.sin(a.altitude * rad) * Math.sin(b.altitude * rad)
    + Math.cos(a.altitude * rad) * Math.cos(b.altitude * rad) * Math.cos((a.azimuth - b.azimuth) * rad);
  return Math.acos(Math.max(-1, Math.min(1, sine))) / rad;
};

const round = (value, decimals = 4) => Number(value.toFixed(decimals));

export function sampleInstant({ date, location, object }) {
  const observer = new Observer(location.latitudeDeg, location.longitudeDeg, location.elevationM ?? 0);
  DefineStar(STAR, object.raDeg / 15, object.decDeg, 1000);
  const target = horizontal(STAR, date, observer);
  const moon = horizontal(Body.Moon, date, observer);
  const sun = horizontal(Body.Sun, date, observer);
  const illumination = Illumination(Body.Moon, date).phase_fraction;
  const objectAltitudeDeg = round(target.altitude);
  const moonAltitudeDeg = round(moon.altitude);
  const sunAltitudeDeg = round(sun.altitude);
  return {
    timestampUtc: date.toISOString(),
    objectAltitudeDeg,
    objectAzimuthDeg: round(target.azimuth),
    moonAltitudeDeg,
    moonAzimuthDeg: round(moon.azimuth),
    moonIlluminationFraction: round(illumination, 6),
    moonSeparationDeg: round(angularSeparation(target, moon)),
    sunAltitudeDeg,
    isAstronomicalNight: sunAltitudeDeg <= TWILIGHT_DEG,
    isObjectAbove30: objectAltitudeDeg > OBJECT_LIMIT_DEG,
    isEffective: sunAltitudeDeg <= TWILIGHT_DEG && objectAltitudeDeg > OBJECT_LIMIT_DEG,
    isMoonUp: moonAltitudeDeg >= 0,
  };
}

const crossingTime = (left, right, selector, threshold) => {
  const a = selector(left);
  const b = selector(right);
  if (a === b) return new Date(left.timestampUtc).getTime();
  const ratio = Math.max(0, Math.min(1, (threshold - a) / (b - a)));
  return new Date(left.timestampUtc).getTime() + ratio * (new Date(right.timestampUtc).getTime() - new Date(left.timestampUtc).getTime());
};

export function thresholdIntervals(samples, selector, threshold, mode = 'above') {
  const active = (sample) => mode === 'above' ? selector(sample) > threshold : selector(sample) <= threshold;
  const intervals = [];
  let startMs = active(samples[0]) ? new Date(samples[0].timestampUtc).getTime() : null;
  for (let index = 1; index < samples.length; index += 1) {
    const previousActive = active(samples[index - 1]);
    const currentActive = active(samples[index]);
    if (previousActive === currentActive) continue;
    const boundary = crossingTime(samples[index - 1], samples[index], selector, threshold);
    if (currentActive) startMs = boundary;
    else if (startMs !== null) {
      intervals.push(makeInterval(startMs, boundary));
      startMs = null;
    }
  }
  if (startMs !== null) intervals.push(makeInterval(startMs, new Date(samples.at(-1).timestampUtc).getTime()));
  return intervals;
}

const makeInterval = (startMs, endMs) => ({
  startUtc: new Date(startMs).toISOString(),
  endUtc: new Date(endMs).toISOString(),
  durationMinutes: (endMs - startMs) / 60_000,
});

export function intersectIntervals(left, right) {
  const intersections = [];
  for (const a of left) for (const b of right) {
    const start = Math.max(Date.parse(a.startUtc), Date.parse(b.startUtc));
    const end = Math.min(Date.parse(a.endUtc), Date.parse(b.endUtc));
    if (end > start) intersections.push(makeInterval(start, end));
  }
  return intersections;
}

const totalMinutes = (intervals) => intervals.reduce((sum, interval) => sum + interval.durationMinutes, 0);
const inIntervals = (timestamp, intervals) => intervals.some(({ startUtc, endUtc }) => timestamp >= startUtc && timestamp <= endUtc);
const bestMoment = (samples, intervals, moonUp) => {
  const candidates = samples.filter((sample) => inIntervals(sample.timestampUtc, intervals) && (moonUp === undefined || sample.isMoonUp === moonUp));
  if (!candidates.length) return null;
  const best = candidates.reduce((selected, sample) => sample.objectAltitudeDeg > selected.objectAltitudeDeg ? sample : selected);
  return {
    timestampUtc: best.timestampUtc,
    objectAltitudeDeg: best.objectAltitudeDeg,
    objectAzimuthDeg: best.objectAzimuthDeg,
    moonAltitudeDeg: best.moonAltitudeDeg,
    moonIlluminationFraction: best.moonIlluminationFraction,
    moonSeparationDeg: best.moonSeparationDeg,
  };
};

export function analyzeNight({ nightDateUtc, location, object }) {
  const startMs = Date.parse(`${nightDateUtc}T12:00:00.000Z`);
  const samples = [];
  for (let timestamp = startMs; timestamp <= startMs + 86_400_000; timestamp += STEP_MS) {
    samples.push(sampleInstant({ date: new Date(timestamp), location, object }));
  }
  const astronomicalNight = thresholdIntervals(samples, (sample) => sample.sunAltitudeDeg, TWILIGHT_DEG, 'below');
  const objectAbove30 = thresholdIntervals(samples, (sample) => sample.objectAltitudeDeg, OBJECT_LIMIT_DEG, 'above');
  const moonDown = thresholdIntervals(samples, (sample) => sample.moonAltitudeDeg, 0, 'below');
  const moonUp = thresholdIntervals(samples, (sample) => sample.moonAltitudeDeg, 0, 'above');
  const effective = intersectIntervals(astronomicalNight, objectAbove30);
  const effectiveMoonDown = intersectIntervals(effective, moonDown);
  const effectiveMoonUp = intersectIntervals(effective, moonUp);
  const effectiveSamples = samples.filter((sample) => inIntervals(sample.timestampUtc, effective));
  const values = (key) => effectiveSamples.map((sample) => sample[key]);
  const range = (numbers) => numbers.length ? { min: Math.min(...numbers), max: Math.max(...numbers) } : null;
  return {
    nightDateUtc,
    samples,
    intervals: { astronomicalNight, objectAbove30, effective, effectiveMoonDown, effectiveMoonUp },
    astronomicalNightMinutes: totalMinutes(astronomicalNight),
    maxObjectAltitudeDeg: samples.filter((sample) => sample.isAstronomicalNight).reduce((max, sample) => Math.max(max, sample.objectAltitudeDeg), -Infinity),
    timeAbove30Minutes: totalMinutes(objectAbove30),
    effectiveMinutes: totalMinutes(effective),
    effectiveMoonDownMinutes: totalMinutes(effectiveMoonDown),
    effectiveMoonUpMinutes: totalMinutes(effectiveMoonUp),
    usefulCulmination: bestMoment(samples, effective),
    bestMoonDown: bestMoment(samples, effectiveMoonDown, false),
    bestMoonUp: bestMoment(samples, effectiveMoonUp, true),
    moonIlluminationRange: range(values('moonIlluminationFraction')),
    moonSeparationRangeDeg: range(values('moonSeparationDeg')),
    status: astronomicalNight.length === 0 ? 'no-astronomical-night' : effective.length === 0 ? 'never-above-30' : 'available',
  };
}

export function isoWeekStart(isoYear, isoWeek) {
  const januaryFourth = new Date(Date.UTC(isoYear, 0, 4));
  const monday = new Date(januaryFourth.getTime() - ((januaryFourth.getUTCDay() || 7) - 1) * 86_400_000);
  monday.setUTCDate(monday.getUTCDate() + (isoWeek - 1) * 7);
  return monday;
}

export function isoWeeksInYear(year) {
  const december28 = new Date(Date.UTC(year, 11, 28));
  const thursday = new Date(december28);
  thursday.setUTCDate(thursday.getUTCDate() + 4 - (thursday.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  return Math.ceil((((thursday - yearStart) / 86_400_000) + 1) / 7);
}

export function analyzeWeek({ isoYear, isoWeek, location, object }) {
  const start = isoWeekStart(isoYear, isoWeek);
  const nights = Array.from({ length: 7 }, (_, day) => {
    const date = new Date(start.getTime() + day * 86_400_000);
    return analyzeNight({ nightDateUtc: date.toISOString().slice(0, 10), location, object });
  });
  return {
    isoYear,
    isoWeek,
    location,
    object,
    weekStartUtc: start.toISOString(),
    weekEndUtc: new Date(start.getTime() + 7 * 86_400_000).toISOString(),
    nights,
    selectedNightDateUtc: nights.find((night) => night.status === 'available')?.nightDateUtc ?? nights[0].nightDateUtc,
    calculatedAtUtc: new Date().toISOString(),
    engineVersion: 'astronomy-engine@2.1.19',
  };
}
