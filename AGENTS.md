# Guía del proyecto: El meu Cel Profund

## Comunicación

- Comunicarse con el autor en español, de forma clara y paso a paso.
- El sitio es multilingüe: catalán (`ca`), castellano (`es`) e inglés (`en`). Los textos generales se centralizan en `src/i18n.ts`.

## Diseño

- Conservar la tipografía elegida por el autor: Inter para los textos y Space Mono para los datos técnicos.
- Mantener la estética oscura actual y no rediseñar el sitio de forma amplia sin solicitarlo primero.

## Publicación y estado actual

- La web pública activa se publica con Cloudflare Pages en `https://porfolio-astrofoto.pages.dev`.
- GitHub Pages está también configurado como alternativa, pero el enlace público de referencia es el de Cloudflare Pages.
- Las fichas permiten ampliar la imagen principal y las adicionales al pulsarlas; el visor se cierra con la `×`, al tocar fuera o con `Esc`.
- La galería permite buscar **solo por el campo `objecte`** y ordenar por fecha reciente o por nombre natural (`M2` antes que `M10`, `NGC2237` antes que `NGC6960`). Esta ordenación está disponible también en cada categoría.
- Los nombres de catálogo NGC se escriben siempre unidos (`NGC2237`) en títulos, descripciones, comentarios, metadatos y textos de interfaz; no se admite ningún espacio tras el prefijo.
- El diseño de la galería y las categorías está aprobado en este punto; no cambiarlo de forma amplia sin petición expresa.
- La portada usa `public/imagenes/portada.webp`, con estrellas visibles, la firma blanca `Juan José Romero` en Bradley Hand abajo a la izquierda y el mensaje principal desplazado 10 mm hacia arriba. El acceso “Explora la galeria” debe permanecer abajo a la derecha.

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

- El proyecto editable es esta carpeta: `work/porfolio-astrofoto`.
- La sección gráfica “Mi equipo” se desarrolla en la rama local `mi-equipo`. No fusionar, subir a GitHub ni publicar esta rama hasta que el autor haya aprobado el resultado final.
- Las imágenes provisionales de “Mi equipo” deben sustituirse por fotografías reales del autor antes de publicar; conservar mientras tanto la interacción local para poder decidir encuadres y puntos sensitivos.
- Ejecutar `npm run dev` en una terminal para la vista local y conservarla abierta mientras se prueba el sitio.
- Para Git (`git status`, `git add`, `git commit`, `git push`) usar una **segunda terminal**; la que ejecuta el servidor local no acepta esos comandos.
- Tras verificar con `npm run build`, publicar con `git push origin main`. Cloudflare Pages se actualiza automáticamente después de recibir el cambio en GitHub; puede requerir uno o dos minutos y una recarga forzada.
- Antes de subir, revisar `git status` para distinguir cambios de código de las nuevas fichas e imágenes del autor.

## Fichas de objetos

- Cada objeto es un archivo Markdown en `src/content/fotos/`.
- La imagen principal se guarda en `public/imagenes/` y se declara con `imatge`.
- `imatge` debe aparecer siempre inmediatamente después de `categoria`.
- `imatges_addicionals` debe aparecer al final del frontmatter, antes del cierre `---`.
- `imatges_addicionals` es opcional: incluir únicamente las imágenes que existan físicamente.
- Antes de generar o modificar una ficha, revisar los archivos reales en `public/imagenes/`; nunca inventar nombres de imagen.

## Imágenes adicionales

- Mantener este orden: `starless`, `crop`, `fov`, `annotated`, `process`, `other`.
- Usar las extensiones reales disponibles (`.jpg` o `.webp`).
- Convención habitual de nombres: `OBJETO_starless`, `OBJETO_crop`, `OBJETO_fov`, `OBJETO_annotated` y `OBJETO_process`.
- Para variantes no cubiertas por esa convención, usar `tipus: "other"` y un título descriptivo.
- No duplicar en el cuerpo Markdown imágenes ya declaradas en `imatges_addicionals`.
- Las imágenes con `tipus: "process"` usan siempre el título catalán `Flux de postprocessament`, sin guion; sus equivalentes son `Flujo de posprocesado` en castellano y `Post-processing workflow` en inglés.

## Verificación

- Tras cambiar datos, imágenes o plantillas, ejecutar `npm run build` desde la raíz del proyecto.
- Mantener la compatibilidad: las tarjetas usan `imatge`; las fichas muestran `imatges_addicionals` automáticamente.
