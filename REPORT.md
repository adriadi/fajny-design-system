# B-024 · Report

## Task 1: the solid background

**Figma only; the browser was already correct.**

- **Cause:** `scripts/build-figma-card.js` set `comp.fills = [color/surface-dark]` on every Style=Dark variant, so the opaque navy was a fill of the component itself and every instance inherited it. The B-022 "backdrop in the frame" was in fact on the component. Nothing else gave the card a fill.
- **Fix:** variants have no fill (`fills` is empty on all 10 Dark variants, checked after the run). The sheen is a gradient on the inner `card` layer. The dark backdrop now lives only in surrounding frames: the "Dark surface" frame in Variants (already separate) and a new rectangle "Dark surface backdrop" in the "Component set" frame, behind the set and covering the Dark rows. The set itself has no fill either.
- **Preview check (real browser, `docs/card-preview.html`):** `.fds-card--dark` computed `background-color` is `rgba(0, 0, 0, 0)`; its `::before` is `linear-gradient(to right bottom, white, transparent)` at opacity 0.105, over the surface's `rgb(27, 58, 107)`. No `fds-card--sheen` left, no "prototype" text on the page.

## Task 2: B-023

- B only: the sheen is folded into `.fds-card--dark`; `.fds-card--sheen` and the flat-veil path are removed (CSS, preview script, generated preview).
- Figma: A/B framing removed; one "Secondary card" row in the Dark surface frame. `card-component.js` was run for real on the Card page (20 variants updated, none created). The set description now says "diagonal sheen" and cites decision 68.
- `docs/card.md`: the secondary card is described as the sheen; contrast table has one secondary column (title 7.33:1, muted text 4.58:1).
- Preview: one "Secondary card" panel.
- `duration` $description: the exact text from the brief. `foundations-pages.js` doesn't show it, so it wasn't re-run.

## Commits

- Cleanup on `components/card`: `f9dd498` (pushed).
- Merge into `main` (`--no-ff`, no conflicts, `main` pulled first): `ab98fa5` (pushed). `components/card` kept.
- `npm run build` on `main` after the merge: exit 0, all steps pass, working tree clean afterwards.

## Notes

- The `PLAN` literal at the top of `card-component.js` was pasted with condensed whitespace into `use_figma` (same data), as in the last run.
- Figma file: Fajny Design System; Card page, "Dark surface" frame node `122:1039`.

## Check

Figma, Card page: Variants → "Dark surface" → "Secondary card" row (screenshot `figma-card-dark.png`: translucent cards, sheen at the top left), and the Dark rows of the Component set. Preview: dark surface panel, "Secondary card".

## Questions

None.
