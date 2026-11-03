# Input

A field where the user types or picks a value. One class for text fields, selects and text areas, with the label always above the field and help or error text below it (decisions 59, 60 and 61). Stylesheet: `components/input.css` (link `tokens/css/tokens.css` first). Every type in every state, with a form to try: open `docs/input-preview.html`.

## Parts

| Part | Element | Linked by |
| --- | --- | --- |
| Wrapper | `<div class="fds-field">` | — |
| Label, always visible | `<label class="fds-field__label" for="id">` | `for` and the field's `id` |
| Field | `<input>`, `<select>` or `<textarea>` with `class="fds-input"` | `id` |
| Help text (optional) | `<p class="fds-field__help" id="id-help">`, hidden while the field shows an error | the field's `aria-describedby`, while it shows |
| Error text | `<p class="fds-field__error" id="id-error" hidden>`, with the warning icon | the field's `aria-describedby`, only while it shows, and `aria-invalid="true"` |
| Show/hide button (password only) | `<button class="fds-field__action" type="button">` | `aria-controls` with the field's `id` |

Write the parts in this order: label, field, show/hide button, help, error. `aria-describedby` lists only the text that shows: the help, or while there's an error, the error alone (`aria-describedby="id-error"`). A hidden element that is still listed would be read out, so the script below changes the list.

## Types

| Type | Element | Notes |
| --- | --- | --- |
| Text | `<input class="fds-input">` with `type="text"`, `email`, `tel`, `url` or `password` | Set `autocomplete` (`name`, `email`, `current-password`…), so browsers can fill it. |
| Select | `<select class="fds-input">` | The arrow comes from the stylesheet. An empty first option (`value=""`) is a hint, like "Choose a topic", and takes the placeholder colour. |
| Text area | `<textarea class="fds-input">` | At least `space-30` (120px) high, resizable up and down only. |
| Password | `<input type="password" class="fds-input">` plus the show/hide button | See "Password show/hide". |

No checkbox and no read-only field yet.

## States

Every type in every state, on a light surface.

| State | From | Field |
| --- | --- | --- |
| Default | — | `color-surface` fill, 1.5px `color-border-input` border (`border-width.default`), `radius-md`. Value in `color-text`, placeholder in `color-text-placeholder`, both in the `field` role. |
| Hover | `:hover` | Border `color-border-strong`. |
| Focus | `:focus-visible` | Border `color-border-strong`, plus the system focus ring: `focus.ring-width` in `color-focus` at `focus.ring-offset`. |
| Error | `aria-invalid="true"` | Border `color-error`, in every state; focus still adds the ring. The error message shows below, in place of the help text. |
| Disabled | the `disabled` attribute | The field at `opacity.disabled`. The label and the help text stay at full contrast. |

Sizes: at least 48px high (`space-12`), like the main buttons, so a field and a button line up. Padding `space-2` and `space-4`; a select keeps `space-10` on the right for its arrow, a password field `space-12` for its button. Label, help and error text use the `small` role.

Nothing animates, so reduced motion needs no change.

| Pair | On `color-background` | On `color-surface` (the field) | On `color-surface-subtle` |
| --- | --- | --- | --- |
| Value and label, `color-text` | 10.01:1 | 11.27:1 | 9.24:1 |
| Placeholder and help, `color-text-placeholder`, `color-text-muted` | 5.25:1 | 5.91:1 | 4.85:1 |
| Error text and border, `color-error` | 5.88:1 | 6.61:1 | 5.42:1 |
| Border, `color-border-input` | 3.36:1 | 3.78:1 | 3.10:1 |

## Light surfaces only

Use fields on `color-background`, `color-surface` and `color-surface-subtle`. Never put one inside `.fds-surface-dark`: the placeholder, border and error roles have no dark-surface value, and the field's text would turn light on its white fill (1.13:1).

## Required and optional

Mark only the optional fields, with "(optional)" in the label: `<label …>Company (optional)</label>`. Every other field is required: give it the `required` attribute. No asterisks.

## Errors

