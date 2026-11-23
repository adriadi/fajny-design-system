# B-051: 4th project card - "Coming soon" for the Fajny Design System case study

Decision 93. Own branch, already started: `portfolio/fajny-ds-card` (branched from current `main`, `b278475`). I've already pushed one commit to it adding the image asset - pull it before you start, don't branch fresh.

## 1. Add the 4th `PROJECTS` entry

In `index.html`, add a 4th object to the `PROJECTS` array (after the Hawk AI one):

```js
{
  tag: 'AI Workflow · Design Systems',
  title: '92 decisions, one design system: built with Claude Code and Figma MCP',
  desc: "A short field guide to building a mini design system with Claude Code and Figma MCP - decisions, trade-offs, and the handoff in between.",
  label: 'Fajny Design System · Coming soon',
  color: 'oklch(24% 0.08 258)',
  accent: 'oklch(36% 0.12 280)',
  image: 'images/fajny-ds-palette-teaser.png'
  // no `link` - this case study doesn't exist yet
}
```

(`color`/`accent` here just reuse the Curaay entry's navy values - pick whatever reads fine next to the other three if you think something else fits better, not a strong preference.)

The image file is already on this branch at `images/fajny-ds-palette-teaser.png` (1687×949) - don't generate or source a new one.

## 2. `ProjectCard`: handle a project with no `link`

Right now `ProjectCard` always renders the title wrapped in `<a className="fds-card__link" href={project.link}>` plus the hover badge (the arrow SVG in `fds-card__media`). For a project with no `link` (this new one, and any future "coming soon" entry), it should render:

- the title as plain text, no `<a>`, no `fds-card__link` class
- no badge/arrow SVG in the media area
- everything else identical (tag, desc, label, image, footer text)

This is the component's own documented behavior ("a card with an `fds-card__link` in its title is one link; the link's `::after` covers the whole card - a card without it has no hover"), so this is just `ProjectCard` conditionally omitting what it already has, not a new `fds-card` variant. Something like:

```jsx
function ProjectCard({ project }) {
  return (
    <article className="fds-card fds-card--image">
      <div className="fds-card__media">
        <img className="fds-image" src={project.image} alt="" width="1687" height="949" loading="lazy" decoding="async" />
        {project.link && (
          <span className="fds-card__badge" aria-hidden="true">...(arrow svg, unchanged)...</span>
        )}
      </div>
      <div className="fds-card__body">
        <span className="fds-tag">{project.tag}</span>
        <h3 className="fds-card__title">
          {project.link
            ? <a className="fds-card__link" href={project.link}>{project.title}</a>
            : project.title}
        </h3>
        <p className="fds-card__text">{project.desc}</p>
        <div className="fds-card__footer">
          <p className="fds-card__meta">{project.label}</p>
          {project.link && <span className="fds-card__more" aria-hidden="true">Read case study</span>}
        </div>
      </div>
    </article>);
}
```

Use your own judgment on exactly how you branch the JSX (ternary, early return, whatever's cleanest) - the only requirement is: no `<a>`/no `fds-card__link` class/no badge/no "Read case study" footer text when `project.link` is falsy, everything else the same as today.

## 3. While you're in here: fix the stale `width`/`height` on the card image

The `<img>` in `ProjectCard` has carried `width="1398" height="1050"` since B-042 - wrong then and still wrong, flagged in that report, never fixed. The three real images are hero images at their own native sizes (not 1398×1050), and the new teaser image is 1687×949. Since `fds-image`'s CSS does the actual 16:10 cropping via `aspect-ratio`/`object-fit` regardless of these attributes, their only job is giving the browser a layout hint to prevent reflow - so: either drop `width`/`height` entirely, or set them to something that at least matches the real aspect ratio of the new images (e.g. `width="1687" height="949"`, roughly the box the CSS will crop from for all four now, close enough as a layout hint). Your call on which - whatever's simplest and avoids relying on each image's exact native dimensions.

## 4. Grid side-effect, expected and accepted - no action needed

Going from 3 to 4 cards flips `.portfolio-grid` from the existing count-aware logic (decision 88) from "1 row of 3" to "2 rows of 2". That's already built and working as designed - nothing to do here, just flagging so a visual change in the grid on report isn't mistaken for a bug.

## When done

Report as usual. Screenshots: the new card (both its own close-up and the full grid at 2 rows x 2), at both desktop and mobile widths.

---

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01VcdJYZRK7jwZBFEf2dQXcM
