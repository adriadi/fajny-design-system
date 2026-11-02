# B-005 · Report

## 1. Type check page without gold: done

- `figma/modes` pulled: `DECISIONS.md` ends with decision 51.
- `59261c7` on `figma/modes` (pushed, not merged): the specimen samples no longer carry emphasis words; every sample is in `color/text`. The emphasis checks are gone with them; a role without specimen text still fails the build. Build passes.
- Script run on the Figma file: 0 variables and 0 styles created, page rebuilt with the same four frames.
- Screenshot: [`type-check.png`](type-check.png) (replaced on this branch). No gold anywhere on the page, light or dark.

## 2. Button: measurements

Measured on `adriadi/portfolio` at `before-system` (`f143a85`): CSS read from `styles.css` and every `<style>` block, sizes measured in Chrome at 1280px and 390px. The case studies are password-gated, so the case-study button is computed from its CSS. Every button and nav link on the site uses Inter.

### Buttons and links in use

| Element | Where | Tag | Height | Padding | Font | Letter spacing | Case | Radius | Colours |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `.btn-primary` "View my work" | home hero | `a` | 50 | 16 / 36 | 15 / 500 | 0.06em | upper | pill | navy fill, white text (inline style) |
| `.btn-secondary` "Get in touch" | home hero | `a` | 21.5 | 0 0 2 | 15 / 500 | 0.06em | upper | none | navy text, 1.5px gold underline |
| `.nav-cta` "Let's talk" | top nav | `a` | 33.5 | 9 / 22 | 13 / 500 | 0.06em | upper | pill | navy fill, sand text |
| `.nav-cta-mobile` | mobile menu | `a` | 45 | 14 / 0 | 14 / 500 | 0.06em | upper | pill | navy fill, sand text, full width |
| `.btn-outline-light` "Schedule a call" | experience (navy section) | `a` | 48 | 14 / 32 | 14 / 500 | 0.06em | upper | pill | 1.5px white 25% border, white text |
| `.form-submit` "Send message →" | contact form | `button` | 45 | 14 / 32 | 14 / 500 | 0.04em | none | **4px** | navy fill, sand text |
| `.submit-btn` | password page | `button` | 49 | 16 | 14 / 500 | 0.06em | upper | **10px** | navy fill, sand text, full width |
| `.prototype-btn` "View prototype" | Hawk case study | `a` | ≈52 (computed) | 14 / 28 | 14 / 500 | 0.04em | none | **4px** | `--accent`: #000078 on Hawk |
| `.nav-links a` | top nav | `a` | 15.5 | 0 (36px gaps) | 13 / 500 | 0.04em | upper | none | muted text |
| `.mobile-nav a` | mobile menu | `a` | 50 | 16 / 0 | 14 / 500 | 0.05em | upper | none | muted text, divider below |
| `.nav-back` "←" | case-study nav | `a` | text | 0 | 13 / 400 | 0 | none | none | muted text |

Defined but not used on any page: `.btn-accent` (gold fill, gold glow on hover), `.cv-modal-submit` (same, plus disabled).

### States

| Element | Hover | Active | Focus | Disabled / loading | Transition |
| --- | --- | --- | --- | --- | --- |
| `.btn-primary` | lifts 2px, shadow 0 4 24 navy 20% → 0 8 32 navy 30%, arrow moves 3px | none | browser default | none | 0.2s |
| `.btn-secondary` | gap between text and arrow 8 → 14px | none | browser default | none | 0.2s |
| `.nav-cta` | navy-mid fill, lifts 1px | none | browser default | none | 0.2s bg, 0.15s transform |
| `.btn-outline-light` | border to 60%, white 6% fill | none | browser default | none | 0.2s |
| `.form-submit` | navy-mid fill, lifts 1px | none | browser default | while sending: `disabled`, opacity 0.65, text "Sending…" | 0.2s |
| `.submit-btn` | navy-mid fill, lifts 1px | back to 0 | browser default | none | 0.2s, 0.15s |
| `.prototype-btn` | opacity 0.85, moves 3px right | none | browser default | none | 0.2s |
| `.nav-links a` | muted → navy | none | browser default | none | 0.2s colour |
| `.btn-accent` (unused) | lifts 2px, **gold glow** 0 8 28 gold 40% | none | none | none | 0.2s |

**Findings:**
- No button or link has its own focus style. Every one shows Chrome's default blue ring (`auto 1px #005FCC`), on navy too.
- Loading is never announced: "Sending…" replaces the label, with no live region.
- Shadow at rest appears only on `.btn-primary` (the navy shadow). The gold glow is only on the two unused classes.
- There are three button radii (pill, 4px, 10px); pill is the system's answer (decision 39).
- `cursor: none` (the custom cursor) is set on `.form-submit`.

## 2. Button: proposal

Uses only existing tokens. Where none fits, the gap is named as a question.

### Size

- **One size for `primary` and `secondary`:** padding `space-4` (16px) top and bottom, `space-8` (32px) left and right, `min-height: space-12` (48px). That's close to what the site has (45–50px) and meets 44px (WCAG 2.5.5, AAA) with no visible change.
- **The nav "Let's talk"** is today a small button (33.5px). See question 3.
- **Type:** no type role fits button labels. See question 1.

### Touch target

| Target | Visual cost |
| --- | --- |
| 24px (2.5.8, AA) | None for any button. The nav links (15.5px tall) pass only through the 36px spacing exception. |
| 44px (2.5.5, AAA) | None for the main buttons (already 45–50px). The nav button grows from 33.5 to 44+ px in a 64px nav, unless its hit area is extended without growing visually (question 3). Links need padding to reach 44px. |

### States (all variants)

