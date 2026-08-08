import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const photosDir = resolve(root, 'src/content/fotos');
const catalogPath = resolve(root, 'src/data/astronomical-objects.json');

const overrides = {
  '12p_pons-brooks': null,
  'c2022_e3': null,
  'SN2023ixf': { id: 'm101', query: 'M 101' },
  'beta1-2_cygni': { id: 'albireo', query: '* bet Cyg', catalogName: 'Albireo' },
  'collinder_399': { id: 'collinder399', query: 'Cl Collinder 399', catalogName: 'Collinder 399' },
  'b150': { id: 'b150', query: 'Barnard 150', catalogName: 'B150' },
  'pk064_051': { id: 'pk064-051', query: 'PK 064+05.1', catalogName: 'PK064+05.1' },
  'vdb_152': { id: 'vdb152', query: 'VdB 152', catalogName: 'VdB152' },
  'ic410+ic417': { id: 'ic410', query: 'IC 410' },
  'm65+m66': { id: 'm65', query: 'M 65' },
  'm81+m82': { id: 'm81', query: 'M 81' },
  'm84+m86': { id: 'm84', query: 'M 84' },
  'ngc869+NGC884': { id: 'ngc869', query: 'NGC 869' },
  'ngc6939': { id: 'ngc6946', query: 'NGC 6946' },
  'ngc6946+ngc6939': { id: 'ngc6946', query: 'NGC 6946' },
};

const deriveTarget = (stem) => {
  if (Object.hasOwn(overrides, stem)) return overrides[stem];
  const id = stem.toLowerCase()
    .replace(/\((hoo|sho|ha)\)$/i, '')
    .replace(/_(hoo|sho|ha|cwv|ev)$/i, '')
    .replace(/_nn_2026$|_2026$/i, '');
  if (id === 'ic1318') return { id, query: 'GAM CYG' };
  if (id.startsWith('sh2_')) return { id: id.replace('_', '-'), query: id.replace('sh2_', 'Sh 2-') };
  if (id.startsWith('ldn')) return { id, query: id.replace('ldn', 'LDN ') };
  if (id.startsWith('abell')) return { id, query: id.replace('abell', 'PN A66 ') };
  if (id.startsWith('wr')) return { id, query: id.replace('wr', 'WR ') };
  const match = id.match(/^(ngc|ic|m)(\d+)$/);
  if (match) return { id, query: `${match[1].toUpperCase()} ${match[2]}` };
  return { id, query: id.toUpperCase().replaceAll('_', ' ') };
};

const decodeXml = (value) => value.replaceAll('&amp;', '&').replaceAll('&#43;', '+').trim();
const xmlValue = (xml, tag) => decodeXml(xml.match(new RegExp(`<${tag}>([^<]+)</${tag}>`))?.[1] ?? '');
const resolveSesame = async (query) => {
  const url = `https://cds.unistra.fr/cgi-bin/nph-sesame/-oxp/SNV?${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const xml = await response.text();
  const raDeg = Number(xmlValue(xml, 'jradeg'));
  const decDeg = Number(xmlValue(xml, 'jdedeg'));
  if (!Number.isFinite(raDeg) || !Number.isFinite(decDeg)) throw new Error('unresolved');
  return { raDeg, decDeg, resolvedName: xmlValue(xml, 'oname') || query };
};

const files = (await readdir(photosDir)).filter((file) => file.endsWith('.md')).sort();
const assignments = files.map((file) => ({ file, target: deriveTarget(basename(file, '.md')) }));
const existing = JSON.parse(await readFile(catalogPath, 'utf8'));
const byId = new Map(existing.map((object) => [object.id, { ...object, status: 'photographed' }]));
const unresolved = [];

const queue = [...new Map(assignments
  .filter(({ target }) => target && !byId.has(target.id))
  .map(({ target }) => [target.id, target])).values()];
const resolveWorker = async () => {
  while (queue.length) {
    const target = queue.shift();
    try {
      const coordinate = await resolveSesame(target.query);
      byId.set(target.id, {
        id: target.id,
        catalogName: target.catalogName ?? target.query.replaceAll(' ', ''),
        aliases: coordinate.resolvedName === target.query ? [] : [coordinate.resolvedName],
        raDeg: coordinate.raDeg,
        decDeg: coordinate.decDeg,
        coordinateSource: 'CDS Sesame / SIMBAD',
        coordinateEpoch: 'J2000',
        status: 'photographed',
      });
      console.log(`✓ ${target.id}: ${coordinate.raDeg}, ${coordinate.decDeg}`);
    } catch (error) {
      unresolved.push({ ...target, error: error.message });
      console.warn(`✗ ${target.id}: ${error.message}`);
    }
  }
};
await Promise.all(Array.from({ length: 6 }, resolveWorker));

if (unresolved.length) {
  console.error('\nUnresolved objects:');
  console.error(JSON.stringify(unresolved, null, 2));
  process.exitCode = 1;
} else {
  const catalog = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
  for (const { file, target } of assignments) {
    const path = resolve(photosDir, file);
    const source = await readFile(path, 'utf8');
    if (!target) {
      if (!source.includes('\nvisibilitat_variable:')) await writeFile(path, source.replace(/^(objecte:.*)$/m, '$1\nvisibilitat_variable: true'));
      continue;
    }
    if (source.includes('\nobjecte_astronomic:')) continue;
    await writeFile(path, source.replace(/^(objecte:.*)$/m, `$1\nobjecte_astronomic: "${target.id}"`));
  }
  console.log(`\nMigrated ${catalog.length} fixed objects across ${assignments.filter(({ target }) => target).length} photos.`);
  console.log(`${assignments.filter(({ target }) => !target).length} moving-object photos remain outside the fixed-coordinate planner.`);
}
