# B-041 · Second portfolio sync, step 3: Button + Input + Card

**Branch:** `portfolio/sync-button-input-card` in the portfolio repo, one commit `20f6fb7` on top of `main` (`de17ff0`), pushed. Not merged. Links added: `fds/button.css`, `fds/input.css`, `fds/image.css`, `fds/card.css` on the home page; `button.css` and `input.css` on the password page; `button.css` on the three case studies (the cookie banner and Hawk's button need it).

## Button: instances converted

| Old | Now | Where |
| --- | --- | --- |
| `.btn-primary` "View my work" | `fds-button fds-button--primary` | `index.html` hero |
| `.btn-secondary` "Get in touch" | `fds-button fds-button--secondary` (not `--link`) | `index.html` hero |
| `.btn-outline-light` "Schedule a call" | `fds-button fds-button--secondary` (dark block, light-blue fill) | `index.html`, Experience |
| `.prototype-btn` | `fds-button fds-button--primary` | `hawk-case-study.html` ~281 |
| `.form-submit` | `fds-button fds-button--primary`, `type="submit"`, `aria-disabled` + `data-loading` while sending (the `disabled` attribute and the inline `opacity` are gone) | `index.html` contact form |
| `.submit-btn` | `fds-button fds-button--primary`, full width via one page rule | `password.html` |
| `.cookie-accept` / `.cookie-decline` | `--primary` / `--secondary` (the old class names stay as script hooks) | `js/cookies.js` 31–32 |

Left alone as asked: `.nav-cta`, `.nav-cta-mobile`, the hero motion toggle, the skill map and tweaks controls. Contrast: primary cream on navy 10.01:1, secondary navy on light blue 9.32:1 (the pairs the Button docs list; read back in the browser: `rgb(245,241,235)` on `rgb(27,58,107)`, `rgb(27,58,107)` on `rgb(228,234,244)`).

## Input: instances converted

- Contact form (`index.html` ~1050): name, email, topic, message are `fds-field` + `fds-field__label` + `fds-input` (select and textarea too). Labels are now the `small` sentence-case role; the old 11px uppercase look is gone (decision 83).
- **Per-field errors only.** `novalidate` on the form; on submit each invalid field gets `aria-invalid="true"`, `aria-describedby` pointing at its `fds-field__error` (with the warning icon), and focus goes to the first invalid field. Messages: "Enter your name.", "Enter an email address like name@example.com.", "Write a message." Errors clear as you type. Checked in the browser with an empty submit: all three errors show, focus is on the name field, attributes are right. The topic select stays optional.
- Password page (`password.html`): `fds-field` with a **visible** "Password" label (it had a visually hidden one), `fds-input` type password, `fds-field__action` for show/hide (its icon and `aria-label` now switch between "Show password" and "Hide password"; before, the label never changed), and an `fds-field__error` with the existing "Incorrect password — try again." text, `aria-invalid` on the field. The shake animation is gone. Checked with a wrong value (no real password used): error shows and clears on typing, toggle works.

## Card: instances converted

| Old | Now | Where |
| --- | --- | --- |
| `.project-card` (text over 4:3 photo) | `fds-card fds-card--image`: 16:10 image, badge, then tag (`fds-tag`), title link, text, meta (the "Curaay · 2026" label) and "Read case study" | `index.html` `ProjectCard` ~730; gradient overlay, placeholder `<div>` and `.project-arrow` are gone |
| `.article-card` | `fds-card`: overline = category, title link (opens in new tab, with the hidden "(opens in a new tab)" text), excerpt, meta = read time, "Read on Medium" | `ArticleCard` ~750 |
| `.rec-card` | `fds-card`, not linked: name as title, role as meta, text | `Recommendations` ~1230 |
| `.rec-cta-card` | linked `fds-card` ("Open LinkedIn") | same |
| `.sm-card` | `fds-card fds-card--dark`: period = overline, role = title, company and description = text | Experience, ~960 |

Left alone: the Curaay `.market-card` family. Light/dim states of the education cards stay as page CSS: lit = gold border, dim = muted title and overline (muted on the dark surface is 6.25:1). The old gold tint on a lit card is not kept (no token for it).

## Screenshots (`b041-*` on `handoff`)

Before: `before-1-project-cards`, `before-2-recs`, `before-3-experience-cards`, `before-4-contact-form`. After: `after-1-project-cards`, `after-2-recs`, `after-3-experience-cards`, `after-4-contact-form-errors`, `after-5-password-error`, `after-8-articles`, `after-9-calendly-button`. Hawk is gated, so by the standing rule its screenshots stay local: `~/fajny-screenshots/b041-hawk-prototype-button-LOCAL-ONLY.png`, `b041-cookie-banner-on-hawk-LOCAL-ONLY.png`. I opened Hawk with the unlock flag only; no password written.

## Deleted CSS: no references left

Removed from `styles.css` (about 400 lines): `.btn-primary`, `.btn-secondary`, `.btn-outline-light` and their hover/svg rules; `.prototype-btn`; `.form-label`, `.form-input`/`.form-select`/`.form-textarea`, `.form-submit`, `.field`; `.password-input`, `.toggle-btn`, `.error-msg`, `.submit-btn`; `.cookie-decline`/`.cookie-accept` (the mobile rule now targets `.cookie-actions .fds-button`); `.project-card*`, `.project-placeholder`, `.project-arrow`, `.project-title`/`-desc`; `.article-*`; `.rec-card`/`-name`/`-role`/`-text`/`-cta-*`; `.sm-card`/`-desc`; `@keyframes shake`; their entries in the shared type, line-height and reduced-motion lists. `git grep` outside `fds/` finds none of these names (the only hit is a token description). Braces balance. The custom-cursor hover list in `index.html` now names `.fds-card` instead of the old card classes.

## Found and fixed: a page rule was hiding Hawk's button text

`body.cs a { color: text }` beat the component, so the Hawk prototype button first rendered navy text on navy. Fixed at the source: that rule and its hover are now `body.cs a:not(.fds-button)`. Measured after: cream on navy. Worth knowing for step 4: any page rule on `a` can do this to a component.

## What didn't survive as cleanly as expected

1. **The project images already contain the titles.** The three images are full slide graphics (headline, bullet list, "OUTCOME…" text), so each card now shows that text in the picture and again as the title and description below. Cards are also much taller (about 645px at 1440px wide). And 4:3 images in a 16:10 frame lose about 17% of their height (top and bottom), cutting into the baked-in text. This needs a decision: new, text-free card images; or accept it.
2. **Form-level server error kept.** Per-field errors can't cover "Could not reach the server" or a PHP failure, so I kept the existing plain red line (with the mailto fallback), now `role="alert"`. It's not a banner box, but it is a form-level message. If you want it gone, the failure would then be silent.
3. **Behaviour changed on the contact form:** previously an empty or invalid submit did nothing; now it explains why. The email check is a simple pattern (`a@b.c`), not a full validator.
4. **Hero "Get in touch" is now a light-blue pill**, not an underlined text link, and the Calendly button is a filled pill (as decided). Both buttons are 48px high.
5. **Cookie banner buttons are 48px high** (about 36px before), so the banner is taller. I checked it on desktop only.
6. **Heading levels:** every card title is an `<h3>` (7 testimonial names, 3 articles, 6 education cards, 3 projects). Fine for the outline, but a lot of headings.
7. **Not tested:** widths below 500px (the browser tool floors there), the successful-send path and the sending state (they need PHP, not `file://`), and keyboard flow on the education cards while a skill is pinned.

## Questions

1. Project cards: new text-free card images, or keep the full-slide images with the repeated text and the crop?
2. Keep the plain form-level server-error line, or drop it?
