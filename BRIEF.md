# B-009 · Pause control in the screen corner, small follow-ups

## Owner's answers to B-008

- **Pause control position:** decision 57 (`DECISIONS.md` on `main`, `fa6b850`). Fixed in the bottom-right corner of the screen, shown only while the hero is on screen, never covering the cookie banner, not focusable while hidden.
- **Q1:** the owner imported `tokens-studio.json` with Tokens Studio (all sets).
- **Q2:** A. Change the Button script to update the component set in place. Do it before the next component (task C2).
- **Q3:** fix the "None is built yet" sentence on the page. The stale token card goes to the parking lot (decision log), no more work on it.
- **Q4:** yes. The second portfolio update comes after `components/button` merges, in a later brief.

## Tasks

### A. Portfolio, branch `design-system/tokens`

1. Move the pause control to the bottom-right corner of the viewport (`position: fixed`), offset by spacing tokens. Show it only while the hero is in view (e.g. an `IntersectionObserver`); when hidden, it's removed from the tab order and the accessibility tree (`hidden` or `inert`), and its pressed state is kept. When the cookie banner is visible, the control sits above it, not under it. Below 900px it stays hidden, as now.
2. Test in Chrome: scroll the hero out and back, tab order with the hero in and out of view, the cookie banner shown and dismissed, reduced motion.
3. Screenshots of the home page (1440 and 390), local only.
4. Commit and push. **Don't merge, don't deploy.** Update the upload list if it changed.

### B. Figma

1. Read the file through MCP and confirm Tokens Studio now owns `navy/200`, `border-width/control` and `opacity/disabled` (same names, values, scopes and hide-from-publishing as the generated file), and nothing else changed. Read only.

### C. System repo, branch `components/button`

1. Design system page: replace "None is built yet" under Components with the current state (Button built, the other five planned). Nothing else on the page.
2. Button Figma script: update the component set in place instead of replacing it (decision 44): existing variants are updated by name, missing ones created, none deleted. Run it on the file and confirm the variant IDs stay the same between two runs.
3. Commit and push. **Don't merge.**

## Report

`REPORT.md` with the ID `B-009`: commits per repo, test results for A2, the Figma check for B1, the ID check for C2, the upload list. Questions numbered, if any. Push to `handoff` and stop.
