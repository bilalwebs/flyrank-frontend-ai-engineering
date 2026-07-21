# The Prompt Ladder

**Student:** Muhammad Bilal Hussain

**Track:** General AI Fluency

**Week:** 2

---

# Introduction

This assignment demonstrates how I improved a prompt step by step instead of trying to write the perfect prompt at once. Each version adds only one prompt engineering technique so I can clearly see how that single change affected the AI's response.

---

# Baseline

## Prompt

```

Build a portfolio website.
```

## Response (Excerpt)

The AI created a basic portfolio website idea using Next.js, TypeScript, and Tailwind CSS. It also selected a commit-log style project section and explained how to run the project.

## Notes

**What changed in the prompt?**

None. This was my original weak prompt.

**What improved in the output?**

The AI generated a complete portfolio concept and suggested a modern technology stack.

**What still failed?**

The AI had to guess the audience, purpose, and project requirements because no context was provided.

**What I would try next?**

I would define the visual style.

---

# Version 1

## Prompt

```

Build a portfolio website.

The visual style should be minimal and clean.

```

## Response (Excerpt)

The AI suggested a clean layout with plenty of whitespace, modern typography, subtle colors, and a professional interface.

## Notes

**What changed in the prompt?**

I added a visual style preference.

**What improved in the output?**

The design became more consistent and professional instead of choosing a random style.

**What still failed?**

The AI still didn't know who the website was for.

**What I would try next?**

I would define the target audience.

---

# Version 2

## Prompt

```

Build a portfolio website for a Frontend AI Engineering student.

The audience is recruiters looking for frontend internship candidates.

```

## Response (Excerpt)

The AI focused on recruiter-friendly elements such as an availability badge, resume button, technical skills section, and stronger project visibility.

## Notes

**What changed in the prompt?**

I added the target audience.

**What improved in the output?**

The AI started making decisions based on recruiter needs instead of producing a general portfolio.

**What still failed?**

The AI still didn't know which projects the portfolio should showcase.

**What I would try next?**

I would provide project context.

---

# Version 3

## Prompt

```

Build a portfolio website for a Frontend AI Engineering student.

The audience is recruiters looking for frontend internship candidates.

This portfolio is for my FlyRank Frontend AI Engineering Internship projects.

```

## Response (Excerpt)

The AI tailored the portfolio around my FlyRank internship and suggested sections specifically for internship projects and AI-assisted development.

## Notes

**What changed in the prompt?**

I added real project context.

**What improved in the output?**

The portfolio became more personalized instead of looking like a generic developer portfolio.

**What still failed?**

The response was useful but not organized into a structured document.

**What I would try next?**

I would specify the output format.

---

# Version 4

## Prompt

```

Build a portfolio website for a Frontend AI Engineering student.

The audience is recruiters looking for frontend internship candidates.

This portfolio is for my FlyRank Frontend AI Engineering Internship projects.

Return the response in this format:

1. Site Structure

2. Folder Structure

3. Component List

4. UI Design Decisions

5. Tech Stack

6. Implementation Plan

```

## Response (Excerpt)

The AI returned the information in six clearly organized sections, making the implementation plan much easier to understand.

## Notes

**What changed in the prompt?**

I added a required output format.

**What improved in the output?**

The response became structured, organized, and much easier to read and follow.

**What still failed?**

The AI still didn't know the expected quality standards for the project.

**What I would try next?**

I would define quality requirements.

---

# Version 5 (Final)

## Prompt

```

Build a portfolio website for a Frontend AI Engineering student.

The audience is recruiters looking for frontend internship candidates.

This portfolio is for my FlyRank Frontend AI Engineering Internship projects.

Return the response in this format:

1. Site Structure

2. Folder Structure

3. Component List

4. UI Design Decisions

5. Tech Stack

6. Implementation Plan

Requirements:

- Keep the design clean and modern.

- Focus on recruiter-friendly UX.

- Use reusable React components.

- Follow Next.js and TypeScript best practices.

- Make the structure production-ready and easy to maintain.
```

## Response (Excerpt)

The AI generated a production-ready portfolio plan with reusable React components, recruiter-focused UX, clean architecture, Next.js best practices, and a maintainable folder structure.

## Notes

**What changed in the prompt?**

I added quality requirements such as clean design, recruiter-friendly UX, reusable React components, Next.js and TypeScript best practices, and production-ready code.

**What improved in the output?**

The response verified that the portfolio design already met the required engineering standards. It explained how each requirement was satisfied and highlighted maintainability, reusable components, and recruiter-focused UX.

**What still failed?**

Adding the quality requirements did not significantly change the generated portfolio because most of those requirements had already been satisfied in the previous version. The response mainly confirmed the existing work instead of introducing major improvements.

**What I would try next?**

I would provide my real FlyRank internship projects, GitHub links, and live demos to generate final production-ready portfolio content.

---

# Final Reusable Prompt

```text

Build a portfolio website for a Frontend AI Engineering student.

The audience is recruiters looking for frontend internship candidates.

This portfolio is for my FlyRank Frontend AI Engineering Internship projects.

Return the response in this format:

1. Site Structure

2. Folder Structure

3. Component List

4. UI Design Decisions

5. Tech Stack

6. Implementation Plan

Requirements:

- Keep the design clean and modern.

- Focus on recruiter-friendly UX.

- Use reusable React components.

- Follow Next.js and TypeScript best practices.

- Make the structure production-ready and easy to maintain.
```

---

# Reflection

This assignment taught me that improving prompts one step at a time produces much better results than changing everything at once. By adding only one new layer in each version, I could clearly see how the AI's output changed and which prompt engineering technique had the biggest impact. I also learned that context, audience, output format, and quality requirements all play different roles in generating useful AI responses.
