# B-011 · The Figma file as documentation

## Owner's decision

Decision 58 (`DECISIONS.md` on `main`, `2ba3632`): the Figma file is documentation, one page per topic, and **every new page follows the same pattern**. Also on the parking lot: the design system page in Claude will later be replaced by a read-only page of our own; no work on it now.

## Page layout (every page, now and later)

- **Every section has a title and a subtitle**: the title names the section (e.g. "Buttons"), the subtitle is one short sentence on what it is for, taken from the repo docs or token descriptions.
- **On a component page**, the section with every variant and state (what "Button check" shows today) has a **smaller title, "All components"**, with its own short subtitle, next to the main section with the component set.
- Titles and subtitles use the system's own text styles and colour roles. This layout is part of decision 58 and applies to every Figma page from now on.

## Tasks (system repo, on `components/button`, in the Figma file through MCP)

1. **Pages, in this order:** Colors, Typography, Spacing, Corner radius, Shadows, Button. Delete the working pages "Type check" and "Button check". No other pages.
2. **Token pages** (Colors, Typography, Spacing, Corner radius, Shadows): every token shown with its name, value and what it's for and where it's used, taken from the token descriptions in the repo (no text written for Figma only). Group the tokens as the README does.
   - **Colors:** the roles grouped (text, surfaces, lines and focus, actions, status), each swatch with its name, the primitive it points to and its purpose, shown on a light and a dark surface (the "Dark surface" mode), plus a short explanation of how surfaces switch the roles (from the README). The palette (primitives) in its own section, marked as not for direct use.
   - **Typography:** the current specimen (real portfolio text, Mobile and Desktop, light and dark), and next to each role what it's for, where it's used and its values (family, size range, line height, weight, letter spacing). Include the new `label` role.
   - **Spacing, Corner radius, Shadows:** a visual sample of each step (a bar, a rounded box, a shadowed card) with name, value and purpose.
3. **Component page (Button):** one page. On one side the component set; next to it every variant and state, light and dark (what "Button check" shows today). A short heading with what the component is for, from `docs/button.md`.
4. **Scripts:** every page is built by a repo script and rebuilt on each run, like the variables (decision 44). Keep one writer per page. The Button script keeps updating the component set in place (variant IDs unchanged); only the page around it is rebuilt.
5. **Rule for later:** add one line to the "Working rules" in `CLAUDE.md`: Figma pages follow decision 58. And update the README Figma section (pages and procedure).
6. Commit and push `components/button`. **Don't merge.**

## Report

`REPORT.md` with the ID `B-011`: commits, the page list as read back from Figma, the Button variant IDs before and after, and a screenshot of each page on this branch (`figma-colors.png`, `figma-typography.png`, `figma-spacing.png`, `figma-radius.png`, `figma-shadows.png`, `figma-button.png`). Questions numbered, if any. Push to `handoff` and stop.
