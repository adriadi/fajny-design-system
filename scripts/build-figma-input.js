// Builds tokens/figma/input-component.js: a Figma plugin script, run through the Figma MCP use_figma
// tool, that writes the Input component set and the Input page (decisions 58, 59, 60). Every fill,
// stroke, size, radius, gap and opacity is bound to a variable, and every text to a text style
// (label, help and error in small, the value in field), so the component follows the tokens.
//
// Type (Text, Select, Textarea, Password) × State (Default, Hover, Focus, Error, Disabled). Label,
// help and error are text properties; help and error can be switched off. The icons are the ones in
// scripts/input-icons.js, and the select's chevron is the one components/input.css draws, so the
// Figma field can't show other icons than code. The colour roles each state uses are listed below;
// the build fails if components/input.css uses a colour role the list doesn't name, or the other way.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { DOC_RUNTIME } from './figma-doc-layout.js';
import { ICONS } from './input-icons.js';
import { TYPES, DISABLED_HELP } from './input-examples.js';

const OUT_DIR = 'tokens/figma/';
const OUT_FILE = `${OUT_DIR}input-component.js`;

const STATES = ['Default', 'Hover', 'Focus', 'Error', 'Disabled'];
const SHARED = {
  width: 320, // the default width of a field in Figma; in code a field is as wide as its container
  gap: 'space/2', minHeight: 'space/12', textareaMinHeight: 'space/30',
  paddingY: 'space/2', paddingX: 'space/4', actionSize: 'space/12', iconSize: 'space/4', actionIconSize: 'space/5',
  radius: 'radius/md', strokeWeight: 'border-width/control', opacity: 'opacity/disabled',
  focusColor: 'color/focus', focusWidth: 'focus/ring-width', focusOffset: 'focus/ring-offset',
  fill: 'color/surface', label: 'color/text', value: 'color/text', placeholder: 'color/text-placeholder',
  help: 'color/text-muted', action: 'color/text-muted', error: 'color/error',
  border: { Default: 'color/border-input', Hover: 'color/border-strong', Focus: 'color/border-strong', Error: 'color/error', Disabled: 'color/border-input' },
  labelStyle: 'small', valueStyle: 'field', helpStyle: 'small',
  props: { label: 'Label', help: 'Help', error: 'Error', showHelp: 'Show help', showError: 'Show error' },
  defaults: { label: 'Label', help: 'Help text', error: 'Error message' },
};

// The colour roles here must be exactly the ones input.css uses.
const css = readFileSync('components/input.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const inCss = new Set([...css.matchAll(/var\(--fds-color-([\w-]+)\)/g)].map((m) => `color/${m[1]}`));
const inPlan = new Set([SHARED.fill, SHARED.label, SHARED.value, SHARED.placeholder, SHARED.help, SHARED.action, SHARED.error,
  SHARED.focusColor, ...Object.values(SHARED.border)]);
const drift = [
  ...[...inCss].filter((r) => !inPlan.has(r)).map((r) => `${r} is in input.css but not in the Figma input`),
  ...[...inPlan].filter((r) => !inCss.has(r)).map((r) => `${r} is in the Figma input but not in input.css`),
];

// The select's chevron: the path input.css draws as a mask.
const chevronPath = css.match(/path d='([^']+)'/)?.[1];
if (!chevronPath) drift.push('components/input.css draws no chevron path for the select');
const chevron = `<svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${chevronPath}"/></svg>`;
const figmaSvg = (svg) => svg.replace(/ data-icon="\w+"| aria-hidden="true"| focusable="false"/g, '').replace('currentColor', 'black');

// The Input page's text comes from docs/input.md: the first sentence for the page, the second for
// the "Component set" section, and the first sentence under "States" for "Variants".
const doc = readFileSync('docs/input.md', 'utf8');
const [purpose, setSubtitle] = doc.split('\n').find((l) => l && !l.startsWith('#')).split(/(?<=\.) /);
const variantsSubtitle = doc.split('\n## States\n')[1]?.trim().split('\n')[0];
if (!variantsSubtitle || variantsSubtitle.startsWith('|')) drift.push('docs/input.md has no sentence under "## States"');

