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
  processat: "Apilat i postprocessat amb PixInsight 1.9.6 · HOO"

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
    descripcio: >-
      Al pas 0.18 vaig aplicar l’script DarkStructureEnhance per remarcar lleugerament les estructures més fosques.
      Després dels passos que es veuen al diagrama, vaig reforçar amb PixelMath el canal vermell (Hα) de la composició HOO amb senyal de S II. El S II es va fer servir només en aquest reforç. L’expressió del canal R era $T + (SII * 0.6) i als canals G i B vaig deixar $T, de manera que el senyal d’O III es va mantenir.
      Les entrades d’ImageIdentifier indiquen que vaig canviar el nom de la vista segons l’últim procés aplicat. És un pas opcional que ajuda a identificar etapes i a reprendre el treball des d’una còpia intermèdia si s’ha desat per separat.
    traduccions:
      es:
        titol: "Flujo de posprocesado"
        descripcio: >-
          En el paso 0.18 apliqué el script DarkStructureEnhance para realzar ligeramente las estructuras más oscuras.
          Después de los pasos que se ven en el diagrama, reforcé con PixelMath el canal rojo (Hα) de la composición HOO con señal de S II. El S II se usó solo para este refuerzo. La expresión del canal R era $T + (SII * 0.6) y en los canales G y B dejé $T, de modo que se conservó la señal de O III.
          Las entradas de ImageIdentifier indican que cambié el nombre de la vista según el último proceso aplicado. Es un paso opcional que ayuda a identificar etapas y a retomar el trabajo desde una copia intermedia si se ha guardado por separado.
      en:
        titol: "Post-processing workflow"
        descripcio: >-
          At step 0.18, I used the DarkStructureEnhance script to bring out the darker structures slightly.
          After the steps shown in the diagram, I used PixelMath to enhance the red (Hα) channel of the HOO image with S II signal. This was the only use of S II. The R channel expression was $T + (SII * 0.6), while G and B used $T to retain their O III signal.
          The ImageIdentifier entries mark where I renamed the view after the most recent process. This optional step makes it easier to identify stages and resume work from an intermediate copy if one was saved separately.
---
