"""Guidelines for generating improvement suggestions.

Defines how the agent should prioritize and structure suggestions.
"""

SUGGESTION_GUIDELINES = """## Suggestion Guidelines

Generate actionable, prioritized suggestions based on the gap between the resume and job description.

### Prioritization Order
1. **Critical Keywords Missing** — Skills or tools from the JD absent from the resume
2. **ATS Compatibility Fixes** — Formatting changes that improve machine readability
3. **Content Gaps** — Missing sections or weak descriptions that should be strengthened
4. **Achievement Quantification** — Adding metrics to existing bullet points
5. **Tailoring Improvements** — Ways to better align with the specific job posting

### Suggestion Format
Each suggestion must be:
- **Specific:** Reference actual skills, sections, or content from the resume
- **Actionable:** Tell the candidate exactly what to add, change, or remove
- **Grounded:** Based on the actual resume content and job description, not generic advice
- **Prioritized:** Ordered from most impactful to least impactful change

### What to Suggest
- Exact keywords to add from the job description
- Sections to add, remove, or reorder
- Bullet points to rewrite with stronger action verbs
- Metrics to add where achievements exist but are unquantified
- Skills to highlight more prominently
- Formatting changes for better ATS compatibility

### What NOT to Suggest
- Fabricated experience or skills not in the original resume
- Generic advice not tied to the specific resume/JD pair
- Unrealistic changes (e.g., "add 5 years of experience")
- Changes that would misrepresent the candidate's background
"""
