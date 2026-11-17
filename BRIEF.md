# B-035 · Second portfolio sync — audit (no building yet)

All six components are on `main` now (decision 52's plan: tokens first, then the components). Time for the portfolio's real markup to actually use them, in the portfolio repo (`adriadi/portfolio`). Same as every other round: audit first, I bring the findings and open questions to the owner, then we build.

## Scope

Portfolio pages: `index.html`, `password.html`, `usecases/hawk-case-study.html`, `usecases/scouting-notes-case-study.html`, `usecases/curaay-case-study.html`, plus `styles.css` (or wherever the page-level CSS actually lives now — confirm the real filename).

For each of the six components, find every place on the live site that is that component in spirit but not yet in class:

- **Button** — primary/secondary/link buttons sitewide.
- **Input** — the contact/work-with-me form fields.
- **Card** — project cards, the "Kind words" testimonial cards (decision 77 keeps these as Cards, not Highlight), any other card-shaped block.
- **Tag** — the hero tag, skill chips, project tags over photos (decisions 69–71).
- **Navigation** — the main site nav and the case-study bar (decisions 72–74).
- **Highlight** — the Curaay pull-quote, the "tension" block, the Scouting `platform-insight` callout (decisions 75–78). Not the testimonials, not `.patient-quote`, not `.market-card--gap` (decision 77 and B-033's out-of-scope list — still out of scope here too).

For each instance, report:
1. Which file/selector it is now.
2. Which `fds-*` classes/markup it maps to, and whether the existing markup needs restructuring (e.g. Navigation needs the shared `<ul>` and `navigation.js`; Highlight needs `<figure>/<blockquote>` or the `<div>` shape).
3. Anything that won't survive the switch as-is — a visual difference, a token with no equivalent, a judgement call (decision 54 flagged several of these already: navy labels, uppercase experience dates, Syne card titles, Curaay market cards, navy form labels — check whether those are still open or already resolved).
4. Confirm `tokens.css` in the portfolio repo is synced to the design system's current `main` (post-Highlight) or still behind.

Also check: does a `design-system/tokens` or similar migration branch already carry any of this partway, or is `main` (post the tokens-only merge) the real starting point? Decision 71 mentioned a `work-with-me.html` migration branch — confirm whether that still exists/applies or was superseded.

## Out of scope for this brief

No markup changes, no CSS changes, no branch. Audit and report only.

## Report

`REPORT.md` with ID `B-035`: the six-component inventory above, organized by component (not by page), with your recommendation on sequencing (all six in one pass vs. splitting it up) and anything you'd want a decision on before building.
