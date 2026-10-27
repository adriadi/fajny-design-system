# B-003 · Add the type tokens, then build typography in Figma

## Owner's answers to B-002

1. **Names:** A. `font.typeface.syne` and `font.typeface.inter`, and `font.family.<role>` for all 9 roles as aliases of them.
2. **Text transform:** A, only overline (`font.text-transform.overline`).
3. **No `$type`** on the text-transform token: A.

Recorded as decision 49 in `DECISIONS.md` on `figma/modes` (`cbaecf7`). Pull it first.

Approved earlier and still in force: decision 47 (Figma typography: `typography` collection owned by a repo script, modes "Mobile" and "Desktop", variables `font/size/<role>`, 9 text styles named by role, line height and letter spacing as percentages on the styles, gold emphasis upright in Figma), decision 45 (one writer per collection), decision 44 (automate).

## Tasks (all on `figma/modes`)

1. **Type tokens.** Add them exactly as in your B-002 proposal: typefaces, family per role, overline's text transform, the updated descriptions and README sentence, and `scripts/check-type.js` run with the other checks before `tokens.css` is written. Confirm that Style Dictionary and the checks accept the text-transform token without a `$type`. If they don't, stop and report; don't add a type.
2. **Design system preview page.** Update the typography section so each role shows its family token and overline shows its text transform. Nothing else on that page.
3. **Figma typography.** Build `scripts/build-figma-type.js` as planned in B-001 with the answers above, run the generated script on the Figma file through MCP, then read it back.
   - If binding variables to text styles fails in `use_figma`, stop and report. Don't switch to two styles per role.
   - For the owner's visual check, add one page "Type check" with two frames side by side, one in the "Mobile" mode and one in the "Desktop" mode, each showing the 9 text styles with their role name. Nothing else on that page.
4. **README procedure:** add the typography script as the last step, next to the color script.
5. Commit and push `figma/modes`. **Don't merge.** Figma part 2 is checked and merged as one stage after this.

## Report

`REPORT.md` with the ID `B-003`: commits, build and check results, a table of the 9 roles (family, Mobile size, Desktop size, line height %, letter spacing %, text case) as read back from Figma, anything that couldn't be bound, and what the owner should check and where. Questions numbered, if any. Push to `handoff` and stop.
