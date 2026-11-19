# B-040 · Merge both portfolio branches into main

## Result

Portfolio `main`, from `cbbfd33`:

1. `portfolio/sync-highlight-tag` merged with `--no-ff`: **`5f59a37`**. No conflicts.
2. `portfolio/hero-copy` merged with `--no-ff`: **`de17ff0`**. No conflicts. Git merged `index.html` automatically (the two branches changed neighbouring lines of the hero: the tag row from B-038 and the headline and sub from B-039). No conflict markers in `index.html` or `styles.css`.
3. Both branches kept.

## Hero check on the merged `main`

Reloaded `index.html` locally (no console errors). The merged markup is the hero tag row (`fds-tag` with `fds-tag__dot`, dot pulse animation active), then the four-line headline, the new two-line sub, and both buttons ("View my work", "Get in touch"). Screenshot: `b040-1-merged-hero.png` (page zoomed to 75% only so the whole hero fits in one frame: the tag, the four-line headline, the sub and both buttons are all in view; the zoom isn't in the site).

The B-039 flag still holds: in a short window (about 650px high) the sub and buttons sit below the fold at 100% zoom.

## Push

`main` pushed to `adriadi/portfolio`: `cbbfd33..de17ff0`.
