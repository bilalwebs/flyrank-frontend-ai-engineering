# AI Documentation Workflow

## Overview

This workflow automates the creation of project documentation using a Claude Project. Instead of manually writing documentation, the workflow analyzes the uploaded project and generates multiple professional Markdown documents through a series of structured prompts.

---

# Workflow Diagram

```
Project Files
      │
      ▼
Upload Files to Claude Project
      │
      ▼
Claude Analyzes Project
      │
      ▼
Run Prompt 1 → Project Documentation
      │
      ▼
Run Prompt 2 → GitHub README
      │
      ▼
Run Prompt 3 → Project Summary
      │
      ▼
Run Prompt 4 → Code Review
      │
      ▼
Run Prompt 5 → Future Roadmap
      │
      ▼
Review Generated Output
      │
      ▼
Save Final Markdown Files
```

---

# Workflow Steps

## Step 1 – Prepare the Project

Gather the required project files before starting the workflow.

Uploaded files included:

- README.md
- Portfolio Project
- Assignment Files
- Stack Analysis
- Supporting Documentation

---

## Step 2 – Upload Files

Create a Claude Project and upload all relevant project files into the project's Knowledge section.

These files provide the context required for documentation generation.

---

## Step 3 – Execute the Workflow

Run the following prompts one by one.

### Run 1

Generate complete project documentation.

Output:

- RUN-01-PROJECT-DOCUMENTATION.md

---

### Run 2

Generate a professional GitHub README.

Output:

- RUN-02-README.md

---

### Run 3

Generate a professional project summary.

Output:

- RUN-03-PROJECT-SUMMARY.md

---

### Run 4

Generate a senior frontend engineering code review.

Output:

- RUN-04-CODE-REVIEW.md

---

### Run 5

Generate a future improvement roadmap.

Output:

- RUN-05-FUTURE-ROADMAP.md

---

## Step 4 – Review the Results

Review every generated document before saving.

Verify:

- Technical accuracy
- Markdown formatting
- Project-specific information
- Folder structure
- Technology stack

---

## Step 5 – Export

Save each generated response as an individual Markdown file inside the `outputs/` directory.

---

# Workflow Benefits

- Faster documentation generation
- Consistent Markdown formatting
- Professional project documentation
- Reusable workflow for future projects
- Reduced manual effort

---

# Tools Used

- Claude Project
- ChatGPT
- Markdown
- GitHub

---

# Result

The workflow successfully generated five professional documentation files that can be reused for internship assignments, portfolio projects, and GitHub repositories.
