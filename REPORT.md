# B-028 · Navigation audit

Audit only: no code changed, no commits besides this report.

## Where I looked

`portfolio-tokens`, branch `design-system/work-with-me` (the home page, `work-with-me.html`, the three case-study pages, `password.html`), read in the source and measured in a real browser at 1440px and 390px. Contrast is computed from the rendered colours, and for backgrounds from the screenshots' pixels.

**Limit:** the three case-study pages are behind the password page (the gate is a client-side flag), so I did **not** open them in the browser and have no screenshot of their nav. Their nav is described from the HTML and CSS only. If you want screenshots, tell me to open them with the gate set, or unlock a tab yourself.

## Summary

There are three distinct nav patterns and no shared component:

1. **The main nav** on the home page (React) and on `work-with-me.html` (static HTML plus its own script). The same CSS and the same look, but two separate implementations, with different accessibility.
2. **The mobile drawer** for the same two pages.
3. **The case-study bar**: a different, much smaller nav (brand name plus a back link).

The failure from the "before" test is real here: adding "Work with me" to the nav meant editing the markup in **four** places (the desktop links and the drawer links, on the home page and on `work-with-me.html`) and, on the home page, copying the same list twice inside JSX. Nothing marks the current page except what each page hand-writes.

## 1. Main nav (desktop, above 900px)

| | Home (`index.html`, React) | `work-with-me.html` |
| --- | --- | --- |
| Structure | `<nav>`: logo link (image `alt="Adrianna"`), a `.nav-links` block with 3 links and a CTA ("Let's talk", pill button), hamburger button (hidden) | same markup, written by hand |
| Layout | fixed, 64px high, `0 gutter` padding, logo left and links right, `space-10` between links | same (same stylesheet) |
| Background | **transparent over the hero** (hero glow and blobs behind it); after 40px of scroll the class `scrolled` adds `oklch(96% .012 75 / .92)` with `blur(12px)` and a 1px bottom line | same, toggled by `work-with-me.js` |
| Links | 13px / 500 / 0.04em / uppercase, `color-text-muted`; CTA: `color-action` pill, `space-3` `space-6` padding, 13px | same |
| Home links | "Case Studies", "Experience", "Let's talk" are `href="#"` with a click handler that scrolls to the section; "Work with me" is a real link | all four are real links (`index.html#portfolio` etc.) |

States (desktop):

| State | What happens | Screenshot |
| --- | --- | --- |
| Rest | muted text over the transparent bar | `b028-1-home-nav-rest.png` |
| Scrolled | translucent beige bar with a bottom line | `b028-2-home-nav-scrolled.png` |
| Hover | text changes to `color-text` (navy); no underline, no other change; the CTA darkens and lifts 1px | `b028-3-home-nav-hover.png` |
| Focus (keyboard) | the system ring: 2px navy, 3px offset, on the link | `b028-4-home-nav-focus.png` |
| Current page | `aria-current="page"` on the link, and the colour turns navy (`work-with-me.html` only) | `b028-5-wwm-nav-current.png` |
| Visited | not styled: no difference | — |

## 2. Mobile drawer (900px and below)

- Trigger: a 40×40px hamburger button (three 22×1.5px lines that turn into an X). The logo stays; the links disappear.
- Opens: a panel that drops from under the bar (`top: 64px`), fades and slides in (`duration-base`), `oklch(97% .012 75 / .98)` background, links 14px / 500 uppercase with a 1px rule between them, and the CTA as a full-width pill. A grey scrim (`oklch(0% 0 0 / .18)`) covers the page behind it, and **also the translucent bar**, which turns grey.
- Closes: by the hamburger, by tapping the scrim, by choosing a link, and **by any scroll** (the scroll handler closes it).
- Screenshots: `b028-8-home-mobile-closed.png`, `b028-9-home-mobile-open.png`, `b028-6-wwm-mobile-closed.png`, `b028-7-wwm-mobile-open.png`.

## 3. Case-study bar

Used by all three case studies (`body.cs`):

