# B-032 · Highlight audit

Audit only: no code changed, no commits besides this report.

## Where I looked

`portfolio-tokens` (branch `design-system/work-with-me`, the site on tokens), read in the source and measured in a browser at 1440px: all three case studies (`hawk`, `curaay`, `scouting-notes`), the home page, and the original `portfolio` for the pre-migration values. **Screenshots:** `scouting-notes-case-study.html` has no password gate (the home page links straight to it), so the screenshots below are from it and are in this branch. The Hawk and Curaay pages are gated: I checked them in the browser with the gate set and describe them in words; the two screenshots I took of them are only on this machine (`~/fajny-screenshots/b032-*-LOCAL-ONLY.png`).

## Summary

Highlight exists today as two blocks that are **identical in all three case studies**: the **tension** block (8 uses: Hawk 3, Scouting 3, Curaay 2) and the **pull-quote** (4 uses: Hawk 2, Scouting 1, Curaay 1). Both are plain CSS classes (`.tension`, `.pullquote`) with no shared component and no semantic markup. There is a **third pattern** (`.platform-insight`, a pull-quote that has drifted) and a few other quote-shaped things, listed below.

## 1. The tension block (dark variant)

- **Where:** 8 blocks, each a `div.tension.fds-surface-dark` with a label (`.tension-label`), an `h3` and one or two `p`. Labels, for example: "The core gap", "The decision", "The trade-off", "What we inherited", "The real tension", "The reframe", "The design principle".
- **Styling now:** `color-surface-dark` navy `rgb(27, 58, 107)` (via the `.fds-surface-dark` class), padding `space-10` `space-12` (40px 48px), `radius-sm` (4px), margin `space-12` above and below. Label: 12px, 600, 0.12em, uppercase (the `overline` role). Heading: Syne 30px at 1440 (the `subheading` role). Body: Inter 16px (`body`).
- **Is the decision 22 bug still there? No, it's gone.** The heading is `rgb(245, 241, 235)` on navy, **10.01:1**. It was fixed in two steps: the navy background (decision 30), then the surface switching (decision 33), which gives the heading and the label the light `color-text` by themselves. All 8 blocks measure the same.
- **Contrast of everything in it:**

| Element | Colours | Ratio |
| --- | --- | --- |
| Label and heading | sand on navy | 10.01:1 |
| Body | `color-text-muted` (on-dark `rgb(200, 192, 180)`) on navy | 6.25:1 |

- **One quirk that is still there (same class of bug as decision 22, for spacing):** `.tension h3` sets `margin-top: 0`, but the page-wide `body.cs h3 { margin-top: space-10 }` is more specific and wins: the computed margin above the heading is **40px**, so the gap between the label and the heading is about 40px, not the 16px the block intends (visible in the screenshot). The label's own `margin-bottom: space-4` loses to it too.
- **Screenshot:** `b032-1-tension-scouting.png` (Scouting, "What we inherited"). Hawk's blocks measure the same.

## 2. The pull-quote (light variant)

- **Where:** 4 blocks, each a `div.pullquote` with a `p` and a `cite`; no `<blockquote>` or `<figure>`.
  - Hawk: a compliance analyst's quote ("Compliance Analyst · German Financial Institution"), and a second one captioned "From my design rationale" (the author's own words).
  - Scouting: "Diego De La Vega · Sr. Agricultural Advisor, La Pampa, Argentina".
  - Curaay: it is used for a **statistic** with a source ("AAPA (2023) · American Academy of Physician Associates…"), not a quote. So one class does three jobs: a user quote, the author's rationale and a cited fact.
- **Styling now:** `color-surface-highlight` background `rgb(228, 234, 244)`, a **3px** left rule in `color-border-highlight` `rgb(127, 168, 212)`, padding `space-6` `space-8` (24px 32px), margin `space-12`, radius 0 on the left and `radius-sm` on the right. Text: Syne italic, `clamp(18px, 2.5vw, 26px)` (26px at 1440), line height 1.4, `color-text`. The citation: Inter 14px, normal style, `color-text-muted`.
- **Contrast:**

