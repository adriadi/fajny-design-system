// Builds tokens/*.tokens.json (W3C format) into one file, tokens/css/tokens.css.
// Variables are prefixed --fds- and semantic tokens point at primitives with var().
// Tokens under theme.<name>.* become [data-fds-theme="<name>"] blocks that override
// the same variable names, so a theme never introduces a new token.
import { formattedVariables, fileHeader } from 'style-dictionary/utils';

// Theme tokens keep unique names inside Style Dictionary (fds-theme-hawk-color-theme) and are
// renamed only on output (fds-color-theme), so the build has no name collisions to warn about.
const themeName = (token) => ({ ...token, name: token.name.replace(`fds-theme-${token.path[1]}-`, 'fds-') });

export default {
  source: ['tokens/*.json'],
  hooks: {
    formats: {
      'css/fds-themed': async ({ dictionary, file, options }) => {
        const block = (selector, allTokens) =>
          `${selector} {\n` +
          formattedVariables({
            format: 'css',
            dictionary: { ...dictionary, allTokens },
            outputReferences: options.outputReferences,
            usesDtcg: options.usesDtcg,
          }) +
          '\n}\n';

        const base = dictionary.allTokens.filter((t) => t.path[0] !== 'theme');
        const themes = [...new Set(dictionary.allTokens.filter((t) => t.path[0] === 'theme').map((t) => t.path[1]))];

        return (
          (await fileHeader({ file })) +
          block(':root', base) +
          themes
            .map((name) => '\n' + block(
              `[data-fds-theme="${name}"]`,
              dictionary.allTokens.filter((t) => t.path[0] === 'theme' && t.path[1] === name).map(themeName),
            ))
            .join('')
        );
      },
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
          format: 'css/fds-themed',
          options: { outputReferences: true },
        },
      ],
    },
  },
};
