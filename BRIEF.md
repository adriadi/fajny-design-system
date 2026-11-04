# B-022 · Card: hover badge, secondary-card prototypes, Image sizing

## Owner's answers to B-021 and the new additions

Decisions 65, 66 and 67 in `DECISIONS.md` on `main` (`git pull`). In short:

- **B-021 questions 3, 5, 6, 7:** keep everything exactly as built. No code changes from these.
- **New: a gold hover badge** on linked image cards (decision 65).
- **New: `.fds-card--dark` becomes a "secondary" style**, meant mainly for a dark surface (e.g. the Experience section), not a literal dark re-colouring of the default card. Build **two visual treatments** for the owner to compare from a screenshot; don't pick for her.
- **New: Image gets two documented size categories**, Card and Case study, each desktop and mobile. The Case study numbers need a quick audit first.
- **New: Image's loading/error state animates** (decision 67).

## Tasks (`components/card`, Figma through MCP)

### 1. Gold hover badge (decision 65)

- A 40px circle, gold fill (`color-focus` or the same gold primitive Button's dark-surface primary uses — pick the one already in the palette, don't add a new one), positioned at the bottom-right corner of the image, slightly overlapping it.
- A new arrow icon (↗, "opens" direction), navy, in the same stroke style as the Input icons (1.5 stroke, `currentColor`-equivalent navy fill-on-gold here since it sits on a solid gold circle, not transparent).
- Shown only on: cards with an image **and** that are links. Not on text-only cards, not on non-linked cards, not on the dark/secondary card (unless it also has an image — same rule applies).
- On hover: fades and scales in, timed with the existing lift/shadow transition.
- Reduced motion: still appears on hover, but without the fade/scale transition (snaps in, same as the shadow already does).
- `aria-hidden="true"`.
- Add it to the Figma Card component (the image-card, linked, hover/focus/active variants) and to the preview.

### 2. Secondary card: two prototypes (decision 66's "dark" naming, concept revised)

Don't change the class name (`fds-card--dark` stays) unless you have a strong reason to flag otherwise in the report. Update the docs' framing: this variant is described as a quieter, secondary style, meant for a dark surface rather than a literal "dark version of the default card".

Build **both** of these for `.fds-card--dark` and show them side by side in the preview, inside `.fds-surface-dark`, in a context like the Experience section (several cards in a row):

- **A — flat translucent fill:** background a low-opacity light tint over the dark surface (try `color-surface` or white at roughly 6–8% opacity — pick a value that reads clearly but stays subtle), with a border using an existing on-dark border role for definition.
- **B — diagonal gradient:** the same idea, but the tint fades from slightly more visible (one corner) to fully transparent (the opposite corner or edge), for a soft sheen.

In both: text keeps the existing dark-surface roles (title, muted text) unchanged, since the tint barely shifts the effective background and contrast should hold without recalculating. Confirm the contrast still passes in the report regardless.

**Scope:** dark surfaces only for now. Don't build or propose a light-surface version of this treatment in this round.

Update the Figma Card page: both treatments as separate frames or clearly labelled variants in the Variants section (not replacing the shipped component yet — this is for comparison), plus the component set itself can use whichever you think is the stronger default, labelled as "proposed."

### 3. Image sizing: Card and Case study (decision 2 from this round)

1. **Audit:** look at the images actually used across the three case studies in `adriadi/portfolio` (`main`): their pixel dimensions, aspect ratios, and how they're used (hero/header image, inline content image, gallery, before/after, etc.). A short table in the report is enough — this doesn't need the full audit format used for component rounds.
2. **Propose**, with reasoning:
   - Does "Case study" need its own aspect ratio, or can it reuse 16:10 at a larger size? Base this on what the audit actually shows.
   - Desktop and mobile pixel sizes for the "Case study" category, following the same logic as Card's (sharp at 2× up to the widest the image is shown, a lighter mobile version).
3. **Build it as a proposal, not a question to wait on:** add a second labelled section to `docs/image.md` ("Card" and "Case study", each with its ratio if they differ, and desktop/mobile sizes) and mirror it on the Figma Image page, the same pattern as the existing Export sizes table. If the owner wants different numbers, that's a quick follow-up edit, not a rebuild.
4. If the case-study ratio turns out to differ from 16:10, don't build a new Image component variant yet — flag it clearly as a question in the report instead, with your recommendation, since a second ratio is a bigger structural change than a documentation addition.

### 4. Image loading/error animation (decision 67)

- Replace the flat `color-surface-subtle` placeholder with a gradient that sweeps across it in a loop (a "shimmer"), while the image is loading or has failed.
- Under `prefers-reduced-motion: reduce`, no sweep: just the flat `color-surface-subtle` tint, as it was before.
- Keep it to tokens only, as the component check requires.

### 5. Build and ship

Run `npm run build` and the real generated Figma files. Commit and push `components/card`. **Don't merge.**

## Report

`REPORT.md` with the ID `B-022`. It needs:
- commits and the build result;
- the badge, described and screenshotted on hover;
- both secondary-card treatments (A and B), screenshotted side by side on the dark surface, with their contrast numbers;
- the case-study image audit table, the sizing proposal, and the question about ratio if it comes up;
- the shimmer, described (screenshots can't show animation — say how to see it in the preview, e.g. throttling the network or a built-in delay);
- what the owner should check and where;
- any other questions.

Push to `handoff` and stop.
