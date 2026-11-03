// Builds docs/card-preview.html: every Card variant on the page background, on a subtle surface and
// inside a dark surface, with the hover, focus and active states shown at rest and a switch to try
// reduced motion. From tokens/css/tokens.css, components/image.css, components/card.css and
// components/button.css. It's the Card's preview on the design system page and a page to open
// locally. Generated: don't edit, rebuild.
//
// Hover, active and focus can't be shown at rest, so the preview copies those rules of card.css onto
// data-preview attributes. The reduced-motion rules of card.css are copied under a class the switch
// sets, so reduced motion can be tried without changing the computer's setting.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const OUT = 'docs/card-preview.html';
const tokens = readFileSync('tokens/css/tokens.css', 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\s*/, '');
const image = readFileSync('components/image.css', 'utf8');
const card = readFileSync('components/card.css', 'utf8');
const button = readFileSync('components/button.css', 'utf8');

const plain = card.replace(/\/\*[\s\S]*?\*\//g, '');
const reducedBlock = plain.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/)?.[1];
if (!reducedBlock) {
  console.error('Card preview build failed:\n  ✗ components/card.css has no prefers-reduced-motion block');
  process.exit(1);
}
const force = (selector) => selector
  .replace(/:is\(:hover, :active\)/g, '[data-preview="hover"]')
  .replace(/:has\(\.fds-card__link:focus-visible\)/g, '[data-preview="focus"]');
const rules = (css) => css.match(/[^{}]+\{[^{}]*\}/g).map((r) => r.trim());
const forced = rules(plain.replace(/@media[\s\S]*$/, ''))
  .filter((r) => /:is\(:hover, :active\)|:has\(\.fds-card__link:focus-visible\)/.test(r))
  .map(force).join('\n');
const reduced = rules(reducedBlock)
  .flatMap((r) => [r, force(r)])
  .map((r) => '.preview-reduced-motion ' + r).join('\n');

// A neutral 16:10 picture, so the preview needs no image file.
const PICTURE = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><rect width="1600" height="1000" fill="#E4EAF4"/>'
  + '<rect x="420" y="180" width="760" height="520" rx="24" fill="#FFFFFF"/><rect x="480" y="250" width="320" height="28" rx="14" fill="#B3C8E6"/>'
  + '<rect x="480" y="310" width="560" height="16" rx="8" fill="#D9D1C5"/><rect x="480" y="345" width="480" height="16" rx="8" fill="#D9D1C5"/>'
  + '<rect x="480" y="420" width="640" height="220" rx="16" fill="#F5F1EB"/><circle cx="1240" cy="760" r="120" fill="#E8B84B"/></svg>');

const CARDS = [
  { image: false, linked: true, overline: 'Design process', title: 'Branching without fear', text: 'What a year of Figma branches taught us about version control.', meta: '9 min read' },
  { image: true, linked: true, overline: 'Case study', title: 'Field notes that work offline', text: 'Mobile reporting for teams with no signal, and what it changed.' },
  { image: false, linked: false, title: 'Quarterly report', text: 'Reviewed and approved. The next one is due in March.', action: 'Learn more' },
  { image: true, linked: false, overline: 'Team', title: 'Who works on what', text: 'Every project, its people and who to ask.' },
];

let n = 0;
const cardHtml = (c, dark, state) => {
  const classes = ['fds-card', c.image && 'fds-card--image', dark && 'fds-card--dark'].filter(Boolean).join(' ');
  const preview = state ? ` data-preview="${state}"` : '';
  const id = `c${++n}`;
  const title = c.linked ? `<a class="fds-card__link" href="#${id}">${c.title}</a>` : c.title;
  const footer = [
    c.meta && `<p class="fds-card__meta">${c.meta}</p>`,
    c.linked && '<span class="fds-card__more" aria-hidden="true">Read more</span>',
  ].filter(Boolean).join('');
  return `<article class="${classes}"${preview} id="${id}">${c.image ? `<img class="fds-image" src="${PICTURE}" alt="" width="1600" height="1000">` : ''}
          <div class="fds-card__body">${c.overline ? `<p class="fds-card__overline">${c.overline}</p>` : ''}
            <h3 class="fds-card__title">${title}</h3>${c.text ? `<p class="fds-card__text">${c.text}</p>` : ''}
            ${c.action ? `<div class="fds-card__footer fds-card__action"><a class="fds-button fds-button--secondary" href="#${id}">${c.action}</a></div>` : footer ? `<div class="fds-card__footer">${footer}</div>` : ''}
          </div>
        </article>`;
};

