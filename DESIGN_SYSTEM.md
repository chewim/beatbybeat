# Sistema de diseño de Dabeat

Los valores viven en `index.html` (`:root` y `[data-theme=estudio]`). Este documento explica cuándo usar cada cosa, no repite valores.

## Principio
La luminosidad marca lo activo; el color marca la dirección del error. Nada depende solo del tono, para que funcione con daltonismo y en una tele lejana o mal calibrada.

## Temas
- **Escenario** (por defecto, oscuro): luz de tungsteno sobre negro de escena. Negro opaco con grafito y brillo metálico (números con degradado `--db-metal`; el activo con `--db-metal-on`). Para clases, tele y salas en penumbra.
- **Estudio** (claro): para salas con mucha luz y espejos, donde una pantalla oscura refleja todo, y para personas a las que el texto claro sobre oscuro les deja halos (astigmatismo).
- Descartado: verde ácido (acento "prefabricado", muy saturado y fatigoso tras una hora de clase) y una paleta tipo marcador deportivo ámbar (demasiado parecida a cualquier app de fitness).

## Color (roles)
- `--db-bg`, `--db-surface`, `--db-surface-2`, `--db-line`: planos y separadores.
- `--db-text` → `--db-text-4`: de más a menos presencia. `text-3` es el número inactivo de la cuenta (≥3:1 sobre fondo); `text-4` es lo apagado a propósito (marcas `&` y la pantalla en silencio).
- `--db-beat-on`: el tiempo activo. En Escenario es el acento; en Estudio, negro. Siempre el elemento más luminoso/oscuro de la pantalla.
- `--db-accent` / `--db-on-accent`: progreso (bloque, slider, foco, switch). No para texto largo.
- `--db-early` (azul) / `--db-late` (naranja): te adelantas / te retrasas (aviso de aterrizaje con micro). A tiempo (±15 ms) usa `--db-text`. Nunca verde/rojo. `--db-late` es también el final de la rampa de intensidad del silencio.

### Contraste comprobado (WCAG 2)
| Par | Escenario | Estudio |
|---|---|---|
| Texto / fondo | 16,9 | 16,6 |
| Texto secundario / fondo | 7,7 | 6,0 |
| Número inactivo / fondo | 3,9 | 3,6 |
| Tiempo activo / número inactivo | 4,0 | 4,6 |
| Acento / fondo | 15,7 | 6,2 |
| Texto sobre acento | 14,6 | 7,0 |
| Antes / superficie | 7,9 | 7,0 |
| Después / superficie | 10,5 | 5,2 |

| Borde de control (`--db-line-strong`) / fondo | 3,3 | 3,2 |

Los bordes de control ya cumplen 3:1 (WCAG 1.4.11). `--db-line` queda solo para separadores, que no lo necesitan.

## Luz y profundidad
Inspirado en el dark mode de producto tipo Linear/Raycast (bordes finos, canto de luz arriba, foco radial), adaptado a la paleta de escenario. Nada chillón: la luz sale del acento a baja opacidad y de bordes más claros.
- `--db-backdrop`: fondo con un foco de escenario arriba (acento al 7-9 %) que se oscurece hacia abajo (`--db-bg-deep`).
- `--db-grad-ctl` / `--db-grad-surface`: degradado vertical muy suave en controles y superficies; arriba un poco más claro.
- `--db-edge`: canto de luz de 1 px arriba (relieve). `--db-drop`: sombra corta abajo. `--db-well`: hundido, para pistas, segmentados y la barra.
- `--db-halo`: brillo suave del acento para lo activo (play sonando, compás actual, stop time activo, interruptor encendido). Nunca en reposo.
- Todo vive en una capa al final del CSS ("Luz y profundidad") que se apoya en los componentes; para quitarla basta con borrar esa capa.

## Tipografía
Cinco tamaños (`--db-fs-1` a `--db-fs-5`) más `--db-fs-counter` (el número de compás, muy visible a distancia). La cuenta no tiene token: `fitCount()` le da el mayor tamaño que cabe en el escenario, porque se baila mirando desde lejos. Las subdivisiones van centradas en la altura del número: `&` en corcheas y swing; círculos grandes (`.beat__m--dot`) en tresillos y en cuatrillos (· & ·). No añadir tamaños sin quitar otro.

## Forma
- `--db-radius-ctl`: todos los botones, segmentados y campos. Mismo radio siempre.
- `--db-radius-cell`: celdas del bloque, tiras y pistas.
- `--db-radius-card`: el escenario (zona táctil).
- `--db-radius-switch`: solo el interruptor.
- `--db-radius-mark`: las marcas de compás de los patrones.
- Sin excepciones: el play también usa `--db-radius-ctl`. Play y reiniciar van apilados en vertical para dejar el ancho a las celdas del bloque.

## Espaciado
Regla del 8 con medio paso de 4 (`--db-s-1` a `--db-s-5`); 1-2 px solo para ajustes ópticos.

