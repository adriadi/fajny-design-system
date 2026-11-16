# Tag

A short label in a pill, such as a topic, a status, a role or a skill. It's text only and never clickable, in one size (decisions 69 and 70). Stylesheet: `components/tag.css` (link `tokens/css/tokens.css` first).

## Parts

| Part | Element | Notes |
| --- | --- | --- |
| Tag | `<span class="fds-tag">` | The label is the content. Write it in sentence case: the style makes it uppercase. |
| Status dot (optional) | `<span class="fds-tag__dot" aria-hidden="true">` before the label | For a status such as "Open to new work", on a light surface only. It's decoration: the text says the status. |

A list of tags is a `<ul>` with one `<li>` per tag (a `fds-tag` on each `<li>`), so a screen reader counts them; give the list an `aria-label`. A single tag in a sentence-like row can be a `<span>`.

## Variants

Four looks of one size, shown on the page background, on a subtle surface, inside a dark surface and on a photo.

| Variant | Class | Use it for |
| --- | --- | --- |
| Default | `fds-tag` | Most tags: topics, roles, years, statuses. An outlined pill that follows the surface it's on: navy text on a light surface, light text on a dark one. |
| Accent | `fds-tag fds-tag--accent` | The one thing to notice in a row of tags on a dark surface, such as a core skill: gold text and a gold border on a solid dark fill. Dark surfaces only. |
| Filled | `fds-tag fds-tag--filled` | A tag that is selected or current: a gold pill with navy text, on any surface. |
| Muted | `fds-tag fds-tag--muted` | A tag that's pushed back, such as a skill that doesn't match the current choice: muted text and the plain border. Add it to the Default or the Accent tag, never to a Filled one: muted text on gold doesn't pass. |
| On a photo | `fds-tag fds-surface-dark` | A tag over a picture: it becomes a solid dark pill with light text, so the text stays readable on any photo. |

Choose a variant on purpose; nothing switches a tag to another variant by itself. The tag's size is set once and doesn't change.

## No states

A tag isn't a control, so it has no hover, focus or pressed state, and no pointer cursor. If it needs to be clicked or to filter something, use a Button: a control needs the focus, pressed and disabled states that a tag doesn't carry. Dimming is a variant (Muted), not a state, and it's done with colour: opacity would lower the contrast along with the look.

## Colour and contrast

Every pair passes WCAG AA at the tag's size (11px at 390px, 12px at 1280px, uppercase, 600).

| Variant, on | Text | Contrast |
| --- | --- | --- |
| Default, on `color-background` | `color-text` | 10.01:1 |
| Default, on `color-surface` | `color-text` | 11.27:1 |
| Default, on `color-surface-subtle` | `color-text` | 9.24:1 |
| Default, inside a dark surface | `color-text` (light) | 10.01:1 |
| Accent, on its own `color-surface-dark` fill | `color-accent` | 6.11:1 |
| Filled, on `color-accent` | `color-text-on-accent` | 6.11:1 |
| Muted, on `color-background` | `color-text-muted` | 5.25:1 |
| Muted, on `color-surface` | `color-text-muted` | 5.91:1 |
| Muted, on `color-surface-subtle` | `color-text-muted` | 4.85:1 |
| Muted, inside a dark surface, and the dimmed Accent | `color-text-muted` (light) | 6.25:1 |
| Status dot, on `color-surface` | `color-success` (3:1 needed) | 7.06:1 |

The border is decorative (a tag is read by its text), so it has no contrast minimum. Gold text is allowed only on the Accent tag's own dark fill: `color-accent` isn't a text colour anywhere else.

## Type and size

One size for every tag: the `overline` text role (11px at 390px, growing to 12px at 1280px; Inter 600; uppercase; 0.12em), padding `space-1` above and below and `space-3` at the sides, a `border-width.default` border, `radius-pill`, and `space-2` between the dot and the label. The tag is about 26px tall. Don't set another size, even for a tag over a photo.

The tag stays on one line (`white-space: nowrap`): keep labels short, two or three words.

## Do and don't

- **Do** use a tag for what something is: a topic, a status, a role, a year.
- **Do** keep the text short.
- **Do** use Muted or Accent to tell tags in a row apart, rather than a new colour.
- **Don't** make a tag clickable or give it a hover: use a Button or a link.
- **Don't** use the Accent tag on a light surface, or the status dot on a dark one.
- **Don't** dim a tag with `opacity`.
- **Don't** put a tag in a `<button>` or an `<a>`.

## Copy-paste HTML

```html
<!-- Default -->
<span class="fds-tag">Design process</span>

<!-- With a status dot, on a light surface -->
<span class="fds-tag"><span class="fds-tag__dot" aria-hidden="true"></span>Open to new work</span>

<!-- A list of tags -->
<ul aria-label="Project details">
  <li class="fds-tag">Founding designer</li>
  <li class="fds-tag">2025–26</li>
</ul>

<!-- On a dark surface: accent, default and muted -->
<section class="fds-surface-dark">
  <span class="fds-tag fds-tag--accent">Research</span>
  <span class="fds-tag">Prototyping</span>
  <span class="fds-tag fds-tag--accent fds-tag--muted">Research</span>
</section>

<!-- Over a photo -->
<span class="fds-tag fds-surface-dark">Case study</span>
```
