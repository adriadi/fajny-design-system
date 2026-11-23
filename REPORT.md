# B-049 · Navigation audit (step 4)

Audit only. No code changed in either repo. I read `components/navigation.css`, `navigation.js` and `docs/navigation.md`, the home `Nav` and the case-study bars, and measured the component in a scratch page (outside both repos) with the home page's real links and logo.

## 1. The two bars: confirmed, with corrections

**Home (`Nav` in `index.html`): confirmed**, plus these things you didn't list:

- **Position and fill.** Today the bar is `position: fixed` and fully transparent at the top, so the hero starts at y=0 behind it (measured: hero top 0, bar 64px, `background: rgba(0,0,0,0)`). `fds-nav` is `position: sticky` with a solid `color-background` fill and a bottom border. After migration the bar takes 64px in the flow, so the hero starts at 64px and the first screen overflows by 64px (the hero is `min-height: 100vh`). The solid bar also covers the fixed hero blobs at the top. This is a visual change, not a rename.
- **The mobile drawer is a separate element.** `.mobile-nav` repeats the three links outside the `<nav>`, plus a `nav-overlay` div. The component wants the links written once.
- **Today's closed drawer is keyboard-reachable.** At 500px wide, its links are `visibility: visible`, not `inert`, and take focus while the drawer is closed. Only the reduced-motion rule hides it. The hamburger has no `aria-expanded` or `aria-controls`, and the `<nav>` has no `aria-label`. The component fixes all of this (hidden and `inert` while closed, `aria-expanded`, focus trap, Escape).
- **Today the bar closes on scroll** (`if (menuOpen) setMenuOpen(false)` in the scroll listener). The component says "scrolling doesn't close the drawer". The first behaviour change.
- **Links are `href="#"` with click handlers.** The component's rule is real `href="#id"` links with the script's smooth scroll; the address bar then gains `#portfolio` etc. (today it never changes).
- **Scroll offset.** Today the handler scrolls to `offsetTop + 16`. The component uses `scrollIntoView` with the section's `scroll-margin-top`, which the docs say should be as tall as the bar (64px). The sections have no `scroll-margin-top` today. 64px puts the section's top just under the bar; matching today would need 0 and a bar overlaying the section's padding.
- **Sizes.** Link font 13px/16px high today, 14px at 1280px in the component (label role). The CTA is 39.5px high today (13px font) and 32px in the component. Today the CTA has a hover lift (`translateY(-1px)`); the Button doesn't.
- **Copy.** The component says labels are written in sentence case (the role uppercases them). Today's source has "Case Studies"; it would become "Case studies".
- **Logo `alt`** is "Adrianna" today. The docs want an alt that says where the link goes ("Adrianna, home").

**Case-study bars: confirmed, with corrections:**

- Three pages, identical markup: `<nav><span class="nav-name">…</span><a class="nav-back">All work</a></nav>`. The bar is already sticky with a solid `color-background` fill and a border, so the only look changes are: padding 16px becomes `min-height: 64px`, brand 14px becomes the label role, link 13px becomes label, and the arrow becomes a real `<span aria-hidden>` instead of `::before` content.
- Page rules that would override the component and have to go: `body.cs nav` (specificity 0,1,2 beats `.fds-nav`), `.nav-name`, `.nav-back`, `.nav-back::before`, and the `body.cs a:not(.fds-button)` link rule (already scoped for buttons, so the back link, which will be a Button, is safe).
- A scroll script now runs on these pages (see 2), so the bar gets the see-through blurred state after 40px; today it stays solid.

## 2. `fds-nav--minimal` markup: answered

The brand span and the back link are the **only** children. The toggle and menu wrapper **can be left out.** Evidence:

