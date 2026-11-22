---
objecte: "IC405 – Nebulosa de l’Estrella Flamejant (reprocessat 2026)"
objecte_astronomic: "ic405"
constellacio: "Auriga"
categoria: "Nebuloses"
imatge: "IC405_Flaming_repro-2026.jpg"
visibilitat:
  imatge: "ic405-elevacion-anual.png"
  dies_sobre_30: 158

caracteristiques: |-
  IC405, la nebulosa de l’Estrella Flamejant, és a la constel·lació d’Auriga. Aquesta versió es va reprocessar el 2026 a partir dels lights originals del 17 de desembre de 2023. La composició de banda estreta HOO representa les emissions d’hidrogen i oxigen, amb el senyal de S II afegit al canal Hα per reforçar-ne els filaments.

  Durant la captura, la temperatura mitjana va ser de 4 °C i la humitat relativa del 75 %. La Lluna tenia 5,3 dies i estava il·luminada al 28 %.

equip:
  ota: "TS102 f/5.6"
  roda_filtres: "No especificat"
  enfocador: "No especificat"
  guiat: "No especificat"
  muntura: "Sky-Watcher HEQ5 Pro amb belt drive"

camera:
  principal: "ZWO ASI294MM a -10 °C"
  filtres: "Hα i O III Astronomik de 36 mm i 6 nm"

exposicio:
  temps_total: "2h"
  gain: "125"
  offset: "30"
  subframes: "360 s (Hα: 10 ×, O III: 10 ×), bin 1"
  calibratge: "No especificat"

tractament:
  adquisicio: "NINA"
  processat: "Apilat i postprocessat amb PixInsight 1.9.6 · HOO · PixelMath: H = $T + (SII × 0.6), O = $T, O = $T"

entorn:
  lloc: "l’Ampolla"
  data: "2023-12-17"
  bortle: "4"

traduccions:
  es:
    objecte: "IC405 – Nebulosa de la Estrella Flamígera (reprocesado 2026)"
    caracteristiques: |-
      IC405, la nebulosa de la Estrella Flamígera, está en la constelación de Auriga. Esta versión se reprocesó en 2026 a partir de las tomas de luz originales del 17 de diciembre de 2023. La composición de banda estrecha HOO representa las emisiones de hidrógeno y oxígeno, con la señal de S II añadida al canal Hα para realzar sus filamentos.

      Durante la captura, la temperatura media fue de 4 °C y la humedad relativa del 75 %. La Luna tenía 5,3 días y estaba iluminada al 28 %.
  en:
    objecte: "IC405 – Flaming Star Nebula (2026 reprocessing)"
    caracteristiques: |-
      IC405, the Flaming Star Nebula, lies in the constellation Auriga. This version was reprocessed in 2026 from the original light frames captured on 17 December 2023. The narrowband HOO composition shows hydrogen and oxygen emission, with S II signal added to the Hα channel to bring out the filaments.

      During capture, the average temperature was 4 °C and the relative humidity was 75%. The Moon was 5.3 days old and 28% illuminated.

imatges_addicionals:
  - tipus: "starless"
    fitxer: "IC405_Flaming_repro-2026_starless.jpg"
    titol: "Versió sense estrelles"
    descripcio: "El reprocessat HOO sense el camp estel·lar deixa veure els filaments i l’emissió difusa d’IC405."
    traduccions:
      es:
        titol: "Versión sin estrellas"
        descripcio: "El reprocesado HOO sin el campo estelar permite apreciar los filamentos y la emisión difusa de IC405."
      en:
        titol: "Starless version"
        descripcio: "The starless HOO reprocessing reveals the filaments and diffuse emission of IC405."
  - tipus: "process"
    fitxer: "IC405_Flaming_repro-2026_process.jpg"
    titol: "Flux de postprocessament"
    descripcio: "Historial dels processos aplicats a PixInsight durant el reprocessat de 2026."
    traduccions:
      es:
        titol: "Flujo de posprocesado"
        descripcio: "Historial de los procesos aplicados en PixInsight durante el reprocesado de 2026."
      en:
        titol: "Post-processing workflow"
        descripcio: "PixInsight process history for the 2026 reprocessing."
---
