# B-018 · Report

## Commits and build

- `components/input`: **`05e3cb7`** "Input: the error replaces the help text; no resize on a disabled text area (decision 61)", pushed (`f256b70..05e3cb7`). Not merged.
- `npm run build`: exit 0, all 13 steps pass. Only `tokens/figma/input-component.js` changed among the Figma files.

## 1. The error replaces the help

**Code (script in `docs/input.md`, run by the preview):**
- While a field is invalid, its help text gets `hidden`, so screen readers skip it too.
- `aria-describedby` points to the error alone.
- When the error clears, the help shows again and `aria-describedby` points back to it.
- A field without an error element keeps its help.
- Tested in the preview:
  - wrong email → `aria-describedby="email-error"`, help hidden;
  - fixed → `aria-describedby="email-help"`, help showing, error hidden;
  - on submit every invalid field shows its error alone.

**Docs:**
- The Parts table says the help is hidden while the field shows an error.
- The linking paragraph says `aria-describedby` lists only the text that shows.
- The States row for Error says the message shows in place of the help.
- The Errors section has a new point, "In place of the help".
- The copy-paste error example now has `aria-describedby="email-2-error"` and its help with `hidden`.

**Preview:** the Error column hides the help and points `aria-describedby` to the error.

**Figma:**
- In the 4 Error variants, the help layer is hidden. Its text stays linked to the Help property.
- **Why it isn't one switch:** a boolean property can only set a layer's visibility to its own value, never the opposite, so Show error can't also hide the help. So in the Error variants the help layer isn't linked to Show help; Show help still works in the other 16 variants.
- **In practice:** to see a field's help, use any state but Error. In an Error instance, turning Show error off leaves no text below the field.
- **Run:** I ran the real `input-component.js` once. All 20 variants were updated in place with the same IDs (set `96:161`), and none were created.
- **Read back:** each Error variant has `help` hidden and linked to the Help text only, and `error` linked to Show error.

## 2. Disabled text area

`textarea.fds-input:disabled { resize: none; }`: a keyword, so the token check passes. In the preview, the disabled text area computes `resize: none` and shows no handle; the enabled one keeps `vertical`.

## Screenshots

- `figma-input.png`: the Figma Input page. In the Error column, the error message replaces the help in the set and in Variants.
- `input-preview.png`: the preview after pressing Continue with empty and wrong fields. Each invalid field shows only its error. The optional message and the disabled field keep their help. In the table below, the disabled text area has no handle.

No questions.
