import type { Lang } from '../i18n';
import { equipmentHref } from '../i18n';

export type EquipmentGroupId = 'main' | 'guide' | 'mount' | 'electronics';
export type EquipmentItemId =
	| 'ota'
	| 'reducer'
	| 'focuser'
	| 'filter-wheel'
	| 'main-camera'
	| 'guide-scope'
	| 'guide-camera'
	| 'wave-150i'
	| 'tripod'
	| 'powerbox'
	| 'usb-hub'
	| 'flat-panel';

type Localized = Record<Lang, string>;

export interface EquipmentSpec {
	label: Localized;
	value: Localized;
}

export interface EquipmentGalleryImage {
	image: string;
	alt: Localized;
	caption: Localized;
}

export interface EquipmentNote {
	title: Localized;
	body: Localized;
}

export interface EquipmentItem {
	id: EquipmentItemId;
	number: string;
	title: Localized;
	kicker: Localized;
	summary: Localized;
	slug: Localized;
	image?: string;
	imageAlt?: Localized;
	imageProvisional?: boolean;
	additionalImage?: string;
	additionalImageAlt?: Localized;
	additionalImageCaption?: Localized;
	additionalImageProvisional?: boolean;
	galleryImages?: EquipmentGalleryImage[];
	description?: Localized;
	notes?: EquipmentNote[];
	specs?: EquipmentSpec[];
}

export interface EquipmentGroup {
	id: EquipmentGroupId;
	number: string;
	title: Localized;
	summary: Localized;
	slug: Localized;
	image?: string;
	imageAlt?: Localized;
	hotspot: { x: number; y: number; targetX: number; targetY: number };
	items: EquipmentItem[];
}

const item = (
	id: EquipmentItemId,
	number: string,
	title: Localized,
	kicker: Localized,
	summary: Localized,
	slug: Localized,
	details: Partial<Pick<EquipmentItem, 'image' | 'imageAlt' | 'imageProvisional' | 'additionalImage' | 'additionalImageAlt' | 'additionalImageCaption' | 'additionalImageProvisional' | 'galleryImages' | 'description' | 'notes' | 'specs'>> = {},
): EquipmentItem => ({ id, number, title, kicker, summary, slug, ...details });

