// Fails the build when any allowed colour pair drops below its WCAG minimum (decision 33).
// Values come from the same Style Dictionary build that writes tokens.css.
import StyleDictionary from 'style-dictionary';
import config from '../style-dictionary.config.js';
import { DARK_SURFACE, LIGHT_ONLY, DECORATIVE, PAIRS, DARK_BACKGROUNDS } from './surfaces.js';

const { allTokens } = await new StyleDictionary(config, { verbosity: 'silent' }).getPlatformTokens('css');
const color = Object.fromEntries(
  allTokens.filter((t) => (t.$type ?? t.type) === 'color').map((t) => [t.name.replace(/^fds-/, ''), t.$value ?? t.value]),
);

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const value = (name) => {
  if (!color[name]) throw new Error(`Unknown colour token: ${name}`);
  if (!/^#[0-9a-f]{6}$/i.test(color[name])) throw new Error(`${name} is ${color[name]}: the check needs an opaque #rrggbb value`);
  return color[name];
};

const failures = [];
let checked = 0;

// Dark surfaces: every switched role must have a token, and light-only roles must not be switched.
for (const [role, token] of Object.entries(DARK_SURFACE)) {
  value(role);
  value(token);
}
for (const role of LIGHT_ONLY) {
  if (DARK_SURFACE[role]) failures.push(`${role} is light-only (forms and status messages) but has a dark-surface value`);
}

for (const [fg, backgrounds, min] of PAIRS) {
  if (DECORATIVE.includes(fg)) continue;
  for (const bg of backgrounds) {
    const onDark = DARK_BACKGROUNDS.includes(bg);
    if (onDark && LIGHT_ONLY.includes(fg)) {
      failures.push(`${fg} is light-only but listed on ${bg}`);
      continue;
    }
    const shown = onDark ? DARK_SURFACE[fg] ?? fg : fg;
    const r = ratio(value(shown), value(bg));
    checked++;
    if (r < min) failures.push(`${shown} on ${bg}: ${r.toFixed(2)}:1, needs ${min}:1`);
  }
}

if (failures.length) {
  console.error(`Contrast check failed (${failures.length}):\n` + failures.map((f) => `  ✗ ${f}`).join('\n'));
  process.exit(1);
}
console.log(`✔︎ Contrast: ${checked} pairs pass WCAG AA. Light-only on dark surfaces: ${LIGHT_ONLY.join(', ')}.`);
