# Next Case Study Guide

A concise reference for adding new portfolio case studies to the FlyRank Frontend AI Engineering repository.

## Where the Next Case Study Goes

```
assignments/
├── week-01/
├── week-02/
├── week-03/
├── week-04/
├── week-05/
├── week-06/
│   ├── task-01-buttons-with-a-brain/
│   ├── task-02-make-it-do-something/
│   ├── task-03-open-it-on-your-phone/
│   ├── task-04-survive-the-crit/
│   └── task-05-testing-pass/
├── week-07/
└── week-08/                          ← Add new case studies here
    └── <project-name>/
```

Each new case study gets its own folder under the appropriate week directory.

---

## Steps to Add a New Case Study

### Step 1: Create the Folder

```bash
mkdir -p assignments/week-XX/<project-name>
cd assignments/week-XX/<project-name>
```

### Step 2: Scaffold the Project

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

### Step 3: Follow the Three-Beat Structure

Every case study must document three sections:

| Beat | Section | What to Write |
|------|---------|---------------|
| 1 | **Problem** | What specific problem does this project solve? Who is affected? |
| 2 | **What I Built** | What did you build? What technologies? What AI tools helped? |
| 3 | **Outcome** | What was the result? measurable impact? What did you learn? |

### Step 4: Add Required Documentation

Every case study folder must contain:

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation (three-beat structure + tech stack + setup) |
| `REFLECTION.md` | Personal reflection on what was learned |
| `DEPLOYMENT.md` | How to deploy and what was deployed |

### Step 5: Push to Repository

```bash
git add .
git commit -m "feat: add <project-name> case study"
git push
```

---

## Three-Beat Structure Template

Use this template for every new case study README:

```markdown
# <Project Name>

## Problem
<!-- What specific problem does this solve? Who is affected? -->

## What I Built
<!-- Technologies used, architecture decisions, AI tools leveraged -->

## Outcome
<!-- Measurable results, user impact, personal learning -->
```

---

## Checklist Before Submitting

- [ ] Project folder created under correct week
- [ ] README.md follows three-beat structure
- [ ] REFLECTION.md written
- [ ] DEPLOYMENT.md written
- [ ] Code passes lint and type checks
- [ ] All tests passing
- [ ] Commit message follows conventional commits format
- [ ] Changes pushed to repository
