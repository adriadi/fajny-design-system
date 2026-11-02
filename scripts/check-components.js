// Fails the build when a component stylesheet uses a value instead of a token. Components use only
// --fds-* variables: no colour literals, no lengths, no durations, and no var() of anything else.
// Allowed: 0, unitless multipliers such as calc(-1 * …), and keywords.
import { readFileSync, readdirSync } from 'node:fs';

const DIR = 'components/';
const files = readdirSync(DIR).filter((f) => f.endsWith('.css'));

const RULES = [
  [/#[0-9a-fA-F]{3,8}\b/g, 'a colour literal'],
  [/\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(/g, 'a colour function'],
  [/(?<![\w-])\d*\.?\d+(?:px|rem|em|vw|vh|%|s|ms)\b/g, 'a length or duration'],
  [/var\(--(?!fds-)[\w-]+/g, 'a variable outside the system'],
];

const failures = [];
for (const file of files) {
  const css = readFileSync(DIR + file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  css.split('\n').forEach((line, i) => {
    for (const [re, what] of RULES) {
      for (const m of line.matchAll(re)) failures.push(`${DIR}${file}:${i + 1} uses ${what}: ${m[0]}`);
    }
  });
}

if (failures.length) {
  console.error(`Component check failed (${failures.length}):\n` + failures.map((f) => `  ✗ ${f}`).join('\n'));
  process.exit(1);
}
console.log(`✔︎ Components: ${files.length} stylesheet(s) use tokens only.`);
