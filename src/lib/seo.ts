// Utilidades de SEO compartidas: títulos, URL públicas y datos estructurados.
// Solo afectan a lo que ven Google y las pestañas del navegador, no al diseño.
import { PRODUCTION_SITE } from '../consts';
import type { Lang } from '../i18n';

/** Marca que se añade al final de cada título: «… | DeepSkyAstro». */
export const TITLE_BRAND = 'DeepSkyAstro';
const MAX_TITLE = 65;

export const astrophotography = { ca: 'Astrofotografia', es: 'Astrofotografía', en: 'Astrophotography' } as const;
export const astrophotographyGear = { ca: 'Equip d’astrofotografia', es: 'Equipo de astrofotografía', en: 'Astrophotography gear' } as const;

/** «Nombre – Palabra clave» si cabe en un título de buscador; si no, solo el nombre. */
export const titleWith = (name: string, suffix: string) =>
	`${name} – ${suffix} | ${TITLE_BRAND}`.length <= MAX_TITLE ? `${name} – ${suffix}` : name;

/**
 * Distingue las fotos del Sol tomadas el mismo día a partir de su identificador
 * (p. ej. `2024_06_21_03_bn`, `2026_08_12_eclipse_02`, `2026_06_resumen`).
 */
export const sunVariant = (id: string, lang: Lang) => {
	const words = {
		ca: { colour: 'color', bw: 'B/N', eclipse: 'eclipsi', image: 'imatge', mosaic: 'mosaic', summary: 'resum del mes' },
		es: { colour: 'color', bw: 'B/N', eclipse: 'eclipse', image: 'imagen', mosaic: 'mosaico', summary: 'resumen del mes' },
		en: { colour: 'colour', bw: 'B&W', eclipse: 'eclipse', image: 'image', mosaic: 'mosaic', summary: 'monthly summary' },
	}[lang];
	const rest = id.toLowerCase().replace(/^\d{4}_\d{2}(?:_\d{2})?_?/, '');
	if (!rest) return '';
	const parts: string[] = [];
	const eclipse = rest.match(/eclipse(?:_resumen_(\w+)|_(\d+))?/);
	if (eclipse) {
		parts.push(words.eclipse);
		if (eclipse[1]) parts.push(`${words.mosaic} ${eclipse[1].replace('x', '×')}`);
		else if (eclipse[2]) parts.push(`${words.image} ${Number(eclipse[2])}`);
	} else if (rest === 'resumen') {
		parts.push(words.summary);
	} else {
		const number = rest.match(/^(\d+)/);
		if (number) parts.push(`${Number(number[1])}`);
		if (/(^|_)color$/.test(rest)) parts.push(words.colour);
		if (/(^|_)bn$/.test(rest)) parts.push(words.bw);
	}
	return parts.join(', ');
};

/** Recorta un texto a la longitud recomendada para una meta descripción. */
export const shortenDescription = (value: string, limit = 160) => {
	const clean = value.replace(/\s+/g, ' ').trim();
	return clean.length <= limit ? clean : `${clean.slice(0, limit - 1).replace(/\s+\S*$/, '')}…`;
};

/** URL pública en deepskyastro.com (quita el prefijo de GitHub Pages si lo hay). */
export const publicUrl = (path: string, base = '/') => {
	const root = base.endsWith('/') ? base : `${base}/`;
	return new URL(path.startsWith(root) ? `/${path.slice(root.length)}` : path, PRODUCTION_SITE).toString();
};

export const author = { '@type': 'Person', name: 'Juan José Romero', url: `${PRODUCTION_SITE}/` } as const;

/** Licencia de las fotografías (elegida por el autor el 2026-11-19). */
export const IMAGE_LICENSE = {
	name: 'CC BY-NC 4.0',
	url: 'https://creativecommons.org/licenses/by-nc/4.0/',
	legalCode: {
		ca: 'https://creativecommons.org/licenses/by-nc/4.0/deed.ca',
		es: 'https://creativecommons.org/licenses/by-nc/4.0/deed.es',
		en: 'https://creativecommons.org/licenses/by-nc/4.0/deed.en',
	},
} as const;

/**
 * Correo para pedir permiso de uso comercial. Mientras esté vacío, la página
 * «Ús de les imatges» solo indica que hay que pedir permiso al autor.
 */
export const LICENSE_CONTACT_EMAIL = '';

/** BreadcrumbList a partir de pares [nombre, ruta]. */
export const breadcrumbList = (items: Array<[string, string]>, base = '/') => ({
	'@type': 'BreadcrumbList',
	itemListElement: items.map(([name, path], index) => ({ '@type': 'ListItem', position: index + 1, name, item: publicUrl(path, base) })),
});
