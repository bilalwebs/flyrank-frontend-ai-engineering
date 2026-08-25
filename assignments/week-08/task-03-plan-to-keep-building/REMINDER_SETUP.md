# Reminder Setup

Evidence of reminder configuration for ongoing portfolio maintenance.

---

## Reminder Configuration

### Title
**Add New Portfolio Case Study**

### Frequency
Monthly (1st of every month)

### Purpose
Keep the portfolio updated with new real projects, ensuring it always reflects current skills and experience for internship/job reviewers.

---

## Why Monthly

- **Real projects take time** — A monthly check-in is frequent enough to catch completed projects but not so frequent that it becomes noise
- **Consistent documentation** — Writing case studies while the project is fresh produces better results than trying to remember details months later
- **Portfolio growth** — 1-2 new projects per quarter keeps the portfolio evolving without overwhelming the layout

---

## Reminder Checklist

When the monthly reminder fires, complete these steps:

### Step 1: Review Completed Projects (5 minutes)

Ask yourself:
- Did I finish any projects since last month?
- Are there side projects or coursework that could be showcased?
- Did I contribute to any open-source projects?

If yes to any → proceed to Step 2.
If no → mark as complete, move on.

### Step 2: Write Case Study (15-20 minutes)

Follow the structure in `NEXT_CASE_STUDY_PLAN.md`:
1. Problem (2-3 sentences)
2. What I Built (3-5 sentences)
3. What Came Of It (2-3 sentences)

### Step 3: Update Portfolio (10 minutes)

Follow the steps in `PORTFOLIO_UPDATE_GUIDE.md`:
1. Add project data to `data/portfolio.ts`
2. Add image to `public/images/`
3. Set featured status
4. Run `npm run lint && npm run build`
5. Deploy

### Step 4: Update Skills (5 minutes)

If the new project used new technologies:
- Add to `skillGroups` in `data/portfolio.ts`
- Update proficiency levels honestly

### Step 5: Document (5 minutes)

Add a brief entry to this file:

```markdown
## [Month Year]

- Added: [Project Name]
- Featured: [Yes/No]
- Technologies: [List]
- Link: [URL]
```

---

## Reminder Implementation Options

### Option A: Google Calendar

1. Open Google Calendar
2. Create recurring event: "Portfolio Case Study Review"
3. Set to monthly, 1st of month, 10:00 AM
4. Add description with checklist from this document
5. Enable email + mobile notifications

### Option B: Phone Reminder

1. Open Reminders app (iOS) or Tasks (Android)
2. Create recurring reminder: "Add new portfolio case study"
3. Set to monthly on the 1st
4. Include brief description

### Option C: GitHub Issue

1. Create a GitHub issue in the portfolio repo
2. Title: "Monthly Portfolio Review"
3. Set label: `maintenance`
4. Use GitHub's scheduled reminders (if available) or manually create on 1st of month

### Option D: Notion/Todoist

1. Create recurring task: "Portfolio Case Study Review"
2. Set to monthly
3. Add subtasks matching the checklist above

---

## Log of Monthly Reviews

### August 2026

- **Reviewed:** Yes
- **New projects added:** None (portfolio just created)
- **Notes:** Initial portfolio completed during FlyRank internship. Shader hero added. Documentation complete.

### September 2026

- **Reviewed:** [Pending]
- **New projects added:** [Pending]
- **Notes:** [Pending]

### October 2026

- **Reviewed:** [Pending]
- **New projects added:** [Pending]
- **Notes:** [Pending]

### November 2026

- **Reviewed:** [Pending]
- **New projects added:** [Pending]
- **Notes:** [Pending]

### December 2026

- **Reviewed:** [Pending]
- **New projects added:** [Pending]
- **Notes:** [Pending]

---

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Projects in portfolio | 4-6 total | Count in `data/portfolio.ts` |
| Featured projects | 2 maximum | Count `featured: true` |
| Case studies written | 1 per project | Check for `CASE_STUDY_*.md` files |
| Lighthouse score | > 90 | Run audit after each update |
| Last updated | Within 30 days | Check git log for portfolio changes |

---

## Emergency: Portfolio Stale

If the portfolio hasn't been updated in 3+ months:

1. **Don't panic** — A stale portfolio is better than no portfolio
2. **Add any completed project** — Even a small one counts
3. **Update skill levels** — Reflect current abilities honestly
4. **Refresh the bio** — Add any new experience or learning
5. **Deploy the update** — Getting it live matters more than perfection

The goal is continuous improvement, not perfection.
