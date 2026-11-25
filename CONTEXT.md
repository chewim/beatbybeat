Fase: 3 · Construcción (desde 2026-11-25)
Escala: producto con usuarios (todas las fases)
Repo: chewim/beatbybeat · Web: https://chewim.github.io/beatbybeat/
Deuda consciente:
- 2026-11-25 · El modo micro solo se ha probado sin micrófono real (no funciona dentro del artifact de Claude; sí en GitHub Pages o abriendo el fichero).

# Dabeat

Entrenador de precisión rítmica para bailarines de claqué: metrónomo visual y sonoro, contador de compases muy visible, bloques configurables y silencio (suenan N compases, callan M) para medir el tiempo interno.

Origen: versión simplificada inspirada en Inner Time (chewim/inner-time), que se deja tal cual. Prototipo previo en `explora` llamado WWTAP.

## Fase 0 (provisional, pendiente de confirmar por David)
- **Problema / para quién:** bailarines de claqué (y sus profes) que quieren trabajar el tiempo interno y la precisión, no solo seguir un clic.
- **Hipótesis más arriesgada:** el bailarín vuelve porque quiere mejorar su número de precisión tras el silencio.
- **Métrica:** sesiones repetidas por usuario y semana; evolución de la desviación media en silencio.
- **Ingresos (más adelante):** progreso e historial, retos, licencia para escuelas. No se cobra el metrónomo.
- **Qué NO es el MVP:** biblioteca de ritmos, partitura, edición de patrones, cuentas de usuario.

## Captura para el caso de estudio (paso a fase 2)
- Tokens: 33 (2 temas), 0 valores fuera del sistema, 0 `style=""` con valores.
- Una pantalla + un panel de ajustes; 4 estados de ejercicio.
- Contraste mínimo de texto: 6,0:1 (Estudio, texto secundario).
