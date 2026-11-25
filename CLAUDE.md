# Dabeat — instrucciones para agentes

1. Todo vive en `index.html` (un solo fichero, sin build). Los tokens están en `:root` y `[data-theme=estudio]`, prefijo `--db-*`.
2. Usa siempre `var(--db-…)`. Nada de hex, px de tipografía, radios ni espaciados sueltos fuera de los tokens.
3. Los componentes son clases (`.btn`, `.cell`, `.seg`…). Sin `style="..."` con valores en el marcado.
4. Antes de inventar un componente o un token, pregunta. Si hace falta, añádelo al sistema y documéntalo en `DESIGN_SYSTEM.md`.
5. Pasa `node scripts/check.mjs` antes de cada commit (hook: `git config core.hooksPath .githooks`). La base de deuda es cero.
6. Si el check falla, corrige el sistema (token, clase o check) y después la pantalla.
7. Decisiones con alternativas → `DECISIONS.md`. Fase y deuda consciente → `CONTEXT.md`.
8. Verifica en navegador (escritorio 1440 y móvil 390, ambos temas) antes de dar algo por hecho.
9. Estados del ejercicio: idle, entrada, sonando, silencio. Cualquier cambio visual se revisa en los cuatro.
10. Escribe en español; textos de interfaz en frase normal, sin mayúsculas en cada palabra.
