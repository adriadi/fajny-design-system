# B-039 · Hero copy change (not a design-system component)

Not a Fajny component — a content fix. The owner got feedback that the homepage hero reads too robotic. On its own branch in the portfolio repo, not on `main`; stop after the report, merge is separate.

## What to change

In `index.html`, the hero (`hero-h1` and `hero-sub`, currently around line 627-636):

**Current:**
```
<h1 className="hero-h1 fade-up fade-up-2">
  Hi, I am <em>Adrianna.</em><br />
  I am empowering<br />
  Design with <em>AI.</em>
</h1>
<p className="hero-sub fade-up fade-up-3">
  Looking for my next <strong>full-time role in AI or data-heavy products.</strong><br />
</p>
```

**New text (exact, use "-" not "—" anywhere in it):**

- Headline: "Hi, I'm Adrianna - a product designer who builds with AI."
- Sub: "Not the trendy version - I use it daily to design, prototype and ship faster. Looking for a full-time team to do that with."

Keep the existing line-break/`<em>` pattern in spirit (short lines, "Adrianna" and "AI" emphasized in the headline) rather than one long unbroken line - your call on exactly where the `<br />`s land, since you can see it rendered. The sub is noticeably longer than the current one; the hero's `fade-up` animation and layout were sized for the shorter original, so check it still looks right (doesn't overflow, wrap awkwardly, or clash with the hero blobs) and flag it if it doesn't.

## Report

`REPORT.md` with ID `B-039`: branch name, the exact markup you landed on (so I can see the line breaks), and a screenshot of the hero with the new copy.
