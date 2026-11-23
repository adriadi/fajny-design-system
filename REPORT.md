# B-046 · Desktop/tablet: reorder the testimonial masonry, strongest first

Only the `columns` array in `Recommendations` changed (`index.html`, 4 lines).

- **New order, confirmed in the browser at 1280px:** column 1 Francisca / Haein, column 2 Robin / Kostas, column 3 Daniel / Rafael, column 4 Samir / the LinkedIn CTA. Screenshot: `b046-1-masonry.png`.
- `RECS` is still in its original order (0 Daniel … 6 Samir), so the indices in the brief were right.
- Grid, parallax, column count and card markup are untouched.

## Branch (please check)

The brief says "same branch as B-045 (`portfolio/kind-words-mobile`)", but that branch doesn't exist locally or on `origin`, and there is no B-045 report or `featured` flag in `index.html`. I created `portfolio/kind-words-mobile` from the tip of `portfolio/sync-button-input-card` (so it includes B-041 to B-043) and committed there. It's pushed, not merged.

## Questions

0. The `handoff` log shows briefs B-044 and B-045 were pushed before B-046, and I haven't done either (my first read of the brief file was already B-046, so I didn't see them). That's why the branch and the `featured` flag were missing. B-044 and B-045 are still open.
1. Was B-045 meant to run before this one? If so, send it, and it will go on this same branch. If the branch should start from `main` instead, say so and I'll re-do the commit there.
