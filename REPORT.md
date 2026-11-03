# B-020 · Report

Audit and proposal only. Nothing built, no token changed, Figma untouched, no commit outside `handoff`.

**Sources:**
- `adriadi/portfolio` `main` (`043b6cc`): `index.html`, `styles.css`, and the three case-study files, read as code only. I opened no case-study page and took no screenshots.
- `before-system`, `test/before-1`, `test/before-2`.

## 1. Audit

### Home page

| | Project card | Article card | Recommendation card | "Let's connect" card | Experience card (education) |
| --- | --- | --- | --- | --- | --- |
| **Where** | Selected Work, 3 cards, 2-column grid (1 column under 900px), last odd card centred | Articles, 3 cards, 3 columns (1 under 900px) | Kind Words, masonry with 4 columns (2, then 1) | Same masonry, one card | Experience, a dark surface (`fds-surface-dark`), 3 columns |
| **Markup** | `<a class="project-card">` with an `<img>` and an arrow `<div>`. Title, tag and description are rendered only for a project without an image, and then the card is a `<div>`, not a link. All 3 projects have an image | `<a class="article-card" target="_blank">` wrapping `<div>`s: category and time, title, excerpt, "Read on Medium ↗" | `<div class="rec-card">`: name, role, `<p>` quote | `<a class="rec-cta-card" target="_blank">`: title, subtitle, "→" | `<div class="sm-card">`: period, role, school, description |
| **Heading level** | None: no visible text at all | None: the title is a `<div>` | None | None | None |
| **Clickable** | The whole card (wrapping `<a>`) | The whole card (wrapping `<a>`); opens in a new tab with no warning | Nothing | The whole card | Nothing |
| **Keyboard and screen reader** | One tab stop. Its name is the image's `alt`, which is the project title. Everything else is only in the picture | One tab stop. The link's name is the whole card text read in one go: category, time, title, excerpt, "Read on Medium" | Not focusable; read as plain text | One tab stop; the name is the title, subtitle and "→" | Not focusable |
| **Image** | 1398×1050 (4:3), `object-fit: cover`. The card's text is baked into the picture: tag, a headline that differs from the `alt`, four bullets and an outcome line (WCAG 1.4.5, images of text) | None | None | None | None |
| **Padding** | — (image fills the card) | `space-8` all round | `space-8` / `space-6` | `space-8` / `space-6` | `space-3` / `space-4` |
| **Radius** | `radius-lg`, `overflow: hidden` | `radius-lg` | `radius-lg` | `radius-lg` | 10px, no token |
| **Background** | `color-surface-dark` behind the image | `color-surface` (white) on the page background | `color-background` (sand-50) on a white section | `color-surface` on the same white section | white at 4% opacity, no token; a gold tint when "lit" |
| **Border** | None | 1px `color-border` | 1px `color-border` | 1px `color-border` | 1px `color-border` (switches on dark); gold when lit |
| **Shadow at rest** | None | None | None | None | None |
| **Hover** | Lifts 6px, `shadow-lg`, the gold arrow fades and scales in | Lifts 4px, `shadow-md` | Fill to `#EDE8E0` (a hex, no token) and `shadow-sm`, on a card that isn't clickable | Lifts 3px, `shadow-md`, the arrow moves 4px | — (lit and dim follow a skill filter, not hover) |
| **Focus** | The global ring (2px `color-focus`, 3px offset) around the card | The global ring around the card | — | The global ring | — |
| **Text roles** | `card-title` and `small` exist but aren't shown. The tag has no role (10px) | category and time `overline`; title `card-title`; excerpt `small`; "Read on Medium" no role (12px/600) | name `card-title`; role and quote `small` | title `card-title`; subtitle `small`; arrow no role (18px) | period `overline`; role `card-title`; school and description `small` |
| **Motion** | transform and shadow at `duration-base`; reduced motion removes the lift and the arrow scale | Same; reduced motion removes the lift | Fill and shadow fade | Lift and arrow; reduced motion removes both | Opacity, border and fill fade |

