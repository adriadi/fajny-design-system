// Fails the build when a font size cannot zoom to 200% (WCAG 1.4.4).
// Every font-size token must be clamp(<min>rem, <preferred>, <max>rem): rem follows the browser's
// font size setting, and above 2.5× between min and max the vw part keeps text from reaching 200%.
import StyleDictionary from 'style-dictionary';
import config from '../style-dictionary.config.js';

const MAX_RATIO = 2.5;

const { allTokens } = await new StyleDictionary(config, { verbosity: 'silent' }).getPlatformTokens('css');
const sizes = allTokens.filter((t) => t.name.startsWith('fds-font-size-'));

const failures = [];
for (const t of sizes) {
  const value = String(t.$value ?? t.value);
  const m = value.match(/^clamp\(\s*([\d.]+)rem\s*,[^,]+,\s*([\d.]+)rem\s*\)$/);
  if (!m) {
    failures.push(`${t.name} is ${value}: it needs clamp() with a min and a max in rem`);
    continue;
  }
  const ratio = Number(m[2]) / Number(m[1]);
  if (ratio > MAX_RATIO) failures.push(`${t.name}: max is ${ratio.toFixed(2)}× the min, allowed ${MAX_RATIO}×`);
}

if (failures.length) {
  console.error(`Zoom check failed (${failures.length}):\n` + failures.map((f) => `  ✗ ${f}`).join('\n'));
  process.exit(1);
}
console.log(`✔︎ Zoom: ${sizes.length} font sizes are clamp() in rem, max at most ${MAX_RATIO}× the min.`);
