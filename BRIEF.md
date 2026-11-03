# B-020 · Card: audit and proposal

## Owner's decision

The next component is **Card**. This round is an audit and a proposal only, the same way Input started. **Don't build anything, don't change tokens, don't touch Figma.** The system is neutral (B-013): the portfolio is its first user, so the proposal describes a card for any product, with the portfolio's cards as the evidence.

Starting points already decided:
- **Decision 6:** two variants, **text only** (like the portfolio's article card) and **with an image**. Every state, contrast checked, docs, Figma and code.
- **Decision 14:** the card with a thumbnail doesn't exist anywhere in the portfolio code, so in the "before" test the agent had nothing to copy and built a hybrid card (a fail in both runs). This is the case for the image variant.
- **Decision 39:** every card uses `radius-lg` 16px, with or without an image.
- **Decision 40:** shadows show on interaction, not at rest: `shadow-sm` hover on small text cards, `shadow-md` hover on text cards, `shadow-lg` hover on image cards.
- **Decision 33:** components use the base colour roles only; a dark surface switches them.
- **Decisions 17 and 37:** the text roles, `card-title` for card titles.
- **Decisions 51 and 56:** Button exists, if a card has an action.
- **Decision 58:** the Figma page pattern.
- **Parking lot:** "Redesign the project cards". Note what the audit says about it, but don't propose the portfolio's redesign: that's a separate task.

## Tasks

1. **Audit:**
   - Every card in the portfolio (`adriadi/portfolio`, `main`): article cards, project cards, case-study cards, metric or market cards, the next-project block, anything that's a card.
   - For each one record:
     - the markup and its heading level;
     - what's clickable (the whole card, a link inside, a button), and how a keyboard and a screen reader reach it;
     - image, ratio and alt text;
     - padding, radius, background, border, shadow at rest and on hover;
     - the text roles, hover and focus styles, motion.
   - Also list what the agent built for the card in the "before" runs (tag `before-system`, branches `test/before-*`).
   - Don't open password-protected case studies unless you need to. Screenshots stay local, and don't put the password anywhere.
2. **Proposal** for Card, with a recommendation and the reason for each point:
   - **Anatomy of each variant:**
     - **Text only:** overline, title, text, meta, action. Say which parts are optional.
     - **With an image:** where the image sits, the ratio or ratios, how the image is cropped.
   - **Interaction:**
     - Is the whole card a link? If so, how: the stretched-link pattern (one `<a>` on the title, its `::after` covering the card) or a wrapping `<a>`. Say what each means for screen readers, for text selection and for a second link or button inside the card.
     - Is there also a non-clickable card?
   - **States:** default, hover, focus (focus ring on the whole card or on the link), active. Use the decision 40 shadows; say if a lift or other motion is proposed, and how reduced motion handles it.
   - **Surfaces:** a card on the page background, on `color-surface-subtle` and on a dark surface. Its fill and border on each, and whether it needs a border to be seen (WCAG 1.4.11 applies only if the card's edge is the only sign of an interactive area). Contrast for every text and border pair on each surface.
   - **Image rules:** `alt` (decorative or meaningful), lazy loading, what happens without an image.
   - **Sizes:** padding and gaps from the spacing tokens, how the card behaves in a grid and at 390px.
   - **Class names:** following `fds-button` and `fds-input` (`fds-card`, modifiers, element classes).
   - **How it differs from the portfolio's cards today**, as a table.
3. List anything decisions don't settle as numbered questions, each with options, a recommendation and the reason. If something needs a visual choice (for example the image ratio or the layout of the image variant), add a small sketch, as you did for the Input styles.

## Report

`REPORT.md` with the ID `B-020`: the audit as a table, the proposal, the questions. No commits on any branch other than `handoff`. Push to `handoff` and stop.
