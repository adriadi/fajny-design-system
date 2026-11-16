# B-025 · Tag audit

Audit only: no code changed, no commits besides this report.

## Where I looked

- **`portfolio-tokens`** (branch `design-system/tokens`, and merged to its `main`): the site as it is now, on the design system tokens. Measured in a real browser (computed styles, contrast from rendered pixels).
- **`portfolio`** (branch `test/before-2`): the original, for the pre-migration values (off-grid padding, original colours).
- Caveats:
  - `work-with-me.html` exists **only in `portfolio`**, not in `portfolio-tokens`. Its tag (pattern 7) has not been migrated.
  - The three case-study pages sit behind the password page, so I did not open them. Their tag (pattern 8) is read from CSS, with no screenshot.
- Contrast: computed from the tokens, and where a tint is involved, measured from the rendered pixels.

## Summary

Eight distinct tag/chip-shaped patterns, six of them pills. Only two are interactive: the skill filters and the Clear button. Every pill already uses `radius-pill` after migration (originally `100px` or `999px`), so decision 39 holds. The patterns do not share one type size, weight or padding.

| # | Pattern (class) | Where, and what it's for | Static / interactive | Surface | Radius | Padding original → now | Type |
|---|---|---|---|---|---|---|---|
| 1 | Hero status tag (`body.home .hero-tag`) | Home hero. Status: "Open to senior product design roles", with a pulsing green dot | Static | Light (beige) | 999px | 6px 14px → 8px 16px | 11px / 600, 0.1em, uppercase |
| 2 | Medium badge (`.medium-badge`) | Home, Articles heading. Marks the source platform | Static `<span>` (but has a `:hover` opacity rule) | Light | 999px | 4px 12px 4px 8px, same | 11px / 600, 0.04em |
| 3 | Project tag (`.project-tag`) | Home project cards: topic label ("AI · Healthcare") over a photo | Static | Photo + overlay | 999px | 4px 10px → 4px 12px | 10px / 600, 0.08em, uppercase |
| 4 | Skill filter (`.sm-skill`) | Home, skill map (dark navy). Filter: pick a skill | **Interactive** `<button aria-pressed>` | Dark | 8px desktop, **999px mobile** | 7px 6px (6px 12px mobile) → 8px; 8px 12px mobile | 11px / 500 (12px mobile) |
| 5 | Clear (`.sm-clear`) | Home, skill map, appears once a skill is pinned | **Interactive** `<button>` | Dark | 999px | 7px 12px → 8px 12px | 12px / 500 |
| 6 | Skill chip (`.sm-chip`, `lvl-1`, `lvl-2`, `is-on`) | Home, skill map, each role. Skill and level (core / also involved). Visually hidden on desktop (screen-reader only), shown at ≤760px | Static | Dark | 999px | 4px 10px (3px 8px mobile) → 4px 12px; 4px 8px mobile | 11px (10px mobile) / 400 |
| 7 | Feature-card tags (`.feature-card-tags li`) | `work-with-me.html`, Curaay card: role and year ("Founding Team UX Designer", "2025–26") | Static | Light (white card) | 100px | **5px** 12px (not migrated) | 10px / 600, 0.08em, uppercase |
| 8 | Case-study hero tag (`body.cs .hero-tag`) | Top of each case study: "Case Study · HAWK AI · April 2026" | Static, **not a pill** (text plus a 40px line) | Light | none | none | 11px / 500, 0.14em, uppercase |

Colours and contrast, per pattern:

| # | Fill / text / border | Contrast |
|---|---|---|
| 1 | `rgba(255,255,255,.5)` on beige, navy text, 1.5px `color-border` | Navy on the tinted beige 10.6:1. The green dot `#22c55e` is a literal. |
| 2 | Navy fill, beige text, no border | 10.0:1 |
| 3 | `white 15%` fill, white text, 1px `white 25%`, blur 8px | Depends on the photo; about 6.2:1 over mid-navy. **Dormant**, see below. |
| 4 | No fill, `white 80%` text, 1px `white 22%`. Hover/active: gold text and gold border. Pressed: gold fill, navy text | Rest 7.8:1; gold text on navy 6.1:1; pressed navy on gold 6.1:1 |
| 5 | No fill, gold text `#E8B84B` (literal), 1px gold 50% border | 6.1:1 |
| 6 | `lvl-2`: gold 18% tint, gold text. `lvl-1`: no fill, 1px gold 45% border, muted text. `is-on`: gold fill, navy text | **`lvl-2` 4.47:1**, see below |
| 7 | No fill, navy text, 1.5px `gray-warm` border | Navy on white 11.3:1 |
| 8 | Original: **gold text on `#F5F1EB`**. Migrated: `color-text` navy | Original 1.64:1 (fails); migrated passes |

## Decision 54: "Gold chip text on dark waits for Tag"

It is the skill chip `.sm-chip.lvl-2` in `portfolio-tokens/styles.css` (lines about 1177–1181), on the navy experience section:

