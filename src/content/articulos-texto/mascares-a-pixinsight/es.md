---
ruta: "mascaras-en-pixinsight"
---

El objetivo de este artículo es ofrecer una visión general del concepto de máscara en PixInsight, explicando cómo crearlas y en qué situaciones aplicarlas.

A menudo, cuando realizamos transformaciones en nuestras imágenes, queremos hacerlo de forma selectiva, evitando afectar a la totalidad de la imagen. Por ejemplo, podríamos querer trabajar el fondo sin alterar el objeto principal o viceversa. También es habitual querer procesar las estrellas de manera independiente al resto de la imagen, o resaltar determinadas zonas específicas.

PixInsight nos ofrece la posibilidad de conseguir esta selección precisa mediante el uso de máscaras.

Para entender este concepto, podemos compararlo con una diapositiva en fotografía convencional: las zonas más claras permiten el paso de la luz, mientras que las áreas más oscuras la bloquean, siendo el negro el que detiene la luz por completo. Mantengamos esta idea en mente.

En el ámbito digital, una imagen es una matriz de píxeles organizados y perfectamente identificados. Al aplicar un proceso sobre la imagen, realizamos operaciones matemáticas sobre cada uno de esos píxeles. Aquí entra en juego la máscara, que actúa como un filtro y permite que estas operaciones se apliquen de manera proporcional según su opacidad: el blanco indica una aplicación del 100 % y el negro del 0 %.

Así, el concepto es parecido al de la diapositiva, pero en lugar de controlar la cantidad de luz que la atraviesa, ajustamos la intensidad con la que se aplica la operación matemática a cada píxel de la imagen.

Para entenderlo, veamos un ejemplo.

Supongamos una máscara como esta, a la que hemos llamado "mask_bin".

![Máscara binaria mask_bin en PixInsight: una elipse blanca sobre fondo negro](../../../assets/articulos/mascares-a-pixinsight/mascara-binaria-mask-bin.png)

y la aplicamos a una imagen RGB del mismo tamaño y de color gris.

![Imagen gris con la máscara aplicada: el fondo protegido se ve rojo y la elipse queda gris](../../../assets/articulos/mascares-a-pixinsight/mascara-binaria-aplicada-imatge-gris.png)

Podemos ver que las partes protegidas aparecen de color rojo, más intenso cuanto mayor es la protección, y las partes no protegidas se muestran sin cambio de color, con el gris de la imagen de partida.

Ahora, para comprobar el efecto de la máscara, aplicamos con *CurvesTransformation* color verde a la imagen y el resultado es:

![Imagen gris con una elipse verde tras aplicar CurvesTransformation con la máscara binaria](../../../assets/articulos/mascares-a-pixinsight/corbes-verd-amb-mascara-binaria.png)

¡¡El color verde solo se ha aplicado a la parte no protegida!!

y si aplicamos esta otra máscara con los bordes difuminados, vemos cómo varía la intensidad del color de la elipse verde en función del degradado:

![Máscara con una elipse de bordes difuminados y el resultado: una mancha verde que se desvanece hacia los bordes](../../../assets/articulos/mascares-a-pixinsight/mascara-difuminada-resultat-verd.jpg)

## Consideraciones
Para que PixInsight acepte una imagen como máscara debe cumplir las siguientes condiciones:

- Para utilizar una imagen como máscara de otra, ambas deben tener exactamente las mismas dimensiones en píxeles (x, y).
- Las máscaras deben ser imágenes no lineales.
- Las imágenes en escala de grises solo aceptan máscaras en escala de grises.
- Las imágenes en color aceptan máscaras en color o en escala de grises.

## Aplicar y trabajar con máscaras
Para aplicar una máscara "mask" a una imagen "imagen_principal", activamos "imagen_principal" haciendo clic sobre ella.

Utilizamos la opción del menú principal: */Mask/SelectMask* y seleccionamos en el cuadro de diálogo la imagen "mask".

![Cuadro de diálogo Select Mask abierto sobre una imagen en color, con la imagen de luminancia al lado](../../../assets/articulos/mascares-a-pixinsight/select-mask-dialeg.jpg)

Cuando la máscara queda aplicada, el color de fondo de la pestaña de la imagen se vuelve marrón o naranja; esta es la forma de saber que tenemos una máscara aplicada.

