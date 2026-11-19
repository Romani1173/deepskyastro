// Utilidades compartidas por la lista de artículos y las páginas web de cada artículo.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';
import { articleHref } from '../i18n';

export type Article = CollectionEntry<'articulos'>;
export type ArticleText = CollectionEntry<'articulosTexto'>;

export const topicNames = {
	ca: { Procesado: 'Processament', 'Captura y calibración': 'Captura i calibratge', 'Planificación': 'Planificació', 'Astronomía solar': 'Astronomia solar' },
	es: { Procesado: 'Procesado', 'Captura y calibración': 'Captura y calibración', 'Planificación': 'Planificación', 'Astronomía solar': 'Astronomía solar' },
	en: { Procesado: 'Processing', 'Captura y calibración': 'Capture and calibration', 'Planificación': 'Planning', 'Astronomía solar': 'Solar astronomy' },
} as const;

/** Título y resumen del artículo en el idioma de la página. */
export const localizedArticle = (article: Article, lang: Lang) => {
	if (lang === 'ca' || !article.data.traducciones) return { titulo: article.data.titulo, resumen: article.data.resumen };
	return article.data.traducciones[lang];
};

/** Textos web disponibles, indexados por `translationKey/idioma`. */
export const articleTexts = async () => new Map((await getCollection('articulosTexto')).map((entry) => [entry.id, entry]));

export const textFor = (texts: Map<string, ArticleText>, article: Article, lang: Lang) => texts.get(`${article.data.translationKey}/${lang}`);

/** URL de la versión web del artículo en ese idioma, o `undefined` si solo hay PDF. */
export const articleWebHref = (texts: Map<string, ArticleText>, article: Article, lang: Lang, base = '/') => {
	const text = textFor(texts, article, lang);
	return text ? articleHref(lang, text.data.ruta ?? article.data.slug, base) : undefined;
};

/** Rutas estáticas de las páginas web de los artículos para un idioma. */
export const articlePaths = async (lang: Lang) => {
	const [articles, texts] = await Promise.all([getCollection('articulos'), articleTexts()]);
	return articles.flatMap((article) => {
		const text = textFor(texts, article, lang);
		return text ? [{ params: { slug: text.data.ruta ?? article.data.slug }, props: { article, text } }] : [];
	});
};
