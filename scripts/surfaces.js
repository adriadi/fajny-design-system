// Surfaces and the roles they switch (decision 33).
// The CSS build writes DARK_SURFACE as the .fds-surface-dark block, and the contrast check
// reads the same tables, so the two can never disagree. Names are token names without the
// fds- prefix.

// Base role -> the token it takes inside .fds-surface-dark.
export const DARK_SURFACE = {
  'color-text': 'color-text-on-dark',
  'color-text-muted': 'color-text-muted-on-dark',
  'color-text-emphasis': 'color-text-emphasis-on-dark',
  'color-border': 'color-border-on-dark',
  'color-border-rule': 'color-border-rule-on-dark',
  'color-focus': 'color-focus-on-dark',
  'color-action': 'color-action-on-dark',
  'color-action-hover': 'color-action-hover-on-dark',
  'color-text-on-action': 'color-text-on-accent',
};

// Roles that must never appear on a dark surface: forms and status messages are light-only.
export const LIGHT_ONLY = ['color-error', 'color-success', 'color-text-placeholder', 'color-border-input', 'color-border-strong'];

// Roles with no contrast minimum (WCAG exempts pure decoration).
export const DECORATIVE = ['color-border', 'color-border-highlight'];

const LIGHT = ['color-background', 'color-surface', 'color-surface-subtle'];
const ALL_LIGHT = [...LIGHT, 'color-surface-highlight'];
const DARK = ['color-surface-dark'];

// Every pair the system allows: [foreground role, backgrounds, minimum ratio].
// 4.5 = body text, 3 = large text (24px+) and non-text (borders, focus rings).
// On a dark background the foreground is looked up through DARK_SURFACE.
export const PAIRS = [
  ['color-text', [...ALL_LIGHT, ...DARK], 4.5],
  ['color-text-muted', [...ALL_LIGHT, ...DARK], 4.5],
  ['color-text-placeholder', LIGHT, 4.5],
  ['color-text-emphasis', [...LIGHT, ...DARK], 3],
  ['color-error', LIGHT, 4.5],
  ['color-success', LIGHT, 4.5],
  ['color-border-input', LIGHT, 3],
  ['color-border-strong', LIGHT, 3],
  ['color-border-rule', [...ALL_LIGHT, ...DARK], 3],
  ['color-focus', [...ALL_LIGHT, ...DARK], 3],
  // Text on fills, on light and dark surfaces alike.
  ['color-text-on-action', ['color-action', 'color-action-hover'], 4.5],
  ['color-text-on-accent', ['color-accent', 'color-action-on-dark', 'color-action-hover-on-dark'], 4.5],
];

export const DARK_BACKGROUNDS = DARK;
