# B-038 · Second portfolio sync, step 2: Highlight + Tag

**Branch:** `portfolio/sync-highlight-tag` in the portfolio repo, one commit `dbd80d2` on top of `main` (`cbbfd33`), pushed. Not merged.

Files linked: `usecases/*.html` load `../fds/highlight.css` (Curaay also `../fds/tag.css`); `index.html` loads `fds/tag.css`. Each is placed between `tokens.css` and `styles.css`.

## Highlight: instances converted

Pull-quotes → `<figure class="fds-highlight fade-up">` with `<blockquote class="fds-highlight__quote">` and `<figcaption class="fds-highlight__cite">` (`fade-up` kept so the scroll reveal still works). Tension blocks → `fds-highlight fds-highlight--dark` (the `fds-surface-dark` class is dropped: the component switches itself). The label `<div>` became `<p class="fds-highlight__label">`, `<h3>` keeps its level with `fds-highlight__title`, paragraphs are `fds-highlight__text`.

| Page | Pull-quote (light) | Tension (dark) | Insight |
| --- | --- | --- | --- |
| `usecases/hawk-case-study.html` | 2 (the analyst's quote, "From my design rationale") | 3 (core gap, decision, trade-off) | — |
| `usecases/scouting-notes-case-study.html` | 1 (the advisor's quote) | 3 (inherited, real tension, whiteboard session) | 1: `<aside class="fds-highlight fade-up">` with the `↻` as an `aria-hidden` SVG in `fds-highlight__icon` (the docs' own icon) |
| `usecases/curaay-case-study.html` | 1 (the 76% statistic, cite = AAPA) | 2 (the reframe, design principle) | — |

Totals: 4 pull-quotes, 8 tension blocks, 1 insight. In the browser every block measures as expected: light radius 0 and rule 1.5px, dark radius 4px, label→title 16px, quote→source 12px, second paragraph 12px below the first (the pages' `body.cs h3`/`p` margin rules don't win over the component).

## Tag: instances converted

| Old | Now | Where |
| --- | --- | --- |
| `.hero-tag` (home) | `<span class="fds-tag"><span class="fds-tag__dot" aria-hidden="true">` inside a `.hero-tag-row` wrapper | `index.html` ~628 |
| `.project-tag` | `<span class="fds-tag fds-surface-dark">` | `index.html` ~753 |
| `.sm-chip` lvl-2 / lvl-1 / is-on / dimmed | `fds-tag fds-tag--accent` / `fds-tag` / `fds-tag--filled` / `fds-tag--muted` | `index.html` ~922 |
| `.medium-badge` | `<span class="fds-tag fds-surface-dark">` | `index.html` ~800 |
| `.market-tag` digital / analog | `<span class="fds-tag">` | `curaay-case-study.html` ~195–197 |

The pulsing dot stays as page CSS on `.hero-tag-row .fds-tag__dot` (decision 82): pulses twice and stops, glow marked "Decoration, not a token". The row wrapper carries the old `margin-bottom` (40px, 16px on small screens) and `fade-up`.
Left alone as instructed: the case-study hero label ("Case Study · …"), `.connector-badge`, `.market-card-badge`.

## Contrast (measured in the browser)

- Hero tag: navy text on the page background, plain border: the `color-text` role, 10.01:1 (previously over a see-through white fill).
- Medium badge and project tag: cream `rgb(245,241,235)` on solid navy `rgb(27,58,107)`, 10.01:1. The badge's old text role was the same pair, so no change.
- Skill chip accent: gold on solid dark navy 6.11:1 (as on the branch from B-037); filled: navy on gold; muted: the muted role (decision 70).
- Market tags: navy on the page/card surface, 10.01:1 or better (the two tinted fills are gone).
- Highlight: light 9.32:1 quote, 4.89:1 source; dark 10.01:1 title, 6.25:1 text (as measured in B-033).

## Deleted CSS: no references left

Removed from `styles.css`: sections 11 and 12 (`.pullquote*`, `.tension*`), the `.tension` mobile padding, the hero-tag block, `.project-tag`, `.medium-badge`, `.sm-chip*` (rules and mobile override) and the dimmed-chip rule; from the lists: `.tension p`, `.tension h3`, `.tension-label`, `.pullquote cite`, `body.home .hero-tag`, `.medium-badge`, `.sm-chip`, `.project-tag`. From the pages: the `.platform-insight*` rules in Scouting's `<style>` block (its other rules stay) and `.market-tag*` in Curaay's. `git grep` over the repo (outside `fds/`) finds no `pullquote`, `.tension`, `platform-insight`, `sm-chip`, `project-tag`, `medium-badge` or `market-tag`; the only "tension" left is the visible text "The real tension". `.patient-quote`, `.market-card--gap`, `.market-card-badge`, `.connector-badge` untouched. Braces balance. New page CSS: `body.cs .fds-highlight { margin: space-12 0 }` (the component has no outer margin), the hero row and dot pulse, and `.sm-chips .fds-tag` spacing.

## Screenshots

On `handoff`, from pages that aren't gated: `b038-1-scouting-insight.png`, `b038-2-scouting-pullquote.png`, `b038-3-scouting-tension.png`, `b038-9-home-hero-tag.png`, `b038-10-home-medium-badge.png`, `b038-8-home-project-tag-simulated.png`.

**Hawk and Curaay are password-gated, so by the standing rule their screenshots are local only and not on `handoff`:** `~/fajny-screenshots/b038-hawk-pullquote-LOCAL-ONLY.png`, `b038-hawk-tension-LOCAL-ONLY.png`, `b038-curaay-pullquote-LOCAL-ONLY.png`, `b038-curaay-market-tags-LOCAL-ONLY.png`. I opened them locally with the session unlock flag only; no password was written anywhere.

## What didn't survive as cleanly as expected

1. **No project card on the live home page shows a tag.** The tag only renders for a project without an image (`showText = !p.image`), and all three projects have images. So the project-tag swap is code-only and I could only check it by injecting the markup into a card (`b038-8-…-simulated.png`): a solid navy pill, cream text.
2. **The skill chips are only hidden on wider screens.** The brief said they're always visually hidden; on small screens (the mobile media query) the chip container becomes visible. So there is a visual change there: chips go from 10px/small padding to the component's single size (about 25px high) and lose the old translucent look. The tags are `white-space: nowrap`; a long skill name at 390px could overflow its row. Not verified for every skill name.
3. **Medium badge is `fds-tag fds-surface-dark`, not plain or filled.** The logo glyph is white; plain would draw it white on beige and filled would be white on gold. The dark pill keeps the old look. If you'd rather use plain, the logo's colour needs a decision.
4. **The Scouting insight's top margin goes 40px → 48px** (the page rule gives every highlight `space-12`). The pull-quote and tension keep their old 48px. Quote text grows 15–18px → 18–26px, as accepted in decision 78.
5. **The inline spacing on one paragraph is dropped:** Scouting's "whiteboard" block had `style="margin-top:16px"` on its second paragraph; the component's 12px between paragraphs applies instead.
6. **Pull-quote text now uses typographic quotes** (“ ”) where it is somebody's words (3 of the 4; the Curaay statistic has none), as the Highlight docs ask. Copy is otherwise unchanged.
7. **Project/Medium/chip lists aren't `<ul>`s.** The docs want a list for several tags; the skill chips sit inside the row's button, where a list isn't valid, so they stay `<span>`s.
8. **Dark Highlight padding** is the component's (`space-10` / `space-gutter`: 40px and 45px at 1200px) instead of 40px / 48px: about 3px less at the sides.

## Question

1. Medium badge: keep the dark pill (my choice), or change it to a plain tag with the logo recoloured? (item 3)