export const equipmentGroups: EquipmentGroup[] = [
	{
		id: 'main', number: '01',
		title: { ca: 'Tren Òptic Principal', es: 'Tren Óptico Principal', en: 'Main Optical Train' },
		summary: { ca: 'Captura i formació de la imatge', es: 'Captura y formación de la imagen', en: 'Image capture and formation' },
		slug: { ca: 'tren-principal', es: 'tren-principal', en: 'main-imaging-train' },
		image: 'imagenes/equipo/equipo-tren-optico-principal.jpeg',
		imageAlt: { ca: 'Vista general del tren òptic principal complet instal·lat sobre la muntura', es: 'Vista general del tren óptico principal completo instalado sobre la montura', en: 'General view of the complete main optical train installed on the mount' },
		hotspot: { x: 15, y: 19, targetX: 35, targetY: 23 },
		items: [
			item('ota', '01', { ca: 'Teleskop Service TS 102ED f/7', es: 'Teleskop Service TS 102ED f/7', en: 'Teleskop Service TS 102ED f/7' }, { ca: 'Captura principal', es: 'Captura principal', en: 'Main capture' }, { ca: 'Refractor ED de 102 mm utilitzat a f/5,6', es: 'Refractor ED de 102 mm utilizado a f/5,6', en: '102 mm ED refractor used at f/5.6' }, { ca: 'ota-principal', es: 'ota-principal', en: 'main-ota' }, {
				image: 'imagenes/equipo/equipo-ota-principal.jpeg',
				imageAlt: { ca: 'Refractor Teleskop Service TS 102ED amb les cintes calefactores del tub principal i del tub de guiatge, i la sonda de temperatura instal·lada al lateral', es: 'Refractor Teleskop Service TS 102ED con las cintas calentadoras del tubo principal y del tubo de guiado, y la sonda de temperatura instalada en el lateral', en: 'Teleskop Service TS 102ED refractor with heater bands on the main and guide scopes, and the temperature probe attached to its side' },
				description: {
					ca: 'El Teleskop Service TS 102ED és el tub principal de captura: un refractor ED de 102 mm amb 714 mm de distància focal i relació nativa f/7. En el meu muntatge treballa amb un reductor-aplanador 0,8×, que deixa el conjunt aproximadament en 571 mm i f/5,6 per obtenir un camp més ampli. La fotografia també ajuda a identificar petits elements del sistema anticondensació: la cinta calefactora del tub principal, una segona cinta al tub de guiatge i la sonda de temperatura fixada al lateral. Tot i pertànyer a l’electrònica de control, es mostren aquí perquè la seva col·locació sobre els tubs explica millor la seva funció.',
					es: 'El Teleskop Service TS 102ED es el tubo principal de captura: un refractor ED de 102 mm con 714 mm de distancia focal y relación nativa f/7. En mi montaje trabaja con un reductor-aplanador 0,8×, que deja el conjunto aproximadamente en 571 mm y f/5,6 para obtener un campo más amplio. La fotografía también ayuda a identificar pequeños elementos del sistema anticondensación: la cinta calentadora del tubo principal, una segunda cinta en el tubo de guiado y la sonda de temperatura fijada al lateral. Aunque pertenecen a la electrónica de control, se muestran aquí porque su colocación sobre los tubos explica mejor su función.',
					en: 'The Teleskop Service TS 102ED is the main imaging telescope: a 102 mm ED refractor with a native focal length of 714 mm and an f/7 focal ratio. In my setup it is paired with a 0.8× reducer-flattener, bringing the system to approximately 571 mm and f/5.6 for a wider field of view. The photograph also identifies the smaller dew-control components: a heater band on the main telescope, another on the guide scope and a temperature probe attached to the side. Although these belong to the control electronics, showing them on the optical tubes makes their purpose easier to understand.',
				},
				specs: [
					{ label: { ca: 'Tipus', es: 'Tipo de telescopio', en: 'Telescope type' }, value: { ca: 'Refractor ED', es: 'Refractor ED', en: 'ED refractor' } },
					{ label: { ca: 'Objectiu', es: 'Objetivo', en: 'Objective' }, value: { ca: 'Doblet ED de 2 elements separats per aire, amb vidre FPL-51 d’Ohara (Japó)', es: 'Objetivo ED de 2 elementos separados por aire, con vidrio FPL-51 de Ohara (Japón)', en: 'Air-spaced 2-element ED objective with Ohara FPL-51 glass (Japan)' } },
					{ label: { ca: 'Obertura', es: 'Apertura', en: 'Aperture' }, value: { ca: '102 mm', es: '102 mm', en: '102 mm' } },
					{ label: { ca: 'Distància focal nativa', es: 'Distancia focal nativa', en: 'Native focal length' }, value: { ca: '714 mm', es: '714 mm', en: '714 mm' } },
					{ label: { ca: 'Relació focal nativa', es: 'Relación focal nativa', en: 'Native focal ratio' }, value: { ca: 'f/7', es: 'f/7', en: 'f/7' } },
					{ label: { ca: 'Amb reductor 0,8×', es: 'Con reductor 0,8×', en: 'With 0.8× reducer' }, value: { ca: 'Aprox. 571 mm · f/5,6', es: 'Aprox. 571 mm · f/5,6', en: 'Approx. 571 mm · f/5.6' } },
					{ label: { ca: 'Recobriment', es: 'Recubrimiento', en: 'Coating' }, value: { ca: 'Totalment multicapa', es: 'Totalmente multicapa', en: 'Fully multi-coated' } },
					{ label: { ca: 'Resolució', es: 'Resolución', en: 'Resolution' }, value: { ca: '1,14″', es: '1,14″', en: '1.14″' } },
					{ label: { ca: 'Magnitud límit visual', es: 'Magnitud límite visual', en: 'Visual limiting magnitude' }, value: { ca: '12,7 mag', es: '12,7 mag', en: '12.7 mag' } },
					{ label: { ca: 'Enfocador mecànic', es: 'Enfocador mecánico', en: 'Mechanical focuser' }, value: { ca: 'R&P de 2,5″, rosques M63 i M68 i reducció per microengranatges', es: 'R&P de 2,5″, roscas M63 y M68 y reducción por microengranajes', en: '2.5″ rack-and-pinion, M63 and M68 threads, with micro-gear reduction' } },
					{ label: { ca: 'Material del tub', es: 'Material del tubo', en: 'Tube material' }, value: { ca: 'Alumini', es: 'Aluminio', en: 'Aluminium' } },
					{ label: { ca: 'Pes del tub', es: 'Peso del tubo', en: 'Tube weight' }, value: { ca: '3,98 kg', es: '3,98 kg', en: '3.98 kg' } },
					{ label: { ca: 'Parasol', es: 'Parasol', en: 'Dew shield' }, value: { ca: '122 mm de diàmetre', es: '122 mm de diámetro', en: '122 mm diameter' } },
					{ label: { ca: 'Dimensions', es: 'Dimensiones', en: 'Dimensions' }, value: { ca: '733 mm de longitud · 105 mm de diàmetre', es: '733 mm de longitud · 105 mm de diámetro', en: '733 mm long · 105 mm diameter' } },
					{ label: { ca: 'Anelles del tub', es: 'Anillos del tubo', en: 'Tube rings' }, value: { ca: 'Anelles CNC amb 5 rosques femella M6 a cada costat', es: 'Anillos CNC con 5 roscas hembra M6 en cada lado', en: 'CNC rings with 5 female M6 threads on each side' } },
				],
			}),
			item('reducer', '02', { ca: 'TS-Optics TS102RED 0,8×', es: 'TS-Optics TS102RED 0,8×', en: 'TS-Optics TS102RED 0.8×' }, { ca: 'Tren òptic', es: 'Tren óptico', en: 'Optical train' }, { ca: 'Reducció de focal i correcció del camp per al TS 102ED', es: 'Reducción de focal y corrección del campo para el TS 102ED', en: 'Focal reduction and field correction for the TS 102ED' }, { ca: 'reductor-aplanador', es: 'reductor-aplanador', en: 'reducer-flattener' }, {
				image: 'imagenes/equipo/equipo-tren-imagen-posterior.jpeg',
				imageAlt: { ca: 'Vista lateral del tren d’imatge amb el TS-Optics TS102RED 0,8× situat entre l’enfocador i la roda portafiltres', es: 'Vista lateral del tren de imagen con el TS-Optics TS102RED 0,8× situado entre el enfocador y la rueda portafiltros', en: 'Side view of the imaging train with the TS-Optics TS102RED 0.8× positioned between the focuser and filter wheel' },
				description: {
					ca: 'El TS-Optics TS102RED compleix dues funcions en una sola peça. Com a reductor 0,8×, transforma els 714 mm i f/7 natius de l’OTA en aproximadament 571 mm i f/5,6, ampliant el camp capturat i deixant el temps d’exposició en prop del 64 % de l’original. Com a aplanador, corregeix la curvatura del camp perquè les estrelles es mantinguin nítides també cap a les vores del sensor. A la fotografia es troba després de l’enfocador i abans de la roda portafiltres i la càmera. Està dissenyat específicament per a refractors ED i APO de 100–102 mm a f/7 i ofereix un camp corregit de fins a 30 mm, adequat per a sensors APS-C.',
					es: 'El TS-Optics TS102RED cumple dos funciones en una sola pieza. Como reductor 0,8×, transforma los 714 mm y f/7 nativos de la OTA en aproximadamente 571 mm y f/5,6, ampliando el campo capturado y dejando el tiempo de exposición en cerca del 64 % del original. Como aplanador, corrige la curvatura del campo para que las estrellas se mantengan nítidas también hacia los bordes del sensor. En la fotografía se encuentra después del enfocador y antes de la rueda portafiltros y la cámara. Está diseñado específicamente para refractores ED y APO de 100–102 mm a f/7 y ofrece un campo corregido de hasta 30 mm, adecuado para sensores APS-C.',
					en: 'The TS-Optics TS102RED performs two jobs in a single component. As a 0.8× reducer, it changes the OTA’s native 714 mm and f/7 configuration to approximately 571 mm and f/5.6, widening the captured field and bringing exposure time to about 64% of the original. As a flattener, it corrects field curvature so stars remain sharp towards the edges of the sensor. In the photograph it sits after the focuser and before the filter wheel and camera. It is designed for 100–102 mm f/7 ED and APO refractors and provides a corrected field up to 30 mm, suitable for APS-C sensors.',
				},
				specs: [
					{ label: { ca: 'Referència', es: 'Referencia', en: 'Reference' }, value: { ca: 'TS102RED', es: 'TS102RED', en: 'TS102RED' } },
					{ label: { ca: 'Factor de reducció', es: 'Factor de reducción', en: 'Reduction factor' }, value: { ca: '0,8×', es: '0,8×', en: '0.8×' } },
					{ label: { ca: 'Configuració resultant', es: 'Configuración resultante', en: 'Resulting configuration' }, value: { ca: 'Aprox. 571 mm · f/5,6', es: 'Aprox. 571 mm · f/5,6', en: 'Approx. 571 mm · f/5.6' } },
					{ label: { ca: 'Temps d’exposició', es: 'Tiempo de exposición', en: 'Exposure time' }, value: { ca: 'Aprox. 64 % del temps original', es: 'Aprox. 64 % del tiempo original', en: 'Approx. 64% of the original time' } },
					{ label: { ca: 'Telescopis compatibles', es: 'Telescopios compatibles', en: 'Compatible telescopes' }, value: { ca: 'Refractors ED i APO de 100–102 mm a f/7', es: 'Refractores ED y APO de 100–102 mm a f/7', en: '100–102 mm f/7 ED and APO refractors' } },
					{ label: { ca: 'Disseny òptic', es: 'Diseño óptico', en: 'Optical design' }, value: { ca: 'Vidre especial optimitzat per millorar la nitidesa', es: 'Vidrio especial optimizado para mejorar la nitidez', en: 'Special glass optimised for improved sharpness' } },
					{ label: { ca: 'Camp corregit', es: 'Campo corregido', en: 'Corrected field' }, value: { ca: 'Fins a 30 mm de diàmetre · adequat per a APS-C', es: 'Hasta 30 mm de diámetro · adecuado para APS-C', en: 'Up to 30 mm diameter · suitable for APS-C' } },
					{ label: { ca: 'Connexió al telescopi', es: 'Conexión al telescopio', en: 'Telescope connection' }, value: { ca: 'Casquet de 2″ amb rosca per a filtres de 2″', es: 'Casquillo de 2″ con rosca para filtros de 2″', en: '2″ barrel with 2″ filter thread' } },
					{ label: { ca: 'Connexió a la càmera', es: 'Conexión a la cámara', en: 'Camera connection' }, value: { ca: 'Rosca mascle T2 · M42 × 0,75', es: 'Rosca macho T2 · M42 × 0,75', en: 'Male T2 thread · M42 × 0.75' } },
					{ label: { ca: 'Backfocus', es: 'Backfocus', en: 'Backfocus' }, value: { ca: '55 mm des de la rosca T2 fins al sensor', es: '55 mm desde la rosca T2 hasta el sensor', en: '55 mm from the T2 thread to the sensor' } },
					{ label: { ca: 'Recobriment', es: 'Recubrimiento', en: 'Coating' }, value: { ca: 'Multicapa a cada superfície aire-vidre per reduir reflexos i imatges fantasma', es: 'Multicapa en cada superficie aire-vidrio para reducir reflejos e imágenes fantasma', en: 'Multi-coated on every air-to-glass surface to reduce reflections and ghosting' } },
				],
			}),
			item('focuser', '03', { ca: 'ZWO EAF', es: 'ZWO EAF', en: 'ZWO EAF' }, { ca: 'Enfocament', es: 'Enfoque', en: 'Focusing' }, { ca: 'Control motoritzat de l’enfocament principal', es: 'Control motorizado del enfoque principal', en: 'Motorised focus control for the main optical train' }, { ca: 'enfocador', es: 'enfocador', en: 'focuser' }, {
				image: 'imagenes/equipo/equipo-zwo-eaf-caja.png',
				imageAlt: { ca: 'Caixa original del motor d’enfocament automàtic ZWO EAF', es: 'Caja original del motor de enfoque automático ZWO EAF', en: 'Original box for the ZWO EAF electronic automatic focuser' },
				additionalImage: 'imagenes/equipo/equipo-camara-eaf-detalle.jpeg',
				additionalImageAlt: { ca: 'Detall frontal del ZWO EAF al costat de la roda portafiltres EFW i la càmera principal', es: 'Detalle frontal del ZWO EAF junto a la rueda portafiltros EFW y la cámara principal', en: 'Front detail of the ZWO EAF beside the EFW filter wheel and main camera' },
				additionalImageCaption: { ca: 'L’EAF comparteix espai amb la roda i la càmera', es: 'El EAF comparte espacio con la rueda y la cámara', en: 'The EAF shares the compact assembly with the wheel and camera' },
				galleryImages: [
					{
						image: 'imagenes/equipo/equipo-electronica-vista-superior.jpeg',
						alt: { ca: 'Vista superior del tren òptic amb el motor d’enfocament ZWO EAF vermell muntat perpendicularment al tub', es: 'Vista superior del tren óptico con el motor de enfoque ZWO EAF rojo montado perpendicularmente al tubo', en: 'Top view of the optical train with the red ZWO EAF focus motor mounted perpendicular to the telescope' },
						caption: { ca: 'El motor EAF muntat perpendicularment al tren òptic', es: 'El motor EAF montado perpendicularmente al tren óptico', en: 'The EAF motor mounted perpendicular to the optical train' },
					},
				],
				description: {
					ca: 'El ZWO EAF és el motor vermell muntat perpendicularment al tren òptic. S’acobla a l’eix de l’enfocador mecànic de l’OTA i substitueix el gir manual, de manera que el programa de captura pot buscar i recuperar automàticament el millor punt de focus. Això permet iniciar enfocaments a distància i corregir les petites variacions produïdes pels canvis de temperatura durant la nit. S’alimenta directament a 5 V mitjançant la connexió USB-C, sense necessitat d’un cable d’alimentació independent, i la reducció 1:128 proporciona moviments molt fins i repetibles.',
					es: 'El ZWO EAF es el motor rojo montado perpendicularmente al tren óptico. Se acopla al eje del enfocador mecánico de la OTA y sustituye el giro manual, de modo que el programa de captura puede buscar y recuperar automáticamente el mejor punto de foco. Esto permite iniciar enfoques a distancia y corregir las pequeñas variaciones producidas por los cambios de temperatura durante la noche. Se alimenta directamente a 5 V mediante la conexión USB-C, sin necesitar un cable de alimentación independiente, y la reducción 1:128 proporciona movimientos muy finos y repetibles.',
					en: 'The ZWO EAF is the red motor mounted perpendicular to the optical train. It couples to the shaft of the OTA’s mechanical focuser and replaces manual adjustment, allowing the capture software to find and return to the best focus position automatically. This makes remote focusing possible and compensates for small focus shifts caused by changing temperatures during the night. It is powered directly at 5 V through its USB-C connection, without a separate power cable, while the 1:128 reduction provides very fine, repeatable movement.',
				},
				specs: [
					{ label: { ca: 'Funció', es: 'Función', en: 'Function' }, value: { ca: 'Control automàtic i remot de l’enfocament', es: 'Control automático y remoto del enfoque', en: 'Automatic and remote focus control' } },
					{ label: { ca: 'Alimentació', es: 'Alimentación', en: 'Power' }, value: { ca: '5 V a través de la connexió USB-C', es: '5 V a través de la conexión USB-C', en: '5 V through the USB-C connection' } },
					{ label: { ca: 'Eix d’acoblament', es: 'Eje de acoplamiento', en: 'Coupling shaft' }, value: { ca: '4 mm de diàmetre', es: '4 mm de diámetro', en: '4 mm diameter' } },
					{ label: { ca: 'Capacitat de càrrega', es: 'Capacidad de carga', en: 'Load capacity' }, value: { ca: '5 kg', es: '5 kg', en: '5 kg' } },
					{ label: { ca: 'Relació de reducció', es: 'Relación de reducción', en: 'Reduction ratio' }, value: { ca: '1:128', es: '1:128', en: '1:128' } },
				],
			}),
			item('filter-wheel', '04', { ca: 'ZWO EFW', es: 'ZWO EFW', en: 'ZWO EFW' }, { ca: 'Tren d’imatge', es: 'Tren de imagen', en: 'Imaging train' }, { ca: 'Roda portafiltres; selecció automatitzada de filtres', es: 'Rueda portafiltros; selección automatizada de filtros', en: 'Filter wheel; automated filter selection' }, { ca: 'roda-portafiltres', es: 'rueda-portafiltros', en: 'filter-wheel' }, {
				image: 'imagenes/equipo/equipo-zwo-efw-caja.png',
				imageAlt: { ca: 'Caixa original de la roda portafiltres electrònica ZWO EFW, utilitzada en la versió de set filtres de 36 mm', es: 'Caja original de la rueda portafiltros electrónica ZWO EFW, utilizada en la versión de siete filtros de 36 mm', en: 'Original ZWO EFW electronic filter wheel box, used here in the seven-position 36 mm version' },
				additionalImage: 'imagenes/equipo/equipo-tren-imagen-posterior.jpeg',
				additionalImageAlt: { ca: 'Tren d’imatge posterior amb la roda portafiltres ZWO EFW instal·lada immediatament abans de la càmera principal', es: 'Tren de imagen posterior con la rueda portafiltros ZWO EFW instalada inmediatamente antes de la cámara principal', en: 'Rear imaging train with the ZWO EFW filter wheel installed immediately in front of the main camera' },
				additionalImageCaption: { ca: 'Posició de la roda EFW dins del tren posterior', es: 'Posición de la rueda EFW dentro del tren posterior', en: 'Position of the EFW within the rear imaging train' },
				galleryImages: [
					{
						image: 'imagenes/equipo/equipo-camara-principal.jpeg',
						alt: { ca: 'Detall de la roda portafiltres ZWO EFW entre el motor EAF i la càmera principal', es: 'Detalle de la rueda portafiltros ZWO EFW entre el motor EAF y la cámara principal', en: 'Detail of the ZWO EFW filter wheel between the EAF motor and main camera' },
						caption: { ca: 'La roda EFW instal·lada entre l’enfocador i la càmera principal', es: 'La rueda EFW instalada entre el enfocador y la cámara principal', en: 'The EFW installed between the focuser and main camera' },
					},
				],
				description: {
					ca: 'La ZWO EFW 7 × 36 mm és la roda portafiltres motoritzada que utilitzo amb filtres Astronomik de 36 mm. És el cos circular negre situat immediatament davant de la càmera principal: allotja fins a set filtres i permet que el programa de captura seleccioni automàticament el necessari per a cada exposició. Els filtres queden molt a prop del sensor, cosa que ajuda a reduir el risc de vinyetatge, i el seu gruix de només 20 mm facilita mantenir la distància correcta entre els diferents elements. La roda s’alimenta i es controla mitjançant un únic cable USB, amb un consum màxim aproximat de 150 mA; per això pot connectar-se directament al concentrador USB de la càmera o al hub del muntatge. La carcassa d’alumini mecanitzat combina rigidesa amb un pes inferior a 400 g.',
					es: 'La ZWO EFW 7 × 36 mm es la rueda portafiltros motorizada que utilizo con filtros Astronomik de 36 mm. Es el cuerpo circular negro situado inmediatamente delante de la cámara principal: aloja hasta siete filtros y permite que el programa de captura seleccione automáticamente el necesario para cada exposición. Los filtros quedan muy cerca del sensor, lo que ayuda a reducir el riesgo de viñeteo, y su grosor de solo 20 mm facilita mantener la distancia correcta entre los distintos elementos. La rueda se alimenta y controla mediante un único cable USB, con un consumo máximo aproximado de 150 mA; por eso puede conectarse directamente al concentrador USB de la cámara o al hub del montaje. La carcasa de aluminio mecanizado combina rigidez con un peso inferior a 400 g.',
					en: 'The ZWO EFW 7 × 36 mm is the motorised filter wheel I use with 36 mm Astronomik filters. It is the black circular body immediately in front of the main camera: it holds up to seven filters and allows the capture software to select the required one automatically for each exposure. Keeping the filters close to the sensor helps reduce the risk of vignetting, while its slim 20 mm body makes it easier to maintain the correct spacing between components. A single USB cable provides both power and control, with a maximum consumption of approximately 150 mA, so it can connect directly to the camera’s USB hub or the hub installed on the telescope. Its machined aluminium enclosure combines rigidity with a weight below 400 g.',
				},
				specs: [
					{ label: { ca: 'Capacitat', es: 'Capacidad', en: 'Capacity' }, value: { ca: '7 filtres sense muntar de 36 mm', es: '7 filtros sin montar de 36 mm', en: '7 unmounted 36 mm filters' } },
					{ label: { ca: 'Filtres utilitzats', es: 'Filtros utilizados', en: 'Filters used' }, value: { ca: 'Astronomik de 36 mm', es: 'Astronomik de 36 mm', en: '36 mm Astronomik filters' } },
					{ label: { ca: 'Connexió al telescopi', es: 'Conexión al telescopio', en: 'Telescope connection' }, value: { ca: 'Rosca T2 femella', es: 'Rosca T2 hembra', en: 'Female T2 thread' } },
					{ label: { ca: 'Connexió a la càmera', es: 'Conexión a la cámara', en: 'Camera connection' }, value: { ca: 'Rosca T2 mascle', es: 'Rosca T2 macho', en: 'Male T2 thread' } },
					{ label: { ca: 'Connexió addicional', es: 'Conexión adicional', en: 'Additional connection' }, value: { ca: '1,25″ mitjançant l’adaptador inclòs', es: '1,25″ mediante el adaptador incluido', en: '1.25″ through the supplied adapter' } },
					{ label: { ca: 'Gruix òptic', es: 'Grosor óptico', en: 'Optical thickness' }, value: { ca: '20 mm de T2 a T2', es: '20 mm de T2 a T2', en: '20 mm from T2 to T2' } },
					{ label: { ca: 'Alimentació i control', es: 'Alimentación y control', en: 'Power and control' }, value: { ca: 'Un únic cable USB · consum màxim aprox. 150 mA', es: 'Un único cable USB · consumo máximo aprox. 150 mA', en: 'Single USB cable · approx. 150 mA maximum consumption' } },
					{ label: { ca: 'Construcció', es: 'Construcción', en: 'Construction' }, value: { ca: 'Carcassa d’alumini mecanitzat CNC', es: 'Carcasa de aluminio mecanizado CNC', en: 'CNC-machined aluminium enclosure' } },
					{ label: { ca: 'Pes', es: 'Peso', en: 'Weight' }, value: { ca: 'Menys de 400 g', es: 'Menos de 400 g', en: 'Below 400 g' } },
				],
			}),
			item('main-camera', '05', { ca: 'ZWO ASI294MM Pro', es: 'ZWO ASI294MM Pro', en: 'ZWO ASI294MM Pro' }, { ca: 'Captura principal', es: 'Captura principal', en: 'Main capture' }, { ca: 'Càmera monocroma refrigerada de captura', es: 'Cámara monocroma refrigerada de captura', en: 'Cooled monochrome imaging camera' }, { ca: 'camera-principal', es: 'camara-principal', en: 'main-camera' }, {
				image: 'imagenes/equipo/equipo-asi294mm-pro-trasera.png',
				imageAlt: { ca: 'Vista posterior de la ZWO ASI294MM Pro amb el ventilador, les connexions USB i l’entrada d’alimentació de 12 V', es: 'Vista posterior de la ZWO ASI294MM Pro con el ventilador, las conexiones USB y la entrada de alimentación de 12 V', en: 'Rear view of the ZWO ASI294MM Pro showing the fan, USB connections and 12 V power input' },
				additionalImage: 'imagenes/equipo/equipo-tren-imagen-posterior.jpeg',
				additionalImageAlt: { ca: 'Vista lateral de la càmera principal al final del tren òptic, darrere de la roda portafiltres i del reductor-aplanador', es: 'Vista lateral de la cámara principal al final del tren óptico, detrás de la rueda portafiltros y del reductor-aplanador', en: 'Side view of the main camera at the end of the optical train, behind the filter wheel and reducer-flattener' },
				additionalImageCaption: { ca: 'Ordre complet del tren d’imatge posterior', es: 'Orden completo del tren de imagen posterior', en: 'Complete rear imaging-train order' },
				galleryImages: [
					{
						image: 'imagenes/equipo/equipo-camara-eaf-detalle.jpeg',
						alt: { ca: 'Càmera principal ZWO ASI294MM Pro refrigerada amb la roda portafiltres EFW i el motor EAF visibles', es: 'Cámara principal ZWO ASI294MM Pro refrigerada con la rueda portafiltros EFW y el motor EAF visibles', en: 'Cooled ZWO ASI294MM Pro main camera with the EFW filter wheel and EAF motor visible' },
						caption: { ca: 'La càmera principal instal·lada amb la roda EFW i el motor EAF', es: 'La cámara principal instalada con la rueda EFW y el motor EAF', en: 'The main camera installed with the EFW and EAF motor' },
					},
					{
						image: 'imagenes/equipo/equipo-asi294mm-camara-abierta.jpeg',
						alt: { ca: 'Cos de la ZWO ASI294MM Pro amb el conjunt frontal retirat per accedir a la cambra del sensor', es: 'Cuerpo de la ZWO ASI294MM Pro con el conjunto frontal retirado para acceder a la cámara del sensor', en: 'ZWO ASI294MM Pro body with the front assembly removed to access the sensor chamber' },
						caption: { ca: 'Accés a la cambra del sensor després de retirar el conjunt frontal', es: 'Acceso a la cámara del sensor tras retirar el conjunto frontal', en: 'Access to the sensor chamber after removing the front assembly' },
					},
					{
						image: 'imagenes/equipo/equipo-asi294mm-pastillas-desecantes.jpeg',
						alt: { ca: 'Quatre pastilles dessecants muntades a la cara interior del conjunt frontal de la càmera', es: 'Cuatro pastillas desecantes montadas en la cara interior del conjunto frontal de la cámara', en: 'Four desiccant tablets mounted on the inside of the camera front assembly' },
						caption: { ca: 'Posició de les quatre pastilles dessecants que controlen la humitat interna', es: 'Posición de las cuatro pastillas desecantes que controlan la humedad interna', en: 'Position of the four desiccant tablets that control internal humidity' },
					},
					{
						image: 'imagenes/equipo/equipo-asi294mm-sensor.jpeg',
						alt: { ca: 'Detall del sensor monocrom de la ZWO ASI294MM Pro dins del cos de la càmera', es: 'Detalle del sensor monocromo de la ZWO ASI294MM Pro dentro del cuerpo de la cámara', en: 'Close view of the ZWO ASI294MM Pro monochrome sensor inside the camera body' },
						caption: { ca: 'El sensor és la zona que cal mantenir lliure de condensació', es: 'El sensor es la zona que debe mantenerse libre de condensación', en: 'The sensor is the area that must remain free of condensation' },
					},
				],
				description: {
					ca: 'La ZWO ASI294MM Pro és la càmera principal i ocupa l’extrem del tren òptic, unida directament a la roda portafiltres EFW. El sensor monocrom de format 4/3 registra la llum sense una matriu de color; per això els filtres de la roda permeten construir la imatge final o treballar amb bandes concretes. La refrigeració Peltier regulada pot mantenir el sensor fins a 35 °C per sota de la temperatura ambient, reduint el soroll tèrmic i fent més consistents les exposicions llargues. La connexió USB 3.0 i la memòria intermèdia de 256 MB també permeten lectures ràpides i captura planetària. Es pot controlar amb els controladors de ZWO, ASCOM i les aplicacions habituals d’astrofotografia.',
					es: 'La ZWO ASI294MM Pro es la cámara principal y ocupa el extremo del tren óptico, unida directamente a la rueda portafiltros EFW. El sensor monocromo de formato 4/3 registra la luz sin una matriz de color; por eso los filtros de la rueda permiten construir la imagen final o trabajar con bandas concretas. La refrigeración Peltier regulada puede mantener el sensor hasta 35 °C por debajo de la temperatura ambiente, reduciendo el ruido térmico y haciendo más consistentes las exposiciones largas. La conexión USB 3.0 y la memoria intermedia de 256 MB también permiten lecturas rápidas y captura planetaria. Puede controlarse con los drivers de ZWO, ASCOM y las aplicaciones habituales de astrofotografía.',
					en: 'The ZWO ASI294MM Pro is the main imaging camera and sits at the end of the optical train, directly attached to the EFW filter wheel. Its monochrome Four Thirds sensor records light without a colour filter array, allowing the wheel’s filters to build the final colour image or isolate specific wavelength bands. Regulated Peltier cooling can hold the sensor up to 35 °C below ambient temperature, reducing thermal noise and making long exposures more consistent. USB 3.0 and a 256 MB buffer also support fast readout and planetary capture. It can be controlled through ZWO drivers, ASCOM and common astrophotography applications.',
				},
				notes: [
					{
						title: { ca: 'Refrigeració gradual i control de la condensació', es: 'Refrigeración gradual y control de la condensación', en: 'Gradual cooling and condensation control' },
						body: {
							ca: 'Les càmeres Pro incorporen refrigeració termoelèctrica mitjançant una cèl·lula Peltier. En el meu cas evito ordenar un salt directe des de la temperatura ambient fins a la temperatura de treball. A l’estiu, a l’Ampolla, és habitual començar a uns +32 °C i treballar a −10 °C; per això programo quatre rampes, amb objectius de +20 °C, +10 °C, 0 °C i −10 °C, i mantinc cada pas durant 10 minuts. Amb humitats que sovint superen el 80 %, aquest descens gradual ajuda a reduir el risc de condensació a l’interior de la càmera. Si hi apareix humitat, les quatre pastilles dessecants poden arribar a saturar-se i cal obrir la cambra per substituir-les o regenerar-les seguint les indicacions del fabricant. Les fotografies mostren el conjunt que s’ha de desmuntar, la posició de les pastilles i el sensor que cal mantenir lliure de condensació.',
							es: 'Las cámaras Pro incorporan refrigeración termoeléctrica mediante una célula Peltier. En mi caso evito ordenar un salto directo desde la temperatura ambiente hasta la temperatura de trabajo. En verano, en l’Ampolla, es habitual comenzar a unos +32 °C y trabajar a −10 °C; por eso programo cuatro rampas, con objetivos de +20 °C, +10 °C, 0 °C y −10 °C, y mantengo cada paso durante 10 minutos. Con humedades que a menudo superan el 80 %, este descenso gradual ayuda a reducir el riesgo de condensación en el interior de la cámara. Si aparece humedad, las cuatro pastillas desecantes pueden llegar a saturarse y es necesario abrir la cámara para sustituirlas o regenerarlas siguiendo las indicaciones del fabricante. Las fotografías muestran el conjunto que debe desmontarse, la posición de las pastillas y el sensor que debe mantenerse libre de condensación.',
							en: 'Pro cameras use thermoelectric cooling based on a Peltier module. In my setup I avoid commanding a direct jump from ambient temperature to the working setpoint. Summer temperatures in l’Ampolla often start around +32 °C, while I normally image at −10 °C, so I programme four stages at +20 °C, +10 °C, 0 °C and −10 °C, allowing 10 minutes for each step. With humidity often above 80%, this gradual cool-down helps reduce the risk of condensation inside the camera. If moisture does appear, the four desiccant tablets can become saturated and the chamber must be opened so they can be replaced or regenerated according to the manufacturer’s instructions. The photographs show the assembly that must be removed, the position of the tablets and the sensor that needs to remain free of condensation.',
						},
					},
				],
				specs: [
					{ label: { ca: 'Sensor', es: 'Sensor', en: 'Sensor' }, value: { ca: 'Sony IMX492 monocrom · format 4/3', es: 'Sony IMX492 monocromo · formato 4/3', en: 'Monochrome Sony IMX492 · Four Thirds format' } },
					{ label: { ca: 'Mida del sensor', es: 'Tamaño del sensor', en: 'Sensor size' }, value: { ca: '19,1 × 13 mm', es: '19,1 × 13 mm', en: '19.1 × 13 mm' } },
					{ label: { ca: 'Resolució', es: 'Resolución', en: 'Resolution' }, value: { ca: '4144 × 2822 píxels · aprox. 11,7 MP', es: '4144 × 2822 píxeles · aprox. 11,7 MP', en: '4144 × 2822 pixels · approx. 11.7 MP' } },
					{ label: { ca: 'Mida de píxel', es: 'Tamaño de píxel', en: 'Pixel size' }, value: { ca: '4,63 × 4,63 µm', es: '4,63 × 4,63 µm', en: '4.63 × 4.63 µm' } },
					{ label: { ca: 'Convertidor A/D', es: 'Convertidor A/D', en: 'A/D converter' }, value: { ca: '14 bits', es: '14 bits', en: '14 bit' } },
					{ label: { ca: 'Soroll de lectura', es: 'Ruido de lectura', en: 'Read noise' }, value: { ca: '1,2 e⁻', es: '1,2 e⁻', en: '1.2 e⁻' } },
					{ label: { ca: 'Capacitat de pou complet', es: 'Capacidad de pozo completo', en: 'Full-well capacity' }, value: { ca: '63.700 e⁻', es: '63.700 e⁻', en: '63,700 e⁻' } },
					{ label: { ca: 'Temps d’exposició', es: 'Tiempo de exposición', en: 'Exposure range' }, value: { ca: 'De 32 µs a 2000 s', es: 'De 32 µs a 2000 s', en: '32 µs to 2000 s' } },
					{ label: { ca: 'Velocitat màxima', es: 'Velocidad máxima', en: 'Maximum frame rate' }, value: { ca: '16 fps a 14 bits · 19 fps a 10 bits, a resolució completa', es: '16 fps a 14 bits · 19 fps a 10 bits, a resolución completa', en: '16 fps at 14 bit · 19 fps at 10 bit, full resolution' } },
					{ label: { ca: 'Memòria intermèdia', es: 'Memoria intermedia', en: 'Buffer memory' }, value: { ca: '256 MB', es: '256 MB', en: '256 MB' } },
					{ label: { ca: 'Interfície', es: 'Interfaz', en: 'Interface' }, value: { ca: 'USB 3.0, compatible amb USB 2.0', es: 'USB 3.0, compatible con USB 2.0', en: 'USB 3.0, USB 2.0 compatible' } },
					{ label: { ca: 'Refrigeració', es: 'Refrigeración', en: 'Cooling' }, value: { ca: 'Peltier regulada amb consigna · ΔT màxim de −35 °C', es: 'Peltier regulada con consigna · ΔT máximo de −35 °C', en: 'Regulated set-point Peltier cooling · maximum ΔT −35 °C' } },
					{ label: { ca: 'Alimentació recomanada', es: 'Alimentación recomendada', en: 'Recommended power' }, value: { ca: '12 V CC · 3 A mínim · font no inclosa', es: '12 V CC · 3 A mínimo · fuente no incluida', en: '12 V DC · 3 A minimum · power supply not included' } },
					{ label: { ca: 'Backfocus', es: 'Backfocus', en: 'Backfocus' }, value: { ca: '17,5 mm / 6,5 mm segons l’adaptador', es: '17,5 mm / 6,5 mm según el adaptador', en: '17.5 mm / 6.5 mm depending on adapter' } },
					{ label: { ca: 'Connexions mecàniques', es: 'Conexiones mecánicas', en: 'Mechanical connections' }, value: { ca: 'M42 femella · M42 mascle · casquet de 50,8 mm', es: 'M42 hembra · M42 macho · casquillo de 50,8 mm', en: 'Female M42 · male M42 · 50.8 mm nosepiece' } },
					{ label: { ca: 'Pes', es: 'Peso', en: 'Weight' }, value: { ca: '500 g', es: '500 g', en: '500 g' } },
					{ label: { ca: 'Programari', es: 'Software', en: 'Software' }, value: { ca: 'Controladors ZWO i ASCOM · Windows, Linux, ARM Linux i macOS', es: 'Drivers ZWO y ASCOM · Windows, Linux, ARM Linux y macOS', en: 'ZWO and ASCOM drivers · Windows, Linux, ARM Linux and macOS' } },
				],
			}),
		],
	},
	{
		id: 'guide', number: '02',
		title: { ca: 'Tren de guiatge', es: 'Tren de guiado', en: 'Guiding train' },
		summary: { ca: 'Seguiment de precisió', es: 'Seguimiento de precisión', en: 'Precision tracking' },
		slug: { ca: 'tren-guiatge', es: 'tren-guiado', en: 'guiding-train' },
		hotspot: { x: 82, y: 16, targetX: 57, targetY: 27 },
		items: [
			item('guide-scope', '01', { ca: 'Svbony SV106', es: 'Svbony SV106', en: 'Svbony SV106' }, { ca: 'Tub de guiatge', es: 'Tubo de guiado', en: 'Guide scope' }, { ca: 'Tub guia de 60 mm dedicat al seguiment', es: 'Tubo guía de 60 mm dedicado al seguimiento', en: '60 mm guide scope dedicated to tracking' }, { ca: 'tub-guiatge', es: 'tubo-guiado', en: 'guide-scope' }, {
				image: 'imagenes/equipo/equipo-tubo-guiado.jpeg',
				imageAlt: { ca: 'Tub de guiatge Svbony SV106 de 60 mm amb la càmera ZWO ASI220MM Mini instal·lats sobre l’equip', es: 'Tubo de guiado Svbony SV106 de 60 mm con la cámara ZWO ASI220MM Mini instalados sobre el equipo', en: 'Svbony SV106 60 mm guide scope with the ZWO ASI220MM Mini camera installed on the rig' },
				description: {
					ca: 'El Svbony SV106 és un tub guia compacte de 60 mm i relació focal f/4. El seu camp ampli facilita la selecció d’estrelles de referència, mentre que l’enfocador helicoidal permet ajustar el focus amb precisió sense fer girar la càmera.',
					es: 'El Svbony SV106 es un tubo guía compacto de 60 mm y relación focal f/4. Su campo amplio facilita la selección de estrellas de referencia, mientras que el enfocador helicoidal permite ajustar el foco con precisión sin hacer girar la cámara.',
					en: 'The Svbony SV106 is a compact 60 mm f/4 guide scope. Its wide field makes guide-star selection easier, while the helical focuser allows precise adjustment without rotating the camera.',
				},
				specs: [
					{ label: { ca: 'Obertura', es: 'Apertura', en: 'Aperture' }, value: { ca: '60 mm', es: '60 mm', en: '60 mm' } },
					{ label: { ca: 'Distància focal', es: 'Distancia focal', en: 'Focal length' }, value: { ca: '240 mm', es: '240 mm', en: '240 mm' } },
					{ label: { ca: 'Relació focal', es: 'Relación focal', en: 'Focal ratio' }, value: { ca: 'f/4', es: 'f/4', en: 'f/4' } },
					{ label: { ca: 'Enfocador', es: 'Enfocador', en: 'Focuser' }, value: { ca: 'Helicoidal d’1,25″, recorregut de 30 mm, no rotatiu', es: 'Helicoidal de 1,25″, recorrido de 30 mm, no rotativo', en: '1.25″ helical, 30 mm travel, non-rotating' } },
					{ label: { ca: 'Connexions', es: 'Conexiones', en: 'Connections' }, value: { ca: 'Sortida d’1,25″ o rosca T2 (M42 × 0,75)', es: 'Salida de 1,25″ o rosca T2 (M42 × 0,75)', en: '1.25″ output or T2 thread (M42 × 0.75)' } },
					{ label: { ca: 'Pes', es: 'Peso', en: 'Weight' }, value: { ca: '690 g', es: '690 g', en: '690 g' } },
					{ label: { ca: 'Subjecció', es: 'Sujeción', en: 'Mounting' }, value: { ca: 'Anelles guia amb cargols de punta de niló i base tipus sabata', es: 'Anillas guía con tornillos de punta de nailon y base tipo zapata', en: 'Guide rings with nylon-tipped screws and standard dovetail base' } },
				],
			}),
			item('guide-camera', '02', { ca: 'ZWO ASI220MM Mini', es: 'ZWO ASI220MM Mini', en: 'ZWO ASI220MM Mini' }, { ca: 'Càmera de guiatge', es: 'Cámara de guiado', en: 'Guide camera' }, { ca: 'Sensor monocrom dedicat al seguiment', es: 'Sensor monocromo dedicado al seguimiento', en: 'Monochrome sensor dedicated to tracking' }, { ca: 'camera-guiatge', es: 'camara-guiado', en: 'guide-camera' }, {
				image: 'imagenes/equipo/equipo-asi220mm-mini-caja.png',
				imageAlt: { ca: 'Caixa original de la càmera de guiatge ZWO ASI220MM Mini', es: 'Caja original de la cámara de guiado ZWO ASI220MM Mini', en: 'Original box for the ZWO ASI220MM Mini guide camera' },
				additionalImage: 'imagenes/equipo/equipo-camara-guiado.jpeg',
				additionalImageAlt: { ca: 'Càmera de guiatge monocroma ZWO ASI220MM Mini connectada al tub Svbony SV106 en el muntatge', es: 'Cámara de guiado monocroma ZWO ASI220MM Mini conectada al tubo Svbony SV106 en el montaje', en: 'ZWO ASI220MM Mini monochrome guide camera connected to the Svbony SV106 scope on the rig' },
				additionalImageCaption: { ca: 'La ASI220MM Mini instal·lada al tub de guiatge', es: 'La ASI220MM Mini instalada en el tubo de guiado', en: 'The ASI220MM Mini installed on the guide scope' },
				description: {
					ca: 'La ZWO ASI220MM Mini és una càmera monocroma compacta destinada a l’autoguiatge. El sensor de 2,07 megapíxels, els píxels de 4 μm i una eficiència quàntica màxima del 92 % afavoreixen la detecció d’estrelles guia amb exposicions curtes.',
					es: 'La ZWO ASI220MM Mini es una cámara monocroma compacta destinada al autoguiado. El sensor de 2,07 megapíxeles, los píxeles de 4 μm y una eficiencia cuántica máxima del 92 % favorecen la detección de estrellas guía con exposiciones cortas.',
					en: 'The ZWO ASI220MM Mini is a compact monochrome autoguiding camera. Its 2.07-megapixel sensor, 4 μm pixels and peak quantum efficiency of 92% support reliable guide-star detection with short exposures.',
				},
				specs: [
					{ label: { ca: 'Sensor', es: 'Sensor', en: 'Sensor' }, value: { ca: 'CMOS monocrom SmartSens SC2210, format 1/1,8″', es: 'CMOS monocromo SmartSens SC2210, formato 1/1,8″', en: 'SmartSens SC2210 monochrome CMOS, 1/1.8″ format' } },
					{ label: { ca: 'Resolució', es: 'Resolución', en: 'Resolution' }, value: { ca: '2,07 MP (1920 × 1080)', es: '2,07 MP (1920 × 1080)', en: '2.07 MP (1920 × 1080)' } },
					{ label: { ca: 'Mida de píxel', es: 'Tamaño de píxel', en: 'Pixel size' }, value: { ca: '4,0 μm', es: '4,0 μm', en: '4.0 μm' } },
					{ label: { ca: 'Eficiència quàntica màxima', es: 'Eficiencia cuántica máxima', en: 'Peak quantum efficiency' }, value: { ca: '92 %', es: '92 %', en: '92%' } },
					{ label: { ca: 'Interfície', es: 'Interfaz', en: 'Interface' }, value: { ca: 'USB 2.0 tipus C i port ST4', es: 'USB 2.0 tipo C y puerto ST4', en: 'USB 2.0 Type-C and ST4 port' } },
					{ label: { ca: 'Exposició', es: 'Exposición', en: 'Exposure' }, value: { ca: 'De 32 μs a 10 s', es: 'De 32 μs a 10 s', en: '32 μs to 10 s' } },
					{ label: { ca: 'Convertidor', es: 'Convertidor', en: 'ADC' }, value: { ca: '12 bits', es: '12 bits', en: '12 bit' } },
					{ label: { ca: 'Dimensions i pes', es: 'Dimensiones y peso', en: 'Dimensions and weight' }, value: { ca: 'Ø 36 × 61 mm · 60 g', es: 'Ø 36 × 61 mm · 60 g', en: 'Ø 36 × 61 mm · 60 g' } },
					{ label: { ca: 'Back focus', es: 'Back focus', en: 'Back focus' }, value: { ca: '8,5 mm / 12,5 mm', es: '8,5 mm / 12,5 mm', en: '8.5 mm / 12.5 mm' } },
				],
			}),
		],
	},
	{
		id: 'mount', number: '03',
		title: { ca: 'Muntura i trípode', es: 'Montura y trípode', en: 'Mount and tripod' },
		summary: { ca: 'Suport i seguiment equatorial', es: 'Soporte y seguimiento ecuatorial', en: 'Support and equatorial tracking' },
		slug: { ca: 'muntura-tripode', es: 'montura-tripode', en: 'mount-tripod' },
		hotspot: { x: 18, y: 56, targetX: 45, targetY: 50 },
		items: [
			item('wave-150i', '01', { ca: 'Sky-Watcher Wave 150i', es: 'Sky-Watcher Wave 150i', en: 'Sky-Watcher Wave 150i' }, { ca: 'Muntura harmònica', es: 'Montura armónica', en: 'Harmonic mount' }, { ca: 'Seguiment equatorial o azimutal de gran capacitat', es: 'Seguimiento ecuatorial o azimutal de gran capacidad', en: 'High-capacity equatorial or alt-azimuth tracking' }, { ca: 'wave-150i', es: 'wave-150i', en: 'wave-150i' }, {
				image: 'imagenes/equipo/equipo-wave-150i.jpeg',
				imageAlt: { ca: 'Muntura Sky-Watcher Wave 150i instal·lada sobre la torreta d’extensió', es: 'Montura Sky-Watcher Wave 150i instalada sobre la torreta de extensión', en: 'Sky-Watcher Wave 150i mount installed on the extension pier' },
				additionalImage: 'imagenes/equipo/equipo-wave-150i-posterior.jpeg',
				additionalImageAlt: { ca: 'Vista posterior de la Wave 150i amb les connexions i la torreta d’extensió', es: 'Vista posterior de la Wave 150i con las conexiones y la torreta de extensión', en: 'Rear view of the Wave 150i showing its connections and extension pier' },
				additionalImageCaption: { ca: 'Vista posterior i connexions', es: 'Vista posterior y conexiones', en: 'Rear view and connections' },
				description: {
					ca: 'La Sky-Watcher Wave 150i combina una construcció compacta de 5,8 kg amb una capacitat de càrrega de fins a 15 kg sense contrapesos i 25 kg amb contrapesos opcionals. La transmissió harmònica de relació 300:1 proporciona un parell elevat i permet treballar tant en configuració equatorial com azimutal. La motorització de doble eix s’encarrega del seguiment, el moviment, el guiatge i l’apuntat GOTO, amb control des d’un dispositiu mòbil o mitjançant programari compatible amb ASCOM.',
					es: 'La Sky-Watcher Wave 150i combina una construcción compacta de 5,8 kg con una capacidad de carga de hasta 15 kg sin contrapesos y 25 kg con contrapesos opcionales. La transmisión armónica con relación 300:1 proporciona un par elevado y permite trabajar tanto en configuración ecuatorial como azimutal. La motorización de doble eje se encarga del seguimiento, movimiento, guiado y apuntado GOTO, con control desde un dispositivo móvil o mediante software compatible con ASCOM.',
					en: 'The Sky-Watcher Wave 150i combines a compact 5.8 kg body with a payload capacity of up to 15 kg without counterweights and 25 kg with optional counterweights. Its 300:1 harmonic drive delivers high torque and supports both equatorial and alt-azimuth configurations. Dual-axis motors provide tracking, slewing, guiding and GOTO pointing, controlled from a mobile device or ASCOM-compatible software.',
				},
				specs: [
					{ label: { ca: 'Configuració', es: 'Configuración', en: 'Configuration' }, value: { ca: 'Equatorial o azimutal', es: 'Ecuatorial o azimutal', en: 'Equatorial or alt-azimuth' } },
					{ label: { ca: 'Capacitat de càrrega', es: 'Capacidad de carga', en: 'Payload capacity' }, value: { ca: '15 kg sense contrapesos · 25 kg amb contrapesos opcionals', es: '15 kg sin contrapesos · 25 kg con contrapesos opcionales', en: '15 kg without counterweights · 25 kg with optional counterweights' } },
					{ label: { ca: 'Transmissió', es: 'Transmisión', en: 'Transmission' }, value: { ca: 'Reductors harmònics i corretges síncrones · relació 300:1', es: 'Reductores armónicos y correas síncronas · relación 300:1', en: 'Harmonic drives and synchronous belts · 300:1 ratio' } },
					{ label: { ca: 'Eix RA', es: 'Eje RA', en: 'RA axis' }, value: { ca: 'Motor pas a pas, reductor harmònic, corretja síncrona i fre', es: 'Motor paso a paso, reductor armónico, correa síncrona y freno', en: 'Stepper motor, harmonic drive, synchronous belt and brake' } },
					{ label: { ca: 'Eix DEC', es: 'Eje DEC', en: 'DEC axis' }, value: { ca: 'Motor pas a pas, reductor harmònic i corretja síncrona', es: 'Motor paso a paso, reductor armónico y correa síncrona', en: 'Stepper motor, harmonic drive and synchronous belt' } },
					{ label: { ca: 'Velocitat màxima', es: 'Velocidad máxima', en: 'Maximum slew rate' }, value: { ca: '7,5°/s', es: '7,5°/s', en: '7.5°/s' } },
					{ label: { ca: 'Rang de latitud', es: 'Rango de latitud', en: 'Latitude range' }, value: { ca: 'De 0° a 90°', es: 'De 0° a 90°', en: '0° to 90°' } },
					{ label: { ca: 'Platina', es: 'Platina', en: 'Saddle' }, value: { ca: 'Compatible amb Losmandy i Vixen', es: 'Compatible con Losmandy y Vixen', en: 'Losmandy- and Vixen-compatible' } },
					{ label: { ca: 'Apuntat GOTO', es: 'Apuntado GOTO', en: 'GOTO pointing' }, value: { ca: 'Base de dades de 42.000 objectes celestes', es: 'Base de datos de 42.000 objetos celestes', en: '42,000-object celestial database' } },
					{ label: { ca: 'Connectivitat', es: 'Conectividad', en: 'Connectivity' }, value: { ca: 'Bluetooth, Wi-Fi i control ASCOM', es: 'Bluetooth, Wi-Fi y control ASCOM', en: 'Bluetooth, Wi-Fi and ASCOM control' } },
					{ label: { ca: 'Ports', es: 'Puertos', en: 'Ports' }, value: { ca: 'USB-B, USB-A i guiatge ST4', es: 'USB-B, USB-A y guiado ST4', en: 'USB-B, USB-A and ST4 guiding' } },
					{ label: { ca: 'Alimentació', es: 'Alimentación', en: 'Power supply' }, value: { ca: '12 V · 2 A · connector CC 5,5 × 2,1 mm', es: '12 V · 2 A · conector CC 5,5 × 2,1 mm', en: '12 V · 2 A · 5.5 × 2.1 mm DC connector' } },
					{ label: { ca: 'Consum', es: 'Consumo', en: 'Power consumption' }, value: { ca: '0,4 A en repòs · 1,8 A en moviment GOTO', es: '0,4 A en reposo · 1,8 A en movimiento GOTO', en: '0.4 A idle · 1.8 A during GOTO slewing' } },
					{ label: { ca: 'Seguretat', es: 'Seguridad', en: 'Safety' }, value: { ca: 'Fre de protecció davant d’un tall d’alimentació i bloqueig complet de l’eix RA', es: 'Freno de protección ante un corte de alimentación y bloqueo completo del eje RA', en: 'Power-loss safety brake and full RA-axis lock' } },
					{ label: { ca: 'Ajustos i indicadors', es: 'Ajustes e indicadores', en: 'Adjustments and indicators' }, value: { ca: 'Límits RA/DEC i posició HOME ajustables; nivell i indicador de latitud amb LED vermell', es: 'Límites RA/DEC y posición HOME ajustables; nivel e indicador de latitud con LED rojo', en: 'Adjustable RA/DEC limits and HOME position; red LED bubble level and latitude indicator' } },
					{ label: { ca: 'Pes', es: 'Peso', en: 'Weight' }, value: { ca: '5,8 kg', es: '5,8 kg', en: '5.8 kg' } },
					{ label: { ca: 'Dimensions', es: 'Dimensiones', en: 'Dimensions' }, value: { ca: '158 × 184 × 252 mm', es: '158 × 184 × 252 mm', en: '158 × 184 × 252 mm' } },
					{ label: { ca: 'Temperatura de treball', es: 'Temperatura de trabajo', en: 'Operating temperature' }, value: { ca: 'De −10 °C a +50 °C', es: 'De −10 °C a +50 °C', en: '−10 °C to +50 °C' } },
				],
			}),
			item('tripod', '02', { ca: 'Trípode HEQ-5 modificat', es: 'Trípode HEQ-5 modificado', en: 'Modified HEQ-5 tripod' }, { ca: 'Suport modificat', es: 'Soporte modificado', en: 'Modified support' }, { ca: 'Base baixa, extensió i llast per guanyar estabilitat', es: 'Base baja, extensión y lastre para ganar estabilidad', en: 'Low base, extension pier and ballast for greater stability' }, { ca: 'tripode', es: 'tripode', en: 'tripod' }, {
				image: 'imagenes/equipo/equipo-tripode-heq5.jpeg',
				imageAlt: { ca: 'Conjunt del trípode HEQ-5 rebaixat amb la torreta d’extensió i la muntura Wave 150i', es: 'Conjunto del trípode HEQ-5 rebajado con la torreta de extensión y la montura Wave 150i', en: 'Lowered HEQ-5 tripod assembly with the extension pier and Wave 150i mount' },
				additionalImage: 'imagenes/equipo/equipo-tripode-heq5-lastre.jpeg',
				additionalImageAlt: { ca: 'Detall de les potes del trípode HEQ-5 i del suport triangular inferior amb la bossa de llast', es: 'Detalle de las patas del trípode HEQ-5 y del soporte triangular inferior con la bolsa de lastre', en: 'Detail of the HEQ-5 tripod legs and the lower triangular support with its ballast bag' },
				additionalImageCaption: { ca: 'El llast de 8–10 kg reforça l’estabilitat del conjunt', es: 'El lastre de 8–10 kg refuerza la estabilidad del conjunto', en: 'The 8–10 kg ballast adds stability to the assembly' },
				galleryImages: [
					{
						image: 'imagenes/equipo/equipo-tripode-heq5-lastre-practico.jpeg',
						alt: { ca: 'Bossa inferior del trípode carregada amb pedres utilitzades com a llast', es: 'Bolsa inferior del trípode cargada con piedras utilizadas como lastre', en: 'Lower tripod bag loaded with stones used as ballast' },
						caption: { ca: 'Una solució pràctica: pedres disponibles al lloc d’observació aporten el pes sense haver de transportar-lo', es: 'Una solución práctica: las piedras disponibles en el lugar de observación aportan el peso sin tener que transportarlo', en: 'A practical solution: stones found at the observing site provide the weight without having to transport it' },
					},
				],
				description: {
					ca: 'La base és un trípode d’acer inoxidable utilitzat a la sèrie HEQ-5 de Sky-Watcher. L’he escurçat per situar la plataforma de muntatge a 650 mm del terra: en abaixar el centre de gravetat, el conjunt resulta més estable i menys sensible a vibracions. Sota les potes he afegit un suport triangular per col·locar-hi normalment entre 8 i 10 kg de llast. Entre el trípode i la muntura hi ha una extensió ZWO de 20 cm; a la part inferior utilitza un adaptador per a HEQ-5 i, a la superior, una connexió compatible amb la Sky-Watcher Wave 150i. El resultat continua sent relativament fàcil de transportar, però és sòlid i molt estable per a fotografia. Com a contrapartida, l’alçada reduïda no és adequada per a observació visual còmoda.',
					es: 'La base es un trípode de acero inoxidable utilizado en la serie HEQ-5 de Sky-Watcher. Lo he recortado para situar la plataforma de montaje a 650 mm del suelo: al bajar el centro de gravedad, el conjunto resulta más estable y menos sensible a las vibraciones. Bajo las patas he añadido un soporte triangular en el que normalmente coloco entre 8 y 10 kg de lastre. Entre el trípode y la montura hay una extensión ZWO de 20 cm; en la parte inferior utiliza un adaptador para HEQ-5 y, en la superior, una conexión compatible con la Sky-Watcher Wave 150i. El resultado sigue siendo relativamente fácil de transportar, pero es sólido y muy estable para fotografía. Como contrapartida, la altura reducida no es adecuada para una observación visual cómoda.',
					en: 'The base is a stainless-steel tripod used with Sky-Watcher’s HEQ-5 series. I shortened it so the mounting platform sits 650 mm above the ground: lowering the centre of gravity makes the assembly more stable and less sensitive to vibration. A triangular support below the legs normally carries 8 to 10 kg of ballast. A 20 cm ZWO extension pier sits between the tripod and mount, using an HEQ-5 adapter at the bottom and a connection compatible with the Sky-Watcher Wave 150i at the top. The complete assembly remains reasonably easy to transport while providing a solid, stable platform for imaging. The trade-off is that its reduced height is not suitable for comfortable visual observing.',
				},
				specs: [
					{ label: { ca: 'Origen', es: 'Origen', en: 'Original platform' }, value: { ca: 'Trípode de la sèrie Sky-Watcher HEQ-5', es: 'Trípode de la serie Sky-Watcher HEQ-5', en: 'Sky-Watcher HEQ-5 series tripod' } },
					{ label: { ca: 'Material', es: 'Material', en: 'Material' }, value: { ca: 'Acer inoxidable', es: 'Acero inoxidable', en: 'Stainless steel' } },
					{ label: { ca: 'Alçada modificada', es: 'Altura modificada', en: 'Modified height' }, value: { ca: 'Plataforma de muntatge a 650 mm del terra', es: 'Plataforma de montaje a 650 mm del suelo', en: 'Mounting platform 650 mm above ground' } },
					{ label: { ca: 'Extensió', es: 'Extensión', en: 'Extension pier' }, value: { ca: 'ZWO de 20 cm', es: 'ZWO de 20 cm', en: '20 cm ZWO extension' } },
					{ label: { ca: 'Adaptació inferior', es: 'Adaptación inferior', en: 'Lower interface' }, value: { ca: 'Compatible amb HEQ-5', es: 'Compatible con HEQ-5', en: 'HEQ-5 compatible' } },
					{ label: { ca: 'Adaptació superior', es: 'Adaptación superior', en: 'Upper interface' }, value: { ca: 'Compatible amb Sky-Watcher Wave 150i', es: 'Compatible con Sky-Watcher Wave 150i', en: 'Sky-Watcher Wave 150i compatible' } },
					{ label: { ca: 'Llast habitual', es: 'Lastre habitual', en: 'Typical ballast' }, value: { ca: 'Entre 8 i 10 kg', es: 'Entre 8 y 10 kg', en: '8–10 kg' } },
					{ label: { ca: 'Ús prioritari', es: 'Uso prioritario', en: 'Primary use' }, value: { ca: 'Astrofotografia; no recomanat per a observació visual', es: 'Astrofotografía; no recomendado para observación visual', en: 'Astrophotography; not recommended for visual observing' } },
				],
			}),
		],
	},
	{
		id: 'electronics', number: '04',
		title: { ca: 'Electrònica i control', es: 'Electrónica y control', en: 'Electronics and control' },
		summary: { ca: 'Alimentació i connexions', es: 'Alimentación y conexiones', en: 'Power and connections' },
		slug: { ca: 'electronica-control', es: 'electronica-control', en: 'electronics-control' },
		hotspot: { x: 82, y: 41, targetX: 53, targetY: 35 },
		items: [
			item('powerbox', '01', { ca: 'Pegasus Astro PPB Micro', es: 'Pegasus Astro PPB Micro', en: 'Pegasus Astro PPB Micro' }, { ca: 'Distribució d’alimentació', es: 'Distribución de alimentación', en: 'Power distribution' }, { ca: 'Alimentació, escalfadors i control ambiental', es: 'Alimentación, calentadores y control ambiental', en: 'Power, dew-heater and environmental control' }, { ca: 'distribuidor-powerbox', es: 'distribuidor-powerbox', en: 'powerbox-distributor' }, {
				image: 'imagenes/equipo/equipo-powerbox.jpeg',
				imageAlt: { ca: 'Pegasus Astro PPB Micro instal·lada sobre el tub principal amb les connexions d’alimentació i els escalfadors', es: 'Pegasus Astro PPB Micro instalada sobre el tubo principal con las conexiones de alimentación y los calentadores', en: 'Pegasus Astro PPB Micro installed on the main telescope with its power and dew-heater connections' },
				additionalImage: 'imagenes/equipo/equipo-electronica-vista-superior.jpeg',
				additionalImageAlt: { ca: 'Vista superior del muntatge amb la PPB Micro, el cablejat d’alimentació i el tren de guiatge', es: 'Vista superior del montaje con la PPB Micro, el cableado de alimentación y el tren de guiado', en: 'Top view of the rig showing the PPB Micro, power cabling and guiding train' },
				additionalImageCaption: { ca: 'Integració i cablejat en el muntatge', es: 'Integración y cableado en el montaje', en: 'Integration and cabling on the rig' },
				description: {
					ca: 'La Pegasus Astro Pocket Powerbox Micro centralitza l’alimentació i el control ambiental de l’equip en una carcassa compacta. Permet commutar les sortides de corrent, regular una sortida auxiliar i controlar dos escalfadors anticondensació, tant des de l’ordinador com en funcionament autònom.',
					es: 'La Pegasus Astro Pocket Powerbox Micro centraliza la alimentación y el control ambiental del equipo en una carcasa compacta. Permite conmutar las salidas de corriente, regular una salida auxiliar y controlar dos calentadores anticondensación, tanto desde el ordenador como en funcionamiento autónomo.',
					en: 'The Pegasus Astro Pocket Powerbox Micro centralises power distribution and environmental control in a compact enclosure. It provides switched power outlets, an adjustable auxiliary output and control of two dew heaters, either from a computer or in standalone operation.',
				},
				specs: [
					{ label: { ca: 'Sortides principals', es: 'Salidas principales', en: 'Main outputs' }, value: { ca: '4 × 12 V CC, commutables per programari', es: '4 × 12 V CC, conmutables mediante software', en: '4 × 12 V DC, software switchable' } },
					{ label: { ca: 'Potència total', es: 'Capacidad total', en: 'Total capacity' }, value: { ca: '10 A', es: '10 A', en: '10 A' } },
					{ label: { ca: 'Sortida regulable', es: 'Salida regulable', en: 'Adjustable output' }, value: { ca: '3, 5, 8, 9 o 12 V; commutable', es: '3, 5, 8, 9 o 12 V; conmutable', en: '3, 5, 8, 9 or 12 V; switchable' } },
					{ label: { ca: 'Escalfadors', es: 'Calentadores', en: 'Dew heaters' }, value: { ca: '2 canals PWM amb sortides RCA', es: '2 canales PWM con salidas RCA', en: '2 PWM channels with RCA outputs' } },
					{ label: { ca: 'Control anticondensació', es: 'Control anticondensación', en: 'Dew control' }, value: { ca: 'Auto-Dew amb sensor d’humitat i temperatura inclòs', es: 'Auto-Dew con sensor de humedad y temperatura incluido', en: 'Auto-Dew with included humidity and temperature sensor' } },
					{ label: { ca: 'Proteccions', es: 'Protecciones', en: 'Protection' }, value: { ca: 'Polaritat inversa i sobretensió', es: 'Polaridad inversa y sobretensión', en: 'Reverse polarity and overvoltage' } },
					{ label: { ca: 'Funcionament', es: 'Funcionamiento', en: 'Operation' }, value: { ca: 'Control USB/PC o funcionament autònom', es: 'Control USB/PC o funcionamiento autónomo', en: 'USB/PC controlled or standalone' } },
					{ label: { ca: 'Carcassa', es: 'Carcasa', en: 'Enclosure' }, value: { ca: 'Alumini CNC compacte', es: 'Aluminio CNC compacto', en: 'Compact CNC aluminium' } },
					{ label: { ca: 'Dimensions i pes', es: 'Dimensiones y peso', en: 'Dimensions and weight' }, value: { ca: '66 × 66 × 24 mm · 115 g', es: '66 × 66 × 24 mm · 115 g', en: '66 × 66 × 24 mm · 115 g' } },
				],
			}),
			item('usb-hub', '02', { ca: 'Pegasus Astro USB Control Hub', es: 'Pegasus Astro USB Control Hub', en: 'Pegasus Astro USB Control Hub' }, { ca: 'Connectivitat', es: 'Conectividad', en: 'Connectivity' }, { ca: 'Connexió USB centralitzada i commutable', es: 'Conexión USB centralizada y conmutable', en: 'Centralised, switchable USB connectivity' }, { ca: 'hub-usb', es: 'hub-usb', en: 'usb-hub' }, {
				image: 'imagenes/equipo/equipo-hub-usb.jpeg',
				imageAlt: { ca: 'Pegasus Astro USB Control Hub instal·lat sobre el tub principal i connectat als dispositius de l’equip', es: 'Pegasus Astro USB Control Hub instalado sobre el tubo principal y conectado a los dispositivos del equipo', en: 'Pegasus Astro USB Control Hub installed on the main telescope and connected to the rig devices' },
				additionalImage: 'imagenes/equipo/equipo-electronica-vista-superior.jpeg',
				additionalImageAlt: { ca: 'Vista superior del muntatge amb el USB Control Hub i la distribució dels cables cap als diferents dispositius', es: 'Vista superior del montaje con el USB Control Hub y la distribución de los cables hacia los distintos dispositivos', en: 'Top view of the rig showing the USB Control Hub and cable distribution to the connected devices' },
				additionalImageCaption: { ca: 'Distribució de les connexions USB', es: 'Distribución de las conexiones USB', en: 'USB connection layout' },
				description: {
					ca: 'El Pegasus Astro USB Control Hub concentra sis connexions USB en una unitat preparada per a l’astrofotografia. Cada port es pot activar o desactivar de manera independent, incloses les línies de dades i d’alimentació, i l’arquitectura Multi Transaction Operation manté el rendiment USB 3.1 encara que hi hagi dispositius USB 2.0 connectats.',
					es: 'El Pegasus Astro USB Control Hub concentra seis conexiones USB en una unidad preparada para astrofotografía. Cada puerto puede activarse o desactivarse de forma independiente, incluidas las líneas de datos y alimentación, y la arquitectura Multi Transaction Operation mantiene el rendimiento USB 3.1 aunque haya dispositivos USB 2.0 conectados.',
					en: 'The Pegasus Astro USB Control Hub brings six USB connections together in a unit designed for astrophotography. Each port can be switched independently, including its data and power lines, while Multi Transaction Operation preserves USB 3.1 performance when USB 2.0 devices are also connected.',
				},
				notes: [
					{
						title: { ca: 'Connexió amb l’ordinador i programari de control', es: 'Conexión con el ordenador y software de control', en: 'Computer connection and control software' },
						body: {
							ca: 'El hub es connecta mitjançant un cable USB actiu de 5 metres a un ordinador portàtil amb Windows 11, on s’executen els programes que coordinen tot l’equip. NINA gestiona les sessions de captura i el telescopi; PHD2 s’encarrega de l’autoguiatge, i Stellarium proporciona el planetari i la selecció d’objectes. Pegasus Astro Unity supervisa conjuntament el USB Control Hub i la PPB Micro, mostrant l’estat de les connexions, la temperatura i la humitat, el consum elèctric i el nivell de potència aplicat als escalfadors anticondensació del tub principal i del tub de guiatge. D’aquesta manera, un únic enllaç USB comunica el muntatge amb l’ordinador i permet controlar i vigilar el sistema des d’un sol punt.',
							es: 'El hub se conecta mediante un cable USB activo de 5 metros a un ordenador portátil con Windows 11, donde se ejecutan los programas que coordinan todo el equipo. NINA gestiona las sesiones de captura y el telescopio; PHD2 se encarga del autoguiado, y Stellarium proporciona el planetario y la selección de objetos. Pegasus Astro Unity supervisa conjuntamente el USB Control Hub y la PPB Micro, mostrando el estado de las conexiones, la temperatura y la humedad, el consumo eléctrico y el nivel de potencia aplicado a los calentadores anticondensación del tubo principal y del tubo de guiado. De este modo, un único enlace USB comunica el montaje con el ordenador y permite controlar y vigilar el sistema desde un solo punto.',
							en: 'The hub connects through a 5-metre active USB cable to a Windows 11 laptop running the applications that coordinate the complete setup. NINA manages imaging sessions and telescope control; PHD2 handles autoguiding, while Stellarium provides the planetarium view and target selection. Pegasus Astro Unity monitors the USB Control Hub and PPB Micro together, displaying connection status, temperature and humidity, power consumption and the output level of the dew heaters fitted to the main telescope and guide scope. In this way, a single USB link connects the rig to the computer and allows the whole system to be controlled and monitored from one place.',
						},
					},
				],
				specs: [
					{ label: { ca: 'Ports', es: 'Puertos', en: 'Ports' }, value: { ca: '6 × USB 3.1 Gen 1, compatibles amb USB 1.0 i 2.0', es: '6 × USB 3.1 Gen 1, compatibles con USB 1.0 y 2.0', en: '6 × USB 3.1 Gen 1, backward compatible with USB 1.0 and 2.0' } },
					{ label: { ca: 'Gestió de ports', es: 'Gestión de puertos', en: 'Port management' }, value: { ca: 'Dades i alimentació commutables per port mitjançant programari o ASCOM Switch', es: 'Datos y alimentación conmutables por puerto mediante software o ASCOM Switch', en: 'Per-port data and power switching via software or ASCOM Switch' } },
					{ label: { ca: 'Operació simultània', es: 'Operación simultánea', en: 'Concurrent operation' }, value: { ca: 'Multi Transaction Operation: USB 3.1 a 5 Gbit/s independent del trànsit USB 2.0', es: 'Multi Transaction Operation: USB 3.1 a 5 Gbit/s independiente del tráfico USB 2.0', en: 'Multi Transaction Operation: 5 Gbps USB 3.1 transfers remain independent of USB 2.0 traffic' } },
					{ label: { ca: 'Entrada', es: 'Entrada', en: 'Input' }, value: { ca: '12–14 V CC', es: '12–14 V CC', en: '12–14 V DC' } },
					{ label: { ca: 'Sortida per port', es: 'Salida por puerto', en: 'Output per port' }, value: { ca: 'Fins a 2,5 A', es: 'Hasta 2,5 A', en: 'Up to 2.5 A' } },
					{ label: { ca: 'Capacitat total', es: 'Capacidad total', en: 'Total capacity' }, value: { ca: '8 A', es: '8 A', en: '8 A' } },
					{ label: { ca: 'Protecció', es: 'Protección', en: 'Protection' }, value: { ca: 'Límit de corrent intel·ligent per port contra curtcircuits', es: 'Límite de corriente inteligente por puerto contra cortocircuitos', en: 'Per-port intelligent current limiting with short-circuit protection' } },
					{ label: { ca: 'Temperatura de treball', es: 'Temperatura de trabajo', en: 'Operating temperature' }, value: { ca: 'De −40 °C a +85 °C', es: 'De −40 °C a +85 °C', en: '−40 °C to +85 °C' } },
					{ label: { ca: 'Construcció', es: 'Construcción', en: 'Construction' }, value: { ca: 'Alumini anoditzat; protecció ESD de ±5 kV', es: 'Aluminio anodizado; protección ESD de ±5 kV', en: 'Anodised aluminium; ±5 kV ESD protection' } },
					{ label: { ca: 'Expansió', es: 'Expansión', en: 'Expansion' }, value: { ca: 'Port RJ12 EXT', es: 'Puerto RJ12 EXT', en: 'RJ12 EXT port' } },
					{ label: { ca: 'Dimensions i pes', es: 'Dimensiones y peso', en: 'Dimensions and weight' }, value: { ca: '100 × 72 × 24 mm · 200 g', es: '100 × 72 × 24 mm · 200 g', en: '100 × 72 × 24 mm · 200 g' } },
				],
			}),
			item('flat-panel', '03', { ca: 'Pegasus Astro FlatMaster 150L Wi-Fi', es: 'Pegasus Astro FlatMaster 150L Wi-Fi', en: 'Pegasus Astro FlatMaster 150L Wi-Fi' }, { ca: 'Calibratge', es: 'Calibración', en: 'Calibration' }, { ca: 'Panell LED regulable per obtenir flats uniformes', es: 'Panel LED regulable para obtener flats uniformes', en: 'Dimmable LED panel for uniform flat-field frames' }, { ca: 'panell-flats-pegasus', es: 'panel-flats-pegasus', en: 'pegasus-flat-field-panel' }, {
				image: 'imagenes/equipo/equipo-flat-panel-pegasus.jpeg',
				imageAlt: { ca: 'Pegasus Astro FlatMaster 150L Wi-Fi col·locat sobre l’obertura del telescopi principal amb un adaptador artesanal', es: 'Pegasus Astro FlatMaster 150L Wi-Fi colocado sobre la abertura del telescopio principal con un adaptador artesanal', en: 'Pegasus Astro FlatMaster 150L Wi-Fi fitted over the main telescope aperture with a custom-made adapter' },
				additionalImage: 'imagenes/equipo/equipo-flat-panel-pegasus-posterior.jpeg',
				additionalImageAlt: { ca: 'Vista del FlatMaster 150L amb les cintes de subjecció, l’adaptador artesanal i la connexió mini-USB', es: 'Vista del FlatMaster 150L con las cintas de sujeción, el adaptador artesanal y la conexión mini-USB', en: 'View of the FlatMaster 150L with its retaining straps, custom-made adapter and mini-USB connection' },
				additionalImageCaption: { ca: 'El «barret» artesanal adapta el panell a l’OTA', es: 'El «sombrero» artesanal adapta el panel a la OTA', en: 'The custom-made “hat” fits the panel to the OTA' },
				description: {
					ca: 'El FlatMaster 150L Wi-Fi és un panell de llum LED blanca, uniforme i regulable, pensat per obtenir flats de calibratge en astrofotografia i fotometria amb telescopis de fins a 6 polzades. Per adaptar-lo al meu OTA he fabricat una mena de «barret» a mida mitjançant paper emmotllat i plaques de poliuretà expandit, de manera que es pugui col·locar amb seguretat a l’extrem del tub. En el meu muntatge el controlo des de NINA amb l’Assistent de flats, que permet seqüenciar a distància els flats i els dark flats sense manipular el panell. També es pot controlar per Wi-Fi amb l’aplicació Pegasus Astro Unity, tant en mode punt d’accés com connectat a una xarxa de 2,4 GHz.',
					es: 'El FlatMaster 150L Wi-Fi es un panel de luz LED blanca, uniforme y regulable, pensado para obtener flats de calibración en astrofotografía y fotometría con telescopios de hasta 6 pulgadas. Para adaptarlo a mi OTA he fabricado una especie de «sombrero» a medida mediante papel moldeado y placas de poliuretano expandido, de forma que pueda colocarse con seguridad en el extremo del tubo. En mi montaje lo controlo desde NINA con el Asistente de flats, que permite secuenciar a distancia los flats y los dark flats sin manipular el panel. También puede controlarse por Wi-Fi con la aplicación Pegasus Astro Unity, tanto en modo punto de acceso como conectado a una red de 2,4 GHz.',
					en: 'The FlatMaster 150L Wi-Fi is a uniform, dimmable white LED panel designed to produce calibration flats for astrophotography and photometry with telescopes up to 6 inches. To fit it to my OTA, I made a custom “hat” from moulded paper and expanded polyurethane sheets so it can sit securely over the end of the telescope. In my setup it is controlled from NINA using the Flat Wizard, allowing flats and dark flats to be sequenced remotely without handling the panel. It can also be controlled over Wi-Fi with Pegasus Astro Unity, either as a 2.4 GHz access point or as a client on an existing network.',
				},
				specs: [
					{ label: { ca: 'Tipus', es: 'Tipo', en: 'Type' }, value: { ca: 'Panell de llum LED blanca', es: 'Panel de luz LED blanca', en: 'White LED light panel' } },
					{ label: { ca: 'Regulació', es: 'Regulación', en: 'Dimming' }, value: { ca: 'De 0 a 100 %', es: 'De 0 a 100 %', en: '0–100%' } },
					{ label: { ca: 'Control manual', es: 'Control manual', en: 'Manual control' }, value: { ca: 'Polsador amb diferents nivells de brillantor', es: 'Pulsador con diferentes niveles de brillo', en: 'Push button with different brightness levels' } },
					{ label: { ca: 'Diàmetre útil', es: 'Diámetro útil', en: 'Usable diameter' }, value: { ca: '150 mm / 5,9 polzades', es: '150 mm / 5,9 pulgadas', en: '150 mm / 5.9 inches' } },
					{ label: { ca: 'Compatibilitat', es: 'Compatibilidad', en: 'Compatibility' }, value: { ca: 'Telescopis de fins a 6 polzades', es: 'Telescopios de hasta 6 pulgadas', en: 'Telescopes up to 6 inches' } },
					{ label: { ca: 'Alimentació', es: 'Alimentación', en: 'Power requirements' }, value: { ca: '5 V CC per cable mini-USB · 500 mA màxim', es: '5 V CC mediante cable mini-USB · 500 mA máximo', en: '5 V DC via mini-USB cable · 500 mA maximum' } },
					{ label: { ca: 'Material', es: 'Material', en: 'Material' }, value: { ca: 'Plàstic ABS negre resistent', es: 'Plástico ABS negro resistente', en: 'Strong black ABS plastic' } },
					{ label: { ca: 'Dimensions', es: 'Dimensiones', en: 'Dimensions' }, value: { ca: 'Ø 250 mm × 8 mm de gruix', es: 'Ø 250 mm × 8 mm de grosor', en: 'Ø 250 mm × 8 mm thick' } },
					{ label: { ca: 'Pes', es: 'Peso', en: 'Weight' }, value: { ca: '350 g', es: '350 g', en: '350 g' } },
					{ label: { ca: 'Wi-Fi', es: 'Wi-Fi', en: 'Wi-Fi' }, value: { ca: 'Punt d’accés o client a 2,4 GHz', es: 'Punto de acceso o cliente a 2,4 GHz', en: '2.4 GHz access point or client' } },
				],
			}),
		],
	},
];

