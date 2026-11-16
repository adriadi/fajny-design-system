# B-030 · Navigation: marker colour fix, restore the scrim/translucent bar

Two fixes to `components/navigation` before it's ready to merge. The case-study bar's exact styling (Q2 from B-029) is still open with the owner — don't touch the Minimal variant's dimensions/type yet, that may come as a follow-up.

## Task 1: current-page marker colour (decision 73)

Change the underline and the current link's text colour from a hardcoded `color-accent` to the existing `color-border-rule` role. It already does exactly what's needed: navy on light surfaces, and it already switches to gold on a dark surface through `scripts/surfaces.js`'s existing `DARK_SURFACE` map (`color-border-rule` → `color-border-rule-on-dark`) — no new token, no change to that script needed, just point Navigation's CSS at the right role. Recheck and report the rendered contrast on both a light and a dark surface (should land near the role's documented values: navy ~10:1 on light, gold 6.11:1 on dark).

## Task 2: restore the scrim and the translucent scrolled-bar background

Decision 54 already settled this, before B-029 dropped them for lack of a token: *"See-through decorative colours (glows, blobs, translucent nav and menu backgrounds, scrims, tints on dark) stay as literals, listed in the README as allowed decoration."* Add them back as plain CSS literal values (not tokens) — the drawer's backdrop scrim, and the bar's translucent/blurred background once scrolled, matching what the portfolio already does today. List both in the README under the existing "allowed decoration" section (add it if it doesn't exist yet, matching how other literals from decision 54 are documented).

## Report

`REPORT.md` with ID `B-030`: the new contrast numbers for the marker on both surfaces, confirmation the scrim and translucent bar are back (with their literal values), and the README's updated allowed-decoration list. Update the preview and Figma if the marker's colour change is visible there. No merge to `main` yet. Push to `handoff` and stop.
