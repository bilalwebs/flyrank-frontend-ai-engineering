# FL-02: Prompting Fundamentals on Real Tasks v2

**Student:** Muhammad Bilal Hussain
**Track:** General AI Fluency

**Task:** Build React and Next.js Components

## Introduction

This prompt ladder demonstrates how an initial, unspecified prompt can be systematically improved into a production-ready prompt through the application of distinct prompt engineering techniques. Each version introduces exactly one new technique on top of the previous version, allowing the resulting change in output quality to be attributed directly to that technique.

The target artifact used throughout this exercise is a reusable **ProjectCard** component, built for the Projects section of a portfolio website developed as part of the FlyRank Frontend AI Engineering Internship. The component displays a project's title, description, technology stack, and links to its GitHub repository and live demo. All examples use React, Next.js, and TypeScript, consistent with the technology stack of the target project.

---

# Version 0 — Naive Prompt

## Technique

None (baseline prompt).

## Prompt

```
Build a React component.
```

## Output

```tsx
function MyComponent() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default MyComponent;
```

## Observation

This baseline prompt provides no information about the component's purpose, the project it belongs to, or the technology stack in use. As a result, the model defaults to the most generic possible output: a placeholder component with no TypeScript typing, no styling, and no relevance to a portfolio website or a `ProjectCard`. There is no way to know from this output whether the component is meant to be a card, a form, or a navigation element. Because no technique has been applied yet, this version serves purely as a control point for measuring the effect of every subsequent technique.

---

# Version 1 — Role Assignment

## Technique

Role Assignment

## Prompt

```
You are a senior frontend engineer specializing in React, Next.js, and TypeScript.
Build a React component.
```

## Output

```tsx
interface MyComponentProps {
  children: React.ReactNode;
}

export function MyComponent({ children }: MyComponentProps) {
  return (
    <div>
      {children}
    </div>
  );
}
```

## Observation

Assigning the model a senior engineer role changes the baseline quality of the code without changing its actual subject matter. The output now uses TypeScript with a properly typed `interface`, an `export function` declaration instead of a default-exported anonymous function, and `children`-based composition, all of which reflect conventions a senior React engineer would follow by default. However, the model still has no information about what the component is meant to represent — the underlying task remains undefined. Role Assignment therefore improves *how* the code is written but does not address *what* should be built, which is the gap the next technique addresses.

---

# Version 2 — Context and Motivation

## Technique

Context and Motivation

## Prompt

```
You are a senior frontend engineer specializing in React, Next.js, and TypeScript.
I am building a production-quality portfolio website for my FlyRank Frontend AI
Engineering Internship. I need a reusable ProjectCard component that displays a
project's title, description, technology stack, GitHub link, and live demo link,
because I will be showcasing 6+ projects on the site and need them to look
consistent and scannable at a glance.
```

## Output

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  demoLink: string;
}

export function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  demoLink,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
      <p className="text-sm text-gray-400">{techStack.join(", ")}</p>
      <div className="mt-2 flex gap-3">
        <a href={githubLink} className="text-blue-600 underline">
          GitHub
        </a>
        <a href={demoLink} className="text-blue-600 underline">
          Live Demo
        </a>
      </div>
    </div>
  );
}
```

## Observation

By naming the exact component (`ProjectCard`), its required fields, and the reason it needs to look consistent across many entries, the prompt now gives the model a concrete target instead of an open-ended request. The output reflects this directly: it is a fully typed `ProjectCardProps` interface with the five specific fields requested, rendered with basic Tailwind styling to support a consistent, scannable card layout. This is a substantial improvement over Version 1, where the component's identity was still unknown. The remaining limitation is that the visual and structural style of the component is still guessed by the model rather than matched to the actual conventions used elsewhere in the project, which is addressed next through few-shot examples.

---

# Version 3 — Few-shot Examples

## Technique

Few-shot Examples

## Prompt

```
You are a senior frontend engineer specializing in React, Next.js, and TypeScript.
I am building a production-quality portfolio website for my FlyRank Frontend AI
Engineering Internship. I need a reusable ProjectCard component that displays a
project's title, description, technology stack, GitHub link, and live demo link,
because I will be showcasing 6+ projects on the site and need them to look
consistent and scannable at a glance.

Follow the same coding style as these existing components:

Example 1: SkillCard component
```tsx
interface SkillCardProps {
  name: string;
  level: string;
}

export function SkillCard({ name, level }: SkillCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-500">{level}</p>
    </div>
  );
}
```

Example 2: CertificateCard component

