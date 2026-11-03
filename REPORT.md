# B-011 · Report

## Commits

- `components/button` of `adriadi/fajny-design-system`: **`a7e0927`** "Build the Figma file as documentation (decision 58)", pushed (`eba6f0d..a7e0927`). Not merged.
- `npm run build` passes all 11 steps; `tokens/css/tokens.css` is unchanged.

## Pages, as read back from Figma

1. Colors
2. Typography
3. Spacing
4. Corner radius
5. Shadows
6. Button

These six pages are the only ones in the file. "Type check" and "Button check" are deleted, and so is the empty "Page 1" that the file had.

| Page | Written by | What it shows |
| --- | --- | --- |
| Colors | `color-collection.js` | The 25 roles in the README groups (text, surfaces, lines and focus, actions, status). Each group appears on a light and a dark surface, with chip, name, primitive and description. Also how surfaces switch the roles, and the palette marked not for direct use. |
| Typography | `typography-collection.js` | The 10 roles, `label` included, with what each is for, family, size from 390 to 1280px, line height and letter spacing. Then the specimen at 390 and 1280px, on light and dark. |
| Spacing | `foundations-pages.js` (new) | 13 fixed steps as bars bound to the variables, plus `space-gutter` and `space-section`, which are fluid and code only. |
| Corner radius | `foundations-pages.js` | 4 radius variables as boxes bound to them, plus `radius-round`, which is code only, with the README note. |
| Shadows | `foundations-pages.js` | 4 cards with the `shadow/*` effect styles, value and description. |
| Button | `button-component.js` | The heading and purpose from `docs/button.md`. Beside the component set, a smaller "All components" section on a light and a dark surface. |

Each page has a title and a one-sentence subtitle, both from the repo.

## Button variant IDs

The same before and after: 22 updated in place, 0 created. The set is `41:68`.

```
41:2  41:5  41:8  41:11 41:14 41:17 41:20 41:23 41:26 41:29 41:32
41:35 41:38 41:41 41:44 41:47 41:50 41:53 41:56 41:59 41:62 41:65
```

## Worth knowing

- **The main components rendered black on the Button page.** A main component shows its bound colours only inside a frame that sets the colour modes. So the set now sits in a frame called "Component set", set to Light surface and Desktop. The script keeps that frame on each run. Instances elsewhere are unaffected.
- **Text added to the repo so the pages could take their text from it:**
  - a "Colour roles" table in the README (groups, roles, what they're for);
  - the sentence under "States" in `docs/button.md`: "Every variant in every state, on a light and a dark surface.";
  - a `$description` on the radius group in `dimension.tokens.json`.
- **Tokens Studio recreated the empty `shadow` collection**, and the colour script deleted it again, as it does on every run.
- **How the scripts ran:** I ran shortened copies of the generated scripts in Figma through the MCP. They do the same thing as the generated files.

Screenshots: `figma-colors.png`, `figma-typography.png`, `figma-spacing.png`, `figma-radius.png`, `figma-shadows.png`, `figma-button.png`.

## Questions

1. **Specimen subtitle.** The Typography specimen subtitle ("Real portfolio text in every role, on a 390px and a 1280px screen, on a light and a dark surface.") is a constant in `build-figma-type.js`. No repo document has that sentence yet; every other subtitle comes from a token description or a doc.
   - A: Keep it in the script.
   - B: Add the sentence to the README Typography section and have the script read it from there.

   **Recommendation: B.** Every subtitle then comes from a document, the same way as on the other pages.
