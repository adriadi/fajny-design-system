# B-036 · Second portfolio sync, step 1: foundation (no component markup yet)

Decisions 79–83 (from the B-035 audit). This step changes nothing visible on the live site; it just gets the ground ready for steps 2–4.

## Steps, in order

1. **Merge `design-system/work-with-me` into the portfolio's `main` first.** It's unmerged, branches cleanly from `main`, and already carries the skill-chip contrast fix (decision 70) and the Medium-badge hover removal (decision 69) — merging it now means step 2 doesn't redo them. `--no-ff`. If it doesn't merge clean, stop and report the conflict; don't resolve it yourself.
2. **Re-sync `tokens.css`** from the design system's current `main` (commit `3efeccd` or whatever `main` is at by the time you run this) — it's currently 85 lines behind, copied at `8879a9e`. Same sync mechanism as before, just re-run.
3. **Extend the sync script** so it also copies `components/*.css` and `navigation.js` into the portfolio (decision 79) — same pattern as `tokens.css`: committed into the repo (not loaded from elsewhere), with the design-system commit noted in a comment, so the static site stays self-contained. Your call on the exact destination folder (a `fds/` folder next to `tokens.css` seems obvious, but say what you pick in the report). Copy the files now, but don't link them from any page yet and don't touch any markup — that's steps 2–4.
4. **Delete the dead CSS**: `.cv-modal*` and `.btn-accent` (decision 83). No markup uses them.

## Not in this step

No `fds-*` class goes into any page's markup yet. No visual change should be observable on the live site after this step (the removed dead CSS has no markup either, so nothing changes there either). Steps 2–4 (Highlight+Tag, then Button+Input+Card, then Navigation) come as separate briefs once this one is merged and checked.

## One correction to the B-035 audit, for later

B-035 said the home nav has "no equivalent" for the scrolled, see-through/blurred bar. That's not right — `components/navigation.css` already has `.fds-nav--scrolled:not(.fds-surface-dark)` with exactly that treatment, and `navigation.js` already toggles the class after 40px of scroll, for any `fds-nav`, not just the minimal case-study bar. Nothing to design or decide there; when step 4 (Navigation) comes around, it should just carry over as built. Flagging now so it's not re-litigated later.

## Report

`REPORT.md` with ID `B-036`: merge commit hash, confirmation `tokens.css` is current, which folder the copied component files landed in and how they're synced/committed, confirmation the dead CSS is gone, and confirmation nothing changed visually (a screenshot of the home page is enough).
