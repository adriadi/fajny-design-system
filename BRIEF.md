# B-005 · Type check without gold, then the Button proposal

## Owner's review of B-004

The rebuilt "Type check" page is good: real text, line height visible, four frames, dark surface switching. One change: **no gold words in the samples.** Every sample is in its role's text colour only, the same in all nine roles. This is about the specimen page only; gold emphasis stays in the system (decisions 18 and 28).

Decisions 50 and 51 are in `DECISIONS.md` on `figma/modes` (`acb58a9`). Pull first.

- **50:** the design system page is read-only. Editing is turned off on the page (no "Add" buttons). Don't turn it back on.
- **51:** Button has three variants: `primary` (navy fill, light text; becomes the gold button on a dark surface by itself, decision 29), `secondary` (`color/surface-highlight` fill, navy text) and `link` (text only, like the navigation links). No accent variant. `primary` and `secondary` are uppercase with 0.06em letter spacing, set by CSS (`text-transform`), so the HTML text stays in sentence case. `link` follows the navigation link style. States for every variant: default, hover, focus, active, disabled; `primary` and `secondary` also loading.

## Tasks

1. **Type check page (on `figma/modes`):** remove the gold emphasis from the specimen samples in the typography script, and drop or adjust the build checks that require emphasis words, so a specimen without emphasis passes. Run the script on the Figma file, commit, push. Add a new screenshot (`type-check.png`) on this branch. **Don't merge yet:** the owner checks the screenshot first.
2. **Button, measure and propose only.** No code, no Figma, no new branch yet. From `adriadi/portfolio` (`before-system`, `f143a85`), measure every button and the navigation links: padding, height, font size and weight, letter spacing, radius, border, shadow at rest and on hover, hover/active/focus/disabled/loading styles, transitions. Then propose, for each of the three variants:
   - size: padding and minimum height, in existing spacing and type tokens; whether one size is enough or the site needs a small size too,
   - touch target: whether to aim for 24px (WCAG 2.5.8, AA) or 44px (2.5.5, AAA), with the visual cost of each,
   - each state: what changes (colour role, shadow, transform), from existing tokens only; name any role or token that's missing instead of using a value,
   - loading: what it looks like and how it's announced to screen readers,
   - shadow: at rest and on hover, or none (the measurement showed a navy rest shadow and a gold hover glow),
   - the `link` variant: how it differs from a plain text link in body copy, and its focus and hover,
   - on a dark surface: what each variant becomes (primary switches by itself; check `secondary` and `link` contrast on navy),
   - the HTML: `<button>` vs `<a>` for each variant, and the class names (`fds-button`, modifiers).

## Report

`REPORT.md` with the ID `B-005`: commit and screenshot for task 1, then the measurements as tables and the proposal, with numbered questions (options, recommendation, reason). Push to `handoff` and stop.
