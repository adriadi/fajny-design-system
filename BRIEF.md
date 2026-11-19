# B-040 · Merge both portfolio branches into main

Decisions 85–86. Two approved branches to bring into the portfolio's `main` (`cbbfd33`): `portfolio/sync-highlight-tag` (B-038) and `portfolio/hero-copy` (B-039). Both touch `index.html`'s hero area, so merge one at a time and check between them.

## Steps

1. Merge `portfolio/sync-highlight-tag` into `main` first, `--no-ff`. If it conflicts, stop and report; don't resolve it yourself.
2. If that's clean, merge `portfolio/hero-copy` into `main`, `--no-ff`. This one touches the same hero block (the headline/sub lines next to the hero-tag markup B-038 added) — if there's a conflict, it's most likely right there; stop and report it rather than resolving it.
3. If both merge clean, reload `index.html` locally and sanity check the hero: the tag with its dot, the new four-line headline, the new sub, both buttons. A screenshot is enough.
4. Push `main`. Keep both branches.

## Report

`REPORT.md` with ID `B-040`: both merge commit hashes, confirmation of no conflicts (or exactly what conflicted, if you stopped), the hero screenshot, and the push result.