| State | primary | secondary | link |
| --- | --- | --- | --- |
| default | `color-action` fill, `color-text-on-action` | `color-surface-highlight` fill, navy text (question 2) | `color-text-muted` |
| hover | `color-action-hover` | missing role (question 4) | `color-text` |
| focus | ring: `color-focus`, `focus.ring-width`, `focus.ring-offset` | same | same |
| active | same as hover, no lift | same as hover | `color-text` |
| disabled | question 5 | question 5 | not available: a link can't be disabled |
| loading | question 6 | question 6 | not available |

- **Transitions:** `duration-fast` (200ms) for colour, `easing-standard`.
- **No movement on hover:** the site's lifts (1–3px translate) have no token, and decision 41 drops them under reduced motion anyway.

### Shadow

- **At rest:** none. Decision 40 says shadows appear on interaction, not at rest, so the navy rest shadow goes.
- **On hover:** see question 4. On a dark surface a navy shadow is invisible, and the gold glow isn't a token.

### The `link` variant

- **Style:** the navigation link style: 13px, weight 500, uppercase, `color-text-muted`, then `color-text` on hover, no underline.
- **How it differs from a link in body copy:** a body-copy link sits inside a sentence, keeps the text's case and size, and needs an underline. In the case studies, body links today are colour-only with an underline on hover, which is a WCAG 1.4.1 risk to fix with the text-link rule, not here.
- **Target:** `min-height: space-6` (24px) through padding, so it passes AA on its own rather than through spacing.
- **Focus:** the same ring as the other variants.

### On a dark surface

| Variant | What happens | Contrast |
| --- | --- | --- |
| primary | switches by itself: gold fill, navy text | 6.11:1 |
| secondary | if its text used `color-text`, it would turn sand on the light fill: **1.07:1, fails** | needs a text colour that doesn't switch: navy on `surface-highlight` 9.32:1, fill vs navy section 9.32:1 |
| link | muted → `sand-400`, hover → `sand-50` | 6.25:1 / 10.01:1 |

### HTML and class names

- `<a>` when it goes somewhere: "View my work", "Let's talk", "View prototype", "Schedule a call".
- `<button>` when it does something: submit, open a modal.
- Classes: `fds-button` plus a variant modifier, `fds-button--primary`, `fds-button--secondary` or `fds-button--link`.
- States through native state and ARIA, not classes: `:hover`, `:focus-visible`, `:active`, `:disabled` / `[aria-disabled="true"]`, and loading as in question 6.
- Text stays in sentence case in the HTML; uppercase comes from CSS (decision 51).

## Questions

1. **Button labels have no type role.** Buttons are 14–15px / 500 / 0.06em / uppercase, nav links 13px / 500 / 0.04em / uppercase. The 9 roles have no weight-500 Inter role, and none is uppercase except overline (11–12px / 600 / 0.12em).
   - A: a tenth role, e.g. `label`, for button and link text, with its own size, weight 500, letter spacing 0.06em and `text-transform: uppercase` (values to be proposed in the next report).
   - B: reuse `small` or `body` and override weight and case in the button CSS.
   - **Recommendation: A.** B puts values outside the tokens, which the system forbids. Decision 51 already fixes 0.06em and uppercase; a role makes them tokens. The nav links' 0.04em would move to 0.06em, so there's one tracking for all controls.

2. **`secondary` needs a text colour that doesn't switch on a dark surface.**
   - A: a new role for text on `color-surface-highlight`, always navy (like `color-text-on-accent` for gold).
   - B: reuse `color-text-on-accent` (navy everywhere), although it's named for gold fills.
   - **Recommendation: A.** One role per pair keeps names honest, and the contrast check can test it on both surfaces.
   - A related point: the secondary fill is nearly invisible on the light backgrounds (1.01–1.21:1). The label carries it, so WCAG passes, but it reads more as a tinted label than a button. Should it get a border? If yes, which role?

3. **The nav button size.**
   - A: one size everywhere: the nav button becomes 48px in the 64px nav.
   - B: a small size: `min-height: space-8` (32px), padding `space-2` / `space-6`, meets AA only.
   - C: small visually (32px), with the clickable area extended to 48px by a transparent pseudo-element, which meets AAA with no visual change.
   - **Recommendation: C.** It keeps the nav as it looks today and still meets 44px.

4. **Hover on a dark surface, and the secondary hover.**
   - On dark, `color-action-hover-on-dark` is gold-500, the same as rest. Its description says the button lifts with a shadow, but a navy shadow is invisible on navy and the system has no lift token. So the dark primary has no visible hover.
   - The secondary has no hover role at all.
   - A: add hover roles: a lighter or darker gold for dark primary hover, and a hover fill for secondary (values to be proposed next).
   - B: hover changes only the cursor and the arrow; no colour change.
   - **Recommendation: A.** A visible hover on every surface is the expected behaviour, and two roles are what the site needs now.

5. **Disabled.**
   - The site uses opacity 0.6–0.65, which isn't a token. WCAG exempts disabled controls from contrast.
   - A: an `opacity.disabled` token.
   - B: disabled colour roles (fill and text).
   - C: no disabled look: keep the button enabled and explain the problem in a message instead.
   - **Recommendation: A**, with `aria-disabled` so it stays focusable and its reason can be read out. A single opacity value is the smallest new token, and it works on both surfaces.

6. **Loading.**
   - A: the label changes to a progress text ("Sending…"), the button gets `aria-disabled="true"`, and a `role="status"` region next to it announces the same text. No spinner.
   - B: a spinner icon plus the same ARIA.
   - **Recommendation: A.** It's what the site does, plus the announcement it's missing. A spinner is a looping animation (decision 42, WCAG 2.2.2) and would need a reduced-motion version.
