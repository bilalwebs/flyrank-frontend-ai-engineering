# Task 06 – Agent Concepts and MCP Basics

## Table of Contents

- [Overview](#overview)
- [Key Concepts](#key-concepts)
- [Learning Objectives](#learning-objectives)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [The Three MCP Tasks](#the-three-mcp-tasks)
- [Documentation](#documentation)
- [Deliverables](#deliverables)
- [Evidence](#evidence)
- [Assignment Status](#assignment-status)

## Overview

This assignment explores the difference between **AI workflows** and **AI agents**, introduces the **Model Context Protocol (MCP)**, and demonstrates a working MCP server using the **OpenCode CLI**. The project documents the theory behind MCP, the hands-on configuration of the Filesystem MCP Server, and three real tasks completed through MCP-powered tool calls.

## Key Concepts

- **Workflow vs Agent** — the difference between a predefined, developer-controlled execution path and an autonomous LLM that plans its own steps.
- **Model Context Protocol (MCP)** — an open standard that connects AI applications to external data sources, tools, and workflows.
- **MCP Architecture** — hosts, clients, and servers, plus the stdio and Streamable HTTP transports.
- **From Workflow to Agent** — how the previous FL-04 workflow could evolve into an autonomous AI agent powered by MCP tools.

## Learning Objectives

- Understand the difference between workflows and agents.
- Learn the basics of Model Context Protocol (MCP).
- Configure and use an MCP server.
- Complete three MCP-powered tasks.
- Explain how the previous workflow (FL-04) could be upgraded into an AI agent.

## Tech Stack

| Tool | Role |
| ---- | ---- |
| OpenCode CLI | MCP host and AI session |
| Filesystem MCP Server | Provides file and directory tools over MCP |
| Node.js | Runtime for the MCP server |
| npm | Package manager (`npx` to run the server) |
| Visual Studio Code | Editor and MCP host integration |

## Repository Structure

```text
task-06-agent-concepts-and-mcp-basics/
│
├── README.md          # This file — assignment overview and index
├── EXPLAINER.md       # Concepts: workflows, agents, and MCP in depth
├── MCP_SETUP.md       # How the Filesystem MCP Server was configured
├── MCP_TASKS.md       # The three MCP-powered tasks and their results
├── EVIDENCE.md        # Evidence of successful MCP integration
└── screenshots/       # Screenshots of the MCP session
    ├── opencode-connected.PNG
    ├── 01-list-md-files.PNG
    ├── 02-read-readme.PNG
    ├── 03-read-explainer.PNG
    ├── 04-count-md-files.PNG
    └── 05-list-folders.PNG
```

## Getting Started

The full setup procedure is documented in [MCP_SETUP.md](MCP_SETUP.md). At a high level:

1. Install **OpenCode CLI**, **Node.js**, and **npm**.
2. Add the local **Filesystem MCP Server** to OpenCode:

   ```bash
   npx -y @modelcontextprotocol/server-filesystem
   ```

3. Verify the server connection:

   ```bash
   opencode mcp list --print-logs --log-level DEBUG
   ```

4. Start an OpenCode session and use the Filesystem MCP tools against this workspace.

## The Three MCP Tasks

Each task exercised the `tools/list` discovery flow and `tools/call` execution against the Filesystem MCP Server. See [MCP_TASKS.md](MCP_TASKS.md) for the full prompts and results.

1. **List Markdown Files** — recursively listed every `*.md` file in the workspace.
2. **Summarize README.md** — read the README and generated a summary of its contents.
3. **Count Markdown Files** — analyzed the workspace and reported the total number of Markdown files.

## Documentation

| File | Description |
| ---- | ----------- |
| [EXPLAINER.md](EXPLAINER.md) | In-depth explanation of workflows vs agents, the MCP protocol, architecture, primitives, security, and the Filesystem MCP Server. |
| [MCP_SETUP.md](MCP_SETUP.md) | Environment, package, configuration steps, and verification of the MCP server. |
| [MCP_TASKS.md](MCP_TASKS.md) | The three MCP-powered tasks with prompts, results, tools used, and screenshots. |
| [EVIDENCE.md](EVIDENCE.md) | Evidence table mapping each verified task to its screenshot. |

## Deliverables

- **Workflow vs Agent explanation** — [EXPLAINER.md](EXPLAINER.md)
- **MCP setup documentation** — [MCP_SETUP.md](MCP_SETUP.md)
- **Three MCP tasks** — [MCP_TASKS.md](MCP_TASKS.md)
- **Screenshots of MCP tool usage** — `screenshots/`
- **Evidence of successful MCP integration** — [EVIDENCE.md](EVIDENCE.md)

## Evidence

The `screenshots/` folder captures the full MCP session: the server connection, each tool call, and the generated results. A mapping of tasks to screenshots is available in [EVIDENCE.md](EVIDENCE.md).

## Assignment Status

| Status | Item |
| ------ | ---- |
| ✅ | Workflow vs Agent explanation completed |
| ✅ | MCP concepts documented |
| ✅ | Filesystem MCP Server configured |
| ✅ | Three MCP-powered tasks completed |
| ✅ | Screenshots collected |
| ✅ | Evidence documented |
