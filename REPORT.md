# B-008 · Report

## A. Portfolio, branch `design-system/tokens`

`87dba22`, pushed, **not merged, not deployed**.

1. **Pause control:** built as proposed in B-007.
   - **The control:** a 32px round button at the bottom right of the blob area, white fill, 1.5px `color-border-input` border, navy pause and play icons, the constant name "Pause background animation" with `aria-pressed`, a 48px hit area, the system's focus ring and no hover colour.
   - **Blobs:** they drift continuously again (`infinite`).
   - **Under reduced motion:** the control starts pressed and the blobs paused. The reduced-motion block leaves the blobs out (`*:not(.hero-blob)`), so pressing play runs them; every other animation stays off.
   - **Below 900px:** the blobs and the control are hidden.
   - **Tested in Chrome:** the toggle switches `animation-play-state` and `aria-pressed`; the hit area is 48px; with reduced motion emulated it starts paused, play starts the drift, and the "available" dot's pulse stays off.
2. **Two colours:** the ghost section number is `color-surface-subtle`; the "available" dot is `color-success`, with its pulse glow kept as decoration.
3. **`tokens.css` not re-synced.** Part B changes tokens the portfolio could use (`border-width.control`, the cream dark hover), but it's on `components/button`, not merged. A sync names a commit, so I'd sync after the merge. Until then the pause control's 1.5px border is a literal marked `No token yet`.
4. **Screenshots:** `~/fajny-screenshots/after/home-1440.png` and `home-390.png` replaced, local only. The control is hidden at 390px, with the blobs.

### Files to upload after the merge

Relative to the site root:

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

`scripts/sync-tokens.sh` is for your machine only; it doesn't go on the server.

## B. Button, branch `components/button` (from `main`)

Pushed, **not merged**.

| Commit | What |
| --- | --- |
| `8e0ae79` | Tokens: `label` role, `color-secondary`, `color-secondary-hover`, `color-text-on-secondary`, primitive navy-200, `color-action-hover-on-dark` → sand-50, `border-width.control` 1.5px, `opacity.disabled` 0.6; new contrast pairs |
| `d3afb98` | `components/button.css`, `docs/button.md`, `docs/button-preview.html` (generated), `scripts/check-components.js` |
| `85f8877` | Figma: `scripts/build-figma-button.js` → `tokens/figma/button-component.js`; Tokens Studio file gains `border-width` and `opacity`; README |

### Check results (`npm run build`)

- **Contrast:** 46 pairs pass, two more than before: the secondary label on its fill (9.32:1) and on its hover (6.61:1). The dark primary label on its new hover is 10.01:1. A new guard fails if `color-secondary`, `color-secondary-hover` or `color-text-on-secondary` ever gets a dark-surface value.
- **Zoom:** 10 sizes pass (label 13→14px, 1.08×).
- **Type:** 10 roles complete.
- **Components** (new): `components/*.css` may use only `--fds-*` tokens. Tested with a broken file: it caught a hex colour, a px value, a duration and a non-system variable.
- **Figma Button:** the build fails if the Figma button and `button.css` use different colour roles. Tested with one role swapped: it named both sides.
- **Figma files:** Tokens Studio file 42 tokens in 7 sets; colour script 25 roles; typography script 10 roles; Button script 22 variants.

### The component

- **Classes:** `fds-button` with `--primary`, `--secondary` and `--link`; `--nav` for the navigation size (32px high, `::after` hit area to 48px).
- **States:** from the element itself: `:hover`, `:active`, `:focus-visible`, `aria-disabled="true"` (or `:disabled`) and `data-loading`. Loading keeps the default look.
- **Dark surfaces:** the colour roles switch the button inside `.fds-surface-dark`.
- **Motion:** colour transitions only, nothing moves, so reduced motion needs no exception.

### Design system page

https://claude.ai/artifact/Edn3F15g33yNgdEDZNNR63, version 24: `components/Button/preview.html` (every variant and state on light and dark, built from the repo) and `components/Button/README.md` (the guidelines from `docs/button.md`), plus the `lastChange` note. Editing stays off (decision 50).

**The generated token card is still stale:** `project/api/tokens.md` and `project/tokens.css` still show the pre-colour-stage values, so publishing doesn't regenerate them (question 3).

### Figma

- **Colour script:** run. The three new roles were created; `color/action-hover` in "Dark surface" is now `sand/50`.
- **Typography script:** run. It added `font/size/label` and the `label` text style (Inter Medium, 120%, 6%, uppercase) and rebuilt "Type check" with the label row.
- **Button script:** run.
  - The "Button" page has the component set (Variant × Size × State, 22 variants). Every fill, stroke, padding, height, gap, radius and opacity is bound to a variable, and the text to `label`.
  - The focus state is a wrapper with a stroke bound to `color/focus` and `focus/ring-width`, set off by `focus/ring-offset`; the link's ring is square, as in CSS.
  - The "Button check" page shows every variant and state in a light and a dark frame: [`button-check.png`](button-check.png).
- **Three variables made by hand, once:** `navy/200`, `border-width/control` and `opacity/disabled`. Tokens Studio writes these collections, but it wasn't available here. I created them exactly as its import would: the same collection, mode and variable names, scopes and hide-from-publishing, and opacity 60 because Figma reads opacity variables as 0–100 (I tested this). Your next Tokens Studio import of `tokens-studio.json` matches them by name and takes them over.

### What to check, and where

1. **Design system page → Components → Button:** the preview, then hover and tab through the live buttons in it.
2. **Figma → "Button check":** every variant and state, light and dark. On the "Button" page, select a variant to see its bindings.
3. **Repo:** open `docs/button-preview.html` locally; read `docs/button.md`.

## Questions

1. **Import `tokens-studio.json` with Tokens Studio** (7 sets) once, so Tokens Studio owns `navy/200`, `border-width/control` and `opacity/disabled` again (decision 45). Nothing should change visually. Do this before the next token change?
2. **The Button script replaces the component set on every run.** That's fine while nothing uses it. Once Figma designs use Button instances, replacing the set breaks their link.
   - A: change the script to update the set in place before the first design uses it.
   - B: keep replacing until then.
   - **Recommendation: A**, as part of the next component, so Card can use Button safely.
3. **The page's generated token card is stale** and the brand book still says "None is built yet" under Components.
   - A: you open the page and save it once (regenerates the card), and I correct that one sentence.
   - B: leave both.
   - **Recommendation: A**: agents read `api/tokens.md` first.
4. **Portfolio, second update** (decision 52): after `components/button` merges, re-sync `tokens.css`, then move the site's buttons onto `fds-button`, with the pause control's border on `border-width.control`. Brief it after the merges?
