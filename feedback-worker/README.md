# API privada de valoraciones

Worker independiente que recibe las valoraciones públicas de DeepSkyAstro y las
guarda en Cloudflare D1. La lectura requiere una clave que solo utiliza la
aplicación local `Web_results`.

## Datos y privacidad

- No guarda nombres, correos ni direcciones IP.
- El identificador aleatorio del navegador se transforma con SHA-256 y un secreto.
- Solo admite las cuatro herramientas y comentarios de hasta 500 caracteres.
- Una persona puede actualizar su respuesta para cada herramienta.

## Configuración remota

1. Crear `deepskyastro-feedback` en D1 y copiar su identificador en
   `wrangler.jsonc`.
2. Aplicar las migraciones.
3. Crear dos secretos con `wrangler secret put`:
   `FEEDBACK_HASH_SECRET` y `FEEDBACK_ADMIN_TOKEN`.
4. Desplegar el Worker y copiar su URL en la configuración local de Web_results.

El comando `npm run secrets:configure -- --api-url URL --web-results RUTA`
genera claves aleatorias, las transmite a Cloudflare sin mostrarlas y guarda la
clave de lectura con permisos privados en `Web_results/config.json`.

Los secretos no deben escribirse ni guardarse en Git.
