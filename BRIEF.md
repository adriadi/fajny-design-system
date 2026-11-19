# B-041 · Second portfolio sync, step 3: Button + Input + Card

Decisions 59–61 (Input), 51–53 (Button), 62 (Card), 81–83. On its own branch (`portfolio/sync-button-input-card` or your own name) — not on `main`. Stop after the report; merge is a separate brief, after the owner checks it. `work-with-me.html` and its form no longer exist (decision 84), so ignore every B-035 line about them.

## Button

Load `fds/button.css` wherever it isn't already (it's already linked from B-038's work).

- Hero: `.btn-primary` ("See my work") → `fds-button fds-button--primary`. `.btn-secondary` (the email link) → `fds-button fds-button--secondary`, **not** `--link` — two buttons of equal weight (decision 82), not a button-plus-text-link.
- `.btn-outline-light` (Calendly CTA, dark Experience block) → `fds-button fds-button--secondary` (decision 82 — becomes a filled pill, loses its outline).
- `.prototype-btn` (Hawk "View clickable prototype →") → `fds-button fds-button--primary`.
- `.form-submit` (contact form) → `fds-button fds-button--primary`, `type="submit"`. Swap the `disabled={status==='sending'}` for `aria-disabled` so it stays focusable while sending (decision 60's pattern).
- `.submit-btn` (password page) → `fds-button fds-button--primary`.
- Cookie banner (`js/cookies.js`): Accept → `fds-button--primary`, Decline → `fds-button--secondary` (decision 83).
- Leave alone: `.nav-cta`/`.nav-cta-mobile` (Navigation's job, step 4), the password show/hide toggle (Input's `fds-field__action`, below), the hero motion toggle, the skill-map/tweaks-panel controls (decision 83/B-035).
- Delete the matching old button CSS once converted.

## Input

Load `fds/input.css`.

- Contact form (`.form-input`/`.form-select`/`.form-textarea`) → `fds-input` inside an `fds-field` wrapper for name, email, topic, message.
- `.form-label` → `fds-field__label` (decision 83 — the system's `small`-role sentence-case label, closing the "navy form labels" item; don't try to preserve the old 11px uppercase look).
- Form-level error (`.form-error`): there's no form-level-banner part in the component, only per-field `fds-field__error`. **Go with per-field errors only, no separate banner** — that's how decisions 59–61 actually spec the component (error text, icon, `aria-invalid`, focus to the first invalid field on submit; no summary banner anywhere in the design). Flag it if this loses something the current form-level message was doing that per-field errors can't cover.
- Password page: `.password-input` + `.toggle-btn` → `fds-input` (type password) + `fds-field__action`. The page has no visible label today (placeholder only) — add one ("Password"), since the component requires it. Error state → `aria-invalid` + `fds-field__error` with the existing "Incorrect password — try again." text.

## Card

Load `fds/card.css`.

- **Project cards** (the biggest change in this step, decision 81): convert from today's text-over-a-4:3-photo overlay to `fds-card fds-card--image` — a 16:10 image with the title, tag and description below it. The gradient overlay, the placeholder `<div>`, and `.project-arrow` go; the tag moves into the card body (still `fds-tag`, from B-038). This is a visible redesign of the project grid — screenshot before and after.
- `.article-card` (Medium articles) → `fds-card` (linked, no image), overline = category, meta = read time.
- `.rec-card` ("Kind words" testimonials) → `fds-card`, not linked (decision 77).
- `.rec-cta-card` (LinkedIn) → linked `fds-card`.
- `.sm-card` (skill-map experience cards on the dark block) → `fds-card--dark`. Its `.is-lit`/`.is-dim` highlight states have no equivalent in Card — keep them as page-level CSS layered on top of the component, same as the skill-map toggles stay page CSS elsewhere.
- Leave alone: the Curaay `.market-card` family (decision 54, still out of scope).
- Delete the matching old card CSS once converted.

## Report

`REPORT.md` with ID `B-041`: branch name, every instance converted (file + line), contrast spot-checks where a fill or text colour changed, before/after screenshots of the project cards specifically (plus the other cards and the buttons), confirmation the deleted CSS has no remaining references, and anything that didn't survive the swap as cleanly as expected.
