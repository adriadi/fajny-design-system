// The Input icons (decision 60): the warning icon of an error message and the show/hide icons of
// the password button. Simple stroke icons on a 24 grid, all with the same 1.5 stroke, drawn in
// currentColor and hidden from screen readers; the text next to them, or the button's label, carries
// the meaning. The preview and the Figma component use these strings, and the build fails if
// docs/input.md shows different ones.
const svg = (name, body) =>
  `<svg data-icon="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const ICONS = {
  // A triangle with an exclamation mark.
  warning: svg('warning', '<path d="M10.3 4.4 2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/>'),
  // An open eye: the password is hidden, the button shows it.
  show: svg('show', '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'),
  // The eye with a line through it: the password is shown, the button hides it.
  hide: svg('hide', '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/>'),
};
