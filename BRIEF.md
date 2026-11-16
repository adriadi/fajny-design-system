# B-032 · Highlight audit (no building yet)

Last of the six. Audit only, no component building — but most of the scope is already settled from earlier decisions, so this is a shorter round than Tag/Navigation's audits.

## Already decided, don't re-litigate

- **Two variants (decision 22):** dark (the "tension" block) and light (the pull-quote).
- **The dark variant's background is navy, not near-black** (decision 30) — same dark as the footer and every other dark surface.
- **The light variant's decorative rule stays at 2.06:1, not darkened** (decision 31) — the tinted background and italic type already carry the emphasis.
- **Decision 54 flagged "quotes wait for Highlight"** during the portfolio migration — find what that refers to and report it.

## What to look at

1. **The "tension" block**: where it lives today (probably a case study), its current markup/CSS, whether its heading-on-dark contrast bug (navy on near-black, 1.58:1, decision 22) is still present or already accidentally fixed by the navy background change (decision 30) or the surface-switching mechanism (decision 33) that came later. Screenshot it as it is now.
2. **The pull-quote**: same — where it lives, current markup/CSS, the decorative rule's current colour and contrast (confirm it's still 2.06:1 as decision 31 measured, since token values may have shifted since). Screenshot it.
3. **Anything else quote- or highlight-shaped** on the site that isn't one of these two (a third pattern decision 22 didn't anticipate).
4. **Off-grid spacing** in and around both blocks (the kind decision 38 found elsewhere).
5. **Contrast of everything else in both blocks** (body text, attribution/citation line if any, any icon) on their respective backgrounds.

## Report

`REPORT.md` with ID `B-032`: what the two blocks look like today, their current styling and contrast, what decision 54's "quotes" note refers to, and a screenshot of each in context. No code changes, no commits other than the report itself. Push to `handoff` and stop.
