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
- `--db-early` (azul) / `--db-late` (naranja): te adelantas / te retrasas. A tiempo (±15 ms) usa `--db-text`. Nunca verde/rojo: es el par que confunde la forma más común de daltonismo.

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
Cinco tamaños (`--db-fs-1` a `--db-fs-5`) más dos de exhibición: `--db-fs-count` (la cuenta, se ajusta a los tiempos del compás) y `--db-fs-counter` (el número de compás, muy visible a distancia). No añadir tamaños sin quitar otro.

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
- `.seg--grid`: la misma elección en rejilla (patrones de stop time, acentos por tiempo).
- `.status--warn`: aviso con cuenta atrás antes del silencio, en acento.
- `.switch`: activar/desactivar una opción.
- `.stepper`: valores numéricos con límite.
- `.cell` (+ `--sil`, `--done`, `--now`): compases del bloque. Los de silencio van huecos.
- `.counter`: el número de compás. En silencio se congela en gris.
- `.strip` + `.dot`: precisión, por posición (antes/después) y color.

## Estados del ejercicio
idle · entrada · sonando · silencio. En silencio, la cuenta y el bloque dejan de avanzar: si la pantalla siguiera contando, no se mediría el tiempo interno.
