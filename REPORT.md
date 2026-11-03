# B-016 · Report

Audit and proposal only. Nothing is built, no token changed, Figma untouched, no commit outside `handoff`.

## 1. Audit

**Sources:**
- `adriadi/portfolio` `main` (`043b6cc`), read in the code and measured in a browser at 1280px. The password page itself isn't protected; no case-study page was opened. No screenshots taken.
- Tag `before-system` for the state before the tokens.
- `test/before-1` and `test/before-2` for what the agent built.

### Fields on the site today (`main`)

| | Contact form: name, email | Contact form: topic | Contact form: message | Password page |
| --- | --- | --- | --- | --- |
| **Element** | `<input type="text">`, `<input type="email">`, `required` | `<select>`, first option "Choose a topic" | `<textarea>`, `required` | `<input type="password">`, `autofocus` |
| **Label** | Visible, `<label for>` linked. 11px Inter 400, uppercase, 0.1em, `color-text`; no type role | Same | Same | `<label for="pw">` linked, but visually hidden |
| **Placeholder** | "Jane Doe", "jane@company.com", in `color-text-placeholder` (4.85:1 on the sand-100 section) | None. "Choose a topic" is an option in `color-text`, so it looks like a chosen value | "Tell me about the role or team…" | "Enter password" |
| **Help text** | None | None | None | None |
| **Error** | None per field. The browser's own `required` bubbles. One form-level `.form-error` (small role, `color-error`) with the server error and a mailto link. No `role`/`aria-live`, so it isn't announced | Same | Same | `.error-msg` "Incorrect password — try again.", small role, `color-error`. Shown by opacity, not linked to the field, no `role`/`aria-live`. The field turns red with a red glow and a shake, and the value is cleared |
| **Border** | Bottom only: 1.5px `color-border-input` (3.10:1 on sand-100) | Same | Same | Full: 1.5px `color-border-input` |
| **Radius** | 0 | 0 | 0 | 10px, no token |
| **Fill** | Transparent, on `color-surface-subtle` (sand-100) | Same | Same | `color-surface` (white), on `color-background` |
| **Height** | 43.5px | 43px; no arrow (`appearance: none`, nothing drawn), so it doesn't look like a dropdown | 100px fixed, `resize: none` | 54.5px |
| **Padding** | 12px 0: no side padding | Same | Same | 16px 56px 16px 20px (room for the eye button) |
| **Font** | Inter 400 15px, line height normal; no type role | Same | Same | Inter 400 16px, 0.1em letter spacing |
| **Focus** | Bottom border to `color-border-strong`, plus the global focus ring (2px `color-focus`, 3px offset) | Same | Same | Border to `color-border-strong`, a soft navy glow (no token), plus the global ring |
| **States** | Default, focus | Default, focus | Default, focus | Default, focus, error. Show/hide button 26×26; its `aria-label` stays "Show password" after it toggles |

**Other code:**
- **CV modal:** `styles.css` styles `.cv-modal-input`, `.cv-modal-label` (10px uppercase) and `.cv-modal-error`, but there's no markup for it on `main` or at `before-system`. It's dead CSS.
- **Tweaks panel** (`js/tweaks-panel.jsx`, also inline in `index.html`): a design-editing tool with range, text, number, colour and select fields. It isn't part of the visitor's site, so I left it out.

### Before the tokens (`before-system`)

This is the state decision 11 describes:
- Labels weren't linked; `for`/`id` were added in `ce2e91e`.
- `outline: none` on every field, so focus showed only as a border colour change.
- Border and placeholder were sand-300 (1.24–1.3:1). Labels were in the muted colour.
- The CV modal error was `oklch(55% 0.2 25)`.

### What the agent built in the "before" runs

Both runs added a "Work with me" inquiry form: name, work email, company (optional), project type (select), message (textarea) and a consent checkbox.

