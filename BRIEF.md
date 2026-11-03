# B-016 · Input: audit and proposal

## Owner's decision

The next component is **Input** (decision 6 scope). This round is an audit and a proposal only, the same way Button started. **Don't build anything, don't change tokens, don't touch Figma.**

**Added by the owner:** she doesn't want the inputs as they look in the portfolio today. She wants a **standard input, like the Material 3 text fields**, not only an underline at the bottom. The audit records the current fields as the "before" state only; the proposal doesn't copy their look. Report how the proposal differs from the current fields.

M3 has two text field styles, and there's a third common pattern. Compare all three in the proposal (with a small sketch or a description of each state), say what each means for accessibility and for an agent using the system, and recommend one. The owner decides:
- **M3 outlined:** a full border on all four sides; the label sits inside the field and moves up into a gap in the top border when the field has focus or a value.
- **M3 filled:** a tinted background with an indicator line at the bottom; the label inside the field moves up the same way.
- **Outlined with the label above:** a full border on all four sides, the label always above the field, outside it.

Help or error text goes below the field in all three (M3 calls it supporting text).

Starting points already decided:
- Decision 11: the portfolio's labels aren't linked to their inputs, placeholder contrast is 1.24:1, error text 3.13:1.
- Decision 27: `color-border-input` for form field borders (3:1, WCAG 1.4.11), `color-error`, `color-success`. `color-border` is for decorative dividers only.
- Decision 56: Input shares the 1.5px `border-width.control` with the secondary button and the pause control.
- Decision 33: components use the base roles only; a dark surface switches them.
- Decision 51/53: disabled uses `opacity.disabled` 0.6 plus `aria-disabled`, so the reason can still be read out. Input should follow the Button pattern unless there's a reason not to (say so if there is).

## Tasks

1. **Audit** every form field in the portfolio (`adriadi/portfolio`, `main`): the contact form, the password page, anything else with a field. For each one: element type, label and how it's linked, placeholder, help or error text, border, radius, height, padding, font role, focus style, every state it has. Also list what the agent built for the form in the "before" test runs (portfolio repo, tag `before-system` and the `test/before-*` branches). Screenshots stay local if a page is password-protected; don't put the password anywhere.
2. **Proposal** for Input, with a recommendation and the reason for each point:
   - **Parts:** label (always visible), the field, optional help text, error text. How each is linked (`for`/`id`, `aria-describedby`, `aria-invalid`).
   - **Types in scope:** which of text, email, textarea, select, checkbox the portfolio actually uses, and which the system should cover now. Fewer is fine; say what each one costs.
   - **States:** default, hover, focus, filled, error, disabled, and read-only if needed. What changes in each (border, background, text), with the token for each value.
   - **Sizes and shape:** height, padding, radius, text roles for label, value, placeholder, help and error. Existing tokens first; if a new token is needed, propose its name and value.
   - **Contrast:** every text and border pair on a light and a dark surface, with the ratio, against WCAG (4.5:1 text, 3:1 borders and focus).
   - **Error pattern:** where the message goes, what it says, whether there's an icon (colour must not be the only sign, WCAG 1.4.1).
   - **Class names:** following `fds-button` (`fds-input`, modifiers).
3. List anything you can't decide from the decisions above as numbered questions, each with options, a recommendation and the reason.

## Report

`REPORT.md` with the ID `B-016`: the audit as a table, the proposal, the questions. No commits on any branch other than `handoff`. Push to `handoff` and stop.
