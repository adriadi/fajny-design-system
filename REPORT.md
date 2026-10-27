# B-002 · Report

## 1. Pull `figma/modes`: done

`figma/modes` is at `92eb3d3`. `DECISIONS.md` starts with "# Decision log · Fajny design system" and ends with decision 48.

## 3. README status line on `main`: done

`1c2ede6` "README: first version planned for 12 November 2026 (decision 21)", pushed to `main`. One line changed: "first version planned for Thursday 12 November 2026." Nothing else on `main`.

## 2. Type tokens: proposal only, nothing added

### Today

`tokens/typography.tokens.json` gives each role four tokens by property: `font.size.<role>`, `font.line-height.<role>`, `font.weight.<role>`, `font.letter-spacing.<role>`. The family is the exception: `font.family.display` (Syne) and `font.family.body` (Inter) are named after two roles but used by nine, and which role uses which is only in their descriptions. Overline's uppercase is only in the description of `font.size.overline`.

`display` and `body` are both a family name and a role name today, so `font.family.<role>` can't be added next to them without a clash.

### Proposal A: typefaces as primitives, family per role as aliases (recommended)

Same split as the colours: primitives named by what they are, roles named by purpose.

```json
"typeface": {
  "$type": "fontFamily",
  "syne":  { "$value": ["Syne", "sans-serif"],             "$description": "Display typeface. Roles use it through font.family.<role>, never directly." },
  "inter": { "$value": ["Inter", "system-ui", "sans-serif"], "$description": "Text typeface. Roles use it through font.family.<role>, never directly." }
},
"family": {
  "$type": "fontFamily",
  "display":    { "$value": "{font.typeface.syne}" },
  "title":      { "$value": "{font.typeface.syne}" },
  "heading":    { "$value": "{font.typeface.syne}" },
  "subheading": { "$value": "{font.typeface.syne}" },
  "card-title": { "$value": "{font.typeface.syne}" },
  "lead":       { "$value": "{font.typeface.inter}" },
  "body":       { "$value": "{font.typeface.inter}" },
  "small":      { "$value": "{font.typeface.inter}" },
  "overline":   { "$value": "{font.typeface.inter}" }
}
```

Both groups live inside `font`, next to `size`, `line-height`, `weight` and `letter-spacing`. CSS output (Style Dictionary keeps aliases as `var()`):

```css
--fds-font-typeface-syne: Syne, sans-serif;
--fds-font-typeface-inter: Inter, system-ui, sans-serif;
--fds-font-family-display: var(--fds-font-typeface-syne);
...
--fds-font-family-overline: var(--fds-font-typeface-inter);
```

`--fds-font-family-display` and `--fds-font-family-body` keep their names and their values, so nothing that reads them changes. They now mean "the display role's family" and "the body role's family", like every other `font-*-<role>` token.

### Overline's uppercase

```json
"text-transform": {
  "overline": { "$value": "uppercase", "$description": "Overline is always uppercase. Write the text in sentence case; the style makes it uppercase, so screen readers don't spell it out." }
}
```

CSS: `--fds-font-text-transform-overline: uppercase;`. Named after the CSS property, so the token maps to one line of CSS. The Figma script turns `uppercase` into the text style's `textCase: UPPER`. Only overline gets one (see question 2). No `$type`: the W3C format has no type for it (see question 3).

### What changes in descriptions and the README

- `font` group description: each role has size, line height, weight, letter spacing **and family** tokens; overline also has a text-transform token.
- The typeface descriptions stop listing roles (that's now in `font.family.<role>`).
- `font.size.overline`: "Always set in uppercase" becomes a pointer: "Uppercase through font.text-transform.overline."
- README: the "Use the tokens" example stays; one sentence added that every role has its family as `--fds-font-family-<role>`, and a component uses those, never `--fds-font-typeface-*`. Same rule as `-on-dark` and primitives in colour.

### Build check

A new `scripts/check-type.js`, run with the contrast and zoom checks before `tokens.css` is written. It fails when:

- a role in `font.size` has no `font.family`, `font.line-height`, `font.weight` or `font.letter-spacing` token,
- a `font.family.<role>` isn't an alias of a `font.typeface.*` token,
- a `font.family`, `line-height`, `weight`, `letter-spacing` or `text-transform` token names a role that isn't in `font.size`.

The Figma typography script reads the same tokens, so a role can't get a text style without a family.

## Questions

1. **Typeface primitives: names and group.**
   - A: `font.typeface.syne` and `font.typeface.inter`, roles alias them as `font.family.<role>` (above).
   - B: keep `font.family.display` and `font.family.body` as they are, and put the per-role aliases in a new group, e.g. `font.role-family.<role>`.
   - **Recommendation: A.** One pattern for every role property (`font-<property>-<role>`), the same primitives-and-roles split as colour, and the two existing CSS names keep their values. B leaves "display" meaning both a typeface and a role.

2. **Text transform for overline only, or for all 9 roles?**
   - A: only overline.
   - B: all 9, with `none` for the other eight.
   - **Recommendation: A.** CLAUDE.md: add a token only when something needs it now. The build check treats text-transform as optional.

3. **No `$type` on the text-transform token?**
   - A: no `$type`; Style Dictionary passes the string through.
   - B: a custom type such as `"textTransform"`.
   - **Recommendation: A.** The W3C format has no such type, and a made-up one would look standard when it isn't. I'll confirm Style Dictionary and the checks accept a token without a type when it's added.
