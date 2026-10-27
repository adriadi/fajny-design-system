# B-002 · Answers to B-001, then the type tokens proposal

## Owner's answers to B-001

1. **Line height and letter spacing:** A, percentages on the text styles, not variables.
2. **Family per role and overline's uppercase:** A, add tokens. Propose names and values first (task 2).
3. **Names:** as proposed. Variables `font/size/<role>`, text styles named by role (`display` … `overline`).
4. **Gold italic in Syne:** A, gold and upright in Figma, documented as a known limitation.

Recorded as decisions 46, 47 and 48. The reviewer committed them to `DECISIONS.md` on `figma/modes` (`92eb3d3`): pull that branch before you work on it.

## Tasks

1. **Pull `figma/modes`** and check that `DECISIONS.md` ends with decision 48.
2. **Type tokens, proposal only.** Don't add them yet. In `REPORT.md`, propose:
   - how each of the 9 roles gets its font family as a token (names, where they live in `typography.tokens.json`, aliases of the two existing family tokens, how they come out in CSS),
   - a token for overline's uppercase (name, value, CSS output),
   - what changes in the README and the token descriptions, so a fact lives in a token and not only in prose,
   - which build check fails when a role has no family.
3. **README status line on `main`:** it still says "first version planned for 5 November 2026". Decision 21 moved the deadline to Thursday 12 November 2026. Change that line on `main`, commit, push. Nothing else on `main`.

## Report

`REPORT.md` with the ID `B-002`: task 1 and 3 confirmed with commit hashes, the proposal for task 2, numbered questions if any. Push to `handoff` and stop.
