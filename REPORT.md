# B-037 · work-with-me.html doesn't ship

Pushed: portfolio `main` `043b6cc..cbbfd33`.

## What I did

A new commit on top of the three B-036 commits (`cbbfd33`; no history rewritten, so the merge `d444b5b` stays as it was). The removal was clean at file and hunk level; nothing was tangled with the fixes.

## Removed

- `work-with-me.html` and `js/work-with-me.js` (the only two files the merge added).
- The merge's 8 lines in `index.html`: the two "Work with me" nav links (bar and mobile menu) and a small effect that scrolled to a `#hash` for links arriving from the page. `index.html` is now identical to what it was before the merge: the net diff of `main` against the old `origin/main` doesn't list it.
- The page's CSS in `styles.css`: the whole "30b. Work with me" section (`.wwm-*`, `.feature-card*`, the inquiry form, `.form-check`, `.field-error`, `.form-alert`, the `aria-current` nav rule) and the page's selectors added to the shared type-role lists. The brief named the page, script and link; this CSS only served the page, so I removed it too.

## Kept (the two real fixes)

- Decision 70: `.sm-chip.lvl-2` is `color-accent` on a solid `color-surface-dark` fill with a gold border, and a dimmed chip uses the muted text colour instead of `opacity` (`.sm-row.is-dim .sm-chip:not(.is-on)`). In the browser the chip computes to gold text on navy.
- Decision 69: `.medium-badge` has no `:hover` rule and no transition (computed transition is the default).

## Nothing else references the page

A search of the whole repo (HTML, JS, PHP, CSS, scripts) for `work-with-me`, `wwm-`, `feature-card` and `inquiry-form` finds nothing. There is no sitemap or other file listing it. Braces in `styles.css` balance.

## Check

The repo has no build or test step (a static site). I reloaded `index.html` locally: no console errors, the nav lists Case Studies, Experience and Let's talk only, and there is no link to the removed page.

## Net effect of the push on the live site

Only what B-036 intended: `tokens.css` synced (no visible change), `fds/` copied and not linked, the two fixes, and the dead CSS removed. Nothing about the Work with me page is public.
