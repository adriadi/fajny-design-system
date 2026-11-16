# B-031 · Merge Navigation into main

The case-study bar's look is settled (decision 74 — keep it as built, no change needed). Nothing left to build. Merge `components/navigation` into `main`:

- `git pull` `main` first.
- Merge with a merge commit (`--no-ff`).
- Conflict → stop and report it, don't resolve it.
- `npm run build` on `main` after the merge. Failure → don't push, report it.
- Push `main`. Keep the `components/navigation` branch.

## Report

`REPORT.md` with ID `B-031`: the merge commit and the build result on `main`. Push to `handoff` and stop.