All card links use `cursor: none` (the site's custom cursor).

### Case studies

These are code only; I read the markup and CSS without opening the pages.

| | Metric and outcome tiles | Pain point / intent item | Market card (Curaay) | Platform column (Scouting) | Next case study |
| --- | --- | --- | --- | --- | --- |
| **Markup** | A grid of `<div>`s, a 2px gap showing `color-border` as the dividers | `<div>`: number, title, text, a "→ solution" line | `<div>`: badge, round icon, title, subtitle, tags; 3 colour variants | `<div>`: eyebrow, name, tagline, feature list | `<a class="next-project">`: "Next case study", title, big "→" |
| **Heading** | None: the number and label are `<div>`s | None: the title is a `<div>` | None | None | None |
| **Clickable** | No | No | No | No | The whole block (wrapping `<a>`) |
| **Radius** | `radius-sm` on the grid | `radius-sm` (pain) or `radius-md` (intent) | `radius-lg` | `radius-md` | None (a full-width band) |
| **Fill and border** | `color-background`; dividers `color-border` | `color-surface-subtle`, a 3px `color-border-rule` top rule | `color-surface` + 1px `color-border`; `color-surface-highlight` + 2px `color-border-highlight`; `color-surface` + 2px `color-border-rule` | `color-surface-subtle`, 3px `color-border-rule` top rule | `color-background`, 1px `color-border` top |
| **Text roles** | Number: Syne, `clamp(40px, 6vw, 72px)`, no role. Label `small` | number `overline`; title `card-title`; text `small` | badge no role (11px); title `card-title`; subtitle `small` | eyebrow `overline`; name `card-title`; text `small` | label `overline`; title `card-title`; arrow no role (40px) |
| **Hover** | — | — | — | — | The arrow moves 8px; reduced motion removes it |

These are content blocks more than cards: tiles, numbered lists, comparison columns. Only the next-case-study block is a link.

### Before the system (`before-system`)

The same cards, with literal values instead of tokens:
- text cards 16px, image cards 20px;
- 16 shadow values with an off-palette navy;
- the same structure (wrapping `<a>`, `<div>` titles).

### What the agent built in the "before" runs

Both runs added one featured case-study card to a "Work with me" page. Decision 14: a fail in both runs, because no image card existed to copy.

| | `test/before-1` | `test/before-2` |
| --- | --- | --- |
| **Layout** | Horizontal: image left (1.15fr), text right (1fr); stacked under 760px | The same |
| **Markup** | `<article class="article-card wwm-feature" aria-labelledby>`, title `<h2>`, `<ul>` of tags with hidden "Role:" and "Year:" prefixes, and a `.btn-secondary` link "Read case study" | `<article class="feature-card">`, `<h2>`, `<ul>` of tags, the same secondary link |
| **Clickable** | Only the button | Only the button |
| **Hover** | Inherits the article card's lift and `shadow-md`: the whole card moves although it isn't a link | Its own lift (4px) and its own shadow (`0 16px 48px` at 12%), on a card that isn't a link |
| **Image** | `object-fit: cover`, 4:3, `width` and `height` set, `alt="SKYFLD scouting notes screens on mobile"` | `object-fit: cover`, min height 280px, 16:10 on phones, a descriptive `alt` |
| **Radius and border** | The article card's `radius-lg` and border | 20px (invented) and an `oklch` border |
| **Padding** | 48px / 44px (invented) | 40px (invented) |

Both runs got the structure right: an `<article>`, a real heading, a meaningful `alt`, and one clear action. They then invented the layout, the radius, the shadow, the padding and the image ratio, and both gave a non-clickable card a hover.

### For the parking-lot item ("Redesign the project cards")

These are notes only, not a proposal:
- The three project cards are images of text. The headline, bullets and outcome are inside the JPEG; screen readers get only the `alt` (a different headline), and the text can't zoom or reflow.
- The card's own title and description exist in the code but aren't shown.
- The only visible cue that the card is a link is the arrow, which appears on hover only.
- Text over a photo would need its own colour roles (the overlay styles use literal whites today).

The system Card proposed below would give the redesign real text below an image, so none of this would come back.

## 2. Proposal

### Anatomy

**Text only** (`fds-card`):

| Part | Element | Role and colour | Optional |
| --- | --- | --- | --- |
| Overline | `<p class="fds-card__overline">` | `overline`, `color-text-muted` | yes |
| Title | `<h2>`–`<h4>` `class="fds-card__title"`; the level follows the page outline | `card-title`, `color-text` | **no** |
| Text | `<p class="fds-card__text">` | `small`, `color-text-muted` | yes |
| Meta | `<p class="fds-card__meta">` (date, reading time) | `small`, `color-text-muted` | yes |
| Action | a Button (`fds-button--link` or `--secondary`) in `fds-card__action` | Button | yes, and only on a card that isn't a link (see Interaction) |

- **Order:** overline, title, text, then meta and action at the bottom.
- **Equal heights:** the card is a flex column and its footer is pushed to the bottom, so cards in a row line up at the top and the bottom.

**With an image** (`fds-card fds-card--image`):
- The image sits **on top**, full bleed to the card's edges. Its top corners follow `radius-lg` through `overflow: hidden` on the card. The text part below is the same as the text-only card.
- **Ratio: one fixed ratio** for every card (question 5), set with `aspect-ratio` on the image.
- **Crop:** `object-fit: cover` and `object-position: center`, so any picture fills the frame without distortion. The edges are cropped, never letterboxed.
- **Never text on the image:** no overlay, no gradient, no white text. Every word stays real text below the picture.

```
TEXT ONLY                     WITH AN IMAGE (proposed)       WITH AN IMAGE (alternative: side)
╭────────────────────────╮    ╭────────────────────────╮     ╭───────────┬────────────╮
│ OVERLINE               │    │                        │     │           │ OVERLINE   │
│ Card title that may    │    │       image 4:3        │     │  image    │ Card title │
│ wrap to two lines      │    │                        │     │           │ Text …     │
│ Text in small, muted,  │    ├────────────────────────┤     │           │            │
│ two or three lines.    │    │ OVERLINE               │     │           │ Meta       │
│                        │    │ Card title             │     ╰───────────┴────────────╯
│ Meta · 8 min           │    │ Text …                 │     (the "before" runs' layout;
╰────────────────────────╯    │ Meta                   │      stacks on phones anyway)
                              ╰────────────────────────╯
```

### Interaction

**Is the whole card a link?** Yes, when the card leads to one place (an article, a case study). There are two ways to do it:

| | Stretched link (proposed) | Wrapping `<a>` (the portfolio today) |
| --- | --- | --- |
| **How** | One `<a class="fds-card__link">` inside the title. Its `::after` is absolutely positioned over the whole card (`inset: 0`), so the whole card is the click area | `<a>` around the whole card |
| **Screen reader** | The link's name is the title alone ("Polish Online Bookstore Re-Design, link"). The rest is read as normal text, and the heading lets users jump card to card | The link's name is every word in the card read as one long link, and there's no heading to jump to |
| **Text selection** | The overlay covers the text, so it can't be selected by dragging (a known trade-off) | It can't be selected without starting a drag on the link |
| **A second link or button inside** | Possible: give it `position: relative` above the overlay. The card then has two tab stops | Invalid HTML (interactive content inside `<a>`), and unreliable in browsers |
| **Focus ring** | On the whole card: `.fds-card:has(.fds-card__link:focus-visible)` gets the system ring | On the whole card, by default |

**Recommendation: the stretched link.** It gives a short, meaningful link name and a real heading. It also doesn't break when a second link is needed, which is what both "before" runs reached for (a button inside the card).

**A non-clickable card:** yes, the same card without `fds-card__link`, for content like quotes or experience entries. It has no hover, no shadow and no pointer: a card that reacts to the mouse but goes nowhere (the recommendation card today) promises a click that doesn't exist.

### States (linked card only)

| State | From | What changes | Token |
| --- | --- | --- | --- |
| Default | — | Fill and border, no shadow (decision 40: not at rest) | `color-surface`, `color-border` |
| Hover | `:has(.fds-card__link:hover)` or `.fds-card:hover` | Shadow appears: text card `shadow-md`, image card `shadow-lg` (decision 40) | `shadow-md`, `shadow-lg` |
| Focus | `:has(.fds-card__link:focus-visible)` | The system focus ring on the whole card, and the hover shadow | `focus.ring-width`, `color-focus`, `focus.ring-offset` |
| Active | `:active` | Same as hover | — |

- **Shadow levels:** `shadow-sm` (small text cards) has no Card use in this proposal. It would apply only if a compact size is added later.
- **Lift:** the portfolio lifts cards 3–6px. Whether the system keeps a lift is question 3. If it does, the lift is the only motion, and under `prefers-reduced-motion: reduce` it's removed and only the shadow shows. The shadow appears at `duration-base` with `easing-standard`; a colour or shadow change isn't movement, so it can stay.

### Surfaces

| Surface | Fill | Border | Edge visible? |
| --- | --- | --- | --- |
| `color-background` (sand-50) | `color-surface` (white), 1.13:1 against the page | `color-border` (decorative), 1.34:1 against the page | Faintly; the border gives the shape |
| `color-surface-subtle` (sand-100) | `color-surface`, 1.22:1 | `color-border`, 1.24:1 | Faintly; the border gives the shape |
| `color-surface` (a white section) | `color-surface`, 1.00:1 | `color-border`, 1.51:1 | Only through the border |
| `color-surface-dark` (navy-900) | See question 1: a white card would turn its own text sand-50 on white (1.13:1) | `color-border` switches to `color-border-on-dark` (navy-800), 1.34:1 | — |

- **WCAG 1.4.11:** it doesn't require the card's edge to reach 3:1. A linked card is identified by its heading-link text, not by its outline, so the border can stay decorative (`color-border`, as decision 27 intends).
- **No shadow at rest:** the border is what gives the card its shape (decision 40).

**Contrast inside the card:** light surfaces, white fill.

| Pair | Ratio | Minimum |
| --- | --- | --- |
| title `color-text` on `color-surface` | 11.27 | 4.5 |
| overline, text and meta `color-text-muted` on `color-surface` | 5.91 | 4.5 |
| focus ring `color-focus` on sand-50, sand-100 and white (the ring sits outside the card) | 10.01, 9.24, 11.27 | 3 |

**Dark surface, two options** (question 1):

| Pair | Card with no fill (navy-900) | Card filled navy-800 | Minimum |
| --- | --- | --- | --- |
| title `color-text` (sand-50) | 10.01 | 7.45 | 4.5 |
| muted `color-text-muted` (sand-400) | 6.25 | 4.65 | 4.5 |
| focus ring `color-focus` (gold-500) on navy-900 | 6.11 | 6.11 | 3 |
| fill against the surface | 1.00 | 1.34 | none (decorative) |

**On a dark surface, the navy shadow is invisible on navy.** A linked card there needs another hover sign (question 4).

### Image rules

- **`alt`:**
  - If the image only illustrates what the title already says, `alt=""`: the link's name is the title, so a repeated description is noise.
  - If the picture carries information the text doesn't (a chart, a result), describe that.
  - Never text inside the image instead of text in the card.
- **Loading:** `loading="lazy"`, `decoding="async"`, and the image's `width` and `height` attributes, so the card keeps its space before the image arrives (no layout shift).
- **Without an image:** a card with no picture is simply the text-only card. No placeholder, no gradient, no empty box. One markup rule: leave out the image element, and drop the `--image` modifier.

### Sizes

| | Value | Token |
| --- | --- | --- |
| Padding (text part) | 24px | `space-6`; its description is "Card padding, grid gaps" |
| Overline → title | 12px | `space-3` ("Label to title") |
| Title → text | 8px | `space-2` |
| Text → meta and action | 20px, pushed to the bottom | `space-5` minimum |
| Radius | 16px | `radius-lg` (decision 39) |
| Border | 1px | needs a token (question 2) |
| Grid gap | 24px | `space-6` (or `space-5`, as the article grid uses) |

- **Width:** the card is as wide as its grid cell, and the grid is the page's job, not the card's. At 390px the card is one column, full width, with the same 24px padding. The portfolio's 32px works on desktop but is a lot at 390px, and `space-6` is what the token describes.
- **Height:** cards in one row stretch to the same height (`height: 100%` in a grid cell), with the meta or action at the bottom.

### Class names

| Class | What |
| --- | --- |
| `fds-card` | the card: fill, border, radius, padding, flex column |
| `fds-card--image` | with an image on top |
| `fds-card__image` | the `<img>` |
| `fds-card__body` | the text part (padding lives here in the image card) |
| `fds-card__overline`, `fds-card__title`, `fds-card__text`, `fds-card__meta` | the text parts |
| `fds-card__link` | the `<a>` inside the title; makes the whole card a link |
| `fds-card__action` | the footer holding a Button, on a card that isn't a link |

States come from the element (`:hover`, `:focus-visible` through `:has()`), as in Button and Input; no state classes.

```html
<article class="fds-card fds-card--image">
  <img class="fds-card__image" src="…" alt="" width="1200" height="900" loading="lazy" decoding="async">
  <div class="fds-card__body">
    <p class="fds-card__overline">Design process</p>
    <h3 class="fds-card__title"><a class="fds-card__link" href="…">Branching without fear</a></h3>
    <p class="fds-card__text">What a year of Figma branches taught us about version control.</p>
    <p class="fds-card__meta">9 min read</p>
  </div>
</article>
```

### How it differs from the portfolio's cards today

| | Portfolio today | Proposal |
| --- | --- | --- |
| **Title** | A `<div>`, never a heading | A real heading (`<h2>`–`<h4>`) |
| **Link** | A wrapping `<a>`: the name is the whole card | A stretched link in the title: the name is the title |
| **Image card** | An image of text (project cards); text overlay styles with literal whites | Image on top, all text real, below the image |
| **Image ratio** | 4:3 (project), 16:10 / 4:3 (agent) | One fixed ratio (question 5) |
| **Non-clickable card** | Has a hover (recommendation card) | No hover, no shadow |
| **Hover** | Lift 3–6px plus a shadow | Shadow per decision 40; lift is question 3 |
| **Padding** | `space-8` (32px), or 12/16px (experience) | `space-6` (24px) |
| **Radius** | `radius-lg`, or 10px, `radius-md`, `radius-sm` (case-study blocks) | `radius-lg` always |
| **Hover fill** | `#EDE8E0` (a hex) | None |
| **On a dark surface** | White at 4% (no token) | A role (question 1) |
| **Action cue** | "Read on Medium ↗" and arrows with no role | The title link; a Button only on non-linked cards |
| **Opens a new tab** | Silently (articles, LinkedIn) | Only when needed, said in the link text (question 6) |

## 3. Questions

1. **Cards on a dark surface.** The portfolio has them (experience cards). A white card can't sit in a dark surface: its text roles would switch to light (1.13:1).
   - A: light surfaces only, as Input.
   - B: a new colour role for the card fill, `color-card`, white on light and navy-800 inside `.fds-surface-dark` (text 7.45:1, muted 4.65:1).
   - C: the same new role with navy-900 on dark (no visible fill; the border gives the shape; text 10.01:1, muted 6.25:1).

   **Recommendation: C.** The experience section needs dark cards. With no fill, the contrast stays highest and only the border shows the card, as on light. B's muted text at 4.65:1 passes, but narrowly. A role is needed either way, because components can't pick a value by surface (decision 33).
2. **Border width.** The component check rejects a literal `1px`. The only border width token is `border-width.control` (1.5px).
   - A: a new token `border-width.divider` = 1px, "Decorative borders and dividers", used by cards (and later dividers).
   - B: use `border-width.control` 1.5px on cards.

   **Recommendation: A.** Every card and divider on the site is 1px today; 1.5px is for controls, and a heavier card outline would look like a button.
3. **Lift on hover.**
   - A: shadow only, no movement.
   - B: the shadow plus a lift of `space-1` (4px), removed under reduced motion.

   **Recommendation: A.** One less movement to maintain and to remove for reduced motion. Button has the same rule ("no lifts"), and decision 40 already gives hover a visible change.
4. **Hover on a dark surface.** A navy shadow doesn't show on navy.
   - A: on a dark surface, hover changes the border to `color-border-rule` (gold inside a dark surface).
   - B: no hover sign on dark; focus still shows the ring.

   **Recommendation: A.** It uses an existing role that already switches. Without it, a dark card gives mouse users no feedback.
5. **Image ratio** (sketch above).
   - A: 4:3, the ratio of the portfolio's project images (1398×1050), so they fit without cropping.
   - B: 16:9, shorter, so the text gets more room in a three-column grid.
   - C: 3:2, in between.

   **Recommendation: A.** The existing pictures are 4:3, and one ratio means an agent never has to pick one.
6. **Links that open a new tab** (articles on Medium, LinkedIn).
   - A: the card's link opens in the same tab by default; if it must open a new tab, the title link says so in visually hidden text ("opens in a new tab").
   - B: always the same tab.

   **Recommendation: A.** Leaving the site without warning is a known problem for screen reader users (WCAG 3.2.5 advisory). The system shouldn't forbid new tabs, but it should make them announced.
7. **Action on a linked card.**
   - A: a linked card shows no separate action text; the title is the link, and an arrow or "Read more" would be a second, fake target.
   - B: allow a decorative "Read more →" with `aria-hidden`.

   **Recommendation: A.** The stretched link already makes the whole card the target, and the hover shadow shows it. The "before" runs' button belongs on a non-linked card.
8. **Image variant layout** (sketch above).
   - A: the image on top.
   - B: the image beside the text, the "before" runs' layout.

   **Recommendation: A.** It stays the same at every width (a side image has to stack at 390px anyway) and fits a grid of equal cards. B could be a later, separate "featured" layout if a page needs one.
