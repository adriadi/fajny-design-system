# B-033 · Build Highlight

Last of the six. Decisions from the B-032 audit and the owner's confirmations (22, 30, 31, 54, 64, 75, 76, 77).

## Scope

One component, `fds-highlight`, two variants:

### Dark variant (the "tension" block)

Already correct in colour and contrast (decisions 30, 33 fixed the old bug before this component existed) — mainly needs turning into a real component instead of `.tension`, plus the spacing fix:
- Label (`overline` role), heading (`subheading` role), one or two body paragraphs (`body` role).
- **Fix the spacing bug (decision 76):** the label-to-heading gap should be 16px, not the 40px the page-wide `h3` margin currently forces. Write the component's own rule specific enough to win (or use `:where()`/a more specific selector on the page side, your call — whatever's cleanest and least likely for an agent to break again).

### Light variant (quote / rationale / cited statistic / insight)

One variant, one shape, covering all four real uses found in the audit (decisions 76):
- Text in a new, twelfth text role for the italic Syne quote type (you pick the exact name, e.g. `quote`; propose the size — the audit found 18–26px for the quote and 15–18px for the insight, so either unify to one size or keep a fluid range that covers both, your call, flag it in the report either way) plus a citation/source line below (`small` role, muted, matching the existing pull-quote's citation treatment).
- **Optional icon slot** before the text, for the insight use (decision 76) — empty/absent for a plain quote.
- Fill `color-surface-highlight`, rule in `color-border-highlight`, width `border-width.default` (1.5px, decision 64) instead of the current 3px literal.
- **No asymmetric radius (decision 75):** square corners (0 radius) on all four, since the rule is a one-sided border. Don't round only the corners away from it.
- **Fix the spacing bug (decision 76):** the quote-to-citation gap should be 12px, not the 20px the page-wide `body.cs p` margin currently forces. Same approach as the dark variant's fix.

### Out of scope

- The home page testimonials stay Cards (decision 77) — don't touch them.
- `.patient-quote` and `.market-card--gap` (Curaay) are separate patterns, not Highlight — leave them.
- Don't migrate the portfolio's existing `.tension`/`.pullquote`/`.platform-insight` instances to the new classes yet. Build the component on its own branch (`components/highlight`), documented and previewed, the same as Tag and Navigation were before their own portfolio adoption. That migration is part of the already-planned second portfolio sync.

## Figma, docs, preview

As always: decision 58's page pattern (last page in whichever group fits — your call, say which), `docs/highlight.md` (include the new text role's spec and the two real spacing fixes), update the preview (both variants, the icon slot shown and not shown, on light and dark surfaces as relevant). Neutral example text on the component itself.

## Report

`REPORT.md` with ID `B-033`: the text role's exact name/size/weight you picked, the rendered contrast for both variants, confirmation of both spacing fixes (before/after), and screenshots of each variant (dark, light without icon, light with icon). No merge to `main` yet — stop after the report and push to `handoff`.
