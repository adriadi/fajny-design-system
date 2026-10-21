# Fajny design system

Tokens: W3C JSON in `tokens/*.json`, built with Style Dictionary into
`tokens/css/tokens.css` (`npm run build`).

## Design decisions

- Don't make design decisions on your own: no new values, names, sizes or
  scales. Propose them with the reason and wait for the owner's answer.
- Add a token only when something on the site needs it now, never in case
  it might be needed later.
- If no token fits, the system is missing a role: say so. Never use a hex
  value or a primitive instead.

## Colour rules (decision 33)

- Accessibility comes first. Every text role must pass WCAG on every surface
  it can appear on.
- Components use only the base semantic roles (`--fds-color-text`, ...).
  Surfaces switch them: a dark surface redefines the roles for everything
  inside it. Never reference the -on-dark tokens in a component.
- `npm run build` fails when a contrast pair drops below the minimum. Fix the
  colour, never the check.

## Writing in the repo

- Everything written into the repo stands on its own: token descriptions, code
  comments, docs, commit messages. Never refer to a chat, a proposal, a review
  or anything said outside the repo ("pending rename", "see the proposal",
  "as agreed"). Describe what the thing is and what it's for.
- Everything is in English.

## Working rules

- `DECISIONS.md` is maintained by the owner. Don't edit it. Reference
  decisions by number.
- One branch per topic: colour work on `tokens/colors`, typography work on
  `tokens/typography`.
- A topic is finished only after the owner checks it on the design system page.
  Then the branch merges into main (decision 32).
- The owner approves every commit and merge (decision 7). Don't rewrite history.
