
# Step 1: Analyze the Component Requirements

## Core Functionality

The `ProjectCard` component should be a reusable UI component that displays information about a portfolio project.

It should display:

* Project title
* Project description
* Technology stack
* GitHub repository link
* Live demo link

## Required Features

* Accept data through props.
* Render project information consistently.
* Display GitHub and Live Demo links only when available.
* Support multiple technologies.
* Follow the existing component style.

## Expected User Interactions

* Users can read project information.
* Users can click the GitHub link.
* Users can click the Live Demo link.

---

# Step 2: Define the Required Props

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}
```

### Why each prop is needed

| Prop             | Purpose                             |
| ---------------- | ----------------------------------- |
| `title`        | Displays the project name.          |
| `description`  | Explains what the project does.     |
| `technologies` | Shows the technology stack used.    |
| `githubUrl?`   | Optional GitHub repository link.    |
| `liveUrl?`     | Optional deployed application link. |

Using optional (`?`) links allows the component to work even when a project has not been deployed or made public.

---

# Step 3: Identify Edge Cases

## 1. Missing GitHub Link

Do not render the GitHub button if `githubUrl` is undefined.

---

# Reusable Prompt Template

---

# Reusable Prompt Template

---

## 2. Missing Live Demo Link

Do not render the Live Demo button if `liveUrl` is undefined.

---

## 3. Empty Technology Stack

If the technologies array is empty, display:

```text
No technologies listed.
```

---

## 4. Long Project Description

Allow the description to wrap naturally.

Using Tailwind:

```tsx
className="text-gray-600"
```

is sufficient since paragraphs wrap by default.

---

# Step 4: Plan the Component Structure

```
Card
│
├── Title
├── Description
├── Technology Section
│      ├── React
│      ├── Next.js
│      └── TypeScript
│
└── Links
       ├── GitHub
       └── Live Demo
```

## Accessibility Considerations

* Use semantic headings (`h3`).
* Use `<a>` elements for navigation.
* Open external links in a new tab.
* Add:

```tsx
target="_blank"
rel="noopener noreferrer"
```

for security.

* Use meaningful link text.

---

# Step 5: Review for Maintainability

The component follows the same style as the provided examples by:

* Using a dedicated TypeScript interface.
* Using an exported function component.
* Keeping props simple.
* Remaining reusable.
* Using Tailwind utility classes.
* Avoiding unnecessary complexity.
* Handling optional data gracefully.

---

# 1. Component Purpose

The `ProjectCard` component is a reusable card used to display portfolio projects, including the project title, description, technology stack, GitHub repository, and live demo links.

---

# 2. File Location

```text
components/ProjectCard.tsx
```

---

# 3. Props Interface

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}
```

---

# 4. Complete Component Code

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <div className="mt-4">
        <h4 className="font-semibold">
          Technologies
        </h4>

        {technologies.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-md bg-gray-100 px-2 py-1 text-sm"
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            No technologies listed.
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
```

---

# 5. Usage Example

```tsx
<ProjectCard
  title="Portfolio Website"
  description="A personal portfolio built with Next.js and TypeScript."
  technologies={[
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ]}
  githubUrl="https://github.com/username/portfolio"
  liveUrl="https://portfolio.vercel.app"
/>
```

---

# 6. Best Practices

* Keep the component focused on displaying project data only.
* Pass project information through props instead of hardcoding values.
* Make external links optional to support projects without a public repository or deployment.
* Render the technology stack dynamically using `.map()`.
* Use semantic HTML elements (`h3`, `p`, `ul`, `li`, `a`) for better accessibility.
* Include `target="_blank"` with `rel="noopener noreferrer"` for external links.
* Handle empty states gracefully (for example, when no technologies are provided).
* Keep styling with Tailwind utility classes to match the existing codebase and ensure consistency.
