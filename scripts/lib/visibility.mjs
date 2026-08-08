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
