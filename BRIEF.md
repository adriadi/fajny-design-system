# B-046 · Desktop/tablet: reorder the testimonial masonry, strongest first

Decision 90. Same branch as B-045 (`portfolio/kind-words-mobile`), another commit there.

## What to do

Only the `columns` array in the `Recommendations` component changes - which `RECS` item sits in which of the 4 columns' two slots. Nothing else about the masonry (grid, parallax, column count, card markup) changes.

Reorder so each column's **first** (top, most-visible) slot holds a stronger recommendation and the **second** (bottom) slot holds a weaker one or the CTA:

- Column 1: Francisca (top), Haein (bottom)
- Column 2: Robin (top), Kostas (bottom)
- Column 3: Daniel (top), Rafael (bottom)
- Column 4: Samir (top), the LinkedIn CTA (bottom - stays where it already is)

Concretely, that's:

```js
const columns = [
  [RECS[2], RECS[5]],  // Francisca, Haein
  [RECS[4], RECS[1]],  // Robin, Kostas
  [RECS[0], RECS[3]],  // Daniel, Rafael
  [RECS[6], 'cta'],    // Samir, cta
];
```

(Indices assume `RECS` is still in its current order: 0 Daniel, 1 Kostas, 2 Francisca, 3 Rafael, 4 Robin, 5 Haein, 6 Samir - double-check against whatever `RECS` looks like after B-045's `featured` flag is added, in case the array itself got reordered or restructured there.)

This is independent of B-045's mobile "featured" flag (Francisca + Robin) - that's about which 2 show by default on a phone; this is about column position on desktop/tablet. Both end up pointing at Francisca and Robin as the strongest, which is consistent, not a coincidence.

## Report

Add to the same `REPORT.md` under a new `B-046` heading (or a fresh one if B-045 already shipped its report) - confirm the new column order, and a screenshot of the desktop masonry showing the top row.
