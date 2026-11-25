#!/usr/bin/env node
// Verificación de Dabeat: sintaxis + sistema de diseño (adaptado de chewim/pujobaixo).
//   node scripts/check.mjs                   → valida (lo usa el hook pre-commit)
//   node scripts/check.mjs --update-baseline → guarda la deuda actual como nuevo límite
// Los tokens se leen de index.html (:root y [data-theme=...], prefijo --db-*): son la fuente de verdad.
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = join(ROOT, 'scripts', 'design-baseline.json');
const args = new Set(process.argv.slice(2));
const errors = [], notes = [];
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// ── 1. CSS: comentarios y llaves equilibrados (un /* sin cerrar anula reglas en silencio)
for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
  const css = m[1], line = html.slice(0, m.index).split('\n').length;
  const o = (css.match(/\/\*/g) || []).length, c = (css.match(/\*\//g) || []).length;
  if (o !== c) errors.push(`<style> (línea ${line}): ${o} "/*" y ${c} "*/": hay un comentario sin cerrar`);
  const noCom = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const bo = (noCom.match(/\{/g) || []).length, bc = (noCom.match(/\}/g) || []).length;
  if (bo !== bc) errors.push(`<style> (línea ${line}): ${bo} "{" y ${bc} "}"`);
}

// ── 2. JS inline: node --check
const js = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n;\n');
const tmp = join(mkdtempSync(join(tmpdir(), 'db-')), 'inline.js');
writeFileSync(tmp, js);
const r = spawnSync(process.execPath, ['--check', tmp], { encoding: 'utf8' });
if (r.status !== 0) errors.push('El JS inline no pasa node --check:\n' + (r.stderr || '').split('\n').slice(0, 6).join('\n'));

// ── 3. Sin style="..." con valores en el marcado (los componentes son clases)
const inlineStyles = [...html.replace(/<script[\s\S]*?<\/script>/g, '').matchAll(/\sstyle="([^"]*\d[^"]*)"/g)].map((m) => m[1]);
if (inlineStyles.length) errors.push(`style="..." con valores en el HTML (${inlineStyles.length}): ${inlineStyles.slice(0, 3).join(' | ')}. Crea una clase.`);

// ── 4. Tokens: ninguno sin uso
const defBlocks = [...html.matchAll(/(?::root|\[data-theme=[a-z]+\])\s*\{([\s\S]*?)\}/g)].map((m) => m[1]).join('\n');
const defined = new Set([...defBlocks.matchAll(/(--db-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const used = new Set([...html.matchAll(/var\((--db-[a-z0-9-]+)/g)].map((m) => m[1]));
const unused = [...defined].filter((t) => !used.has(t));
if (unused.length) errors.push(`Tokens sin uso: ${unused.join(', ')}. Bórralos o úsalos.`);
const undef = [...used].filter((t) => !defined.has(t));
if (undef.length) errors.push(`var() de tokens que no existen: ${undef.join(', ')}`);

// ── 5. Sistema de diseño: deuda con trinquete (no puede crecer; la base de Dabeat es cero)
const px = (v) => parseFloat(v);
const norm = (h) => { h = h.toUpperCase(); return h.length === 4 ? '#' + [...h.slice(1)].map((c) => c + c).join('') : h; };
const palette = new Set([...defBlocks.matchAll(/--db-[a-z0-9-]+:\s*(#[0-9a-fA-F]{3,6})\b/g)].map((m) => norm(m[1])));
const radii = new Set([...defBlocks.matchAll(/--db-radius-[a-z-]+:\s*([\d.]+)px/g)].map((m) => px(m[1])));
const fonts = new Set([...defBlocks.matchAll(/--db-fs-[a-z0-9-]+:\s*([\d.]+)px/g)].map((m) => px(m[1])));
const isGrid = (n) => n === 0 || n === 1 || n === 2 || n === 4 || n % 8 === 0; // regla del 8 (+4; 1-2px para ajustes ópticos)

const body = html.replace(/(?::root|\[data-theme=[a-z]+\])\s*\{[\s\S]*?\}/g, '');
const tally = (list) => list.reduce((a, k) => ((a[k] = (a[k] || 0) + 1), a), {});
const offHex = tally([...body.matchAll(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)].map((m) => norm(m[0])).filter((h) => !palette.has(h)));
const offFont = tally([...body.matchAll(/font-size:\s*([\d.]+)px/g)].map((m) => px(m[1])).filter((v) => !fonts.has(v)).map((v) => v + 'px'));
const offRadius = tally([...body.matchAll(/border-radius:\s*([\d.]+)px/g)].map((m) => px(m[1])).filter((v) => !radii.has(v)).map((v) => v + 'px'));
const offSpace = tally([...body.matchAll(/(?:padding|margin|gap)(?:-[a-z]+)?:\s*([^;"}]+)/g)]
  .flatMap((m) => [...m[1].matchAll(/(-?[\d.]+)px/g)].map((x) => Math.abs(px(x[1]))))
  .filter((v) => !isGrid(v)).map((v) => v + 'px'));

const current = { coloresFueraDePaleta: offHex, fontSizesFueraDeEscala: offFont, radiosFueraDeEscala: offRadius, espaciadoFueraDeRejilla: offSpace };
const total = (o) => Object.values(o).reduce((a, b) => a + b, 0);

if (args.has('--update-baseline')) {
  writeFileSync(BASELINE, JSON.stringify(current, null, 2) + '\n');
  notes.push('design-baseline.json actualizado');
} else {
  let base = {};
  try { base = JSON.parse(readFileSync(BASELINE, 'utf8')); } catch { errors.push('Falta scripts/design-baseline.json → node scripts/check.mjs --update-baseline'); }
  for (const [k, cur] of Object.entries(current)) {
    const b = base[k] || {};
    const nuevos = Object.entries(cur).filter(([v, n]) => n > (b[v] || 0)).map(([v, n]) => `${v} (+${n - (b[v] || 0)})`);
    if (nuevos.length) errors.push(`${k}: valores nuevos fuera del sistema → ${nuevos.join(', ')}. Usa un token (--db-*) o, si es una decisión, añádelo al sistema y documéntalo.`);
    else if (total(cur) < total(b)) notes.push(`${k}: ${total(b)} → ${total(cur)}. Ejecuta --update-baseline para fijar la mejora.`);
  }
  notes.push('Deuda de diseño: ' + Object.entries(current).map(([k, v]) => `${k} ${total(v)}`).join(' · '));
}

for (const n of notes) console.log('· ' + n);
if (errors.length) { console.error('\n✗ check fallido:\n' + errors.map((e) => '  - ' + e).join('\n')); process.exit(1); }
console.log('✓ check correcto');