- `<nav>` with a **non-link** brand name ("Adrianna Dziadyk", 14px, uppercase) and one link, "All work" (→ `../index.html`), with a `←` added by CSS.
- Sticky at the top (not fixed), a **solid** `color-background` fill with a 1px `color-border` line, `space-4` / gutter padding. No transparent state, no scroll effect, no hamburger, no drawer.
- A 2px reading-progress bar (`#progress-bar`) is fixed above it; it's a plain `div` with an inline width set by script, with no role.
- Hover: "All work" goes from muted to `color-text`, no underline (the page's general link underline on hover is switched off for it).
- Differences from the main nav: no logo link, no "Case Studies / Experience / Work with me / Let's talk", so from a case study you can only go back to the home page; and no way to reach "Work with me" or the contact form from there.
- The password page has its own back link ("← Back to home") and a logo link, and no nav bar.

## 4. In-page navigation

- Home links to its own sections by scrolling (`scrollTo`, with `auto` behaviour under reduced motion); `work-with-me.html` links to `index.html#portfolio` etc., and the home page has a hash-scroll effect added for that.
- Case studies: a reading-progress bar, and a "Next case study" card at the bottom (a link).
- Not present: a skip link, a table of contents, a back-to-top control, breadcrumbs. The hero's "Scroll to explore" is plain text.

## 5. Contrast and accessibility, as found

Contrast (WCAG AA 4.5:1 for these 13–14px labels):

| Element | Colours | Ratio |
| --- | --- | --- |
| Link at rest over the hero (transparent bar) | `color-text-muted` on the hero glow behind the bar | **4.83:1 to 5.12:1**, measured in one frame; the blobs drift, so it moves (the plain beige gives 5.25:1) |
| Link on the scrolled bar | muted on the translucent beige | 5.21 to 5.25:1 |
| Link on hover | navy on the same backgrounds | 9.2 to 10.0:1 |
| Drawer link at rest / current | muted / navy on the drawer fill | 5.32:1 / 10.13:1 |
| CTA label | `color-text-on-action` on `color-action` | 10.01:1 |
| Hamburger lines | navy on the beige | 10.01:1 |
| Case-study back link | muted on `color-background` | 5.25:1 (hover 10.01:1) |

Accessibility findings:

1. **Current page is shown by colour only.** Navy against the muted grey is **1.91:1**, under the 3:1 that WCAG 1.4.1 asks for between two colours that carry a meaning; there's no underline, weight or marker. `aria-current` is right for a screen reader, but only `work-with-me.html` has it; the **home page marks nothing** and its section links have no current state.
2. **The closed drawer is still keyboard-reachable.** It's moved off-screen and made transparent, not hidden: `visibility` stays `visible`, no `inert`, no `aria-hidden`, so all four links stay in the tab order while invisible (tested: 4 focusable links with the drawer closed, on both pages). It is hidden properly only under `prefers-reduced-motion`.
3. **The menu button's state differs by page.** `work-with-me.html`: `aria-expanded`, `aria-controls` and a changing label ("Open menu" / "Close menu"). **The home page: only the label**: no `aria-expanded`, no `aria-controls`, and the drawer has no `id`.
4. **Esc doesn't close the menu**, and **focus isn't trapped or returned**: tested on `work-with-me.html`, Escape left it open. Tab goes from the button into the links in order, and past the last link it continues into the page behind the scrim; after a link is chosen, focus stays on a link that has just faded out.
5. **Any scroll closes the drawer**, including a small scroll on a phone while reading it.
6. **Landmarks and names:** the `<nav>` has no `aria-label`, and the mobile links are in a `div` **outside** the `<nav>`, so a screen reader doesn't list them as navigation. The logo link is named "Adrianna" and says nothing about "home".
7. **Home section links are `href="#"`** with a script that scrolls: they can't be opened in a new tab or shared, and a screen reader hears a link to "#".
8. **Touch target:** the hamburger is 40×40px (passes the 24px minimum; below the usual 44px).
9. **Focus is visible** everywhere I tested (the system ring), including the hamburger.
10. The scrim over a translucent bar turns the bar grey while the drawer is open (see screenshot 7); the navy lines still pass (6.61:1).
11. The case-study back link's arrow comes from CSS `content`, which some screen readers read out.

## 6. Off-grid spacing in the nav

- **Before the migration (original `portfolio`):** `gap: 36px` between links, `gap: 5px` between the hamburger lines, the CTA's `padding: 9px 22px`, the mobile CTA's `padding: 14px`.
- **Now (tokens):** those map to `space-10`, `space-2`, `space-3` / `space-6` and `space-4`. What's left as a literal: the bar's `64px` height and the drawer's matching `top: 64px`, the 40px logo, the 40px hamburger and its 22px line width, the `9.5px` X translation (the line gap plus half a line), and the case-study bar's `1px` border (the system's one border is 1.5px). The 13px and 14px link sizes have no type role (`label` is 13 to 14px, weight 500, 0.06em, but the links use 0.04em and 0.05em).

## Questions

1. Should I take the case-study screenshots (and check their nav in the browser) by opening them with the gate set, or will you unlock a tab yourself?
2. Is "one nav for every page, including the case studies" the intent, or should the case-study bar stay a minimal back bar? That decides whether Navigation is one component or two.
3. For the current page, which indicator should it be (an underline, the filled-weight text, a marker)? Colour alone doesn't pass.