Si no sabemos qué máscara tenemos aplicada, usamos: */Mask/SelectMask* y podremos ver la máscara actual en "Current Mask" y las máscaras disponibles en "New Mask".

![Cuadro de diálogo Select Mask con la máscara actual y la lista de máscaras disponibles desplegada](../../../assets/articulos/mascares-a-pixinsight/select-mask-mascara-actual.jpg)

En la barra de herramientas disponemos de las opciones necesarias para trabajar con las máscaras:

![Menú Mask de PixInsight con las opciones de máscara y el submenú Rendering Mode con los colores de superposición](../../../assets/articulos/mascares-a-pixinsight/menu-mask-rendering-mode.jpg)

- *Select Mask:* Permite mostrar y seleccionar una máscara entre las disponibles para la imagen seleccionada; si esta ya tiene una máscara aplicada, muestra su nombre.
- *Remove Mask:* Elimina la máscara de la imagen seleccionada.
- *Invert Mask*: Invierte la máscara.
- *Enable Mask:* Permite activar o desactivar la máscara de la imagen seleccionada.
- *Show Mask:* Permite mostrar u ocultar la máscara de la imagen seleccionada.
- *Rendering Mode:* Permite seleccionar el color utilizado para mostrar la máscara.

Cuando hemos aplicado una máscara a una imagen podemos modificar las características de la máscara, normalmente oscurecerla o aclararla, para cambiar el nivel de protección, o invertirla para alternar entre objeto y fondo.

¡¡No podemos modificar el tamaño de la máscara!!

## Aplicaciones de las máscaras
Las máscaras son herramientas versátiles que pueden emplearse para una amplia variedad de propósitos. Entre los más habituales se encuentran:

- Aislar el objeto principal del fondo para aplicar ajustes de manera independiente a cada uno.
- Separar las estrellas de una imagen para trabajar específicamente sobre ellas.
- Eliminar las estrellas de una imagen para trabajar en una versión starless.
- Modificar colores o características de manera selectiva.
- Intervenir en áreas específicas de la imagen.

Existen numerosos métodos para crear y manipular máscaras. A continuación exploraremos los fundamentos y algunas técnicas para crear máscaras personalizadas según nuestras necesidades específicas.

## Máscaras de luminancia
La máscara más básica y probablemente la más utilizada consiste en obtener la componente de luminancia de nuestra imagen: *Image/Extract/Lightness(CIE L\*)*

![Imagen en color de la nebulosa del Tulipán y su componente de luminancia extraída en escala de grises](../../../assets/articulos/mascares-a-pixinsight/extraccio-luminancia.jpg)

La aplicación inmediata consiste en diferenciar entre el objeto y el fondo para modificar aquello que nos interese. Invirtiendo la máscara seleccionamos uno u otro, como en los ejemplos siguientes:

![Imagen en color de una nebulosa y su máscara de luminancia en escala de grises](../../../assets/articulos/mascares-a-pixinsight/imatge-i-mascara-luminancia.jpg)

![Máscara de luminancia invertida, con el fondo claro y la nebulosa oscura](../../../assets/articulos/mascares-a-pixinsight/mascara-luminancia-invertida.jpg)

Esta máscara invertida nos serviría para modificar características del fondo.

Otro ejemplo de máscara directa:

![Imagen en color de una nebulosa roja, su máscara de luminancia y la misma máscara invertida](../../../assets/articulos/mascares-a-pixinsight/mascara-directa-exemple.jpg)

Como hemos comentado, el color negro protege al 100 % y el blanco supone transparencia total.

Podemos oscurecer estas máscaras a nuestro gusto modificando el histograma con *HistogramTransformation* o aplicando *CurvesTransformation*.

## Máscaras mediante ACDNR
Otra forma de obtener una máscara de luminancia es mediante el proceso *Adaptative Contrast-Driven Noise Reduction*, más conocido como *ACDNR*. Es una buena herramienta para reducir el ruido de una imagen o suavizar una imagen o una máscara. Tiene la ventaja de que podemos activar *Real-time Preview* y ver cómo queda la imagen a medida que la modificamos.

![Proceso ACDNR con la ventana Real-Time Preview mostrando una máscara de luminancia de una nebulosa](../../../assets/articulos/mascares-a-pixinsight/acdnr-real-time-preview.jpg)

Pero lo que utilizaremos aquí de este proceso es la sección correspondiente a *Lightness Mask*. Minimizamos la sección de *ACDNR Filters* y ampliamos la de *Lightness Mask*.

