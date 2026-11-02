# B-006 · Close Figma part 2, then migrate the portfolio to the tokens

## Owner's answers

- **Type check without gold:** approved. Figma part 2 is done.
- **Decision 52** (in `DECISIONS.md` on `figma/modes`, `b8f99f8`): the portfolio starts using the system now, in two updates. This brief is the first: **tokens only**. Components (Button first) come in a second update. The portfolio gets a **copy** of the built `tokens.css`, synced by a script. You do the migration on a branch in the portfolio repo; the owner checks it locally and uploads it to the server herself.
- **The Button questions from B-005 are still open.** Don't build the Button. Existing buttons only get token values (see task 3).

## Tasks

### A. Design system repo

1. Merge `figma/modes` into `main`, push, delete the local branch with `git branch -d`.

### B. Portfolio repo (`adriadi/portfolio`)

2. **Before anything else, screenshots of the site as it is today**: home and the three case studies, 1440px and 390px, full page. Save them **outside every repo** (e.g. `~/fajny-screenshots/before/`). **Never push them anywhere:** two case studies are password-protected and must stay private. Don't put the password in any file or report.
3. **Branch `design-system/tokens` from the portfolio's `main`.** Don't touch the tag `before-system` or the `test/*` branches.
4. **Sync script:** a small script in the portfolio repo that copies `tokens/css/tokens.css` from a local clone of the design system into the portfolio, with a first-line comment naming the system's commit. The site links that file before `styles.css`.
5. **Migrate every page** (home, the three case studies, the password page) to the tokens:
   - Colours: every colour becomes a semantic role (`--fds-color-*`). Old variables and their aliases (`--accent`, `--bg`/`--beige`, `--ink`, …) go. Project colours for Hawk and Curaay go too (decision 16: one palette). Dark blocks, including the tension block, the footer and dark sections, use `.fds-surface-dark` (decisions 30, 33).
   - Typography: every text uses one of the 9 roles, all five properties (`--fds-font-<property>-<role>`). Gold emphasis only in display, title and heading (decision 28).
   - Spacing, radius, shadow, motion: tokens only (decisions 38–41). Pill radius for every button (decision 39); otherwise existing buttons keep their shape and just take token values.
   - Accessibility from the audit: focus ring from the focus tokens on every interactive element, labels linked to inputs, placeholder and error colours from the roles, reduced motion everywhere (decision 41), and every looping animation stops within 5 seconds (decision 42).
   - **Don't decide anything new.** If an element doesn't fit a role or token, leave it as it is and list it in the report as a question.
6. **Measure** with the same `measure.sh` as the "before" test, on `before-system` and on the new branch: hardcoded values, `var()` uses, font sizes, colours. These numbers go into the case study.
7. **Screenshots after**, same pages and widths, to `~/fajny-screenshots/after/`. Same rule: local only.
8. Commit and push `design-system/tokens`. **Don't merge, don't deploy.**

## Report

`REPORT.md` with the ID `B-006`. Keep it public-safe: no password, no content from the protected case studies beyond element names. Include: commits, the sync script, what changed per page, the measurements before/after as a table, the elements that didn't fit (numbered questions with options and a recommendation), the path to the screenshots on the owner's machine, and how the owner runs the site locally to check it. Push to `handoff` and stop.
