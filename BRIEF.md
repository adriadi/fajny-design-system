# B-014 · Neutral texts

## Owner's answers to B-013

- **Typography specimen:** a lighter, friendlier tone than the B-013 proposal, still neutral product text. Use the texts in task 1 exactly.
- **Button labels, `docs/button.md` examples, token descriptions, README Specimen line, script comments:** accepted as proposed in B-013, plain and functional.
- **README "Why" section:** no change.
- **Button page subtitle:** "visitor" becomes "user".

## Tasks (system repo, `components/button`, Figma through MCP)

1. **Typography specimen** (`scripts/build-figma-type.js`, the Typography page):

   | Role | Text |
   | --- | --- |
   | display | Ship the thing. Then ship the next thing. |
   | title | Settings, but make them friendly |
   | heading | What your team did while you were at lunch |
   | subheading | Notifications: as loud or as quiet as you like |
   | card-title | Quarterly report: reviewed, approved and only slightly dramatic |
   | lead | Plan your projects, invite your team and keep every decision where you can find it again. Changes save themselves, so you don't have to. |
   | body | Every project gets its own people, files and settings. Invite someone by email, decide what they can touch, and take the keys back whenever you like. Nothing leaves the room until you say so. |
   | small | Last edited on 12 March 2026 by someone who definitely knew what they were doing. Every version stays for 90 days, just in case. |
   | overline | Account settings · Passwords, sign-ins and that old laptop you forgot about |
   | label | Continue |

   Check that each text wraps to at least two lines on the 390px frame wherever the B-013 proposal did, and that label stays on one line. If a text doesn't, don't change it: report it with the line count.
2. **Button labels:** Continue / Learn more / Read more / Contact / Loading…, in every place listed in the B-013 report (Figma set, `docs/button-preview.html` through its script, `docs/button.md`, the usage comment in `components/button.css`).
3. **`docs/button.md` examples:** every replacement in the B-013 report's table.
4. **Token descriptions:** the 10 replacements in the B-013 report's table, in the token JSON. Rebuild so the CSS comments and Figma descriptions follow.
5. **Other places:** the README Specimen line and the comment above the samples in `scripts/build-figma-type.js`, as in the B-013 report.
6. **Button page subtitle:** "A control that takes the user somewhere or does something." In the script, so it stays on reruns. If the same sentence is in `docs/button.md`, change it there too.
7. Search the system repo once more for any portfolio text left in an example (for example "Adrianna", "case stud", "CV", "portfolio", "Let's talk"). Leave the README "Why" section alone. List anything else you find in the report as a question; don't change it.
8. Run `npm run build` and the real generated files in Figma, as in B-013. Commit and push `components/button`. **Don't merge.**

## Report

`REPORT.md` with the ID `B-014`: commits, build result, the wrap check from task 1, the result of the search in task 7, and screenshots of the Typography page and the Button page. Push to `handoff` and stop.
