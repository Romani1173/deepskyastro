---
objecte: "IC1805 – Nebulosa del Cor (HOO)"
constellacio: "Cassiopeia"
caracteristiques: "IC1805, coneguda com la nebulosa del Cor, és un extens complex de nebulositat d'emissió situat a la constel·lació de Cassiopeia. Té una magnitud visual de +6,50, una mida aparent de 60 × 60 minuts d'arc i un diàmetre físic d'uns 200 anys llum. Es troba a uns 6.200 anys llum de la Terra. Al seu centre alberga el cúmul obert Melotte 15, format per estrelles joves i massives, la intensa radiació ultraviolada de les quals fa brillar el gas d'hidrogen i esculpeix les intricades estructures de pols de la nebulosa."
categoria: "Nebuloses"
imatge: "IC1805.jpg"

traduccions:
  es:
    objecte: "IC1805 – Nebulosa del Corazón (HOO)"
    caracteristiques: "IC1805, conocida como la nebulosa del Corazón, es un extenso complejo de nebulosidad de emisión situado en la constelación de Cassiopeia. Tiene una magnitud visual de +6,50, un tamaño aparente de 60 × 60 minutos de arco y un diámetro físico de unos 200 años luz. Se encuentra a unos 6.200 años luz de la Tierra. En su centro alberga el cúmulo abierto Melotte 15, formado por estrellas jóvenes y masivas cuya intensa radiación ultravioleta hace brillar el gas de hidrógeno y esculpe las intrincadas estructuras de polvo de la nebulosa."
  en:
    objecte: "IC1805 – Heart Nebula (HOO)"
    caracteristiques: "IC1805, known as the Heart Nebula, is an extensive emission-nebula complex in the constellation Cassiopeia. It has a visual magnitude of +6.50, an apparent size of 60 × 60 arcminutes and a physical diameter of about 200 light-years. It lies approximately 6,200 light-years from Earth. At its centre is the open cluster Melotte 15, whose young, massive stars emit intense ultraviolet radiation that makes the hydrogen gas glow and sculpts the nebula's intricate dust structures."

equip:
  ota: "TS102 f/5.6 amb corrector-aplanador 0,8×"
  roda_filtres: "ZWO EFW de 36 mm i 7 posicions"
  enfocador: "ZWO EAF"
  guiat: "No especificat"
  muntura: "Sky-Watcher HEQ5 Pro amb belt drive"

camera:
  principal: "ZWO ASI294MM a -10 °C"
  filtres: "Ha i OIII Astronomik de 6 nm; R, G i B per a les estrelles"

exposicio:
  temps_total: "4h 58min"
  gain: "125"
  offset: "30"
  subframes: "360s (Ha: 20x, OIII: 20x) bin1; estrelles RGB: 60s (R: 20x, G: 20x, B: 18x) bin2"
  calibratge: "30 flats, 30 darkflats i 40 darks de biblioteca, sense bies"

tractament:
  adquisicio: "NINA + Cartes du Ciel"
  processat: "Apilat i postprocessat amb PixInsight 1.8.9"

entorn:
  lloc: "l'Ampolla, Tarragona"
  data: "2023-01-13"
  bortle: "4"
  sessions:
    - inici: "2023-01-13"
      captura: "Ha, OIII i RGB"

imatges_addicionals:
  - tipus: "starless"
    fitxer: "IC1805_starless.jpg"
    titol: "Versió HOO sense estrelles"
    descripcio: "Versió sense estrelles que permet observar amb més claredat les estructures d'emissió de la nebulosa del Cor."
    traduccions:
      es:
        titol: "Versión HOO sin estrellas"
        descripcio: "Versión sin estrellas que permite observar con mayor claridad las estructuras de emisión de la nebulosa del Corazón."
      en:
        titol: "Starless HOO version"
        descripcio: "Starless version that reveals the emission structures of the Heart Nebula more clearly."
---