# B-021 · Build Image and Card

## Owner's answers to B-020

Decisions 62, 63 and 64 in `DECISIONS.md` on `main` (`git pull`). In short:

1. **Card surfaces:**
   - **Default card:** always white with dark text, on any surface. Inside `.fds-surface-dark` it brings back the light roles for itself, so it looks the same as on a light page.
   - **Dark card:** a second variant, `fds-card--dark`, for a designer to choose on purpose; nothing switches it automatically.
2. **One border width, 1.5px**, for controls, cards and dividers. Rename `border-width.control` to `border-width.default` everywhere: the token, its description, Button, Input, the Figma variable and the docs.
3. **Hover on a linked card:** lift by `space-1` (4px) plus the decision 40 shadow. Reduced motion removes the lift.
4. **Hover on a dark surface:** the same as 3, no gold border.
5. **Image ratio 16:10.** The image is its own component, **Image** (decision 63), nested in the Card with an image.
6. **New-tab links:** A. A visible ↗ plus visually hidden "(opens in a new tab)".
7. **"Read more":**
   - It's visible on every linked card, and the whole card stays one link with one tab stop.
   - "Read more" looks like the link button but isn't a link or a button. It's hidden from screen readers (`aria-hidden="true"`), because the title is the link's name.
   - The whole card has `cursor: pointer`.
8. **Layout:** the image on top.

Everything else follows your B-020 proposal: anatomy, stretched link, non-linked card without hover, padding `space-6`, gaps, equal heights, `radius-lg`, class names. The image rules move from Card to Image.

## Tasks (system repo, new branch `components/card` from `main`, Figma through MCP)

1. **Tokens:**
   - The border width rename, as in answer 2. Its description says it's the one border width for controls, cards and dividers.
   - The build checks must pass. Re-run the Button and Input Figma files so their variables and bindings follow the rename.
2. **Image** (`components/image.css`, `docs/image.md`, Figma page "Image"):
   - `fds-image`: 16:10 through `aspect-ratio`, `object-fit: cover`, centred.
   - **Docs:** the ratio, the alt rules, lazy loading with `width` and `height`, never text in the image. Also **the export sizes**: what pixel size to prepare for a card image, so it's sharp on 2× screens at the widest a card gets. Propose the sizes in the report.
   - **Figma:** an Image component, a 16:10 frame with a neutral placeholder fill a designer swaps for a picture. Radius comes from where it's nested (the card's top corners), not from Image itself, unless you see a reason otherwise.
   - The Image page shows the ratio and the export sizes as documentation (decision 58 pattern).
3. **Card** (`components/card.css`, `docs/card.md`, `docs/card-preview.html` through a script, Figma page "Card"):
   - **Variants:**
     - text only and with an image;
     - linked and not linked;
     - default (white) and `--dark`.
   - **States:**
     - linked: default, hover, focus, active;
     - not linked: default only.
   - **Focus:** the system ring on the whole card. It sits outside the card, so on a dark surface it's the gold `color-focus` of that surface.
   - **New tab:** the docs show a new-tab card with the ↗ and the hidden text.
   - **Preview:** every variant on `color-background`, on `color-surface-subtle` and inside `.fds-surface-dark`. The hover lift and the reduced-motion case can be tried there.
   - **Figma:**
     - The Card with an image nests the Image component.
     - "Read more" is the link Button style as text; it isn't a Button instance unless that's how Figma shows it best (say which you chose).
     - Decision 58 puts components that nest others in **Advanced**, so Card goes in Advanced, and Image in Regular after Input. Run the real generated files.
4. Run `npm run build`. Commit and push `components/card`. **Don't merge.**

## Things to bring back as questions (don't decide them)

- **The dark card inside a dark surface:** navy on navy. How it stays visible (a border role, a different fill), with options and a recommendation.
- **The export sizes for Image.**
- Anything else decisions 62–64 and the B-020 proposal don't settle.

## Report

`REPORT.md` with the ID `B-021`. It needs:
- commits and the build result;
- what changed in the tokens;
- screenshots of the Figma Image and Card pages and of the card preview (all three surfaces);
- what the owner should check and where;
- the questions.

Push to `handoff` and stop.
