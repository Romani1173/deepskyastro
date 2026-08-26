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

export async function resolveSimbad(query, fetchImpl = fetch) {
  const normalized = query.trim();
  if (!normalized) throw new Error('empty-query');
  const url = `https://cds.unistra.fr/cgi-bin/nph-sesame/-oxp/SNV?${encodeURIComponent(normalized)}`;
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`http-${response.status}`);
  return parseSesameXml(await response.text(), normalized);
}
