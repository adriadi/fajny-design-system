# Fajny design system

*"Fajny" is Polish for "cool".*

A small design system built so that AI agents (Claude Code and others) can build interfaces from it without guessing names, values or states.

**Status: work in progress.** Started 19 October 2026, first version planned for 5 November 2026.

## Why

I gave an AI agent the same task twice in my portfolio's codebase, without a system. Both times it built a working page in about three minutes. Both times it invented a new error colour, copied the one square button on a site of pill-shaped buttons, and glued two different cards into a hybrid. The page looked fine. The code underneath didn't: between 2.5 and 6 hard-coded values for every design variable it used.

Fixing the result fixed the look, not the code. This system is the experiment to change that.

## What's here

| Folder | What goes in it |
| --- | --- |
| `tokens/` | Design tokens (W3C format) and the CSS variables built from them |
| `components/` | Button, Input, Card, Tag, Navigation, Highlight |
| `docs/` | One page per component: when to use it, when not, states, do and don't |

The full reasoning behind every choice is in [DECISIONS.md](DECISIONS.md).

## License

MIT
