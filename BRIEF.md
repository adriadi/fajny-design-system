# B-044 · Clean up B-043's mobile override, re-confirm two already-answered questions

Same branch (`portfolio/sync-button-input-card`), another commit. Three small things.

## 1. Avoid `!important` for the mobile grid override

Good catch on the inline-style specificity problem. Before reaching for `!important`, try moving the computed `--project-cols` assignment off `.portfolio-grid` itself and onto an ancestor that the mobile breakpoint doesn't also need to win against with an inline style - e.g. set it with `style={{ '--project-cols': … }}` on the grid's parent wrapper (or on `<body>`/the root, if there's a convenient place already touched by the page's JS) instead of on `.portfolio-grid`. Then `.portfolio-grid` itself carries no inline style, so the existing mobile rule (`.portfolio-grid { --project-cols: 1; }`) wins by ordinary cascade, no `!important` needed.

If that genuinely doesn't fit the component structure cleanly, `!important` with your comment is an acceptable fallback - just confirm you tried the restructure first and say why it didn't work.

## 2. Two questions from the report - already decided, just re-confirming

- **Form-level error:** per-field only, no banner - this was already settled in the B-041 brief itself (see its line on `.form-error`: "Go with per-field errors only, no separate banner"). Nothing changed; go with that.
- **Medium badge:** stays the dark `fds-tag fds-surface-dark` pill, not a plain tag - decision 85. Nothing changed; go with that.

(These two seem to be carrying over unanswered in your questions list across a few reports - if something in the handoff makes them look open on your end, let me know so I can see what's missing instead of just repeating the answer.)

## 3. Mobile stacking (your question 3) - noted, not yours to decide

Whether the three project cards should stay full-width-stacked on a phone, or go two-up / horizontal-scroll, is a design call for the owner, not something to build yet. I'll bring it to her and come back with a brief if she wants a change. Leave mobile as the single-column stack for now (today's behavior) - don't build an alternative speculatively.

## Report

`REPORT.md` with ID `B-044`: confirm whether the restructure avoided `!important` or why it didn't, confirm the two re-answered items are applied as before (no visible change expected), and a screenshot of the mobile grid (one column, as today) so there's a visual record this didn't change.
