# Sistema de diseño de Dabeat

Los valores viven en `index.html` (`:root` y `[data-theme=estudio]`). Este documento explica cuándo usar cada cosa, no repite valores.

## Principio
La luminosidad marca lo activo; el color marca la dirección del error. Nada depende solo del tono, para que funcione con daltonismo y en una tele lejana o mal calibrada.

## Temas
- **Escenario** (por defecto, oscuro): luz de tungsteno sobre azul de escena. Para clases, tele y salas en penumbra.
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
| Texto / fondo | 15,8 | 16,6 |
| Texto secundario / fondo | 7,2 | 6,0 |
| Número inactivo / fondo | 3,9 | 3,6 |
| Tiempo activo / número inactivo | 3,8 | 4,6 |
| Acento / fondo | 14,8 | 6,2 |
| Texto sobre acento | 14,6 | 7,0 |
| Antes / superficie | 7,3 | 7,0 |
| Después / superficie | 9,7 | 5,2 |

Pendiente: los bordes de `--db-line` no llegan a 3:1. Hoy los controles se identifican por su texto o icono; si un control dependiera solo del borde, hay que subirlo.

## Tipografía
Cinco tamaños (`--db-fs-1` a `--db-fs-5`) más `--db-fs-counter` (el número de compás, muy visible a distancia). La cuenta no tiene token: `fitCount()` le da el mayor tamaño que cabe en el escenario, porque se baila mirando desde lejos. En pantalla completa se oculta la fila de tempo para que crezca más. No añadir tamaños sin quitar otro.

## Forma
- `--db-radius-ctl`: todos los botones, segmentados y campos. Mismo radio siempre.
- `--db-radius-cell`: celdas del bloque, tiras y pistas.
- `--db-radius-card`: el escenario (zona táctil).
- `--db-radius-switch`: solo el interruptor.
- Excepción documentada: el botón de play es circular. Es el único control principal y se reconoce como transporte.

## Espaciado
Regla del 8 con medio paso de 4 (`--db-s-1` a `--db-s-5`); 1-2 px solo para ajustes ópticos.

## Componentes
- `.btn` (+ `--icon`, `--on`): todos los botones salvo play. 44 px de objetivo mínimo.
- `.play`: transporte.
- `.seg`: elección exclusiva de 2-4 opciones.
- `.seg--grid`: la misma elección en rejilla (acentos por tiempo). Con `.pat`, los patrones de stop time: nombre, compases (4+4) y una miniatura de puntos llenos (suenan) y huecos (silencio).
- `.stop-btn`: interruptor de stop time en la pantalla principal, junto al play; muestra el patrón activo. Atajo `X`.
- `.status--warn`: aviso con cuenta atrás antes del silencio, en acento.
- `.switch`: activar/desactivar una opción.
- `.stepper`: valores numéricos con límite.
- `.cell` (+ `--sil`, `--done`, `--now`): compases del bloque. Los de silencio van huecos. Llenan todo el ancho disponible; su alto depende del ancho de pantalla y del número de compases (`.cells--big` hasta 8, normal 16, `.cells--dense` 32 en dos filas).
- `.counter`: el número de compás. En silencio se congela en gris.
- `.sweep`: barra de tiempo bajo la cuenta. Avanza del 1 al 1 siguiente a velocidad constante, con una marca bajo cada número. En silencio es la guía: gana intensidad (grosor, calor y brillo vía `--heat`) hasta que vuelve el sonido.

## Estados del ejercicio
idle · entrada · sonando · silencio. En silencio los números se apagan, pero la barra de tiempo, el contador y el bloque siguen avanzando: es la guía a la que agarrarse sin sonido. El último compás avisa con una cuenta atrás.
