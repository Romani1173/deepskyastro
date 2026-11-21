# Guía del proyecto: El meu Cel Profund

## Comunicación

- Comunicarse con el autor en español, de forma clara y paso a paso.
- El sitio es multilingüe: catalán (`ca`), castellano (`es`) e inglés (`en`). Los textos generales se centralizan en `src/i18n.ts`.

## Diseño

- Conservar Inter para los textos. En todas las herramientas (Visibilidad, Planificación, Analizador, Captura y Mi noche), usar también Inter para los datos numéricos, siguiendo Visibilidad: cifras claras y cero sin punto interior. Space Mono puede conservarse fuera de estas interfaces.
- Las herramientas nuevas deben reutilizar la tipografía, tamaños, pesos y controles ya aprobados, tomando Visibilidad como referencia de legibilidad. Revisar campos, resultados, tablas, gráficas y vista móvil; evitar ceros con punto interior y negritas sintéticas. No introducir variantes de diseño por iniciativa propia.
- En Captura, el tiempo adicional de dither inicial aprobado es 6 s. Los cambios visuales no deben modificar los valores iniciales ni invalidar o sobrescribir los ajustes guardados del usuario. Conservar las claves de persistencia salvo migración expresamente necesaria y comprobar recarga y cambio de modo.
- Mantener la estética oscura actual y no rediseñar el sitio de forma amplia sin solicitarlo primero.

## Publicación y estado actual

- La web pública activa se publica con Cloudflare Pages en `https://deepskyastro.com`; `https://deepskyastro.pages.dev` es únicamente el dominio técnico de Pages.
- GitHub Pages está también configurado como alternativa, pero el enlace público de referencia es el de Cloudflare Pages.
- Los objetivos pendientes y sus alias se muestran actualmente en producción tanto en Visibilidad como en Planificación. Esta publicación se controla con `PUBLIC_PENDING_OBJECTS` en `src/config/features.ts`. Para volver a ocultarlos en producción sin perder la funcionalidad local, cambiar únicamente ese interruptor a `false`; en desarrollo local continuarán disponibles.
- Las fichas permiten ampliar la imagen principal y las adicionales al pulsarlas; el visor se cierra con la `×`, al tocar fuera o con `Esc`.
- La galería permite buscar **solo por el campo `objecte`** y ordenar por fecha reciente o por nombre natural (`M 2` antes que `M 10`, `NGC 2237` antes que `NGC 6960`). Esta ordenación está disponible también en cada categoría.
- Las denominaciones visibles de catálogo separan el prefijo y el número (`NGC 2237`, `IC 434`, `M 31`, `LDN 1235`, `Sh 2-119`, `PK 064+05.1`). Aplicar el espacio mediante la capa de presentación; no modificar por esta razón el YAML, los identificadores, slugs, nombres de archivo, rutas, enlaces ni referencias cruzadas técnicas.
- El diseño de la galería y las categorías está aprobado en este punto; no cambiarlo de forma amplia sin petición expresa.
- La portada usa `public/imagenes/portada.webp`, con estrellas visibles y el mensaje principal desplazado 10 mm hacia arriba. La autoría de Juan José Romero aparece integrada en el subtítulo con la tipografía manuscrita de la antigua firma; no mostrar una firma independiente abajo a la izquierda. En escritorio, los cinco accesos inferiores forman una fila compacta a la derecha: los accesos secundarios son discretos, «La meva nit» incorpora el distintivo «Avançat» y “Explora la galeria” queda destacado; en móvil se apilan verticalmente.

## Idiomas

