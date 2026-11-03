# B-012 · Report

## Commits

- `components/button` of `adriadi/fajny-design-system`: **`e34a9e4`** "Figma pages in groups with separators, no clipping, Button set in one column", pushed (`a7e0927..e34a9e4`). Not merged.
- `npm run build` passes all 11 steps; `tokens/css/tokens.css` is unchanged.

## The real generated files ran

No size limit got in the way: `use_figma` accepts up to 50,000 characters, and the largest file, `color-collection.js`, has 24,166. I passed each file's full text, unchanged, in the README order:

1. `color-collection.js`
2. `typography-collection.js`
3. `foundations-pages.js`
4. `button-component.js`

The first run of `button-component.js` showed two problems on the Button page, so I fixed the generator, rebuilt, and ran the new file again. The run in Figma is the committed `tokens/figma/button-component.js`.

- **The main components rendered black again.** A bound paint also stores a fallback colour, and Figma draws main components with it. The script left it at the black placeholder. The script now sets each fallback to the colour the variable resolves to on the light surface. The variable stays bound, so instances still switch with their surface.
- **The page frame was narrower than its content.** It now takes the width of its content.

## Pages, as read back from Figma

1. Colors
2. Typography
3. Spacing
4. Corner radius
5. Shadows
6. `---` (your separator, `63:288`, kept and reused)
7. Button

The scripts own the order and the separators: every run reuses existing separators, adds a missing one and removes an extra empty one. The separator before Advanced will appear once an Advanced page exists. The groups are listed in `scripts/figma-doc-layout.js`, and Button is in Regular.

## Clipping

Every frame and section the scripts create has "Clip content" off, the main components and the component set included. A read-back of all seven pages found no frame that clips. Instances are left alone: they follow their main component.

## Button page

- **New section:** "Component set", with the subtitle "Three variants, one navigation size, every state from the element itself." (the second sentence of `docs/button.md`).
- **Layout:** the set is one column, in plan order (Primary, Secondary, Link, Navigation, each through its states). Each variant has a label to its left, e.g. "Primary · Main · Focus".
- **Variant IDs:** unchanged, 22 updated and 0 created; the set is `41:68`.

  ```
  41:2  41:5  41:8  41:11 41:14 41:17 41:20 41:23 41:26 41:29 41:32
  41:35 41:38 41:41 41:44 41:47 41:50 41:53 41:56 41:59 41:62 41:65
  ```

## Typography specimen subtitle

The README has a new "Typography" section with a "Specimen" line, and `build-figma-type.js` reads the subtitle from it. If the line is missing, the build fails.

## Screenshots

- `figma-button.png`: the Button page. The labels next to the set are missing from this screenshot only. The set sits on top of its placeholder as a separate frame, and the screenshot of the page frame includes the set but drops the labels. On the canvas they're there.
- `figma-button-set.png`: the set's frame on its own, with the labels.
- `figma-shadows.png`: the Shadows page. The shadows are no longer cut off at the sample's edge.

The other pages kept their layout; only clipping changed.

Worth knowing: on the Shadows page, the `shadow/overlay` sample's shadow now reaches past the bottom of the page frame, because nothing clips it any more.

## Questions

1. **Fixed labels in the scripts.** Section titles and labels are still set in the scripts, not read from a document. These are "Surfaces switch the roles", "Palette", "Specimen", "Component set", "All components", the Typography table headers, "(code only)" and "n/a". Every sentence (the subtitles and descriptions) comes from the repo.
   - A: Keep them in the scripts as fixed names of the page structure. Decision 58 already names "All components".
   - B: Move them into a repo document (e.g. a "Figma pages" table in the README) and have the scripts read them.

   **Recommendation: A.** They're names of the page structure, not explanations, and a document kept only for them would duplicate the scripts.
2. **"Component set" title size.** It uses the smaller subheading style, the same as "All components", because both sit under the page title "Button".
   - A: Keep it.
   - B: Use the larger heading style, the same as the page title.

   **Recommendation: A.** The two sections sit side by side and match.
