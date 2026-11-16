# Navigation

The bar at the top of a page: the brand, the links to the site's pages and sections, and one call to action. When the links don't fit, they move into a drawer behind a menu button (decision 72). Stylesheet: `components/navigation.css` and behaviour: `components/navigation.js` (link `tokens/css/tokens.css` first, then `button.css`, which the links and the call to action use).

## Variants

Two variants of one component: the full navigation, and the minimal bar for pages that only lead back.

| Variant | Class | Use it for |
| --- | --- | --- |
| Full | `fds-nav` | The main navigation of the site: brand, links, a call to action. |
| Minimal | `fds-nav fds-nav--minimal` | A page deep in the site that needs only a brand name and a way back, such as a case study: no menu, no drawer. |

On a dark surface, add `fds-surface-dark` to the navigation: the roles switch by themselves, the bar takes `color-surface-dark`, the call to action turns gold, and the current link and its underline turn gold.

## Parts

| Part | Element | Notes |
| --- | --- | --- |
| Navigation | `<nav class="fds-nav" aria-label="Main">` | Always give it a label. If a page has two navigations, give them different labels ("Main", "Footer"). |
| Brand | `<a class="fds-nav__brand" href="/">` (or a `<span>` in the minimal bar) | A link to the home page. If it's a logo image, its `alt` says where it goes ("Brand name, home"). |
| Menu button | `<button class="fds-nav__toggle" type="button" aria-expanded="false" aria-controls="menu-id" aria-label="Menu">` with a `<span class="fds-nav__bars" aria-hidden="true">` | Shown only while the links are collapsed. Its name stays "Menu"; `aria-expanded` says whether the drawer is open. |
| Menu | `<div class="fds-nav__menu" id="menu-id">` with a `<ul class="fds-nav__list">` | One `<li>` per link, inside the `<nav>`, for the bar and the drawer alike: write the links once. |
| Link | `<a class="fds-button fds-button--link fds-nav__link" href="…">` | A Button, link variant. |
| Call to action | `<a class="fds-button fds-button--primary fds-button--nav" href="…">` | The last item of the list. One per navigation. |
| Back link (minimal) | `<a class="fds-button fds-button--link fds-nav__link fds-nav__back" href="…"><span aria-hidden="true">←</span> All work</a>` | The arrow is a decorative `<span>`, not CSS content, so screen readers don't read it out. |

Write labels in sentence case: the label text role makes them uppercase.

## The current page

The link to the page you're on has `aria-current="page"` and a `border-bottom` of 1.5px in `color-border-rule` under it, and its text takes the same role: navy on a light surface, gold inside a dark surface, where the role switches by itself (decisions 72 and 73). Set `aria-current="page"` in the page's own markup, on every page that has a link to itself. A link to a section of the page (`href="#id"`) is never "current": the underline marks the page, not the scroll position, so the navigation doesn't announce changes while you read.

The marker passes on every surface: navy on a light surface is 10.01:1 against `color-background`, 11.27:1 against `color-surface`, 9.24:1 against `color-surface-subtle`; gold on a dark surface is 6.11:1 against `color-surface-dark`. Gold on a light surface (the first idea in decision 72) was 1.64:1, under the 3:1 that WCAG 1.4.11 asks of a graphic that shows a state, which is why the role is `color-border-rule`. The underline is the cue that doesn't depend on colour; `aria-current` is for screen readers.

## Collapsing

The links collapse into the drawer when they don't fit in the bar: the script measures the bar, so there's no breakpoint to keep in step with the number or length of the links. Without the script the links stay in the bar and wrap.

| State | What you see |
| --- | --- |
| Full | Brand left, links and call to action right; no menu button. |
| Collapsed, closed | Brand and menu button. The drawer is hidden: out of the tab order and the accessibility tree (`visibility: hidden`, and `inert` from the script). |
| Collapsed, open | The drawer under the bar, with the links in a column and the call to action full width; the button shows an X and `aria-expanded="true"`. A scrim dims the page behind it, and a click or tap on the scrim closes the drawer. |

## Scrolled

After 40px of scroll the script adds `fds-nav--scrolled`: on a light surface the bar turns see-through (a 92% light fill) and blurred, so the page shows faintly behind it. On a dark surface the bar stays solid. The see-through fill, the blur and the scrim are decoration with no token (decision 54): they're the only literals in `navigation.css`, each on a line marked "Decoration, not a token", and they're listed under "Allowed decoration" in the README.

## Keyboard and screen readers

- The menu button is a `<button>` with `aria-expanded` and `aria-controls`.
- While the drawer is open, Tab and Shift+Tab stay inside the navigation (brand, button, links).
- **Escape**, a click or tap outside the drawer, or choosing a link closes it, and focus goes back to the menu button.
- Links to a section (`href="#id"`) are real links, so they can be opened in a new tab and shared. The script adds a smooth scroll (a plain jump under `prefers-reduced-motion: reduce`) and updates the address. Give the sections a `scroll-margin-top` as tall as the bar, which is sticky (64px).
- Scrolling doesn't close the drawer.

## Type and size

Brand and links use the `label` text role (13px at 390px, growing to 14px at 1280px; Inter 500; uppercase; 0.06em). The bar is at least `space-16` (64px) high, with the page's `space-gutter` at the sides, a `border-width.default` line under it in `color-border` and a solid fill: `color-background`, or `color-surface-dark` on a dark surface. The links are `space-10` apart; the underline sits `space-1` below the text. The menu button is `space-10` (40px) square, with three `space-6`-wide lines; the links in the drawer have a 48px hit area. Contrast: links `color-text-muted` on `color-background` 5.25:1 (`color-text` on hover, `color-border-rule` for the current page, both 10.01:1); on a dark surface 6.25:1, 10.01:1 and 6.11:1.

## Do and don't

- **Do** write the links once, in one `<ul>`: the same markup is the bar and the drawer.
- **Do** put `aria-current="page"` on the link to the current page, and let the role colour it.
- **Do** keep one call to action, as the last item.
- **Do** give the navigation an `aria-label`.
- **Don't** put a link and a second copy of it in a separate mobile menu.
- **Don't** use `href="#"` with a click handler for a section: use `href="#id"`.
- **Don't** mark a section link as current.
- **Don't** hide the drawer with a transform and opacity alone: keep it hidden and inert while it's closed.

## Copy-paste HTML

```html
<!-- Full navigation -->
<nav class="fds-nav" aria-label="Main">
  <a class="fds-nav__brand" href="/">Brand name</a>
  <button class="fds-nav__toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu">
    <span class="fds-nav__bars" aria-hidden="true"></span>
  </button>
  <div class="fds-nav__menu" id="menu">
    <ul class="fds-nav__list">
      <li><a class="fds-button fds-button--link fds-nav__link" href="/work" aria-current="page">Work</a></li>
      <li><a class="fds-button fds-button--link fds-nav__link" href="/about">About</a></li>
      <li><a class="fds-button fds-button--link fds-nav__link" href="#journal">Journal</a></li>
      <li><a class="fds-button fds-button--primary fds-button--nav" href="/contact">Contact</a></li>
    </ul>
  </div>
</nav>
<script src="navigation.js"></script>

<!-- Minimal (a case study) -->
<nav class="fds-nav fds-nav--minimal" aria-label="Case study">
  <span class="fds-nav__brand">Brand name</span>
  <a class="fds-button fds-button--link fds-nav__link fds-nav__back" href="/work"><span aria-hidden="true">←</span> All work</a>
</nav>
```
