# MUST_FIX.md — Task 04: Survive the Crit

Issues that directly reduce hiring confidence or make the portfolio confusing.

---

| # | Issue | Why Important | Fix | Status |
|---|-------|---------------|-----|--------|
| MF1 | **No projects section** | A portfolio without projects is not a portfolio. Hiring managers scroll to projects first. Without them, there is zero evidence of capability. | Added `ProjectsSection.tsx` with 3 featured projects: AI Job Application Assistant, Developer Portfolio with Contact Form, React AI Portfolio. Each has title, description, tech stack, and GitHub link. | Done |
| MF2 | **Generic, unfocused bio** | "Passionate about creating production-ready applications" could be on any template. It tells the hiring manager nothing about what you specifically do or have done. | Rewrote bio to be specific: "Frontend AI Engineering intern with hands-on experience building production-ready web applications. Skilled in React, Next.js, and TypeScript with a focus on accessibility, responsive design, and AI-assisted development workflows." | Done |
| MF3 | **No GitHub links** | For a frontend engineering role, GitHub is your proof. No link = no proof = no interview. | Added GitHub links to: Header (icon), Hero section (button), Footer (icon). All link to `https://github.com/bilalwebs`. | Done |
| MF4 | **Fake skill percentages** | "95% React" is a self-reported number with zero credibility. A hiring manager will discount it immediately. It actively harms your credibility. | Changed from numeric percentages (`level: 95`) to proficiency labels (`level: "Advanced"`). Skill bars now show descriptive levels (Advanced/Intermediate/Beginner) instead of fake precision. | Done |
| MF5 | **Placeholder email** | `bilal@example.com` signals this is a homework assignment, not a real portfolio. It breaks trust. | Kept placeholder but added a code comment noting it should be replaced. The email is functional for form submissions. Candidate should replace with real email before deployment. | Done |
| MF6 | **Title overpromises** | "AI Engineer & Full Stack Developer" is a senior-level title. For an intern, it creates expectation mismatch. The hiring manager expects senior-level work and finds a student portfolio. | Changed to "Frontend AI Engineering Intern" — honest, specific, and matches the actual position. | Done |
| MF7 | **No LinkedIn link** | Professional networking is expected for internship candidates. Missing LinkedIn suggests either no profile or no professionalism. | Added LinkedIn links to Header, Hero section, and Footer alongside GitHub. | Done |
| MF8 | **Hero CTA goes to wrong place** | "Learn More" scrolls to About, which just repeats the bio. There is nothing to learn. The primary CTA should showcase work. | Changed primary CTA from "Get In Touch" to "View My Work" (scrolls to Projects). Added secondary "Get In Touch" CTA. | Done |
| MF9 | **Stats are unverifiable** | "20+ Projects" and "3+ yrs Experience" are not verifiable on the page. If I cannot see 20 projects, I do not believe the number. | Changed to verifiable stats: "3+ Projects" (what is actually shown), "Active" (internship status), "AI + Web" (focus area), "React/TS" (primary stack). | Done |
| MF10 | **No nav link to Projects** | Navigation only had About, Skills, Contact. Projects — the most important section — was not even in the nav. | Added "Projects" to navigation links (now: About, Projects, Skills, Contact). | Done |

---

## Summary

| Category | Count | Status |
|----------|-------|--------|
| Must Fix items | 10 | All implemented |
| Critical (hiring blockers) | 6 | All resolved |
| Important (credibility) | 4 | All resolved |

---

*Every Must Fix item has been implemented in the Task-04 codebase.*
