# Fajny design system

*"Fajny" is Polish for "cool".*

A small design system built so that AI agents (Claude Code and others) can build interfaces from it without guessing names, values or states.

**Status: work in progress.** Started 19 October 2026, first version planned for Thursday 12 November 2026.

## Core principle: accessibility first

Accessibility and WCAG AA compliance come first (decision 33).

- **Surfaces switch the text roles automatically**, as in Material 3. Put dark content inside `.fds-surface-dark` and every base role inside it (`--fds-color-text`, `-text-muted`, `-text-emphasis`, `-border`, `-border-rule`, `-focus`, `-action`) takes its dark-surface value. Components only ever use the base roles; the `-on-dark` tokens are values, never referenced directly.
- **Every allowed pair passes WCAG**: 4.5:1 for text, 3:1 for large text (24px+) and for borders and focus rings. `npm run build` checks every pair and fails if one drops below its minimum.
- **Text zooms to 200%** (WCAG 1.4.4). Every font size is `clamp()` in rem, from a 390px screen to a 1280px screen, and its max is at most 2.5× its min. `npm run build` fails otherwise.
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

## Colour roles

Components use the roles, never the palette. The roles fall into five groups:

| Group | Roles | What they're for |
| --- | --- | --- |
| Text | `text`, `text-muted`, `text-placeholder`, `text-emphasis`, `text-on-action`, `text-on-accent`, `text-on-secondary` | What text is set in: one main colour, a muted one for secondary text, and the colours for text on fills. |
| Surfaces | `background`, `surface`, `surface-subtle`, `surface-highlight`, `surface-dark` | What content sits on: the page, cards, alternate sections, the light Highlight and every dark area. |
| Lines and focus | `border`, `border-input`, `border-strong`, `border-rule`, `border-highlight`, `focus` | Dividers, input underlines, decorative rules and the keyboard focus ring. |
| Actions | `action`, `action-hover`, `secondary`, `secondary-hover`, `accent` | Button fills, their hover, and the gold accent fill. |
| Status | `error`, `success` | The only error and success colours, on light surfaces only. |

Each role is `--fds-color-<role>` in CSS and `color/<role>` in Figma.

## Typography

Components set text in ten roles, never in a typeface or a size of their own. Each role has its family, size, line height, weight and letter spacing in CSS, and one text style in Figma.

- **Specimen:** Real portfolio text in every role, on a 390px and a 1280px screen, on a light and a dark surface.

## Components

| Component | Stylesheet | Docs |
| --- | --- | --- |
| Button | `components/button.css` | [docs/button.md](docs/button.md), every state on light and dark in `docs/button-preview.html` |

Link `tokens/css/tokens.css` first, then the component's stylesheet. Components use only `--fds-*` tokens; `npm run build` fails if a component stylesheet contains a colour, a length or a duration of its own.

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

Text works the same way: every role has its family as `--fds-font-family-<role>`, next to its size, line-height, weight and letter-spacing. A component uses those, never `--fds-font-typeface-*`, just as it uses colour roles, never primitives or `-on-dark` tokens.

To change a token, edit `tokens/*.tokens.json`, then rebuild. The build runs the contrast, zoom, type and component checks first and writes `tokens.css` only if all four pass (`npm run check` runs them alone):

```sh
npm install
npm run build
```

## Figma

`tokens/figma/tokens-studio.json`, `tokens/figma/color-collection.js`, `tokens/figma/typography-collection.js`, `tokens/figma/foundations-pages.js`, `tokens/figma/button-component.js` and `docs/button-preview.html` are generated by `npm run build`: don't edit them, change `tokens/*.tokens.json` and rebuild.

The repo JSON stays the source of truth (decision 25). The Figma file is documentation, one page per topic, in groups (decision 58):

| Group | Pages |
| --- | --- |
| Basic | the token pages: Colors, Typography, Spacing, Corner radius, Shadows |
| Regular | Button and other simple components |
| Advanced | components that nest other components |

