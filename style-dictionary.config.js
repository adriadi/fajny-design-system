// Builds tokens/*.tokens.json (W3C format) into one file, tokens/css/tokens.css.
// Variables are prefixed --fds- and semantic tokens point at primitives with var().
// After :root comes the .fds-surface-dark block, which redefines the base roles with their
// -on-dark values (decision 33), so components only ever use the base roles.
import { formattedVariables, fileHeader } from 'style-dictionary/utils';
import { DARK_SURFACE } from './scripts/surfaces.js';

// Every switched role is redeclared on the surface itself: a custom property that points at
// another one is resolved where it is declared, so an alias set on :root would not follow.
const darkSurfaceBlock = () =>
  '.fds-surface-dark {\n' +
  '  background-color: var(--fds-color-surface-dark);\n' +
  '  color: var(--fds-color-text);\n' +
  Object.entries(DARK_SURFACE).map(([role, token]) => `  --fds-${role}: var(--fds-${token});`).join('\n') +
  '\n}\n';

export default {
  source: ['tokens/*.json'],
  hooks: {
    formats: {
      'css/fds-surfaces': async ({ dictionary, file, options }) =>
        (await fileHeader({ file })) +
        ':root {\n' +
        formattedVariables({ format: 'css', dictionary, outputReferences: options.outputReferences, usesDtcg: options.usesDtcg }) +
        '\n}\n\n' +
        darkSurfaceBlock(),
    },
  },
  platforms: {
    css: {
      // The built-in 'css' group minus 'size/rem': sizes stay in px like the portfolio,
      // and size/rem can't parse the clamp() heading sizes.
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