const SURFACES = [['Page background', ''], ['Subtle surface', ' subtle'], ['Dark surface', ' fds-surface-dark']];
const panel = ([name, cls]) => `
  <section class="panel${cls}">
    <h2>${name}</h2>
    <p class="note">Default card: linked, linked with an image, not linked, not linked with an image</p>
    <div class="grid">
      ${CARDS.map((c) => cardHtml(c, false)).join('\n      ')}
    </div>
    <p class="note">Dark card</p>
    <div class="grid">
      ${CARDS.map((c) => cardHtml(c, true)).join('\n      ')}
    </div>
    <p class="note">Linked card states: hover, focus, active (shown at rest)</p>
    <div class="grid">
      ${['hover', 'focus', 'hover'].map((s) => cardHtml(CARDS[0], false, s)).join('\n      ')}
      ${cardHtml(CARDS[1], true, 'hover')}
    </div>
  </section>`;

const html = `<!-- @dsCard group="Components" height=900 width=1200 subtitle="Text and image cards, default and dark, linked and not, on three surfaces" -->
<!-- Generated by scripts/build-card-preview.js from tokens/css/tokens.css and components/*.css: don't edit, rebuild. -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Card</title>
<style>
${tokens}
/* The preview uses the uploaded Inter of the design system page when it's there. */
:root { --fds-font-typeface-inter: "Inter Variable Font opsz,wght", Inter, system-ui, sans-serif; }
${button}
${image}
${card}
/* Preview only: hover, focus and active shown at rest. */
${forced}
/* Preview only: the reduced-motion rules of card.css, under the switch. */
${reduced}
/* Preview layout */
body { margin: 0; background: var(--fds-color-background); color: var(--fds-color-text); font-family: var(--fds-font-family-small); }
.bar { padding: var(--fds-space-4) var(--fds-space-6); font-size: var(--fds-font-size-small); }
.panel { padding: var(--fds-space-8) var(--fds-space-6); background: var(--fds-color-background); }
.panel.subtle { background: var(--fds-color-surface-subtle); }
.panel.fds-surface-dark { background: var(--fds-color-surface-dark); }
.panel h2 { margin: 0 0 var(--fds-space-4); font: var(--fds-font-weight-overline) var(--fds-font-size-overline)/var(--fds-font-line-height-overline) var(--fds-font-family-overline); letter-spacing: var(--fds-font-letter-spacing-overline); text-transform: uppercase; }
.panel .note { margin: var(--fds-space-6) 0 var(--fds-space-3); font-size: var(--fds-font-size-small); font-weight: var(--fds-font-weight-small); color: var(--fds-color-text-muted); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(var(--fds-space-30) * 2.5)), 1fr)); gap: var(--fds-space-6); align-items: stretch; }
</style>
</head>
<body>
  <p class="bar"><label><input type="checkbox" id="reduce"> Reduce motion: hover a linked card; it shows its shadow but doesn't lift.</label></p>
${SURFACES.map(panel).join('\n')}
<script>
document.getElementById('reduce').addEventListener('change', (event) => {
  document.body.classList.toggle('preview-reduced-motion', event.target.checked);
});
</script>
</body>
</html>
`;

mkdirSync('docs', { recursive: true });
writeFileSync(OUT, html);
console.log(`✔︎ ${OUT}: ${CARDS.length} cards × default and dark, states at rest, on 3 surfaces, reduced motion to try.`);
