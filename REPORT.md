# B-034 · Merge Highlight into main

## Result

- Merge commit: `3efeccd` ("Merge components/highlight: the Highlight component and the quote text role"), made with `--no-ff`.
- `main` was pulled first (fast-forward, one line added to `DECISIONS.md`), then merged: no conflicts.
- `npm run build` on `main`: exit 0. 47 contrast pairs pass AA, 12 type roles complete, 7 component stylesheets use tokens only plus 3 marked decoration lines, all 7 previews and all Figma scripts regenerated.
- The build changed no files: the working tree stayed clean afterwards.
- `main` pushed to `origin`.
- `components/highlight` kept, not deleted.

## main now has

`components/` holds `button.css`, `input.css`, `image.css`, `card.css`, `tag.css`, `navigation.css` (+ `.js`) and `highlight.css`: Button, Input, Card, Tag, Navigation and Highlight, plus the Image they build on. The twelfth text role (`quote`) and the `font.style` token group came with it.

## Anything off

Nothing differed from the branch build. No new warnings.
