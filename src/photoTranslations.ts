import type { CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';
import { formatCatalogDesignations } from './lib/catalog-formatting.mjs';

type AdditionalImage = CollectionEntry<'fotos'>['data']['imatges_addicionals'][number];

export function photoText(foto: CollectionEntry<'fotos'>, lang: Lang) {
	const translation = lang === 'ca' ? undefined : foto.data.traduccions?.[lang];
	return {
		objecte: formatCatalogDesignations(translation?.objecte ?? foto.data.objecte),
		caracteristiques: formatCatalogDesignations(translation?.caracteristiques ?? foto.data.caracteristiques),
	};
}

export function additionalImageText(image: AdditionalImage, lang: Lang) {
	const translation = lang === 'ca' ? undefined : image.traduccions?.[lang];
	return {
		titol: formatCatalogDesignations(translation?.titol ?? image.titol),
		descripcio: formatCatalogDesignations(translation?.descripcio ?? image.descripcio),
	};
}
