# B-042 · Project card images: swap to the existing clean hero images

Decision 87, resolving B-041's open question 1. Same branch as B-041 (`portfolio/sync-button-input-card`), not merged — add this as another commit there, don't start a new branch.

## What to do

In the `PROJECTS` array in `index.html`, change each project's `image` path:

- Curaay: `images/Curaay_case_landing.jpg` → `images/Hero image-curaay.jpg`
- Scouting: `images/Scouting_case_landing.jpg` → `images/Hero image.jpg`
- Hawk: `images/Hawk_case_landing.jpg` → `images/hawk-typology-library-overview.jpg`

Nothing else changes — `fds-image`'s own `aspect-ratio: 16/10; object-fit: cover; object-position: center` crops each of these (native 16:9) on its own; no new files, no CSS changes. Update each `alt` text if it was describing the old landing-slide image specifically (check what's there now); otherwise leave it.

Check the three project cards render with these images (not clipping anything important — a person's face, UI chrome — since `object-fit: cover` crops the sides).

## Report

`REPORT.md` with ID `B-042`: confirmation of the three swapped paths, confirmation nothing else changed, and a screenshot of the project grid with the new images.
