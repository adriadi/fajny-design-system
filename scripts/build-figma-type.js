// Builds tokens/figma/typography-collection.js: a Figma plugin script, run through the Figma MCP
// use_figma tool, that writes the "typography" variable collection and one text style per role
// (decision 47). Like the color collection, it has one writer: this script (decision 45).
//
// Everything comes from tokens/typography.tokens.json (decision 44):
// - font/size/<role>: a variable with two modes, "Mobile" (the clamp() min, a 390px screen) and
//   "Desktop" (the max, 1280px), in px at a 16px root. Text styles bind their size to it.
// - Line height and letter spacing are percentages on the text style, not variables: a variable
//   would be applied in px, while a percentage follows the bound size in both modes.
// - Family, weight and text transform are set on the style from the role's tokens.
// It also rebuilds the Typography page (decision 58): every role with what it's for and its values,
// then a specimen with real portfolio text, in four frames
// (Mobile and Desktop, each on a light and a dark surface), so a token change can be checked by eye.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { DOC_RUNTIME } from './figma-doc-layout.js';

const OUT_DIR = 'tokens/figma/';
const OUT_FILE = `${OUT_DIR}typography-collection.js`;
const ROOT_PX = 16;

// Figma names font styles, not weights, and the names differ per family.
const STYLE_NAMES = {
  Syne: { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold' },
  Inter: { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'Semi Bold', 700: 'Bold' },
};
// CSS text-transform -> Figma textCase.
const TEXT_CASE = { none: 'ORIGINAL', uppercase: 'UPPER', lowercase: 'LOWER', capitalize: 'TITLE' };

// Specimen text for the Typography page, from the portfolio (adriadi/portfolio, main). Each text
// role wraps to at least two lines in the Mobile frame; label stays on one line, like a button.
// Every sample is set in its role's text colour only.
const SAMPLES = {
  // index.html, home hero h1
  display: { text: 'Hi, I am Adrianna. I am empowering Design with AI.' },
  // usecases/hawk-case-study.html, page title h1
  title: { text: 'Hundreds of criminal patterns. None had a paper trail.' },
  // index.html, contact section title h2
  heading: { text: "Let's make something good." },
  // usecases/hawk-case-study.html, h3
  subheading: { text: 'The system had 247 patterns. Not one knew where it came from.' },
  // index.html, article card title
  'card-title': { text: 'Can I ask this video a question? Yes, you can.' },
  // usecases/curaay-case-study.html, overview paragraph
  lead: { text: 'Curaay is an AI-powered health platform that helps patients in Germany find and book doctors - fast, across both digitised and non-digitised clinics.' },
  // usecases/hawk-case-study.html, overview paragraph
  body: { text: 'The typologies existed. But ask where any of them came from - which institution published it, which document, which section - and the system went quiet. Analysts were on their own.' },
  // usecases/hawk-case-study.html, image caption
  small: { text: 'Screen 2 · Typology Detail - the 4-level source chain is permanent, not hidden behind a tab. Every level links. The original PDF is one click away.' },
  // usecases/hawk-case-study.html, metric label
  overline: { text: 'Typologies in the library - each one now traceable to its exact institutional origin' },
  // index.html, hero button. A label is one line, so it doesn't wrap.
  label: { text: 'View my work' },
};

const { font } = JSON.parse(readFileSync('tokens/typography.tokens.json', 'utf8'));
const names = (group) => Object.keys(group ?? {}).filter((k) => !k.startsWith('$'));
const round = (n) => Math.round(n * 1000) / 1000;

const roles = [];
const errors = [];
for (const role of names(font.size)) {
  const size = font.size[role];
  const m = String(size.$value).match(/^clamp\(\s*([\d.]+)rem\s*,[^,]+,\s*([\d.]+)rem\s*\)$/);
  if (!m) { errors.push(`font.size.${role} is not clamp(<min>rem, …, <max>rem)`); continue; }

  const typeface = String(font.family?.[role]?.$value ?? '').match(/^\{font\.typeface\.(.+)\}$/)?.[1];
  const family = font.typeface?.[typeface]?.$value?.[0];
  const weight = font.weight?.[role]?.$value;
  const style = STYLE_NAMES[family]?.[weight];
  if (!family) errors.push(`font.family.${role} doesn't resolve to a font.typeface.* token`);
  else if (!style) errors.push(`${role}: no Figma style name for ${family} at weight ${weight}`);

  const lineHeight = font['line-height']?.[role]?.$value;
  if (typeof lineHeight !== 'number') errors.push(`font.line-height.${role} must be a unitless number`);

  const tracking = String(font['letter-spacing']?.[role]?.$value ?? '');
  const em = tracking === '0' ? 0 : Number(tracking.match(/^(-?[\d.]+)em$/)?.[1]);
  if (Number.isNaN(em)) errors.push(`font.letter-spacing.${role} must be 0 or a value in em`);

  const sample = SAMPLES[role];
  if (!sample) errors.push(`${role} has no specimen text for the Typography page`);

  const transform = font['text-transform']?.[role]?.$value ?? 'none';
  if (!TEXT_CASE[transform]) errors.push(`font.text-transform.${role}: no Figma text case for ${transform}`);

  roles.push({
    role,
    variable: `font/size/${role}`,
    mobile: round(Number(m[1]) * ROOT_PX),
    desktop: round(Number(m[2]) * ROOT_PX),
    family,
    style,
    lineHeight: round(lineHeight * 100),
    lineHeightValue: lineHeight,
    weight,
    tracking,
    letterSpacing: round(em * 100),
    textCase: TEXT_CASE[transform],
    description: (size.$description ?? '').replaceAll("'", '’'),
    sample: sample?.text,
  });
}

if (errors.length) {
  console.error(`Figma typography build failed (${errors.length}):\n` + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

// The specimen section's subtitle on the Typography page, as the README's Figma section says.
const SPECIMEN_SUBTITLE = 'Real portfolio text in every role, on a 390px and a 1280px screen, on a light and a dark surface.';

const plan = {
  collection: 'typography',
  modes: ['Mobile', 'Desktop'],
  roles,
  page: {
    name: 'Typography',
    // The first sentence of the font group's description; the specimen's subtitle is in the README too.
    subtitle: font.$description.split(/(?<=\.) /)[0],
    specimenSubtitle: SPECIMEN_SUBTITLE,
    widths: { Mobile: 390, Desktop: 1280 },
    // [color mode, frame background]: text colours come from the roles and switch with the mode.
    surfaces: [['Light surface', 'color/background'], ['Dark surface', 'color/surface-dark']],
    label: { style: 'overline', color: 'color/text-muted' },
    text: 'color/text',
  },
};

const script = `// Generated by scripts/build-figma-type.js from tokens/typography.tokens.json: don't edit, rebuild.
// Figma plugin script for the Figma MCP use_figma tool. It writes the "typography" collection
// (font/size/<role>, modes Mobile and Desktop) and one text style per role, with its size bound to
// the variable, then rebuilds the Typography page. Safe to run again.
const PLAN = ${JSON.stringify(plan, null, 2)};

const [MOBILE, DESKTOP] = PLAN.modes;
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const collection = collections.find((c) => c.name === PLAN.collection)
  ?? figma.variables.createVariableCollection(PLAN.collection);

// Modes: the first mode becomes "Mobile", then "Desktop" is found or added.
let mobile = collection.modes.find((m) => m.name === MOBILE);
if (!mobile) {
  collection.renameMode(collection.modes[0].modeId, MOBILE);
  mobile = collection.modes[0];
}
const mobileId = mobile.modeId;
const desktopId = collection.modes.find((m) => m.name === DESKTOP)?.modeId ?? collection.addMode(DESKTOP);

const variables = (await figma.variables.getLocalVariablesAsync('FLOAT')).filter((v) => v.variableCollectionId === collection.id);
const styles = await figma.getLocalTextStylesAsync();
const created = { variables: [], styles: [] };
const unbound = [];

for (const r of PLAN.roles) {
  let v = variables.find((x) => x.name === r.variable);
  if (!v) { v = figma.variables.createVariable(r.variable, collection, 'FLOAT'); created.variables.push(r.variable); }
  v.setValueForMode(mobileId, r.mobile);
  v.setValueForMode(desktopId, r.desktop);
  v.scopes = ['FONT_SIZE'];
  v.description = r.description;
  v.hiddenFromPublishing = false;

  await figma.loadFontAsync({ family: r.family, style: r.style });
  let s = styles.find((x) => x.name === r.role);
  if (!s) { s = figma.createTextStyle(); s.name = r.role; created.styles.push(r.role); }
  s.fontName = { family: r.family, style: r.style };
  s.setBoundVariable('fontSize', v);
  s.lineHeight = { unit: 'PERCENT', value: r.lineHeight };
  s.letterSpacing = { unit: 'PERCENT', value: r.letterSpacing };
  s.textCase = r.textCase;
  s.description = r.description;
  if (s.boundVariables?.fontSize?.id !== v.id) unbound.push(r.role);
}
if (unbound.length) throw new Error('Font size could not be bound to its variable on: ' + unbound.join(', '));

// ── The Typography page: rebuilt on every run ──
${DOC_RUNTIME}
const P = PLAN.page;
const legacy = figma.root.children.find((p) => p.name === 'Type check');
if (legacy) legacy.remove();
const page = await docPage(P.name);
for (const child of [...page.children]) child.remove();
const root = docRoot(page, 1920);

// Every role with what it's for and its values.
const roles = await docSection(root, 'Typography', P.subtitle);
const table = docFrame('roles', 'VERTICAL', { itemSpacing: 16 });
roles.appendChild(table);
const COLUMNS = [['Role', 160], ['What it’s for', 640], ['Family', 200], ['Size, 390 → 1280px', 200], ['Line height', 140], ['Letter spacing', 160]];
const header = docFrame('header', 'HORIZONTAL', { itemSpacing: 24 });
table.appendChild(header);
for (const [label, width] of COLUMNS) header.appendChild(await docText(label, 'overline', 'color/text-muted', width));
for (const r of PLAN.roles) {
  const row = docFrame(r.role, 'HORIZONTAL', { itemSpacing: 24 });
  table.appendChild(row);
  const cells = [r.role, r.description, r.family + ' ' + r.weight, r.mobile + ' → ' + r.desktop + 'px', String(r.lineHeightValue), r.tracking];
  for (let i = 0; i < cells.length; i++) row.appendChild(await docText(cells[i], i === 0 ? 'body' : 'small', i === 0 ? 'color/text' : 'color/text-muted', COLUMNS[i][1]));
}

// The specimen: four frames, Mobile and Desktop on each surface.
const specimen = await docSection(root, 'Specimen', P.specimenSubtitle, 'subheading');
const frames = [];
for (const [colorMode] of P.surfaces) {
  const line = docFrame(colorMode, 'HORIZONTAL', { itemSpacing: 64 });
  specimen.appendChild(line);
  for (const modeName of PLAN.modes) {
    const width = P.widths[modeName];
    const frame = docFrame(modeName + ' · ' + colorMode, 'VERTICAL', { itemSpacing: 40, paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 });
    line.appendChild(frame);
    frame.counterAxisSizingMode = 'FIXED';
    frame.resize(width, frame.height);
    docSurface(frame, colorMode);
    frame.setExplicitVariableModeForCollection(collection, collection.modes.find((m) => m.name === modeName).modeId);

    for (const r of PLAN.roles) {
      const block = docFrame(r.role, 'VERTICAL', { itemSpacing: 8 });
      frame.appendChild(block);
      block.layoutSizingHorizontal = 'FILL';
      block.appendChild(await docText(r.role, P.label.style, P.label.color));
      const text = await docText(r.sample, r.role, P.text);
      block.appendChild(text);
      text.layoutSizingHorizontal = 'FILL';
      text.textAutoResize = 'HEIGHT';
    }
    frames.push({ id: frame.id, name: frame.name, width, height: Math.round(frame.height) });
  }
}

const known = new Set(PLAN.roles.map((r) => r.role));
return {
  collectionId: collection.id,
  modes: collection.modes.map((m) => m.name),
  roles: PLAN.roles.length,
  created,
  textStylesNotInTokens: styles.filter((s) => !known.has(s.name)).map((s) => s.name),
  typographyPage: { id: page.id, frames },
};
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, script);
console.log(`✔︎ ${OUT_FILE}: ${roles.length} text roles, modes "Mobile" and "Desktop".`);
