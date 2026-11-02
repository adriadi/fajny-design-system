# B-007 · Report

## A. Portfolio, branch `design-system/tokens`

`1cc8a8c`, pushed, **not merged, not deployed**.

| Task | Done |
| --- | --- |
| A1 hero blobs | Left as they are on the branch. Pause control proposed below. |
| A2 allowed decoration | 15 literals marked `Decoration, not a token`: glows, blobs, translucent nav and menu backgrounds, two scrims, five tints and one glow on dark, the photo gradient and texture. An "Allowed literals" note at the top of `styles.css` (the portfolio has no README). Everything a user reads or uses keeps `No token`. |
| A3 two solid colours | Proposed below, not changed. |
| A4 Curaay chart | Applied (see below). |
| A5 password h1 | Uses `heading`: 32px on a 390px screen, 52px at 1440px (before: 28→38px). |
| A6 | Questions 2, 6 and 7 left as they were. |
| A7 screenshots | `~/fajny-screenshots/after/`: `curaay-1440.png`, `curaay-390-part1/2.png` (replaced), `password-1440.png`, `password-390.png` (new). Home changed only in comments, so no new home shot. Local only. |

### A1 · Pause control, proposal (not built)

- **What:** a round icon button, pause icon (two bars) while the blobs move, play icon (triangle) while paused. Inline SVG in `currentColor`.
- **Where:** bottom-right corner of the blob area (`.hero-blob-wrap`), so it sits next to what it controls. The blobs are hidden below 900px, and the control hides with them, because nothing moves there.
- **Name and state:** a constant accessible name, `aria-label="Pause background animation"`, with `aria-pressed="true"` while paused. Only the icon changes; screen readers hear "Pause background animation, toggle button, pressed / not pressed".
- **Look:** 32px circle (`space-8`), `radius-round`, fill `color-surface`, 1.5px border `color-border-input` (3.36:1 on the background, so the control's edge meets WCAG 1.4.11), icon `color-text` (11.27:1 on white). The fill keeps it readable over the gold and navy blobs.
- **Hit area:** 48px, through the same transparent pseudo-element as the navigation button (decision 53).
- **Focus:** the system's focus ring (`color-focus`, `focus.ring-width`, `focus.ring-offset`).
- **Hover:** the system has no hover role for an icon button; see question 1.
- **Behaviour:**
  - A class on the hero sets `animation-play-state: paused` on the blobs, so they freeze where they are rather than jumping back.
  - With `prefers-reduced-motion: reduce` it starts paused (`aria-pressed="true"`), and pressing play is the visitor's explicit choice. The reduced-motion block in `styles.css` would need an exception for the blobs while play is on.
  - The blobs go back to `infinite` when this is built (decision 55).
- **Tokens used:** `space-8`, `space-12` (hit area), `radius-round`, `color-surface`, `color-border-input`, `color-text`, the focus tokens, `duration-fast`. Missing: an icon-button hover (question 1).

### A3 · The two solid colours outside the palette, proposal (not changed)

| Element | Now | Nearest role | Contrast on its background | Visual difference |
| --- | --- | --- | --- | --- |
| Ghost section number (case studies) | `#E6E0D6`, 1.17:1 on the background | **A: `color-surface-subtle`** (sand-100 `#EDE8E0`) | 1.08:1 | a touch fainter, closest in value |
| | | B: `color-border` (sand-300 `#D9D1C5`) | 1.34:1 | a touch stronger |
| "Available" dot (home hero tag) | `#22c55e`, 2.15:1 on the tag | **`color-success`** (green-700 `#176700`) | 6.66:1 | bright green becomes a deep green; the pulse glow stays a decoration literal |

The ghost number is pure decoration, so its contrast is exempt; `color-surface-subtle` is the closest value (recommendation: A). The dot is the only green on the page, and `color-success` is the only green role. It passes 1.4.11 too, although the text next to it already says "Open to…".

### A4 · Curaay chart, applied

- **Competitors** (ChatGPT, Doctolib, Arzttermine, Jameda, Ada Health): fill `color-surface-subtle`, 1.5px outline `color-border-input`, label `color-text`. The outline is 3.36:1 on the background and 3.12:1 on the tinted quadrant (1.4.11 needs 3:1); the label is 9.24:1.
- **Curaay:** fill `color-surface-dark`, label `color-text` through `.fds-surface-dark` (10.01:1).

`color-border-input` is the only neutral role that gives a bubble a visible edge (3:1) on both the background and the tinted quadrant. A filled stone bubble would need white or navy text, which reach only 3.78:1 or 2.98:1.

## B. Button, values (proposal only, nothing added)

### Type role `label`

| Property | Value | Note |
| --- | --- | --- |
| `font.size.label` | `clamp(0.8125rem, 0.7851rem + 0.112vw, 0.875rem)`, 13px on a 390px screen to 14px at 1280px | max/min 1.08, well within 2.5× (WCAG 1.4.4) |
| `font.line-height.label` | 1.2 | single-line controls; the height comes from `min-height` |
| `font.weight.label` | 500 | decision 53 |
| `font.letter-spacing.label` | 0.06em | decision 53 |
| `font.text-transform.label` | uppercase | decision 53 |
| `font.family.label` | `{font.typeface.inter}` | |

The same size covers buttons and navigation links (question 2). Today nav links are 13px and buttons 13–15px; with this size, nav links keep their size and the hero button drops 1px on desktop.

### New and changed colour roles

| Role | Value | Contrast | Note |
| --- | --- | --- | --- |
| `color-secondary` (fill) | `{navy.100}` | | doesn't switch on dark (question 3) |
| `color-text-on-secondary` | `{navy.900}` | 9.32:1 on `color-secondary`, on every surface | doesn't switch; decision 53 |
| `color-secondary-hover` | `{navy.300}` | 4.54:1 for the navy label | question 5 |
| `color-action-hover-on-dark` (exists, value changes) | `{sand.50}` instead of `{gold.500}` | 10.01:1 for the navy label; the hover differs from the gold rest at 1.64:1 | question 4 |
| secondary border | `color-border-highlight` (navy-300), 1.5px | 2.21:1 on background, 2.48 on surface, 2.04 on surface-subtle, 4.54 on navy | confirmed as decided; width in question 6 |
| `opacity.disabled` | 0.6 | exempt (WCAG 1.4.3); see below | question 7 |

**Disabled at 0.6:**
- **Light surface:** the navy primary becomes a greyed blue (`≈#72839E`), the secondary nearly white.
- **Dark surface:** the gold primary becomes a muted olive (`≈#968658`).

The label stays readable (about 3.1–3.4:1), but the button clearly reads as off. The site uses 0.6–0.65 today.

### Sizes

| | Main buttons (`primary`, `secondary`) | Navigation button | `link` |
| --- | --- | --- | --- |
| Visual height | `min-height: space-12` (48px) | `min-height: space-8` (32px) | `min-height: space-6` (24px) |
| Padding | `0 space-8` (32px) | `0 space-6` (24px) | none |
| Hit area | 48px | 48px: a transparent `::after` at `inset: calc(-1 * space-2) 0` | 24px (WCAG 2.5.8) |
| Gap to an icon | `space-2` | `space-2` | `space-2` |
| Radius | `radius-pill` | `radius-pill` | — |

### States, light surface

| State | `primary` | `secondary` | `link` |
| --- | --- | --- | --- |
| default | fill `color-action` (navy-900), label `color-text-on-action` (sand-50) · 10.01 | fill `color-secondary`, border `color-border-highlight`, label `color-text-on-secondary` · 9.32 | `color-text-muted` · 5.25 / 5.91 / 4.85 |
| hover | fill `color-action-hover` (navy-700) · 7.36 | fill `color-secondary-hover` · 4.54 | `color-text` · 10.01 |
| focus | ring `color-focus` (navy), 2px, offset 3px | same | same |
| active | as hover | as hover | as hover |
| disabled | `opacity.disabled`, `aria-disabled="true"`, no hover | same | — (a link can't be disabled) |
| loading | default look, label → progress text, `aria-disabled="true"`, `role="status"` announces it | same | — |

### States, dark surface (`.fds-surface-dark`)

| State | `primary` (switches by itself) | `secondary` (doesn't switch) | `link` |
| --- | --- | --- | --- |
| default | fill `color-action` → gold-500, label → navy (`color-text-on-accent`) · 6.11 | as on light; fill vs navy section 9.32 | `color-text-muted` → sand-400 · 6.25 |
| hover | fill `color-action-hover` → sand-50 · 10.01 | as on light · 4.54 | `color-text` → sand-50 · 10.01 |
| focus | ring `color-focus` → gold, 6.11 on navy | same | same |
| active | as hover | as hover | as hover |
| disabled | `opacity.disabled` · gold becomes olive | same | — |
| loading | as on light | same | — |

Transitions: `duration-fast` with `easing-standard` for colour; no movement on hover.

## Questions

1. **Hover for the pause control (an icon button):** no role fits.
   - A: no hover change; the cursor and the focus ring are enough for a 32px control that's rarely used.
   - B: fill `color-secondary-hover` (navy-300) on hover, borrowing the Button role.
   - **Recommendation: A**: an icon button is a separate component; borrowing a Button role blurs it.

2. **One `label` size for buttons and navigation links?**
   - A: yes, 13→14px for both.
   - B: buttons 14→15px, links 13→14px (two roles).
   - **Recommendation: A**: decision 53 says one role for both, and nav links keep their current size.

3. **Secondary fill: its own role or `color-surface-highlight`?** Same value (navy-100).
   - A: a new role `color-secondary`.
   - B: reuse `color-surface-highlight`.
   - **Recommendation: A**: one name per purpose (like `border-rule` and `border-strong`). If the Highlight colour ever changes, the button doesn't change with it.

4. **Dark-surface primary hover** (`color-action-hover-on-dark`):
   - A: sand-50, an existing value: gold turns cream, label 10.01:1.
   - B: a new lighter gold primitive (e.g. `#F2D38C`): label 7.76:1, stays gold.
   - **Recommendation: A**: existing tokens first. On navy the cream is a clear change, and the label gains contrast.

5. **Secondary hover** (`color-secondary-hover`):
   - A: navy-300, an existing value: label 4.54:1, just over 4.5. The border merges into the fill on hover.
   - B: a new navy-200 primitive (e.g. `#B3C8E6`): label 6.61:1, and the border stays visible.
   - **Recommendation: B**: 4.54 leaves no margin, and a hover that hides the border looks like a different button. It's the only new value in this proposal.

6. **Secondary border width:**
   - A: 1.5px, the width of the site's other control borders, as a new token `border-width.control`.
   - B: 1px literal.
   - **Recommendation: A**: at 2.2:1 a 1px line nearly disappears on beige. A token, because the Input and the pause control use the same 1.5px.

7. **Disabled opacity:**
   - A: 0.6 (today's look).
   - B: 0.5.
   - **Recommendation: A**: it reads clearly as off on both surfaces and matches what visitors see today.

8. **Loading look:**
   - A: the default fill with the progress text ("Sending…").
   - B: the disabled look.
   - **Recommendation: A**: the button is busy, not off; dimming it makes the wait look like an error.

9. **The two solid colours (A3):**
   - Ghost number: `color-surface-subtle` (A) or `color-border` (B). Recommendation: A.
   - Green dot: `color-success`. Recommendation: yes.
