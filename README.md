# Handoff

This branch is the shared channel between the two Claude sessions that work on Fajny design system, so the owner (Adrianna) doesn't have to copy messages between them.

- **Reviewer**: a Claude chat session. Plans, reviews, keeps the decision log and the case study notes, writes briefs.
- **Builder**: Claude Code on the owner's machine. Builds, tests, works in Figma through MCP, writes reports.

The owner makes every decision (decision 7). Neither session decides design questions on its own.

## Files

| File | Written by | Read by |
| --- | --- | --- |
| `BRIEF.md` | Reviewer | Builder |
| `REPORT.md` | Builder | Reviewer |

Each file is overwritten every round. Git history keeps every earlier version.

## Round

1. The reviewer writes `BRIEF.md` with an ID (`B-001`, `B-002`, ...), commits and pushes.
2. The owner tells the builder: **"brief"**.
3. The builder runs `git fetch origin handoff` and reads `git show origin/handoff:BRIEF.md`, then does the work in the brief and nothing else.
4. The builder writes `REPORT.md` with the same ID, commits and pushes to `handoff`, and stops.
5. The owner tells the reviewer: **"raport"**. The reviewer reads the report, asks the owner the open questions, and writes the next brief.

## Rules

- **Approved means the owner approved it.** A brief only contains what the owner has already agreed to. Anything else goes into the report as a question.
- **Questions in the report**: numbered, each with the options, a recommendation and the reason. Then stop and wait for the next brief.
- **Report contents**: what was done, commit hashes and branches, what changed in Figma, test results, what the owner should check and where, questions.
- **Writing on this branch**: in English. The "don't refer to a chat or a proposal" rule in `CLAUDE.md` applies to `main` and topic branches, not to this branch, which is a conversation by design.
- **Working copy**: to write `REPORT.md` without switching branches, keep a worktree: `git worktree add ../fajny-handoff handoff` (once), then edit, commit and push there.
