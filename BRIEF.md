# B-038 · Second portfolio sync, step 2: Highlight + Tag

Decisions 69–71, 75–78, 79, 82, 83. Work on its own branch in the portfolio repo (`portfolio/sync-highlight-tag` or your own name for it) — **not on `main`**. Stop after the report; the merge to `main` is a separate brief, after the owner checks it.

## Highlight

Load `fds/highlight.css` (already copied into the portfolio by B-036, just unlinked so far) from every page that needs it.

- **Pull-quotes → `fds-highlight`** (light, figure/blockquote shape): hawk (2 instances), scouting (1), curaay (1). Follow `docs/highlight.md`'s exact markup. Square corners (decision 75), 1.5px rule, the `quote` text role.
- **Tension blocks → `fds-highlight fds-highlight--dark`**: hawk (3), scouting (3), curaay (2) — 8 total. Label/heading/paragraph(s) map to `__label`/`__title`/`__text`; keep the heading level (`h3`).
- **The Scouting insight → `fds-highlight` with the icon slot** (the `↻` glyph goes in `fds-highlight__icon`, `aria-hidden`).
- Delete the matching page CSS once converted: `.pullquote`, `.tension`/`.tension-label`, `.platform-insight` and its inline `<style>` block — but not `.patient-quote` or `.market-card--gap` (still out of scope, decision 77).

## Tag

Load `fds/tag.css`.

- **Hero tag → `fds-tag` + `fds-tag__dot`.** The pulsing dot stays as page-level CSS on `.fds-tag__dot` (decision 82) — not part of the component.
- **Project tag over the photo → `fds-tag` with `fds-surface-dark`** (solid dark pill, decision 71).
- **Skill chips** (`.sm-chip` lvl-1/lvl-2/is-on) → `fds-tag`/`fds-tag--accent`/`fds-tag--filled`/`fds-tag--muted`. These are visually hidden (screen-reader only), so this is code-only — no visual check needed here, just confirm the markup swap keeps them hidden the same way.
- **Medium badge → `fds-tag`** (plain or `--filled`, your call — it's a static label either way; no hover, per decision 69, already true since B-036).
- **`market-tag` (Curaay)** → default `fds-tag` (decision 83's audit note: two fills collapse to the outlined default).
- Leave the case-study bar's "Case Study · …" label as plain text (decision 83 — not a Tag). Leave `.connector-badge` and `.market-card-badge` alone (diagram label, Curaay card badge — not Tag).
- Delete the matching old CSS once converted.

## Report

`REPORT.md` with ID `B-038`: branch name, every instance converted (file + line), contrast spot-checks where a fill or text colour changed, confirmation the deleted CSS has no remaining references, and screenshots of each case study's pull-quote/tension/insight and of the home page's hero tag, project tag and Medium badge. Flag anything that didn't survive the swap as cleanly as expected, same as always.
