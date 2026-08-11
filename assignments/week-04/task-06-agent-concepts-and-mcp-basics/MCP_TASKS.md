# MCP Tasks

This document records the three MCP-powered tasks completed using the **Filesystem MCP Server** through **OpenCode CLI**. Each task exercised the `tools/list` discovery flow and `tools/call` execution. See [MCP_SETUP.md](MCP_SETUP.md) for the setup and [EXPLAINER.md](EXPLAINER.md) for the concepts.

## Task 1 — List Markdown Files

Prompt

```text
Read all files in the current project directory and list every Markdown (.md) file.
```

Result

The MCP server listed all 5 Markdown files in the workspace:

- `README.md`
- `EXPLAINER.md`
- `MCP_SETUP.md`
- `MCP_TASKS.md`
- `EVIDENCE.md`

Tools used: `search_files`

Screenshot: [01-list-md-files.PNG](screenshots/01-list-md-files.PNG)

---

## Task 2 — Summarize README.md

Prompt

```text
Open README.md and summarize its contents.
```

Result

The MCP server read the README file and generated a summary of the assignment overview, objectives, tools, repository structure, and deliverables.

Tools used: `read_text_file`

Screenshot: [02-read-readme.PNG](screenshots/02-read-readme.PNG)

---

## Task 3 — Count Markdown Files

Prompt

```text
Count all Markdown files in this project and report the total.
```

Result

The MCP server analyzed the workspace and reported a total of 5 Markdown files.

Tools used: `search_files`

Screenshot: [04-count-md-files.PNG](screenshots/04-count-md-files.PNG)

## Additional Screenshots

- [03-read-explainer.PNG](screenshots/03-read-explainer.PNG) — opened EXPLAINER.md through the MCP server
- [05-list-folders.PNG](screenshots/05-list-folders.PNG) — listed top-level folders and files
