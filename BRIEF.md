# B-049 · Navigation audit (second portfolio sync, step 4 - audit only, no building)

Last step of the second portfolio sync. Audit only, like B-035 was for the whole sync - find what changes, flag open questions, don't touch any code yet.

## What I've already found, reading both repos (confirm or correct these)

There are two separate navigation bars in the portfolio, not one:

**1. Home page (`index.html`, the `Nav` component).** Full menu: logo image, 2 scroll-spy links ("Case Studies", "Experience"), a "Let's talk" CTA, a hamburger for mobile. Compared to `fds-nav`:
- It has its own scroll-state logic (`useState` + a scroll listener setting `scrolled`) - `navigation.js` already does this generically via `fds-nav--scrolled` after 40px. Redundant once migrated.
- Mobile menu collapses at a fixed CSS breakpoint (`900px`, `.nav-links{display:none}` / `.hamburger{display:flex}`). `fds-nav`'s script collapses by *measuring* the bar (`scrollWidth > clientWidth`), not a breakpoint - a different mechanism, not just a rename. Confirm it behaves sanely with this nav's actual link count/lengths at the sizes that matter (narrow desktop windows included, not just phone widths).
- The "Let's talk" CTA is a plain `<a class="nav-cta">`; the component's contract wants it as `fds-button--primary fds-button--nav` inside the link list.
- The logo is an `<img>`, not text - `fds-nav__brand` in the example is a text link. Confirm an image works there (should just be a child of the same anchor) and what happens to it in the collapsed/mobile drawer state.
- No `aria-current="page"` anywhere today - this is a same-page scroll-spy nav, not separate pages, so it's not obvious `aria-current` even applies here. Flag whether anything in the component assumes real page navigation rather than in-page anchors, and how scroll-spy (marking the link for the section currently in view, if that's wanted - today's nav doesn't do this at all) would or wouldn't fit the component as designed. Don't build scroll-spy if it isn't already decided; just say whether the migration forces a choice about it.

**2. The three case-study pages (`usecases/*.html`) and the "All work" back-link.** Static markup, not React: `<nav><span class="nav-name">Adrianna Dziadyk</span><a class="nav-back">All work</a></nav>`, styled by hand in `styles.css` (`body.cs nav`, `.nav-name`, `.nav-back`) - no `fds-nav` class at all today, and no scroll/blur-on-scroll behavior (that's purely a `navigation.js` thing, and this bar has no script on it). This already looks a lot like `fds-nav--minimal` ("a brand name and a back link, no menu" - the component's own comment describes exactly this case), but the CSS component only shows one minimal-specific rule (`.fds-nav--minimal .fds-nav__link { flex: none; }`) and no full markup example for it. Figure out and report back the actual markup `fds-nav--minimal` expects - does it still need a `.fds-nav__toggle`/`.fds-nav__menu` wrapper around the single back-link even though there's nothing to collapse, or can those be left out entirely? Check by reading the rest of `navigation.css`/`navigation.js` for anything that assumes `.fds-nav__menu` exists.

`password.html` has no nav at all - out of scope, nothing to migrate there.

## What to report back

No code changes. A report that: confirms or corrects the two bars above; answers the `fds-nav--minimal` markup question; flags anything else different between today's two navs and the component (states, focus handling, the scrim/backdrop on open, keyboard behaviour) that isn't covered above; and lists open questions for the owner, the way B-035 did. I'll turn those into decisions with her before any build brief goes out.
