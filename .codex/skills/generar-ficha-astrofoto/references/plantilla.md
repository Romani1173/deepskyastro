# Plantilla de frontmatter

Usar esta estructura y omitir únicamente los bloques opcionales que no correspondan (`visibilitat`, `sessions`, `imatges_addicionals`). Conservar el orden de campos.

```yaml
---
objecte: "<nombre en catalán>"
objecte_astronomic: "<id en minúsculas>"
constellacio: "<constelación en latín>"
categoria: "<Galàxies | Nebuloses | Cúmuls i Estrelles | Sol>"
imatge: "<archivo principal real>"

caracteristiques: |-
  <texto catalán>

equip:
  ota: "<valor>"
  roda_filtres: "<valor>"
  enfocador: "<valor>"
  guiat: "<valor>"
  muntura: "<valor>"

camera:
  principal: "<valor>"
  filtres: "<valor>"

exposicio:
  temps_total: "<valor>"
  gain: "<valor o N/A>"
  offset: "<valor o N/A>"
  subframes: "<valor>"
  calibratge: "<valor>"

tractament:
  adquisicio: "<valor>"
  processat: "<valor>"

entorn:
  lloc: "<valor>"
  data: "AAAA-MM-DD"
  bortle: "<valor>"

traduccions:
  es:
    objecte: "<nombre en castellano>"
    caracteristiques: |-
      <texto en castellano>
  en:
    objecte: "<nombre en inglés>"
    caracteristiques: |-
      <texto en inglés>

imatges_addicionals:
  - tipus: "<starless | crop | fov | annotated | process | other>"
    fitxer: "<archivo real>"
    titol: "<título catalán>"
    descripcio: "<opcional>"
    traduccions:
      es:
        titol: "<título castellano>"
        descripcio: "<opcional>"
      en:
        titol: "<título inglés>"
        descripcio: "<opcional>"
---
```

Para cada imagen adicional, repetir el bloque y respetar el orden indicado en `SKILL.md`.
