# B-037 · Correction before pushing: work-with-me.html doesn't ship

Decision 84. B-036's local commits on the portfolio's `main` are right except for one thing: `work-with-me.html` was always a test fixture (decision 3, "never ships") — merging `design-system/work-with-me` was only ever meant to bring in its two real fixes, not publish the page.

## What to do

On the portfolio's local `main` (the three unpushed B-036 commits: the merge `d444b5b`, the sync `ba3829b`, the dead-CSS cleanup `429a1ea`):

1. **Remove, before anything is pushed:**
   - `work-with-me.html`
   - its script (`js/work-with-me.js`, or whatever the merge actually added — confirm the filename)
   - the nav link to it in `index.html` (the 8 lines the merge added)
2. **Keep everything else the merge brought in** — specifically the skill chip's contrast fix (decision 70) and the Medium badge's removed `:hover` rule (decision 69). Those are real fixes that belong on `main`; only the page and its link go.
3. Confirm no other file references `work-with-me` (a stray link, a sitemap entry, anything) after the removal.
4. Run the build/whatever check you'd normally run, then push `main`.

If removing the page cleanly isn't straightforward from a merge commit (e.g. it's tangled with the fixes in a way that isn't a clean file-level removal), stop and report exactly what's tangled, rather than guessing which lines to keep.

## Report

`REPORT.md` with ID `B-037`: confirmation `work-with-me.html`/its script/its nav link are gone, confirmation the two fixes (decision 69, 70) are still present, confirmation nothing else references the removed page, and the push result.
