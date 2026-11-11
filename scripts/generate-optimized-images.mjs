// Genera copias ligeras (WebP) de las imágenes de `public/imagenes/` y comprueba
// que todas las imágenes declaradas en las fichas existen.
//
// - Los originales no se tocan: se siguen usando para el visor ampliado y las descargas.
// - Las copias se guardan en `public/imagenes/optimizadas/` (no se suben a Git) y se
//   regeneran solo cuando cambia el original.
// - El manifiesto `src/data/optimized-images.generated.json` indica a las plantillas
//   qué tamaños existen para cada imagen.
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const imagesRoot = resolve(root, 'public/imagenes');
const outputRoot = resolve(imagesRoot, 'optimizadas');
const manifestPath = resolve(root, 'src/data/optimized-images.generated.json');
const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Carpeta → anchos generados y calidad WebP.
const groups = [
	{ dir: 'cielo-profundo', widths: [480, 960, 1600], quality: 82 },
	{ dir: 'sol', widths: [480, 960, 1600], quality: 82 },
	{ dir: 'articulos', widths: [480, 960], quality: 82 },
	{ dir: 'portadas', widths: [1280, 1920, 2560], quality: 85 },
];
const socialImage = { source: 'portada.webp', output: 'og/portada-1200x630.jpg', width: 1200, height: 630 };

const listRaster = async (directory) => {
	if (!existsSync(directory)) return [];
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(entries.map(async (entry) => {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) return listRaster(path);
		return RASTER.has(extname(entry.name).toLowerCase()) ? [path] : [];
	}));
	return nested.flat();
};

const isFresh = async (output, sourceMtime) => existsSync(output) && (await stat(output)).mtimeMs >= sourceMtime;
const toPosix = (path) => path.split('\\').join('/');

// --- 1. Comprobar que las fichas solo citan imágenes que existen -------------------
const missing = [];
const checkReferences = async (contentDir, imageDir, patterns) => {
	const directory = resolve(root, contentDir);
	if (!existsSync(directory)) return;
	for (const file of await readdir(directory)) {
		if (!file.endsWith('.md')) continue;
		const text = await readFile(join(directory, file), 'utf8');
		const frontmatter = text.split(/^---\s*$/m)[1] ?? '';
		for (const { pattern, folder = imageDir } of patterns) {
			for (const match of frontmatter.matchAll(pattern)) {
				const name = match[1].trim();
				if (name && !existsSync(resolve(imagesRoot, folder, name))) missing.push(`${contentDir}/${file} → imagenes/${folder}/${name}`);
			}
		}
	}
};
await checkReferences('src/content/fotos', 'cielo-profundo', [
	{ pattern: /^imatge:\s*["']?([^"'\n]+)["']?\s*$/gm },
	{ pattern: /^[ \t]+fitxer:[ \t]*["']?([^"'\n]+)["']?\s*$/gm },
	{ pattern: /^[ \t]+imatge:[ \t]*["']?([^"'\n]+)["']?\s*$/gm, folder: 'visibilidad' },
]);
await checkReferences('src/content/sol', 'sol', [{ pattern: /^imagen:\s*["']?([^"'\n]+)["']?\s*$/gm }]);
if (missing.length) {
	console.error(`\n✗ Hay ${missing.length} imagen(es) citadas en las fichas que no existen:\n  ${missing.join('\n  ')}\n`);
	process.exit(1);
}

// --- 2. Generar las copias ligeras ---------------------------------------------------
const manifest = {};
const jobs = [];
for (const group of groups) {
	for (const source of await listRaster(resolve(imagesRoot, group.dir))) {
		const key = toPosix(relative(imagesRoot, source));
		jobs.push(async () => {
			const { mtimeMs } = await stat(source);
			const metadata = await sharp(source).metadata();
			const width = metadata.autoOrient?.width ?? metadata.width;
			const height = metadata.autoOrient?.height ?? metadata.height;
			const variants = {};
			for (const targetWidth of group.widths) {
				if (targetWidth >= width) continue;
				const outputKey = `optimizadas/${key.replace(/\.[^.]+$/, '')}-${targetWidth}.webp`;
				const output = resolve(imagesRoot, outputKey);
				if (!await isFresh(output, mtimeMs)) {
					await mkdir(dirname(output), { recursive: true });
					await sharp(source).rotate().resize({ width: targetWidth, withoutEnlargement: true })
						.webp({ quality: group.quality, effort: 5, smartSubsample: true }).toFile(output);
				}
				variants[targetWidth] = outputKey;
			}
			manifest[key] = { width, height, variants };
		});
	}
}
jobs.push(async () => {
	const source = resolve(imagesRoot, socialImage.source);
	const output = resolve(outputRoot, socialImage.output);
	if (!existsSync(source)) return;
	if (!await isFresh(output, (await stat(source)).mtimeMs)) {
		await mkdir(dirname(output), { recursive: true });
		await sharp(source).resize(socialImage.width, socialImage.height, { fit: 'cover', position: 'attention' })
			.jpeg({ quality: 85, mozjpeg: true }).toFile(output);
	}
});

const started = Date.now();
const queue = [...jobs];
await Promise.all(Array.from({ length: Math.max(1, Math.min(4, availableParallelism())) }, async () => {
	while (queue.length) await queue.shift()();
}));

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(manifestPath, `${JSON.stringify(sorted, null, '\t')}\n`);
console.log(`✓ Imágenes optimizadas: ${Object.keys(sorted).length} originales revisados en ${((Date.now() - started) / 1000).toFixed(1)} s`);
