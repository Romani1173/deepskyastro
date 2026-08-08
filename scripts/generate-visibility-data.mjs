import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dailySamples, weeklySamples } from './lib/visibility.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const observatory = await readJson('src/data/observatory.json');
const objects = await readJson('src/data/astronomical-objects.json');

const generatedObjects = Object.fromEntries(objects.map((object) => {
  const daily = dailySamples({
    year: observatory.referenceYear,
    latitudeDeg: observatory.latitudeDeg,
    longitudeDeg: observatory.longitudeDeg,
    raDeg: object.raDeg,
    decDeg: object.decDeg,
  });
  return [object.id, {
    catalogName: object.catalogName,
    raDeg: object.raDeg,
    decDeg: object.decDeg,
    daysAboveThreshold: daily.filter(({ altitudeDeg }) => altitudeDeg > observatory.thresholdDeg).length,
    weeks: weeklySamples(daily),
  }];
}));

const result = { observatory, objects: generatedObjects };
const output = resolve(root, 'src/data/visibility.generated.json');
await writeFile(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(`Generated ${objects.length} object(s) in ${output}`);
