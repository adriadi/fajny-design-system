# B-004 · Rebuild the "Type check" page as a real specimen

## Owner's review of B-003

The type tokens, the preview page and the Figma typography are fine. The "Type check" page isn't good enough to check against: each role shows only its own name on one line, so line height can't be seen (body's 170% looks the same as display's 105%), and the text is black instead of `color/text`.

## Tasks (on `figma/modes`)

1. **Rebuild the "Type check" page.** For each of the 9 roles:
   - a small label with the role name, in the `overline` style and `color/text-muted`,
   - below it, real text from the portfolio (`adriadi/portfolio`): for example the home hero for `display`, a case-study title for `title`, a section title for `heading`, a case-study paragraph for `body` and `lead`, a caption for `small`. Long enough to wrap to at least 2 lines in the Mobile frame. Note in the report which text came from where.
   - all text in `color/text`; in `display`, `title` and `heading`, one or two words in `color/text-emphasis` (gold), as on the site (decision 28). Upright, as decided (decision 47).
2. **Four frames instead of two:** Mobile and Desktop, each once on a light surface and once on a dark surface. Light frames: background `color/background`, color mode "Light surface". Dark frames: background `color/surface-dark`, color mode "Dark surface". Text colours come from the roles, so they switch with the mode.
3. **Make the page part of the typography script** (decision 44), so it's rebuilt after a token change instead of being a one-off call. Running it again replaces the page's content.
4. Commit and push `figma/modes`. **Don't merge.**

## Report

`REPORT.md` with the ID `B-004`: commits, where each sample text came from, and a screenshot of the page if `get_screenshot` works (attach it on the `handoff` branch, e.g. `type-check.png`, and link it in the report). Questions numbered, if any. Push to `handoff` and stop.
