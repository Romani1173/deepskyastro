const DEG = Math.PI / 180;

export function julianDate(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

export function normalizeDegrees(value) {
  return ((value % 360) + 360) % 360;
}

export function altitudeDeg({ date, latitudeDeg, longitudeDeg, raDeg, decDeg }) {
  const daysSinceJ2000 = julianDate(date) - 2451545;
  const gmstDeg = normalizeDegrees(280.46061837 + 360.98564736629 * daysSinceJ2000);
  const hourAngleDeg = normalizeDegrees(gmstDeg + longitudeDeg - raDeg + 180) - 180;
  const latitude = latitudeDeg * DEG;
  const declination = decDeg * DEG;
  const hourAngle = hourAngleDeg * DEG;
  const sineAltitude = Math.sin(latitude) * Math.sin(declination)
    + Math.cos(latitude) * Math.cos(declination) * Math.cos(hourAngle);
  return Math.asin(Math.max(-1, Math.min(1, sineAltitude))) / DEG;
}

export function sunEquatorial(date) {
  const daysSinceJ2000 = julianDate(date) - 2451545;
  const meanLongitude = normalizeDegrees(280.46 + 0.9856474 * daysSinceJ2000);
  const meanAnomaly = normalizeDegrees(357.528 + 0.9856003 * daysSinceJ2000) * DEG;
  const eclipticLongitude = normalizeDegrees(meanLongitude + 1.915 * Math.sin(meanAnomaly) + 0.02 * Math.sin(2 * meanAnomaly)) * DEG;
  const obliquity = (23.439 - 0.0000004 * daysSinceJ2000) * DEG;
  return {
    raDeg: normalizeDegrees(Math.atan2(Math.cos(obliquity) * Math.sin(eclipticLongitude), Math.cos(eclipticLongitude)) / DEG),
    decDeg: Math.asin(Math.sin(obliquity) * Math.sin(eclipticLongitude)) / DEG,
  };
}

export function sunAltitudeDeg({ date, latitudeDeg, longitudeDeg }) {
  return altitudeDeg({ date, latitudeDeg, longitudeDeg, ...sunEquatorial(date) });
}

export function moonEquatorial(date) {
  const days = julianDate(date) - 2451543.5;
  const node = normalizeDegrees(125.1228 - 0.0529538083 * days) * DEG;
  const inclination = 5.1454 * DEG;
  const periapsis = normalizeDegrees(318.0634 + 0.1643573223 * days) * DEG;
  const eccentricity = 0.0549;
  const meanAnomalyDeg = normalizeDegrees(115.3654 + 13.0649929509 * days);
  const meanAnomaly = meanAnomalyDeg * DEG;
  const eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(meanAnomaly) * (1 + eccentricity * Math.cos(meanAnomaly));
  const orbitalX = 60.2666 * (Math.cos(eccentricAnomaly) - eccentricity);
  const orbitalY = 60.2666 * Math.sqrt(1 - eccentricity ** 2) * Math.sin(eccentricAnomaly);
  const trueAnomaly = Math.atan2(orbitalY, orbitalX);
  const distanceEarthRadii = Math.hypot(orbitalX, orbitalY);
  const argument = trueAnomaly + periapsis;
  const eclipticX = distanceEarthRadii * (Math.cos(node) * Math.cos(argument) - Math.sin(node) * Math.sin(argument) * Math.cos(inclination));
  const eclipticY = distanceEarthRadii * (Math.sin(node) * Math.cos(argument) + Math.cos(node) * Math.sin(argument) * Math.cos(inclination));
  const eclipticZ = distanceEarthRadii * Math.sin(argument) * Math.sin(inclination);
  let longitudeDeg = Math.atan2(eclipticY, eclipticX) / DEG;
  let latitudeDeg = Math.atan2(eclipticZ, Math.hypot(eclipticX, eclipticY)) / DEG;
  const sunMeanAnomaly = normalizeDegrees(356.047 + 0.9856002585 * days);
  const sunPeriapsis = normalizeDegrees(282.9404 + 4.70935e-5 * days);
  const sunLongitude = normalizeDegrees(sunMeanAnomaly + sunPeriapsis);
  const meanLongitude = normalizeDegrees(meanAnomalyDeg + periapsis / DEG + node / DEG);
  const elongation = normalizeDegrees(meanLongitude - sunLongitude);
  const argumentLatitude = normalizeDegrees(meanLongitude - node / DEG);
  const sine = (degrees) => Math.sin(degrees * DEG);
  longitudeDeg += -1.274 * sine(meanAnomalyDeg - 2 * elongation) + 0.658 * sine(2 * elongation) - 0.186 * sine(sunMeanAnomaly) - 0.059 * sine(2 * meanAnomalyDeg - 2 * elongation) - 0.057 * sine(meanAnomalyDeg - 2 * elongation + sunMeanAnomaly) + 0.053 * sine(meanAnomalyDeg + 2 * elongation) + 0.046 * sine(2 * elongation - sunMeanAnomaly) + 0.041 * sine(meanAnomalyDeg - sunMeanAnomaly) - 0.035 * sine(elongation) - 0.031 * sine(meanAnomalyDeg + sunMeanAnomaly) - 0.015 * sine(2 * argumentLatitude - 2 * elongation) + 0.011 * sine(meanAnomalyDeg - 4 * elongation);
  latitudeDeg += -0.173 * sine(argumentLatitude - 2 * elongation) - 0.055 * sine(meanAnomalyDeg - argumentLatitude - 2 * elongation) - 0.046 * sine(meanAnomalyDeg + argumentLatitude - 2 * elongation) + 0.033 * sine(argumentLatitude + 2 * elongation) + 0.017 * sine(2 * meanAnomalyDeg + argumentLatitude);
  const longitude = longitudeDeg * DEG;
  const latitude = latitudeDeg * DEG;
  const obliquity = (23.4393 - 3.563e-7 * days) * DEG;
  const x = Math.cos(longitude) * Math.cos(latitude);
  const y = Math.sin(longitude) * Math.cos(latitude);
  const z = Math.sin(latitude);
  const equatorialY = y * Math.cos(obliquity) - z * Math.sin(obliquity);
  const equatorialZ = y * Math.sin(obliquity) + z * Math.cos(obliquity);
  return {
    raDeg: normalizeDegrees(Math.atan2(equatorialY, x) / DEG),
    decDeg: Math.asin(equatorialZ) / DEG,
    distanceEarthRadii,
    phaseAngleDeg: normalizeDegrees(longitudeDeg - sunLongitude),
  };
}

export function moonAltitudeDeg({ date, latitudeDeg, longitudeDeg }) {
  const moon = moonEquatorial(date);
  const geocentricAltitude = altitudeDeg({ date, latitudeDeg, longitudeDeg, raDeg: moon.raDeg, decDeg: moon.decDeg });
  const parallaxDeg = Math.asin(Math.cos(geocentricAltitude * DEG) / moon.distanceEarthRadii) / DEG;
  return geocentricAltitude - parallaxDeg;
}

export function moonPhaseIndex(date) {
  return Math.floor((moonEquatorial(date).phaseAngleDeg + 22.5) / 45) % 8;
}

export function dailySamples({ year, latitudeDeg, longitudeDeg, raDeg, decDeg }) {
  const samples = [];
  for (let timestamp = Date.UTC(year, 0, 1); timestamp < Date.UTC(year + 1, 0, 1); timestamp += 86400000) {
    const date = new Date(timestamp);
    samples.push({
      date: date.toISOString().slice(0, 10),
      altitudeDeg: altitudeDeg({ date, latitudeDeg, longitudeDeg, raDeg, decDeg }),
    });
  }
  return samples;
}

export function weeklySamples(daily) {
  const year = Number(daily[0].date.slice(0, 4));
  const byDate = new Map(daily.map((sample) => [sample.date, sample]));
  const januaryFourth = new Date(Date.UTC(year, 0, 4));
  const firstMonday = new Date(januaryFourth.getTime() - ((januaryFourth.getUTCDay() || 7) - 1) * 86400000);
  const weeks = [];
  for (let index = 0; index < 53; index += 1) {
    const thursday = new Date(firstMonday.getTime() + (index * 7 + 3) * 86400000);
    if (thursday.getUTCFullYear() !== year) break;
    const date = thursday.toISOString().slice(0, 10);
    const sample = byDate.get(date);
    weeks.push({ week: index + 1, date, altitudeDeg: Number(sample.altitudeDeg.toFixed(1)) });
  }
  return weeks;
}

export function thresholdPeriods(daily, thresholdDeg) {
  const periods = [];
  let start = null;
  for (let index = 0; index < daily.length; index += 1) {
    const sample = daily[index];
    if (sample.altitudeDeg > thresholdDeg && start === null) start = sample.date;
    if (sample.altitudeDeg <= thresholdDeg && start !== null) {
      const previous = daily[index - 1];
      periods.push({ start, end: previous.date });
      start = null;
    }
  }
  if (start !== null) periods.push({ start, end: daily.at(-1).date });
  if (periods.length > 1 && periods[0].start === daily[0].date && periods.at(-1).end === daily.at(-1).date) {
    return [{ start: periods.at(-1).start, end: periods[0].end, wrapsYear: true }, ...periods.slice(1, -1)];
  }
  return periods;
}

export function nightMetrics({ date, latitudeDeg, longitudeDeg, raDeg, decDeg, twilightDeg = -18, sampleMinutes = 10, thresholdsDeg = [30] }) {
  const start = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12);
  const stepMs = sampleMinutes * 60000;
  const darkSamples = [];
  for (let timestamp = start; timestamp < start + 86400000; timestamp += stepMs) {
    const instant = new Date(timestamp);
    if (sunAltitudeDeg({ date: instant, latitudeDeg, longitudeDeg }) <= twilightDeg) {
      darkSamples.push({ date: instant, altitudeDeg: altitudeDeg({ date: instant, latitudeDeg, longitudeDeg, raDeg, decDeg }) });
    }
  }
  if (darkSamples.length === 0) return null;
  const best = darkSamples.reduce((current, sample) => sample.altitudeDeg > current.altitudeDeg ? sample : current);
  return {
    night: date.toISOString().slice(0, 10),
    darknessHours: Number((darkSamples.length * sampleMinutes / 60).toFixed(1)),
    maxAltitudeDeg: Number(best.altitudeDeg.toFixed(1)),
    bestTimeUtc: best.date.toISOString(),
    hoursAbove: Object.fromEntries(thresholdsDeg.map((threshold) => [threshold, Number((darkSamples.filter(({ altitudeDeg }) => altitudeDeg >= threshold).length * sampleMinutes / 60).toFixed(1))])),
  };
}

