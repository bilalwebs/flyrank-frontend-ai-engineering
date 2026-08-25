# Portfolio Update Guide

Step-by-step instructions for adding a new project to the portfolio.

---

## Step 1: Create Project Data Entry

**File:** `data/portfolio.ts`

Add a new object to the `projects[]` array:

```typescript
{
  title: "AI Productivity Assistant",
  description:
    "A full-stack web app with an AI assistant that manages tasks, analyzes productivity patterns, and suggests daily priorities using natural language commands.",
  image: "/images/project-productivity.svg",
  tags: ["Next.js", "TypeScript", "OpenAI", "Prisma", "PostgreSQL"],
  githubUrl: "https://github.com/bilalwebs/ai-productivity-assistant",
  liveUrl: "https://ai-productivity.vercel.app",
  featured: true,
},
```

**Rules:**
- `title` — Maximum 3-4 words
- `description` — 1-2 sentences, focus on what it does, not how
- `image` — Path relative to `public/`
- `tags` — Maximum 5 technologies, most impressive first
- `githubUrl` — Real GitHub repo URL
- `liveUrl` — Real deployed URL (or omit if not deployed)
- `featured: true` — Only 2 projects should be featured maximum

**Order matters:** Projects render in array order. Put the most impressive project first.

---

## Step 2: Add Project Image/Assets

**Location:** `public/images/`

Options for project images:

### Option A: SVG (Recommended for simple graphics)
```bash
# Create a simple project illustration
# Name it: project-[name].svg
# Example: project-productivity.svg
```

### Option B: PNG/JPG (For screenshots)
```bash
# Take a screenshot of the running app
# Resize to 1200x630 (OG image ratio)
# Compress with TinyPNG or Squoosh
# Name it: project-[name].png
```

### Option C: External URL (Not recommended)
Change the `image` field to an absolute URL. But this adds an external dependency and may break.

**Image requirements:**
- Format: SVG preferred, PNG/WebP acceptable
- Aspect ratio: 16:9 (1200x630 works well)
- File size: Under 200KB
- Naming: `project-[kebab-case-name].svg`

---

## Step 3: Create Case Study Content

For each new project, write a brief case study following the three-beat structure:

**File:** Create `CASE_STUDY_[NAME].md` in the project root (optional, for documentation)

### Required sections:

1. **Problem** (2-3 sentences)
   - What existed before
   - Why it needed to change

2. **Solution** (3-5 sentences)
   - What was built
   - Key technical decisions
   - Why those technologies

3. **Results** (2-3 sentences)
   - Measurable outcomes
   - What was learned

---

## Step 4: Add GitHub/Live Links

**GitHub Repository:**
- Repository must be public (recruiters check repos)
- Add a proper README with screenshots
- Include setup instructions
- Clean commit history (squash messy commits)

**Live Demo:**
- Deploy to Vercel (free, fast, reliable)
- Use a custom subdomain if possible (e.g., `project.vercel.app`)
- Ensure it works without authentication for demo purposes
- Add a README with demo credentials if auth is required

**In `data/portfolio.ts`:**
```typescript
githubUrl: "https://github.com/bilalwebs/[repo-name]",
liveUrl: "https://[project].vercel.app",
```

If the project is not deployed, omit `liveUrl`. If it has no public repo, omit `githubUrl`. Never link to a broken or private repo.

---

## Step 5: Test Responsive Design

After adding the project, verify it renders correctly:

### Desktop (> 1024px)
- [ ] Project card shows image, title, description, tags, links
- [ ] Featured project has larger layout
- [ ] Grid shows 2-3 columns

### Tablet (768px - 1024px)
- [ ] Cards stack to 2 columns
- [ ] Images resize proportionally
- [ ] Text remains readable

### Mobile (< 768px)
- [ ] Cards stack to single column
- [ ] Images don't overflow
- [ ] Touch targets are large enough (44x44px)
- [ ] No horizontal scrolling

### Test commands:
```bash
npm run dev
# Open http://localhost:3000/projects
# Use Chrome DevTools responsive mode
# Test at 320px, 375px, 768px, 1024px, 1440px
```

---

## Step 6: Deploy Update

### Pre-deployment checklist:
- [ ] `npm run lint` passes (0 errors, 0 warnings)
- [ ] `npm run build` succeeds
- [ ] All pages render correctly
- [ ] New project appears on /projects page
- [ ] Featured projects appear on homepage
- [ ] Images load correctly
- [ ] Links open correct URLs

### Deployment:

**Vercel (if connected to GitHub):**
```bash
git add .
git commit -m "feat: add [project name] to portfolio"
git push origin master
# Vercel auto-deploys on push to master
```

**Manual deployment:**
```bash
vercel --prod
```

### Post-deployment verification:
- [ ] Visit live site
- [ ] Check /projects page
- [ ] Verify new project card
- [ ] Click GitHub link (opens repo)
- [ ] Click live link (opens deployed app)
- [ ] Test on mobile device
- [ ] Run Lighthouse audit (score > 90)

---

## File Reference

| File | Purpose | When to Edit |
|------|---------|--------------|
| `data/portfolio.ts` | All project data | Every time a project is added |
| `public/images/` | Project images | Every time a project is added |
| `types/index.ts` | TypeScript interfaces | Only if project schema changes |
| `components/ui/ProjectCard.tsx` | Card component | Only if card design changes |
| `components/sections/FeaturedProject.tsx` | Featured layout | Only if featured layout changes |
| `components/sections/ProjectsGrid.tsx` | Grid layout | Only if grid layout changes |
| `app/projects/page.tsx` | Projects page | Only if page structure changes |

---

## Maintenance Schedule

| Frequency | Task |
|-----------|------|
| After every project | Add to portfolio (this guide) |
| Monthly | Review and update project descriptions |
| Quarterly | Update skill levels in `skillGroups` |
| Biannually | Refresh hero tagline and bio |
| Annually | Full portfolio review and redesign consideration |
