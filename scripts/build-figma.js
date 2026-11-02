// Builds tokens/figma/tokens-studio.json for Tokens Studio, which imports it as Figma variables
// and styles. The repo JSON stays the source of truth (decision 25): this file is generated from
// tokens/*.tokens.json and never edited by hand.
//
// One top-level key per token set, in W3C format. The colour roles are not in it: the "color"
// collection has a light and a dark surface mode, and scripts/build-figma-color.js writes it
// through Figma MCP. Tokens Studio finds a mode by its name, so importing the roles here would add
// a second light mode. Typography comes later as Figma modes, and motion stays in code
// (decision 43). Fluid spacing is left out because a Figma variable holds one value, not a clamp().
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const OUT_DIR = 'tokens/figma/';
const OUT_FILE = `${OUT_DIR}tokens-studio.json`;

const read = (file) => JSON.parse(readFileSync(`tokens/${file}`, 'utf8'));
const isToken = (node) => node && typeof node === 'object' && '$value' in node;

// Copies a group, writing $type on every token (inherited from its groups in the source) and
// dropping group descriptions. `keep(name, token)` decides which tokens go in.
// Descriptions get typographic apostrophes (’): Tokens Studio writes a straight one into Figma
// as &#39;.
function copyGroup(group, keep = () => true, inheritedType) {
  const type = group.$type ?? inheritedType;
  const out = {};
  for (const [name, node] of Object.entries(group)) {
    if (name.startsWith('$')) continue;
    if (isToken(node)) {
      if (!keep(name, node)) continue;
      out[name] = { $value: node.$value, $type: node.$type ?? type };
      if (node.$description) out[name].$description = node.$description.replaceAll("'", '’');
    } else {
      out[name] = copyGroup(node, keep, type);
    }
  }
  return out;
}

// Tokens Studio doesn't read the W3C shadow format: its effect styles come out empty.
// It needs its own boxShadow type, with x and y instead of offsetX and offsetY.
function toBoxShadow(group) {
  for (const token of Object.values(group)) {
    const { color, offsetX, offsetY, blur, spread } = token.$value;
    token.$value = { x: offsetX, y: offsetY, blur, spread, color, type: 'dropShadow' };
    token.$type = 'boxShadow';
  }
  return group;
}

const primitives = read('color-primitives.tokens.json');
const dimension = read('dimension.tokens.json');
const effect = read('effect.tokens.json');

const sets = {
  primitives: copyGroup(primitives),
  // Fixed steps only: fluid values are clamp(), which a Figma variable can't hold.
  spacing: { space: copyGroup(dimension.space, (_, t) => !String(t.$value).startsWith('clamp(')) },
  // Percentages stay in code: a Figma variable can't hold 50%. In Figma a circle is
  // radius-pill on an element with equal width and height.
  radius: { radius: copyGroup(dimension.radius, (_, t) => !String(t.$value).endsWith('%')) },
  shadow: { shadow: toBoxShadow(copyGroup(effect.shadow)) },
  focus: { focus: copyGroup(dimension.focus) },
};

// Figma variable scopes: which pickers in Figma offer each variable. Tokens Studio reads them from
// the flat $extensions key "com.figma.scopes" and applies them on every import, so they never
// have to be set by hand (decision 44). "NONE" hides a variable from every picker.
// Shadows become effect styles, not variables, so they have no scopes.
const SCOPES = {
  primitives: () => ['NONE'],
  spacing: () => ['GAP'],
  radius: () => ['CORNER_RADIUS'],
  focus: (name) => ({ 'ring-width': ['STROKE_FLOAT'], 'ring-offset': ['NONE'] })[name],
};

// Variables hidden from publishing: they stay out of the published library. Tokens Studio reads
// the flat $extensions key "com.figma.hiddenFromPublishing" and applies it on every import.
const HIDDEN = {
  primitives: () => true,
  focus: (name) => name === 'ring-offset',
};

// A token with no scope rule fails the build, so a new token can't reach Figma unscoped.
const unscoped = [];
const addScopes = (node, set, scopesFor, prefix) => {
  for (const [name, child] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${name}` : name;
    if (!isToken(child)) { addScopes(child, set, scopesFor, path); continue; }
    const scopes = scopesFor(name);
    if (scopes) child.$extensions = { 'com.figma.scopes': scopes };
    else unscoped.push(path);
    if (HIDDEN[set]?.(name)) child.$extensions = { ...child.$extensions, 'com.figma.hiddenFromPublishing': true };
  }
};
for (const [set, scopesFor] of Object.entries(SCOPES)) addScopes(sets[set], set, scopesFor, '');

if (unscoped.length) {
  console.error(`Figma build failed: ${unscoped.length} token(s) have no Figma scope:\n` + unscoped.map((u) => `  ✗ ${u}`).join('\n'));
  process.exit(1);
}

// Every alias must point at a token in the file, or Tokens Studio imports a broken link.
const paths = new Set();
const collect = (node, prefix) => {
  for (const [name, child] of Object.entries(node)) {
    if (name.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${name}` : name;
    if (isToken(child)) paths.add(path);
    else collect(child, path);
  }
};
Object.values(sets).forEach((set) => collect(set, ''));

const broken = [];
const checkAliases = (node, prefix) => {
  for (const [name, child] of Object.entries(node)) {
    if (name.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${name}` : name;
    if (!isToken(child)) { checkAliases(child, path); continue; }
    const strings = typeof child.$value === 'object' ? Object.values(child.$value) : [child.$value];
    for (const value of strings) {
      const ref = String(value).match(/^\{(.+)\}$/)?.[1];
      if (ref && !paths.has(ref)) broken.push(`${path} -> {${ref}}`);
    }
  }
};
Object.values(sets).forEach((set) => checkAliases(set, ''));

if (broken.length) {
  console.error(`Figma build failed: ${broken.length} alias(es) point outside the file:\n` + broken.map((b) => `  ✗ ${b}`).join('\n'));
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(sets, null, 2) + '\n');
console.log(`✔︎ ${OUT_FILE}: ${paths.size} tokens in ${Object.keys(sets).length} sets (${Object.keys(sets).join(', ')}).`);