| | `test/before-1` | `test/before-2` |
| --- | --- | --- |
| **Look** | Kept the underline fields | Kept the underline fields |
| **Linking** | `for`/`id`; `aria-describedby` to an error `<p>` per field; `aria-invalid` toggled | Same |
| **Error colour** | `#B3261E` (Material's error red), hard-coded | `oklch(50% 0.18 25)` (= `#B32228`), hard-coded |
| **Error behaviour** | Checked on blur, then live; focus moves to the first invalid field on submit. Server error in `role="alert"` | Same |
| **Required / optional** | `*` on required fields, "(optional)" on company | "(optional)" on company only |
| **Checkbox** | Native, styled by hand; invalid shown as a red outline | Native with `accent-color`; same red outline |
| **Focus** | Kept the ring | Removed the ring from fields (`outline: none` on `:focus-visible`) |
| **Disabled submit** | `opacity: 0.65` | `opacity: 0.65` |

The agent got the structure right both times (linking, `aria-invalid`, focus management). It then invented the colours, the required marking and the focus treatment, differently each time. The system has to fix exactly those.

## 2. Proposal

### The three styles

```
M3 OUTLINED                    M3 FILLED                      OUTLINED, LABEL ABOVE
default                        default                        default
┌──────────────────────┐       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒        Email
│ Email                │       ▒ Email                ▒       ┌──────────────────────┐
└──────────────────────┘       ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁        │ e.g. jane@example.com│
                                                              └──────────────────────┘
focus or filled                focus or filled                focus
┌─ Email ──────────────┐       ▒ Email                ▒       Email
│ jane@example.com     │       ▒ jane@example.com     ▒       ┏━━━━━━━━━━━━━━━━━━━━━━┓  + focus ring
└──────────────────────┘       ━━━━━━━━━━━━━━━━━━━━━━━        ┃ jane@example.com     ┃
                                                              ┗━━━━━━━━━━━━━━━━━━━━━━┛
error                          error                          error
┌─ Email ──────────────┐       ▒ Email                ▒       Email
│ jane@                │       ▒ jane@                ▒       ┌──────────────────────┐ (red)
└──────────────────────┘       ━━━━━━━━━━━━━━━━━━━━━━━ (red)  │ jane@                │
⚠ Enter an email like …        ⚠ Enter an email like …        └──────────────────────┘
                                                              ⚠ Enter an email like …
```

**M3 outlined: the label sits inside the field and floats into the top border.**
- *Accessibility:*
  - The label shrinks to about 12px when it floats: smaller than `small` (13px), the smallest role for running text.
  - A long label is cut off inside the field.
  - The placeholder and the empty label share the same spot, so the hint can show only after focus. That loses the "e.g. Jane Doe" hints from decision 19 until someone clicks.
  - The float is motion, so under reduced motion (decision 42) it must jump instead.
- *Agent and system:*
  - The gap in the border needs either a `<fieldset><legend>` per field or a label background that paints over the border.
  - A painted background must equal whatever surface the field sits on. On a white card it's white, on the contact section it's sand-100, so the component has to know its surface. That's the mistake decision 33 removes.
  - It also needs two label sizes and a CSS trick (`:placeholder-shown` with a placeholder of one space) that agents get wrong easily.
  - `<select>` and `<textarea>` need their own float rules.

**M3 filled: a tinted fill, an indicator line at the bottom, and the same floating label.**
- *Accessibility:*
  - The fill can't mark the field. Every candidate tint is 1.0–1.22:1 against our surfaces, and sand-100 on the sand-100 contact section is 1.00:1.
  - So only the bottom line shows where the field is (WCAG 1.4.11). That is the underline-only look you don't want.
  - It has the same floating-label issues as outlined.
- *Agent and system:* everything from outlined, plus a fill colour that depends on the surface underneath.

**Outlined, label above: a full border, with the label always above the field.**
- *Accessibility:*
  - The label is always visible at a readable size.
  - The placeholder hint can show from the start.
  - No motion. Nothing is cut off.
  - The full 1.5px `color-border-input` border passes 3:1 on every light surface.
- *Agent and system:*
  - The markup is plain HTML: `<label for>` + field + `<p>`.
  - It's the same for input, select and textarea.
  - There are no surface-dependent backgrounds, so an agent can't break it by placing it on a different section.
  - It's also what both "before" runs already wrote, minus the invented colours.

**Recommendation: outlined, label above** (question 1). It keeps M3's full-border field and supporting text, and drops the parts that cost accessibility and robustness.

### Parts and linking

| Part | Element | Linked by |
| --- | --- | --- |
| Label, always visible | `<label class="fds-field__label" for="id">` | `for`/`id` |
| Field | `<input>`, `<select>` or `<textarea class="fds-input">` | `id` |
| Help text (optional) | `<p class="fds-field__help" id="id-help">` | `aria-describedby="id-help"` |
| Error text | `<p class="fds-field__error" id="id-error">`, empty or absent until there's an error | added to `aria-describedby` and `aria-invalid="true"` set on the field while it has an error |

- **Order of `aria-describedby`:** error first, then help, so the error is read first.
- **Required:** `required` on the field. The visible marking is question 8.

### Types in scope

| Type | On the site | Cost | Recommendation |
| --- | --- | --- | --- |
| text, email (also password, tel, url) | Yes | One class for every single-line `<input>` | Now |
| textarea | Yes | Same class; multi-line height and resize | Now |
| select | Yes | Same border and states; needs its own arrow (the site's select has none) | Now |
| password show/hide | Yes, on the password page | A button inside the field: padding, its own label switching between "Show password" and "Hide password" | Question 7 |
| checkbox | No; both "before" runs added one for consent | A different control (box, tick, label on the right, error outline), close to a separate component | Later, as its own item (question 6) |

### States

States come from the element, as in Button: no state classes.

| State | Selector | Border | Fill | Text |
| --- | --- | --- | --- | --- |
| Default | — | 1.5px (`border-width.control`) `color-border-input` | `color-surface` (question 2) | value `color-text`, placeholder `color-text-placeholder` |
| Hover | `:hover` | `color-border-strong` | same | same |
| Focus | `:focus-visible` | `color-border-strong` | same | same, plus the system focus ring: 2px `focus.ring-width`, `color-focus`, 3px `focus.ring-offset`. No glow |
| Filled | — | as default | same | value `color-text`. No separate styling: a value is its own sign |
| Error | `[aria-invalid="true"]` | `color-error` (focus: still the focus ring) | same | value `color-text`; message below in `color-error` |
| Disabled | `:disabled` (question 5) | as default | same | whole field at `opacity.disabled` 0.6 |
| Read-only | — | — | — | Not now: the site has none (question 10) |

**Hover vs focus:** both darken the border to `color-border-strong`. Focus adds the ring, so the two never look the same.

### Sizes and shape (existing tokens)

| | Value | Token |
| --- | --- | --- |
| Field height | at least 48px, the same as the main buttons (decision 56), so a field and a button line up in a row | `space-12` as `min-height` |
| Padding | 8px top and bottom, 16px left and right | `space-2`, `space-4` |
| Select | 40px right padding for the arrow | `space-10` |
| Textarea | at least 120px high, resizable vertically | `space-30` as `min-height` |
| Radius | 8px | `radius-md` (question 3) |
| Border | 1.5px | `border-width.control` (decision 56) |
| Label → field gap | 8px | `space-2` |
| Field → help/error gap | 8px | `space-2` |
| Label text | `small`, `color-text` | existing role |
| Value and placeholder text | `body` (15→16px) | existing role; but see question 4 |
| Help text | `small`, `color-text-muted` | existing role |
| Error text | `small`, `color-error` | existing role |

The only new token this needs is the one in question 4, if you choose it.

### Contrast

Light surfaces, the ones a field can sit on:

| Pair | on `color-background` (sand-50) | on `color-surface` (white) | on `color-surface-subtle` (sand-100) | Minimum |
| --- | --- | --- | --- | --- |
| value, label: `color-text` | 10.01 | 11.27 | 9.24 | 4.5 |
| placeholder: `color-text-placeholder` | 5.25 | 5.91 | 4.85 | 4.5 |
| help: `color-text-muted` | 5.25 | 5.91 | 4.85 | 4.5 |
| error text: `color-error` | 5.88 | 6.61 | 5.42 | 4.5 |
| border: `color-border-input` | 3.36 | 3.78 | 3.10 | 3 |
| hover/focus border: `color-border-strong` | 10.01 | 11.27 | 9.24 | 3 |
| focus ring: `color-focus` | 10.01 | 11.27 | 9.24 | 3 |
| error border: `color-error` | 5.88 | 6.61 | 5.42 | 3 |

- **With the white fill (question 2):** the text inside the field is always measured against white (5.91–11.27), and the border has 3.78:1 against the fill and 3.10–3.78:1 against the surface around it. Everything passes.
- **Disabled at 0.6 opacity:** text 3.29–3.56:1, border 1.86–2.06:1. WCAG exempts inactive controls; the reason goes in help text, which stays at full contrast.

Dark surface (`color-surface-dark`, navy-900), with the roles as they resolve inside `.fds-surface-dark`:

| Pair | Ratio | Result |
| --- | --- | --- |
| label, value `color-text` (sand-50) | 10.01 | passes |
| help `color-text-muted` (sand-400) | 6.25 | passes |
| focus ring `color-focus` (gold-500) | 6.11 | passes |
| placeholder `color-text-placeholder` (light-only, stone-600) | 1.91 | fails |
| error `color-error` (light-only) | 1.70 | fails |
| border `color-border-input` (light-only) | 2.98 | fails |
| hover/focus border `color-border-strong` (light-only) | 1.00 | fails |
| a white-filled field inside a dark surface: value text switches to sand-50 | 1.13 | fails |

The form roles are light-only by design: `LIGHT_ONLY` in `scripts/surfaces.js`, and "Forms appear only on light surfaces" in their descriptions. So Input stays on light surfaces; dark-surface fields would need new roles (question 9).

### Error pattern

- **Where:** directly below the field, in `.fds-field__error`, linked through `aria-describedby`, with `aria-invalid="true"` on the field.
- **Not colour alone (WCAG 1.4.1):**
  - a text message;
  - a warning icon before it: an inline SVG in `currentColor` with `aria-hidden="true"`; the text carries the meaning;
  - the red border.
- **Wording:** what to do, not what went wrong: "Enter your name.", "Enter an email address like name@example.com." No "Error:" prefix and no blame. That is the same style as the "before" runs, which got this right.
- **When:**
  - Check a field when it loses focus, then live while it's being fixed.
  - On submit, check every field and move focus to the first invalid one; its error is then read out with it.
  - No live region per field (too noisy).
  - A form-level message (server error) goes in one `role="alert"` region above the submit button. That's a form pattern; the docs can show it without its own class.

### Class names

Following `fds-button`, states from the element:

```html
<div class="fds-field">
  <label class="fds-field__label" for="email">Email</label>
  <input class="fds-input" id="email" type="email" placeholder="e.g. jane@example.com"
         aria-describedby="email-error email-help" aria-invalid="true" required>
  <p class="fds-field__help" id="email-help">Used only to reply to you.</p>
  <p class="fds-field__error" id="email-error"><svg aria-hidden="true">…</svg>Enter an email address like name@example.com.</p>
</div>
```

- `fds-field`: the wrapper (label, field, help, error, gaps).
- `fds-input`: the field itself, the same class on `<input>`, `<textarea>` and `<select>`. The element decides the details: a textarea grows, a select gets the arrow.
- No modifier classes are needed now. A size modifier would come only if a smaller field is ever needed.

### How this differs from the fields on the site today

| | Today | Proposal |
| --- | --- | --- |
| **Shape** | Underline only, no side padding (contact); a separate full-border style with a 10px radius (password) | One style: full 1.5px border, 8px radius, 16px side padding, white fill |
| **Size** | 43.5px (contact) and 54.5px (password) | At least 48px, matching the buttons |
| **Label** | 11px uppercase with tracking, no role (contact); hidden (password) | Always visible, `small` role, sentence case |
| **Errors** | None per field; form and password messages not linked or announced; a red glow and a shake | Per field, linked, `aria-invalid`, icon + text + red border, focus to the first error; no glow, no shake |
| **Hover / disabled** | None | Both, from tokens |
| **Focus** | Ring plus a border change; a glow on the password field | Ring plus a border change, the same on every field |
| **Select** | No arrow | Arrow |
| **Help text** | None | Optional, linked |

## 3. Questions

1. **Field style.**
   - A: outlined, label above.
   - B: M3 outlined, floating label.
   - C: M3 filled.

   **Recommendation: A.** The label is always readable, there's no motion and no surface-dependent paint, and it's the plainest markup for an agent. C falls back to an underline as the only visible boundary (fill 1.0–1.22:1).
2. **Field fill.**
   - A: `color-surface` (white).
   - B: transparent, as M3 outlined.

   **Recommendation: A.** The field reads as a field on beige and sand-100 sections. All text inside it is measured against one colour (white). It matches the password field the site already has.
3. **Radius.** Decision 39 doesn't list fields.
   - A: `radius-md` 8px, and add "form fields" to its description.
   - B: `radius-sm` 4px (M3's text field radius), and add it there.

   **Recommendation: A.** It's the step closest to the site's password field (10px). It sits better next to pill buttons than 4px, which reads square. And `radius-sm` is described for small inline blocks.
4. **Value text size on phones.** `body` is 15px on a 390px screen. iOS Safari zooms the page when a field with text under 16px gets focus.
   - A: a new text role `field`: Inter 400, 16px at every width, line height 1.5, for the value and placeholder.
   - B: use `body` and accept the zoom.
   - C: raise `body` to 16px minimum everywhere.

   **Recommendation: A.** It fixes the zoom without changing body text across the site. The cost is an eleventh role.
5. **Disabled.**
   - A: the native `disabled` attribute plus `opacity.disabled`, with the reason in linked help text.
   - B: the Button pattern: `aria-disabled="true"` plus `readonly`, so the field stays focusable.

   **Recommendation: A.** This is the reason to differ from Button: `aria-disabled` alone doesn't stop typing on a field. B needs `readonly` and a script, and the value would still be sent with the form. Screen readers still read a disabled field and its help text in browse mode. The site has no disabled field today, so this only sets the pattern.
6. **Checkbox.**
   - A: leave it for later, as its own item.
   - B: add it to Input now.

   **Recommendation: A.** The site doesn't use one. It's a different control with its own states, and depth over breadth (decision 6).
7. **Password show/hide button.**
   - A: part of Input: `fds-field__action` for one icon button inside the field's right edge, with a 48px hit area and its label switching between "Show password" and "Hide password".
   - B: leave it to the page.

   **Recommendation: A.** The site has one. Left to the page, the next agent builds it differently, as the current one does with a label that never changes.
8. **Required and optional marking.**
   - A: mark only optional fields, with "(optional)" in the label.
   - B: an asterisk on required fields plus a "* Required" note.

   **Recommendation: A.** The site's forms are mostly required fields. Words need no legend, and a screen reader reads them as they are. Both "before" runs already used "(optional)".
9. **Fields on dark surfaces.**
   - A: light surfaces only, as the form roles already are, and the docs say so.
   - B: add dark-surface values for placeholder, border, error and strong border.

   **Recommendation: A.** No field sits on a dark surface on the site. B is four new roles for no current need.
10. **Read-only state.**
    - A: not now.
    - B: add it now: a `color-surface-subtle` fill and no hover.

    **Recommendation: A.** The site has no read-only field ("add a token only when something on the site needs it now").
