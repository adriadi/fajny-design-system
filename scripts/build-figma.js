// Builds tokens/figma/tokens-studio.json for Tokens Studio, which imports it as Figma variables
// and styles. The repo JSON stays the source of truth (decision 25): this file is generated from
// tokens/*.tokens.json and never edited by hand.
//
// One top-level key per token set, in W3C format. Semantic colours keep their {aliases}, so in
// Figma the roles stay linked to the primitives. Only light-surface values go in: typography,
// the -on-dark roles, fluid spacing and motion are left out.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const OUT_DIR = 'tokens/figma/';
const OUT_FILE = `${OUT_DIR}tokens-studio.json`;

const read = (file) => JSON.parse(readFileSync(`tokens/${file}`, 'utf8'));
const isToken = (node) => node && typeof node === 'object' && '$value' in node;

// Copies a group, writing $type on every token (inherited from its groups in the source) and
// dropping group descriptions. `keep(name, token)` decides which tokens go in.
function copyGroup(group, keep = () => true, inheritedType) {
  const type = group.$type ?? inheritedType;
  const out = {};
  for (const [name, node] of Object.entries(group)) {
    if (name.startsWith('$')) continue;
    if (isToken(node)) {
      if (!keep(name, node)) continue;
      out[name] = { $value: node.$value, $type: node.$type ?? type };
      if (node.$description) out[name].$description = node.$description;
    } else {
      out[name] = copyGroup(node, keep, type);
    }
  }
  return out;
}

const primitives = read('color-primitives.tokens.json');
const semantic = read('color-semantic.tokens.json');
const dimension = read('dimension.tokens.json');
const effect = read('effect.tokens.json');

const sets = {
  primitives: copyGroup(primitives),
  color: { color: copyGroup(semantic.color, (name) => !name.endsWith('-on-dark')) },
  // Fixed steps only: fluid values are clamp(), which a Figma variable can't hold.
  spacing: { space: copyGroup(dimension.space, (_, t) => !String(t.$value).startsWith('clamp(')) },
  // Percentages stay in code: a Figma variable can't hold 50%. In Figma a circle is
  // radius-pill on an element with equal width and height.
  radius: { radius: copyGroup(dimension.radius, (_, t) => !String(t.$value).endsWith('%')) },
  shadow: { shadow: copyGroup(effect.shadow) },
  focus: { focus: copyGroup(dimension.focus) },
};

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
