# B-010 · Report

## Merge

- `design-system/tokens` merged into `main` of `adriadi/portfolio`: merge commit **`043b6cc`** ("Merge design-system/tokens: the site uses the Fajny design system tokens"), made with `--no-ff` so the update shows as one merge in the history. Pushed: `main` on GitHub went from `f143a85` to `043b6cc`. No history rewritten.
- `before-system` is still at `f143a85`. The `test/*` branches and your `~/portfolio` checkout (`test/before-2`) are untouched. Nothing changed in the system repo, nothing deployed.

## `main` on GitHub vs the upload list

`main` and `design-system/tokens` have the same files (empty diff). Each file on the list, on GitHub `main`, is byte-identical to the copy in `~/portfolio-tokens` (the same git blob):

| File (relative to the site root) | Blob on `main` | Local copy |
| --- | --- | --- |
| `index.html` | `8155b54` | same |
| `styles.css` | `0d03217` | same |
| `tokens.css` (new) | `2aa235c` | same |
| `password.html` | `149d378` | same |
| `js/loader.js` | `bb7ea39` | same |
| `usecases/hawk-case-study.html` | `46d6310` | same |
| `usecases/curaay-case-study.html` | `777ab17` | same |
| `usecases/scouting-notes-case-study.html` | `e5292bb` | same |

These eight files are everything that changed on `main` since `before-system`, plus `scripts/sync-tokens.sh`, which stays off the server.

## Upload list

Upload these from `~/portfolio-tokens` (or from a fresh pull of `main`), keeping their paths:

```
index.html
styles.css
tokens.css            (new)
password.html
js/loader.js
usecases/hawk-case-study.html
usecases/curaay-case-study.html
usecases/scouting-notes-case-study.html
```

No questions.
