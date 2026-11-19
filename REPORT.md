# B-042 · Project card images: swap to the clean hero images

**Branch:** `portfolio/sync-button-input-card` (the same branch as B-041), one more commit `4e0177e`. Pushed, not merged.

## Swapped paths

In the `PROJECTS` array of `index.html`:

- Curaay: `images/Curaay_case_landing.jpg` → `images/Hero image-curaay.jpg`
- Scouting: `images/Scouting_case_landing.jpg` → `images/Hero image.jpg`
- Hawk: `images/Hawk_case_landing.jpg` → `images/hawk-typology-library-overview.jpg`

## Nothing else changed

The commit is 3 lines in 1 file (the three `image:` values). No CSS change, no new files. The `alt` is already empty on the card image (it's decorative: the title link beside it names the card), so there was no alt text describing the old slide to update.

## Check in the browser

- All three images load (1687×949 each, native 16:9) and render at 1.60 (16:10) with `object-fit: cover`.
- Nothing important is clipped: the four Curaay phones and the four Scouting phones are whole; the three stacked Hawk screens are whole with margin on both sides. The only crop is a little empty background at the left and right.
- The text that used to be baked into the old images is gone, so the title and description below no longer repeat what's in the picture.

Screenshots: `b042-1-project-grid.png` (Curaay and Scouting cards; the cookie banner is covering part of the text in this frame because I hadn't dismissed it), `b042-2-hawk-card.png` (the Hawk card, with the banner hidden).

## One small thing

The `<img>` in `ProjectCard` still carries `width="1398" height="1050"` (the old images' size). It's harmless, since `fds-image` fixes the 16:10 ratio itself, but the numbers no longer describe the files. I left them as the brief said nothing else changes; say if you want them updated to 1687 × 949.
