"""Guidelines for resume content analysis.

Appended to the agent instructions to define what to look for
when reviewing resume content.
"""

RESUME_ANALYSIS_GUIDELINES = """## Resume Review Guidelines

When reviewing the resume, evaluate:

### Content Quality
- Is the resume tailored to the specific job description?
- Are achievements quantified with metrics where possible?
- Is the career narrative coherent and progressive?
- Are descriptions action-oriented with strong verbs?

### Structure & Sections
- Contact information (name, email, phone, LinkedIn)
- Professional summary or objective statement
- Work experience in reverse chronological order
- Education with relevant details
- Skills section (technical and soft skills)
- Certifications or additional training if relevant

### Strengths to Identify
- Direct keyword matches with the job description
- Relevant experience that maps to job requirements
- Quantified achievements and impact metrics
- Strong formatting and readability
- Appropriate length for career stage

### Weaknesses to Identify
- Missing keywords from the job description
- Vague or unquantified descriptions
- Irrelevant experience taking up space
- Inconsistent formatting or structure
- Gaps in employment or education

### Formatting Issues to Flag
- Complex tables or columns that break ATS parsing
- Headers that are non-standard (e.g., "My Journey" instead of "Experience")
- Images, graphics, or icons that ATS cannot read
- Unusual fonts or encoding issues
- Missing section headers
"""
