// Fails the build when a text role is incomplete. The roles are the keys of font.size; each needs a
// family, line-height, weight and letter-spacing token, and a family must be an alias of a
// font.typeface.* token. Tokens for a role that isn't in font.size fail too.
// Reads the JSON source, not the build, because the check is about the aliases themselves.
import { readFileSync } from 'node:fs';

const REQUIRED = ['family', 'line-height', 'weight', 'letter-spacing'];
const OPTIONAL = ['text-transform'];

const { font } = JSON.parse(readFileSync('tokens/typography.tokens.json', 'utf8'));
const names = (group) => Object.keys(group ?? {}).filter((k) => !k.startsWith('$'));
const roles = names(font.size);
const typefaces = names(font.typeface);

const failures = [];
for (const role of roles) {
  for (const property of REQUIRED) {
    if (!font[property]?.[role]) failures.push(`${role} has no font.${property}.${role} token`);
  }
  const family = font.family?.[role]?.$value;
  const ref = typeof family === 'string' && family.match(/^\{font\.typeface\.(.+)\}$/)?.[1];
  if (family && !typefaces.includes(ref)) {
    failures.push(`font.family.${role} is ${JSON.stringify(family)}: it must be an alias of a font.typeface.* token`);
  }
}
for (const property of [...REQUIRED, ...OPTIONAL]) {
  for (const name of names(font[property])) {
    if (!roles.includes(name)) failures.push(`font.${property}.${name} names a role that isn't in font.size`);
  }
}

if (failures.length) {
  console.error(`Type check failed (${failures.length}):\n` + failures.map((f) => `  ✗ ${f}`).join('\n'));
  process.exit(1);
}
console.log(`✔︎ Type: ${roles.length} roles have a family (a typeface alias), line-height, weight and letter-spacing.`);
