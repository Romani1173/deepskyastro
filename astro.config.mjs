// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
	site: isGitHubPages ? 'https://romani1173.github.io' : 'https://porfolio-astrofoto.pages.dev',
	base: isGitHubPages ? '/porfolio-astrofoto' : '/',
	integrations: [mdx(), sitemap()],
	redirects: {
		'/foto/vbd_152': '/foto/vdb_152',
		'/es/foto/vbd_152': '/es/foto/vdb_152',
		'/en/photo/vbd_152': '/en/photo/vdb_152',
	},
});
