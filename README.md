# Dabeat

Entrenador de precisión rítmica para bailarines de claqué.

- Metrónomo visual y sonoro con cuenta grande, legible desde el fondo de la sala.
- Contador de compases muy visible y bloques de 4, 8, 16 o 32 compases.
- Compás de 1 a 12 tiempos; corcheas, swing o tresillos; entrada 5, 6, 7, 8.
- Silencio: suenan N compases y callan M. La pantalla también se apaga y tú llevas el tiempo.
- Precisión: marca tus golpes (toque o tecla T, o micro con los pies) y Dabeat te dice cuántos milisegundos te adelantas o te retrasas.
- Dos temas: Escenario (oscuro) y Estudio (claro).

Un solo `index.html`, sin build ni backend. Ábrelo en un navegador o sírvelo con GitHub Pages.

## Desarrollo

```
git config core.hooksPath .githooks   # una vez por clon
node scripts/check.mjs                # sintaxis + sistema de diseño
```

Lee `CLAUDE.md` y `DESIGN_SYSTEM.md` antes de tocar estilos.

Atajos: `Espacio` play · `T` marcar golpe · `↑/↓` tempo · `S` ajustes · `F` pantalla completa.
