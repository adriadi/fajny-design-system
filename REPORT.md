# B-001 · Report

## 1. Handoff setup: done

- `main` pulled: `9307ce1` (CLAUDE.md with the "Handoff" section).
- Worktree created: `../fajny-handoff` on `handoff`, tracking `origin/handoff`.
- Nothing else changed. `figma/modes` is at `24a528f`, pushed, not merged. Its decision log already has decision 45 (`ae36198`); the owner's copy of `DECISIONS.md` was identical, so there was nothing new to commit.

## 2. Typography plan (proposal only, nothing written to Figma or code)

### What I checked (read-only)

- **Fonts in the Figma file:** both are available. Syne: Regular, Medium, SemiBold, Bold, ExtraBold, **no italic**. Inter: every weight, with italics. The file has no text styles yet.
- **Plugin API:** `TextStyle.setBoundVariable(field, variable)` binds `fontFamily`, `fontSize`, `fontStyle`, `fontWeight`, `letterSpacing`, `lineHeight`, `paragraphSpacing` and `paragraphIndent` (typings and Figma's own `figma-use` skill). One third-party note says this binding fails in headless `use_figma`; Figma's skill documents it as supported. The first run will settle it (see "Risks").
- **Units of bound variables:** a number variable bound to line height or letter spacing is applied in **pixels**. Percent isn't available through a variable (Figma forum, accepted answer; Frontend Masters). Unbound, a text style can store both as `PERCENT`.

### Collection and script (decisions 44 and 45)

- `scripts/build-figma-type.js` generates `tokens/figma/typography-collection.js` from `tokens/typography.tokens.json`, the same pattern as the color script. It owns the `typography` collection and the 9 text styles. Safe to run again.
- Modes: `Mobile` (390px) = each `clamp()` min, `Desktop` (1280px) = each max, rem × 16:

| Role | Mobile | Desktop |
| --- | --- | --- |
| display | 40 | 96 |
| title | 36 | 72 |
| heading | 32 | 52 |
| subheading | 22 | 30 |
| card-title | 18 | 22 |
| lead | 15 | 18 |
| body | 15 | 16 |
| small | 13 | 14 |
| overline | 11 | 12 |

- README procedure: build, import with Tokens Studio, run the color script, then the typography script.

### Variables and text styles

- **Font size:** a variable per role (`FLOAT`, scope `FONT_SIZE`), bound to the style. The only property that differs between Mobile and Desktop.
- **Line height and letter spacing:** see question 1. With percent on the style, line height 1.7 becomes 170% and −0.03em becomes −3%; Figma computes them from the bound size, so they're right in both modes. As variables they'd be px per mode: body line height 25.5 / 27.2, display letter spacing −1.2 / −2.88.
- **Family and weight:** the same in both modes, so the script sets them directly on the style (no variable). Figma names styles, not weights, so the script maps weight to style name per family: Syne 500 → Medium; Inter 300 → Light, 400 → Regular, 600 → Semi Bold. The build fails on a weight with no style name, and the Figma script throws if the font style isn't installed.
- **9 text styles**, one per role, with the token's description. The mode set on the frame (Mobile or Desktop) picks the size.

### What can't be bound or shown in Figma, and how I'd handle it

1. **Sizes between 390 and 1280px:** Figma has two points, not a curve. Noted in the README.
2. **Gold italic in Syne:** no Syne italic exists in Figma; browsers slant Syne synthetically, Figma can't. See question 4.
3. **rem and the browser's font size setting:** none in Figma; the px values assume the 16px default.
4. **Fallback fonts** (`sans-serif`, `system-ui`): Figma takes one family per style. Code only.
5. **Text colour:** not part of a Figma text style. It stays with the `color/text*` variables, as in code.

### Repeatable after a token change, and the build checks

- Every value is read from `typography.tokens.json`; the generated script updates existing variables and styles by name, creates missing ones, and lists Figma text styles that have no role in the tokens (it doesn't delete them).
- `npm run build` fails when a role in `font.size` is missing a line height, weight or letter spacing, a family (see question 2), or a weight → style name mapping. A new role without everything a style needs can't reach Figma.

### Risks

- If `setBoundVariable` on text styles fails in `use_figma`, styles can't switch with the mode. Fallback: two styles per role (`Mobile/…`, `Desktop/…`) with fixed sizes, which doubles the styles. I'd stop and report rather than switch on my own.

## Questions

1. **Line height and letter spacing: percent on the style or px variables?**
   - A: percent on each text style, not variables. One value per role, correct in both modes, identical to the token's ratio.
   - B: px variables per mode (18 more variables, decimals like 100.8).
   - **Recommendation: A.** Variables only add value when something changes between modes; these ratios don't, and px would lose the ratio from the tokens.

2. **Which family a role uses, and overline's uppercase, are written only in descriptions.** `font.family.display` says "display, title, heading, subheading and card-title" in prose; "Always set in uppercase" is prose too. A script can't read prose reliably.
   - A: add tokens that say it, e.g. a family alias per role and a text-case token for overline (names to be decided by the owner). Components in code need the same facts.
   - B: a mapping table inside the generator, checked by the build. Faster, but a second place that holds design facts (decision 25).
   - C: parse the descriptions. Fragile.
   - **Recommendation: A**, since the Button and other components will need the family per role in CSS too. If A, I'd propose the token names and values in the next report before adding them.

3. **Names.**
   - Variables `font/size/<role>` (mirrors the token path, like `color/text`), text styles named by role: `display`, `title`, … `overline`.
   - **Recommendation: as above**, one name per role in code and Figma.

4. **Gold italic in Syne.**
   - A: emphasis is gold and upright in Figma; documented as a known limitation.
   - B: another italic font for emphasis. A design change.
   - **Recommendation: A.** The rule that matters for accessibility (gold only at 24px+) still holds; the slant is a browser effect Figma can't reproduce.

Sources: [Figma forum: unit of number variables for line and letter spacing](https://forum.figma.com/t/what-is-the-unit-of-the-number-variables-for-line-and-letter-spacing/69837), [Frontend Masters: Figma typography variables](https://frontendmasters.com/blog/figma-typography-variables/), [Figma: working with variables](https://developers.figma.com/docs/plugins/working-with-variables).