```tsx
interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
}

export function CertificateCard({ title, issuer, date }: CertificateCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-bold">{title}</h3>
      <p>{issuer}</p>
      <span>{date}</span>
    </div>
  );
}
```

Create the ProjectCard component following the same interface style, export
function style, Tailwind CSS styling, and reusable props structure.

```

## Output
```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  demoLink: string;
}

export function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  demoLink,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
      <p className="text-sm text-gray-400">{techStack.join(", ")}</p>
      <div className="mt-2 flex gap-3">
        <a href={githubLink} className="text-blue-600 underline">
          GitHub
        </a>
        <a href={demoLink} className="text-blue-600 underline">
          Live Demo
        </a>
      </div>
    </div>
  );
}
```

## Observation

Providing two real code examples, rather than descriptions of components, allows the model to imitate a concrete pattern instead of inferring a plausible one. The output now consistently applies the same `interface [Name]Props` naming convention, the same `export function` declaration style, and the same `rounded-lg border p-4 shadow-sm` Tailwind vocabulary used in the `SkillCard` and `CertificateCard` examples, ensuring visual and structural consistency across the portfolio's card components. This is a meaningful improvement over Version 2, where the styling and structure were plausible but not verified against the project's actual conventions. What remains missing is a predictable way to deliver the output — the code is still returned as a single undifferentiated block with no file path, prop documentation, or usage example, which the next technique resolves.

---

# Version 4 — Output Structure

## Technique

Output Structure

## Prompt

```
You are a senior frontend engineer specializing in React, Next.js, and TypeScript.
I am building a production-quality portfolio website for my FlyRank Frontend AI
Engineering Internship. I need a reusable ProjectCard component that displays a
project's title, description, technology stack, GitHub link, and live demo link,
because I will be showcasing 6+ projects on the site and need them to look
consistent and scannable at a glance.

Follow the same coding style as these existing components:

Example 1: SkillCard component
```tsx
interface SkillCardProps {
  name: string;
  level: string;
}

export function SkillCard({ name, level }: SkillCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-500">{level}</p>
    </div>
  );
}
```

Example 2: CertificateCard component

```tsx
interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
}

export function CertificateCard({ title, issuer, date }: CertificateCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-bold">{title}</h3>
      <p>{issuer}</p>
      <span>{date}</span>
    </div>
  );
}
```

Create the ProjectCard component following the same interface style, export
function style, Tailwind CSS styling, and reusable props structure.

Return the answer using this exact structure:

1. Component Purpose
2. File Location
3. Props Interface
4. Complete Component Code
5. Usage Example
6. Best Practices

```

## Output

**1. Component Purpose**
Displays a single project's title, description, technology stack, and links to its GitHub repository and live demo, in a consistent card format used across the Projects section of the portfolio.

**2. File Location**
`components/ProjectCard.tsx`

**3. Props Interface**
```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  demoLink: string;
}
```

**4. Complete Component Code**

```tsx
export function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  demoLink,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
      <p className="text-sm text-gray-400">{techStack.join(", ")}</p>
      <div className="mt-2 flex gap-3">
        <a href={githubLink} className="text-blue-600 underline">
          GitHub
        </a>
        <a href={demoLink} className="text-blue-600 underline">
          Live Demo
        </a>
      </div>
    </div>
  );
}
```

**5. Usage Example**

```tsx
<ProjectCard
  title="AI Resume Builder"
  description="A tool that generates tailored resumes using AI, matching skills to job descriptions automatically."
  techStack={["Next.js", "TypeScript", "Tailwind"]}
  githubLink="https://github.com/username/resume-builder"
  demoLink="https://resume-builder-demo.vercel.app"
/>
```

**6. Best Practices**
Documenting the props interface separately from the implementation makes the component's contract clear to any future developer without requiring them to read the internals. Placing the file at a predictable location (`components/ProjectCard.tsx`) keeps the project's structure consistent as more components are added.

## Observation

Requiring a fixed output structure does not change the underlying code, since it is identical to Version 3, but it transforms how usable that output is. The response is now organized into predictable sections — purpose, file location, props, code, usage, and rationale — which allows the developer to quickly locate any piece of information without re-reading the entire response, and doubles as ready-to-use documentation. This is a clear improvement over Version 3, where the same code was delivered as an undifferentiated block with no supporting context. The remaining limitation is that the component still assumes ideal input data: all props are required, and no consideration has been given to missing links, empty arrays, or overly long text, which is addressed by the final technique.

---

# Version 5 — Step Decomposition

## Technique

Step Decomposition

## Prompt

```
You are a senior frontend engineer specializing in React, Next.js, and TypeScript.
I am building a production-quality portfolio website for my FlyRank Frontend AI
Engineering Internship. I need a reusable ProjectCard component that displays a
project's title, description, technology stack, GitHub link, and live demo link,
because I will be showcasing 6+ projects on the site and need them to look
consistent and scannable at a glance.

