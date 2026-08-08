export type Lang = 'ca' | 'es' | 'en';
export type CategoryKey = 'galaxies' | 'nebulae' | 'clusters' | 'sun';

export const languages: Lang[] = ['ca', 'es', 'en'];

export const categories: Array<{
	key: CategoryKey;
	value: 'Galàxies' | 'Nebuloses' | 'Cúmuls i Estrelles' | 'Sol';
	labels: Record<Lang, string>;
	slugs: Record<Lang, string>;
}> = [
	{ key: 'galaxies', value: 'Galàxies', labels: { ca: 'Galàxies', es: 'Galaxias', en: 'Galaxies' }, slugs: { ca: 'Gal%C3%A0xies', es: 'Galaxias', en: 'Galaxies' } },
	{ key: 'nebulae', value: 'Nebuloses', labels: { ca: 'Nebuloses', es: 'Nebulosas', en: 'Nebulae' }, slugs: { ca: 'Nebuloses', es: 'Nebulosas', en: 'Nebulae' } },
	{ key: 'clusters', value: 'Cúmuls i Estrelles', labels: { ca: 'Cúmuls i estrelles', es: 'Cúmulos y estrellas', en: 'Clusters and stars' }, slugs: { ca: 'C%C3%BAmuls%20i%20Estrelles', es: 'Cumulos-y-estrellas', en: 'Clusters-and-stars' } },
	{ key: 'sun', value: 'Sol', labels: { ca: 'Sol', es: 'Sol', en: 'Sun' }, slugs: { ca: 'Sol', es: 'Sol', en: 'Sun' } },
];

