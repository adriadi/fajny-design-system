# B-015 · Last comment, then merge Button

## Owner's answers to B-014

1. Comment in `style-dictionary.config.js`: **A**, "as authored".

The owner checked the Typography and Button pages in Figma and approved them. `components/button` can be merged.

## Tasks (system repo)

1. On `components/button`, change the comment in `style-dictionary.config.js` (line 32): "spacing and radius stay in px like the portfolio" becomes "spacing and radius stay in px as authored". Nothing else in that file. Run `npm run build` (all 11 steps must pass), commit, push.
2. Merge `components/button` into `main`:
   - `git pull` `main` first. Since the branch split, `main` only has commits to `DECISIONS.md`.
   - Merge with a merge commit (`--no-ff`), so the history shows the Button work as one branch.
   - If there's a conflict, stop and report it. Don't resolve it.
   - Run `npm run build` on `main` after the merge. If it fails, don't push: report it.
   - Push `main`. Keep the `components/button` branch; don't delete it.
3. Don't touch Figma, and don't run the Figma scripts. Nothing in Figma changes in this brief.

## Report

`REPORT.md` with the ID `B-015`: the comment commit, the merge commit on `main`, the build result on `main`. Push to `handoff` and stop.
