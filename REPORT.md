# B-039 · Hero copy change

**Branch:** `portfolio/hero-copy` in the portfolio repo, one commit on top of `main` (`cbbfd33`), pushed. Not merged. It does not include the B-038 Highlight/Tag branch: the only file changed is `index.html`.

## Markup

```jsx
<h1 className="hero-h1 fade-up fade-up-2">
  Hi, I&apos;m <em>Adrianna</em> -<br />
  a product<br />
  designer who<br />
  builds with <em>AI.</em>
</h1>
<p className="hero-sub fade-up fade-up-3">
  Not the hype version - I use it daily to design, prototype and ship faster. Looking for a full-time team to do that with.
</p>
```

Text is exact, with "-" and no "—". `&apos;` is JSX for the apostrophe in "I'm". The `<strong>` in the sub is gone (the new copy has no phrase to stress), and so is the empty `<br />` that followed the old sub.

## Why four lines, not three

My first cut broke it as "Hi, I'm Adrianna -" / "a product designer" / "who builds with AI." At 1200px wide the hero's text column is about 713px, and "a product designer" doesn't fit, so it wrapped on its own and made an ugly five-line headline ("designer" alone, "AI." alone). Four short lines fit at every width I checked and keep "Adrianna" and "AI." emphasised. Dropping the "." after Adrianna (the old emphasis included it) is forced by the new sentence.

## Checks

- 1440px and 1200px: headline is 4 lines, none wraps; sub is 2 lines at its 540px max width; no horizontal overflow; no clash with the blobs (the blobs sit to the right of the text).
- Mobile (the browser tool floors the width at 500px): headline 4 lines, sub 2 lines, both buttons visible, hero height 647px with the buttons ending at 505px, nothing clipped by the hero's `overflow: hidden`. Page doesn't scroll sideways. I couldn't render a true 390px width here.
- The `fade-up` animations still run in order (tag, headline, sub, buttons).

## Flag: the sub and buttons sit lower on a short window

The headline is one line taller than before (4 lines against 3), so on a short desktop window the sub and the two buttons are pushed below the fold. In a 647px-high window, only the headline is visible at first; the sub and buttons appear after about 260px of scroll (`b039-2-hero-sub-actions.png`). On a taller window (around 900px) everything fits. The old hero already had the buttons at the very bottom edge in that same short window, so this is a small step worse, not a new problem. If it matters, the fix is a smaller `display` size or less space under the headline: both are design decisions, so I haven't touched them.

## Screenshots

`b039-1-hero-desktop-1440.png` (headline), `b039-2-hero-sub-actions.png` (sub and buttons, scrolled 260px), `b039-3-hero-mobile.png` (500px wide).
