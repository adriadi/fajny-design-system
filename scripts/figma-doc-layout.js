// The page layout every Figma documentation page follows (decision 58), shared by the scripts that
// write pages. Each script embeds DOC_RUNTIME in its generated Figma script, so all pages are laid
// out by the same code: the documented page groups and order, a page frame on the light surface,
// sections with a title and a one-sentence subtitle in the system's own text styles and colour roles,
// and no clipping, so shadows, focus rings and components always show in full.
import { readFileSync } from 'node:fs';

// Pages in groups, in this order. Basic: the token pages. Regular: Button and other simple
// components. Advanced: components that nest other components. A separator page named "---" sits
// between two groups that have pages; Figma shows it as a divider.
export const DOC_GROUPS = [
  { name: 'Basic', pages: ['Colors', 'Typography', 'Spacing', 'Corner radius', 'Shadows'] },
  { name: 'Regular', pages: ['Button'] },
  { name: 'Advanced', pages: [] },
];
export const DOC_SEPARATOR = '---';

// The README's "Colour roles" table: group name, its roles, what the group is for.
export function readColourGroups() {
  const readme = readFileSync('README.md', 'utf8');
  const section = readme.split('\n## Colour roles\n')[1]?.split('\n## ')[0];
  if (!section) throw new Error('README.md has no "## Colour roles" section');
  return section.split('\n')
    .filter((l) => l.startsWith('| ') && !l.startsWith('| Group') && !l.startsWith('| ---'))
    .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()))
    .map(([name, roles, purpose]) => ({ name, purpose, roles: [...roles.matchAll(/`([\w-]+)`/g)].map((m) => m[1]) }));
}

