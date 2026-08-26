const PREFIXES = /\b(NGC|IC|LDN|LBN|PK|WR|VDB|Abell|Collinder|Caldwell|Barnard|B|M|P)\s*(\d)/gi;
const CANONICAL_PREFIX = new Map([
  ['NGC', 'NGC'], ['IC', 'IC'], ['LDN', 'LDN'], ['LBN', 'LBN'], ['PK', 'PK'], ['WR', 'WR'],
  ['VDB', 'VdB'], ['ABELL', 'Abell'], ['COLLINDER', 'Collinder'], ['CALDWELL', 'Caldwell'],
  ['BARNARD', 'Barnard'], ['B', 'B'], ['M', 'M'], ['P', 'P'],
]);

/** Formats catalogue designations for display without changing stored identifiers. */
export function formatCatalogDesignations(value) {
  if (typeof value !== 'string' || !value) return value;
  return value
    .replace(/\b(SH)\s*2\s*[-–—_]?\s*(\d)/gi, (_match, prefix, digit) => `${prefix === 'Sh' ? 'Sh' : 'SH'} 2-${digit}`)
    .replace(/\bPN\s*G\s*(\d)/gi, (_match, digit) => `PN G ${digit}`)
    .replace(PREFIXES, (_match, prefix, digit) => `${CANONICAL_PREFIX.get(prefix.toUpperCase()) ?? prefix} ${digit}`);
}
