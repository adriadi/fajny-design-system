# Card

A block that groups a title with its text, and often leads to one page. Two parts of one component, text only and with an image on top, in a default white and a secondary version for dark surfaces (decisions 62, 65 and 66). Stylesheets: `components/card.css`, and `components/image.css` for a card with an image (link `tokens/css/tokens.css` first). Every variant on every surface, with hover, the two secondary treatments and reduced motion to try: open `docs/card-preview.html`.

## Parts

| Part | Element | Optional |
| --- | --- | --- |
| Card | `<article class="fds-card">` | — |
| Media | `<div class="fds-card__media">`, first in the card, with `fds-card--image` on the card: holds the image and the badge | yes |
| Image | `<img class="fds-image">` in the media (see `docs/image.md`) | yes |
| Badge | `<span class="fds-card__badge" aria-hidden="true">` in the media, with the arrow icon: a gold circle that shows on hover | only on a linked card with an image |
| Body | `<div class="fds-card__body">` | — |
| Overline | `<p class="fds-card__overline">` | yes |
| Title | `<h2>`–`<h4>` `class="fds-card__title"`: the level follows the page's outline | **no** |
| Text | `<p class="fds-card__text">` | yes |
| Footer | `<div class="fds-card__footer">`, at the bottom of the card | yes |
| Meta | `<p class="fds-card__meta">` in the footer (date, reading time) | yes |
| "Read more" | `<span class="fds-card__more" aria-hidden="true">` in the footer | on every linked card |
| Action | `<div class="fds-card__action">` with a Button, in the footer | only on a card that isn't a link |

Cards in a row are as tall as the tallest; the footer sits at the bottom of each.

## Variants

| | Class | Use it for |
| --- | --- | --- |
| Text only | `fds-card` | Articles, notes, quotes, anything without a picture. |
| With an image | `fds-card fds-card--image` | Case studies, projects: an Image on top, at 16:10. A linked one shows the gold badge on hover. |
| Default | — | Every card, on any surface. It's always white with dark text: inside `.fds-surface-dark` it brings back the light roles for itself. |
| Secondary | `fds-card--dark` | A quieter card for a dark surface, such as a row of experience cards: a light veil over the surface and a border, no fill of its own. Choose it on purpose; nothing switches a card to it by itself. Not for light surfaces: there the veil can't be seen. |
| Secondary, with a sheen | `fds-card--dark fds-card--sheen` | A prototype to compare with the flat veil: the veil is strongest at the top left corner and fades to nothing at the bottom right. |

## The hover badge

A linked card with an image shows a gold circle with an arrow at the bottom right of the image, half on the picture and half on the body, when the card is hovered or focused. It's decoration: it's hidden from screen readers (`aria-hidden="true"`), because the title and "Read more" already say the card is a link. It's 40px (`space-10`), filled with `color-accent` and the arrow in `color-text-on-accent`, and it fades and scales in with the card's lift. Under reduced motion it still appears, without the fade or the scale. It shows only on a linked card with an image: not on a text card, and not on a card that isn't a link.

Gold is rare in the system (decision 51); this is a deliberate exception, and the reason the badge shows on hover only.

## A linked card

A card that leads to one page is one link: an `<a class="fds-card__link">` inside the title. Its `::after` covers the whole card, so the whole card is clickable (with a pointer cursor) and has one tab stop. The link's name is the title, short and clear, and the title is a real heading, so screen reader users can jump card to card.

"Read more" is always visible on a linked card. It looks like the link button, but it's not a link and not a button, and it's hidden from screen readers: the title already names the link.

A card that isn't a link has no hover, no shadow and no pointer. If it needs an action, put a Button in `fds-card__action`.

A link that opens a new tab keeps a visible ↗ after the title and says so in hidden text:

```html
<h3 class="fds-card__title"><a class="fds-card__link" href="https://…" target="_blank" rel="noopener">Branching without fear <span aria-hidden="true">↗</span><span class="fds-card__hidden">(opens in a new tab)</span></a></h3>
```

## States

Every type in every state, on the page background, on a subtle surface and inside a dark surface.

