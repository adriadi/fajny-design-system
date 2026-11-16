# B-027 · Finish Tag: push, merge, no portfolio merge yet

B-026 is approved as built (decision 71). Two things left:

## Task 1: push the portfolio branch

On the `portfolio` repo, push `design-system/work-with-me` (currently local only, commits `50f0871` and `a1f5dc1`). **Do not merge it into the portfolio's `main`** — that happens later, together with the already-planned second portfolio sync (refreshing `tokens.css` and switching Button/Input/Card/Tag to the `fds-*` classes), so the portfolio doesn't sit half-migrated in between.

## Task 2: merge `components/tag` into `main`

Same process as B-024's Card merge:
- `git pull` `main` first.
- Merge with a merge commit (`--no-ff`).
- Conflict → stop and report it, don't resolve it.
- `npm run build` on `main` after the merge. Failure → don't push, report it.
- Push `main`. Keep the `components/tag` branch.

## Report

`REPORT.md` with ID `B-027`: the portfolio push confirmation, the merge commit, and the build result on `main`. Push to `handoff` and stop.
