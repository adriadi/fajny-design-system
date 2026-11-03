# Button

A control that takes the user somewhere or does something. Three variants, one navigation size, every state from the element itself. Stylesheet: `components/button.css` (link `tokens/css/tokens.css` first). Every variant in every state, light and dark: open `docs/button-preview.html`.

## Variants

| Variant | Class | Use it for | Don't use it for |
| --- | --- | --- | --- |
| Primary | `fds-button fds-button--primary` | The one main action of a section or a form: "Continue", "Save changes". | A second action next to a primary button; use secondary. More than one primary in view. |
| Secondary | `fds-button fds-button--secondary` | An action next to the primary one, or a lesser action on its own: "Learn more". | The main action of a form. Links inside running text. |
| Link | `fds-button fds-button--link` | Navigation links and quiet actions in a row: "Read more", "Pricing". | Links inside a sentence; they stay text links in the paragraph's style. The main action of a page. |

Navigation size: add `fds-button--nav` to a primary button in the top navigation ("Contact"). It's 32px high to the eye and 48px to the pointer.

On a dark surface (inside `.fds-surface-dark`) nothing changes in the HTML:
- **Primary** turns gold with a navy label.
- **Link** turns light.
- **Secondary** looks the same on every surface: light blue fill, navy label.

## `<a>` or `<button>`

- **`<a href>`** when it goes somewhere: another page, a section, a file, an email address.
- **`<button type="button">`** (or `type="submit"` in a form) when it does something on the page: send a form, open a dialog, pause motion.
- **Same look:** the classes are the same on both. Pick the tag by what happens, never by the look.

## States

Every variant in every state, on a light and a dark surface.

| State | Primary | Secondary | Link |
| --- | --- | --- | --- |
| Default | `color-action` fill, `color-text-on-action` label | `color-secondary` fill, `color-border-highlight` border (`border-width.control`), `color-text-on-secondary` label | `color-text-muted` |
| Hover and pressed | `color-action-hover` | `color-secondary-hover` | `color-text` |
| Focus | ring: `color-focus`, `focus.ring-width`, `focus.ring-offset` | same | same |
| Disabled | `opacity.disabled` | same | not available: a link can't be disabled |
| Loading | default look, progress text as the label | same | not available |

| Variant | Light surface | Dark surface |
| --- | --- | --- |
| Primary | navy, cream label (10.01:1); hover lighter navy (7.36:1) | gold, navy label (6.11:1); hover cream (10.01:1) |
| Secondary | light blue, navy label (9.32:1); hover blue (6.61:1) | the same as on light |
| Link | muted (5.25:1 on the page background); hover navy | light muted (6.25:1); hover cream |

Colour changes take `duration-fast` with `easing-standard`. Nothing moves, so reduced motion needs no change.

## Accessibility

- **Focus:** every variant shows the system's focus ring on keyboard focus. On a dark surface it turns gold by itself. Don't remove the outline.
- **Size:** main buttons are 48px high. The navigation button is 32px high and its clickable area is extended to 48px by a transparent `::after` (WCAG 2.5.5). Links are at least 24px high (WCAG 2.5.8).
- **Disabled:** use `aria-disabled="true"`, not the `disabled` attribute. The button stays focusable, so a screen reader can reach it, and the reason next to it can be read. Your script must ignore activation while it's set. Don't disable links: remove them or explain why the destination isn't available.
- **Loading:** replace the label with a progress text, set `aria-disabled="true"` and `data-loading`, and put the same text in a `role="status"` region next to the button, so it's announced. No spinner: it would be a looping animation (decision 42). When it's done, restore the label, remove both attributes, and announce the result in the same region.
- **Label:** write it in sentence case. The `label` role makes it uppercase, and screen readers read the sentence-case text. An icon inside a button is decoration (`aria-hidden="true"`); a button with only an icon needs an `aria-label`.

## Do and don't

- **Do** use one primary button per section; put the secondary next to it, after it.
- **Do** keep labels short verbs or destinations: "Save changes", "Continue".
- **Don't** make square or partly rounded buttons: every button is a pill (decision 39).
- **Don't** add shadows, lifts or other movement on hover.
- **Don't** set a colour, size or font on a button by hand. If a button needs something the variants don't give, the system is missing a role: ask for it.
- **Don't** put a secondary button's label in `color-text`: on a dark surface it would turn cream on the light fill (1.07:1).

## Copy-paste HTML

```html
<!-- Primary: goes somewhere -->
<a class="fds-button fds-button--primary" href="#next">Continue</a>

<!-- Secondary: does something -->
<button class="fds-button fds-button--secondary" type="button">Learn more</button>

<!-- Link -->
<a class="fds-button fds-button--link" href="#pricing">Pricing</a>

<!-- Navigation button -->
<a class="fds-button fds-button--primary fds-button--nav" href="#contact">Contact</a>

<!-- With an icon -->
<a class="fds-button fds-button--primary" href="#next">
  Continue
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>

<!-- Disabled, with its reason -->
<button class="fds-button fds-button--primary" type="submit" aria-disabled="true" aria-describedby="send-hint">Save changes</button>
<p id="send-hint">Fill in your name and email to continue.</p>

<!-- Loading -->
<button class="fds-button fds-button--primary" type="submit" aria-disabled="true" data-loading>Saving…</button>
<p role="status">Saving your changes…</p>

<!-- On a dark surface: the same HTML -->
<section class="fds-surface-dark">
  <a class="fds-button fds-button--primary" href="#demo">Book a demo</a>
  <a class="fds-button fds-button--secondary" href="#guide">Learn more</a>
</section>
```
