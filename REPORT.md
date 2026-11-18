# B-036 · Second portfolio sync, step 1: foundation

All four steps are done in the portfolio repo, on its `main`, **as local commits. I did not push `main`** (question 1).

## Result

1. **Merge:** `design-system/work-with-me` merged into `main` with `--no-ff`, clean, no conflict: `d444b5b`.
2. **`tokens.css` is current.** Re-synced from the design system's `main` at `a81aff6` (the `3efeccd` Highlight merge plus the decision-log commits after it; no token or component changed between them). Commit `ba3829b`. The header comment names `a81aff6`.
   - Only one token *value* changed: `color-action-hover-on-dark`, gold-500 → sand-50 (decision 56). It matters only for a primary-button hover inside a dark surface, and no portfolio element has one (the hover rules are on the light nav, the light cookie banner, the contact form and the password page). So nothing visible changes. Everything else in the diff is added tokens and reworded descriptions.
3. **Sync script extended.** `scripts/sync-tokens.sh` now also copies the component files. Same commit `ba3829b`.
   - **Destination: `fds/`, next to `tokens.css`** (`fds/button.css`, `card.css`, `highlight.css`, `image.css`, `input.css`, `navigation.css`, `navigation.js`, `tag.css`: 8 files).
   - Committed into the repo, not loaded from elsewhere. Each file starts with a one-line comment naming the design system commit (`a81aff6`) and "Don't edit".
   - The script refuses to run if `components/` has uncommitted changes in the design system (the same guard `tokens.css` has), and rebuilds `fds/` from scratch each run, so a removed component disappears too. Usage is unchanged: `bash scripts/sync-tokens.sh`.
   - **Not linked from any page, and no markup touched** (0 references to `fds/` in every HTML file).
4. **Dead CSS gone.** Commit `429a1ea`: all of section "32. CV MODAL" (`.cv-modal*`, plus `.cv-overlay` and `.cv-modal-success-icon`, which only that modal used) and `.btn-accent`, including their entries in the shared selector lists and the reduced-motion list. I checked that no HTML, JS or PHP file uses any of the names. `styles.css` went from 80,985 to 75,916 characters; braces balance; `grep` finds no `cv-` or `btn-accent` left.
   - I removed `.cv-overlay` and `.cv-modal-success-icon` as well as the `.cv-modal*` the brief named. They belong to the same unused modal.

## Nothing changed visually, with one expected exception

`b036-1-home.png`: the home page after all four steps (local `file://`, hero as before: tag, headline, buttons, pause control, translucent-less nav at the top of the page).

**The one visible difference comes from the merge in step 1, not from anything else:** the home nav now has a "WORK WITH ME" link (the 8 lines the `work-with-me` branch adds to `index.html`), and the site has a new `work-with-me.html` page and its script. That is what merging the branch means; I'm flagging it because the brief expected no visible change.

## Correction noted

The home nav's scrolled, see-through bar already exists in the component (`.fds-nav--scrolled`, toggled by `navigation.js` after 40px). My B-035 "no equivalent" was wrong; it's not a question for step 4.

## Questions

1. **Push the portfolio's `main`?** I stopped at local commits, since I'm assuming a push to `adriadi/portfolio` `main` publishes the site, and it would put the new Work with me page and nav link live. Say if you want it pushed (and whether the page is meant to be public yet).
