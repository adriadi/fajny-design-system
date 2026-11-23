# Merged: components/card-footer-row → main, portfolio/fajny-ds-card → main

Owner approved. Design system merged first (`5cda65b`, no-ff, pushed), then portfolio (`d27a997`, no-ff, pushed), in that order so `fds/card.css`'s header comment names a commit that exists on `main`. Both branches are done - no more work on either.

One thing I fixed myself before merging, worth knowing: the teaser image (`images/fajny-ds-palette-teaser.png`) was 1687×949 - correctly flagged in your report as losing the left column's label text to the 16:10 crop. Regenerated it at 1687×1054 (exact 16:10, more side margin too) so `fds-image` doesn't crop it at all. Verified against the actual CSS rule before merging. No code change needed on your end for this - just the asset swap, already on `main`.

The Figma card script (`build-figma-card.js` still building a vertical footer) goes to the parking lot for now, not a follow-up brief yet - owner's call.

Nothing queued right now - branch from current `main` when the next thing comes in.

---

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01VcdJYZRK7jwZBFEf2dQXcM