export const equipmentUi: Record<Lang, Record<string, string>> = {
	ca: { backHome: 'Tornar a la portada', backEquipment: 'Tornar a El meu equip', explore: 'Explora les quatre àrees de l’equip', prototype: 'Prototip local', components: 'components', component: 'component', photoPending: 'Fotografia pendent', provisional: 'Fitxa provisional', provisionalImage: 'Imatge provisional', detailsPending: 'Característiques tècniques pendents', specifications: 'Característiques tècniques', referenceGraphic: 'Resum gràfic provisional', viewDetails: 'Veure la fitxa de' },
	es: { backHome: 'Volver a la portada', backEquipment: 'Volver a Mi equipo', explore: 'Explora las cuatro áreas del equipo', prototype: 'Prototipo local', components: 'componentes', component: 'componente', photoPending: 'Fotografía pendiente', provisional: 'Ficha provisional', provisionalImage: 'Imagen provisional', detailsPending: 'Características técnicas pendientes', specifications: 'Características técnicas', referenceGraphic: 'Resumen gráfico provisional', viewDetails: 'Ver la ficha de' },
	en: { backHome: 'Back to the home page', backEquipment: 'Back to My equipment', explore: 'Explore the four equipment areas', prototype: 'Local prototype', components: 'components', component: 'component', photoPending: 'Photograph pending', provisional: 'Provisional page', provisionalImage: 'Provisional image', detailsPending: 'Technical specifications pending', specifications: 'Technical specifications', referenceGraphic: 'Provisional graphical overview', viewDetails: 'View the details for' },
};

export const groupHref = (lang: Lang, group: EquipmentGroup, base = '/') => `${equipmentHref(lang, base)}/${group.slug[lang]}`;
export const itemHref = (lang: Lang, group: EquipmentGroup, equipmentItem: EquipmentItem, base = '/') => `${groupHref(lang, group, base)}/${equipmentItem.slug[lang]}`;
export const equipmentGroupLinks = (group: EquipmentGroup, base = '/') => ({ ca: groupHref('ca', group, base), es: groupHref('es', group, base), en: groupHref('en', group, base) });
export const equipmentItemLinks = (group: EquipmentGroup, equipmentItem: EquipmentItem, base = '/') => ({ ca: itemHref('ca', group, equipmentItem, base), es: itemHref('es', group, equipmentItem, base), en: itemHref('en', group, equipmentItem, base) });
