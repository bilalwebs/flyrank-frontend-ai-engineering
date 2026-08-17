"""ATS scoring criteria and methodology.

Defines how the agent should evaluate ATS compatibility.
"""

ATS_SCORING_CRITERIA = """## ATS Scoring Methodology

Score the resume's ATS compatibility from 0 to 100 based on these weighted factors:

### High Impact (40 points total)
- **Keyword Matching (20 pts):** How many skills, tools, and terms from the job description appear in the resume?
- **Standard Section Headers (10 pts):** Does the resume use standard headers like "Experience", "Education", "Skills"?
- **Clean Text Format (10 pts):** Is the content parseable by ATS? No images, tables, or complex layouts?

### Medium Impact (35 points total)
- **Reverse Chronological Order (10 pts):** Is work experience listed most-recent-first?
- **Contact Information (5 pts):** Is email, phone, and optionally LinkedIn present?
- **Quantified Achievements (10 pts):** Are there metrics, percentages, or numbers showing impact?
- **Relevant Skills Listed (10 pts):** Are technical and relevant skills explicitly listed?

### Lower Impact (25 points total)
- **Appropriate Length (5 pts):** 1-2 pages for most candidates
- **Consistent Formatting (5 pts):** Uniform date formats, bullet styles, spacing
- **Education Details (5 pts):** Degree, institution, graduation year present
- **No Spelling Errors (5 pts):** Clean, professional language
- **PDF or DOCX Format (5 pts):** Standard ATS-friendly file type

### Score Ranges
- 80-100: Excellent ATS compatibility
- 60-79: Good, minor improvements needed
- 40-59: Moderate, several issues to address
- 20-39: Poor, significant restructuring needed
- 0-19: Critical issues, major overhaul required
"""
