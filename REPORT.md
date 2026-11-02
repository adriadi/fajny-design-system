# B-006 · Report

## A. Design system repo

- `figma/modes` merged into `main`: `8879a9e` (a merge commit, because `main` had the README date change), pushed. Build passes (contrast 44 pairs, zoom, type, all Figma files). Local branch deleted with `git branch -d`.

## B. Portfolio repo (`adriadi/portfolio`)

Branch `design-system/tokens` from `main` (`f143a85`, the same commit as `before-system`), pushed, **not merged, not deployed**. `before-system` and the `test/*` branches are untouched.

| Commit | What |
| --- | --- |
| `06881dd` | `tokens.css` (copy of the system's built tokens at `8879a9e`) and `scripts/sync-tokens.sh` |
| `ce2e91e` | every page moved onto the tokens |

The branch lives in a separate worktree, `~/portfolio-tokens`, so `~/portfolio` stays on `test/before-2` exactly as it was.

### Sync script

`scripts/sync-tokens.sh [path to a clone of fajny-design-system]` (default `../fajny-design-system`) copies `tokens/css/tokens.css` to the site's `tokens.css`. Its first line names the system's commit: `/* Fajny design system tokens, copied from adriadi/fajny-design-system at 8879a9e by scripts/sync-tokens.sh. Don't edit: … */`. It refuses to copy a `tokens.css` with uncommitted changes, so the commit it names is real. Every page links `tokens.css` before `styles.css`.

### What changed

**All pages (`styles.css`)**
- **Colours:** every colour is a role (`--fds-color-*`). The old variables and their aliases are gone (`--bg`/`--beige`, `--bg-alt`/`--beige-mid`, `--rule`/`--gray-warm`, `--ink`, `--ink-muted`/`--text-muted`, `--text-main`, `--navy*`, `--accent*`, `--highlight`, `--num-ghost`, `--serif`, `--sans`, `--pad`). Only layout widths remain (`--max`, `--wide`, `--cols`).
- **Type:** the nine roles are assigned at the top of `styles.css`, one block per role listing its elements, each with all five properties. Elements without a fitting role are marked `No type role` (question 6).
- **Spacing:** every padding, margin and gap is a `space-*` step, with values in between rounded up (decision 38). Page side padding is `space-gutter` and section padding `space-section`, as their descriptions say.
- **Radius:** 4 → `sm`, 8 → `md`, 16 → `lg`; cards and modals 20 → `lg` and case-study images 12 → `lg` (decision 39); every button is `pill`, including the formerly square contact submit, password submit and "View prototype".
- **Shadow:** card hovers `sm`/`md`/`lg`, cookie banner `md` (floating banner), modal `overlay`.
- **Motion:** colour changes `fast`, hover lifts and menus `base`, content fading in `slow`, one easing everywhere; no overshoot (decision 41). Cursor and progress-bar timings stay outside the tokens, as decided.
- **Focus:** one rule gives every interactive element the ring from the focus tokens; it turns gold on dark surfaces by itself. The `outline: none` on form fields is gone.
- **Reduced motion:** a block at the end of `styles.css` stops every movement on every page (transforms, slides, fade-in travel, the shake, smooth scrolling, loops, hover lifts) and keeps colour and opacity changes.
- **Loops:** the "available" dot pulses twice and stops; the scroll line runs twice and stops; each hero blob moves once and rests (question 1).

**Home (`index.html`)**
- Experience section and footer: `.fds-surface-dark`. Their extra colour rules are gone; titles, labels, rules and the gold emphasis switch by themselves.
- Inline colour styles removed (nav button, hero button, two section labels, article read time, error message); inline spacing moved into CSS.
- Contact form: every label is linked to its field (`htmlFor` + `id`); placeholder `color-text-placeholder`, underline `color-border-input`, focus `color-border-strong`, error `color-error`.
- Scripts: smooth scrolling and the recommendations parallax turn off under reduced motion.

**Case studies (all three)**
- Tension blocks and the process-table headers: `.fds-surface-dark` (the near-black tension block becomes navy, decision 30).
- Project colours removed: Hawk's override block (blue accent and highlight) is gone; Curaay's purple highlight and blue tints are replaced by roles (question 5); the scroll script's hero-image scale stops under reduced motion.
- Body copy follows decisions 17 and 20: `body` role (15→16px) in `color-text`; Syne headings at weight 500 (decision 37).

**Password page**
- A visually hidden label "Password" linked to the field; error text and border `color-error`; the lock tile is a dark surface; the submit button is pill-shaped.

### Measurements

Measured with the patterns of `measure.sh`, over whole files at both states. Site files: `styles.css`, the five pages and the three scripts, without the system's `tokens.css` copy and without the home page's Tweaks panel (a dev-only overlay, left out in the "before" test too).

| | `before-system` | `design-system/tokens` |
| --- | --- | --- |
| Hardcoded colours | 180 | 83 |
| Hardcoded sizes (px, rem, em) | 981 | 399 |
| **Hardcoded values, total** | **1,161** | **482** |
| `var(--…)` uses | 307 | 985 |
| of which `var(--fds-…)` | 0 | 980 |
| Distinct colour values | 109 | 67 |
| Font-size values | 40 | 31 (22 literals, 9 role tokens) |
| The site's own custom properties | 25 | 3 (layout widths only) |

`measure.sh` itself (lines added since `before-system`): 334 hardcoded values (210 without the `tokens.css` copy), 1,032 `var()` uses, 208 "new" classes, new custom properties only `--fds-*` (from the copy). It counts rewritten lines as new, so for a migration the whole-file table above is the meaningful one. Most of the 482 left are layout sizes (widths, heights, positions, 1px borders) that aren't tokens by design; the colours left are in question 3.

### Screenshots

On the owner's machine only, never pushed:
- `~/fajny-screenshots/before/` and `~/fajny-screenshots/after/`, 12 files each: home, Hawk, Curaay and Scouting at 1440px and 390px.
- Pages taller than Chrome's 16,384px capture limit are saved in parts (`-part1`, `-part2`, …). For those parts the viewport-height hero was pinned to the real screen height, so it isn't stretched.
- The protected case studies were opened locally with the site's own unlock flag; no password was used or written down.

### How to check it locally

1. The branch is checked out in `~/portfolio-tokens`. In Finder, open `~/portfolio-tokens/index.html` in Chrome (a `file://` page works: React and Babel load from the CDN).
2. Case studies: open `~/portfolio-tokens/password.html` and use the password as on the live site.
3. To test reduced motion: in Chrome DevTools, Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce".
4. To see the branch in `~/portfolio` instead, first remove the worktree (`git -C ~/portfolio worktree remove ~/portfolio-tokens`), then `git -C ~/portfolio switch design-system/tokens`.

## Questions

1. **The hero blobs still run longer than 5 seconds.** Each now moves once and rests, but one cycle lasts 9, 12 and 14s, so WCAG 2.2.2 (decision 42) still isn't met.
   - A: shorten each cycle to 5s or less (a new value).
   - B: no blob movement at all.
   - C: leave as is.
   - **Recommendation: A**, keeping the character with one short drift; the duration is a new value, so it's yours.

2. **Gold text on a dark surface, in the skill map** (chip hover and selected text, the "Clear" button, chip labels): no text role is gold on dark except `color-text-emphasis`, which is for large headings. Kept as `#E8B84B`.
   - A: decide it with the Tag component (chips are tags).
   - B: a text role now.
   - **Recommendation: A**: these are chips and a button; their states belong to Tag and Button.

3. **Values with no token, kept as they were** (all marked `No token` in the code):
   - **See-through colours:** hero glows and blobs, the translucent nav and mobile menu backgrounds, scrims, and hover and column tints on dark.
   - **Solid colours:** the ghost section number `#E6E0D6`, the scouting hero backdrop `#080808`, the success icon fill, the green "available" dot, the recommendation card hover fill.
   - **Radii:** 2, 6, 10, 14px, and the 20px top of the first case-study section.
   - **Shadows:** the case-study section's upward shadow, and the button shadows and gold glow (Button stage).

   Options:
   - A: treat the see-through ones as decoration and list them in the README as allowed literals.
   - B: tokens for each.
   - C: remove them.
   - **Recommendation: A for the see-through decoration**, and decide the solid ones one by one. `#E6E0D6` and the green dot are the only solid colours outside the palette.

4. **Curaay's chart colours** (the purple competitor bubbles in the opportunity matrix): the system has no chart colours, and decision 16 removes project colours. Kept for now.
   - A: palette roles (e.g. competitors in `color-border-input` stone, Curaay in navy, as it is now).
   - B: chart roles in the system.
   - C: keep.
   - **Recommendation: A**: one highlighted item against neutral ones reads without a chart palette.

5. **Mapped by judgement, please check on the screenshots:**
   - **Eyebrows and labels** use `color-text` everywhere, as its description says ("labels, eyebrows"). The gold home labels are navy now; on dark surfaces the gold labels and dates are sand.
   - **Experience dates** are `overline` (labels above a role title), so they're uppercase and wrap to two lines in their 140px column.
   - **Card titles in Inter** (case-study pain, intent and step titles) become `card-title`, which is Syne. The cookie banner title is `card-title` too.
   - **Curaay market cards:**
     - the "gap" card is the light Highlight (`surface-highlight` + `border-highlight`)
     - the "bridge" card has a `border-rule` border
     - both badges are dark surfaces
     - the digital tag is `surface-highlight` and the analog tag `surface-subtle`
     - the green stat is `color-success`
   - **Form labels** are `color-text` (previously muted).

   Keep, or tell me which to revert.

6. **Text with no type role** (marked `No type role`):
   - **Waiting for components:** button, link and nav labels wait for the `label` role (B-005, question 1); tags, badges, form labels and fields wait for Tag and Input.
   - **Still open:**
     - metric numbers
     - the two quotes (pull quote, platform insight)
     - the brand name (loader, case-study nav, footer, contact name)
     - the password page's h1 (28→38px, between `heading` and `title`)
   - **Recommendation:**
     - password h1 → `heading`
     - quotes → decide with the Highlight component
     - numbers and brand name → leave until a page needs a role

7. **Leftovers in the home page code:**
   - the Tweaks panel still sets `--accent` at runtime, which no longer does anything
   - the project-card text overlay (shown only for a project without an image) keeps its photo colours
   - a bundler thumbnail template has `oklch` colours

   Remove them in a later cleanup? **Recommendation: yes**, separately from this migration.

8. **Not changed, but worth knowing:**
   - Links in case-study body copy are colour-only until hover (WCAG 1.4.1); the text-link rule comes with the components.
   - The custom cursor hides the system cursor (`cursor: none`).
   - The "sending" state of the contact button still uses an inline opacity of 0.65, waiting for `opacity.disabled` (B-005, question 5).
