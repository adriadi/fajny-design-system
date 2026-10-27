# B-001 · Set up the handoff, then propose the Figma typography plan

## Context

From now on, briefs and reports go through this branch instead of being pasted by the owner. Read `README.md` on this branch once: it describes the round.

State as the reviewer sees it on `origin/figma/modes` (`24a528f`): the color collection has "Light surface" and "Dark surface" modes, the re-import test passed with no differences, empty collections are deleted by the color script, and `DECISIONS.md` has 45 decisions. Nothing is merged. `figma/modes` stays open until typography is done; Figma part 2 is checked and merged as one stage.

## Tasks

1. **Handoff setup.** Create the worktree for this branch (see `README.md`) and pull `main` so `CLAUDE.md` has the new "Handoff" section. Nothing else to change.
2. **Typography plan, proposal only.** Write nothing to Figma and no code yet. Propose, in `REPORT.md`:
   - a collection `typography` owned by the repo script (decision 45), modes "Mobile" (390px) and "Desktop" (1280px), values from the type token sources (the min and max of each `clamp()`),
   - which properties become variables (font size, line height, letter spacing?) and how Figma stores line height and letter spacing in variables (units, percent or px, what a unitless line height like 1.7 becomes),
   - 9 text styles, one per role, bound to those variables, with Syne and Inter as in the tokens; whether the fonts are available to the Figma file,
   - what can't be bound in Figma and how you'd handle it,
   - how the script stays repeatable after a token change (decision 44), and which build check would catch a role without a style.

## Report

Write `REPORT.md` with the ID `B-001`: confirm task 1, then the plan with numbered questions, each with options, your recommendation and the reason. Commit, push to `handoff`, and stop.
