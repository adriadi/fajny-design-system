# Fajny design system

*"Fajny" is Polish for "cool".*

A small design system built so that AI agents (Claude Code and others) can build interfaces from it without guessing names, values or states.

**Status: work in progress.** Started 19 October 2026, first version planned for 5 November 2026.

## Core principle: accessibility first

Accessibility and WCAG AA compliance come first (decision 33).

- **Surfaces switch the text roles automatically**, as in Material 3. Put dark content inside `.fds-surface-dark` and every base role inside it (`--fds-color-text`, `-text-muted`, `-text-emphasis`, `-border`, `-border-rule`, `-focus`, `-action`) takes its dark-surface value. Components only ever use the base roles; the `-on-dark` tokens are values, never referenced directly.
- **Every allowed pair passes WCAG**: 4.5:1 for text, 3:1 for large text (24px+) and for borders and focus rings. `npm run build` checks every pair and fails if one drops below its minimum.
- **Forms and status messages appear on light surfaces only.** `--fds-color-error`, `-success`, `-text-placeholder`, `-border-input` and `-border-strong` have no dark-surface value, and the build fails if one is given one.

## Why

I gave an AI agent the same task twice in my portfolio's codebase, without a system. Both times it built a working page in about three minutes. Both times it invented a new error colour, copied the one square button on a site of pill-shaped buttons, and glued two different cards into a hybrid. The page looked fine. The code underneath didn't: between 2.5 and 6 hard-coded values for every design variable it used.

Fixing the result fixed the look, not the code. This system is the experiment to change that.

## What's here

| Folder | What goes in it |
| --- | --- |
| `tokens/` | Design tokens (W3C format) and the CSS variables built from them |
| `components/` | Button, Input, Card, Tag, Navigation, Highlight |
| `docs/` | One page per component: when to use it, when not, states, do and don't |

The full reasoning behind every choice is in [DECISIONS.md](DECISIONS.md).

## Use the tokens

Link the built CSS, then use the semantic variables:

```html
<link rel="stylesheet" href="tokens/css/tokens.css" />
```

```css
.note { color: var(--fds-color-text-muted); border-radius: var(--fds-radius-md); }
```

The same class works on a dark surface without changes:

```html
<footer class="fds-surface-dark"><p class="note">Muted text, light on navy</p></footer>
```

To change a token, edit `tokens/*.tokens.json`, then rebuild. The build also runs the contrast check (`npm run check` runs it alone):

```sh
npm install
npm run build
```

## License

MIT
