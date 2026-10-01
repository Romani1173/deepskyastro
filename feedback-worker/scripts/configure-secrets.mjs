import { randomBytes } from 'node:crypto';
import { chmodSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const options = Object.fromEntries(process.argv.slice(2).map((argument, index, all) => {
  if (!argument.startsWith('--')) return null;
  return [argument.slice(2), all[index + 1]];
}).filter(Boolean));

if (!options['api-url'] || !options['web-results']) {
  console.error('Uso: npm run secrets:configure -- --api-url URL --web-results RUTA');
  process.exit(1);
}

const apiUrl = options['api-url'].replace(/\/$/, '');
if (!apiUrl.startsWith('https://')) {
  console.error('La URL de la API debe usar HTTPS.');
  process.exit(1);
}

const hashSecret = randomBytes(32).toString('hex');
const adminToken = randomBytes(32).toString('hex');

for (const [name, value] of [
  ['FEEDBACK_HASH_SECRET', hashSecret],
  ['FEEDBACK_ADMIN_TOKEN', adminToken],
]) {
  const result = spawnSync('npx', ['wrangler', 'secret', 'put', name], {
    cwd: resolve(import.meta.dirname, '..'),
    input: `${value}\n`,
    encoding: 'utf8',
    stdio: ['pipe', 'inherit', 'inherit'],
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

const configPath = resolve(options['web-results'], 'config.json');
writeFileSync(configPath, `${JSON.stringify({ api_url: apiUrl, admin_token: adminToken }, null, 2)}\n`, {
  encoding: 'utf8',
  mode: 0o600,
});
chmodSync(configPath, 0o600);
console.log(`Configuración privada guardada en ${configPath}`);
