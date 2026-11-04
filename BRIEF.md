# B-023 · Ship secondary card as B, duration wording, then merge Card

## Owner's answer to B-022

Decision 68 in `DECISIONS.md` on `main` (`git pull`). In short: ship **B** (the diagonal sheen) as the only secondary card; everything else in the report's questions (2–6) stays exactly as built or proposed.

## Tasks (`components/card`)

1. **Secondary card: B only.**
   - Fold B's sheen into `.fds-card--dark` itself, so it's the look on its own, with no second class needed. Remove the now-unused `.fds-card--sheen` modifier and the A-only (flat veil) code path from the CSS.
   - Figma: remove the "prototype A" / "prototype B" comparison framing from the Card page. The Dark-surface secondary card in the component set and in Variants shows B's sheen as simply what the secondary card looks like. Re-run the real `card-component.js`.
   - Docs (`docs/card.md`): describe the secondary card's fill as the sheen (no mention of "two prototypes" or "A/B" anymore), with its contrast numbers (title 7.33:1 at the gradient's peak, muted text 4.58:1).
   - Preview: the "prototype A" / "prototype B" panels become one panel, "Secondary card".
2. **`duration` token description.** In `tokens/effect.tokens.json`, change the `duration` group's `$description` to:
   > An animation that starts on its own stops within 5 seconds (WCAG 2.2.2), except a loading indicator, which keeps going until its content arrives or fails — it isn't decorative, and it ends on its own. With prefers-reduced-motion: reduce, drop every movement (transforms, slides, fade-in travel, shakes, smooth scrolling, looping animations) and keep colour and opacity changes.
   (Reordered so the 5-second rule and its exception read together, then the reduced-motion rule.) Rebuild so this reaches the generated CSS comments and the Figma token description.
3. Run `npm run build` and the real Figma files that changed (`card-component.js`; `foundations-pages.js` only if the `duration` token's description shows on a page there — check and run it if so). Commit and push `components/card`.
4. **Merge `components/card` into `main`:**
   - `git pull` `main` first.
   - Merge with a merge commit (`--no-ff`).
   - If there's a conflict, stop and report it. Don't resolve it.
   - Run `npm run build` on `main` after the merge. If it fails, don't push: report it.
   - Push `main`. Keep the `components/card` branch.

## Report

`REPORT.md` with the ID `B-023`: the cleanup commit, the merge commit, the build result on `main`, a screenshot of the Card page's Dark-surface frame showing only the final secondary card. Push to `handoff` and stop.
