# B-026 · Report

Both tasks are done. Nothing is merged to `main`.

## Commits

| What | Where | Commit |
| --- | --- | --- |
| Task 1: `work-with-me.html` onto tokens (alone) | `portfolio-tokens`, branch `design-system/work-with-me` (from `main`), **local, not pushed** | `50f0871` |
| Task 2, portfolio: chip contrast fix + Medium badge hover removed | same branch, **local, not pushed** | `a1f5dc1` |
| Task 2, design system: the Tag component | `fajny-design-system`, branch `components/tag`, pushed | `3c81d5b` |

`npm run build` in the design system: exit 0, all steps, including the new contrast pair and `tag-component.js`.

## Task 1: `work-with-me.html` on tokens

- `work-with-me.html`, `js/work-with-me.js` and the page's CSS (about 96 lines) come over from `test/before-2`; the home page gets the "Work with me" nav link and the hash-scroll effect. The page links `tokens.css` before `styles.css`; the footer is `.fds-surface-dark`.
- Roles: lead → `lead` type role, feature card title → `subheading`, eyebrow → `overline`, form check and errors → `small`; the eyebrow's gold became `color-text` like the other migrated eyebrows. Card: `color-surface`, `color-border`, `radius-lg` (was 20px), `shadow-lg` on hover. Errors: `color-error`. Off-grid values rounded up (the tag's 5px became 8px, 14px → `space-4`).
- The intro's top padding (140px; 104px on small screens) is written as two tokens added together (`space-30 + space-5`; `space-20 + space-6`), because no single step fits.
- Marked "No token" (no role fits): the checkbox size, the select arrow (a data-URI SVG), the see-through error tint, the disabled opacity.
- Check: loads from disk on tokens, card 16px, tags 8px 12px, "Work with me" in the nav (screenshot below).

## Task 2: Tag

Built as proposals; **sizes and class names below are mine, please check them.**

