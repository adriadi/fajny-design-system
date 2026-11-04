# B-022 · Report

## Commits and build

Branch `components/card`, not merged:
- **`41986b0`** "Card: gold hover badge, secondary-card treatments, Image shimmer and case study sizes (decisions 65, 66, 67)", on top of `d29fa44`.

`npm run build`: exit 0, all **16** steps pass (46 contrast pairs, tokens only in 4 stylesheets, the three previews, 8 Figma files).

`components/card` is pushed to `origin` (the first attempt hit a GitHub server error; a retry went through).

Figma was updated through MCP by running the generated `tokens/figma/image-component.js` and `card-component.js` (Image page, Card page). One honest note on the method: the `PLAN` data literal at the top of the generated file was pasted with condensed whitespace (same data); the rest of each file is the generated text unchanged.

## 1. Gold hover badge (decision 65)

- **What it is:** a 40px circle (`space-10`) in `color-accent` (the palette gold, gold-500), with the new arrow icon (↗, `scripts/card-icons.js`, 24 grid, 1.5 stroke like the Input icons) in `color-text-on-accent` (navy). At the bottom right of the image, `space-4` from the right edge, overlapping the image by half and sitting on the body: `bottom: -space-4`.
- **When it exists:** only `.fds-card--image` that contains a `.fds-card__link`. Text cards, non-linked cards and the secondary card without an image have no badge (`display: none`).
- **Motion:** at rest `opacity: 0; transform: scale(0.7)`. On hover, press (`:hover`, `:active`) and keyboard focus it goes to `1 / none` with `duration-base` and `easing-standard`, the same as the lift and the shadow. Under reduced motion it still shows on hover, with `transition: none`, so it snaps in. `aria-hidden="true"`.
- **Colour choice:** I used `color-accent`, not `color-focus`, because the focus role switches by surface and the badge should be the same gold everywhere. Arrow navy on gold: **6.11:1**. The gold circle against the white card body is only 1.84:1; it's decoration (the title and "Read more" carry the meaning), so I treated it as not needing 3:1. Say if you want that handled differently (question 4).
- **Where to see it:** `docs/card-preview.html`, panel "Linked states": hover a card with an image, or tab to it. Figma: Card page, "Linked card, hovered and focused" row (image cards, gold badge). Screenshots: `figma-card-dark.png` (second row, the two image cards with the gold badge) and `card-preview.png`.

## 2. Secondary card, two treatments (decision 66)

`.fds-card--dark` stays the class. Docs call it "a quieter card for a dark surface". Both are only for dark surfaces; text keeps the dark-surface roles (sand title, muted sand text). The card has no fill of its own: a `::before` veil behind the content at `opacity.tint`.

| | A: flat veil | B: sheen |
| --- | --- | --- |
| Fill | `color-surface` (white) at 7% | gradient white → transparent, top left to bottom right, peak at **10.5%** (1.5 × the tint) |
| Border | `color-border` (dark-surface value) | the same |
| Class | `fds-card--dark` | `fds-card--dark fds-card--sheen` |
| Title contrast | **8.16:1** | **7.33:1** at the peak |
| Muted text contrast | **5.10:1** | **4.58:1** at the peak (passes narrowly) |
| Without any veil (for reference) | title 10.01, muted 6.25 | |

- **B's peak is 1.5×, not 2×.** At 14% the muted text at the corner is 4.12:1, a fail; the maximum that passes is about 11.4%. I kept the strength just under that.
- **Recommendation: A** as the one in the set. It is calmer, has more margin on the contrast (5.10 vs 4.58), and the sheen is hard to see at a contrast-safe strength.
- **New token (flagged):** `opacity.tint` = 0.07 ("A veil of light over a dark surface: the secondary card's fill (decision 66). 7%, so the card reads without changing the contrast of the text on it."). The brief asked for "roughly 6–8%", so a value had to be picked; you can change it in one place. It is in `tokens.css` as `--fds-opacity-tint` and in the Tokens Studio file (`opacity` set).
- **Where to see it:** preview, dark surface panel: "Secondary card, prototype A" and "prototype B" rows with the EXPERIENCE cards, side by side. Figma: Card page, Variants, "Dark surface" frame: rows A and B (`figma-card-dark.png`); the component set's Dark variants use A.
- **Figma notes:** the veil and the sheen stops are not bound to the colour variable: Figma ignores the paint opacity of a bound paint in instances (and a bound gradient stop ignores its alpha). The generator reads the colour of `color/surface` at build time and sets the opacity from `opacity/tint`. The Dark variants carry a `color/surface-dark` backdrop in their frame, so the veil can be seen in the set; the CSS has no such backdrop. The variable `opacity/tint` was created once in Figma by a one-off script; Tokens Studio will find it by name on the next import.
- **Seen in the screenshot:** the Image placeholder inside a secondary card keeps its light tint and its caption is faint there (the image is not dark-aware). It's a placeholder state only (question 6).

## 3. Image sizing

