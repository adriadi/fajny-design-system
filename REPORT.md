# B-003 · Report

## Commits on `figma/modes` (pushed, not merged)

| Commit | What |
| --- | --- |
| `6fc8ecc` | Type tokens: `font.typeface.syne` / `font.typeface.inter`, `font.family.<role>` for all 9 roles, `font.text-transform.overline`, updated descriptions, `scripts/check-type.js` |
| `0822644` | `scripts/build-figma-type.js` and the generated `tokens/figma/typography-collection.js`, `package.json` (type check and Figma step in the build), README (family rule, type check, Figma procedure and limitations) |

The `package.json` line that wires `check-type.js` into the build landed in the second commit, not the first, so `6fc8ecc` on its own has the script but doesn't run it. The branch tip is complete; I didn't rewrite history.

## 1. Type tokens

- Added exactly as proposed in B-002. CSS: `--fds-font-typeface-syne`, `--fds-font-typeface-inter`, `--fds-font-family-<role>: var(--fds-font-typeface-…)` for all 9 roles, `--fds-font-text-transform-overline: uppercase`. `--fds-font-family-display` and `--fds-font-family-body` keep their names and resolve to the same values as before.
- **The token without `$type`:** Style Dictionary builds it with no warning or error, and the contrast and zoom checks pass. No type was added.
- **Build results:** contrast 44 pairs pass; zoom 9 sizes pass; type 9 roles pass; tokens.css, tokens-studio.json (39 tokens, 5 sets), color-collection.js (22 roles), typography-collection.js (9 roles) all written.
- **Check tested by breaking it:** with `font.family.small` removed and `font.family.overline` set to a raw list, the build stopped:
  ```
  Type check failed (2):
    ✗ small has no font.family.small token
    ✗ font.family.overline is ["Inter","sans-serif"]: it must be an alias of a font.typeface.* token
  ```
  `tokens.css` was left untouched. Tokens restored, build passes.

## 2. Design system page

https://claude.ai/artifact/Edn3F15g33yNgdEDZNNR63, version 20. Changed only the typography parts:
- Each type style's note ends with "Family: fds-font-family-<role> (Syne|Inter)."; overline's note says "Uppercase through fds-font-text-transform-overline."
- The brand book's Typography section: two typefaces named by their tokens, "five tokens with its name" including `fds-font-family-<role>`, overline's `fds-font-text-transform-overline`, and a Family column in the role table.
- `lastChange` note updated. Nothing else changed (the other token families are byte-identical).

## 3. Figma typography

Generated script run on the Figma file through MCP. Binding font size to a variable on text styles **works** in `use_figma`: all 9 styles report `boundVariables.fontSize` = their `font/size/<role>` variable. Nothing failed to bind.

Read back from Figma (collection `typography`, modes `Mobile` and `Desktop`, 9 variables, scope `FONT_SIZE`):

| Role | Family | Mobile | Desktop | Line height | Letter spacing | Text case |
| --- | --- | --- | --- | --- | --- | --- |
| display | Syne Medium | 40 | 96 | 105% | −3% | original |
| title | Syne Medium | 36 | 72 | 110% | −2.5% | original |
| heading | Syne Medium | 32 | 52 | 110% | −2.5% | original |
| subheading | Syne Medium | 22 | 30 | 120% | 0% | original |
| card-title | Syne Medium | 18 | 22 | 130% | 0% | original |
| lead | Inter Light | 15 | 18 | 165% | 0% | original |
| body | Inter Regular | 15 | 16 | 170% | 0% | original |
| small | Inter Regular | 13 | 14 | 150% | 0% | original |
| overline | Inter Semi Bold | 11 | 12 | 130% | 12% | UPPER |

Figma stores line heights as floats (e.g. 104.99999523%); it shows them as 105%.

**What can't be bound:** nothing in this plan. Line height and letter spacing are percentages by decision 47, not bindings. Family, weight and text case are set on the style from the tokens.

Other collections unchanged: primitives 16, spacing 13, radius 4, focus 2, color 22 (Light surface | Dark surface). New: typography 9 (Mobile | Desktop).

**"Type check" page:** two frames side by side, `Mobile (390px)` with the typography mode set to Mobile and `Desktop (1280px)` set to Desktop, each with the 9 text styles showing their role name. Read back: the Mobile frame resolves 40, 36, 32, 22, 18, 15, 15, 13, 11 and the Desktop frame 96, 72, 52, 30, 22, 18, 16, 14, 12. The page was made with a one-off `use_figma` call, not by the generated script, so it isn't rebuilt after a token change; its text styles update on their own.

## 4. README procedure

Step 4 added: run `tokens/figma/typography-collection.js` after the color script. The writer table lists the typography collection and text styles. A short "known limitations" list: sizes only at 390 and 1280px, gold emphasis upright (no Syne italic), px at a 16px root and no fallback fonts in Figma.

## What to check, and where

1. **Figma, page "Type check":** the two frames. Each role's size, line height and tracking; overline in uppercase; Syne for the first five, Inter for the rest.
2. **Figma, Local variables → `typography`:** 9 `font/size/<role>` variables with Mobile and Desktop values as in the table.
3. **Figma, text styles panel:** 9 styles named by role; click one to see its size bound to the variable.
4. **Design system page, Typography:** the family per role in the notes and the brand book table.
5. **Repo:** `tokens/typography.tokens.json` and the built `tokens/css/tokens.css` on `figma/modes`.

## Questions

1. **The page's generated token card is out of date.** `project/api/tokens.md` and `project/tokens.css` on the design system page still show values from before the colour stage (e.g. `heading-md`, `radius-xl`, `shadow-md` "Primary button at rest"), while `project/tokens.json` is current. The type regenerates them "on every save and build"; publishing data files from here doesn't. Agents reading the system are told to read `api/tokens.md`, so they get old values.
   - A: you open the page and save it once, which should regenerate both files. Then I read them back and confirm.
   - B: leave it until the page is next saved.
   - **Recommendation: A.** It's one click and stops agents reading stale values; I didn't touch these files because B-003 allowed nothing else on the page.
