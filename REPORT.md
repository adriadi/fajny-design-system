# B-014 · Report

## Commits

- `components/button` of `adriadi/fajny-design-system`: **`2df4cce`** "Neutral example texts across the system", pushed (`a140fff..2df4cce`). Not merged.

## Build

`npm run build` passes all 11 steps, with 46 contrast pairs passing. `tokens/css/tokens.css` changed only in its description comments.

In Figma I ran the four generated files, full text and unchanged: `color-collection.js`, `typography-collection.js`, `foundations-pages.js`, `button-component.js`. The Button variant IDs are unchanged: 22 updated, 0 created, set `41:68`.

## What changed

1. **Typography specimen:** the ten texts from the brief, exactly as given.
2. **Button labels:** Continue, Learn more, Read more, Contact, and Loading… while loading. They're in the Figma set, `docs/button-preview.html` (through `scripts/build-button-preview.js`), `docs/button.md` and the usage comment in `components/button.css`.
3. **`docs/button.md` examples:** every replacement from the B-013 table.
4. **Token descriptions:** the 10 replacements, in the token JSON. After the rebuild they also appear in the CSS comments, the Colors, Spacing, Corner radius and Typography pages, and the `color` and `typography` variable descriptions.
5. **README:** the Specimen line now starts "Interface text in every role …".
6. **Comments in `scripts/build-figma-type.js`:** the comment above the samples is replaced, and so is the file's header line, which said "real portfolio text".
7. **Button page subtitle:** "A control that takes the user somewhere or does something." The script takes it from the first sentence of `docs/button.md`, so I changed it there and it stays on reruns.

**Tokens Studio:** the new descriptions for primitives, spacing and radius are in `tokens/figma/tokens-studio.json`, but Tokens Studio writes the variables in Figma itself. The variables in the `primitives`, `spacing` and `radius` collections will show the old descriptions until you re-import that file (Tools → Load from file). The documentation pages already show the new descriptions.

## Wrap check (390px frame)

Every text that wrapped before still wraps to at least two lines, and label stays on one line. Line counts, read from Figma:

| Role | Lines at 390px |
| --- | --- |
| display | 3 |
| title | 2 |
| heading | 2 |
| subheading | 2 |
| card-title | 2 |
| lead | 3 |
| body | 5 |
| small | 3 |
| overline | 2 |
| label | 1 |

## Search for portfolio text (task 7)

I searched every tracked file except `DECISIONS.md` for: Adrianna, case stud(y/ies), CV, portfolio, Let's talk, View my work, Download CV, Hawk, Curaay, Scouting, Calendly, typolog(y/ies), next-project, pain point, visitor and Send message. Two places came back:

- README "Why" section: left alone, as you said.
- `style-dictionary.config.js`, line 32, a code comment: "spacing and radius stay in px like the portfolio". See question 1.

I also checked "hero" and "contact": they appear in generic descriptions ("Hero and contact blocks.", "Alternate sections, e.g. the contact section.", "The landing page hero only"). These are common page parts, not portfolio examples, so I left them unchanged.

## Screenshots

- `figma-typography.png`: the Typography page with the new specimen.
- `figma-button.png`: the Button page with the new labels and subtitle.

## Questions

1. **Comment in `style-dictionary.config.js`.** It reads: "The built-in 'css' group minus 'size/rem': spacing and radius stay in px like the portfolio, and font sizes are already written in rem inside clamp(), which size/rem can't parse."
   - A: Change "like the portfolio" to "as authored", so the comment says why without naming a user: "spacing and radius stay in px as authored, and font sizes …".
   - B: Leave it.

   **Recommendation: A.** The reason the comment gives is the token values themselves, not the portfolio.
