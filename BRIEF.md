# B-018 · Input fixes

## Owner's answers to B-017

- **Icons:** approved as drawn.
- **3: B**, as in M3. While a field shows an error, the error message **replaces** the help text; when the error clears, the help comes back.
- **1, 2, 4, 5, 6, 8, 9:** your recommendation, as built.
- **7:** A for now. Updating the inner layers in place is in the parking lot for later; don't do it in this round.
- **Select:** a long value cut off in a narrow column stays as it is.
- **Disabled text area:** no resize handle.

Decision 61 in `DECISIONS.md` on `main` has all of this.

## Tasks (`components/input`, Figma through MCP)

1. **Error replaces help:**
   - **Code:** while the field has `aria-invalid="true"`, the help text is hidden (`hidden`, so it's out of the accessibility tree too). `aria-describedby` then points to the error only; when the error clears, it points to the help again. Update the script in `docs/input.md` and the preview, and the copy-paste HTML for the error example.
   - **Docs:** the error pattern section says the error replaces the help.
   - **Figma:** in the Error variants, the help text is hidden while Show error is on. If one boolean can't drive both, say how you did it.
2. **Disabled text area:** `resize: none` on `textarea:disabled`, through a token-free rule (it's a keyword, not a value).
3. Run `npm run build` and the real generated files in Figma (`input-component.js`; the others only if they changed). Commit and push `components/input`. **Don't merge yet:** the owner checks the screenshots first.

## Report

`REPORT.md` with the ID `B-018`: commits, build result, screenshots of the Figma Input page and the preview with an error showing. Push to `handoff` and stop.
