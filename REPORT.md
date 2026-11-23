# B-047 · Consolidated: !important fix + Kind Words mobile collapse

Branch `portfolio/kind-words-mobile`, one new commit on top of B-046, pushed, not merged. Nothing was added to the retired branch.

## 1. `!important` dropped

The inline `--project-cols` moved onto a plain wrapper `div` around `.portfolio-grid`. The grid has no inline style now, and the mobile rule is `.portfolio-grid { --project-cols: 1; }` with no `!important`. It wins by ordinary cascade, because a value set on the element beats the one it inherits from the wrapper.

Checked: at 500px wide the grid is one column. At 1280px it is three equal columns, as before.

## 2. Kind Words mobile collapse

- **Approach, as briefed:** `featured: true` on Francisca and Robin; non-featured cards get `rec-extra`; `expanded` state adds `is-expanded` to `.recs-masonry`; the CSS hides `.rec-extra` at 640px and below while not expanded; a "Show more" button (`fds-button--secondary`, `recs-more`) renders only while collapsed, with `aria-expanded`. The CTA branch is untouched.
- **Collapsed at 500px:** three cards (Francisca, Robin, the LinkedIn CTA) and the button. Screenshot: `b047-1-collapsed.png`.
- **Expanded:** all 8 cards, and the button is gone. Screenshot: `b047-2-expanded.png`.
- **Desktop at 1280px unchanged:** 4 columns, 8 cards visible, the button is `display: none`.

## Notes

- On a phone the single column shows cards in column order, so Francisca and Robin come first and the CTA last (the CTA is in the last column). That matches "CTA + 2 cards", not the order listed in the brief.
- Not tested below 500px wide.
- Open from earlier: B-041 Q2 (server-error line), B-038 (Medium badge style).