- `docs/navigation.md` gives this exact markup for the minimal bar: `<nav class="fds-nav fds-nav--minimal" aria-label="Case study"><span class="fds-nav__brand">…</span><a class="fds-button fds-button--link fds-nav__link fds-nav__back" href="…"><span aria-hidden="true">←</span> All work</a></nav>`.
- `navigation.js` handles a missing toggle and menu: `measure()` returns early, the drawer and backdrop are only created `if (toggle && menu)`, and `sync()` guards each use. A comment says it. I confirmed in the scratch page: the minimal bar gets `fds-nav--ready`, is 64px high and has no backdrop.
- What still runs on it: the 40px scrolled class and the smooth scroll for `#` links (none on these pages). `navigation.js` is needed on the case-study pages only for the scrolled look.
- `fds-nav__back` has **no CSS rule**; it is a hook class only. The arrow's gap comes from the Button's own spacing (I haven't checked it by eye on the real pages).

## 3. Collapse behaviour with the real links (measured)

Scratch page: logo (40px), "Case studies", "Experience", "Let's talk", with the bar width set directly:

- Full at 700px and wider. **Collapses below ~525px** (525 collapsed, 526 not). Collapsed at 520, 480, 440, 390, 360 and 320.
- Today it collapses at **900px**. Between 525 and 900px the bar will now show all links instead of the hamburger. That fits, so I think it's an improvement, but it's a change on tablets and narrow windows.
- It is not a breakpoint: the threshold depends on the link text and the logo width (the logo is 130×153 scaled to 40px high). Translated or longer labels move it.
- At 390px, open: the drawer sits at y=63 under the bar with the three links in a column (24px, 24px and 32px high; the collapsed state adds a 48px hit area through `::after`), `aria-expanded="true"`, the scrim is shown, and the closed drawer is `inert`.
- In the bar (not collapsed), link targets are 24px high: enough for WCAG 2.5.8 but not the 48px the drawer gets.

## 4. Scroll-spy and `aria-current`: the migration forces no choice

The component already decides this: "a link to a section of the page (`href="#id"`) is never 'current': the underline marks the page, not the scroll position" (`docs/navigation.md`, "The current page", and the Do/Don't list). So on the home page no link gets `aria-current`, and nothing in the component needs real page navigation. Case studies: "All work" leads to another page, so it is not current either. Nothing to build for scroll-spy.

## 5. Other differences

- **Script timing.** `navigation.js` finds `.fds-nav` on `DOMContentLoaded`. The home nav is rendered by React through in-browser Babel, after that, so the script won't see it. The nav needs `fdsNavigation.init(element)` from a ref or effect after mount. Also, the script sets classes on the element (`fds-nav--ready`, `--collapsed`, `--scrolled`) and moves `inert`; the React `className` has to stay a constant string, or React will wipe them on re-render. The `scrolled` state and its scroll listener go away.
- **The scrim** is created by the script at the end of `<body>`. The page's `.nav-overlay` and its React state go away.
- **Cursor.** The page has a custom cursor with a hover list (`'a, button, .fds-card, .social-link'`); the new links are `a` and the toggle is a `button`, so they're covered.
- **Reduced motion** is handled by the component.
- **Stale CSS to delete after migration:** `nav.scrolled`, `body.home nav`, `.nav-links`, `.hamburger`, `.mobile-nav`, `.nav-overlay` and their mobile and reduced-motion lines (about 100 lines).
- **Linked files:** `navigation.css` and `navigation.js` already exist in `fds/` (copied by the sync script); only the `<link>` and `<script>` tags are missing on the pages.

## Open questions for the owner

1. **Home bar over the hero.** Keep the component as designed (solid, sticky, in the flow; the hero starts 64px lower and the first screen is 64px taller than the window), or keep today's bar floating, transparent and fixed over the hero until it's scrolled? The second needs a new variant or a page override; I haven't designed one.
2. **Collapse point.** OK that tablets between 525 and 900px now show the full link bar instead of the hamburger?
3. **Scroll position.** Add `scroll-margin-top: 64px` on `#portfolio`, `#experience` and `#contact` (the section starts under the bar), or 0 (today's look, the bar overlays the section's top padding)?
4. **Drawer and scroll.** Accept that the open drawer no longer closes on scroll (the component's rule)?
5. **Address bar.** Accept that clicking a nav link now writes `#portfolio` etc. into the URL (real links, shareable)?
6. **Labels and CTA.** OK with "Case studies" in sentence case, a 32px CTA instead of 39.5px, 14px link text, and no lift on hover?
7. **Logo alt.** "Adrianna, home" per the docs?
8. **Case-study pages.** OK that they load `navigation.js` just for the see-through state on scroll (today the bar stays solid)? The alternative is no script and a solid bar.
