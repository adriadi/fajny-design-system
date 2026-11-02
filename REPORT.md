# B-009 · Report

## Commits

| Repo · branch | Commit | What |
| --- | --- | --- |
| portfolio · `design-system/tokens` | `5cff467` | Pause control fixed in the screen corner, shown while the hero is on screen, above the cookie banner |
| system · `components/button` | `eba6f0d` | Button Figma script updates the set in place; typographic quotes in the Tokens Studio file |

Both pushed, **not merged, not deployed**.

## A. Pause control (portfolio)

- **Position:** `position: fixed`, `right` and `bottom` at `space-6`, `z-index` below the nav and the cookie banner.
- **Visibility:** an `IntersectionObserver` on the hero sets the `hidden` attribute when the hero leaves the screen, which takes the control out of the tab order and the accessibility tree. The pressed state lives in React state, so it survives.
- **Cookie banner:** while the banner is visible, a small observer sets `--cookie-banner-lift` to the banner's height plus its offset, and the control moves up above it. When the banner closes, the lift goes back to 0.
- **Below 900px:** hidden, as before.
- **Reduced motion:** the control doesn't slide; it jumps above the banner.

### A2 · Tests in Chrome (1440px, fresh browser context, so the cookie banner shows)

| Test | Result |
| --- | --- |
| Hero in view, banner showing | control visible at 678–710px; banner top at 734px; lift 166px, so the control sits above the banner |
| Press, scroll the hero out | `hidden`, `display: none`, not reachable with Tab |
| Scroll back | visible again, still pressed (`aria-pressed="true"`) |
| Tab order, hero in view | "Get in touch" → pause control (navy focus ring, name "Pause background animation, pressed") → first project card |
| Tab order, hero out of view | "Get in touch" → first project card; the control is skipped |
| Dismiss the banner | banner removed, lift 0, control back at 24px from the bottom |
| Reduced motion | starts pressed, blobs paused, no `bottom` transition |
| 390px | `display: none` |

### Screenshots

`~/fajny-screenshots/after/home-1440.png` and `home-390.png` replaced. Local only.

### Upload list (unchanged)

```
index.html
styles.css
tokens.css            (new)
password.html
js/loader.js
usecases/hawk-case-study.html
usecases/curaay-case-study.html
usecases/scouting-notes-case-study.html
```

## B. Figma after the Tokens Studio import (read only)

I compared all 38 variables from the Tokens Studio file (primitives, spacing, radius, focus, border-width, opacity) with the Figma file, checking value, scopes and hide from publishing. Result:
- **Differences:** none.
- **Extra variables in those collections:** none.
- **The three variables I made by hand:**

| Variable | Collection · mode | Value | Scopes | Hidden | ID |
| --- | --- | --- | --- | --- | --- |
| `navy/200` | primitives · primitives | `#B3C8E6` | none (no picker) | yes | `38:2` (unchanged) |
| `border-width/control` | border-width · border-width | 1.5 | `STROKE_FLOAT` | no | `38:4` (unchanged) |
| `opacity/disabled` | opacity · opacity | 60 | `OPACITY` | no | `38:6` (unchanged) |

The IDs show the import updated them in place rather than making copies. Nothing else changed: color 25 roles (both modes), typography 10, effect styles 4, text styles 10, pages as before.

Two things the import brought:
- **Escaped quotes:** the `opacity/disabled` description shows `aria-disabled=&quot;true&quot;`, the same escaping Tokens Studio did to apostrophes. Fixed in `eba6f0d`: the generated file now writes `“true”`, so the next import corrects it.
- **Empty `shadow` collection:** it's back, as after every import. The colour script removes it on its next run (README step 3).

## C. System repo

1. **Design system page** (version 25): under Components, "None is built yet" became "Six components: Button is built (primary, secondary and link, with a navigation size; see Button in Components). Input, Card (text-only and with an image), Tag, Navigation and Highlight (dark and light) are planned. Until they are built, compose them from the tokens above and follow the rules on this page." Nothing else changed.
2. **Button script, in place:**
   - Variants are found by name, and every property is set again: fills, strokes, paddings, radius, opacity, text and style. Missing variants are created, none are deleted, and unknown variants stay where they are.
   - The README's fifth Figma step says so.
   - **ID check:**

| | Variants | Component set | Created |
| --- | --- | --- | --- |
| Before | 22 IDs `41:2 … 41:65` | `41:68` | |
| Run 1 | the same 22 IDs | `41:68` | 0 (22 updated) |
| Run 2 | the same 22 IDs | `41:68` | 0 (22 updated) |

The "Button check" page is still rebuilt on every run; it holds only check instances.

## Questions

1. **Next Tokens Studio import:** re-import `tokens-studio.json` once from `components/button` (or after it merges), so the `opacity/disabled` description loses its `&quot;`. Then run the colour script to remove the empty `shadow` collection again. No visual change.
