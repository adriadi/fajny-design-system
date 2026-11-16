# B-026 · Build Tag

Decisions from the B-025 audit (DECISIONS.md 69, 70). Build the component.

## Task 1: migrate `work-with-me.html` onto tokens first

It's the only page still on `test/before-2`, not `design-system/tokens`. Migrate it the same way the other pages were (palette, type, spacing, radius roles). This lets pattern 7 (the Curaay feature-card tags) get checked against real values before Tag ships. Commit it on its own.

## Task 2: build Tag

**Scope (decision 69):** Tag is a static label pill only. It covers:
- the hero status tag
- the project tag (dormant today — no project currently renders it, since `showText` is false whenever a project has an image — build it anyway, it's live CSS even with nothing on the page using it)
- the skill-level chip (dark surface)
- the Curaay feature-card tag (`work-with-me.html`, once migrated)

The skill filter and the "Clear" button are **not** Tag — leave them as they are; they're controls, not labels.

**No hover state (decision 69):** Tag never has a `:hover` rule — it isn't clickable. Fix the Medium badge too: it's a `<span>` with no destination that currently gets a `:hover` rule anyway. Remove that rule. (The Medium badge itself doesn't become a Tag instance — it's staying its own thing — just drop the misleading hover.)

**Dark-surface contrast fix (decision 70):** the skill-level chip's "core focus" state (`lvl-2` today) moves off the gold literal + translucent tint onto the `color-accent` role on a solid dark fill (should land close to 6.1:1 — check the real rendered contrast once built, the way B-024 did). Its dimmed "not selected" state uses the muted text role instead of `opacity: .6`, so it never drops under 4.5:1 — check that one too. `lvl-1` and `is-on` already use roles correctly; leave them as they are unless building Tag as one component naturally changes their markup.

**One size (decision 69):** pick one size for every Tag instance, including the dormant project-tag variant — don't build a second, smaller size for it. Propose the exact size/weight from the existing type scale (the audit found 10/11/12px and weights 400/500/600 in current use, none of them a named role); if nothing in the scale fits cleanly, propose a new small size and flag it in the report for review, with its contrast checked at that size.

**As always:** radius `radius-pill` (already true after migration), Figma page follows decision 58's pattern, neutral example texts (a label, a skill name, a status — not portfolio-specific wording in the component itself, though the live portfolio instances naturally show their real text), docs page (`docs/tag.md`), and update the preview.

## Report

`REPORT.md` with ID `B-026`: the migration commit, the build commit(s), the contrast numbers for the fixed dark chip (both its "on" and "dimmed" states) and for the chosen size, and a screenshot of each Tag context (light hero tag, dark skill chip in both states, the Curaay feature-card tag). No merge to `main` yet — stop after the report and push to `handoff`.
