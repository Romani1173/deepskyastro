---
name: crear-cuaderno-fotografia
description: Crear o actualizar el cuaderno narrativo multilingüe de una astrofotografía de El meu Cel Profund, separado del YAML técnico. Usar cuando el autor aporte un comentario libre para una ficha o pida crear, traducir o corregir su «Cuaderno de la fotografía».
---

# Crear cuaderno de una fotografía

Integrar comentarios extensos del autor en las fichas sin sobrecargar el frontmatter ni duplicar la información técnica estructurada.

## Fuentes y ubicación

1. Leer `AGENTS.md`, `src/content.config.ts` y la ficha correspondiente de `src/content/fotos/`.
2. Identificar el `id` exacto a partir del nombre del archivo de la ficha. Si hay más de una fotografía del mismo objeto y el destino es ambiguo, pedir confirmación.
3. Guardar los cuadernos sin frontmatter en:

```text
src/content/comentaris-fotos/ca/<id>.md
src/content/comentaris-fotos/es/<id>.md
src/content/comentaris-fotos/en/<id>.md
```

El catalán es el texto fuente. Mantener también las versiones castellana e inglesa para que las tres fichas localizadas sean equivalentes.

## Separación del contenido

- `caracteristiques` del YAML contiene únicamente una introducción breve al objeto.
- El cuaderno continúa y amplía esa introducción; no vuelve a copiarla.
- No repetir en el cuaderno el nombre, la constelación ni los datos que ya aparecen en los paneles de la ficha: categoría, fecha, sesiones, exposición, calibración, equipo, cámara, filtros, tratamiento, lugar o cielo Bortle.
- Sí conservar observaciones personales, contexto astronómico, rasgos visibles de la imagen, composición cromática y comentarios específicos sobre la captura o el procesado cuando formen parte del relato y no sean una ficha técnica duplicada.

## Edición y traducción

- Respetar la voz, las afirmaciones y la intención del autor.
- Corregir solamente ortografía, gramática, concordancia, puntuación, espacios y entidades HTML accidentales.
- No verificar, reinterpretar, completar ni eliminar afirmaciones científicas salvo que el autor lo pida expresamente.
- Traducir con naturalidad al castellano y al inglés sin añadir información.
- Conservar nombres propios, catálogos, programas, scripts y designaciones astronómicas.
- Escribir las constelaciones en latín cuando aparezcan como dato; dentro de la narración respetar la formulación del autor.

## Integración y comprobación

- El bloque debe aparecer inmediatamente después de la introducción y de las acciones de Visibilidad y Planificación, antes de los paneles técnicos.
- Mantenerlo plegado inicialmente y mostrarlo solo en fichas que tengan un cuaderno asociado.
- Comprobar que los tres archivos Markdown correspondan al mismo `id` y que ninguno incluya frontmatter.
- Ejecutar `npm run build` después de modificar el YAML, los comentarios o su integración.
- No hacer commit, push ni publicar sin una petición expresa del autor.