export const copy = {
	ca: {
		siteDescription: 'Un recull personal de fotografies de cel profund.',
		home: 'Inici', catalogue: 'Galeria', articles: 'Articles', myEquipment: 'El meu equip', all: 'Tots', backHome: 'Tornar a la portada', backCatalogue: 'Tornar a la galeria',
		explore: 'Explora la galeria', categoryNav: 'Filtra per categoria', search: 'Cerca a la galeria', searchPlaceholder: 'M31, NGC2237, …',
		order: 'Ordena', recent: 'Data: recents', name: 'Nom: A–Z', object: 'objecte', objects: 'objectes', photographedObject: 'objecte fotografiat', photographedObjects: 'objectes fotografiats',
		noResults: "No s'ha trobat cap objecte amb aquesta cerca.", emptyCategory: 'Encara no hi ha cap fotografia en aquesta categoria.',
		viewPhoto: 'Veure la fitxa de', astroPhoto: 'Fotografia astronòmica de', constellation: 'Constel·lació', exposure: 'Exposició', includesProcess: 'Inclou el flux de postprocessament', featureLegend: 'Indicadors disponibles', processIndicator: 'Flux de postprocessament', visibilityIndicator: 'Visibilitat anual', openDirect: 'Obrir directament', featurePreview: 'Vista ampliada del recurs',
		generalInfo: 'Informació general', category: 'Categoria', date: 'Data', captureSessions: 'Sessions de captura', capture: 'Captura', totalTime: 'Temps total', subframes: 'Subframes', gainOffset: 'Guany / Offset', calibration: 'Calibratge',
		equipment: 'Equip', telescope: 'Telescopi', camera: 'Càmera', filters: 'Filtres', mount: 'Muntura', guiding: 'Guiat', focuser: 'Enfocador', filterWheel: 'Roda de filtres',
		processingEnvironment: 'Processat i entorn', processing: 'Processat', acquisition: 'Adquisició', place: 'Lloc', sky: 'Cel', annualVisibility: 'Visibilitat anual', visibilityChart: 'Diagrama de visibilitat anual de', visibilityCaption: (days: number) => `${days} dies l’any per sobre de +30° a les 00:00 UTC des de 41° N, 1,5° E.`, additionalVersions: 'Versions addicionals', enlarge: 'Ampliar', enlargedImage: 'Imatge ampliada', closeImage: 'Tancar la imatge ampliada', previousImage: 'Imatge anterior', nextImage: 'Imatge següent',
		languageSelector: 'Selecciona l’idioma', backToCategory: (category: string) => `Tornar a ${category}`, categoryDescription: (category: string) => `Fotografies de ${category.toLocaleLowerCase('ca')} de la meva galeria de cel profund.`,
	},
	es: {
		siteDescription: 'Una colección personal de fotografías de cielo profundo.',
		home: 'Inicio', catalogue: 'Galería', articles: 'Artículos', myEquipment: 'Mi equipo', all: 'Todas', backHome: 'Volver a la portada', backCatalogue: 'Volver a la galería',
		explore: 'Explora la galería', categoryNav: 'Filtrar por categoría', search: 'Buscar en la galería', searchPlaceholder: 'M31, NGC2237, …',
		order: 'Ordenar', recent: 'Fecha: recientes', name: 'Nombre: A–Z', object: 'objeto', objects: 'objetos', photographedObject: 'objeto fotografiado', photographedObjects: 'objetos fotografiados',
		noResults: 'No se ha encontrado ningún objeto con esta búsqueda.', emptyCategory: 'Todavía no hay ninguna fotografía en esta categoría.',
		viewPhoto: 'Ver la ficha de', astroPhoto: 'Fotografía astronómica de', constellation: 'Constelación', exposure: 'Exposición', includesProcess: 'Incluye el flujo de posprocesado', featureLegend: 'Indicadores disponibles', processIndicator: 'Flujo de posprocesado', visibilityIndicator: 'Visibilidad anual', openDirect: 'Abrir directamente', featurePreview: 'Vista ampliada del recurso',
		generalInfo: 'Información general', category: 'Categoría', date: 'Fecha', captureSessions: 'Sesiones de captura', capture: 'Captura', totalTime: 'Tiempo total', subframes: 'Subframes', gainOffset: 'Ganancia / Offset', calibration: 'Calibración',
		equipment: 'Equipo', telescope: 'Telescopio', camera: 'Cámara', filters: 'Filtros', mount: 'Montura', guiding: 'Guiado', focuser: 'Enfocador', filterWheel: 'Rueda de filtros',
		processingEnvironment: 'Procesado y entorno', processing: 'Procesado', acquisition: 'Adquisición', place: 'Lugar', sky: 'Cielo', annualVisibility: 'Visibilidad anual', visibilityChart: 'Diagrama de visibilidad anual de', visibilityCaption: (days: number) => `${days} días al año por encima de +30° a las 00:00 UTC desde 41° N, 1,5° E.`, additionalVersions: 'Versiones adicionales', enlarge: 'Ampliar', enlargedImage: 'Imagen ampliada', closeImage: 'Cerrar la imagen ampliada', previousImage: 'Imagen anterior', nextImage: 'Imagen siguiente',
		languageSelector: 'Selecciona el idioma', backToCategory: (category: string) => `Volver a ${category}`, categoryDescription: (category: string) => `Fotografías de ${category.toLocaleLowerCase('es')} de mi galería de cielo profundo.`,
	},
	en: {
		siteDescription: 'A personal collection of deep-sky photographs.',
		home: 'Home', catalogue: 'Gallery', articles: 'Articles', myEquipment: 'My equipment', all: 'All', backHome: 'Back to the home page', backCatalogue: 'Back to the gallery',
		explore: 'Explore the gallery', categoryNav: 'Filter by category', search: 'Search the gallery', searchPlaceholder: 'M31, NGC2237, …',
		order: 'Sort', recent: 'Date: newest', name: 'Name: A–Z', object: 'object', objects: 'objects', photographedObject: 'photographed object', photographedObjects: 'photographed objects',
		noResults: 'No objects match this search.', emptyCategory: 'There are no photographs in this category yet.',
		viewPhoto: 'View the details for', astroPhoto: 'Astronomical photograph of', constellation: 'Constellation', exposure: 'Exposure', includesProcess: 'Includes the post-processing workflow', featureLegend: 'Available indicators', processIndicator: 'Post-processing workflow', visibilityIndicator: 'Annual visibility', openDirect: 'Open directly', featurePreview: 'Enlarged resource preview',
		generalInfo: 'General information', category: 'Category', date: 'Date', captureSessions: 'Capture sessions', capture: 'Capture', totalTime: 'Total time', subframes: 'Subframes', gainOffset: 'Gain / Offset', calibration: 'Calibration',
		equipment: 'Equipment', telescope: 'Telescope', camera: 'Camera', filters: 'Filters', mount: 'Mount', guiding: 'Guiding', focuser: 'Focuser', filterWheel: 'Filter wheel',
		processingEnvironment: 'Processing and environment', processing: 'Processing', acquisition: 'Acquisition', place: 'Location', sky: 'Sky', annualVisibility: 'Annual visibility', visibilityChart: 'Annual visibility chart for', visibilityCaption: (days: number) => `${days} days per year above +30° at 00:00 UTC from 41° N, 1.5° E.`, additionalVersions: 'Additional versions', enlarge: 'Enlarge', enlargedImage: 'Enlarged image', closeImage: 'Close enlarged image', previousImage: 'Previous image', nextImage: 'Next image',
		languageSelector: 'Select language', backToCategory: (category: string) => `Back to ${category}`, categoryDescription: (category: string) => `Photographs of ${category.toLocaleLowerCase('en')} from my deep-sky gallery.`,
	},
} as const;

