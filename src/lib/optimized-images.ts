// Devuelve `src` y `srcset` con las copias ligeras que crea
// `scripts/generate-optimized-images.mjs`. Si una imagen no tiene copias
// (por ejemplo, porque es más pequeña que el menor tamaño), se usa el original.
import manifest from '../data/optimized-images.generated.json';
import { withBase } from '../i18n';

type ManifestEntry = { width: number; height: number; variants: Record<string, string> };
const entries = manifest as Record<string, ManifestEntry>;

/** Tamaños habituales para el atributo `sizes`. */
export const imageSizes = {
	/** Tarjetas de la galería, el Sol, la visibilidad y los artículos. */
	card: '(min-width: 1212px) 380px, (min-width: 640px) 50vw, 100vw',
	/** Imagen principal de una ficha (ancho máximo del contenido: 1180 px). */
	detail: '(min-width: 1212px) 1180px, calc(100vw - 2rem)',
	/** Rejilla de dos columnas de imágenes adicionales. */
	half: '(min-width: 1212px) 580px, 50vw',
};

const url = (path: string, base: string) => encodeURI(withBase(`imagenes/${path}`, base));

/**
 * @param path Ruta dentro de `public/imagenes/`, p. ej. `cielo-profundo/M31.jpg`.
 * @param maxWidth Ancho máximo que se ofrecerá. Sin límite, el original entra en el `srcset`.
 */
export const optimizedImage = (path: string, base = '/', maxWidth = Number.POSITIVE_INFINITY) => {
	const original = withBase(`imagenes/${path}`, base);
	const entry = entries[path];
	if (!entry) return { src: original, srcset: undefined };
	const variants = Object.entries(entry.variants)
		.map(([width, file]) => ({ width: Number(width), file }))
		.filter(({ width }) => width <= maxWidth)
		.sort((a, b) => a.width - b.width);
	if (!variants.length) return { src: original, srcset: undefined };
	const candidates = variants.map(({ width, file }) => `${url(file, base)} ${width}w`);
	const includeOriginal = !Number.isFinite(maxWidth) || entry.width <= maxWidth;
	if (includeOriginal) candidates.push(`${encodeURI(original)} ${entry.width}w`);
	return {
		src: includeOriginal ? original : withBase(`imagenes/${variants[variants.length - 1].file}`, base),
		srcset: candidates.join(', '),
	};
};

/** Variante concreta (o el original si no existe), para usos fuera de `<img>`. */
export const optimizedVariant = (path: string, width: number, base = '/') => {
	const file = entries[path]?.variants[String(width)];
	return withBase(`imagenes/${file ?? path}`, base);
};