Follow the same coding style as these existing components:

Example 1: SkillCard component
```tsx
interface SkillCardProps {
  name: string;
  level: string;
}

export function SkillCard({ name, level }: SkillCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-500">{level}</p>
    </div>
  );
}
```

Example 2: CertificateCard component

```tsx
interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
}

export function CertificateCard({ title, issuer, date }: CertificateCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-bold">{title}</h3>
      <p>{issuer}</p>
      <span>{date}</span>
    </div>
  );
}
```

Create the ProjectCard component following the same interface style, export
function style, Tailwind CSS styling, and reusable props structure.

Before writing the final code, work through the following steps:

1. Identify the required props and explain why each one is needed.
2. Identify possible edge cases, including a missing GitHub link, a missing live
   demo link, an empty technology stack, and an unusually long description.
3. Plan the component structure and any relevant accessibility considerations.
4. Review the final component for maintainability and adherence to best practices.

After completing these steps, provide the final answer using this structure:

1. Component Purpose
2. File Location
3. Props Interface
4. Complete Component Code
5. Usage Example
6. Best Practices

```

## Output

**Step 1 — Required props and rationale:**
- `title: string` — required; every project needs an identifying name.
- `description: string` — required; explains what the project does.
- `techStack: string[]` — required; lists the technologies used.
- `githubLink?: string` — optional; not every project is public yet.
- `demoLink?: string` — optional; not every project has a live deployment.

**Step 2 — Edge cases identified:**
- Missing GitHub link: the GitHub button should not render if the link is absent.
- Missing live demo link: the Live Demo button should not render if the link is absent.
- Empty technology stack: the tech stack line should not render an empty string.
- Long description: text should be visually truncated so cards remain uniform in height.

**Step 3 — Structure and accessibility:**
Links should open in a new tab safely using `rel="noopener noreferrer"`. The heading should use a semantic `h3` element, consistent with a page that already contains its own `h1`/`h2`.

**Step 4 — Review:**
The component remains consistent with the `SkillCard` and `CertificateCard` patterns while defensively handling incomplete or imperfect data, which is expected in a real-world portfolio dataset.

### Final Answer

**1. Component Purpose**
Displays a single project's title, description, technology stack, and optional links to its GitHub repository and live demo, in a consistent card format for the Projects section of the portfolio.

**2. File Location**
`components/ProjectCard.tsx`

**3. Props Interface**
```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
}
```

**4. Complete Component Code**

```tsx
export function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  demoLink,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>

      <p className="text-gray-500 line-clamp-3">{description}</p>

      {techStack.length > 0 && (
        <p className="text-sm text-gray-400">{techStack.join(", ")}</p>
      )}

      {(githubLink || demoLink) && (
        <div className="mt-2 flex gap-3">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              GitHub
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
```

**5. Usage Example**

```tsx
<ProjectCard
  title="AI Resume Builder"
  description="A tool that generates tailored resumes using AI, matching skills to job descriptions automatically."
  techStack={["Next.js", "TypeScript", "Tailwind"]}
  githubLink="https://github.com/username/resume-builder"
  demoLink="https://resume-builder-demo.vercel.app"
/>
```

**6. Best Practices**
Making `githubLink` and `demoLink` optional reflects the reality that not every showcased project will be finished or public, preventing the component from assuming perfect input. Conditionally rendering sections based on available data keeps the card visually clean regardless of what is passed to it, and adding `rel="noopener noreferrer"` to externally opened links follows standard web security practice.

## Observation

Explicitly instructing the model to reason through required props, edge cases, and accessibility considerations before generating code surfaces issues that were previously invisible in the finished output. As a result, `githubLink` and `demoLink` became optional, empty and missing states are now handled gracefully, long descriptions are truncated, and a security-relevant `rel="noopener noreferrer"` attribute was added — none of which appeared in Version 4. This is a substantial improvement in robustness and production-readiness, since the component can now safely handle incomplete real-world project data instead of assuming every field is always present. With all five techniques applied cumulatively, the resulting prompt produces a well-typed, documented, style-consistent, and defensively coded component, representing the complete progression from a one-line request to a production-ready specification.

---

## Summary Table

| Version | Technique Added        | Key Improvement                                                                           |
| ------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| 0       | Baseline (none)        | Generic, unstyled component with no defined purpose                                       |
| 1       | Role Assignment        | Idiomatic TypeScript/React defaults (typed props,`export function`)                     |
| 2       | Context and Motivation | Component identity and required fields clearly defined (`ProjectCard`)                  |
| 3       | Few-shot Examples      | Output matches the project's real coding conventions and Tailwind styling                 |
| 4       | Output Structure       | Predictable, documentation-ready response (purpose, file path, props, usage)              |
| 5       | Step Decomposition     | Handles edge cases and accessibility: optional links, empty states, secure external links |

## Conclusion

Each prompt engineering technique addressed a distinct category of weakness in the model's output: Role Assignment improved the baseline quality of the generated code, Context and Motivation defined *what* needed to be built and *why*, Few-shot Examples ensured the result matched real project conventions, Output Structure made the response predictable and directly usable, and Step Decomposition caught robustness and accessibility issues that would otherwise have gone unnoticed until encountered in production. Applying these techniques cumulatively demonstrates that effective prompt engineering is not about writing longer prompts, but about deliberately closing specific gaps — in quality, relevance, style, usability, and completeness — that a vague prompt leaves open for the model to guess.

---

# Cross-Model Comparison

## Claude

### Strengths

* Followed the requested output structure very closely.
* Thought through real-world edge cases before generating the code.
* Improved the component by making GitHub and Live Demo links optional.
* Considered accessibility by adding semantic headings, `aria-label` attributes, and secure external links.
* Focused on production-ready improvements such as graceful handling of missing data and `line-clamp-3` for long descriptions.

### Weaknesses

* The generated code contained a formatting issue where the opening `<a>` tags were accidentally omitted in the link section, requiring a small manual correction.
* Added a few implementation details (such as rendering technologies as badges) that slightly deviated from the original example style.

---

## ChatGPT

### Strengths

* Produced clean, readable, and syntactically correct TypeScript code.
* Clearly explained each reasoning step before writing the final component.
* Included handling for optional GitHub and Live Demo links.
* Used semantic HTML and good Tailwind CSS practices.
* Generated code that was immediately usable without formatting errors.

### Weaknesses

* The design stayed closer to a generic card component instead of closely matching the existing `SkillCard` and `CertificateCard` coding style.
* Suggested displaying `"No technologies listed."`, which changes the visual layout instead of simply hiding the empty section.
* Did not include accessibility enhancements such as `aria-label` attributes.

---

## Overall Comparison

| Category                  | Claude     | ChatGPT    |
| ------------------------- | ---------- | ---------- |
| Followed Prompt Structure | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Code Quality              | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ |
| Matches Existing Style    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |
| Edge Case Handling        | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |
| Accessibility             | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |
| Production Readiness      | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |

### Final Verdict

Both models produced high-quality solutions, but they showed different strengths. Claude focused more on software engineering practices, defensive programming, accessibility, and maintaining consistency with the existing project structure. ChatGPT generated cleaner and immediately runnable code with excellent explanations, but it stayed slightly more generic and included fewer accessibility improvements. For this portfolio project, Claude's response aligns more closely with the goal of building a production-ready reusable component, while ChatGPT provides a strong implementation that requires fewer syntax corrections.

---

# Reusable Prompt Template

You are a senior [ROLE].

I am building a [PROJECT TYPE] for [PURPOSE].

Create a reusable [COMPONENT NAME].

The component should include:

- [Feature 1]
- [Feature 2]
- [Feature 3]

Follow the coding style of these existing examples:

[Example 1]

[Example 2]

Before writing the final code:

1. Analyze the requirements.
2. Define the required props and explain their purpose.
3. Identify possible edge cases.
4. Plan the component structure and accessibility considerations.
5. Review the solution for maintainability and best practices.

Return the answer using this structure:

1. Component Purpose
2. File Location
3. Props Interface
4. Complete Component Code
5. Usage Example
6. Best Practices

## Why this Template is Reusable

This prompt template is intentionally generic and is not tied to a specific project or component. By replacing the placeholders (such as the role, project type, component name, required features, and example components), it can be reused for many different React and Next.js component generation tasks. The template combines multiple prompt engineering techniques—including role assignment, context and motivation, few-shot examples, output structure, and step decomposition—to consistently produce well-structured, maintainable, and production-ready code.
