
# FE-03 AI-Assisted Workflow Drill

## Overview

This assignment demonstrates how prompt quality directly affects the quality of AI-generated code. I implemented the same feature twice using different prompting approaches. In Round 1, I used a very simple prompt with almost no context. In Round 2, I used a detailed prompt containing project requirements, technical constraints, expected behavior, accessibility requirements, file location, validation rules, and a verification step. Comparing both outputs showed that better prompts produce more complete, maintainable, and production-ready code while reducing the amount of manual review required.

---

## Round 1

For the first round, I intentionally used the vague prompt:

> Build a settings form in React.

The AI generated a basic React component using JavaScript and the useState hook. The form contained the required input fields and basic submission logic. Although it worked, the implementation lacked many production-quality features.

Missing features included:

- TypeScript
- React Hook Form
- Zod validation
- Tailwind CSS
- Accessibility improvements
- Reusable component design
- Project folder structure
- Testing guidance
- Verification process

The output required significant manual review before it could be used in a real project.

---

## Round 2

For the second round, I created a detailed prompt that defined the project context, technology stack, coding standards, accessibility requirements, validation rules, expected behavior, file structure, and verification steps.

The AI produced a much higher quality solution that included:

- TypeScript
- React Hook Form
- Zod validation
- Tailwind CSS
- Reusable component architecture
- Semantic HTML
- Accessibility improvements
- Folder structure recommendations
- Test case examples
- Production-readiness review

The response also explained the design decisions, validation schema, edge cases, and best practices before generating the code.

---

## Comparison

The difference between both outputs was significant.

Round 1 focused only on generating working code, while Round 2 generated a complete engineering solution.

Round 2 produced cleaner architecture, stronger validation, better accessibility, reusable components, and much better documentation.

Although creating the detailed prompt took longer, the overall development process required less manual correction and review. This demonstrates that investing more time in prompt engineering can reduce implementation time later.

---

## AI Mistake I Caught

One issue I noticed in the Round 2 response was the example showing `"use server"` inside the usage example. That pattern is not always appropriate depending on the Next.js configuration and would need to be adjusted before using it in a real project.

This reminded me that AI-generated code should always be reviewed before being accepted.

---

## Lessons Learned

From this assignment I learned that effective prompt engineering is more than simply asking AI to generate code. Providing clear requirements, constraints, expected behavior, project structure, and verification steps produces significantly better results.

I also learned that AI should be treated as a development assistant rather than a replacement for code review. Carefully reviewing AI-generated output remains an essential part of the workflow.

This workflow will be useful for future FlyRank assignments and real-world frontend development projects.
