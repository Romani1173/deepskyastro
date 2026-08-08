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
  return Array.from({ length: 52 }, (_, index) => {
    const group = daily.slice(index * 7, index * 7 + 7);
    const middle = group[Math.floor(group.length / 2)];
    return { week: index + 1, date: middle.date, altitudeDeg: Number(middle.altitudeDeg.toFixed(1)) };
  });
}

export function nightMetrics({ date, latitudeDeg, longitudeDeg, raDeg, decDeg, twilightDeg = -18, sampleMinutes = 10, thresholdsDeg = [20, 25, 30] }) {
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
  const nights = Array.from({ length: 364 }, (_, index) => nightMetrics({ ...options, date: new Date(Date.UTC(options.year, 0, index + 1)) }));
  return Array.from({ length: 52 }, (_, index) => {
    const group = nights.slice(index * 7, index * 7 + 7).filter(Boolean);
    if (group.length === 0) return { week: index + 1, available: false };
    const best = group.reduce((current, night) => night.maxAltitudeDeg > current.maxAltitudeDeg ? night : current);
    const hoursAbove = Object.fromEntries(options.thresholdsDeg.map((threshold) => [threshold, Math.max(...group.map((night) => night.hoursAbove[threshold]))]));
    const maxAltitudeDeg = Math.max(...group.map((night) => night.maxAltitudeDeg));
    const quality = maxAltitudeDeg >= 50 && hoursAbove[30] >= 3
      ? 'excellent'
      : maxAltitudeDeg >= 30 && hoursAbove[30] > 0
        ? 'good'
        : maxAltitudeDeg >= 20
          ? 'low'
          : maxAltitudeDeg >= 0 ? 'very-low' : 'not-visible';
    return {
      week: index + 1,
      available: true,
      representativeNight: best.night,
      maxDarknessHours: Math.max(...group.map((night) => night.darknessHours)),
      maxAltitudeDeg,
      bestTimeUtc: best.bestTimeUtc,
      hoursAbove,
      quality,
    };
  });
}
