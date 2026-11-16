# B-033 · Report

Highlight is built on `components/highlight` (commit `7bc561c`, pushed). Not merged to `main`. `npm run build`: exit 0 (47 contrast pairs, 12 type roles, 7 component stylesheets).

## Names I picked

- **Root class `fds-highlight`**, light by default; **`fds-highlight--dark`** for the dark variant. Parts: `__icon`, `__body`, `__quote`, `__cite` (light) and `__label`, `__title`, `__text` (dark).
- **Markup:** the light variant is a `<figure>` with a `<blockquote>` (or a `<p>`, for an insight with no source) and a `<figcaption>`; the dark one a `<div>` with a `<p>`, an `<h3>` (the level is the page's) and `<p>`s. The classes work on any element; the docs recommend those.
- **Figma page:** in the **Regular** group, after Tag (it nests nothing). Component set: Variant (Light, Dark) with Quote, Source, Show icon, Show source and, for the dark one, Label, Title and Paragraph 1 and 2 as properties.

## The new text role (please check)

**`quote`**, the twelfth: Syne, weight **400**, line height **1.4**, letter spacing **0**, italic through a new token **`font.style.quote: italic`** (its CSS name is `--fds-font-style-quote`; the type check accepts an optional `style` group, like `text-transform`).

- **Size: one fluid range, 18px at 390px to 26px at 1280px**, `clamp(1.125rem, 0.9059rem + 0.899vw, 1.625rem)`. I unified rather than keep two sizes: 18 to 26px is the pull-quote's own size, and it's 4 of the 5 uses. **The cost:** the insight (Scouting's `.platform-insight`), which used 15 to 18px, takes 18 to 26px, so it grows (about 40% at desktop). Flagging as asked; if the insight should stay smaller, the choice is a second role (a bigger system) or keeping it in `lead` (not italic Syne).
- Check: the 2.5× zoom rule passes (26/18 = 1.44) and the contrast check is unaffected (12 sizes, 11 fluid).
- **Figma has no Syne italic** (its Syne styles are Regular to ExtraBold, and the browser slants the text), so the Figma `quote` text style is **upright**, and its description says "Italic in code". The typography script was re-run on the file: it created the `font/size/quote` variable and the `quote` style, and rebuilt the Typography page (12 roles).
- Never gold; written in the token description.

## Rendered contrast

| Variant | Element | Colours | Ratio |
| --- | --- | --- | --- |
| Light | Quote and icon | `rgb(27, 58, 107)` on `rgb(228, 234, 244)` | **9.32:1** |
| Light | Source | `rgb(107, 99, 89)` on the same fill | **4.89:1** |
| Light | Rule | `rgb(127, 168, 212)`, 1.5px, against the fill | 2.06:1 (decorative, decision 31) |
| Dark | Label and heading | `rgb(245, 241, 235)` on `rgb(27, 58, 107)` | **10.01:1** |
| Dark | Text | `rgb(200, 192, 180)` on the same navy | **6.25:1** |

All measured from the computed colours in the preview; the light variant is the same inside a dark surface (it stays light: quote `rgb(27, 58, 107)` on `rgb(228, 234, 244)`).

## The two spacing fixes (before and after)

How: every part that sets a margin, a colour or a type style uses **two classes** (`.fds-highlight .fds-highlight__title`), which beat the page's one-class-and-an-element rules (`body.cs h3`, `body.cs p`) without `!important`. The preview has an article with those rules and measures the result:

| Gap | Before (the page rule won) | Now, in an article with the page rules |
| --- | --- | --- |
| Dark: label to heading | 40px | **16px** (`space-4`; the heading's margin-top is 0, the page's is 40) |
| Light: quote to source | 20px | **12px** (`space-3`; the quote `<p>` has margin 0 where a plain `<p>` there gets 20) |

The second dark-block gap I also fixed in the same way: between the two paragraphs it's `space-3`.

## What else the brief's list covers

- Fill `color-surface-highlight`; rule `color-border-highlight` at **`border-width.default` 1.5px** (was 3px).
- **Square corners on all four** (decision 75); the dark variant keeps `radius-sm` on all four (it has no one-sided border).
- **Icon slot:** an optional `span.fds-highlight__icon` (20px, `color-text`, `aria-hidden`) before the body; absent for a plain quote.
- **Surfaces:** I added the two classes to `scripts/surfaces.js` (`LIGHT_ELEMENTS` and `DARK_ELEMENTS`, the mechanism the Card uses), so `tokens.css` switches the roles itself: the light variant stays light inside `.fds-surface-dark`, the dark one stays dark anywhere. This is the one change to that script.
- **Padding:** light `space-6` `space-8`; dark `space-10` above and below and `space-gutter` (16 to 48px) at the sides, so it has no media query (a length can't be a token there); on a phone the sides are 16px, where the portfolio's block had 24px.
- **No outer margin**: the space around is the page's (the portfolio's `margin: space-12` is not in the component).
- Out of scope, untouched: the testimonials, `.patient-quote`, `.market-card--gap`, and the portfolio's `.tension`, `.pullquote` and `.platform-insight`.

## Docs, preview, Figma

- `docs/highlight.md` (parts, the `quote` role's spec, corners and rule, spacing and the two fixes with before and after, contrast, do and don't, copy-paste HTML); `docs/highlight-preview.html`: the light variant (quote, cited statistic, insight with the icon) and the dark one on the page background, a subtle surface and a dark surface (the dark variant is the same navy there, so it is shown on the light surfaces), plus the article. README updated.
- Figma Highlight page: the set, then Variants on the page background, a subtle surface and a dark surface: light (no icon, a statistic, the icon with no source) and dark. `highlight-component.js` was run on the file (2 variants). The preview needs the Syne font to look right: this machine doesn't have it, so the preview screenshots show a sans fallback in the quote and the heading (the Figma page uses Syne).

## Screenshots (this branch)

| What | File |
| --- | --- |
| The preview: dark, light without icon, light with icon (the insight), the statistic, on three surfaces and in the article with its own rules | `b033-1-highlight-preview.png` |
| The Figma Highlight page, the Variants frame on the page background (light without icon, a statistic, light with the icon, dark) | `b033-2-figma-highlight-page-frame.png` |

## Questions

1. **The quote size.** One role, 18 to 26px, makes the insight bigger than it is now (15 to 18px). Keep that, or should the insight stay smaller?
2. **`font.style.quote`.** A new token group `font.style` (one entry). Fine, or would you rather italic be part of the role name or handled another way?
3. **Italic in Figma.** The Figma text style is upright because Figma has no italic Syne. Accept this limit, or should the Figma documentation note it somewhere more visible than the style's description?
