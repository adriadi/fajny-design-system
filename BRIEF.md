# B-012 · Figma documentation: fixes and page groups

## Owner's review of B-011

The six pages are the right structure. Changes below. Decision 58 in `DECISIONS.md` on `main` (`git pull`) now also covers the page groups and clipping.

## Tasks (system repo, `components/button`, Figma through MCP)

1. **Run the real scripts.** Run exactly the generated files from the repo (`tokens/figma/*.js`), not shortened copies, so what's in the repo is what was tested (decision 44). If something prevents that (e.g. a size limit in `use_figma`), stop and report what exactly, with a proposal; don't run a copy instead.
2. **No "Clip content".** Turn off clipping on every frame and section the scripts create, on every page, so shadows, focus rings and components are never cut off. Make it part of the scripts.
3. **Button page:** keep the component set laid out as it was (the grid is fine). Give the main section its own title and one-sentence subtitle (e.g. "Component set", text from `docs/button.md`), like every other section. Put the section with every variant and state **below** the component set, so the whole page reads top to bottom in one column. Rename that section from "All components" to **"Variants"** (smaller title, as now, with its subtitle). Every future component page follows the same order: component set, then "Variants" below it.
4. **Typography specimen subtitle:** move the sentence into the README Typography section and have the script read it from there (B-011, question 1: B). Every text on every Figma page comes from a repo document.
5. **Page groups with separators.** Pages are grouped:
   - **Basic:** the token pages: Colors, Typography, Spacing, Corner radius, Shadows.
   - **Regular:** Button and other simple components.
   - **Advanced:** components that nest other components.

   Between groups there's a separator page named exactly `---` (Figma shows it as a divider). The owner added one by hand after Shadows: make the scripts own the page order and the separators, so the next run keeps them instead of deleting them. Add the separator before Advanced only once an Advanced page exists. Which group each future component goes to is decided by the owner when it's built; Button is Regular.
6. Update the README Figma section (page groups, separators, no clipping). Commit and push `components/button`. **Don't merge.**

## Report

`REPORT.md` with the ID `B-012`: commits, the page list as read back from Figma (separators included), confirmation that the real generated files ran, the Button variant IDs (unchanged), and new screenshots of the Button page and any page whose layout changed. Questions numbered, if any. Push to `handoff` and stop.
