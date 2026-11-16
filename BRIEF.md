# B-029 · Build Navigation

Decisions from the B-028 audit (DECISIONS.md 72). Build the component — and fix the real accessibility bugs B-028 found along the way, since "accessibility first" already covers them without a separate decision.

## Scope (decision 72)

One component, `fds-nav` (or whatever you name the root class — pick something consistent with the others and say what you picked), with:
- **Default**: the full nav (logo, links, CTA, hamburger/drawer on mobile) — what the home page and `work-with-me.html` both already approximate, now unified into one real implementation instead of two.
- **Minimal variant**: the case-study bar (brand name, back link). Same component family, not a separate one.

## Current-page marker (decision 72)

Replace colour-only with a `border-bottom: 1.5px solid` in `color-accent`, matching the portfolio's existing `.btn-secondary` gold-underline treatment exactly (same width, same role). Pair it with `aria-current="page"` on every page that has a current link — today only `work-with-me.html` sets it; the home page's section links need their own current-section logic if that's in scope, or can skip `aria-current` if "current" only means "which page", your call, say which you did.

## Fix the real bugs B-028 found

All from the audit, fix as you build rather than as afterthoughts:

1. **Closed drawer stays keyboard-reachable.** Make it properly hidden when closed (`inert`, or move it out of the tab order some other correct way) — not just moved off-screen and faded.
2. **`aria-expanded` / `aria-controls` on the menu button**, consistently on every page that has one (today only `work-with-me.html` has them).
3. **Esc closes the open drawer**, and **focus returns to the menu button** on close (by Esc, by the scrim, or by choosing a link).
4. **Focus trap while the drawer is open** (Tab doesn't escape into the page behind the scrim).
5. **The `<nav>` gets an `aria-label`** (e.g. "Main"), and the **mobile links move inside the `<nav>`** landmark, not a sibling `div`.
6. **Section links stop being `href="#"` with a scroll handler.** Give them real hrefs (`#section-id`) so they're shareable and openable in a new tab; keep whatever smooth-scroll behaviour you want on top, with the reduced-motion fallback already standard elsewhere.
7. The case-study back link's `←` arrow: keep it decorative (`aria-hidden`) rather than CSS `content`, which some screen readers read aloud.

Things from the audit that do NOT need fixing — already fine, leave them: focus visibility (the system ring already shows everywhere), the 40px hamburger touch target (passes 24px), contrast at rest/hover/scrolled (all ≥ 4.5:1).

## Figma, docs, preview

As always: decision 58's page pattern, `docs/navigation.md`, update the preview with both variants (and the drawer open/closed, and the current-page marker visible). Neutral example links/labels on the component itself.

## Checking the case-study bar against the real case studies

The case-study pages are behind the password gate. Open them locally with the gate set to check the minimal variant against the real thing. **Per the standing rule: never write the password anywhere, and any screenshot of a gated page stays local only (`~/fajny-screenshots/` or wherever you've kept them before) — never commit or push one.** If you want a screenshot of the gated pages in the report, describe what you checked in words instead, or ask me how to share it outside the repo.

## Report

`REPORT.md` with ID `B-029`: the class/variant names you picked, the current-page marker's rendered contrast, confirmation of each of the 7 fixes above (what changed, or why one didn't apply), and screenshots of the ungated parts (home nav default + drawer open/closed, with the new current-page marker visible). No merge to `main` yet — stop after the report and push to `handoff`.