**One size (proposal):** the `overline` text role: Inter 600, 0.12em, uppercase, 11px at 390px growing to 12px at 1280px. Padding `space-1` above and below and `space-3` at the sides (the token's own description says "tag padding"), a `border-width.default` border, `radius-pill`, `space-2` between the dot and the label. Rendered: 11.9px text, tag **26.5px tall**, padding 4px 12px. No new token. Reason: the audit found 10, 11 and 12px at weights 400, 500 and 600, and `overline` is the one existing role in that range. Cost: chip text becomes uppercase and 600 (it was sentence case, 400), and the hero and Curaay tags get shorter (their vertical padding 8px → 4px).

**Variants (proposed names):** `fds-tag` (Default, outlined, follows the surface), `fds-tag--accent` (gold text and border on a solid `color-surface-dark` fill, dark surfaces only), `fds-tag--filled` (gold fill, navy text: the old `is-on`), `fds-tag--muted` (muted text and plain border; the "dimmed" look, added after any variant but a filled one). `fds-tag__dot` is the status dot (`color-success`, light surfaces only). The project tag over a photo is a Default tag that is itself `.fds-surface-dark`: a solid navy pill with light text.

**No hover, focus or pressed:** `tag.css` has no `:hover`, `:focus`, `:active` or transition.

### Contrast (all from the real colours; the portfolio numbers are the rendered computed colours)

| Pair | Before | Now |
| --- | --- | --- |
| Core skill chip (`lvl-2`): gold text | 4.47:1 on a gold 18% tint (rendered) | **6.11:1**: `color-accent` text on solid `color-surface-dark` (rendered `rgb(232,184,75)` on `rgb(27,58,107)`) |
| Dimmed chip | about 2.6:1 (opacity .6) | **6.25:1**: `color-text-muted` on dark (rendered `rgb(200,192,180)` on navy), border `color-border` |
| Selected chip (`is-on`): navy on gold | 6.11:1 | 6.11:1, unchanged |

Tag at its size, from the tokens (all ≥ 4.5:1): Default on `color-background` 10.01, on `color-surface` 11.27, on `color-surface-subtle` 9.24, inside a dark surface 10.01; Muted 5.25 / 5.91 / 4.85 on the light surfaces and 6.25 on dark; Accent 6.11; Filled 6.11; the status dot (3:1 needed) 7.06 on `color-surface`. The build now also checks `color-accent` on `color-surface-dark` at 4.5:1 (47 pairs).

### Things I changed from the audit or want you to check

1. **`color-accent` is a fill role, used here as text** (decision 70's wording). It passes only on the Accent tag's own dark fill, so the docs say it isn't a text colour anywhere else. The alternative, `color-text-emphasis`, is allowed only at 24px+ by decision 28, so it can't be used.
2. **The hero tag loses its see-through white fill** (no token, no contrast guarantee) and **the project tag loses its glass look** (white 15% with blur): over a photo it becomes a solid dark pill so the text passes on any photo.
3. **Muted + Filled is not allowed** (muted text on gold fails); the docs and preview say so.
4. The hero tag's pulsing dot is not part of Tag (the dot is static).

### Docs, preview, Figma

- `docs/tag.md`; `docs/tag-preview.html` (default, status dot, filled, muted, accent on dark, and a tag over a photo, on the page background, a subtle surface and a dark surface); README updated.
- Figma: Tag page in the Regular group after Image (`---` separators kept). Component set: Style (Default, Accent, Filled) × Muted, without a muted Filled: 5 variants; Label text property; Show dot switch. Every fill, stroke, padding and radius bound to variables; the overline text style. Real `tag-component.js` was run on the file (5 created). Page: set, then Variants on the page background, a subtle surface, a dark surface and a photo (it nests the Image).

## Portfolio changes (not the Tag component)

The portfolio does not load component CSS yet (decision 52's second update), so it did not switch to `fds-tag` classes. Instead:

- The core chip and the dimmed state use the roles above (`a1f5dc1`, `styles.css`).
- The Medium badge: `:hover` rule and its transition removed.
- Hero tag, project tag and feature-card tags keep their own classes (on tokens), so they still show their old padding and fill until the portfolio adopts `tag.css`.

## What to check, and where

- Design system `docs/tag-preview.html`, and the Figma Tag page.
- Portfolio, local branch `design-system/work-with-me`: the home page's skill map (pin a skill; the 390px view shows the chips) and `work-with-me.html` (feature tags).

## Screenshots (this branch)

| Context | File |
| --- | --- |
| Tag preview: light page (default, status dot, filled, muted, photo), subtle surface, dark surface (accent, muted) | `b026-1-tag-preview.png` |
| Figma Tag page (set, Variants, photo) | `b026-2-figma-tag-page.png` |
| Dark skill chip, core (gold outline) and plain, on the live home page (390px, "AI products" pinned) | `b026-3-portfolio-chips-core-and-plain.png` |
| Dark skill chip, dimmed rows (muted, not faded) | `b026-4-portfolio-chips-dimmed.png` |
| Curaay feature-card tags on the migrated `work-with-me.html` | `b026-5-work-with-me-migrated.png` |

I did not take a separate light **hero tag** screenshot: it is unchanged in the portfolio (`b025-1-home-hero-tag.png` on this branch); its Tag version is the "status dot" row in the preview and in Figma.

## Questions

1. **The size** (11–12px overline, 4px 12px padding, uppercase 600). OK, or one of: the larger `label` role (13–14px, weight 500) or the same overline with `space-2` vertical padding?
2. **Variant names** `accent`, `filled`, `muted` and the `dot` part: keep, or rename?
3. **Hero tag without the see-through fill, and the project tag as a solid dark pill**: OK? (Both come from "no token, no contrast guarantee".)
4. **Uppercase skill chips** (they were sentence case): OK for names like "Complex B2B tools", or should chips be a variant without uppercase?
5. **Portfolio adoption of `tag.css`**: when? It needs the tokens re-synced (the site's `tokens.css` predates `border-width` and others), so I did not do it here. I can do it as the next portfolio step.
6. The portfolio branch `design-system/work-with-me` is local only. Push it, or merge it into the portfolio's `main` first?
