// Builds tokens/*.tokens.json (W3C format) into one file, tokens/css/tokens.css.
// Variables are prefixed --fds- and semantic tokens point at primitives with var().
// After :root comes the .fds-surface-dark block, which redefines the base roles with their
// -on-dark values (decision 33), so components only ever use the base roles. Then the blocks for
// elements that are a surface of their own, such as the card (decision 62).
import { formattedVariables, fileHeader } from 'style-dictionary/utils';
import { DARK_SURFACE, LIGHT_ELEMENTS, DARK_ELEMENTS, OUTER_ROLES } from './scripts/surfaces.js';

// Every switched role is redeclared on the surface itself: a custom property that points at
// another one is resolved where it is declared, so an alias set on :root would not follow.
const darkSurfaceBlock = () =>
  '.fds-surface-dark {\n' +
  '  background-color: var(--fds-color-surface-dark);\n' +
  '  color: var(--fds-color-text);\n' +
  Object.entries(DARK_SURFACE).map(([role, token]) => `  --fds-${role}: var(--fds-${token});`).join('\n') +
  '\n}\n';

// A token's own value as CSS: an alias {navy.900} becomes var(--fds-navy-900).
const cssValue = (token) => String(token.original.$value ?? token.original.value)
  .replace(/\{([^}]+)\}/g, (_, ref) => `var(--fds-${ref.replaceAll('.', '-')})`);

// Elements that are a surface of their own. The roles go on the element; the outer roles (the focus
// colour) on its children, so the element's own focus ring keeps the colour of the surface around it.
const elementBlocks = (dictionary) => {
  const light = (role) => cssValue(dictionary.allTokens.find((t) => t.name === `fds-${role}`));
  const dark = (role) => `var(--fds-${DARK_SURFACE[role]})`;
  const block = (selectors, value, roles) =>
    selectors.join(',\n') + ' {\n' + roles.map((role) => `  --fds-${role}: ${value(role)};`).join('\n') + '\n}\n';
  const inner = Object.keys(DARK_SURFACE).filter((role) => !OUTER_ROLES.includes(role));
  const outer = Object.keys(DARK_SURFACE).filter((role) => OUTER_ROLES.includes(role));
  return [
    block(LIGHT_ELEMENTS, light, inner),
    block(LIGHT_ELEMENTS.map((s) => `${s} > *`), light, outer),
    block(DARK_ELEMENTS, dark, inner),
    block(DARK_ELEMENTS.map((s) => `${s} > *`), dark, outer),
  ].join('\n');
};

export default {
  source: ['tokens/*.json'],
  hooks: {
    formats: {
      'css/fds-surfaces': async ({ dictionary, file, options }) =>
        (await fileHeader({ file })) +
        ':root {\n' +
        formattedVariables({ format: 'css', dictionary, outputReferences: options.outputReferences, usesDtcg: options.usesDtcg }) +
        '\n}\n\n' +
        darkSurfaceBlock() + '\n' +
        elementBlocks(dictionary),
    },
  },
  platforms: {
    css: {
      // The built-in 'css' group minus 'size/rem': spacing and radius stay in px as authored,
      // and font sizes are already written in rem inside clamp(), which size/rem can't parse.
      transforms: [
        'attribute/cti', 'name/kebab', 'time/seconds', 'html/icon', 'color/css',
        'asset/url', 'fontFamily/css', 'cubicBezier/css', 'strokeStyle/css/shorthand',
        'border/css/shorthand', 'typography/css/shorthand', 'transition/css/shorthand',
        'shadow/css/shorthand',
      ],
      prefix: 'fds',
      buildPath: 'tokens/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/fds-surfaces',
          options: { outputReferences: true },
        },
      ],
    },
  },
};
