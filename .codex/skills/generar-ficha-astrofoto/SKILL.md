---
name: generar-ficha-astrofoto
description: Generar el frontmatter YAML multilingüe de una nueva ficha de astrofotografía para El meu Cel Profund. Usar cuando el autor aporte los datos de un objeto y haya cargado sus imágenes en public/imagenes, o cuando pida crear o actualizar un archivo src/content/fotos/*.md.
---

# Generar ficha astrofoto

Crear fichas compatibles con el catálogo multilingüe actual. Entregar YAML listo para copiar o, si se solicita, crear el archivo Markdown y verificarlo.

## Flujo

1. Leer `AGENTS.md` y `src/content.config.ts` antes de producir contenido.
2. Inspeccionar `public/imagenes/` y usar solo los ficheros que existan. No inventar nombres ni extensiones.
3. Pedir únicamente los datos que no se puedan deducir: identificación, categoría, textos en catalán, equipo, exposición, tratamiento, fecha y lugar. Solicitar también las traducciones al castellano e inglés si no se van a redactar.
4. Consultar `references/plantilla.md` y generar el frontmatter completo. Mantener los textos originales en catalán y sus equivalentes en `traduccions.es` y `traduccions.en`.
5. Si se crea o modifica un `.md`, ejecutar `npm run build` desde la raíz del proyecto.

## Reglas obligatorias

- Guardar la ficha en `src/content/fotos/<id>.md` y la imagen principal en `public/imagenes/`.
- Usar solo las categorías exactas: `Galàxies`, `Nebuloses`, `Cúmuls i Estrelles` o `Sol`.
- Situar `imatge` inmediatamente después de `categoria`.
- Usar `objecte_astronomic` en minúsculas como identificador de catálogo; escribir los NGC sin espacio (`NGC2237`) en todos los textos.
- No añadir `visibilitat` si no se dispone de sus datos generados; no inventar valores de visibilidad.
- Incluir `imatges_addicionals` solo cuando existan ficheros reales y al final del frontmatter, justo antes de `---`.
- Mantener este orden de variantes: `starless`, `crop`, `fov`, `annotated`, `process`, `other`.
- Para `process`, usar siempre: `Flux de postprocessament` / `Flujo de posprocesado` / `Post-processing workflow`.
- Las constelaciones se escriben en latín en los tres idiomas.
- No añadir imágenes adicionales de nuevo en el cuerpo Markdown.

## Entrega

Al responder con YAML, no añadir explicaciones dentro del bloque. Después, enumerar brevemente las imágenes detectadas y cualquier dato que haya quedado pendiente de confirmar.