Podemos crear fácilmente una máscara mediante la previsualización en tiempo real y modificar los tonos medios (*Midtones*), las sombras (*Shadows*) y las altas luces (*Highlights*).

Con los parámetros de la figura obtenemos una máscara de luminancia muy contrastada; modificando los controles deslizantes de los tres parámetros podemos variar inmediatamente el resultado.

![Sección Lightness Mask de ACDNR con los valores de Midtones, Shadows y Highlights y la previsualización de la máscara de M 51](../../../assets/articulos/mascares-a-pixinsight/acdnr-lightness-mask.jpg)

![La galaxia M 51 en color y la máscara de luminancia contrastada obtenida con ACDNR](../../../assets/articulos/mascares-a-pixinsight/m51-mascara-acdnr.jpg)

## Máscaras mediante RangeSelection
El proceso *RangeSelection* crea una imagen en escala de grises basándose en la imagen activa, con ajustes de los límites superior e inferior del valor de píxel. Primero definimos un intervalo de valores de píxel válidos y después *RangeSelection* crea una nueva imagen en la que los píxeles de la imagen de destino situados dentro de ese intervalo son blancos y los píxeles situados fuera se interpretan como negros.

*RangeSelection* se utiliza casi exclusivamente para crear máscaras basadas en la luminancia o luminosidad.

La interfaz es sencilla y resulta imprescindible utilizar *Real-Time Preview* para ver los resultados obtenidos al modificar los controles deslizantes.

![Proceso RangeSelection con sus controles y la previsualización en tiempo real de la máscara de una galaxia](../../../assets/articulos/mascares-a-pixinsight/rangeselection-real-time-preview.jpg)

Este proceso no modifica la imagen activa y crea una imagen nueva denominada *range_mask*.

![Imagen range_mask generada por RangeSelection, con la galaxia oscura sobre fondo claro](../../../assets/articulos/mascares-a-pixinsight/range-mask.jpg)

## Máscaras de estrellas con StarMask
Las siguientes máscaras más utilizadas son las máscaras de estrellas. Una forma de generarlas es mediante el proceso: *Process/MaskGeneration/StarMask*

La aplicación habitual consiste en filtrar las estrellas y mejorar su color; también podemos "ocultarlas" para trabajar sobre el objeto principal.

Partiendo de la máscara de luminancia adjunta:

![Máscara de luminancia de una nebulosa rodeada de un campo de estrellas](../../../assets/articulos/mascares-a-pixinsight/mascara-luminancia-partida-starmask.jpg)

Aplicamos el proceso StarMask y obtenemos la imagen *star_mask*; después aplicamos el proceso Binarize para transformar todos los píxeles de la imagen en negro puro (0) o blanco puro (1). De esta manera conseguimos definir perfectamente la estructura de cada estrella; es la imagen *star_mask_Binarize*.

![Máscara de estrellas star_mask y su versión binarizada star_mask_Binarize, con las estrellas en blanco puro](../../../assets/articulos/mascares-a-pixinsight/star-mask-i-binarize.jpg)

Ahora podríamos aplicar el proceso Convolution para suavizar los contornos; de esta forma, al aplicar la máscara, el efecto resulta mucho más suave.

Aplicada directamente nos permite actuar sobre las estrellas; si aplicamos *Invert* a *star_mask_Binarize* podemos actuar sobre toda la imagen excepto las estrellas.

![Máscara star_mask_Binarize invertida, con las estrellas en negro sobre fondo blanco](../../../assets/articulos/mascares-a-pixinsight/star-mask-binarize-invertida.jpg)

## Máscaras aplicando Starnet2/StarXTerminator
Partimos de nuestra imagen en color y generamos una primera máscara posible a partir de la componente de luminancia.

![Nebulosa de la Roseta en color y su componente de luminancia en escala de grises](../../../assets/articulos/mascares-a-pixinsight/rosetta-color-i-luminancia.jpg)

A la imagen de luminancia le aplicamos un proceso de eliminación de estrellas como *Starnet2* o *StarXTerminator*; obtenemos la imagen *starless* y la imagen *stars*.

![Luminancia de la nebulosa de la Roseta sin estrellas (starless) y la imagen solo con las estrellas (stars)](../../../assets/articulos/mascares-a-pixinsight/rosetta-starless-i-stars.jpg)

