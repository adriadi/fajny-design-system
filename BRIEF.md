# B-019 · Merge Input

## Owner's answer to B-018

Approved. `components/input` can be merged.

## Tasks (system repo)

1. Merge `components/input` into `main`:
   - `git pull` `main` first. Since the branch split, `main` has only `DECISIONS.md` commits (decision 61 and a parking lot item).
   - Merge with a merge commit (`--no-ff`).
   - If there's a conflict, stop and report it. Don't resolve it.
   - Run `npm run build` on `main` after the merge. If it fails, don't push: report it.
   - Push `main`. Keep the `components/input` branch.
2. Don't touch Figma, and don't change anything else.

## Report

`REPORT.md` with the ID `B-019`: the merge commit on `main` and the build result. Push to `handoff` and stop.
