# B-050 · Navigation migration, step 4 (last step of the second portfolio sync)

Decision 92, all 8 points from B-049's audit. Own branch - `portfolio/navigation-sync`, based on current `main` (step 3 is merged, nothing to carry forward). Two parts: the home nav, and the three case-study bars.

## 1. Home nav (`index.html`, the `Nav` component)

Replace the whole thing with the full `fds-nav` markup:

```jsx
function Nav() {
  const navRef = useRef(null);
  useEffect(() => {
    if (navRef.current) window.fdsNavigation.init(navRef.current);
  }, []);

  return (
    <nav className="fds-nav" aria-label="Main" ref={navRef}>
      <a className="fds-nav__brand" href="index.html">
        <img src="images/logo.png" alt="Adrianna, home" style={{ height: 40, width: 'auto' }} />
      </a>
      <button className="fds-nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
        <span className="fds-nav__bars" aria-hidden="true"></span>
      </button>
      <div className="fds-nav__menu" id="nav-menu">
        <ul className="fds-nav__list">
          <li><a className="fds-button fds-button--link fds-nav__link" href="#portfolio">Case studies</a></li>
          <li><a className="fds-button fds-button--link fds-nav__link" href="#experience">Experience</a></li>
          <li><a className="fds-button fds-button--primary fds-button--nav fds-nav__link" href="#contact">Let's talk</a></li>
        </ul>
      </div>
    </nav>);
}
```

Notes:

- All the old state and logic go away: `scrolled`, `menuOpen`, the scroll listener, `scrollTo`. The script owns scroll state, collapse, the drawer, Escape, outside-click and closing on link choice - don't re-implement any of it. Don't add an `onClick` to the links; plain anchors are enough.
- `className="fds-nav"` must stay a literal string, never built from state - the script manages `fds-nav--ready`/`--collapsed`/`--open`/`--scrolled` on the element itself, and a React re-render that overwrites `className` from a dynamic value would wipe them.
- `navigation.js` auto-inits everything present at `DOMContentLoaded`, but this nav is rendered by React (in-browser Babel) after that fires - hence the manual `window.fdsNavigation.init(navRef.current)` in an effect. Confirm the script actually exposes `window.fdsNavigation.init` (that's what its own comment says); if it's scoped differently, find the right call.
- Delete the old `.mobile-nav` block and `.nav-overlay` div entirely - the three links don't get written twice, and the scrim is the script's own (created at the end of `<body>`).
- Add `<link rel="stylesheet" href="fds/navigation.css">` and `<script src="fds/navigation.js"></script>` to `index.html` (the files already exist in `fds/`, only the tags are missing).

CSS cleanup in `styles.css` - delete: `nav.scrolled` and any other `body.home nav`-scoped rule, `.nav-links`, `.hamburger` (all its states), `.mobile-nav` (all its states), `.nav-overlay`, and their mobile-breakpoint and reduced-motion lines. Should be close to the ~100 lines the audit counted.

Scroll offset: add `scroll-margin-top: 64px` to `#portfolio`, `#experience` and `#contact` (so the sticky bar never covers the section heading when a nav link is clicked).

Expect and accept (already decided, not yours to re-litigate): the hero now starts 64px lower since the bar takes real space; "Case studies" in sentence case; the CTA at the Button's own 32px height, no hover lift; link text at 14px. Check the hero still looks intentional at that offset - if something looks genuinely broken (not just "64px shorter"), flag it in the report rather than silently adjusting hero spacing yourself.

## 2. Case-study bars (`usecases/curaay-case-study.html`, `hawk-case-study.html`, `scouting-notes-case-study.html`)

Same change in all three. Replace:

```html
<nav>
  <span class="nav-name">Adrianna Dziadyk</span>
  <a href="../index.html" class="nav-back">All work</a>
</nav>
```

with:

```html
<nav class="fds-nav fds-nav--minimal" aria-label="Case study">
  <span class="fds-nav__brand">Adrianna Dziadyk</span>
  <a class="fds-button fds-button--link fds-nav__link fds-nav__back" href="../index.html">
    <span aria-hidden="true">←</span> All work
  </a>
</nav>
```

(this is the exact markup from `docs/navigation.md` you found - no toggle, no menu wrapper, both are optional and `navigation.js` handles their absence.)

These pages are static HTML, not React, so the script's own `DOMContentLoaded` auto-init is enough - no manual `init()` call needed here. Add `<script src="../fds/navigation.js"></script>` on all three pages (check `../fds/navigation.css` is already linked from the step-3 work; if not, add it too).

CSS cleanup in `styles.css` - delete `body.cs nav`, `.nav-name`, `.nav-back`, `.nav-back::before`. Leave `body.cs a:not(.fds-button)` as is (already confirmed safe).

## Report

`REPORT.md` with ID `B-050`: confirm both parts built as specified, confirm the CSS cleanup, and screenshots - home nav at desktop width and collapsed/open on a phone width, plus one case-study page's bar (solid, then scrolled). Flag anything that looks broken rather than adjusting it yourself.