Como en el ejemplo anterior, podríamos aplicar *Binarize* y *Convolution* para crear la máscara de estrellas que deseemos.

Si restamos la imagen stars de la imagen *starless* podemos crear una máscara con los espacios vacíos de las estrellas en negro.

![Máscara de la nebulosa de la Roseta resultado de restar stars a starless, con los huecos de las estrellas en negro](../../../assets/articulos/mascares-a-pixinsight/rosetta-starless-menys-stars.jpg)

Hemos conseguido tres posibles variantes de máscaras a partir de nuestra imagen inicial, separando las estrellas.

## Máscaras con GAME
*GAME* es un script de PixInsight que nos permite generar de forma sencilla y muy interactiva máscaras circulares, elípticas, por puntos o una combinación de ellas. Abrimos: *Script/Utilities/GAME*, y aparece la pantalla siguiente:

![Ventana del script GAME con dos elipses definidas sobre una imagen y las opciones de tipo de máscara a la izquierda](../../../assets/articulos/mascares-a-pixinsight/game-pantalla-principal.jpg)

En la parte izquierda podemos añadir elipsoides o bien curvas personalizadas mediante la opción multipunto.

También podemos elegir el tipo de máscara: luminancia, gradiente, binaria, estrellas, etc.

Como ejemplo creamos dos elipses y seleccionamos una máscara de gradiente y otra binaria a partir de las elipses que hemos definido. Obtenemos:

![Máscara binaria con dos elipses blancas y máscara de gradiente con las mismas elipses difuminadas](../../../assets/articulos/mascares-a-pixinsight/game-mascares-binaria-i-gradient.jpg)

Mediante la opción multipunto podemos generar máscaras que se adapten a nuestras necesidades.

![Script GAME con una forma multipunto dibujada alrededor de una galaxia](../../../assets/articulos/mascares-a-pixinsight/game-multipunt.jpg)

![Máscara de forma libre generada con la opción multipunto de GAME](../../../assets/articulos/mascares-a-pixinsight/game-mascara-multipunt.jpg)

Con este método, y partiendo de la imagen adjunta de M 31, generaremos dos máscaras con *GAME*. Con la primera seleccionamos la galaxia completa y con la segunda seleccionamos el núcleo.

![Galaxia de Andrómeda M 31 en color, imagen de partida para las máscaras de GAME](../../../assets/articulos/mascares-a-pixinsight/m31-imatge-partida.jpg)

Obtenemos estas dos imágenes:

![Máscara elíptica de toda la galaxia M 31 y máscara más pequeña de su núcleo](../../../assets/articulos/mascares-a-pixinsight/m31-mascares-galaxia-i-nucli.jpg)

Si solo queremos modificar el anillo de la galaxia, podemos restar la segunda imagen de la primera con *PixelMath* y obtenemos:

![Máscara del anillo de M 31 con el núcleo en negro, resultado de restar las dos máscaras](../../../assets/articulos/mascares-a-pixinsight/m31-mascara-anell.jpg)

Con estas tres imágenes podemos modificar la galaxia completa, el núcleo o trabajar sobre el anillo dejando intacto el núcleo.

Los bordes de las máscaras pueden difuminarse a voluntad aplicando el proceso *Convolution*.

## Máscaras de estrellas utilizando GAME + Starnet2/SXT
Veamos ahora un ejemplo en el que combinamos la utilización del script *GAME* y del proceso *Starnet2 o StarXTerminator (SXT)*. El objetivo es crear una máscara que permita eliminar las estrellas del interior de nuestro objeto principal.

Lo primero que hacemos es aplicar *SXT* a la imagen de la nebulosa de la Laguna M 8 para obtener una imagen *starless* y otra imagen *stars*.

![Imagen de M 8 separada con StarXTerminator en una versión sin estrellas y otra solo con estrellas](../../../assets/articulos/mascares-a-pixinsight/m8-sxt-starless-i-stars.jpg)

Tomando como referencia la imagen starless, aplicamos *GAME* para construir mediante tres elipses el contorno aproximado de M 8:

![Imagen starless de M 8 con tres elipses de GAME que dibujan su contorno](../../../assets/articulos/mascares-a-pixinsight/m8-game-el-lipses.jpg)

seleccionamos una máscara binaria y después aplicamos el proceso Convolution para suavizar los bordes a voluntad y obtenemos una primera máscara.