if (drift.length) {
  console.error('Figma input build failed:\n' + drift.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

// What each variant shows in its field: the placeholder (in the placeholder colour) or a value.
const PASSWORD_DOTS = (text) => '•'.repeat(text.length);
const types = TYPES.map((t) => {
  const shown = (state) => {
    const value = state === 'Error' ? t.wrong : state === 'Disabled' ? t.value : '';
    const text = value && t.name === 'Password' ? PASSWORD_DOTS(value) : value;
    return text ? { text, color: SHARED.value } : { text: t.placeholder, color: SHARED.placeholder };
  };
  return {
    type: t.name,
    fields: Object.fromEntries(STATES.map((s) => [s, shown(s)])),
    example: { label: t.label, help: t.help, error: t.error },
  };
});

const plan = {
  types, states: STATES, shared: SHARED, icons: { warning: figmaSvg(ICONS.warning), show: figmaSvg(ICONS.show), chevron },
  componentPage: 'Input', purpose, setSubtitle, variantsSubtitle, disabledHelp: DISABLED_HELP,
};

const script = `// Generated by scripts/build-figma-input.js: don't edit, rebuild.
// Figma plugin script for the Figma MCP use_figma tool. It updates the Input component set on the
// Input page in place (variants by name; missing ones created, none deleted) and rebuilds the page
// around it (decision 58), top to bottom: the purpose, the set, and "Variants", every type in every
// state on a light surface (decision 60). Needs the color, typography, spacing, radius, focus,
// border-width and opacity collections and the small and field text styles. Safe to run again:
// variant IDs stay the same.
const PLAN = ${JSON.stringify(plan, null, 2)};

${DOC_RUNTIME}

const S = PLAN.shared;
const bind = (node, field, name) => node.setBoundVariable(field, docVar(name));
const RADII = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];

// An icon from its SVG, scaled to a size variable, its strokes bound to a colour role.
function icon(svg, size, color) {
  const node = figma.createNodeFromSvg(svg);
  node.name = 'icon';
  node.fills = [];
  node.rescale(docVar(size).valuesByMode[Object.keys(docVar(size).valuesByMode)[0]] / node.width);
  for (const v of node.findAll((n) => n.type === 'VECTOR')) v.strokes = [docPaint(color)];
  node.clipsContent = false;
  return node;
}

async function text(chars, style, color) {
  const t = await docText(chars, style, color);
  t.textAutoResize = 'HEIGHT';
  return t;
}

// ── The component set: updated in place ──
const componentPage = await docPage(PLAN.componentPage);
let set = componentPage.findOne((n) => n.type === 'COMPONENT_SET' && n.name === 'Input');

// Rebuilds the inside of one variant, whatever was there before. The variant node itself (and its
// ID) stays; its children are recreated, so every run gives the same structure.
async function fill(comp, row, state) {
  for (const child of [...comp.children]) child.remove();
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(S.width, comp.height);
  bind(comp, 'itemSpacing', S.gap);
  comp.fills = [];
  comp.clipsContent = false;
  comp.setBoundVariable('opacity', null); comp.opacity = 1;

  const label = await text(S.defaults.label, S.labelStyle, S.label);
  label.name = 'label';
  comp.appendChild(label); label.layoutSizingHorizontal = 'FILL';

  const field = docFrame('field', 'HORIZONTAL', { counterAxisAlignItems: row.type === 'Textarea' ? 'MIN' : 'CENTER' });
  comp.appendChild(field); field.layoutSizingHorizontal = 'FILL';
  field.fills = [docPaint(S.fill)];
  field.strokes = [docPaint(S.border[state])];
  field.strokeAlign = 'INSIDE';
  bind(field, 'strokeWeight', S.strokeWeight);
  RADII.forEach((f) => bind(field, f, S.radius));
  bind(field, 'minHeight', row.type === 'Textarea' ? S.textareaMinHeight : S.minHeight);
  bind(field, 'paddingTop', S.paddingY); bind(field, 'paddingBottom', S.paddingY);
  bind(field, 'paddingLeft', S.paddingX);
  bind(field, 'paddingRight', row.type === 'Password' ? S.actionSize : S.paddingX);
  bind(field, 'itemSpacing', S.gap);
  if (state === 'Disabled') bind(field, 'opacity', S.opacity);

  const shown = row.fields[state];
  const value = await text(shown.text, S.valueStyle, shown.color);
  value.name = 'value';
  field.appendChild(value); value.layoutSizingHorizontal = 'FILL';

  if (row.type === 'Select') field.appendChild(icon(PLAN.icons.chevron, S.iconSize, S.value));
  if (row.type === 'Password') {
    // The show/hide button: 48px square at the field's right edge, the eye icon in its middle.
    const action = docFrame('show/hide', 'HORIZONTAL', { primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER' });
    field.appendChild(action);
    action.layoutPositioning = 'ABSOLUTE';
    action.primaryAxisSizingMode = 'FIXED'; action.counterAxisSizingMode = 'FIXED';
    bind(action, 'width', S.actionSize); bind(action, 'height', S.actionSize);
    action.constraints = { horizontal: 'MAX', vertical: 'CENTER' };
    action.x = field.width - action.width; action.y = (field.height - action.height) / 2;
    action.appendChild(icon(PLAN.icons.show, S.actionIconSize, S.action));
  }
  if (state === 'Focus') {
    // The system focus ring: ring-width in color-focus, ring-offset outside the field's border.
    const offset = docVar(S.focusOffset).valuesByMode[Object.keys(docVar(S.focusOffset).valuesByMode)[0]];
    const ring = figma.createFrame();
    ring.name = 'focus ring';
    field.appendChild(ring);
    ring.layoutPositioning = 'ABSOLUTE';
    ring.fills = [];
    ring.strokes = [docPaint(S.focusColor)];
    ring.strokeAlign = 'OUTSIDE';
    bind(ring, 'strokeWeight', S.focusWidth);
    RADII.forEach((f) => bind(ring, f, S.radius));
    ring.x = -offset; ring.y = -offset;
    ring.resize(field.width + 2 * offset, field.height + 2 * offset);
    ring.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
  }

  const help = await text(S.defaults.help, S.helpStyle, S.help);
  help.name = 'help';
  comp.appendChild(help); help.layoutSizingHorizontal = 'FILL';

  if (state === 'Error') {
    const error = docFrame('error', 'HORIZONTAL', { counterAxisAlignItems: 'MIN' });
    comp.appendChild(error); error.layoutSizingHorizontal = 'FILL';
    bind(error, 'itemSpacing', S.gap);
    error.appendChild(icon(PLAN.icons.warning, S.iconSize, S.error));
    const message = await text(S.defaults.error, S.helpStyle, S.error);
    message.name = 'message';
    error.appendChild(message); message.layoutSizingHorizontal = 'FILL';
  }
  return comp;
}

const ids = { updated: [], created: [] };
const fresh = [];
const variantName = (type, state) => 'Type=' + type + ', State=' + state;
for (const row of PLAN.types) {
  for (const state of PLAN.states) {
    const name = variantName(row.type, state);
    let comp = set ? set.findChild((n) => n.name === name) : null;
    if (comp) ids.updated.push(comp.id);
    else { comp = figma.createComponent(); comp.name = name; fresh.push(comp); }
    await fill(comp, row, state);
  }
}
if (!set) {
  set = figma.combineAsVariants(fresh, componentPage);
  set.name = 'Input';
} else {
  for (const comp of fresh) set.appendChild(comp);
}
ids.created = fresh.map((c) => c.id);
set.description = 'Text, select, textarea and password, every state. Label above the field, help or error text below (decisions 59, 60). Bound to the color, spacing, radius, focus, border-width and opacity variables and the small and field text styles. Light surfaces only. Same as components/input.css.';

// Text and boolean properties: found by name, created once, then every variant's nodes point to them.
const propKey = (name, type, value) => Object.keys(set.componentPropertyDefinitions).find((k) => k.split('#')[0] === name)
  ?? set.addComponentProperty(name, type, value);
const P = S.props;
const keys = {
  label: propKey(P.label, 'TEXT', S.defaults.label),
  help: propKey(P.help, 'TEXT', S.defaults.help),
  error: propKey(P.error, 'TEXT', S.defaults.error),
  showHelp: propKey(P.showHelp, 'BOOLEAN', true),
  showError: propKey(P.showError, 'BOOLEAN', true),
};
for (const comp of set.children) {
  comp.findChild((n) => n.name === 'label').componentPropertyReferences = { characters: keys.label };
  comp.findChild((n) => n.name === 'help').componentPropertyReferences = { characters: keys.help, visible: keys.showHelp };
  const error = comp.findChild((n) => n.name === 'error');
  if (error) {
    error.componentPropertyReferences = { visible: keys.showError };
    error.findChild((n) => n.name === 'message').componentPropertyReferences = { characters: keys.error };
  }
}

// Lay the variants out in a grid: one row per type, one column per state.
set.layoutMode = 'NONE';
const COL = S.width + 48, GAP = 48, PAD = 24;
let y = PAD;
for (const row of PLAN.types) {
  const comps = PLAN.states.map((s) => set.findChild((n) => n.name === variantName(row.type, s)));
  comps.forEach((comp, c) => { comp.x = PAD + c * COL; comp.y = y; });
  y += Math.max(...comps.map((c) => c.height)) + GAP;
}
set.resize(PAD * 2 + PLAN.states.length * COL - (COL - S.width), y - GAP + PAD);

// The set sits in a frame that sets the light surface and desktop modes: main components show their
// bound colours only inside a frame with modes. The frame is kept between runs.
let holder = set.parent.type === 'FRAME' && set.parent.name === 'Component set' ? set.parent : null;
if (!holder) {
  holder = figma.createFrame();
  holder.name = 'Component set';
  componentPage.appendChild(holder);
  holder.appendChild(set);
}
docSurface(holder, 'Light surface');
for (const child of [...holder.children]) if (child !== set) child.remove();
set.x = 0; set.y = 0;
holder.resize(set.width, set.height);

// A bound paint also stores a fallback colour, and Figma draws the set and its frame with it. Set it
// to the value the variable resolves to here, on the light surface; the variable stays bound.
async function resolvePaints(node) {
  for (const field of ['fills', 'strokes']) {
    const paints = node[field];
    if (!Array.isArray(paints) || !paints.some((p) => p.boundVariables?.color)) continue;
    const next = [];
    for (const p of paints) {
      if (!p.boundVariables?.color) { next.push(p); continue; }
      const variable = await figma.variables.getVariableByIdAsync(p.boundVariables.color.id);
      const { r, g, b } = variable.resolveForConsumer(node).value;
      next.push(figma.variables.setBoundVariableForPaint(Object.assign({}, p, { color: { r, g, b } }), 'color', variable));
    }
    node[field] = next;
  }
  if ('children' in node) for (const child of node.children) await resolvePaints(child);
}
await resolvePaints(holder);

// ── The page around the set: rebuilt on every run ──
for (const child of [...componentPage.children]) if (child !== holder) child.remove();

// The page reads top to bottom: the purpose, the component set, then every type in every state.
const root = docRoot(componentPage, 1440);
await docSection(root, 'Input', PLAN.purpose);
// A placeholder that keeps the component set's place in the layout; the set's frame sits on top of it.
const setSection = await docSection(root, 'Component set', PLAN.setSubtitle, 'subheading');
const slot = figma.createFrame();
slot.name = 'Component set placeholder'; slot.fills = [];
slot.resize(holder.width, holder.height);
setSection.appendChild(slot);

// Variants: light surface only (decision 60). Each instance shows its type's example texts.
const variants = await docSection(root, 'Variants', PLAN.variantsSubtitle, 'subheading');
const frame = docFrame('Light surface', 'VERTICAL', { itemSpacing: 32, paddingTop: 40, paddingBottom: 40, paddingLeft: 40, paddingRight: 40 });
variants.appendChild(frame);
docSurface(frame, 'Light surface');
const header = docFrame('states', 'HORIZONTAL', { itemSpacing: 48 });
frame.appendChild(header);
header.appendChild(await docText('Light surface', 'overline', 'color/text-muted', 120));
for (const s of PLAN.states) header.appendChild(await docText(s, 'small', 'color/text-muted', S.width));
for (const row of PLAN.types) {
  const line = docFrame(row.type, 'HORIZONTAL', { itemSpacing: 48 });
  frame.appendChild(line);
  line.appendChild(await docText(row.type, 'small', 'color/text-muted', 120));
  for (const s of PLAN.states) {
    const instance = set.findChild((n) => n.name === variantName(row.type, s)).createInstance();
    line.appendChild(instance);
    instance.setProperties({
      [keys.label]: row.example.label,
      [keys.help]: s === 'Disabled' ? PLAN.disabledHelp : row.example.help,
      ...(s === 'Error' ? { [keys.error]: row.example.error } : {}),
    });
  }
}

// The page frame takes the width of its widest section.
root.resize(root.paddingLeft + Math.max(...root.children.map((c) => c.width)) + root.paddingRight, root.height);
docUnclip(root);
docFitShadows(root);

// The set's frame on top of its placeholder (moving it keeps every ID).
componentPage.appendChild(holder);
holder.x = slot.absoluteBoundingBox.x;
holder.y = slot.absoluteBoundingBox.y;
docUnclip(holder);

return { componentSetId: set.id, variants: set.children.length, updated: ids.updated.length, created: ids.created.length,
  variantIds: set.children.map((c) => c.id).sort(), properties: Object.keys(set.componentPropertyDefinitions), page: componentPage.id };
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, script);
console.log(`✔︎ ${OUT_FILE}: ${TYPES.length * STATES.length} Input variants, roles match components/input.css.`);
