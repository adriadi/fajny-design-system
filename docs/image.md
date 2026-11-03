# Image

A picture inside a component, always at one ratio, 16:10. It's nested in the Card with an image, and in every later component that shows a picture (decision 63). Stylesheet: `components/image.css` (link `tokens/css/tokens.css` first).

## The ratio

Every image in a component is 16:10, the shape of a laptop screen, so product screenshots fit without much cropping. The class sets it with `aspect-ratio`; the picture fills the frame with `object-fit: cover` and is centred, so the edges are cropped, never stretched or letterboxed. Keep what matters in the middle of the picture.

The image has no radius of its own. The component it sits in rounds it: the Card rounds the image's top corners with its own `radius-lg`.

## Export sizes

Export every image for a component at 16:10, twice as wide as the widest it's shown, so it's sharp on 2× screens.

| Export | Pixels | Use |
| --- | --- | --- |
| Large | 1600 × 1000 | The `src`: sharp on a 2× screen up to 800px wide, wider than a card gets in a two-column grid |
| Small | 800 × 500 | In `srcset`, for 1× screens and phones |

Save as JPEG or WebP (photos and screenshots) at a quality that keeps text in screenshots crisp; keep each file under about 300 KB.

```html
<img class="fds-image"
     src="/images/project-1600.jpg"
     srcset="/images/project-800.jpg 800w, /images/project-1600.jpg 1600w"
     sizes="(max-width: 900px) 100vw, 50vw"
     width="1600" height="1000"
     alt="" loading="lazy" decoding="async">
```

Set `sizes` to the width the image is shown at in your layout.

## Alt text

- **Empty (`alt=""`)** when the image only illustrates what the text next to it already says, e.g. a card's picture of the project the title names. Screen readers skip it; the title is enough.
- **A description** when the picture adds information the text doesn't: a chart's result, what a screen shows. Say what someone would miss without it, in one sentence, without "Image of".
- **Never text in the picture.** Every word goes in the HTML next to the image: screen readers can't read text in a picture, and it doesn't zoom or reflow.

## Loading

- `loading="lazy"` and `decoding="async"` on every image below the first screen.
- Always set `width` and `height` (the export size): the browser keeps the 16:10 space before the picture arrives, so nothing jumps.
- While the picture loads, or if it doesn't, the frame shows `color-surface-subtle`.

## Do and don't

- **Do** export at 16:10 and at the sizes above.
- **Do** keep the important part of the picture in the middle; the edges may be cropped.
- **Don't** put text, a headline or a logo with words into the picture.
- **Don't** give the image a ratio, a radius or a border of its own; the component sets them.