## Componentes
- `.btn` (+ `--icon`, `--on`): todos los botones salvo play. 44 px de objetivo mínimo.
- `.play`: transporte; cuadrado y del mismo tamaño que reiniciar (`--db-play`). Lo distingue solo el color de CTA primario.
- `.meter-ctl` + `.mini`: compás (tiempos) y bloque (4/8/16/32) junto al play, con steppers; ya no están en ajustes.
- `.seg`: elección exclusiva de 2-4 opciones.
- `.seg--grid`: la misma elección en rejilla (acentos por tiempo). Con `.pat`, los patrones de stop time: nombre, compases (4+4) y una miniatura de puntos llenos (suenan) y huecos (silencio).
- `.stop-toggle`: botón de stop time en la fila del tempo, con `+` que gira a × y el patrón activo. Atajo `X`.
- `.stopcard`: configuración del stop time bajo la fila del tempo, solo cuando está activo y en pausa (se oculta mientras suena o en pantalla completa).
- `.pats` + `.pat`: patrones en fila con scroll horizontal y ajuste por tarjeta; cada uno con nombre, compases y una marca por compás (llena = suena, hueca = silencio). `--db-radius-mark` es el radio de esas marcas.
- `.status--warn`: aviso con cuenta atrás antes del silencio, en acento.
- `.switch`: activar/desactivar una opción.
- `.stepper`: valores numéricos con límite.
- `.cell` (+ `--sil`, `--done`, `--now`): compases del bloque. Los de silencio siguen la misma progresión (pendiente → actual → hecho) pero translúcidos, para distinguirlos y seguirlos con la vista. Llenan todo el ancho disponible; su alto depende del ancho de pantalla y del número de compases (`.cells--big` hasta 8, normal 16, `.cells--dense` 32 en dos filas).
- `.intro`: la entrada tiene su propia pantalla, distinta de la práctica: etiqueta "Entrada", un solo número centrado, macizo en tungsteno (5-6-7-8 en 4/4; 1…N en otros compases; sin contorno, que en fuentes variables dibuja los trazos solapados) y puntos de progreso. La cuenta y la barra quedan ocultas mientras dura.
- `.prec-btn`: botón "Precisión" en la cabecera, con contador de golpes medidos. Atajo `P`.
- `.precpanel` + `.modal__card`: panel de precisión, en el flujo bajo los números (no es un overlay); el botón Precisión lo abre y lo cierra y al cerrarse todo vuelve a su sitio. Arriba, la configuración del micro en pasos numerados (`.steps`/`.step`, `.is-done` en acento, `.is-off` hasta activar el micro), plegable cuando ya está lista. Debajo, cuatro cifras (`.stat`: media, constancia, % a tiempo, golpes) y la gráfica (`.chart`): un punto por golpe (arriba tarde, abajo antes; azul antes, naranja después, blanco a tiempo), franja de ±20 ms, zonas de silencio sombreadas y línea de tendencia en acento.
- `.live`: aviso "Midiendo tus golpes" (naranja, con punto que late) en la parte superior del escenario mientras el micro está midiendo.
- `.verdict`: al volver el sonido tras un silencio medido, tarjeta grande en el centro con la puntuación (0-100), una etiqueta (¡Clavado!, Muy bien, Bien, Casi, Flojo, Muy mal) y el detalle ("Te faltaron 38 ms: te adelantas"). Se va sola a los 2,6 s.
- `.score` + `.round`: en el panel de precisión, la última ronda en grande y el historial de rondas.
- `.info`: botón `+` (gira a ×) que despliega qué significa cada cifra (`.stat__def`).
- Ajustes → Sincronía con el altavoz (`S.av`, 0-400 ms): la pantalla espera lo que tarda el altavoz en sonar (Bluetooth). "Usar calibración" toma la medida del micro menos ~10 ms del propio micro.
- `.hitdot`: punto que se enciende con cada golpe detectado por el micro, para ajustar la sensibilidad.
- `.counter`: el número de compás. En silencio se congela en gris.
- `.sweep`: pista de tiempo bajo la cuenta, como un circuito: una sola forma (`.sweep__track`) del borde izquierdo de la cuenta al final del compás. El 1 es la línea de salida y meta a cuadros (`.sweep__flag`); los demás tiempos, líneas de sector (`.sweep__line`); las subdivisiones, pianos en los bordes (`.sweep__kerb`). El sector del tiempo actual se ilumina y su línea se enciende en acento. El punto corre a velocidad constante del 1 al 1 siguiente. En silencio gana intensidad (`--heat`).

### Partitura (`.score-ctl`, `.notation`, `.bar`, `.counts`)
Panel bajo los números, como Precisión. Un compás por tarjeta en pozo (`--db-well`); el compás que se está escribiendo lleva filo `--db-late`. Pentagrama de una línea en `--db-text`. Debajo, la cuenta del bailarín ("1 e & a"): golpe = fondo `--db-accent`; acento = anillo `--db-late`. El botón Escribir usa `.rec`: punto que late en `--db-late` mientras graba. No usar la notación como decoración en otras pantallas.

## Estados del ejercicio
idle · entrada · sonando · silencio. En silencio los números se apagan, pero la barra de tiempo, el contador y el bloque siguen avanzando: es la guía a la que agarrarse sin sonido. El último compás avisa con una cuenta atrás.
