# B-004 · Report

## Commit on `figma/modes` (pushed, not merged)

`9844140` "Rebuild the Figma Type check page from the typography script": `scripts/build-figma-type.js`, the generated `tokens/figma/typography-collection.js`, and one sentence in the README procedure (step 4 now says it rebuilds the page).

## What changed

- **The page is part of the typography script** (decision 44). Each run of `typography-collection.js` writes the collection and the text styles as before, then clears the "Type check" page and builds it again. Run on the Figma file: 0 variables and 0 styles created (all existed), page rebuilt.
- **Four frames:** `Mobile · Light surface` (390px) and `Desktop · Light surface` (1280px) on `color/background` in color mode "Light surface"; `Mobile · Dark surface` and `Desktop · Dark surface` on `color/surface-dark` in "Dark surface". Each frame also sets its typography mode.
- **Each role:** its name in the `overline` style and `color/text-muted`, then the sample in the role's style and `color/text`. In display, title and heading, the gold words are `color/text-emphasis`, upright (decisions 28 and 47). All fills are bound to the colour roles, so they switch with the mode: on the dark frames the text is sand, the label sand-400, the gold gold-500.
- **Build checks added:** the build fails if a role has no specimen text, if an emphasis word isn't in its text, or if emphasis is set on a role other than display, title and heading.

Read back from Figma: every sample wraps to at least two lines in both Mobile frames (display 3, title 3, heading 2, subheading 3, card-title 2, lead 4, body 4, small 3, overline 2), and every fill is bound to the expected role.

## Screenshot

[`type-check.png`](type-check.png) on this branch (from `get_screenshot`, 1528 × 2400). Top row: light surface, Mobile and Desktop. Bottom row: dark surface.

## Where each sample text came from

All from `adriadi/portfolio`, branch `main` (`f143a85`), read with `git show`; the local working tree (on `test/before-2`) wasn't touched.

| Role | Text | Source |
| --- | --- | --- |
| display | Hi, I am **Adrianna.** I am empowering Design with **AI.** | `index.html`, home hero h1 (gold words as on the site) |
| title | Hundreds of criminal patterns. None had a **paper trail.** | `usecases/hawk-case-study.html`, page title h1 |
| heading | Let's make something **good.** | `index.html`, contact section h2 (gold word as on the site) |
| subheading | The system had 247 patterns. Not one knew where it came from. | `usecases/hawk-case-study.html`, h3 |
| card-title | Can I ask this video a question? Yes, you can. | `index.html`, article card title |
| lead | Curaay is an AI-powered health platform that helps patients in Germany find and book doctors - fast, across both digitised and non-digitised clinics. | `usecases/curaay-case-study.html`, overview paragraph |
| body | The typologies existed. But ask where any of them came from - which institution published it, which document, which section - and the system went quiet. Analysts were on their own. | `usecases/hawk-case-study.html`, overview paragraph |
| small | Screen 2 · Typology Detail - the 4-level source chain is permanent, not hidden behind a tab. Every level links. The original PDF is one click away. | `usecases/hawk-case-study.html`, image caption |
| overline | Typologies in the library - each one now traceable to its exact institutional origin | `usecases/hawk-case-study.html`, metric label |

Two notes on the choices:
- **title:** on the site the gold part is "a paper trail." (three words). The brief allows one or two, so only "paper trail." is gold.
- **overline:** the site's real eyebrows ("Overview", "The core gap") are too short to wrap on Mobile, so the sample is the Hawk metric label, which uses the same label style on the site.

## What to check, and where

Figma, page **"Type check"**: line height per role (body at 170% against display at 105%), gold only in the first three roles, and the dark frames switching every colour.

## Questions

1. **Still open from B-003:** the design system page's generated token card (`project/api/tokens.md`, `project/tokens.css`) shows values from before the colour stage. Saving the page once should regenerate it; I recommend doing that before Figma part 2 is merged, and I'll read it back.
