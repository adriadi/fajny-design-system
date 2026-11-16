# B-029 · Report

Navigation is built on `components/navigation` (commit `782b97f`, pushed). Not merged to `main`. `npm run build`: exit 0, including the new `navigation-component.js`.

## Names I picked

- **Root class `fds-nav`**, like `fds-card` and `fds-tag`. Parts: `fds-nav__brand`, `__toggle`, `__bars`, `__menu`, `__list`, `__link`, `__back`, `__backdrop`. Variant: `fds-nav--minimal`. The script sets `fds-nav--ready`, `--collapsed` and `--open`.
- **The links and the call to action are Buttons**: `fds-button fds-button--link fds-nav__link` and `fds-button fds-button--primary fds-button--nav`, so `button.css` is a dependency (the way `image.css` is for the Card) and the Figma Navigation nests the Button. Navigation sits in the **Advanced** Figma group after Card.
- **New file `components/navigation.js`**, the first script in the system (plain JS, no framework): the behaviour that CSS can't do (`inert`, Escape, focus return and trap, smooth scroll).
- **One markup for the bar and the drawer**: the same `<ul>` is the desktop links and the mobile drawer, so a new link is written once (the "before" failure was four places).

## The current-page marker

`border-bottom: 1.5px solid color-accent`, with `aria-current="page"`; the link's text also turns `color-text`. **Rendered contrast** (the gold `#E8B84B`):

| Against | Ratio |
| --- | --- |
| `color-background` (the bar) | **1.64:1** |
| `color-surface` | 1.84:1 |
| `color-surface-dark` (the bar on a dark surface) | **6.11:1** |
| Current link text (navy) against the muted links | 1.91:1 |

So **on a light surface the underline alone is under the 3:1 that WCAG 1.4.11 asks of a graphic that shows a state**, and the colour change of the text is under it too; on a dark surface it passes. The marker is still a non-colour cue (a line), so it answers B-028's colour-only finding, and `aria-current` covers screen readers, but I'm flagging the number rather than hiding it. Decision 72 chose the gold underline on purpose, so I built it as written; it's one rule (`.fds-nav .fds-nav__link[aria-current="page"]`) if you want another. The docs state these numbers.

**Which "current":** page only. A section link (`href="#id"`) never gets `aria-current` (no scroll-spy, so nothing announces while you read), and the home page's section links have no current state.

## The 7 fixes

1. **Closed drawer reachable by keyboard: fixed.** Closed, the drawer is `visibility: hidden` (so out of the tab order and the accessibility tree) and the script also sets `inert`. Tested in the browser: with the drawer closed, none of its links can take focus.
2. **`aria-expanded` and `aria-controls`: fixed**, on the menu button in the markup the component prescribes, so every page gets them. The button's name is a constant "Menu"; `aria-expanded` carries the state (the old "Open menu" / "Close menu" swap is gone).
3. **Escape closes, focus returns to the button: fixed and tested.** Escape, a click outside the drawer (an invisible layer, `fds-nav__backdrop`) and choosing a link each close it with focus back on the menu button (checked all three).
4. **Focus trap: fixed and tested.** While open, Tab from the last item (the call to action) goes to the brand, Shift+Tab from the brand goes to the last item; focus never reaches the page behind.
5. **`aria-label` and links inside the landmark: fixed.** `<nav class="fds-nav" aria-label="Main">`, and the links are in `.fds-nav__menu` inside it (no sibling `div`).
6. **Section links: fixed.** `href="#id"` real links; the script adds a smooth scroll (a plain jump under `prefers-reduced-motion: reduce`) and updates the address, and the page gives the sections a `scroll-margin-top` (documented, since the bar is sticky).
7. **Back-link arrow: fixed.** `<span aria-hidden="true">←</span>` in the markup, no CSS `content`.

Left alone as asked: focus visibility (the system ring, on the brand, button and links), the 40px menu button, and contrast at rest and hover (links 5.25:1 on `color-background`, 10.01:1 on hover; 6.25:1 and 10.01:1 on a dark surface).

Also: **scrolling no longer closes the drawer** (B-028 noted it; it wasn't in the list, but closing on any scroll made it unusable on a phone).

## Checked against the real case studies (locally, gate set; nothing from them is in the repo)

I opened all three with the gate set and compared the real bar with the Minimal variant. The three bars are identical to each other. Differences between the real bar and the component (the component is the new rule; these are what the portfolio would change when it adopts it):

| | Real bar | Minimal variant |
| --- | --- | --- |
| Height | 56.8px (16px padding) | 64px (`space-16`, like the main nav) |
| Bottom line | 1px | `border-width.default` 1.5px |
| Brand | 14px, 0.04em, not a link | `label` role: 13 to 14px, 0.06em; a `<span>` in the minimal bar (a link in the full one) |
| Back link | 13px, weight 400, **sentence case, navy**, no hover change | `label` role, 500, **uppercase, muted** (navy on hover), arrow as a `<span>` |
| Position | sticky, `top: 0`, z-index 100, solid `color-background` | same |
| Reading-progress bar | a fixed 2px bar above it | not part of the component |

The screenshot of the real bar is only on this machine (`~/fajny-screenshots/b029-curaay-case-study-bar-LOCAL-ONLY.png`), not in the repo. The password was never written anywhere (I set the unlock flag in the tab, as the brief says).

## Docs, preview, Figma

- `docs/navigation.md`; `docs/navigation-preview.html`: the full bar (current underline), the same on a dark surface, the collapsed bar (a working one to try with the keyboard, and the open drawer), and the minimal bar. README updated.
- Figma: the Navigation page (Advanced group): Type (Full, Minimal) × Layout (Wide 1200px, Collapsed 390px) × Menu (Closed, Open): 4 variants, a Brand text property, the call to action an instance of Button (Primary, Navigation). Variants on the page background and a dark surface. `navigation-component.js` was run on the file (4 created). **Known difference:** in the Figma drawer the call to action hugs its text, while in code it is full width.

## Choices I made that you may want to change

1. **The collapse comes from measuring the bar** (the script), not a breakpoint, because a media query can't use a token and `check-components` fails on a literal length; so there is no 900px in the component. Cost: it needs the script; without it, the links wrap.
2. **Tokens only, so two things from the portfolio are gone:** the translucent "scrolled" bar (a see-through fill and a blur have no token, so the bar is solid) and the dimming scrim behind the open drawer (there's no scrim token: the layer is invisible, and the drawer has `shadow-md`). The portfolio's transparent-over-the-hero bar isn't covered either.
3. The call to action in the drawer is full width; the links are 48px to hit with the underline close to the text.

## Screenshots (this branch; nothing from a gated page)

| What | File |
| --- | --- |
| The component's preview: full with the current underline, dark surface, collapsed with the drawer closed and open, minimal | `b029-1-navigation-preview.png` |
| The Figma Navigation page | `b029-2-figma-navigation-page.png` |

The home page doesn't use the component yet (the portfolio's second sync), so there's no "home nav" screenshot; the preview is the default nav.

## Questions

1. **The current-page marker:** keep the gold underline as decided (it fails 3:1 on a light surface), or pair it with something that passes (for example `color-border-rule`, navy, 10.01:1, for the underline)? Gold stays on dark surfaces either way.
2. **The case-study bar:** adopt the component's 64px, uppercase muted back link, or keep the real bar's smaller, sentence-case look as the Minimal variant?
3. **The scrim and the translucent scrolled bar:** worth a token each (a "scrim" opacity, a see-through fill), or let the portfolio lose them?
