# B-030 · Report

Both fixes are on `components/navigation` (commit below, pushed; main merged into the branch first, to pick up decision 73). Not merged to `main`. `npm run build`: exit 0.

## Task 1: the marker uses `color-border-rule` (decision 73)

The current link's underline (1.5px) and its text now take `color-border-rule`. No new token, and `scripts/surfaces.js`'s `DARK_SURFACE` map is unchanged. Rendered in the browser (computed colours):

| Surface | Text | Underline | Contrast against the bar |
| --- | --- | --- | --- |
| Light (`color-background` bar) | `rgb(27, 58, 107)` | `rgb(27, 58, 107)` | **10.01:1** (11.27:1 on `color-surface`, 9.24:1 on `color-surface-subtle`) |
| Dark (`.fds-surface-dark` bar, `color-surface-dark`) | `rgb(232, 184, 75)` | `rgb(232, 184, 75)` | **6.11:1** |

Both pass 3:1 for the underline and 4.5:1 for the text. Because the role now also colours text, I raised the build's pair for `color-border-rule` from 3 to 4.5 in `scripts/surfaces.js` (it still passes everywhere: 47 pairs). The docs, the preview and the Figma Navigation page are updated (the underline and the current link are navy on light and gold on dark; the Figma script was re-run, 4 variants updated).

## Task 2: the scrim and the translucent scrolled bar are back

Plain literals, as decision 54 says, each on a line carrying the comment `Decoration, not a token`:

| What | Literal | Where |
| --- | --- | --- |
| The bar's fill once scrolled | `background-color: oklch(96% 0.012 75 / 0.92)` | `.fds-nav--scrolled:not(.fds-surface-dark)` |
| The blur behind it | `backdrop-filter: blur(12px)` | same rule |
| The drawer's scrim | `background-color: oklch(0% 0 0 / 0.18)` | `.fds-nav__backdrop` (fixed, full screen, z-index 99, under the bar at 100) |

These are the portfolio's own values. Tested in the browser: after 40px of scroll the script adds `fds-nav--scrolled` and the computed fill is `oklch(0.96 0.012 75 / 0.92)` with `blur(12px)`; back at the top it's removed; opening the drawer shows the scrim over the whole screen (it's the screenshot below) and a click on it closes the drawer.

Three things I had to decide, please check:

1. **`scripts/check-components.js` changed.** It failed on any colour function or length, so these lines couldn't exist. It now lets a literal stand only on a line that carries the marker "Decoration, not a token", and prints how many marked lines there are (3). Every other literal still fails the build; the contrast check is untouched. I made this change because decision 54 asked for the literals and the check had no way to allow them.
2. **The translucent bar is for light surfaces only** (`:not(.fds-surface-dark)`): the portfolio's fill is light beige, which would put light text on a light bar. A dark navigation stays solid. A see-through dark fill would be a new literal, so I left it out.
3. **The scrim is a child of `<body>`, not of the bar**, put there by the script. A bar with `backdrop-filter` becomes the containing block of its fixed children, so a scrim inside it would cover only the bar. Under the bar (z-index 99 against 100), as in the portfolio, so the translucent bar stays above it.

The drawer itself stays solid (the portfolio's drawer was 98% see-through with its own blur; nested blurs don't work in Chrome and the difference is 2%).

## README: "Allowed decoration"

The design-system README had no such section (decision 54's list is about the portfolio's own README), so I added it under the components table:

> A component may hold a literal value only for see-through decoration that never carries meaning, which has no token (decision 54). Each such line carries the comment "Decoration, not a token", and `npm run build` fails on any other literal, so this list is the whole list.

| Where | Literal | What it is |
| --- | --- | --- |
| `components/navigation.css`, `.fds-nav--scrolled` | `background-color: oklch(96% 0.012 75 / 0.92)` | The bar's see-through fill once the page has scrolled, on a light surface |
| `components/navigation.css`, `.fds-nav--scrolled` | `backdrop-filter: blur(12px)` | The blur behind that bar |
| `components/navigation.css`, `.fds-nav__backdrop` | `background-color: oklch(0% 0 0 / 0.18)` | The scrim over the page while the drawer is open |

Not touched: the Minimal variant's dimensions and type (Q2 stays open). The Figma page doesn't draw the scrolled fill or the scrim (they're see-through decoration, shown in the preview).

## Screenshots (this branch)

| What | File |
| --- | --- |
| The preview: the marker navy on light and gold on dark, a Scrolled example, the drawer open and closed | `b030-1-navigation-preview.png` |
| The drawer open with the scrim over the page (the other bars in the preview sit above it, since each has its own z-index; on a real page there is one bar) | `b030-2-drawer-open-with-scrim.png` |
| The Figma Navigation page | `b030-3-figma-navigation-page.png` |

## Questions

None.