| Element | Colours | Ratio |
| --- | --- | --- |
| Quote text | navy on `rgb(228, 234, 244)` | 9.32:1 |
| Citation | muted on the highlight fill | 4.89:1 |
| **The rule** | `rgb(127, 168, 212)` against the fill | **2.06:1** (decision 31's number: confirmed, unchanged; 2.21:1 against the page background) |

- **The same spacing quirk:** `.pullquote p` sets `margin-bottom: space-3` (12px) but `body.cs p { margin-bottom: space-5 }` wins, so the space between the quote and its citation is **20px**.
- **Screenshot:** `b032-2-pullquote-scouting.png`.

## 3. What decision 54's "quotes wait for Highlight" refers to

The type of the quote text. `.pullquote p` (and `.platform-insight p`) carry the comment `No type role: a quote.`: Syne italic with a fluid `clamp(18px, 2.5vw, 26px)` and line height 1.4. None of the 11 text roles fits it, so those lines stayed literals in the migration, and the Highlight component is where its role (or a role plus a size) has to be decided. Nothing else in the blocks is waiting: the colours already use the Highlight roles (`surface-highlight`, `border-highlight`).

## 4. Other quote- or highlight-shaped patterns

1. **`.platform-insight` (Scouting only, an inline style in the page).** The pull-quote's twin: the same fill, the same 3px rule, the same 24px 32px padding and the same radius, **with a ↻ icon beside the text**, a smaller quote (Syne italic `clamp(15px, 1.8vw, 18px)`) and `margin-top: space-10`. It's a pull-quote that drifted: a copy of the CSS in the page instead of a variant. Screenshot: `b032-3-platform-insight-scouting.png`. Its icon is `color-text` 20px.
2. **`.patient-quote` (Curaay, 4 of them; an inline style).** Short quoted phrases ("No appointments available", "8-week waiting time") as pill-like white cards: `color-surface`, a 1px `color-border` line, a **6px** radius (a literal, "No token"; the scale has 4 and 8), padding `space-3` `space-4`, italic 14px muted text (5.91:1 on white), no wrap. Local only.
3. **`.market-card--gap` (Curaay, an inline style).** A highlighted card: `color-surface-highlight` with a **2px** `color-border-highlight` line (2.06:1) and `radius-lg`; the matrix quadrant tint uses the same fill. This is the token's "highlighted area" use, not a quote.
4. **Testimonials on the home page ("Kind words", 7 cards).** Cards (`.rec-card`, `radius-lg`, `color-background` fill with a 1px border) with a name (Syne 22px, navy), a role (14px muted, 5.25:1) and the quote as plain 14px muted body text (5.25:1): **no quote marks, no italic, no Highlight styling**. They are quotes in meaning, but they look like Cards. Screenshot: `b032-4-home-testimonials.png`.
5. The straight `"` quote marks in the pull-quotes and patient quotes are typed into the text, not typographic quotes.

## 5. Off-grid spacing

**None in the two blocks.** Pre-migration (`portfolio`): `.pullquote` padding 24px 32px, margin 48px, quote `margin-bottom` 12px; `.tension` padding 40px 48px, margin 48px, label `margin-bottom` 16px: all on the 4px grid already, so decision 38's off-grid count didn't touch them. What is still **off the scale** around them:

- The **3px** pull-quote rule (and the platform insight's), and the **2px** market card line, against the system's one border width (`border-width.default`, 1.5px, decision 64).
- The **6px** `.patient-quote` radius (the radius scale is 4, 8, 16, pill, round).
- Type: the quote's `clamp(18px, 2.5vw, 26px)` and the insight's `clamp(15px, 1.8vw, 18px)`, and the 20px insight icon.
- The two margin overrides in sections 1 and 2.

## Screenshots (this branch)

| What | File |
| --- | --- |
| Tension block in context (Scouting, "What we inherited") | `b032-1-tension-scouting.png` |
| Pull-quote in context (Scouting) | `b032-2-pullquote-scouting.png` |
| The platform insight, the drifted pull-quote (Scouting) | `b032-3-platform-insight-scouting.png` |
| Home page testimonials | `b032-4-home-testimonials.png` |

## Questions

1. **The pull-quote's job.** It currently shows a user quote, the author's own words and a cited statistic. Should Highlight keep one light variant for all three, or should the statistic (and the platform insight) get their own treatment, for example a variant with an icon?
2. **The quote type.** A new text role (Syne italic, fluid, line height 1.4), or an existing one (`heading`, `subheading` or `lead` in italic)? The sizes in use run from 15 to 26px.
3. **The rule width:** 3px as it is, or `border-width.default` (1.5px, decision 64)? It stays 2.06:1 either way (decision 31).
4. **The home page testimonials:** in scope for Highlight (a quote with a name and role), or do they stay Cards?
5. **The two margin overrides** (the heading's 40px, the quote's 20px): should the component fix them by being specific enough, which changes today's spacing slightly (label to heading 40px → 16px)?