- **Where:** directly below the field, in `fds-field__error`, starting with the warning icon. The text, the icon and the red border together mean colour is never the only sign (WCAG 1.4.1).
- **In place of the help:** while the error shows, the help text is hidden (`hidden`, so screen readers skip it too). One message under the field at a time, as in M3. When the error clears, the help comes back.
- **What it says:** what to do, in one short sentence: "Enter your name.", "Enter an email address like name@example.com.". No "Error:", no blame.
- **When:**
  - A field is checked when it loses focus, then again on every change while it's being fixed.
  - On submit, every field is checked and focus moves to the first invalid one, so its message is read out with it.
  - A message for the whole form (the server didn't answer) goes in one `role="alert"` region above the submit button.

Put each field's message in the HTML, hidden, and give the form `novalidate` and `data-fds-validate`. The script uses the browser's own checks (`required`, `type="email"`) and shows your message instead of the browser's:

```js
// Input: error check (decisions 60, 61). For every form with data-fds-validate: a field is checked when
// it loses focus, then live while it's being fixed; on submit, focus moves to the first invalid field.
// While a field shows its error, the error replaces the help text.
document.querySelectorAll('form[data-fds-validate]').forEach((form) => {
  const inputs = [...form.querySelectorAll('.fds-input')];
  const check = (input) => {
    const field = input.closest('.fds-field');
    const error = field.querySelector('.fds-field__error');
    const help = field.querySelector('.fds-field__help');
    const invalid = !input.disabled && !input.checkValidity();
    if (invalid) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    if (error) error.hidden = !invalid;
    if (help) help.hidden = invalid && Boolean(error);
    const describedBy = invalid && error ? error.id : help?.id;
    if (describedBy) input.setAttribute('aria-describedby', describedBy);
    else input.removeAttribute('aria-describedby');
    return !invalid;
  };
  inputs.forEach((input) => {
    input.addEventListener('blur', () => { input.dataset.checked = ''; check(input); });
    input.addEventListener('input', () => { if ('checked' in input.dataset) check(input); });
    input.addEventListener('change', () => { if ('checked' in input.dataset) check(input); });
  });
  form.addEventListener('submit', (event) => {
    const invalid = inputs.filter((input) => { input.dataset.checked = ''; return !check(input); });
    if (invalid.length) {
      event.preventDefault();
      invalid[0].focus();
    }
  });
});
```

## Disabled

Use the `disabled` attribute: it stops typing and keeps the value out of the form, which `aria-disabled` alone doesn't do on a field. Say why in the help text, so it can still be read: screen readers read a disabled field and its description when they go through the page. Disable the show/hide button with its field.

## Password show/hide

A button inside the field's right edge, 48px square. Its label says what it does next, "Show password" or "Hide password", and the eye icon changes with it. The script:

```js
// Input: password show/hide (decision 60). The button's label and icon say what the next press does.
document.querySelectorAll('.fds-field__action[data-toggle-password]').forEach((button) => {
  const input = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    button.querySelector('[data-icon="show"]').toggleAttribute('hidden', show);
    button.querySelector('[data-icon="hide"]').toggleAttribute('hidden', !show);
  });
});
```

## Do and don't

- **Do** keep the label visible above every field. A placeholder is a hint ("e.g. Jane Doe"), never the label.
- **Do** write each error message into the HTML and link it as above.
- **Don't** put a field on a dark surface.
- **Don't** style a field by hand: no other border, radius, height, glow or shake. If a form needs something Input doesn't give, the system is missing a role: ask for it.
- **Don't** use an underline-only field or a floating label.
- **Don't** remove the focus ring, and don't add a coloured shadow on focus.

## Copy-paste HTML

```html
<form novalidate data-fds-validate>

  <!-- Text -->
  <div class="fds-field">
    <label class="fds-field__label" for="name">Name</label>
    <input class="fds-input" id="name" type="text" autocomplete="name" placeholder="e.g. Jane Doe" required>
    <p class="fds-field__error" id="name-error" hidden><svg data-icon="warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10.3 4.4 2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/></svg>Enter your name.</p>
  </div>

  <!-- Email with help -->
  <div class="fds-field">
    <label class="fds-field__label" for="email">Email</label>
    <input class="fds-input" id="email" type="email" autocomplete="email" placeholder="e.g. name@example.com" required aria-describedby="email-help">
    <p class="fds-field__help" id="email-help">Only used to reply to you.</p>
    <p class="fds-field__error" id="email-error" hidden><svg data-icon="warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10.3 4.4 2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/></svg>Enter an email address like name@example.com.</p>
  </div>

  <!-- Error: what the email field looks like after a wrong value -->
  <div class="fds-field">
    <label class="fds-field__label" for="email-2">Email</label>
    <input class="fds-input" id="email-2" type="email" value="name@" aria-invalid="true" aria-describedby="email-2-error">
    <p class="fds-field__help" id="email-2-help" hidden>Only used to reply to you.</p>
    <p class="fds-field__error" id="email-2-error"><svg data-icon="warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10.3 4.4 2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/></svg>Enter an email address like name@example.com.</p>
  </div>

  <!-- Select -->
  <div class="fds-field">
    <label class="fds-field__label" for="topic">Topic</label>
    <select class="fds-input" id="topic" required>
      <option value="">Choose a topic</option>
      <option>A question about a project</option>
      <option>Something else</option>
    </select>
    <p class="fds-field__error" id="topic-error" hidden><svg data-icon="warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10.3 4.4 2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/></svg>Choose a topic.</p>
  </div>

  <!-- Text area, optional -->
  <div class="fds-field">
    <label class="fds-field__label" for="message">Message (optional)</label>
    <textarea class="fds-input" id="message" placeholder="What would you like to ask?" aria-describedby="message-help"></textarea>
    <p class="fds-field__help" id="message-help">A few sentences are enough.</p>
  </div>

  <!-- Password with show/hide -->
  <div class="fds-field">
    <label class="fds-field__label" for="password">Password</label>
    <input class="fds-input" id="password" type="password" autocomplete="current-password" required aria-describedby="password-help">
    <button class="fds-field__action" type="button" aria-controls="password" aria-label="Show password" data-toggle-password><svg data-icon="show" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg><svg data-icon="hide" hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/></svg></button>
    <p class="fds-field__help" id="password-help">At least 8 characters.</p>
    <p class="fds-field__error" id="password-error" hidden><svg data-icon="warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10.3 4.4 2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/></svg>Enter your password.</p>
  </div>

  <!-- Disabled, with the reason in the help text -->
  <div class="fds-field">
    <label class="fds-field__label" for="workspace">Workspace name</label>
    <input class="fds-input" id="workspace" type="text" value="Northwind" disabled aria-describedby="workspace-help">
    <p class="fds-field__help" id="workspace-help">Only the workspace owner can change this.</p>
  </div>

  <button class="fds-button fds-button--primary" type="submit">Continue</button>
</form>
```
