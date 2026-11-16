# B-034 · Merge Highlight into main

Last of the six components. Same procedure as B-024 (Card), B-027 (Tag), B-031 (Navigation).

## Steps

1. Pull `main`, make sure it's current.
2. Merge `components/highlight` into `main` with `--no-ff` (keep a merge commit).
3. If there's a conflict: stop, don't resolve it yourself, report exactly what conflicted.
4. If it merges clean: run `npm run build` on `main`.
   - Build fails → stop, report the failure, don't push.
   - Build passes → push `main`.
5. Keep the `components/highlight` branch (don't delete it), same as the other three.

## Report

`REPORT.md` with ID `B-034`: merge commit hash, build result, confirmation `main` now has Button, Input, Card, Tag, Navigation, and Highlight. Note if anything looked off in the merged `main` build that wasn't visible on the branch alone.
