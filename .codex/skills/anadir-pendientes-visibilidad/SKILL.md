---
name: anadir-pendientes-visibilidad
description: Añadir o actualizar objetivos astronómicos pendientes, sus alias de catálogo y sus nombres comunes multilingües en la sección local de Visibilidad de El meu Cel Profund. Usar cuando el autor pida incorporar objetos pendientes, objetivos futuros o alias a la planificación privada de `src/data/astronomical-objects.json`.
---

# Añadir pendientes de Visibilidad

Trabajar únicamente en `/Users/juanjoromero/Desktop/Web_deepskyastro`. Mantener los pendientes visibles solo en desarrollo local; nunca publicarlos ni exponer sus alias o planificación en la salida pública.

## Recoger los datos

Solicitar o confirmar para cada objeto:

- nombre principal de catálogo, respetando `NGC2237` sin espacios;
- nombre común en catalán, castellano e inglés, si debe mostrarse como alias bajo el título;
- otros identificadores de catálogo, si existen.

Distinguir los campos:

- `commonNames`: alias visible y localizado en la interfaz (`ca`, `es`, `en`);
- `aliases`: identificadores alternativos de catálogo; no sustituyen a `commonNames`.

Si faltan coordenadas, resolverlas mediante CDS Sesame/SIMBAD y guardar grados decimales J2000. No inventar coordenadas ni nombres. Si el servicio devuelve una identificación ambigua, detenerse y pedir confirmación.

## Modificar la fuente

1. Leer los pendientes existentes en `src/data/astronomical-objects.json` y comprobar que el objeto no exista ya por `id`, `catalogName` o `aliases`.
2. Añadir una entrada con este esquema:

```json
{
  "id": "ngc0000",
  "catalogName": "NGC0000",
  "aliases": ["identificador alternativo"],
  "commonNames": {
    "ca": "Nom català",
    "es": "Nombre castellano",
    "en": "English name"
  },
  "raDeg": 0,
  "decDeg": 0,
  "coordinateSource": "CDS Sesame / SIMBAD",
  "coordinateEpoch": "J2000",
  "status": "pending"
}
```

3. Omitir `commonNames` si el objeto no tiene nombre común. Mantener `aliases: []` si no hay identificadores alternativos.
4. Mantener el catálogo ordenado por `id` con orden natural. Editar directamente el JSON; no volver a ejecutar `scripts/migrate-photo-catalog.mjs`, porque es una migración histórica.
5. Actualizar en `scripts/visibility.test.mjs` el número esperado de objetos `pending` sumando solo las entradas realmente nuevas.

## Regenerar y verificar

Ejecutar, en este orden:

```sh
npm run visibility:generate
npm run visibility:test
npm run build
```

Confirmar que `src/data/visibility.generated.json` contiene cada objeto nuevo, sus `commonNames`, coordenadas y `status: "pending"`.

Después del build, buscar en `dist/` los nombres principales, nombres comunes y alias de catálogo añadidos. Ninguno debe aparecer en la salida pública. La protección esperada está en las páginas de Visibilidad, que pasan `showPending={import.meta.env.DEV}` a `VisibilityPlanner`; si hay una coincidencia pública, no publicar y corregir la fuga.

No iniciar el servidor local salvo que el autor pida revisar visualmente el resultado. No hacer commit, push ni publicar sin petición expresa.