| State | From | Linked card | Card that isn't a link |
| --- | --- | --- | --- |
| Default | — | `color-surface` fill (`color-surface-dark` for the dark card), `border-width.default` border in `color-border`, `radius-lg`; no shadow | the same |
| Hover | `:hover` | Lifts by `space-1` and shows `shadow-md` (text) or `shadow-lg` (image); "Read more" turns `color-text`; the badge shows on an image card | no change |
| Focus | `:focus-visible` on the link | The system focus ring around the whole card, in the `color-focus` of the surface around it (gold inside a dark surface), the shadow, and the badge on an image card | — |
| Active | `:active` | as hover | — |

The lift, the shadow and the badge take `duration-base` with `easing-standard`. Under reduced motion the card doesn't lift and the badge doesn't fade or scale; the shadow and the badge still show.

| Pair | Default card | Secondary card, flat veil | Secondary card, peak of the sheen |
| --- | --- | --- | --- |
| Title, `color-text` | 11.27:1 | 8.16:1 | 7.33:1 |
| Overline, text and meta, `color-text-muted` | 5.91:1 | 5.10:1 | 4.58:1 |
| Arrow on the badge, `color-text-on-accent` on `color-accent` | 6.11:1 | 6.11:1 | 6.11:1 |

The border is decorative: a linked card is found by its heading link, not by its outline.

## Sizes

Padding `space-6`. Overline to title `space-3`, title to text `space-2`, at least `space-5` above the footer. The card is as wide as its grid cell; the grid is the page's. At 390px cards stack in one column.

## Do and don't

- **Do** make the title a heading and put the link in it.
- **Do** keep "Read more" on every linked card, hidden from screen readers.
- **Do** use the default card on any surface; choose the secondary card on purpose, on a dark surface.
- **Don't** wrap the card in an `<a>`: the link's name would be the whole card.
- **Don't** put a second link or button in a linked card.
- **Don't** give a card that isn't a link a hover.
- **Don't** put text on the image; it goes below, in the body.
- **Don't** put the badge on a card that isn't a link, or on a text card.

## Copy-paste HTML

```html
<!-- Linked card, text only -->
<article class="fds-card">
  <div class="fds-card__body">
    <p class="fds-card__overline">Design process</p>
    <h3 class="fds-card__title"><a class="fds-card__link" href="#">Branching without fear</a></h3>
    <p class="fds-card__text">What a year of Figma branches taught us about version control.</p>
    <div class="fds-card__footer">
      <p class="fds-card__meta">9 min read</p>
      <span class="fds-card__more" aria-hidden="true">Read more</span>
    </div>
  </div>
</article>

<!-- Linked card with an image -->
<article class="fds-card fds-card--image">
  <div class="fds-card__media">
    <img class="fds-image" src="…" alt="" width="1600" height="1000" loading="lazy" decoding="async">
    <span class="fds-card__badge" aria-hidden="true"><svg data-icon="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></span>
  </div>
  <div class="fds-card__body">
    <p class="fds-card__overline">Case study</p>
    <h3 class="fds-card__title"><a class="fds-card__link" href="#">Field notes that work offline</a></h3>
    <p class="fds-card__text">Mobile reporting for teams with no signal, and what it changed.</p>
    <div class="fds-card__footer">
      <span class="fds-card__more" aria-hidden="true">Read more</span>
    </div>
  </div>
</article>

<!-- Card that isn't a link, with an action -->
<article class="fds-card">
  <div class="fds-card__body">
    <h3 class="fds-card__title">Quarterly report</h3>
    <p class="fds-card__text">Reviewed and approved. The next one is due in March.</p>
    <div class="fds-card__footer fds-card__action">
      <a class="fds-button fds-button--secondary" href="#">Learn more</a>
    </div>
  </div>
</article>

<!-- Secondary card, on a dark surface (add fds-card--sheen to compare the diagonal sheen) -->
<section class="fds-surface-dark">
<article class="fds-card fds-card--dark">
  <div class="fds-card__body">
    <p class="fds-card__overline">Release notes</p>
    <h3 class="fds-card__title"><a class="fds-card__link" href="#">What changed this week</a></h3>
    <div class="fds-card__footer">
      <span class="fds-card__more" aria-hidden="true">Read more</span>
    </div>
  </div>
</article>
</section>
```