// The README bullet that explains how surfaces switch the roles, without its markdown.
export function readSurfaceRule() {
  const line = readFileSync('README.md', 'utf8').split('\n').find((l) => l.startsWith('- **Surfaces switch the text roles automatically**'));
  if (!line) throw new Error('README.md has no "Surfaces switch the text roles automatically" bullet');
  return line.replace(/^- /, '').replace(/\*\*/g, '').replace(/`/g, '');
}

export const DOC_RUNTIME = `
// ── Documentation page layout (decision 58), shared by every page script ──
const DOC_GROUPS = ${JSON.stringify(DOC_GROUPS)};
const DOC_SEPARATOR = ${JSON.stringify(DOC_SEPARATOR)};
const docVars = await figma.variables.getLocalVariablesAsync();
const docVar = (name) => {
  const found = docVars.find((x) => x.name === name);
  if (!found) throw new Error('Variable not found: ' + name);
  return found;
};
const docPaint = (name) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', docVar(name));
const docStyles = await figma.getLocalTextStylesAsync();
const docStyle = (name) => {
  const found = docStyles.find((s) => s.name === name);
  if (!found) throw new Error('Text style not found: ' + name + ' (run typography-collection.js first)');
  return found;
};
for (const s of docStyles) await figma.loadFontAsync(s.fontName);
const docCollections = await figma.variables.getLocalVariableCollectionsAsync();
const docModeOf = (collection, mode) => {
  const c = docCollections.find((x) => x.name === collection);
  return [c, c.modes.find((m) => m.name === mode).modeId];
};

// Puts the documentation pages first, group by group, with one separator page between two groups
// that have pages. Existing separators are reused, missing ones created, extra empty ones removed.
// Also removes the empty "Page 1" that every new Figma file starts with.
function docOrder() {
  const groups = DOC_GROUPS
    .map((g) => g.pages.map((name) => figma.root.children.find((x) => x.name === name)).filter(Boolean))
    .filter((pages) => pages.length);
  const separators = figma.root.children.filter((x) => x.name === DOC_SEPARATOR);
  while (separators.length < groups.length - 1) {
    const p = figma.createPage();
    p.name = DOC_SEPARATOR;
    separators.push(p);
  }
  let i = 0;
  const place = (p) => {
    if (figma.root.children.indexOf(p) !== i) figma.root.insertChild(i, p);
    i++;
  };
  groups.forEach((pages, g) => {
    if (g > 0) place(separators[g - 1]);
    pages.forEach(place);
  });
  for (const p of separators.slice(Math.max(groups.length - 1, 0))) {
    if (p.children.length === 0 && p !== figma.currentPage) p.remove();
  }
  const blank = figma.root.children.find((x) => x.name === 'Page 1' && x.children.length === 0);
  if (blank && blank !== figma.currentPage && figma.root.children.length > 1) blank.remove();
}

async function docPage(name) {
  let page = figma.root.children.find((x) => x.name === name);
  if (!page) { page = figma.createPage(); page.name = name; }
  await figma.setCurrentPageAsync(page);
  docOrder();
  return page;
}

// Light or dark surface, desktop type sizes.
function docSurface(frame, mode) {
  const [cc, cid] = docModeOf('color', mode);
  frame.setExplicitVariableModeForCollection(cc, cid);
  const [tc, tid] = docModeOf('typography', 'Desktop');
  frame.setExplicitVariableModeForCollection(tc, tid);
  frame.fills = [docPaint(mode === 'Dark surface' ? 'color/surface-dark' : 'color/background')];
}

function docFrame(name, direction, props) {
  const f = figma.createAutoLayout(direction, Object.assign({ name }, props || {}));
  f.fills = [];
  f.clipsContent = false;
  return f;
}

// Turns off "Clip content" on a node and everything in it, so shadows, focus rings and components
// are never cut off. Instances follow their main component, so they're left as they are.
function docUnclip(node) {
  if (node.type === 'INSTANCE') return;
  if ('clipsContent' in node) node.clipsContent = false;
  if ('children' in node) for (const child of node.children) docUnclip(child);
}

// Grows a page frame until every shadow inside it fits, so no shadow reaches past its edges. Run it
// once the page is built: it measures each shadow as Figma draws it.
function docFitShadows(root) {
  const box = root.absoluteBoundingBox;
  let left = 0, top = 0, right = 0, bottom = 0;
  const shadowed = root.findAll((n) => 'effects' in n && n.effects.some((e) => e.type === 'DROP_SHADOW' && e.visible !== false));
  for (const node of shadowed) {
    const r = node.absoluteRenderBounds;
    if (!r) continue;
    left = Math.max(left, box.x - r.x);
    top = Math.max(top, box.y - r.y);
    right = Math.max(right, r.x + r.width - (box.x + box.width));
    bottom = Math.max(bottom, r.y + r.height - (box.y + box.height));
  }
  root.paddingLeft += Math.ceil(left);
  root.paddingTop += Math.ceil(top);
  root.paddingBottom += Math.ceil(bottom);
  root.resize(root.width + Math.ceil(left) + Math.ceil(right), root.height);
  return { left, top, right, bottom };
}

async function docText(chars, style, color, width) {
  const t = figma.createText();
  await t.setTextStyleIdAsync(docStyle(style).id);
  t.characters = String(chars);
  t.fills = [docPaint(color)];
  if (width) { t.resize(width, t.height); t.textAutoResize = 'HEIGHT'; }
  return t;
}

// The page frame: everything on a page sits in it, on the light surface.
function docRoot(page, width) {
  const root = docFrame(page.name, 'VERTICAL', { itemSpacing: 96, paddingTop: 80, paddingBottom: 80, paddingLeft: 80, paddingRight: 80 });
  page.appendChild(root);
  root.counterAxisSizingMode = 'FIXED';
  root.resize(width, root.height);
  docSurface(root, 'Light surface');
  return root;
}

// A section: a title (heading, or subheading for a smaller section) and a one-sentence subtitle,
// then its content. Returns the section frame; append the content to it.
async function docSection(parent, title, subtitle, level) {
  const section = docFrame(title, 'VERTICAL', { itemSpacing: 32 });
  parent.appendChild(section);
  const head = docFrame('title', 'VERTICAL', { itemSpacing: 12 });
  section.appendChild(head);
  head.appendChild(await docText(title, level || 'heading', 'color/text'));
  head.appendChild(await docText(subtitle, 'lead', 'color/text-muted', 880));
  return section;
}
`;
