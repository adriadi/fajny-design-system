# B-045 · "Kind Words" collapsible on mobile only

Decision 89. New branch for this one - `portfolio/kind-words-mobile`, based on current `main` (not the step-3 branch; this is unrelated to the Button/Input/Card migration, no `fds-*` classes involved).

## What to do

In `index.html`, the `Recommendations` component (`RECS` array, 7 items; the `columns` array arranges them into 4 masonry columns with the LinkedIn CTA as the 8th tile). Desktop/tablet: no change at all - same masonry, same parallax.

Mobile only (the existing `max-width: 640px` breakpoint where `.recs-masonry` already goes to 1 column): show only 3 tiles by default - the LinkedIn CTA card, plus Francisca's and Robin's recommendations. Hide the other 5 (Daniel, Kostas, Rafael, Haein, Samir) behind a "Show more" toggle that reveals them in place.

Suggested approach (adjust if something cleaner fits the component better):

- Add a `featured: true` flag to Francisca's and Robin's entries in `RECS` (or match by name - your call), so the markup can tell them apart from the rest.
- Add local state to `Recommendations` (`const [expanded, setExpanded] = useState(false)`).
- On each `rec-card` that isn't featured and isn't the CTA, add a class (e.g. `rec-card--extra`) and hide it under the mobile breakpoint when not expanded: `@media (max-width: 640px) { .recs-masonry:not(.is-expanded) .rec-card--extra { display: none; } }`, toggling an `is-expanded` class on the masonry container from `expanded` state.
- A "Show more" button/link, visible only on mobile and only when collapsed (`display: none` above 640px, and hidden itself once `expanded`), text "Show more" → on click, `setExpanded(true)`. Reasonable default styling (matches the site's existing link/button character - your call on exact placement, centered below the visible cards is the obvious spot).
- No "Show less" needed - once expanded, stays expanded for that page view.

Accessibility: the toggle should be a real `<button>` (not a styled `<a>` with no destination), with `aria-expanded` reflecting state.

## Report

`REPORT.md` with ID `B-045`: confirm the approach taken, confirm desktop/tablet are pixel-identical to before, and two screenshots at phone width (375px or so) - collapsed (CTA + 2 cards + "Show more") and expanded (all 8).