export const localeFor = (lang: Lang) => ({ ca: 'ca-ES', es: 'es-ES', en: 'en-GB' })[lang];
export const normalizeBase = (base = '/') => {
	const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
	return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
};
export const withBase = (path: string, base = '/') => `${normalizeBase(base)}${path.replace(/^\/+/, '')}`;
export const homeHref = (lang: Lang, base = '/') => lang === 'ca' ? normalizeBase(base) : withBase(`${lang}/`, base);
export const galleryHref = (lang: Lang, base = '/') => lang === 'ca' ? withBase('galeria', base) : withBase(`${lang}/${lang === 'en' ? 'gallery' : 'galeria'}`, base);
export const equipmentHref = (lang: Lang, base = '/') => lang === 'ca' ? withBase('equip', base) : withBase(`${lang}/${lang === 'en' ? 'equipment' : 'equipo'}`, base);
export const articlesHref = (lang: Lang, base = '/') => lang === 'ca' ? withBase('articles', base) : withBase(`${lang}/${lang === 'en' ? 'articles' : 'articulos'}`, base);
export const articleHref = (lang: Lang, slug: string, base = '/') => withBase(`${lang === 'ca' ? 'articles' : `${lang}/${lang === 'en' ? 'articles' : 'articulos'}`}/${slug}`, base);
export const photoHref = (lang: Lang, id: string, base = '/') => lang === 'ca' ? withBase(`foto/${id}`, base) : withBase(`${lang}/${lang === 'en' ? 'photo' : 'foto'}/${id}`, base);
export const categoryHref = (lang: Lang, key: CategoryKey, base = '/') => {
	const category = categories.find((item) => item.key === key)!;
	const segment = lang === 'en' ? 'category' : 'categoria';
	return lang === 'ca' ? withBase(`${segment}/${category.slugs.ca}`, base) : withBase(`${lang}/${segment}/${category.slugs[lang]}`, base);
};
export const categoryByValue = (value: string) => categories.find((item) => item.value === value)!;

export const languageLinks = {
	home: (base = '/') => ({ ca: homeHref('ca', base), es: homeHref('es', base), en: homeHref('en', base) }),
	gallery: (base = '/') => ({ ca: galleryHref('ca', base), es: galleryHref('es', base), en: galleryHref('en', base) }),
	equipment: (base = '/') => ({ ca: equipmentHref('ca', base), es: equipmentHref('es', base), en: equipmentHref('en', base) }),
	articles: (base = '/') => ({ ca: articlesHref('ca', base), es: articlesHref('es', base), en: articlesHref('en', base) }),
	category: (key: CategoryKey, base = '/') => ({ ca: categoryHref('ca', key, base), es: categoryHref('es', key, base), en: categoryHref('en', key, base) }),
	photo: (id: string, base = '/') => ({ ca: photoHref('ca', id, base), es: photoHref('es', id, base), en: photoHref('en', id, base) }),
};
