# B-024 · Fix the secondary card's solid background, then finish B-023

## What happened

B-023 (the brief right before this one, still on `handoff`) was never run: there's no report for it, and `components/card` still has both secondary-card prototypes. The owner has since found a real bug in the secondary card: it shows a solid, opaque navy background instead of the subtle veil decision 66/68 describe. This brief covers both: find and fix the bug, then do what B-023 asked.

## Task 1: find and fix the solid background

The B-022 report said: *"The Dark variants carry a `color/surface-dark` backdrop in their frame, so the veil can be seen in the set; the CSS has no such backdrop."* That backdrop was meant for the demo frame only, as a stand-in for a real dark page behind the floating component. Check whether it leaked into the actual Card component (not just the frame around it):

1. **In Figma**, open the Card page and inspect the secondary-card component (and its instances in Variants) layer by layer. Find whatever gives it a solid fill instead of transparency: a backdrop rectangle inside the component itself, a fill accidentally applied to the card frame, or anything else. Fix it so the component instance itself has no opaque fill — only its veil, however that's approximated in Figma. If a navy backdrop is still useful so a reader can see the veil without placing the component on a dark frame themselves, it must live in the surrounding context/demo frame, never inside the component.
2. **In the live preview** (`docs/card-preview.html`), check the secondary card in an actual browser rendering (not just reading the CSS). Confirm it is genuinely transparent with only the veil tint showing, on top of whatever is actually behind it. If the browser rendering is already correct, say so plainly in the report — this may be a Figma-only problem.
3. Say in the report exactly what was wrong and what you changed. If you're not sure of the cause after checking both places, report what you found and ask rather than guessing further.

## Task 2: finish B-023

Do what B-023 asked, now that the bug above is also fixed:

1. Ship **B only** (the diagonal sheen) as the secondary card. Remove the `.fds-card--sheen` modifier and the flat-veil (A) code path; fold B's look into `.fds-card--dark` itself.
2. Figma: remove the "prototype A / prototype B" comparison framing from the Card page; the Dark-surface secondary card in the set and in Variants is just what the secondary card looks like.
3. Docs (`docs/card.md`): describe the secondary card as the sheen, no "two prototypes" language, with its contrast numbers (title 7.33:1 at the gradient's peak, muted text 4.58:1).
4. Preview: the "prototype A" / "prototype B" panels become one "Secondary card" panel.
5. `tokens/effect.tokens.json`, the `duration` group's `$description`:
   > An animation that starts on its own stops within 5 seconds (WCAG 2.2.2), except a loading indicator, which keeps going until its content arrives or fails — it isn't decorative, and it ends on its own. With prefers-reduced-motion: reduce, drop every movement (transforms, slides, fade-in travel, shakes, smooth scrolling, looping animations) and keep colour and opacity changes.
6. Run `npm run build` and the real Figma files that changed. Commit and push `components/card`.
7. **Merge `components/card` into `main`:**
   - `git pull` `main` first.
   - Merge with a merge commit (`--no-ff`).
   - If there's a conflict, stop and report it. Don't resolve it.
   - Run `npm run build` on `main` after the merge. If it fails, don't push: report it.
   - Push `main`. Keep the `components/card` branch.

## Report

`REPORT.md` with the ID `B-024`: what was wrong with the background and what fixed it, the cleanup commit, the merge commit, the build result on `main`, and a screenshot of the Card page's Dark-surface frame showing the corrected secondary card (transparent, not solid). Push to `handoff` and stop.
