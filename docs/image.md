# Image

A picture inside a component, always at one ratio, 16:10. It's nested in the Card with an image, and in every later component that shows a picture (decision 63). Stylesheet: `components/image.css` (link `tokens/css/tokens.css` first).

## The ratio

Every image in a component is 16:10, the shape of a laptop screen, so product screenshots fit without much cropping. The class sets it with `aspect-ratio`; the picture fills the frame with `object-fit: cover` and is centred, so the edges are cropped, never stretched or letterboxed. Keep what matters in the middle of the picture.

The image has no radius of its own. The component it sits in rounds it: the Card rounds the image's top corners with its own `radius-lg`.

## Export sizes

Export every image at twice the width of the widest it's shown, so it's sharp on 2× screens, and a lighter file for phones. Two categories: a picture in a Card, and a picture in a case study.

| Category | Size | Ratio | Pixels | Use |
| --- | --- | --- | --- | --- |
| Card | Desktop | 16:10 | 1600 × 1000 | The `src`: sharp on a 2× screen up to 800px wide, wider than a card gets in a two-column grid |
| Card | Mobile | 16:10 | 800 × 500 | In `srcset`, for phones and 1× screens: a card is about 360px wide at 390px |
| Case study | Desktop | 16:9 | 2400 × 1350 | The hero image: shown up to 1184px wide, so 2× is about 2400px |
| Case study | Mobile | 16:9 | 800 × 450 | In `srcset`, for phones: a case study image is about 360px wide at 390px |

Save as JPEG or WebP (photos and screenshots) at a quality that keeps text in screenshots crisp; keep each Card file under about 300 KB, and each Case study file under about 800 KB.

```html
<img class="fds-image"
     src="/images/project-1600.jpg"
     srcset="/images/project-800.jpg 800w, /images/project-1600.jpg 1600w"
     sizes="(max-width: 900px) 100vw, 50vw"
     width="1600" height="1000"
     alt="" loading="lazy" decoding="async">
```

Set `sizes` to the width the image is shown at in your layout.

## Case study images

A case study's pictures are content, not a frame: screens, whiteboards, flows. The three case studies of the portfolio show a mix of shapes (the audit behind this section): the three heroes are all 1687 × 949 (16:9), about half of the inline pictures are 16:9 too (1400 × 810 to 2220 × 1280), and the rest range from 1.9:1 to 1.25:1, with three portrait ones (0.85, 0.75 and 0.71). A fixed 16:10 crop would cut the portrait screens and the wide ones, so a case study picture is **not** cropped to the Image frame:

- the hero image is 16:9, exported at the Case study sizes above;
- an inline picture keeps its own ratio: export it at its natural shape, 1800px wide on desktop (shown up to 860px) and 800px wide for phones, and set `width` and `height` to the file's size, so the page keeps its space;
- it's shown at the full width of the column, with `height: auto`, never cropped.

The Image component and its 16:10 frame are for components that crop, such as the Card.

## Alt text

- **Empty (`alt=""`)** when the image only illustrates what the text next to it already says, e.g. a card's picture of the project the title names. Screen readers skip it; the title is enough.
- **A description** when the picture adds information the text doesn't: a chart's result, what a screen shows. Say what someone would miss without it, in one sentence, without "Image of".
- **Never text in the picture.** Every word goes in the HTML next to the image: screen readers can't read text in a picture, and it doesn't zoom or reflow.

## Loading

- `loading="lazy"` and `decoding="async"` on every image below the first screen.
- Always set `width` and `height` (the export size): the browser keeps the 16:10 space before the picture arrives, so nothing jumps.
- While the picture loads, or if it fails, the frame shows a light sweep across `color-surface-subtle` (a shimmer, decision 67). The picture covers it once it has loaded. Under reduced motion there's no sweep, only the flat tint.

## Do and don't

- **Do** export at 16:10 and at the sizes above.
- **Do** keep the important part of the picture in the middle; the edges may be cropped.
- **Don't** put text, a headline or a logo with words into the picture.
- **Don't** give the image a ratio, a radius or a border of its own; the component sets them.
