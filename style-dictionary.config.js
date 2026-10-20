// Builds tokens/src/**/*.tokens.json (W3C format) into tokens/css/tokens.css.
// Variables are prefixed --fds- and semantic tokens point at primitives with var().
export default {
  source: ['tokens/src/**/*.tokens.json'],
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
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
  },
};
