# B-051 · 4th project card, "Coming soon" (decisions 93 and 94)

Portfolio branch `portfolio/fajny-ds-card`, commit on top of the owner's image commit `3218e03`, pushed, not merged.
Design system branch `components/card-footer-row`, commit `da4fd29` (see part 5a), pushed, not merged.

## 1. The 4th entry
Added to `PROJECTS` after HAWK AI, with the values from the brief (no `link`; `color` and `accent` as given; they aren't used by the card, which colours itself from the tokens). Image `images/fajny-ds-palette-teaser.png` (1687×949) is the one already on the branch.

## 2. `ProjectCard` with no `link`
Branches on `project.link` in three places: the badge, the title (plain text, no `<a>`, no `fds-card__link`) and the "Read case study" span. Measured on the 4 cards at 1280px: cards 1 to 3 have a link, badge and "more"; the new card has none of the three, and its tag, description, label and image are as on the others.

## 3. Image attributes
`width="1687" height="949"`, matching the real size of the four images.

## 4. Grid
2 columns of 580px at 1280px (two rows of two), 1 column of 358px at 390px, as decision 88 intends. No horizontal overflow at 390px.

## 5. Decision 94
- **a) Footer as a row.** In the design system I changed `.fds-card__footer` to `flex-direction: row; align-items: center; justify-content: space-between` and updated the comment above it. I left the `.fds-card__footer > .fds-card__meta { margin: 0; }` rule. I also added one sentence to `docs/card.md` ("The footer is one line: the meta on the left, 'Read more' on the right"). `npm run build` passes and regenerated `docs/card-preview.html`. Then I ran `scripts/sync-tokens.sh`, which copied from the design-system branch commit `da4fd29`. That commit is on the branch, **not on `main`**, so the portfolio's `fds/*.css` headers name a commit that `main` doesn't have until the owner merges `components/card-footer-row`. Every other `fds/` file and `tokens.css` changed only in that header comment. Measured: on all three linked project cards meta and "Read case study" are on one line (meta 26px from the left edge, "more" 26px from the right); the three Medium cards look the same (screenshots). The LinkedIn card's footer has only the "more" span and looks right.
- **b) Arrow.** The visible `↗` is gone from the article titles. I kept a `{' '}` between the title and the visually hidden "(opens in a new tab)", so the spoken name doesn't run the two together; it has no visual effect. Checked: no title contains `↗` and all three still have the hidden text.
- **c) Descriptions.** "Curaay - ", "SKYFLD - " and "HAWK AI - " removed from the start; the rest of each string is unchanged.

## Screenshots
`b051-1-grid-desktop.png` (the 2×2 grid), `b051-2-new-card-desktop.png`, `b051-3-articles-desktop.png`, `b051-4-new-card-mobile.png`, `b051-5-grid-mobile.png`, `b051-6-articles-mobile.png`.

## Flags
1. **The teaser image is cropped at the sides.** The image is 1.78:1 and the card crops to 16:10, so the leftmost and rightmost swatch labels are cut ("avy/100", "old/800" in `b051-1-grid-desktop.png`). I didn't change the image (you said not to). Options: a 16:10 export, or a version with more margin at the sides.
2. **The Figma card script still has a vertical footer.** `scripts/build-figma-card.js` builds the footer as a vertical frame, so the Figma Card page doesn't show the row layout yet. The brief didn't ask for the Figma change, so I left it; say if you want it as its own brief.
3. **Merge order.** The design-system branch must merge to `main` before the portfolio branch, so the commit named in `fds/` exists.
4. The `{' '}` in the article title (above).
