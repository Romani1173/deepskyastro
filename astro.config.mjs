// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const outDir = fileURLToPath(new URL('./dist/', import.meta.url));

// Añade al sitemap la imagen principal de cada ficha (fotos y Sol) para Google Imágenes.
// Se lee la imagen `og:image` de la página ya generada, así siempre coincide con la ficha.
const imagePages = /\/(?:foto|photo|sol|sun)\/[^/]+\/$/;
const addPageImage = (item) => {
	const { pathname } = new URL(item.url);
	if (!imagePages.test(pathname)) return item;
	const base = isGitHubPages ? '/deepskyastro' : '';
	const file = `${outDir}${decodeURIComponent(pathname.slice(base.length)).replace(/^\//, '')}index.html`;
	if (!existsSync(file)) return item;
	const image = readFileSync(file, 'utf8').match(/<meta property="og:image" content="([^"]+)"/)?.[1];
	return image ? { ...item, img: [{ url: image }] } : item;
};

// https://astro.build/config
export default defineConfig({
	site: isGitHubPages ? 'https://romani1173.github.io' : 'https://deepskyastro.com',
	base: isGitHubPages ? '/deepskyastro' : '/',
	integrations: [mdx(), sitemap({ serialize: addPageImage })],
	// Inter y Space Mono se descargan al compilar y se sirven desde la propia web:
	// mismas fuentes, sin enviar la IP de cada visitante a Google.
	fonts: [
		{ provider: fontProviders.google(), name: 'Inter', cssVariable: '--font-inter', weights: [400, 600, 700], styles: ['normal'], subsets: ['latin', 'latin-ext'], display: 'optional', fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'] },
		{ provider: fontProviders.google(), name: 'Space Mono', cssVariable: '--font-space-mono', weights: [400], styles: ['normal'], subsets: ['latin', 'latin-ext'], display: 'optional', fallbacks: ['ui-monospace', 'monospace'] },
	],
	redirects: {
		'/foto/vbd_152': '/foto/vdb_152/',
		'/es/foto/vbd_152': '/es/foto/vdb_152/',
		'/en/photo/vbd_152': '/en/photo/vdb_152/',
		'/laboratorio/analizador-equipo': '/es/laboratorio/analizador-equipo/',
	},
});
