# B-047 · Consolidated: !important fix + Kind Words mobile collapse

Decision 91. Thanks for flagging the branch question honestly instead of guessing silently - you read it right. Correction: `portfolio/kind-words-mobile` (as it stands now, with B-046's reorder already on it) is the right branch to keep working on. It turns out the recommendation cards were already converted to `fds-card` by B-041, so this was never really independent of step 3 - decision 89's "separate, unrelated branch" framing was wrong on my end, not yours. `portfolio/sync-button-input-card` is retired; don't start anything new there. Everything from here on lands on `kind-words-mobile`, and that's the one branch that goes to the owner for final review and merge to `main`.

Two things, both still outstanding (B-044 and B-045 never actually ran - they were overwritten in this file before you read them, which is on me for pushing three briefs back to back without checking in between; sorry for the runaround). Full content below, not a pointer back to old commits.

## 1. Drop the `!important` on the mobile project-grid override (was B-044)

In the mobile breakpoint, `.portfolio-grid { --project-cols: 1 !important; }` - try restructuring instead: move the computed `--project-cols` assignment off `.portfolio-grid` itself (where it's set inline from `PROJECTS.length`) onto its parent wrapper, so `.portfolio-grid` carries no inline style and the existing mobile rule `.portfolio-grid { --project-cols: 1; }` wins by ordinary cascade, no `!important`. If that doesn't fit the component structure cleanly, keep `!important` with a comment explaining why and say so in the report.

## 2. "Kind Words" mobile collapse (was B-045)

Current state on `kind-words-mobile` (confirmed - this matches what's actually in the file now): `RECS` still has 7 items in original order (0 Daniel … 6 Samir); `columns` is already reordered by B-046; both the testimonial cards and the LinkedIn CTA render as `<article className="fds-card">` via `RecCard`.

Mobile only (the existing `max-width: 640px` breakpoint, where `.recs-masonry` already goes to 1 column): show only 3 cards by default - the LinkedIn CTA, Francisca's (`RECS[2]`), and Robin's (`RECS[4]`). Hide the other 5 behind a "Show more" toggle.

- Mark which `RECS` entries are featured, e.g. add `featured: true` to Francisca's and Robin's objects in the array.
- On the non-cta branch of `RecCard`, add a second class when the item isn't featured: `className={\`fds-card\${item.featured ? '' : ' rec-extra'}\`}` (page-specific class, not a design-system one - same pattern as `sm-card` elsewhere on this page).
- Local state in `Recommendations`: `const [expanded, setExpanded] = useState(false)`; put `is-expanded` on `.recs-masonry` when `expanded` is true (e.g. `className={\`recs-masonry\${expanded ? ' is-expanded' : ''}\`}`).
- CSS: `@media (max-width: 640px) { .recs-masonry:not(.is-expanded) .rec-extra { display: none; } }`.
- A "Show more" `<button>` after `.recs-masonry`, rendered only while `!expanded` (conditional render, not just CSS-hidden) and itself hidden above 640px via CSS. `aria-expanded={expanded}` on it even though it unmounts once clicked (harmless). No "Show less" - stays expanded for the page view once clicked.
- The CTA card is never hidden - it has no `featured` check at all, just leave its branch of `RecCard` exactly as it is.

## Report

`REPORT.md` with ID `B-047`, covering both parts: the `!important` outcome, and for Kind Words - confirm the approach, confirm desktop/tablet unchanged, two screenshots at phone width (collapsed: CTA + 2 cards + "Show more"; expanded: all 8).
