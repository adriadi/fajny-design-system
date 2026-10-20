# Decisions

Why the system is the way it is. Newest first within each section. Each entry says what was decided, why, and what it replaced in the portfolio.

## Format

### Components are CSS classes + HTML (20 Oct 2026)

One stylesheet with `.fds-*` classes, and copy-paste HTML in `docs/`. The portfolio mixes static HTML pages with a React page compiled in the browser, and plain classes work in both without a build step. React components would give stronger guardrails (props limit the options), but would leave the static pages out.

### Tokens use the W3C format, built with Style Dictionary (20 Oct 2026)

Sources are `tokens/src/**/*.tokens.json` in the [W3C Design Tokens format](https://www.designtokens.org/tr/drafts/format/). `npm run build` turns them into `tokens/css/tokens.css`. The built CSS is committed, so a site can link it without installing anything.

- **Prefix `--fds-`** so the variables never collide with a site's own.
- **Two layers.** Primitives (`color.navy.900`) are the raw palette. Semantic tokens (`color.text.default`) say what a value is for and point at a primitive. Components only use semantic tokens. In the CSS, semantic variables are written as `var(--fds-color-navy-900)`, so the link stays visible.
- **Sizes stay in px**, as in the portfolio. The config leaves out Style Dictionary's `size/rem` transform. It can't parse the `clamp()` heading sizes and printed a warning on every build.

## Values

All values come from an audit of the portfolio's CSS on 20 Oct 2026: `styles.css`, `index.html`, `password.html`, `work-with-me.html` and the three case studies.

### One error red: `#B32228` (20 Oct 2026)

The portfolio had 5 reds for errors: `#E05252` (password page), `oklch(50% 0.18 25)` (contact form), `oklch(55% 0.2 25)` (CV modal), and two more added on the Work with me page. `#E05252` is only 3.4:1 on the page background, below the 4.5:1 that WCAG AA requires for text. `oklch(50% 0.18 25)` = `#B32228` is 5.9:1, so that one stays.

### One success green: `#176700` (20 Oct 2026)

From the CV modal's success icon (`oklch(45% 0.15 140)`), 6.3:1 on the page background. The pulsing "available" dot (`#22C55E`) isn't a status colour and is left to the component that owns it.

### Radius scale: 4 / 8 / 16 / 20 / pill / round (20 Oct 2026)

The portfolio used 10 values: 2, 4, 5.5, 6, 7, 8, 10, 12, 14, 16 and 20px, plus `100px` and `999px` for pills. The scale keeps the ones with a clear job and gives each one a rule:

- **Every button and tag is `pill`.** The portfolio's form submit button was the one square (4px) button on a site of pill buttons, and an agent copied it.
- Text cards are `lg` (16px), image cards and modals `xl` (20px).
- `sm` (4px) is for small inline blocks only, never buttons.

### Type scale: 11 / 13 / 15 / 18 / 22 + three fluid heading sizes (20 Oct 2026)

The portfolio used 10, 11, 12, 13, 14, 15, 16, 18, 20, 22 and 24px, plus 14 different `clamp()` values. The scale keeps the five most-used fixed sizes and three headings: `heading-sm`, `heading-md` (section titles) and `display` (hero). **Moving the portfolio onto the system will shift 10, 12, 14 and 16px text** to the nearest step. That's intended.

### Space scale: 4px grid, up to 96px (20 Oct 2026)

The portfolio's 100px section padding becomes 96px (`space.24`).

## Open questions

- **Gold text fails contrast.** `color.text.accent` (`#C99A2E`) is the italic gold in headings. It's 2.3:1 on the page background, which fails even the 3:1 for large text. The portfolio also uses it for 11px eyebrows ("SELECTED WORK"). For now the token is marked decorative only. Options: darken it (which changes the brand), or keep gold for large headings and use navy for small eyebrows.
- **Input underlines are hard to see.** `color.border.default` (`#D9D1C5`) is 1.3:1 on the page background. Input borders should be at least 3:1 (WCAG 1.4.11). This will be decided when the Input component is built.
