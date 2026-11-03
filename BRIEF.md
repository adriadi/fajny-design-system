# B-013 · Button page order, room for shadows, neutral texts

## Owner's answers to B-012

1. Fixed structure labels stay in the scripts (A). "All components" is renamed, see task 1.
2. "Component set" keeps the smaller title, the same size as "Variants" (A).

Decision 58 (`DECISIONS.md` on `main`, `git pull`): a component page reads top to bottom, the component set first, then a "Variants" section below it.

New: **the system is neutral, not dedicated to the portfolio.** The portfolio is its first user, nothing more.

## Tasks (system repo, `components/button`, Figma through MCP)

1. **Button page layout:**
   - The component set goes back to the layout it had before B-012 (the grid). The one-column layout was a misunderstanding.
   - The section with every variant and state moves **below** the component set, so the page reads top to bottom.
   - That section is renamed **"Variants"** (smaller title and subtitle, as now). This order is the pattern for every future component page.
2. **Room for shadows:** page frames are tall and wide enough for every shadow on them (the `shadow/overlay` sample currently reaches past the bottom of the Shadows page frame). Part of the scripts.
3. **Neutral texts, proposal only.** Don't change anything yet. In the report, propose:
   - **Typography specimen:** neutral interface text for each of the 10 roles instead of the portfolio texts, as in a typical product (a page heading, a section heading, a card title, a short neutral paragraph for lead and body, a caption, a label…). Long enough to wrap to two lines on the Mobile frame where it does today.
   - **Button labels:** neutral labels for each variant ("Continue", "Learn more", "Read more", "Contact" style) in Figma, `docs/button.md` and `docs/button-preview.html`.
   - Any other place in the system repo where a portfolio text is used as an example (docs, README examples, previews), with a neutral replacement.
4. Run the real generated files, as in B-012. Commit and push `components/button`. **Don't merge.**

## Report

`REPORT.md` with the ID `B-013`: commits, the Button page and Shadows page screenshots, and the text proposals as a table (role or place, current text, proposed text). Push to `handoff` and stop.
