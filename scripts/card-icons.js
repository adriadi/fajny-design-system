// The Card and Image icons (decisions 65, 66): the arrow of the card's hover badge and the picture icon
// of the Image placeholder in Figma. Stroke icons on a 24 grid with the same 1.5 stroke as the Input
// icons, drawn in currentColor and hidden from screen readers. The preview, the docs and the Figma
// components use these strings, and the build fails if docs/card.md shows a different arrow.
const svg = (name, body) =>
  `<svg data-icon="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const ICONS = {
  // An arrow pointing up and to the right: the card opens something.
  arrow: svg('arrow', '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>'),
  // A picture frame with a hill and a sun: the Image placeholder.
  image: svg('image', '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5-8 8.5"/>'),
};
