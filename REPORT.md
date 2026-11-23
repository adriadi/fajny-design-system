# B-050 · Navigation migration (step 4)

Branch `portfolio/navigation-sync`, one commit `8e74634` on top of `main` (`aa79108`). Pushed, not merged. 5 files, +46 / −180.

## Built as specified

- **Home nav:** `Nav` is the full `fds-nav` markup from the brief. The state, scroll listener and `scrollTo` are gone, the links have no `onClick`, and `className` is a literal. A `useEffect` calls `window.fdsNavigation.init(navRef.current)`; `window.fdsNavigation.init` exists, as the script's own comment says, and it works (the bar gets `fds-nav--ready`). The old `.mobile-nav` block and `.nav-overlay` div are deleted; the scrim is the script's own. `navigation.css` and `navigation.js` are linked in `index.html`.
- **Scroll offset:** `scroll-margin-top: 64px` on `#portfolio`, `#experience` and `#contact` (one rule at the end of `styles.css`).
- **Case-study bars:** all three pages use the `fds-nav--minimal` markup from the brief. `navigation.css` was not linked there, so I added it, plus `navigation.js` before `loader.js`. No manual `init()`.
- **CSS cleanup (about 124 lines removed):** `body.home nav`, `nav.scrolled`, `.nav-links` (all states), `.hamburger` (all states), `.mobile-nav` (all states), `.nav-overlay`, `body.cs nav`, `.nav-name`, `.nav-back` and `.nav-back::before`, their entries in the line-height group, the mobile breakpoint and the reduced-motion block. `body.cs a:not(.fds-button)` is left as is.

## One deviation from the brief's markup (please check)

The brief's CTA had `fds-nav__link` on it (`fds-button--primary fds-button--nav fds-nav__link`). I built it that way first and it broke the button: `.fds-nav .fds-nav__link` sets `padding: 0 0 space-1` and a transparent bottom border, which overrides the Button's padding, so "LET'S TALK" sat at the top of the pill with no side padding. I removed `fds-nav__link` from the CTA, which matches the component's own docs (`fds-button--primary fds-button--nav` only). Measured after: 32px high, `padding: 0 24px`. The Button's gold and navy are as in the component.

## Checks (in the browser)

- **Desktop, 1280px:** bar is `sticky`, 64px, solid; hero starts at y=64 (as accepted); no console errors. Screenshot `b050-1-home-desktop.png`. The hero looks intentional at that offset; nothing is broken.
- **Scroll:** after clicking "Experience", the section's top lands at y=64, directly under the bar; the address gains `#experience`; the bar is `fds-nav--scrolled` (the see-through fill).
- **Phone:** emulated at 390px. The bar collapses, the closed menu is `inert`, the button opens the drawer (`aria-expanded="true"`, scrim shown, links in a column, CTA full width), Escape closes it, and choosing a link closes it and scrolls to the section. Screenshot `b050-3-home-phone-open.png`.
- **500px (the smallest window I can set):** the bar is **not** collapsed: the gutter is narrower, so the links fit. `b050-2-home-phone-closed.png` shows that state. Collapse starts somewhere between 390 and 500px, so the earlier audit's 525px figure (measured with the desktop gutter) was too high.
- **Case studies:** all three bars are `fds-nav--minimal fds-nav--ready`, 64px, sticky. Scouting screenshots: solid `b050-4-case-study-bar.png`, scrolled `b050-5-case-study-bar-scrolled.png` (see-through, `oklch(0.96 0.012 75 / 0.92)`). Hawk and Curaay are gated: I unlocked with the sessionStorage flag only, checked the bar in the DOM, took no screenshots, and cleared the flag again.

## Not tested

Keyboard Tab trap inside the open drawer by actual key presses (I tested Escape and link choice); the 390 to 500px range where collapse starts; the narrow desktop windows between 500 and 900px beyond the 500px check; a real touch device; the home page over http (all tests were `file://`).

## Questions

1. The CTA markup deviation above: confirm the brief's `fds-nav__link` on the CTA was a slip, and the docs' markup is right.
2. The logo is 40px high in a 64px bar and looks small next to the 14px links on desktop? No change made; just noting it as the one thing I'd glance at.