A separator page named `---` sits between two groups that have pages; Figma shows it as a divider. The scripts own the page order and the separators: every run puts the pages in this order, reuses the separators, adds a missing one and removes an extra empty one, so the separator before Advanced appears once an Advanced page exists. The groups and their pages are listed in `scripts/figma-doc-layout.js`; a new component page goes into the group the owner chooses.

Every section on a page has a title and a one-sentence subtitle, taken from the repo. A component page has the component set in one column, each variant labelled, and next to it "All components": every variant and state, light and dark. No frame clips its content, so shadows, focus rings and components always show in full. Each collection and each page has one writer:

| Writer | Writes |
| --- | --- |
| Tokens Studio, from `tokens-studio.json` | `primitives`, `spacing`, `radius`, `focus`, `border-width` and `opacity` collections and the `shadow` effect styles |
| Figma MCP, from `color-collection.js` | the `color` collection, with a `Light surface` and a `Dark surface` mode, and the Colors page |
| Figma MCP, from `typography-collection.js` | the `typography` collection, with a `Mobile` and a `Desktop` mode, the 10 text styles, and the Typography page |
| Figma MCP, from `foundations-pages.js` | the Spacing, Corner radius and Shadows pages |
| Figma MCP, from `button-component.js` | the Button component set and the Button page |

After any token change:

1. Run `npm run build`.
2. In Figma, import `tokens/figma/tokens-studio.json` with Tokens Studio (Tools → Load from file). The file has no `color` set, so Tokens Studio leaves that collection alone.
3. Run `tokens/figma/color-collection.js` on the Figma file with the Figma MCP `use_figma` tool, e.g. ask Claude Code to "run tokens/figma/color-collection.js with use_figma on the Figma file". It renames the first mode to `Light surface`, adds `Dark surface` if it's missing, and sets every role's aliases, scopes and description. It deletes collections with no variables, such as the empty `shadow` collection Tokens Studio creates (shadows are effect styles). Last, it rebuilds the Colors page: the roles in the groups of the "Colour roles" table above, on a light and a dark surface, then the palette. Running it again is safe.
4. Run `tokens/figma/typography-collection.js` the same way. It writes `font/size/<role>` with a `Mobile` value (the `clamp()` minimum, a 390px screen) and a `Desktop` value (the maximum, 1280px), and one text style per role with its size bound to that variable. Last, it rebuilds the Typography page: every role with what it's for and its values, then the specimen, with its subtitle from the "Specimen" line of the Typography section above. Running it again is safe.
5. Run `tokens/figma/foundations-pages.js` the same way. It rebuilds the Spacing, Corner radius and Shadows pages: every token with a sample bound to its variable or effect style, its name, value and what it's for.
6. Run `tokens/figma/button-component.js` the same way. It updates the Button component set in place, every fill, stroke, size, radius and opacity bound to a variable and the label text style, so a frame in "Dark surface" mode switches it. Variants are matched by name: existing ones keep their IDs (and every instance in a design keeps its link), missing ones are created, none are deleted. Then it rebuilds the Button page around the set: its purpose from `docs/button.md`, the set in one labelled column, and "All components", every variant and state, light and dark. Running it again is safe.

In `Dark surface`, the roles that `.fds-surface-dark` switches take their `-on-dark` value, and every other role keeps its light value. Forms and status roles say "Light surfaces only." in their Figma description. Colour roles are aliases of the primitives, so they stay linked in Figma. Motion stays in code (decision 43). Fluid spacing is left out: a Figma variable holds one value, not a `clamp()`.

`radius-round` exists in code only. In Figma, use `radius-pill` on an element with equal width and height.

Known limitation: shadow colours are hex values (navy-900 with its opacity), not linked to the navy-900 variable, because linking them may drop the opacity in Figma.

Text styles take their size from the `typography` mode of the frame they sit in: set a frame to `Mobile` or `Desktop`. Line height and letter spacing are percentages on the style (decision 47), so they follow the size in both modes. Known limitations of typography in Figma:

- Sizes exist at 390px and 1280px only; the fluid sizes in between are code only.
- Gold emphasis is upright: Figma has no Syne italic, and browsers slant Syne themselves.
- Font sizes are px at a 16px root; the browser's font size setting and the fallback fonts are code only.

## License

MIT
