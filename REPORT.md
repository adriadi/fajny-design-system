# B-035 · Second portfolio sync — audit

Audit only: no markup, CSS, branch or commit in the portfolio repo. I read `origin/main` of `adriadi/portfolio` (extracted to a scratch folder), plus `origin/design-system/work-with-me` where noted. Line numbers are in `origin/main`.

## 0. Baseline

- **Real CSS file:** `styles.css` (header says "portfolio.css", file is `styles.css`, 1,768 lines). Case-study pages also carry a page-level `<style>` block (Scouting and Curaay have component-like rules in it: `.platform-insight`, `.connector-badge`, `.market-*`, `.patient-quote`).
- **`tokens.css` is behind.** Copied at design-system commit `8879a9e`. It lacks everything added since: `border-width.default`, `opacity.tint`, `opacity.disabled`, `navy-200`, the `label`, `field` and `quote` text roles and `font.style.quote`, plus reworded descriptions. 85 changed lines against `main` (`3efeccd`). No component stylesheet is in the portfolio: no `fds-*` class is used anywhere (0 hits in every page and in `styles.css`). The sync script copies only `tokens.css`; **it doesn't copy `components/*.css` or `navigation.js`. That is the first thing to decide** (question 1).
- **Starting point:** `main` (after the tokens-only merge `043b6cc`) is the real starting point. `design-system/tokens` is fully merged into it.
- **`design-system/work-with-me`** (`50f0871`, `a1f5dc1`) still exists on `origin`, **is not merged**, and branches from `main` so it applies cleanly. It adds `work-with-me.html`, `js/work-with-me.js`, a second form, and 8 lines in `index.html` (a link to the page). It's a tokens migration, not a component one: same `tokens.css` at `8879a9e`, same `nav-cta`, `form-input`, `btn-secondary` classes. It's not in this brief's scope list, but it carries the second form and a feature card, so it decides ordering (question 2). The `test/before-*` and `index-changes` branches carry none of this.
- **Markup caveat:** `index.html` is a React page (JSX in the HTML, `className`, in-browser Babel). Every `fds-*` change on the home page goes into JSX, and the Navigation's `navigation.js` has to cooperate with React's own menu state (see Navigation).
- **Dead CSS:** `styles.css` still has `.cv-modal*` rules (lines ~57, 94, 110, 1383–1420) but no page uses them. Nothing to migrate: delete when touching the file.

## 1. Button

Design system: `fds-button` + `--primary | --secondary | --link`, `--nav` for the navigation size; one `label` role (13→14px); 48px high; primary 32px side padding. The portfolio has **seven** button styles, none of them the system's:

