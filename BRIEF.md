# B-043 · Project grid: one line when odd, two rows when even

Decision 88. Same branch as B-041/B-042 (`portfolio/sync-button-input-card`), not merged - add this as another commit there, don't start a new branch. This is the last piece before step 3 goes to the owner for a final check and merge.

## What to do

Today `.portfolio-grid` is a fixed 2-column grid with a special rule for an odd last card (`.portfolio-grid > :last-child:nth-child(odd)`, centered at half width). Replace that with a column count that depends on `PROJECTS.length`:

- **Odd count** (today: 3): all cards in a single row - `grid-template-columns: repeat(PROJECTS.length, 1fr)`.
- **Even count**: two even rows - `grid-template-columns: repeat(PROJECTS.length / 2, 1fr)`.

Implementation: a CSS custom property, not a hand-written rule per count.

- In `index.html`, where `.portfolio-grid` is rendered, set an inline style with the computed column count, e.g. `style={{ '--project-cols': PROJECTS.length % 2 === 0 ? PROJECTS.length / 2 : PROJECTS.length }}`.
- In `styles.css`, change `.portfolio-grid` to `grid-template-columns: repeat(var(--project-cols, 2), 1fr);` and delete the old `:last-child:nth-child(odd)` centering rule entirely (no longer needed - every row is now always full).
- In the existing mobile breakpoint block (`.portfolio-grid { grid-template-columns: 1fr; }`), change it to override the variable instead, so it still wins there regardless of count: `.portfolio-grid { --project-cols: 1; }` (keep this rule, just change what it sets).

Don't touch `fds-card`'s own padding, type scale or `aspect-ratio` - nothing in the card component changes. The visual "smaller" effect the owner asked for is just the 3 cards now sharing one row evenly instead of today's 2-up-plus-centered-orphan layout; that's already correct once the grid change above is in place.

Check with 3 cards (today's real count, odd - confirm a single row of 3, evenly sized, no centering) and, if it's quick, sanity-check the even case too by temporarily adding a 4th entry to `PROJECTS` locally (two rows of 2), then remove it again before committing - don't actually add a 4th project.

Leave `.articles-grid` (Medium) alone - it already lays its 3 cards in one line today and isn't part of this.

## Report

`REPORT.md` with ID `B-043`: confirm the CSS variable approach, confirm the old centering rule was removed, confirm the 3-card single-row result, note how the even-count check went (and that the temporary 4th entry was removed), and a screenshot of the project grid.
