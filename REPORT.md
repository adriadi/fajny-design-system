# B-021 · Report

## Commits and build

New branch `components/card` from `main` (`4fe1a6c`), pushed, not merged:
- **`b5ed22a`** "Rename border-width.control to border-width.default (decision 64)"
- **`d29fa44`** "Add the Image and Card components (decisions 62, 63)"

`npm run build`: exit 0, all **16** steps pass:
- the 4 checks (46 contrast pairs, 4 stylesheets tokens only);
- `tokens.css`;
- the Button, Input and Card previews;
- 8 Figma files.

## Tokens

- **`border-width.control` → `border-width.default`.** Value 1.5px. Description: "The one border width (decision 64): controls, cards and dividers. Thick enough to read at 2.2:1 on beige." Renamed everywhere:
  - `button.css`, `input.css`;
  - the Button, Input and foundations Figma scripts;
  - `docs/button.md`, `docs/input.md`;
  - the `color-border-highlight` description.

  No reference to the old name is left.
- **No new token.**
- **`tokens.css` has two new generated blocks** for elements that are a surface of their own (decision 62):
  - **Default card** (`.fds-card:not(.fds-card--dark)`): brings back the light value of every switched role, so inside `.fds-surface-dark` it stays white with navy text. The values come from the tokens themselves (`var(--fds-navy-900)` …), written by the build, not by a component.
  - **Dark card** (`.fds-card--dark`): always takes the dark values.
  - **Focus colour:** set on the card's children only, so the card's own ring, drawn outside it, keeps the colour of the surface around it: navy on light, gold on dark. Its children (a Button in a card that isn't a link) get the card's own focus colour.
  - **Where it lives:** the selectors are listed in `scripts/surfaces.js` (`LIGHT_ELEMENTS`, `DARK_ELEMENTS`, `OUTER_ROLES`), next to the dark-surface table the contrast check already reads (question 5).

## Figma

- **Variable rename:** the `border-width/control` variable is renamed to `border-width/default` **in place** (a one-off rename through MCP), so every binding kept working.
  - It's a Tokens Studio collection. When you next import `tokens-studio.json`, Tokens Studio finds the variable under its new name, and its description is already the new one.
  - Read back: the file has only `border-width/default` (`VariableID:38:4`).
- **The generated files ran unchanged:**
  - `image-component.js`: created the Image component (`103:3`, 320×200, 16:10) and the Image page.
  - `card-component.js`: created the Card set (`104:234`), 20 variants and 7 properties. I ran it a second time after fixing "Read more" wrapping onto two lines: 20 updated, 0 created, the same IDs.
  - `button-component.js`: 22 updated, 0 created, the same IDs.
  - `input-component.js`: 20 updated, 0 created, the same IDs.
  - Not run: `color-collection.js`, `typography-collection.js` and `foundations-pages.js`. They changed only in the page-group list (and foundations in the border-width name); the Corner radius boxes kept their binding through the in-place rename.
- **Page order read back:** Colors, Typography, Spacing, Corner radius, Shadows, `---`, Button, Input, Image, `---`, Card. The second separator was added by the scripts, as decision 58 says.
- **The Card set:**
  - Image (No, Yes) × Link (Yes, No) × Style (Default, Dark) × State. A linked card has Default, Hover, Focus and Active; a card that isn't a link has Default only.
  - Text properties: Overline, Title, Text, Meta. Switches: Show overline, Show text, Show meta.
  - The card with an image nests the Image component; its top corners take `radius/lg` from the card.
  - **"Read more" is text, not a Button instance.** It uses the `label` style and the link button's colours (`color-text-muted`, `color-text` on hover). It isn't a button in code either, and an instance would carry a button's states and focus ring that don't belong there.
  - **Lift:** `space/1` of padding that moves from the top (rest) to the bottom (hover and active), so the card shifts up 4px inside a variant of constant height.
  - **Colour modes:** the card frame carries its own mode (Light surface or Dark surface). The focus ring sits outside it, so it takes the mode of where the card is placed, gold on a dark surface, as in code.
- **The Image page:** the purpose, the component, and the export sizes, all from `docs/image.md`.

## Screenshots

- `figma-image.png`: the Image page. The component's sand-100 placeholder is very faint on the sand-50 page, and the page screenshot leaves out the floating component frame.
- `figma-card.png`: the Card page, with the set at the top and "Variants" on the three surfaces. The page screenshot shows only part of the floating set frame.
- `figma-card-set.png`: the component set on its own: every variant and state.
- `card-preview.png`: the preview, with every variant on the page background, the subtle surface and the dark surface, plus the linked card's states held at rest.

## What was checked in the preview

- **Titles:** the default card's title is Syne 500, 22px, navy on every surface, including inside the dark surface. The dark card's title is sand.
- **Focus ring:** on the dark surface it's gold; on light, navy.
- **Hover lift:** −4px. With "Reduce motion" on, the lift is gone and the shadow stays.
- **Linked card:** pointer cursor, one tab stop (the title link), and the link's name is the title.

## What to check, and where

1. **`docs/card-preview.html`** in a browser:
   - hover the linked cards on each surface;
   - tab through: one stop per linked card, the ring around the whole card;
   - turn on "Reduce motion".
2. **Figma, Card page:** the set; and on an instance, the four text properties and three switches in the right panel. Also check the dark cards in the "Dark surface" frame (question 1).
3. **Figma, Image page:** swap the placeholder fill for a picture on an instance; the 16:10 ratio and the card's corners should hold.
4. **Tokens Studio:** re-import `tokens/figma/tokens-studio.json`; it should update `border-width/default`, not add a second variable.

## Questions

1. **The dark card inside a dark surface.** Its fill is the surface's own navy (1.00:1), so only its border shows, `color-border-on-dark` (navy-800) at 1.34:1. You can see the faint outline in the preview and on the Figma page.
   - A: the dark card is for light surfaces only (the docs say so); inside a dark surface, use the default card.
   - B: a new role for the dark card's fill on a dark surface, e.g. navy-800 (1.34:1 against the surface; text 7.45:1, muted 4.65:1).
   - C: a stronger border for the dark card, e.g. `color-border-highlight` (navy-300), 4.54:1 on navy.

   **Recommendation: A.** The dark card exists to stand out on a light page; on a dark page the default card already does that. B and C add roles for a case no page has today. B's muted text at 4.65:1 passes but narrowly.
2. **Export sizes for Image** (written in `docs/image.md`, to confirm).
   - A: 1600×1000 as `src` and 800×500 in `srcset`. Sharp on a 2× screen up to 800px wide: wider than a card in a two-column grid, and the width of a single card column just under 900px.
   - B: one size only, 1600×1000.
   - C: add 2400×1500 for full-width images up to 1200px.

   **Recommendation: A.** It covers every card width the site has. The small file keeps phones fast; C is for full-width images, which no component has yet.
3. **New element classes** not named in the B-020 proposal:
   - `fds-card__footer`: holds meta, "Read more" or an action at the bottom, so cards in a row line up.
   - `fds-card__more`: "Read more".
   - `fds-card__hidden`: visually hidden text for "(opens in a new tab)".
   - A: keep them (built).
   - B: other names.

   **Recommendation: A.** They follow the `fds-card__*` pattern. `fds-card__hidden` is card-scoped because the system has no general visually-hidden class yet; if another component needs one, a shared class would replace it.
4. **Image loading colour.** While a picture loads, or if it fails, the frame shows `color-surface-subtle`.
   - A: keep it (built).
   - B: no colour (transparent).

   **Recommendation: A.** The card keeps its 16:10 shape visibly, and it matches the Figma placeholder.
5. **Where the card's surface rule lives.** The selectors `.fds-card:not(.fds-card--dark)` and `.fds-card--dark` are listed in `scripts/surfaces.js`, and the build writes their role blocks into `tokens.css`.
   - A: keep it there (built). The surface table stays the one place that decides which roles switch, and the contrast check reads the same file.
   - B: generic `.fds-surface-light` and `.fds-surface-dark` classes that a card adds in its HTML.

   **Recommendation: A.** The card does it "for itself" (decision 62), with no extra class for an agent to forget.
6. **Card width in Figma.** The components are 360px wide by default (Input is 320); in code a card is as wide as its grid cell.
   - A: keep 360 (built).
   - B: 320, the same as Input.

   **Recommendation: A.** 360 leaves room for a two-line title and a 16:10 image of a useful size; designers resize the instance anyway.
