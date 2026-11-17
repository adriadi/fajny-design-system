# Highlight

A block that sets one thing apart from the text around it. It's a quote, an insight or a cited statistic on a light fill, or the one tension or decision of a story on a dark one (decisions 22 and 76). Stylesheet: `components/highlight.css` (link `tokens/css/tokens.css` first).

## Variants

Two variants of one component: the light one for what someone said or found, and the dark one for what the story turns on.

| Variant | Class | Use it for |
| --- | --- | --- |
| Light | `fds-highlight` | A user's quote, the author's own words, a cited statistic, an insight. A `color-surface-highlight` fill with a `color-border-highlight` rule on the left, and an optional icon before the text. |
| Dark | `fds-highlight fds-highlight--dark` | The block that states one tension, gap or decision: a label, a heading and one or two short paragraphs, on `color-surface-dark`. |

The light variant is always light, even inside a dark surface, and the dark variant is always dark, on any surface: `tokens.css` switches the roles for each by itself, so nothing else is needed in the HTML. Use one highlight at a time: it only works against text that isn't highlighted. Lists of quotes are Cards, not Highlights (decision 77).

## Parts

| Part | Element | Variant | Notes |
| --- | --- | --- | --- |
| Highlight | `<figure class="fds-highlight">` (light), `<div class="fds-highlight fds-highlight--dark">` (dark) | both | No outer margin: the space around it is the page's. |
| Icon (optional) | `<span class="fds-highlight__icon" aria-hidden="true">` with an `<svg>` | light | 20px (`space-5`), in `color-text`, before the text. Leave it out for a plain quote. It is decoration: if it carries meaning, say so in the text. |
| Body | `<div class="fds-highlight__body">` | light | Holds the quote and the source, so the icon sits beside both. |
| Quote | `<blockquote class="fds-highlight__quote">` | light | The text, in the `quote` role. For an insight with no source, a `<p>` does the same. |
| Source | `<figcaption class="fds-highlight__cite">` | light | Who said it, or where the figure comes from, in the `small` role and `color-text-muted`. Omit it for an insight. |
| Label | `<p class="fds-highlight__label">` | dark | The `overline` role, in sentence case: the role makes it uppercase. |
| Title | `<h3 class="fds-highlight__title">` | dark | The `subheading` role. The heading level is the page's: use the one that fits its outline. |
| Text | `<p class="fds-highlight__text">` | dark | The `body` role in `color-text-muted`. One or two paragraphs. |

Write the quote's marks in the text (typographic quotes, “ and ”) when it is somebody's words; the style doesn't add them.

## The quote role

A twelfth text role carries the text of the light variant (decision 76). No existing role combines Syne, italic and a 1.4 line height in this range.

| | Token | Value |
| --- | --- | --- |
| Family | `font.family.quote` | Syne |
| Size | `font.size.quote` | `clamp(1.125rem, 0.9059rem + 0.899vw, 1.625rem)`: 18px at 390px, 26px at 1280px |
| Line height | `font.line-height.quote` | 1.4 |
| Weight | `font.weight.quote` | 400 |
| Letter spacing | `font.letter-spacing.quote` | 0 |
| Style | `font.style.quote` | italic |

One size for every use: it's the pull-quote's size (18 to 26px). The insight that used to sit in a smaller size (15 to 18px) takes the same, so one role covers every light highlight. Syne has no italic of its own, so the browser slants it; Figma has no Syne italic either, so its text style is upright (the description says so). Never gold. Mobile 18px is a minimum, like every role, and the maximum stays within 2.5 times the minimum, so the text can zoom to 200% (WCAG 1.4.4).

## Corners and rule

The light variant's rule is `border-width.default` (1.5px, decision 64), not a thicker one of its own. Its corners are square on all four sides: a rule on one side only is never paired with corners rounded on the other (decision 75). The dark variant has `radius-sm` on all four corners, since it has no one-sided border.

## Spacing, and the two bugs it fixes

Padding: `space-6` above and below and `space-8` at the sides for the light variant (`space-gutter`, 16 to 48px, at the sides for the dark one, with `space-10` above and below). The icon is `space-4` from the text.

A page often styles its own headings and paragraphs, for example `body.cs h3 { margin-top: … }` or `body.cs p { margin-bottom: … }`, and those rules used to win over the block's own spacing. Every part that sets a margin, a colour or a type style now does it with two classes (`.fds-highlight .fds-highlight__title`), which beat a rule of one class and an element, so the spacing holds on any page without `!important`.

| Gap | Before (the page rule won) | Now |
| --- | --- | --- |
| Label to heading, dark | 40px (`body.cs h3` margin-top `space-10`) | 16px (`space-4`) |
| Quote to source, light | 20px (`body.cs p` margin-bottom `space-5`) | 12px (`space-3`) |

The preview shows both blocks inside an article that has exactly those page rules.

## Colour and contrast

Every pair passes WCAG AA.

| Variant | Text | Contrast |
| --- | --- | --- |
| Light | quote and icon, `color-text` on `color-surface-highlight` | 9.32:1 |
| Light | source, `color-text-muted` on `color-surface-highlight` | 4.89:1 |
| Dark | label and title, `color-text` (light) on `color-surface-dark` | 10.01:1 |
| Dark | text, `color-text-muted` (light) on `color-surface-dark` | 6.25:1 |

The light variant's rule is decorative: 2.06:1 against its fill (decision 31). The fill and the italic type already set the quote apart; the rule carries no meaning of its own.

## Do and don't

- **Do** use one highlight at a time, against plain text.
- **Do** give a quote or a statistic its source, in the source line.
- **Do** keep the dark label, heading and text short: it states one thing.
- **Don't** stack several highlights in a row, or use one for a list of quotes: those are Cards (decision 77).
- **Don't** set margins on the parts from the page: the component's spacing holds on its own.
- **Don't** put the icon in a plain quote, or text in the icon.
- **Don't** round only some corners of the light variant.

## Copy-paste HTML

```html
<!-- Light: a quote -->
<figure class="fds-highlight">
  <div class="fds-highlight__body">
    <blockquote class="fds-highlight__quote">“Nothing ships unless the person it is for can understand it on day one.”</blockquote>
    <figcaption class="fds-highlight__cite">Name · Role, Organisation</figcaption>
  </div>
</figure>

<!-- Light with an icon: an insight -->
<aside class="fds-highlight">
  <span class="fds-highlight__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>
  </span>
  <div class="fds-highlight__body">
    <p class="fds-highlight__quote">Changes showed up on both devices at once, with no refresh and no waiting.</p>
  </div>
</aside>

<!-- Dark -->
<div class="fds-highlight fds-highlight--dark">
  <p class="fds-highlight__label">The core gap</p>
  <h3 class="fds-highlight__title">One sentence that states it.</h3>
  <p class="fds-highlight__text">One or two short paragraphs that say what follows from it.</p>
</div>
```
