import { formatCatalogDesignations } from '../catalog-formatting.mjs';

const compact = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9+-]/gi, '').toLocaleLowerCase();

export function findLocalObject(objects, query) {
  const needle = compact(query);
  if (!needle) return undefined;
  return objects.find((object) => [object.id, object.catalogName, object.commonName].filter(Boolean).some((value) => compact(value) === needle));
}

const decodeXml = (value) => value
  .replaceAll('&amp;', '&').replaceAll('&#43;', '+').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').trim();

export function parseSesameXml(xml, fallbackName = '') {
  const value = (tag) => decodeXml(xml.match(new RegExp(`<${tag}>([^<]+)</${tag}>`))?.[1] ?? '');
  const raDeg = Number(value('jradeg'));
  const decDeg = Number(value('jdedeg'));
  if (!Number.isFinite(raDeg) || !Number.isFinite(decDeg)) throw new Error('unresolved');
  const canonicalName = value('oname') || fallbackName;
  return { displayName: formatCatalogDesignations(canonicalName), canonicalName, raDeg, decDeg, epoch: 'J2000', frame: 'ICRS', source: 'simbad' };
}

export function parseSimbadAliases(text) {
  const block = text.match(/Identifiers\s*\(\d+\):\s*\n([\s\S]*?)(?:\n\s*\n|$)/)?.[1] ?? '';
  const aliases = block.split('\n').flatMap((line) => (line.slice(3).match(/.{1,37}/g) ?? []))
    .map((identifier) => identifier.trim()).filter((identifier) => identifier.startsWith('NAME '))
    .map((identifier) => identifier.slice(5).trim()).filter(Boolean);
  const tokenFrequency = new Map();
  aliases.forEach((alias) => alias.toLocaleLowerCase().split(/[^a-z]+/).filter((token) => token.length > 3).forEach((token) => tokenFrequency.set(token, (tokenFrequency.get(token) ?? 0) + 1)));
  const score = (alias) => alias.length + alias.toLocaleLowerCase().split(/[^a-z]+/).filter((token) => token.length > 3 && tokenFrequency.get(token) === 1).length * 10;
  return aliases.sort((a, b) => score(b) - score(a) || a.localeCompare(b))[0];
}

export function parseSimbadAngularSize(text) {
  const match = text.match(/^Angular size:\s+([\d.]+|~)\s+([\d.]+|~)/m);
  if (!match || match[1] === '~') return undefined;
  const major = Number(match[1]);
  const minor = match[2] === '~' ? major : Number(match[2]);
  if (!Number.isFinite(major) || !Number.isFinite(minor) || major <= 0 || minor <= 0) return undefined;
  return { major, minor };
}

export async function resolveSimbad(query, fetchImpl = fetch) {
  const normalized = query.trim();
  if (!normalized) throw new Error('empty-query');
  const url = `https://cds.unistra.fr/cgi-bin/nph-sesame/-oxp/SNV?${encodeURIComponent(normalized)}`;
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`http-${response.status}`);
  const object = parseSesameXml(await response.text(), normalized);
  try {
    const identifiersUrl = `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=${encodeURIComponent(object.canonicalName)}&output.format=ASCII`;
    const identifiersResponse = await fetchImpl(identifiersUrl, { signal: AbortSignal.timeout(15_000) });
    if (!identifiersResponse.ok) return object;
    const identifiersText = await identifiersResponse.text();
    const alias = parseSimbadAliases(identifiersText);
    const angularSizeArcmin = parseSimbadAngularSize(identifiersText);
    return { ...object, ...(alias ? { alias, displayName: `${object.displayName} · ${alias}` } : {}), ...(angularSizeArcmin ? { angularSizeArcmin } : {}) };
  } catch { return object; }
}