![Máscara binaria del contorno de M 8 y la misma máscara con los bordes suavizados por Convolution](../../../assets/articulos/mascares-a-pixinsight/m8-mascara-binaria-i-convolucio.jpg)

Conviene comentar que habríamos obtenido el mismo resultado seleccionando una máscara *Gradient Edge Mask* en el script *GAME*.

El siguiente paso consiste en restar con *PixelMath* la máscara obtenida de la imagen *stars*. El resultado es:

![Imagen de estrellas con la zona de M 8 vacía tras restarle la máscara](../../../assets/articulos/mascares-a-pixinsight/m8-stars-menys-mascara.jpg)

Si ahora sumamos también con *PixelMath* estas estrellas a la imagen *starless*, obtenemos la imagen deseada sin estrellas en el objeto principal.

![M 8 con el campo estelar conservado y sin estrellas sobre la nebulosa](../../../assets/articulos/mascares-a-pixinsight/m8-resultat-sense-estrelles.jpg)

Para obtener mejores resultados deberíamos afinar el contorno de la máscara binaria y aumentar el parámetro de forma (*Shape*) en la convolución.

## Máscaras mediante ColorMask
Otra posibilidad muy atractiva consiste en utilizar máscaras según un color determinado. Esta técnica ofrece muy buenos resultados en fotografías en las que la separación de colores es muy clara.

Existen numerosos scripts, pero uno sencillo que funciona muy bien es: *Script/Utilities/ColorMask_mod*

![Ventana del script ColorMask con la rueda de color, los botones de colores predefinidos y la imagen de destino](../../../assets/articulos/mascares-a-pixinsight/colormask-script.jpg)

Podemos elegir entre seis colores predefinidos, pero con *Start Hue* y *End Hue* podemos seleccionar cualquier intervalo del diagrama de color.

Como ejemplo aplicamos este script a la imagen de NGC 6995, denominada coloquialmente Bat Nebula.

![Imagen starless de NGC 6995, la nebulosa del Murciélago, con filamentos rojos y cian](../../../assets/articulos/mascares-a-pixinsight/ngc6995-imatge-starless.jpg)

He tomado una imagen starless como punto de partida para aplicar el script, porque así eliminamos los artefactos creados por partes residuales del color de las estrellas.

La primera imagen se obtiene seleccionando el filtro para el color cian.

![Máscara de color cian de NGC 6995 generada con ColorMask](../../../assets/articulos/mascares-a-pixinsight/ngc6995-mascara-cian.jpg)

La segunda corresponde al filtro para el color rojo.

![Máscara de color rojo de NGC 6995 generada con ColorMask](../../../assets/articulos/mascares-a-pixinsight/ngc6995-mascara-vermell.jpg)

Con estas dos máscaras podemos intensificar el color que nos interese sin contaminar los demás.

El resultado de aplicar *CurvesSaturation* con los dos filtros por separado para aumentar la saturación y la luminosidad *(CIE L\* component, lightness)* es el siguiente:

![NGC 6995 con los filamentos rojos y cian más saturados tras aplicar las máscaras de color](../../../assets/articulos/mascares-a-pixinsight/ngc6995-resultat-curvessaturation.jpg)

## Máscaras mediante PixelMath
Aprovechando que *PixelMath* actúa sobre cada píxel de una imagen, podemos aplicar ecuaciones que modifiquen sus valores según una fórmula matemática.

Una fórmula útil para trabajar con franjas en una imagen es la siguiente:

`iif(x() > D, 1 - (1 * (1 / x()) * D), $T)`, donde *D* es un *Symbol* que actúa como variable ajustable a voluntad. En nuestro ejemplo comenzamos con *D = 3300*.

Si escribimos esta fórmula en *Pixel Math*:

![Ventana de PixelMath con la fórmula de franja y el símbolo D definido](../../../assets/articulos/mascares-a-pixinsight/pixelmath-formula-franja.jpg)

La aplicamos a una imagen negra y obtenemos lo siguiente:

![Máscara con la mitad izquierda negra y un degradado hacia el blanco a la derecha, con D = 3300](../../../assets/articulos/mascares-a-pixinsight/pixelmath-franja-d3300.png)

Si aumentamos el valor del *Symbol D* a 5300 desplazamos hacia la derecha la zona más clara.

![Máscara con el degradado claro desplazado hacia el borde derecho, con D = 5300](../../../assets/articulos/mascares-a-pixinsight/pixelmath-franja-d5300.jpg)

