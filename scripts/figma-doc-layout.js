// The page layout every Figma documentation page follows (decision 58), shared by the scripts that
// write pages. Each script embeds DOC_RUNTIME in its generated Figma script, so all pages are laid
// out by the same code: the documented page order, a page frame on the light surface, and sections
// with a title and a one-sentence subtitle in the system's own text styles and colour roles.
import { readFileSync } from 'node:fs';

export const DOC_ORDER = ['Colors', 'Typography', 'Spacing', 'Corner radius', 'Shadows', 'Button'];

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
const DOC_ORDER = ${JSON.stringify(DOC_ORDER)};
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

// Puts the documentation pages first, in the documented order, and removes the empty "Page 1"
// that every new Figma file starts with.
function docOrder() {
  let i = 0;
  for (const name of DOC_ORDER) {
    const p = figma.root.children.find((x) => x.name === name);
    if (!p) continue;
    if (figma.root.children.indexOf(p) !== i) figma.root.insertChild(i, p);
    i++;
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
  return f;
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
