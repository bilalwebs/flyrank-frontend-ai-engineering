
# 1. Component Purpose

`ProjectCard` displays a single portfolio project — title, description, tech stack, and links to the GitHub repo and/or live demo. It needs to render correctly even when some data is incomplete (e.g., a project with no live demo yet), and match the plain, utility-first Tailwind style used by `SkillCard` and `CertificateCard`.

# 2. File Location

```
components/ProjectCard.tsx
```

# 3. Props Interface

| Prop            | Type         | Why it's needed                                     |
| --------------- | ------------ | --------------------------------------------------- |
| `title`       | `string`   | Project name — required, always shown              |
| `description` | `string`   | Short summary of the project                        |
| `techStack`   | `string[]` | List of technologies used, rendered as tags         |
| `githubUrl`   | `string?`  | Optional — not every project is public/open-source |
| `liveUrl`     | `string?`  | Optional — not every project has a live deployment |

Both link props are optional so the component doesn't break or render dead links when a project is still in progress or private.

# 4. Edge Cases Handled

- **Missing GitHub link** → link is simply not rendered.
- **Missing live demo link** → link is simply not rendered.
- **Empty tech stack** → tag list section is omitted rather than rendering an empty row.
- **Long description** → uses `line-clamp-3` so cards stay a consistent height in a grid.
- **Neither link present** → footer link row collapses entirely (no empty div).

# 5. Accessibility Considerations

- Links use `rel="noopener noreferrer"` and `target="_blank"` since they leave the site.
- Each link has an accessible label via `aria-label` (icons/text alone can be ambiguous).
- Semantic heading (`h3`) for the title so screen readers can navigate cards in a list.

# 6. Complete Component Code

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">
        {title}
      </h3>
      <p className="mt-1 text-gray-500 line-clamp-3">
        {description}
      </p>

      {techStack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-2 py-0.5 text-xs text-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {(githubUrl || liveUrl) && (
        <div className="mt-4 flex gap-4 text-sm font-medium">
          {githubUrl && (
          
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} source code on GitHub`}
              className="text-gray-700 underline-offset-2 hover:underline"
            >
              GitHub
            </a>
          )}
          {liveUrl && (
          
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${title}`}
              className="text-blue-600 underline-offset-2 hover:underline"
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

# 7. Usage Example

```tsx
<ProjectCard
  title="FlyRank Analytics Dashboard"
  description="A real-time analytics dashboard built during my FlyRank internship, visualizing SEO and traffic metrics with interactive charts."
  techStack={["Next.js", "TypeScript", "Tailwind CSS", "Recharts"]}
  githubUrl="https://github.com/yourname/flyrank-dashboard"
  liveUrl="https://flyrank-dashboard.vercel.app"
/>

{/* Project without a live demo yet */}
<ProjectCard
  title="Internal Tooling CLI"
  description="A command-line tool for automating repetitive frontend build tasks."
  techStack={["Node.js", "TypeScript"]}
  githubUrl="https://github.com/yourname/tooling-cli"
/>
```

# 8. Best Practices Followed

- **Consistent style**: matches the `interface`/`export function` pattern and Tailwind conventions of `SkillCard`/`CertificateCard`.
- **Optional props over defensive checks everywhere**: `?` types make intent clear at the call site.
- **Graceful degradation**: no broken links, no empty tag rows.
- **Reusability**: no hardcoded content — works for any project data shape from a CMS, JSON file, or array.
- **`key={tech}`** assumes unique tech names per card; if duplicates are possible, switch to `key={index}` or `${tech}-${index}`.
- **`line-clamp-3`** requires the Tailwind typography/line-clamp plugin (built into Tailwind v3.3+) — worth confirming it's enabled in your config.