Esta máscara puede ser útil, por ejemplo, cuando tenemos imágenes con una zona más clara en forma de franja vertical por influencia de la luz de la Luna; podemos actuar sobre ella protegiendo el resto de la fotografía.

Otra forma de generar gradientes horizontales puede ser:

`x( )` — `w( )-x( )`

![Gradientes horizontales generados con x() y con w()-x(), de negro a blanco y de blanco a negro](../../../assets/articulos/mascares-a-pixinsight/gradients-horitzontals.png)

y para gradientes verticales:

`y( )` — `h( )-y( )`

![Gradientes verticales generados con y() y con h()-y(), de negro a blanco y de blanco a negro](../../../assets/articulos/mascares-a-pixinsight/gradients-verticals.jpg)

Otra fórmula útil si queremos aplicar un proceso en una esquina de nuestras imágenes es la siguiente:

`(1-2*(w()-X()))*(1-2*(h()-Y()))`, que al aplicarse a una imagen negra produce:

![Ventana de PixelMath con la fórmula de la esquina](../../../assets/articulos/mascares-a-pixinsight/pixelmath-formula-cantonada.jpg)

![Gradiente con la esquina superior izquierda clara que se oscurece hacia la inferior derecha](../../../assets/articulos/mascares-a-pixinsight/gradient-cantonada.jpg)

Con la siguiente ecuación:

`(1-2*(X()))*(1-2*(Y()))`

se obtiene la imagen adjunta.

![Gradiente con la esquina inferior izquierda oscura y la superior derecha clara](../../../assets/articulos/mascares-a-pixinsight/gradient-cantonada-oposada.jpg)

Otros ejemplos resultantes de variar los coeficientes de la fórmula anterior:

`1-2*(X()))*(1-8*(Y()))` — `(1-6*(X()))*(1-1.5*(Y()))`

![Dos gradientes diagonales obtenidos variando los coeficientes de la fórmula de la esquina](../../../assets/articulos/mascares-a-pixinsight/gradients-cantonada-variants.jpg)

Este tipo de máscaras y sus inversas nos permiten explorar otra manera de solucionar problemas de contaminación en nuestras fotografías.

## Máscaras utilizadas en scripts
Entre la multitud de scripts disponibles encontramos un interesante paquete denominado *Toolbox*. Podemos obtenerlo en el repositorio: [https://www.ideviceapps.de/PixInsight/Utilities/](https://www.ideviceapps.de/PixInsight/Utilities/); uno de estos scripts se utiliza para el tratamiento del color.

Este script se denomina *SelectiveColorCorrection* y el motivo para hablar de él es que utiliza máscaras para modificar el color y lo hace de una manera muy intuitiva.

La pantalla general es:

![Pantalla general del script SelectiveColorCorrection con los controles de máscara y color a la izquierda y la previsualización de una galaxia](../../../assets/articulos/mascares-a-pixinsight/selectivecolorcorrection-pantalla.jpg)

El script nos permite modificar los colores RGB, los colores complementarios y la luminancia, así como la saturación y el contraste de la imagen activa.

Lo más interesante es que permite aplicar una máscara creada por nosotros o elegir entre las 13 máscaras preseleccionadas que ofrece.

De estas, seis son máscaras de color, dos de saturación y cuatro de nivel de señal; la última permite importar una máscara creada por nosotros.

![Lista desplegable de SelectiveColorCorrection con las máscaras predefinidas y la opción Imported Mask](../../../assets/articulos/mascares-a-pixinsight/selectivecolorcorrection-llista-mascares.jpg)

También podemos ajustar cuatro parámetros para configurar la máscara como deseemos.

![Sección Mask de SelectiveColorCorrection con los parámetros Shadows, Highlights, Balance y Smoothness y los botones Import Mask y Export Mask](../../../assets/articulos/mascares-a-pixinsight/selectivecolorcorrection-parametres-mascara.jpg)

Además, existe la posibilidad de exportar la máscara y utilizarla fuera de este script.

---

Con esta opción para generar nuestras máscaras hemos llegado al final del recorrido.

Espero haber contribuido a que ahora entiendas mejor y puedas aprovechar al máximo esta herramienta tan potente que son las máscaras en PixInsight.

Hasta la próxima, amigos. ¡¡Cielos despejados!!
