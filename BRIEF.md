# B-007 · Finish the portfolio token update, then the Button values

## Owner's review of B-006

The migrated site looks good. Every judgement call in question 5 stays. The other answers are decision 54 (`DECISIONS.md` on `main`, pulled into the system repo). Button details are decision 53.

## Tasks

### A. Portfolio, branch `design-system/tokens`

1. **Hero blobs:** each drifts once in about 4 seconds, then rests (decision 42). Off under reduced motion, as now.
2. **Allowed decoration:** the see-through colours (glows, blobs, translucent nav and menu backgrounds, scrims, tints on dark) stay as literals. Mark them `Decoration, not a token` in the code instead of `No token`, and add a short "Allowed literals" note to the portfolio's README or the top of `styles.css`.
3. **The two solid colours outside the palette:** the ghost section number `#E6E0D6` and the green "available" dot. Propose the nearest existing role for each in the report, with the contrast or the visual difference. Don't change them yet.
4. **Curaay chart:** competitors in a neutral palette role, Curaay in navy. Propose which neutral role in the report, then apply it.
5. **Password page h1:** `heading`.
6. Leave everything else in questions 2, 6 and 7 as it is.
7. Fresh "after" screenshots of the changed pages only, to `~/fajny-screenshots/after/`. Local only, as before.
8. Commit and push the branch. **Don't merge, don't deploy.** After the owner's check, this branch is merged and uploaded.

### B. Button, values only (system repo, no code yet)

Decision 53 fixes the structure. Propose the values, from existing tokens where possible:

- `label` type role: size (mobile and desktop, `clamp()` in rem, within the 2.5× rule), line height, weight 500, letter spacing 0.06em, uppercase; and whether navigation links use the same size as buttons.
- Text role for `secondary` that stays navy on every surface: name and value, contrast on `surface-highlight` on both surfaces.
- `secondary` border: confirm `color-border-highlight`, width (1px or 1.5px).
- Two hover roles: dark-surface primary hover, and secondary hover. Names, values, and contrast of the text on each.
- Disabled opacity: name and value; contrast is exempt, but say how it looks on both surfaces.
- Navigation button: visual height and padding, and the 48px hit area.
- The full state table for each variant on both surfaces, using only these tokens.

## Report

`REPORT.md` with the ID `B-007`: commits for A, the proposals for A3 and A4, the Button values for B as tables, and numbered questions. Push to `handoff` and stop.