Audit of the case-study images in the portfolio `main` (code read only, nothing run, no password used):

| Case study | Images | Sizes (px) | Ratios |
| --- | --- | --- | --- |
| Curaay | hero + 6 inline | hero 1687×949; inline 1400×809 to 1400×1118 | 16:9; 1.73, 1.72, 1.73, 1.25, 1.52, 1.70 |
| HAWK | hero + 3 inline | hero 1687×949; 1480×853, 2220×1280 ×2 | 16:9; 1.74, 1.73, 1.73 |
| Scouting | hero + 8 inline | hero 1687×949; 1687×949, 1920×1179, 1687×882, 1920×2269, 1200×1600, 1920×1270 ×2, 1920×2719 | 16:9; 1.78, 1.63, 1.91, **0.85, 0.75** (portrait), 1.51, 1.51, **0.71** (portrait) |

11 of the 20 are about 16:9; 3 are portrait. Shown at up to about 1184px wide (hero, `min(1280px, 90vw)` minus the gutters) and about 860px (inline); about 358px on a 390px phone.

**Proposal**
- **Hero:** 16:9. Desktop **2400 × 1350** (2× the 1184px it's shown at, rounded), mobile **800 × 450** (2× the ~360px on a phone). Under about 800 KB.
- **Inline pictures:** keep their own ratio, never cropped. Desktop **1800px** wide (2× of 860 is 1720), mobile **800px** wide; set `width` and `height` to the file's own size.
- Card stays 16:10: 1600 × 1000 and 800 × 500.

**Done in the repo:** `docs/image.md`: "Export sizes" is now a 5-column table (Category, Size, Ratio, Pixels, Use) and a new section "Case study images". Figma Image page: the same table and section.

**Question 1: ratio.** The audit says a Case study image is not 16:10. Options:
- **(a, recommended)** No Case study variant of the Image component now. The hero is 16:9 and inline pictures keep their own shape; the Image component and its 16:10 frame stay for components that crop (the Card). Documented as above.
- (b) A second Image variant at 16:9 for the hero, built when the case-study page is redesigned with the system.
- (c) Crop everything to 16:10: cuts the portrait screens and the wide ones, so I advise against it.
I didn't build a new variant, as the brief says.

## 4. Image loading animation (decision 67)

- `.fds-image` keeps its flat `color-surface-subtle`, with a looping sweep: a gradient `subtle → surface → subtle` moving left to right over the frame, `duration-slow × 2` (1.4s), `easing-standard`, infinite. Under reduced motion: `animation: none; background-image: none`, so only the flat tint. Tokens only (`check-components` passes).
- **How to see it:** `docs/card-preview.html`, panel "Image loading": its images point to a file that doesn't exist, so the frame stays in the loading/error state. In a real page, throttle the network in dev tools. The reduced-motion switch at the top of the preview shows the flat tint.
- **Question 2 (accessibility):** the `duration` token's description says looping animations must stop within 5 seconds (WCAG 2.2.2) and that reduced motion drops looping animations; decision 67 asks for a loop. Options: **(a, recommended)** keep it infinite, since it is a loading indicator that ends when the picture arrives; (b) limit it to 3 iterations (about 4.2s) then rest on the flat tint. If you choose (a), the `duration` description should be reworded (it's yours to decide; I haven't touched it).
- **Question 3:** the shimmer keeps running behind a picture that has loaded (it's just hidden). Stopping it needs a `data-loaded` attribute set by a tiny script, or `:not([src])`-style tricks that don't work for failed loads. Recommendation: leave it, since the cost is negligible; say if you prefer the script.
- Figma Image page: the placeholder now shows an icon and the caption `16:10 · 1600 × 1000` (decision 66 asked for it). Static, as Figma has no looping fill.

## What to check, and where

1. **Preview** (`docs/card-preview.html`): hover and tab to a linked image card for the badge; the dark panel for A and B side by side; the "Image loading" panel; the reduced-motion switch.
2. **Figma, Card page:** Variants → "Linked card, hovered and focused", and the "Dark surface" frame (A and B). Check A renders as a soft veil (it was opaque white in the previous run: fixed).
3. **Figma, Image page:** the placeholder, the export table, the new Case study section.
4. **Docs:** `docs/card.md` (the badge section, the variants table, the contrast table), `docs/image.md` (sizes, case study section).

Screenshots in this branch: `card-preview.png` (the preview), `figma-card-dark.png` (the Dark surface frame: default, hover and focus with the badge, A, B), `figma-image.png` (the Image page).

## Other questions

- **Question 4:** the gold badge is 1.84:1 against the white body and sits half on the picture. OK as decoration, or should it get a border or a shadow? Recommendation: leave it as it is.
- **Question 5:** the new token `opacity.tint` = 0.07. Keep, or another value (6–8% still works)? Recommendation: keep.
- **Question 6:** in a secondary card with an image, should the placeholder take the dark roles? It only matters while loading. Recommendation: no, leave it.

## Other notes

- No change to `DECISIONS.md`, no merge, no history rewrite.