| Now | Where | Maps to | Won't survive as-is |
| --- | --- | --- | --- |
| `.btn-primary` (885) | Hero "See my work" (`index.html` 638) | `fds-button fds-button--primary` | Hover lift and the navy drop shadow (`oklch` shadow, "No token") go. 15px/uppercase → `label` 13→14px. Padding 16/40px → 32px. Arrow `<svg>` stays as content. |
| `.btn-secondary` (899) | Hero email link (644); `work-with-me` branch featured-card link | `fds-button--link`, **or** `--secondary` | **Judgement call.** It's a text link with a gold underline and a growing gap on hover; the system's Secondary is a light-blue filled pill, Link is a muted text link with no underline. Neither equals it. |
| `.btn-accent` (909) | Class defined, **no markup uses it** | delete | Dead CSS. |
| `.btn-outline-light` (920) | Calendly CTA on the dark Experience block (968) | `fds-button--secondary` inside the dark surface (looks the same on every surface: light blue fill, navy label) | Becomes a filled light-blue pill, not an outline: visual change. Translucent white border/hover literals disappear. |
| `.nav-cta` / `.nav-cta-mobile` (663, 716) | "Let's talk" in the nav (570, 583) | `fds-button--primary fds-button--nav` as the last item of the Navigation list | Part of the Navigation restructure (below). |
| `.prototype-btn` (573) | Hawk "View clickable prototype →" (275) | `fds-button--primary` | Hover `opacity .85` + slide go; check it still sits right in the prose column. |
| `.form-submit` (1313) | Contact form submit (1073) | `fds-button--primary` (`type="submit"`) | `cursor:none` and the inline `opacity: .65` while sending go: system's disabled is `opacity.disabled` 0.6 with `aria-disabled`; its Loading state is "default look, progress text". The `disabled={status==='sending'}` attribute should become `aria-disabled` so the button stays focusable. |
| `.submit-btn` (1631) | Password page (67) | `fds-button--primary` | Same hover/transform removal. |
| `.cookie-accept`, `.cookie-decline` | `js/cookies.js` (31–32), built as an HTML string | Accept → `--primary`, Decline → `--secondary` (equal prominence matters for consent) | Cookie banner isn't on the brief's page list but is sitewide, so it's a "button sitewide". Banner sits on a dark or light surface? needs a check at build. |
| `.toggle-btn` (1611) | Password show/hide (57) | `fds-field__action` (Input's own part), not Button | See Input. |
| `.hero-motion-toggle` (657) | Pause control | **stays**: decision 56 specifies it as its own control | — |
| `.sm-clear`, `.sm-skill`, `.sm-row-head`, `.twk-*` | skill map / tweaks panel | **stay**: decision 69 (skill filter and "Clear" are not Tag; they aren't Button either: toggles). Tweaks panel is a dev tool. | Question 6. |
| `.hamburger` | nav | replaced by `fds-nav__toggle` (Navigation) | — |
| `.rec-cta-card` (1360) | LinkedIn card in Kind words | Card, see below | — |

Open items from decision 54 touching buttons: none outstanding. Two things are *new*: the hero's `.btn-secondary` mapping, and the outline-to-filled change.

## 2. Input

Design system: `fds-field` wrapper + `fds-field__label` (`small` role, always above), `fds-input` (a full 1.5px border box, 16px text, 48px min height, `radius` per the token), `fds-field__help`, `fds-field__error` (with icon, `aria-invalid`/`aria-describedby`), `fds-field__action` for password show/hide.

| Now | Where | Maps to | Won't survive as-is |
| --- | --- | --- | --- |
| `.form-input` / `.form-select` / `.form-textarea` (1296) | Contact form: name, email, topic, message (1043–1062) | `fds-input` on each, inside `fds-field` | **The look changes:** today's fields are underline-only (transparent, bottom border), the system's are boxed. Placeholder-led → label above (labels exist already). Textarea fixed height 100px → the system's textarea. |
| `.form-label` (1293) | same | `fds-field__label` | **Decision 54's "navy form labels" is a standing judgement call**: today 11px, 0.1em, uppercase, navy; the system label is `small` role, sentence case, `color-text` (also navy). Uppercase/11px goes. This is the one open input item. |
| `.form-error` (1308) | form-level error | `fds-field__error` is per field; a **form-level** error banner has no component | Judgement call: keep a text line using the `error` role, or per-field errors only. |
| `.form-note` ("No spam, ever", italic) | submit row | stays as text | — |
| `.password-input` + `.toggle-btn` (1591, 1611) | password page | `fds-input` (type password) + `fds-field__action` | The page has no `<label>` (placeholder only): the system requires a visible label, so a label ("Password") is **added content**. The `.error` shake/colour state → `aria-invalid` + `fds-field__error` with the existing "Incorrect password — try again." text. |
| `.cv-modal-*` | none | dead CSS | — |
| `work-with-me` branch inquiry form | `work-with-me.html` 78–… | same mapping; it has `field-error` per field already (closest to the system's pattern) | Needs `aria-describedby` wiring check. |

Also `contact.php` / `js/contact.js` read field `name`s and ids: keep ids and `name` attributes unchanged; restructuring is class + wrapper only.

## 3. Card

Design system: `fds-card` (default, `--image`, `--dark`, secondary on dark), body with overline / title (`card-title` role) / text / footer ("Read more", meta), one 1.5px border, `radius`, hover lift, gold badge on image cards, image at 16:10.

| Now | Where | Maps to | Won't survive as-is |
| --- | --- | --- | --- |
| `.project-card` (956) | Home project cards (733): a 4:3 photo with a dark gradient overlay and the tag, title and description **on top of the photo**, round arrow button top-right | `fds-card fds-card--image` (+ `--dark`?) | **Largest gap.** System image cards put text *below* a 16:10 image, not over a photo. Changes: aspect 4:3 → 16:10, text moves out of the overlay (the gradient overlay and its "No token" literals go), `project-arrow` → `fds-card__badge`. The placeholder (gradient `<div>` with inline colours, no image) → `fds-image` loading/placeholder state. Also the card renders as `<a>` or `<div>` (`showText`): the system wants a linked card as an `<article>` with one `fds-card__link` in the title. Needs an owner decision (question 4). |
| `.article-card` (1047) | Medium articles | `fds-card` (linked, no image) with overline = category, meta = read time | Close fit. Whole-card `<a>` → title link + stretched link in the system. |
| `.rec-card` (1350) | "Kind words" testimonials | `fds-card` (not linked), per decision 77 | Hover background `#EDE8E0` (a literal) and the shadow go. Name/role/text map to title/overline/text. Name in `card-title` (Syne) = the decision-54 **"Syne card titles"** item, now settled by the component (the role exists): no longer open. |
| `.rec-cta-card` (1360) | "Let's connect on LinkedIn" | linked `fds-card` with "→" as the more link | Fits. |
| `.sm-card` (1188) | Skill-map experience cards on a dark block | `fds-card--dark` (the secondary diagonal-sheen card, decision 66) | The skill map toggles `.is-lit` / `.is-dim` states (gold border and tint): **no equivalent in Card**; interactive highlight stays as page CSS on top, or skill map stays out (question 6). `border-radius: 10px` literal goes. |
| `.market-card` (curaay) | Three market cards with an emoji, a stat and tags; `--gap` is out of scope (B-033) | none: "Curaay market cards" is a decision-54 judgement call that stays | Not converted; the card family keeps its own markup. Their `.market-tag` pills are Tags (below). |
| `.feature-card` (`work-with-me` branch) | featured case study with image, eyebrow, title, desc, tag list, link | `fds-card fds-card--image` | Good fit. |
| `.patient-quote` | Curaay | out of scope (per brief) | — |

## 4. Tag

Design system (decisions 69–71): one size on the `overline` role; Default, `--accent` (dark only), `--filled`, `--muted`; "on a photo" = `fds-surface-dark`; optional `fds-tag__dot`; lists are `<ul>` with `<li class="fds-tag">`.

| Now | Where | Maps to | Won't survive as-is |
| --- | --- | --- | --- |
| `body.home .hero-tag` (824) | "Open to senior product design roles" (627) | `fds-tag` + `fds-tag__dot` | The glass `rgba(255,255,255,.5)` fill goes (decision 71). The CSS `::before` dot becomes the `<span class="fds-tag__dot">`; the pulse (twice) is decoration and is **not** in the component: decide whether the pulse stays as page CSS on `.fds-tag__dot` (question 5). |
| `body.cs .hero-tag` (297) | "Case Study · HAWK AI · April 2026" on the three case studies | **not a Tag** | It's a text label with a rule drawn after it (`::after`), not a pill. Candidates: leave it, or a plain `overline` role text. Needs a call (question 5). |
| `.project-tag` (1002) | Over the project photo (753) | `fds-tag fds-surface-dark` | Becomes a solid dark pill (decision 71); blur and translucent fill go. If the project card is rebuilt (Card §), the tag moves into the body and may become a default tag. |
| `.sm-chip` `lvl-2` / `lvl-1` / `is-on` (1178) | Skill chips on the dark Experience block | `fds-tag--accent` (core), default (plain), `--filled` (selected), `--muted` (dimmed) | Decision 70 already moved the contrast to roles on the `work-with-me` branch (`a1f5dc1`) — **that fix is not on `main`**. The chips are visually hidden (`.sm-chips` 1176: 1px clip, read by screen readers only) so the migration is code-only. |
| `.medium-badge` (1035) | Medium link badge (800) | `fds-tag--filled`? or `fds-tag` on a dark surface | The `:hover` goes (decision 69; fixed on the `work-with-me` branch only). Note it's an `<span>` inside a link. |
| `.market-tag` `--digital/--analog` (curaay) | Curaay market cards | `fds-tag` (default) | Two fill colours (`surface-highlight` / `surface-subtle`) collapse to the outlined default. |
| `.connector-badge` (scouting, vertical `writing-mode`) | Scouting diagram ("live sync") | **stays**: a diagram label, vertical text | — |
| `.market-card-badge` ("Huge Gap", "The Bridge") | Curaay | stays with the market cards (decision 54) | — |
| `.feature-card-tags` (`work-with-me` branch) | tag list | `<ul>` of `fds-tag` | Already a `<ul>` with `aria-label`. |

## 5. Navigation

Design system: `<nav class="fds-nav">` with brand, `fds-nav__toggle` button, one `<div class="fds-nav__menu"><ul class="fds-nav__list">` for bar and drawer, links as `fds-button fds-button--link fds-nav__link`, the call to action as `fds-button--primary fds-button--nav`, `aria-current="page"`, and `navigation.js` for the collapse (measured, not a breakpoint), `inert` drawer, focus trap, Escape.

| Now | Where | Maps to | Won't survive as-is |
| --- | --- | --- | --- |
| Home nav: `body.home nav` + `.nav-links` + `.hamburger` + `.mobile-nav` + `.nav-overlay` (636–730) | `index.html` 561–585 | `fds-nav` full | **Restructure.** Today the links are written **twice** (bar and `.mobile-nav`) and the menu state lives in React (`menuOpen`). The component wants one `<ul>` and `navigation.js` owning the open state. In JSX this means either mounting `navigation.js` after render (it must find the nav, so run it in an effect), or porting its logic to a React hook: a decision (question 3). The links are `<a href="#" onClick=scrollTo>`, not real hrefs: `href="#portfolio"` + scroll offset would be cleaner but changes the smooth-scroll behaviour. |
| Scroll state `nav.scrolled`: translucent `oklch(...92%)` + `backdrop-filter` + hairline | home nav | **no equivalent** in the component (the bar is a solid surface) | The see-through/blur background was decoration allowed under decision 54; the component has none. The nav would lose the transparent-over-hero look: visual change, needs the owner's call (question 5). |
| Brand: logo image (`images/logo.png`) in a link | home | `fds-nav__brand` expects text/brand slot | Check the component's brand part handles an `<img>` (it does a link with content); the 40px logo vs the 64px bar needs a visual check. |
| Case-study bar: `body.cs nav`, `.nav-name`, `.nav-back` (263–285) | hawk 22–24, scouting 119–121, curaay 100–102 | `fds-nav fds-nav--minimal` with `fds-nav__back` | Decision 74 already settled the look change (64px bar, `label` role, uppercase "ALL WORK", muted until hover). The brand there is a `<span>` name, not a link: fine. `←` moves from `::before` to a `<span aria-hidden>`. Sticky positioning is page CSS today (`position: sticky`) — confirm the component sets it, or add it. |
| `aria-current` | all | add `aria-current="page"` where a link is the current page | Home nav has in-page anchors only, so no link is "current"; case-study bar has none either. Nothing to mark today. |

## 6. Highlight

Design system: light `fds-highlight` (figure/blockquote: quote, source, optional icon; 18→26px italic Syne `quote` role; square corners; 1.5px rule) and `fds-highlight--dark` (label, title, one or two paragraphs; `radius-sm`, padding `space-10`/gutter).

| Now | Where | Maps to | Won't survive as-is |
| --- | --- | --- | --- |
| `.pullquote` (413) | hawk 74, 142; scouting 196; curaay 130 | `fds-highlight` (quote + source) | Rule 3px → 1.5px (`border-width.default`, decision 76). Corners: right-only radius → square (decision 75). Padding 24/32 → `space-6`/`space-8`. The page's `.pullquote p` margin rules become redundant. Markup: today `<div><p>"…"</p><cite>…</cite></div>`: must become `<figure class="fds-highlight"><blockquote>…</blockquote><figcaption>`, per docs (check `docs/highlight.md` for the exact shape). |
| `.tension` + `.tension-label` (433) | hawk 59, 119, 163; scouting 158, 176, 459; curaay 137, 374 — **8 blocks** | `fds-highlight fds-highlight--dark` | Already `fds-surface-dark`. `.tension-label` (a `<div>` styled by the type rules) → `__label` (overline); `<h3>` → `__title` (keep the heading level: a real `h3` is correct); `<p>` → `__text`. Padding 40/48 → `space-10`/`space-gutter` (48 on desktop, smaller on mobile): near-identical. The `body.cs h3` and `.tension h3` page rules are the margin traps B-033 already tested; the component's two-class selectors beat them. |
| `.platform-insight` (scouting `<style>` 89–98; markup 352) | one block | `fds-highlight` with the icon part | Per decisions 76/78: the 15→18px text grows to 18→26px (accepted). The `↻` glyph is text in a `<div>` today: goes in `fds-highlight__icon` (`aria-hidden`). Margin `margin-top: space-10` is page-level layout, outside the component. |
| `.patient-quote`, `.market-card--gap`, `.rec-card` | — | **out of scope** (decision 77, B-033) | Not touched. |

Also `.pullquote cite` is a `<cite>` used as the source line: in a `<figcaption>` it stays a plain line (the `cite` element is for work titles, not people).

## 7. Decision 54 judgement calls: status

- **Navy labels** (`.tension-label`, section labels): `tension-label` is resolved by Highlight's `overline` label. `section-label` (not a component) stays.
- **Uppercase experience dates** (`.exp-period`): not a component (no component carries it): stays, still open only as a role question for a later pass.
- **Syne card titles**: settled by Card (`card-title` role is Syne). Resolved.
- **Curaay market cards**: still open, decided to stay out of the components. Resolved as "stay".
- **Navy form labels** (`.form-label`, 11px uppercase): **still open**, and the Input migration forces it (label becomes the `small` role sentence case).

## 8. Recommendation: sequencing

**Don't do all six in one pass. Split into four small steps**, each on its own branch and with its own visual check:

1. **Foundation (no markup yet):** decide how components reach the portfolio (question 1); re-sync `tokens.css` to `main`; merge or rebase `design-system/work-with-me` first so the second form and chips aren't migrated twice. Nothing visual changes.
2. **Highlight + Tag.** Lowest risk, pure case-study HTML and the same dark-surface logic: 4 pull-quotes, 8 tension blocks, 1 insight; hero tag, project tag, chips (hidden), Medium badge. Mostly one-for-one swaps. Delete the matching CSS.
3. **Button + Input + Card.** Together, because the contact form and the cards both use the button: submit buttons, hero buttons, the contact/password/work-with-me forms (visual change: underline → boxed fields, decision 54 labels), then Kind-words, article and LinkedIn cards. The project cards (photo-overlay) are the one big redesign inside this step; I'd do them last and only after the owner's call (question 4).
4. **Navigation last.** It has the most structural risk (React menu state, translucent scroll bar, the shared `<ul>`), and the case-study bar and the home nav are independent: do the three-line case-study bar first, the home nav on its own.

Order rationale: the earlier steps remove CSS and let step 4 land on a smaller `styles.css`; each step can be merged and checked in the browser separately.

## 9. Questions before building

1. **How do the components reach the portfolio?** Today only `tokens.css` is synced. Options: extend `sync-tokens.sh` to also copy `components/*.css` and `navigation.js` into the site (a `fds/` folder) and link them; or `@import` them in `styles.css`. Which, and do the copied files get committed like `tokens.css`?
2. **Merge `design-system/work-with-me` into `main` first?** It is unmerged, adds a page outside this brief, and holds fixes (chip contrast, Medium hover) that otherwise get redone. OK to merge before the component work, or keep it separate?
3. **Home nav in React:** mount `navigation.js` from an effect, or port its behaviour to a hook so React owns the menu state? Which do you prefer (a hook means the component's JS isn't reused there)?
4. **Project cards over photos.** The system's image card puts text below a 16:10 image; the portfolio's project cards put text over a 4:3 photo. Convert to the system card (a visible redesign), or is the over-photo card a component the system hasn't got (a missing role, to design first)?
5. **Visual changes to accept:** (a) the home nav loses its see-through blur on scroll; (b) the hero tag's pulsing dot (keep as page decoration, or drop); (c) the case-study hero label ("Case Study · …"), which isn't a Tag: leave as is, or give it a role; (d) the hero's gold-underline `btn-secondary` becomes Link or Secondary; (e) the outlined Calendly button becomes a filled Secondary.
6. **Skill map and tweaks panel:** the `sm-skill`/`sm-clear`/`sm-card` states (lit, dim, pressed) have no component, and decision 69 already kept the filter out of Tag. Leave the whole skill map as page CSS, or add a "toggle" control to the roadmap?
7. **Underlined fields to boxed fields** and the **navy form labels** (decision 54, still open): confirm both for the contact form, the password page and the `work-with-me` form.
8. **Cookie banner** (`js/cookies.js`) and the dead `.cv-modal`/`.btn-accent` CSS: include the banner's two buttons in the Button step, and delete the dead rules?
