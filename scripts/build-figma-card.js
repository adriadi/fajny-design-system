// Builds tokens/figma/card-component.js: a Figma plugin script, run through the Figma MCP use_figma
// tool, that writes the Card component set and the Card page (decisions 58, 62). The Card with an
// image nests the Image component (run image-component.js first), so the page belongs to the
// Advanced group. The secondary card (Style=Dark) is for dark surfaces: a veil of light, the fill in
// color/surface at opacity/tint, over a backdrop in color/surface-dark that its variant carries, since
// the veil can't be seen on a light page. Its gradient prototype (B) is shown in Variants for comparison.
//
// Image (No, Yes) × Link (Yes, No) × Style (Default, Dark) × State. A linked card has Default, Hover,
// Focus and Active; a card that isn't a link has Default only. Overline, Title, Text and Meta are text
// properties; overline, text and meta can be switched off. "Read more" is text in the label style and
// the link button's colours, not a Button instance: in code it isn't a button either.
//
// The card frame carries its own colour mode (Light surface for the default card, Dark surface for
// the dark one), so it looks the same wherever it's placed. The focus ring sits outside that frame,
// in the variant, so it takes the colour mode of the frame the card is placed in: gold on a dark
// surface, as in code. The lift is space-1 of padding that moves from the top to the bottom.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { DOC_RUNTIME } from './figma-doc-layout.js';
import { ICONS } from './card-icons.js';

const OUT_DIR = 'tokens/figma/';
const OUT_FILE = `${OUT_DIR}card-component.js`;

const LINKED_STATES = ['Default', 'Hover', 'Focus', 'Active'];
const SHARED = {
  width: 360, // the default width in Figma; in code a card is as wide as its grid cell
  lift: 'space/1', padding: 'space/6', bodyGap: 'space/5', contentGap: 'space/2', headGap: 'space/3', footerGap: 'space/2',
  radius: 'radius/lg', strokeWeight: 'border-width/default',
  fill: { Default: 'color/surface', Dark: 'color/surface' }, veil: 'opacity/tint', backdrop: 'color/surface-dark', sheenPeak: 1.5,
  accent: 'color/accent', onAccent: 'color/text-on-accent',
  badge: { size: 'space/10', right: 'space/4', overlap: 'space/4', icon: 'space/5' },
  mode: { Default: 'Light surface', Dark: 'Dark surface' },
  border: 'color/border', title: 'color/text', muted: 'color/text-muted', moreHover: 'color/text',
  focusColor: 'color/focus', focusWidth: 'focus/ring-width', focusOffset: 'focus/ring-offset',
  shadow: { No: 'shadow/md', Yes: 'shadow/lg' },
  styles: { overline: 'overline', title: 'card-title', text: 'small', meta: 'small', more: 'label' },
  props: { overline: 'Overline', title: 'Title', text: 'Text', meta: 'Meta', showOverline: 'Show overline', showText: 'Show text', showMeta: 'Show meta' },
  defaults: { overline: 'Design process', title: 'Branching without fear', text: 'What a year of Figma branches taught us about version control.', meta: '9 min read', more: 'Read more' },
};

