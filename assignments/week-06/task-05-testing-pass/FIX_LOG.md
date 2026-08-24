# Fix Log - Task-05: Testing Pass

## Issue #1: IntersectionObserver is not defined

**Error:** `ReferenceError: IntersectionObserver is not defined`
**Cause:** Framer Motion uses `IntersectionObserver` for `whileInView` animations, which is not available in jsdom
**Fix:** Added `MockIntersectionObserver` class in `__tests__/setup.ts`
**File:** `__tests__/setup.ts`

## Issue #2: Duplicate text elements found

**Error:** `Found multiple elements with the text: Advanced`
**Cause:** Multiple skills share the same proficiency level ("Advanced" appears 4 times)
**Fix:** Changed `getByText` to `getAllByText` with `.length` assertion
**Files:** `SkillsSection.test.tsx`, `ProjectsSection.test.tsx`

## Issue #3: Brand name mismatch

**Error:** `Unable to find an element with the text: Bilal`
**Cause:** Header renders `PROFILE.name.split(" ")[0]` which is "Muhammad", not "Bilal"
**Fix:** Updated test to expect "Muhammad" instead of "Bilal"
**File:** `Header.test.tsx`

## Issue #4: Section heading multiple matches

**Error:** `Found multiple elements with the text: /projects/i`
**Cause:** "Projects" appears in both the heading and the description paragraph
**Fix:** Used `getByRole("heading", { level: 2 })` to target only the heading element
**File:** `ProjectsSection.test.tsx`

## Issue #5: window.scrollTo not implemented

**Warning:** `Error: Not implemented: window.scrollTo` (stderr only)
**Cause:** Framer Motion calls `window.scrollTo` during animation keyframe resolution in jsdom
**Fix:** Harmless warning; does not affect test results. Added `window.scrollTo` mock to setup.ts
**File:** `__tests__/setup.ts`

## Final Status

- 55/55 unit/component tests passing
- 7 E2E tests configured
- CI workflow ready