- El catalán conserva las rutas históricas sin prefijo. El castellano usa `/es/` y el inglés `/en/`.
- Los nombres de las constelaciones se muestran siempre en latín en los tres idiomas; solo se normalizan variantes no canónicas como `Aquari` a `Aquarius` y `Cefeu` a `Cepheus`.
- El selector de idioma muestra las banderas y los códigos `CA`, `ES` y `EN`; debe llevar siempre a la página equivalente, no a la portada genérica.
- Las rutas localizadas de la galería son `/es/galeria` y `/en/gallery`; las categorías usan `/es/categoria/...` y `/en/category/...`; las fichas usan `/es/foto/...` y `/en/photo/...`.
- La fase 1 traduce la interfaz, navegación, etiquetas técnicas, fechas y metadatos.
- La traducción está completa: las 38 fichas incluyen nombre, descripción y textos de imágenes adicionales en castellano e inglés, y los valores técnicos se localizan mediante `src/technicalTranslations.ts`.
- Al añadir nuevos valores técnicos con texto natural, actualizar las reglas o el mapa de constelaciones de `src/technicalTranslations.ts` y verificar las salidas en castellano e inglés.
- Las traducciones particulares se guardan en `traduccions.es` y `traduccions.en`; las de imágenes adicionales se guardan dentro del bloque `traduccions` de cada imagen. No sustituir los textos originales en catalán.
- No duplicar traducciones generales dentro de las páginas: usar `src/i18n.ts` y los componentes compartidos.

## Trabajo y publicación

- El proyecto editable es esta carpeta: `/Users/juanjoromero/Desktop/Web_deepskyastro`.
- Guardar las copias ZIP de seguridad en `backups/` y los entregables locales en `outputs/`. Estas carpetas no se suben a Git; antes de borrar respaldos antiguos, verificar que la copia nueva existe y coincide.
- La sección gráfica “Mi equipo” se desarrolla en la rama local `mi-equipo`. No fusionar, subir a GitHub ni publicar esta rama hasta que el autor haya aprobado el resultado final.
- Las imágenes provisionales de “Mi equipo” deben sustituirse por fotografías reales del autor antes de publicar; conservar mientras tanto la interacción local para poder decidir encuadres y puntos sensitivos.
- Ejecutar `npm run dev` en una terminal para la vista local y conservarla abierta mientras se prueba el sitio.
- Para Git (`git status`, `git add`, `git commit`, `git push`) usar una **segunda terminal**; la que ejecuta el servidor local no acepta esos comandos.
- Tras verificar con `npm run build`, publicar con `git push origin main`. Cloudflare Pages se actualiza automáticamente después de recibir el cambio en GitHub; puede requerir uno o dos minutos y una recarga forzada.
- Antes de subir, revisar `git status` para distinguir cambios de código de las nuevas fichas e imágenes del autor.

## Fichas de objetos

- La skill local `.codex/skills/generar-ficha-astrofoto` genera el YAML multilingüe de nuevas fichas. Usarla cuando se solicite una ficha nueva y actualizarla si cambia el esquema de contenido.
- La skill local `.codex/skills/crear-cuaderno-fotografia` crea y traduce los comentarios narrativos extensos de una ficha sin duplicar su introducción ni los datos técnicos del YAML.
- Cada objeto es un archivo Markdown en `src/content/fotos/`.
- La imagen principal se guarda en `public/imagenes/` y se declara con `imatge`.
- `imatge` debe aparecer siempre inmediatamente después de `categoria`.
- `imatges_addicionals` debe aparecer al final del frontmatter, antes del cierre `---`.
- `imatges_addicionals` es opcional: incluir únicamente las imágenes que existan físicamente.
- Antes de generar o modificar una ficha, revisar los archivos reales en `public/imagenes/`; nunca inventar nombres de imagen.

## Artículos

- Cada artículo tiene sus datos (título, resumen, fecha, tema, portada y PDF) en `src/content/articulos/<clave>.md`.
- El texto web de cada idioma va en `src/content/articulos-texto/<clave>/ca.md` y `es.md` (Markdown con títulos `##`/`###`, listas, notas `>` e imágenes). Sus figuras se guardan en `src/assets/articulos/<clave>/` y se enlazan como `../../../assets/articulos/<clave>/<archivo>`; Astro las convierte a WebP. Cada imagen necesita un texto alternativo descriptivo en su idioma.
- La URL usa el `slug` del artículo; para un slug distinto en castellano, poner `ruta: "..."` en el frontmatter de `es.md` (nunca `slug:`, que Astro usa como identificador).
- Si existe el texto web, la lista de artículos enlaza a la página web (con tiempo de lectura) y el PDF queda como descarga al final del artículo. Si un artículo solo tiene PDF, la lista muestra los botones de PDF como antes.
- No hay versión inglesa del texto: la lista en inglés enlaza a las versiones catalana y castellana.
- Las tarjetas de artículo salen de `src/components/ArticleCard.astro` (lista y bloque «Continua llegint» al final de cada artículo). Todas comparten tamaño de imagen y título; la más reciente solo lleva la etiqueta «Més recent» y un borde algo más marcado. Toda la tarjeta es el enlace.
- La lista se filtra por tema (`tema` del artículo); al añadir un tema nuevo, añadir su nombre en `topicNames` de `src/lib/articles.ts`.

