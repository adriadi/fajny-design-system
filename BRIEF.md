# B-028 · Navigation audit (no building yet)

Tag is merged into `main`. Next, per decision 6's scope, is Navigation. Audit only — survey the portfolio, no component building.

## Why this one matters (decision 6)

The "before" test (decision 2/6) asked the agent to link a new page from the main nav, and in both runs the agent hand-edited the nav markup/styles rather than using anything systematic. Keep that failure in mind while auditing: look for exactly the kind of thing an agent would have to improvise today.

## What to look at

Across the portfolio (home page, the three case-study pages, and `work-with-me.html`, now migrated onto tokens on branch `design-system/work-with-me`):

1. **The main nav itself**: structure (logo/mark, links, CTA button), desktop layout, what's sticky vs. not, its background (is it ever transparent or on a photo?), and its states — current/active page, hover, focus, visited.
2. **The mobile nav**: the hamburger trigger, what opens (drawer, full-screen overlay, dropdown), its animation, how it closes (X button, outside tap, Esc), and whether focus is trapped/returned correctly and it's reachable by keyboard.
3. **Variation across pages**: does the case-study (password-gated) pages' nav differ from the home page's (e.g. a "back" affordance, different links, a different background since the hero sections differ in color)? Does `work-with-me.html`'s nav (already seen with "WORK WITH ME" added per B-026) match the others?
4. **In-page navigation**, if any: anchor links, a table of contents, a "back to top" control, skip links — note what exists even if it's not part of the main nav bar.
5. **Contrast and accessibility as found**: text/icon contrast in every state (rest, hover, active, on whatever backgrounds the nav appears over), focus visibility, whether the current page is marked for screen readers (`aria-current`), whether the mobile menu button has an accessible name and `aria-expanded`.
6. **Any off-grid spacing values** in the nav specifically (the kind decision 38 already found elsewhere).

## Report

`REPORT.md` with ID `B-028`: a short description of the distinct nav patterns found (desktop, mobile, any in-page navigation), their current styling and states, contrast and accessibility notes, and a screenshot of each distinct pattern in context (desktop nav at rest/hover/active, mobile nav closed and open). No code changes, no commits other than the report itself. Push to `handoff` and stop.
