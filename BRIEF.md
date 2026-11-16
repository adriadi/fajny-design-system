# B-025 · Tag audit (no building yet)

Card and Image are merged into `main`. Next up, per decision 6's scope, is Tag. This round is audit only — survey the portfolio, no component building.

## What to look at

In the portfolio repo (`styles.css`, `index.html`, and the three case-study pages — `usecases/hawk-case-study.html`, `usecases/scouting-notes-case-study.html`, `usecases/curaay-case-study.html`), find every tag/chip/pill-shaped label currently in use. For each distinct one, note:

1. Where it appears (page, section) and what it's for — a topic label, a skill, a filter, a status, a role.
2. Its current styling: fill colour, text colour, border, padding, font size/weight, radius (decision 39 already set pill 999px as the system's answer here, so flag anywhere that differs).
3. Whether it's static (just text) or interactive (a filter you click, a link).
4. Whether it sits on a light or dark surface, and if dark, what its current contrast looks like. Decision 54 flagged specifically: *"Gold chip text on dark waits for Tag"* — find that instance and report its current colours and contrast ratio.
5. Any off-grid padding values (decision 38 found 103 off-grid uses, "mostly 6, 10 and 14px inside tags and buttons") — note which tags use them.

## Report

`REPORT.md` with ID `B-025`: a short table or list of the distinct tag/chip patterns found (styling, location, interactive or not, contrast where relevant), plus a screenshot of each distinct visual pattern in context on the page (not just a cropped swatch). No code changes, no commits other than the report itself. Push to `handoff` and stop.