## Objetivos pendientes

- La skill local `.codex/skills/anadir-pendientes-visibilidad` añade o actualiza objetivos pendientes, nombres comunes multilingües y alias de catálogo. Usarla siempre que se soliciten cambios en estos objetivos.

## Imágenes adicionales

- Mantener este orden: `starless`, `crop`, `fov`, `annotated`, `process`, `other`.
- Usar las extensiones reales disponibles (`.jpg` o `.webp`).
- Convención habitual de nombres: `OBJETO_starless`, `OBJETO_crop`, `OBJETO_fov`, `OBJETO_annotated` y `OBJETO_process`.
- Para variantes no cubiertas por esa convención, usar `tipus: "other"` y un título descriptivo.
- No duplicar en el cuerpo Markdown imágenes ya declaradas en `imatges_addicionals`.
- Las imágenes con `tipus: "process"` usan siempre el título catalán `Flux de postprocessament`, sin guion; sus equivalentes son `Flujo de posprocesado` en castellano y `Post-processing workflow` en inglés.

## Rendimiento, SEO y seguridad

- `npm run dev` y `npm run build` ejecutan antes `images:generate` (`scripts/generate-optimized-images.mjs`): crea copias WebP ligeras en `public/imagenes/optimizadas/` (no se suben a Git) y falla si una ficha cita una imagen que no existe. Los originales no se modifican y el visor ampliado sigue usándolos.
- En las plantillas, usar `optimizedImage()` de `src/lib/optimized-images.ts` para mostrar fotos en tarjetas o fichas; no enlazar directamente el original salvo para el visor ampliado.
- Las URL canónicas, `hreflang` y Open Graph usan siempre `PRODUCTION_SITE` (`src/consts.ts`), también en la copia de GitHub Pages.
- Los títulos de página terminan en «| DeepSkyAstro» y se construyen con `src/lib/seo.ts` (palabra clave «Astrofotografia/Astrofotografía/Astrophotography» si cabe). Las descripciones y los datos estructurados (schema.org) de galería, categorías, Sol, artículos y equipo también salen de ahí; al crear un tipo de página nuevo, reutilizar esas utilidades.
- Las fotografías se publican con licencia CC BY-NC 4.0 (`IMAGE_LICENSE` en `src/lib/seo.ts`), explicada en la página «Ús de les imatges» (`src/components/ImageUsePage.astro`, enlazada en el pie). Las fichas y fotos del Sol declaran `license` y `acquireLicensePage` en sus datos estructurados. Para mostrar un correo de contacto para usos comerciales, rellenar `LICENSE_CONTACT_EMAIL`.
- Los nombres de objeto (`objecte`) en catalán y castellano deben estar en su idioma, no en inglés: el título de Google y la cabecera de la ficha salen de ese campo.
- Las fuentes Inter y Space Mono se descargan al compilar (`fonts` en `astro.config.mjs`) y se sirven desde la propia web; no volver a enlazar Google Fonts.
- `public/_headers` define las cabeceras de seguridad y caché de Cloudflare Pages. Si se añade un servicio externo (API, analítica, mapas…), hay que permitir su dominio en `Content-Security-Policy`.
- El Worker de valoraciones (`feedback-worker/`) no se publica con `git push`: tras cambiarlo, ejecutar `npm run check` y `npm run deploy` dentro de esa carpeta.

## Verificación

- Tras cambiar datos, imágenes o plantillas, ejecutar `npm run build` desde la raíz del proyecto.
- Mantener la compatibilidad: las tarjetas usan `imatge`; las fichas muestran `imatges_addicionals` automáticamente.