// The colour roles here must be exactly the ones card.css uses.
const css = readFileSync('components/card.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const inCss = new Set([...css.matchAll(/var\(--fds-color-([\w-]+)\)/g)].map((m) => `color/${m[1]}`));
const inPlan = new Set([...Object.values(SHARED.fill), SHARED.border, SHARED.title, SHARED.muted, SHARED.moreHover, SHARED.focusColor, SHARED.accent, SHARED.onAccent]);
const drift = [
  ...[...inCss].filter((r) => !inPlan.has(r)).map((r) => `${r} is in card.css but not in the Figma card`),
  ...[...inPlan].filter((r) => !inCss.has(r)).map((r) => `${r} is in the Figma card but not in card.css`),
];

// The Card page's text comes from docs/card.md: the first sentence for the page, the second for the
// "Component set" section, and the first sentence under "States" for "Variants".
const doc = readFileSync('docs/card.md', 'utf8');
const [purpose, setSubtitle] = doc.split('\n').find((l) => l && !l.startsWith('#')).split(/(?<=\.) /);
const variantsSubtitle = doc.split('\n## States\n')[1]?.trim().split('\n')[0];
if (!variantsSubtitle || variantsSubtitle.startsWith('|')) drift.push('docs/card.md has no sentence under "## States"');
if (drift.length) {
  console.error('Figma card build failed:\n' + drift.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

const figmaSvg = (svg) => svg.replace(/ data-icon="\w+"| aria-hidden="true"| focusable="false"/g, '').replace('currentColor', 'black');

const variants = [];
for (const style of ['Default', 'Dark']) {
  for (const image of ['No', 'Yes']) {
    for (const link of ['Yes', 'No']) {
      for (const state of link === 'Yes' ? LINKED_STATES : ['Default']) variants.push({ image, link, style, state });
    }
  }
}

const plan = {
  variants, shared: SHARED, badgeIcon: figmaSvg(ICONS.arrow), page: 'Card', imagePage: 'Image', purpose, setSubtitle, variantsSubtitle,
  surfaces: [['Page background', 'Light surface', null], ['Subtle surface', 'Light surface', 'color/surface-subtle'], ['Dark surface', 'Dark surface', null]],
};

const script = `// Generated by scripts/build-figma-card.js: don't edit, rebuild.
// Figma plugin script for the Figma MCP use_figma tool. It updates the Card component set on the
// Card page in place (variants by name; missing ones created, none deleted) and rebuilds the page
// around it (decision 58), top to bottom: the purpose, the set, and "Variants" on the page
// background, a subtle surface and a dark surface. Needs the Image component (image-component.js),
// the color, spacing, radius, focus and border-width variables, the shadow effect styles and the
// text styles. Safe to run again: variant IDs stay the same; their layers are rebuilt.
const PLAN = ${JSON.stringify(plan, null, 2)};

${DOC_RUNTIME}

const S = PLAN.shared;
const bind = (node, field, name) => node.setBoundVariable(field, docVar(name));
const RADII = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
const value = (name) => { const v = docVar(name); return v.valuesByMode[Object.keys(v.valuesByMode)[0]]; };
const effectStyles = await figma.getLocalEffectStylesAsync();
const effect = (name) => {
  const style = effectStyles.find((s) => s.name === name);
  if (!style) throw new Error('Effect style not found: ' + name);
  return style;
};

const imagePage = figma.root.children.find((p) => p.name === PLAN.imagePage);
if (!imagePage) throw new Error('No Image page: run image-component.js first.');
await imagePage.loadAsync();
const imageComponent = imagePage.findOne((n) => n.type === 'COMPONENT' && n.name === 'Image');
if (!imageComponent) throw new Error('No Image component: run image-component.js first.');

async function text(chars, style, color, name) {
  const t = await docText(chars, style, color);
  t.name = name;
  t.textAutoResize = 'HEIGHT';
  return t;
}

const componentPage = await docPage(PLAN.page);
let set = componentPage.findOne((n) => n.type === 'COMPONENT_SET' && n.name === 'Card');

// Rebuilds the inside of one variant. The variant node (and its ID) stays.
async function fill(comp, v) {
  for (const child of [...comp.children]) child.remove();
  const lifted = v.state === 'Hover' || v.state === 'Active';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(S.width, comp.height);
  // The secondary card carries the dark surface it belongs on, so its veil and its text can be seen.
  comp.fills = v.style === 'Dark' ? [docPaint(S.backdrop)] : [];
  comp.clipsContent = false;
  comp.itemSpacing = 0;
  for (const f of ['paddingLeft', 'paddingRight']) { comp.setBoundVariable(f, null); comp[f] = 0; }
  if (lifted) { comp.setBoundVariable('paddingTop', null); comp.paddingTop = 0; bind(comp, 'paddingBottom', S.lift); }
  else { bind(comp, 'paddingTop', S.lift); comp.setBoundVariable('paddingBottom', null); comp.paddingBottom = 0; }

  const card = docFrame('card', 'VERTICAL', { itemSpacing: 0 });
  comp.appendChild(card); card.layoutSizingHorizontal = 'FILL';
  const [cc, cid] = docModeOf('color', S.mode[v.style]);
  card.setExplicitVariableModeForCollection(cc, cid);
  const [tc, tid] = docModeOf('typography', 'Desktop');
  card.setExplicitVariableModeForCollection(tc, tid);
  // The default card is white; the secondary card is the same white at opacity/tint, a veil (its
  // paint is set once the other paints are resolved, below).
  card.fills = [docPaint(S.fill[v.style])];
  card.strokes = [docPaint(S.border)];
  card.strokeAlign = 'INSIDE';
  bind(card, 'strokeWeight', S.strokeWeight);
  RADII.forEach((f) => bind(card, f, S.radius));
  if (v.link === 'Yes' && v.state !== 'Default') await card.setEffectStyleIdAsync(effect(S.shadow[v.image]).id);

  if (v.image === 'Yes') {
    // The Image component, rounded by the card: its top corners take the card's radius.
    const picture = imageComponent.createInstance();
    picture.name = 'image';
    card.appendChild(picture);
    picture.layoutSizingHorizontal = 'FILL';
    picture.resize(picture.width, picture.width * imageComponent.height / imageComponent.width);
    bind(picture, 'topLeftRadius', S.radius); bind(picture, 'topRightRadius', S.radius);
  }

  const body = docFrame('body', 'VERTICAL', {});
  card.appendChild(body); body.layoutSizingHorizontal = 'FILL';
  for (const f of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) bind(body, f, S.padding);
  bind(body, 'itemSpacing', S.bodyGap);

  const content = docFrame('content', 'VERTICAL', {});
  body.appendChild(content); content.layoutSizingHorizontal = 'FILL';
  bind(content, 'itemSpacing', S.contentGap);
  const head = docFrame('head', 'VERTICAL', {});
  content.appendChild(head); head.layoutSizingHorizontal = 'FILL';
  bind(head, 'itemSpacing', S.headGap);
  for (const [name, style, color] of [['overline', S.styles.overline, S.muted], ['title', S.styles.title, S.title]]) {
    const t = await text(S.defaults[name], style, color, name);
    head.appendChild(t); t.layoutSizingHorizontal = 'FILL';
  }
  const body_text = await text(S.defaults.text, S.styles.text, S.muted, 'text');
  content.appendChild(body_text); body_text.layoutSizingHorizontal = 'FILL';

  const footer = docFrame('footer', 'VERTICAL', {});
  body.appendChild(footer); footer.layoutSizingHorizontal = 'FILL';
  bind(footer, 'itemSpacing', S.footerGap);
  const meta = await text(S.defaults.meta, S.styles.meta, S.muted, 'meta');
  footer.appendChild(meta); meta.layoutSizingHorizontal = 'FILL';
  if (v.link === 'Yes') {
    const more = await text(S.defaults.more, S.styles.more, lifted ? S.moreHover : S.muted, 'read more');
    more.textAutoResize = 'WIDTH_AND_HEIGHT';
    footer.appendChild(more);
  }

  // The hover badge (decision 65): a gold circle with an arrow, half on the image and half on the body,
  // on a linked card with an image, while it is hovered, focused or pressed.
  if (v.image === 'Yes' && v.link === 'Yes' && v.state !== 'Default') {
    const picture = card.findChild((n) => n.name === 'image');
    const badge = docFrame('badge', 'HORIZONTAL', { primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER' });
    card.appendChild(badge);
    badge.layoutPositioning = 'ABSOLUTE';
    badge.primaryAxisSizingMode = 'FIXED'; badge.counterAxisSizingMode = 'FIXED';
    bind(badge, 'width', S.badge.size); bind(badge, 'height', S.badge.size);
    RADII.forEach((f) => bind(badge, f, 'radius/pill'));
    badge.fills = [docPaint(S.accent)];
    const arrow = figma.createNodeFromSvg(PLAN.badgeIcon);
    arrow.name = 'arrow';
    arrow.fills = [];
    arrow.rescale(value(S.badge.icon) / arrow.width);
    for (const vec of arrow.findAll((n) => n.type === 'VECTOR')) vec.strokes = [docPaint(S.onAccent)];
    badge.appendChild(arrow);
    const size = value(S.badge.size);
    badge.x = card.width - value(S.badge.right) - size;
    badge.y = picture.height + value(S.badge.overlap) - size;
  }

  if (v.state === 'Focus') {
    // The system focus ring, outside the card, in the colour mode of the frame the card is placed in.
    const offset = value(S.focusOffset);
    const ring = figma.createFrame();
    ring.name = 'focus ring';
    comp.appendChild(ring);
    ring.layoutPositioning = 'ABSOLUTE';
    ring.fills = [];
    ring.strokes = [docPaint(S.focusColor)];
    ring.strokeAlign = 'OUTSIDE';
    bind(ring, 'strokeWeight', S.focusWidth);
    RADII.forEach((f) => bind(ring, f, S.radius));
    ring.x = -offset; ring.y = value(S.lift) - offset;
    ring.resize(card.width + 2 * offset, card.height + 2 * offset);
    ring.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
  }
  return comp;
}

const variantName = (v) => 'Image=' + v.image + ', Link=' + v.link + ', Style=' + v.style + ', State=' + v.state;
const ids = { updated: [], created: [] };
const fresh = [];
for (const v of PLAN.variants) {
  let comp = set ? set.findChild((n) => n.name === variantName(v)) : null;
  if (comp) ids.updated.push(comp.id);
  else { comp = figma.createComponent(); comp.name = variantName(v); fresh.push(comp); }
  await fill(comp, v);
}
if (!set) {
  set = figma.combineAsVariants(fresh, componentPage);
  set.name = 'Card';
} else {
  for (const comp of fresh) set.appendChild(comp);
}
ids.created = fresh.map((c) => c.id);
set.description = 'Text only or with an Image on top; default (always white) or secondary (a veil of light for dark surfaces); linked (one link, lifts by space-1 with its shadow on hover, and a gold badge on an image card) or not (no hover). Decisions 62, 65, 66. Bound to the color, spacing, radius, focus and border-width variables, the shadow effect styles and the text styles. Same as components/card.css.';

// Text and boolean properties: found by name, created once, then every variant's layers point to them.
const propKey = (name, type, val) => Object.keys(set.componentPropertyDefinitions).find((k) => k.split('#')[0] === name)
  ?? set.addComponentProperty(name, type, val);
const P = S.props;
const keys = {
  overline: propKey(P.overline, 'TEXT', S.defaults.overline),
  title: propKey(P.title, 'TEXT', S.defaults.title),
  text: propKey(P.text, 'TEXT', S.defaults.text),
  meta: propKey(P.meta, 'TEXT', S.defaults.meta),
  showOverline: propKey(P.showOverline, 'BOOLEAN', true),
  showText: propKey(P.showText, 'BOOLEAN', true),
  showMeta: propKey(P.showMeta, 'BOOLEAN', true),
};
for (const comp of set.children) {
  const find = (name) => comp.findOne((n) => n.name === name);
  find('overline').componentPropertyReferences = { characters: keys.overline, visible: keys.showOverline };
  find('title').componentPropertyReferences = { characters: keys.title };
  find('text').componentPropertyReferences = { characters: keys.text, visible: keys.showText };
  find('meta').componentPropertyReferences = { characters: keys.meta, visible: keys.showMeta };
}

// Lay the variants out: one row per Image, Link and Style; a linked card's states side by side.
set.layoutMode = 'NONE';
const COL = S.width + 48, GAP = 48, PAD = 24;
let y = PAD;
const rows = [];
for (const v of PLAN.variants) {
  const key = v.image + v.link + v.style;
  let row = rows.find((r) => r.key === key);
  if (!row) { row = { key, comps: [] }; rows.push(row); }
  row.comps.push(set.findChild((n) => n.name === variantName(v)));
}
let widest = 0;
for (const row of rows) {
  row.comps.forEach((comp, c) => { comp.x = PAD + c * COL; comp.y = y; });
  widest = Math.max(widest, row.comps.length);
  y += Math.max(...row.comps.map((c) => c.height)) + GAP;
}
set.resize(PAD * 2 + widest * COL - GAP, y - GAP + PAD);

// The set's frame, kept between runs. Each card frame carries its own mode, so this frame only
// gives the focus rings a light surface.
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

// A bound paint also stores a fallback colour, and Figma draws main components with it. Set it to
// the value the variable resolves to where the paint is. Nested instances keep their main's paints.
async function resolvePaints(node) {
  if (node.type === 'INSTANCE') return;
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

// The secondary card's veil: color/surface (white) at opacity/tint. Set last, and not bound to the
// colour variable: a bound paint loses its opacity in instances. The colour is read from color/surface
// as it is now; the opacity from opacity/tint.
for (const comp of set.children) {
  if (!comp.name.includes('Style=Dark')) continue;
  const card = comp.findChild((n) => n.name === 'card');
  const { r, g, b } = docVar(S.fill.Dark).resolveForConsumer(card).value;
  card.fills = [{ type: 'SOLID', color: { r, g, b }, opacity: value(S.veil) / 100 }];
}

// ── The page around the set: rebuilt on every run ──
for (const child of [...componentPage.children]) if (child !== holder) child.remove();
const root = docRoot(componentPage, 1440);
await docSection(root, 'Card', PLAN.purpose);
const setSection = await docSection(root, 'Component set', PLAN.setSubtitle, 'subheading');
const slot = figma.createFrame();
slot.name = 'Component set placeholder'; slot.fills = [];
slot.resize(holder.width, holder.height);
setSection.appendChild(slot);

// Variants: every kind of card at rest, on three surfaces; on the dark surface also the two
// treatments of the secondary card, side by side (A, the flat veil, is the one in the set).
const variantsSection = await docSection(root, 'Variants', PLAN.variantsSubtitle, 'subheading');
const shown = [['No', 'Yes'], ['Yes', 'Yes'], ['No', 'No'], ['Yes', 'No']];
const linkedStates = [['No', 'Hover'], ['No', 'Focus'], ['Yes', 'Hover'], ['Yes', 'Focus']];
const instanceOf = (image, link, style, state) =>
  set.findChild((n) => n.name === variantName({ image, link, style, state })).createInstance();

// Prototype B: the same veil, strongest at the top left and fading to nothing at the bottom right.
// The peak is sheenPeak times the flat veil. The stops take the colour of color/surface as it is now;
// they aren't bound, because a bound stop ignores its own alpha.
function sheen(instance) {
  const card = instance.findOne((n) => n.name === 'card');
  const surface = docVar(S.fill.Dark);
  const { r, g, b } = surface.resolveForConsumer(card).value;
  const peak = value(S.veil) / 100 * S.sheenPeak;
  card.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[0.5, 0.5, 0], [-0.5, 0.5, 0.5]],
    gradientStops: [
      { position: 0, color: { r, g, b, a: peak } },
      { position: 1, color: { r, g, b, a: 0 } },
    ] }];
}

const treatments = [];
for (const [name, mode, fillRole] of PLAN.surfaces) {
  const frame = docFrame(name, 'VERTICAL', { itemSpacing: 32, paddingTop: 40, paddingBottom: 40, paddingLeft: 40, paddingRight: 40 });
  variantsSection.appendChild(frame);
  docSurface(frame, mode);
  if (fillRole) frame.fills = [docPaint(fillRole)];
  frame.appendChild(await docText(name, 'overline', 'color/text-muted'));
  const rows = [
    ['Default card: linked, linked with an image, not linked, not linked with an image', 'Default', null, shown.map(([i, l]) => [i, l, 'Default'])],
    ['Linked card, hovered and focused (the gold badge shows on an image card)', 'Default', null, linkedStates.map(([i, st]) => [i, 'Yes', st])],
  ];
  if (mode === 'Dark surface') {
    rows.push(['Secondary card, prototype A: a flat veil of light over the surface (the one in the component set)', 'Dark', 'A', shown.map(([i, l]) => [i, l, 'Default'])]);
    rows.push(['Secondary card, prototype B: a diagonal sheen, strongest at the top left (for comparison)', 'Dark', 'B', shown.map(([i, l]) => [i, l, 'Default'])]);
  }
  for (const [title, style, treatment, cards] of rows) {
    frame.appendChild(await docText(title, 'small', 'color/text-muted'));
    const line = docFrame(style + ' ' + (treatment || ''), 'HORIZONTAL', { itemSpacing: 24, counterAxisAlignItems: 'MIN' });
    frame.appendChild(line);
    for (const [image, link, state] of cards) {
      const instance = instanceOf(image, link, style, state);
      line.appendChild(instance);
      if (treatment === 'B') { sheen(instance); treatments.push(instance.id); }
    }
  }
}

root.resize(root.paddingLeft + Math.max(...root.children.map((c) => c.width)) + root.paddingRight, root.height);
docUnclip(root);
docFitShadows(root);
componentPage.appendChild(holder);
holder.x = slot.absoluteBoundingBox.x;
holder.y = slot.absoluteBoundingBox.y;
docUnclip(holder);

return { componentSetId: set.id, variants: set.children.length, updated: ids.updated.length, created: ids.created.length,
  variantIds: set.children.map((c) => c.id).sort(), sheenInstances: treatments.length, properties: Object.keys(set.componentPropertyDefinitions), page: componentPage.id,
  order: figma.root.children.map((p) => p.name) };
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, script);
console.log(`✔︎ ${OUT_FILE}: ${variants.length} Card variants, roles match components/card.css.`);
