import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSimbadAngularSize } from '../src/lib/planning/simbad.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = resolve(root, 'src/data/astronomical-objects.json');
const objects = JSON.parse(await readFile(catalogPath, 'utf8'));
const pending = objects.filter((object) => !object.angularSizeArcmin);

const photoDirectory = resolve(root, 'src/content/fotos');
const photoSizes = new Map();
for (const filename of await readdir(photoDirectory)) {
  if (!/\.mdx?$/.test(filename)) continue;
  const markdown = await readFile(resolve(photoDirectory, filename), 'utf8');
  const id = markdown.match(/^objecte_astronomic:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim();
  const characteristics = markdown.match(/^caracteristiques:\s*([\s\S]*?)(?=^(?:categoria|equip|camera|tractament|entorn|traduccions|imatge|visibilitat):)/m)?.[1] ?? '';
  const size = characteristics.match(/(?:mida|tamany)(?:\s+angular)?(?:\s+aparent)?[^0-9]{0,45}(\d+(?:[.,]\d+)?)(?:\s*[×x]\s*(\d+(?:[.,]\d+)?))?\s*(?:minuts|arcmin)/i);
  if (!id || !size) continue;
  const major = Number(size[1].replace(',', '.'));
  const minor = Number((size[2] ?? size[1]).replace(',', '.'));
  if (major > 0 && minor > 0) photoSizes.set(id, { major, minor });
}

async function enrich(object) {
  const identifiers = [object.catalogName, ...(object.aliases ?? [])];
  for (const identifier of identifiers) {
    const url = `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=${encodeURIComponent(identifier)}&output.format=ASCII`;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
      if (!response.ok) continue;
      const angularSizeArcmin = parseSimbadAngularSize(await response.text());
      if (angularSizeArcmin) return { ...object, angularSizeArcmin, angularSizeSource: 'SIMBAD' };
    } catch {}
  }
  const gallerySize = photoSizes.get(object.id);
  return gallerySize ? { ...object, angularSizeArcmin: gallerySize, angularSizeSource: 'gallery' } : object;
}

const concurrency = 6;
let cursor = 0;
const workers = Array.from({ length: concurrency }, async () => {
  while (cursor < pending.length) {
    const index = cursor++;
    pending[index] = await enrich(pending[index]);
    console.log(`${index + 1}/${pending.length} ${pending[index].catalogName}: ${pending[index].angularSizeArcmin ? 'OK' : 'sin dato'}`);
  }
});
await Promise.all(workers);

const enrichedById = new Map(pending.map((object) => [object.id, object]));
const enriched = objects.map((object) => enrichedById.get(object.id) ?? (object.angularSizeArcmin && !object.angularSizeSource ? { ...object, angularSizeSource: 'SIMBAD' } : object));
await writeFile(catalogPath, `${JSON.stringify(enriched, null, 2)}\n`);
console.log(`Actualizados ${enriched.filter((object) => object.angularSizeArcmin).length}/${enriched.length} objetos con tamaño aparente.`);
