# B-008 · Finish the portfolio, then build the Button

## Owner's answers to B-007

The pause control proposal is approved as written. Questions 1–9: all as you recommended. Recorded as decision 56 in `DECISIONS.md` on `main` (`git pull` first).

## A. Portfolio, branch `design-system/tokens` (do this first)

1. **Pause control:** build it exactly as proposed in B-007 A1, and put the blobs back to continuous motion (decision 55). Under reduced motion they start paused; pressing play is the visitor's choice, so the reduced-motion block needs the exception you described.
2. **Two colours:** ghost section number → `color-surface-subtle`; "available" dot → `color-success` (the pulse glow stays a decoration literal).
3. Re-sync `tokens.css` only if part B changed tokens the portfolio uses, and say so.
4. Screenshots of the home page (1440 and 390), local only, as before.
5. Commit and push. **Don't merge, don't deploy.** In the report, list the files the owner has to upload to the server after the merge (she uploads by hand), relative to the site root.

## B. Button (system repo, new branch `components/button` from `main`)

Everything per decisions 51, 53 and 56.

1. **Tokens:** the `label` role (with its family and text transform), `color-secondary`, `color-text-on-secondary`, `color-secondary-hover`, the new primitive navy-200, the new value of `color-action-hover-on-dark`, `border-width.control`, `opacity.disabled`. Every check passes; add the new pairs to the contrast check (secondary label on secondary fill and on its hover, on both surfaces; dark primary label on its hover).
2. **Component in code:** `fds-button` with `--primary`, `--secondary`, `--link`, all states from the B-007 tables on both surfaces, the navigation size, loading with `role="status"`, `aria-disabled`. Uses only tokens. Reduced motion respected.
3. **Docs:** `docs/button.md`: when to use each variant and when not, `<a>` vs `<button>`, states, accessibility notes (focus, hit area, disabled, loading), do and don't, copy-paste HTML.
4. **Design system page:** add the Button component with a live preview of all variants and states on light and dark, and its guidelines. Nothing else on the page. If the page's generated token card still shows old values afterwards, say so.
5. **Figma (MCP):** a Button component set with variants for variant × state, bound to the variables and the `label` text style, so a frame's "Dark surface" mode switches it. Make it part of a repo script, like typography (decisions 44, 45). Add a "Button check" page with every variant and state, light and dark.
6. Commit and push `components/button`. **Don't merge.**

## Report

`REPORT.md` with the ID `B-008`: part A first (commits, upload list), then part B (commits, check results, what the owner should check and where: the preview page and the Figma "Button check" page, screenshot of that page on this branch as `button-check.png`). Numbered questions if any. Push to `handoff` and stop.