export function weeklyNightSamples(options) {
  const januaryFourth = new Date(Date.UTC(options.year, 0, 4));
  const weekday = januaryFourth.getUTCDay() || 7;
  const firstMonday = new Date(januaryFourth.getTime() - (weekday - 1) * 86400000);
  const weeks = [];
  for (let index = 0; index < 53; index += 1) {
    const monday = new Date(firstMonday.getTime() + index * 7 * 86400000);
    const thursday = new Date(monday.getTime() + 3 * 86400000);
    if (thursday.getUTCFullYear() !== options.year) break;
    const group = Array.from({ length: 7 }, (_, day) => nightMetrics({
      ...options,
      date: new Date(monday.getTime() + day * 86400000),
    })).filter(Boolean);
    if (group.length === 0) {
      weeks.push({ week: index + 1, available: false });
      continue;
    }
    const best = group.reduce((current, night) => night.maxAltitudeDeg > current.maxAltitudeDeg ? night : current);
    const hoursAbove = Object.fromEntries(options.thresholdsDeg.map((threshold) => [threshold, Math.max(...group.map((night) => night.hoursAbove[threshold]))]));
    const maxAltitudeDeg = Math.max(...group.map((night) => night.maxAltitudeDeg));
    const quality = hoursAbove[30] >= 8
      ? 'excellent'
      : hoursAbove[30] >= 4
        ? 'good'
        : null;
    weeks.push({
      week: index + 1,
      available: true,
      representativeNight: best.night,
      maxDarknessHours: Math.max(...group.map((night) => night.darknessHours)),
      maxAltitudeDeg,
      bestTimeUtc: best.bestTimeUtc,
      hoursAbove,
      quality,
    });
  }
  return weeks;
}