- **Text:** `#E8B84B` as a literal (no role). **Fill:** `oklch(80% 0.13 85 / 0.18)`, a gold 18% tint over navy, which renders as about `rgb(63, 80, 102)`.
- **Contrast of the text on that tint: 4.47:1** (measured from the rendered pixels; the estimate from the formula was 4.44:1). That is **just under 4.5:1** at 11px (10px on mobile), so it misses AA for body-size text.
- **In its dimmed state** (`.sm-row.is-dim .sm-chip { opacity: .6 }`) the same text drops to about **2.6:1**, computed. This is a deliberate "not selected" look, but it is the lowest contrast on the page.
- The same gold literal is in `.sm-clear` (6.1:1, passes) and in the `.sm-skill` hover state.
- Related: `lvl-1` and `is-on` already use roles (`color-text-muted`, `color-accent` / `color-text-on-accent`). Only `lvl-2` and `sm-clear` still hold the gold literal.

## Off-grid padding (decision 38)

In the original, tag padding used 3, 5, 6, 7, 10 and 14px:

- Pattern 1: 6px and 14px (now 8 and 16).
- Pattern 3: 10px (now 12).
- Pattern 4: 7px and 6px (now 8; mobile 6px 12px became 8px 12px).
- Pattern 5: 7px (now 8).
- Pattern 6: 10px, and 3px on mobile (now 12, and 4px 8px on mobile).
- Pattern 7: 5px. **Not migrated**, because the page isn't in `portfolio-tokens`.
- Patterns 2 and 8 had no off-grid values. Medium badge was already 4 and 12.

Other off-grid-ish values in the tag area:

- `.sm-skill` margins and the mobile gap (6px) around the filters.
- Chip margins (6px and 4px → 8px).

## Things worth knowing

1. **The project tag (pattern 3) is dormant.** `ProjectCard` renders it only when `showText` is true, and `showText = !p.image`. All three projects have an image, so no `.project-tag` is on the page, and I had no way to screenshot it in context. The CSS is live and a "projects without images" card would use it.
2. **The Medium badge looks like a link but is a `<span>`**, with a hover rule and no `href`.
3. **Two inconsistent type setups:** the pills use 10, 11 and 12px with weights 400, 500 and 600. The migrated page keeps several of them as literals (`font-size: 11px`) because no type role fits. Decision 56's `label` role (13→14px) is larger than any tag today.
4. **Skill filter shape changes with width** (8px radius on desktop, a pill on mobile), which decision 39's "every tag and chip is a pill" does not cover.
5. **Not tags in the CSS sense** (no pill styling): the article category and read-time overline above each article title, and the case-study eyebrow "Featured case study". Also, the `AI · HEALTHCARE` pill in the Curaay image on the work-with-me page, and the institution badges in the Hawk screenshots, are baked into images (JPG), so nothing to do in code.
6. **The hero status dot** pulses (`pulse-dot`, 2s, infinite). Decision 54 and the 5-second rule apply (WCAG 2.2.2); I noted it and changed nothing.

## Screenshots (in context, on this branch)

| Pattern | File |
|---|---|
| 1 Hero status tag | `b025-1-home-hero-tag.png` |
| 2 Medium badge | `b025-2-medium-badge.png` |
| 4 Skill filters (desktop, hover and on states) | `b025-3-skill-map-desktop.png` |
| 4, 5, 6 Filters as pills, Clear, role chips (`lvl-2`, `lvl-1`, `is-on`), mobile 390px | `b025-4-skill-map-mobile.png` |
| 7 Feature-card tags (original `portfolio`, work-with-me) | `b025-5-work-with-me-feature-tags.png` |

Missing: pattern 3 (not rendered anywhere) and pattern 8 (behind the password page).

## Questions

1. **Which patterns should the Tag component cover?** The pills that carry a label (1, 3, 6, 7) look like one family, while 2 is a source badge, 4 and 5 are controls (they belong to Button or a Filter component), and 8 isn't a pill. Recommendation: Tag = static pills (1, 3, 6, 7), and treat 4 and 5 separately. Reason: Tag then has one job, and the interactive ones need focus, pressed and disabled states that a static Tag shouldn't carry.
2. **How should the gold-on-dark chip be fixed?** Options: (a) raise the tint opacity or use a lighter tint so `lvl-2` clears 4.5:1, (b) give the chip the `color-accent` role on a dark fill, (c) keep the tint and bump the size/weight. Recommendation: (b), because it uses an existing role and gives a margin (6.1:1) instead of 4.47:1.
3. **The dimmed chip (2.6:1)**: is "not selected" allowed to drop below 4.5:1 (the text is still readable, but it's below AA)? Recommendation: dim by colour (muted role) rather than `opacity: .6`, so it stays above 4.5:1.
4. **Tag size**: one size (11px) or two (10px for tags on photos and in cards, 11px elsewhere)? Not decided here; the audit shows 10, 11, 12px in use.
5. **Should `work-with-me.html` be migrated into `portfolio-tokens` first**, so pattern 7 can be checked with real tokens?
