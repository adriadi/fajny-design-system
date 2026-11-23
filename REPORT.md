# B-043 · Project grid: one line when odd, two rows when even

Branch `portfolio/sync-button-input-card`, new commit on top of B-042, pushed, not merged.

- **CSS variable approach, confirmed.** `index.html` sets `style={{ '--project-cols': PROJECTS.length % 2 === 0 ? PROJECTS.length / 2 : PROJECTS.length }}` on `.portfolio-grid`. `styles.css` uses `grid-template-columns: repeat(var(--project-cols, 2), 1fr)`.
- **Old centring rule removed**, both the base `:last-child:nth-child(odd)` rule and its mobile reset.
- **3 cards:** one row, three equal columns (378.7px each at 1280px wide), no centring. Screenshot: `b043-1-project-grid.png`.
- **Even check:** I cloned a card in the browser to make 4 and applied the same formula: two rows of two, 580px columns. Nothing was added to `PROJECTS`, so there is nothing to remove.
- **Mobile:** at 500px wide the grid is one column.
- Untouched: `fds-card`, `.articles-grid`.

## Deviation from the brief (please check)

The brief said the mobile rule should be `.portfolio-grid { --project-cols: 1; }`. That doesn't win: an inline style beats a stylesheet rule, so the grid would stay at 3 columns on a phone. I wrote `--project-cols: 1 !important;` instead, with a comment. The alternative is to drop the inline style and compute the count in CSS, which isn't possible without a rule per count. Say if you want a different approach.

## Questions

1. B-041 Q2 is still open: keep the plain form-level server-error line?
2. B-038: Medium badge as a dark pill, or a plain tag?
3. On a phone the three cards stack at full width, so each is tall. Fine, or should they get a horizontal scroll or two columns?
