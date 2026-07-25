import type { CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

const canonicalConstellationNames: Record<string, string> = {
	Aquari: 'Aquarius',
	Cefeu: 'Cepheus',
	Sagitarius: 'Sagittarius',
};

export function constellationName(value: string, _lang: Lang) {
	return canonicalConstellationNames[value] ?? value;
}

export function technicalValue(value: string, lang: Lang) {
	if (lang === 'ca') return value;
	if (!value.trim()) return 'N/A';
	if (value === 'No especificat') return lang === 'es' ? 'No especificado' : 'Not specified';

	if (lang === 'es') {
		return value
			.replace(/\bSessió del\b/g, 'Sesión del')
			.replace(/\bsessió del\b/g, 'sesión del')
			.replace(/Airmass mitjana per sessió/g, 'Masa de aire media por sesión')
			.replace(/\bautoenfocament per filtre activat\b/g, 'autoenfoque por filtro activado')
			.replace(/\benfocament cada\b/g, 'enfoque cada')
			.replace(/^Focuser /, 'Enfocador ')
			.replace(/^Sense [Gg]uiat$/, 'Sin guiado')
			.replace(/\b[Tt]ub guia\b/g, 'tubo guía')
			.replace(/\b[Tt]ub de\b/g, 'Tubo de')
			.replace(/\b[Tt]ub (?=\d)/g, 'Tubo ')
			.replace(/\bcàmera\b/g, 'cámara')
			.replace(/\bposicions\b/g, 'posiciones')
			.replace(/\bPreprocessament\b/g, 'Preprocesado')
			.replace(/\bapilat\b/g, 'apilado')
			.replace(/\bApilat i postprocessat amb\b/g, 'Apilado y posprocesado con')
			.replace(/\bApilat amb\b/g, 'Apilado con')
			.replace(/\bpostprocessat amb\b/g, 'posprocesado con')
			.replace(/\betiquetatge com\b/g, 'etiquetado con')
			.replace(/\bamb els lights corresponents\b/g, 'con las tomas correspondientes')
			.replace(/\btotes de\b/g, 'todas de')
			.replace(/\ben quatre sesions\b/g, 'en cuatro sesiones')
			.replace(/\bLights:/g, 'Tomas:')
			.replace(/\blights de\b/g, 'tomas de')
			.replace(/\bSessional:/g, 'Sesiones:')
			.replace(/\bsense (?:bies|bias)\b/gi, 'sin bias')
			.replace(/\bamb\b/g, 'con')
			.replace(/\bi\b/g, 'y')
			.replace(/\bHalfa\b/g, 'H-alfa');
	}

	return value
		.replace(/\bSessió del\b/g, 'Session on')
		.replace(/\bsessió del\b/g, 'session on')
		.replace(/Airmass mitjana per sessió/g, 'Mean airmass per session')
		.replace(/\bautoenfocament per filtre activat\b/g, 'autofocus enabled per filter')
		.replace(/\benfocament cada\b/g, 'focusing every')
		.replace(/^Focuser (.+)$/, '$1 focuser')
		.replace(/^Nikon D90 modificada$/, 'modified Nikon D90')
		.replace(/^Sense [Gg]uiat$/, 'No guiding')
		.replace(/\b[Tt]ub guia\b/g, 'guide scope')
		.replace(/\b[Tt]ub de\b/g, 'Guide scope,')
		.replace(/\b[Tt]ub (?=\d)/g, 'Guide scope ')
		.replace(/\bcàmera\b/g, 'camera')
		.replace(/\bcorrector-aplanador\b/g, 'corrector-flattener')
		.replace(/\bposicions\b/g, 'positions')
		.replace(/\bde (?=\d+ positions)/g, 'with ')
		.replace(/\bPreprocessament\b/g, 'Pre-processing')
		.replace(/\bapilat\b/g, 'stacked')
		.replace(/\bApilat i postprocessat amb\b/g, 'Stacked and post-processed with')
		.replace(/\bApilat amb\b/g, 'Stacked with')
		.replace(/\bpostprocessat amb\b/g, 'post-processed with')
		.replace(/\betiquetatge com\b/g, 'labelled with')
		.replace(/\bamb els lights corresponents\b/g, 'with the corresponding light frames')
		.replace(/\btotes de\b/g, 'all at')
		.replace(/\ben quatre sesions\b/g, 'over four sessions')
		.replace(/\bSessional:/g, 'Sessions:')
		.replace(/(\d+) darks \((?:de )?biblioteca\)/gi, '$1 library dark frames')
		.replace(/(\d+) darks de biblioteca/gi, '$1 library dark frames')
		.replace(/(\d+) darks \(biblioteca\)/gi, '$1 library dark frames')
		.replace(/\bsense (?:bies|bias)\b/gi, 'without bias frames')
		.replace(/\bamb\b/g, 'with')
		.replace(/\bi\b/g, 'and')
		.replace(/\bdarkflats\b/gi, 'dark-flat frames')
		.replace(/\bdarks\b/gi, 'dark frames')
		.replace(/\bflats\b/gi, 'flat frames')
		.replace(/\blights\b/gi, 'light frames')
		.replace(/\bbias\b(?! frames)/gi, 'bias frames')
		.replace(/ de (\d+\s?s)\b/g, ' at $1')
		.replace(/ de (\d+)\s?nm\b/g, ', $1 nm')
		.replace(/ de (\d+)\s?mm\b/g, ', $1 mm')
		.replace(/ a (-?\d+\s?[º°]C)\b/g, ' at $1')
		.replace(/\bHalfa\b/g, 'H-alpha')
		.replace(/\bmodificada\b/g, 'modified')
		.replace(/\bde biblioteca\b/g, 'from a library');
}

export function photoTechnicalText(foto: CollectionEntry<'fotos'>, lang: Lang) {
	const localize = (value: string) => technicalValue(value, lang);
	return {
		constellacio: constellationName(foto.data.constellacio, lang),
		tempsTotal: localize(foto.data.exposicio.temps_total),
		subframes: localize(foto.data.exposicio.subframes),
		gain: localize(foto.data.exposicio.gain),
		offset: localize(foto.data.exposicio.offset),
		calibratge: localize(foto.data.exposicio.calibratge),
		ota: localize(foto.data.equip.ota),
		camera: localize(foto.data.camera.principal),
		filtres: localize(foto.data.camera.filtres),
		muntura: localize(foto.data.equip.muntura),
		guiat: localize(foto.data.equip.guiat),
		enfocador: localize(foto.data.equip.enfocador),
		rodaFiltres: localize(foto.data.equip.roda_filtres),
		processat: localize(foto.data.tractament.processat),
		adquisicio: localize(foto.data.tractament.adquisicio),
		lloc: localize(foto.data.entorn.lloc),
	};
}
