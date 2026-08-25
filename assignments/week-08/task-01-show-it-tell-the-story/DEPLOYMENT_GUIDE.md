# Deployment Guide

**Project:** Portfolio Website - Plant Your Flag
**Date:** 2026-08-24

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- [Git](https://git-scm.com/) installed
- [Vercel](https://vercel.com/) account (free tier works)
- GitHub repository access

## Step 1: Install Dependencies

```bash
cd task-02-plant-your-flag-domain-and-badge
npm install
```

## Step 2: Verify Build

```bash
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Generating static pages
Route (app)
├ ○ /
├ ○ /about
├ ○ /contact
├ ○ /projects
├ ○ /skills
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /_not-found
```

## Step 3: Deploy to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework Preset: **Next.js**
4. Root Directory: `assignments/week-07/task-02-plant-your-flag-domain-and-badge`
5. Click **Deploy**

## Step 4: Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-portfolio.vercel.app` | Production |
| `NEXT_PUBLIC_APP_NAME` | `Developer Portfolio` | Production |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `your.email@example.com` | Production |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production |

## Step 5: Custom Domain (Optional)

See `DOMAIN_SETUP.md` for detailed instructions.

## Step 6: Post-Deployment Verification

1. Visit your Vercel URL
2. Check all pages load correctly
3. Verify `/robots.txt` is accessible
4. Verify `/sitemap.xml` is accessible
5. Test contact form submission
6. Check mobile responsiveness
7. Run Lighthouse audit

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ is installed
- Run `npm install` again
- Check for TypeScript errors: `npx tsc --noEmit`

### Images Not Loading
- Verify images exist in `public/images/`
- Check `next.config.ts` image configuration

### SEO Issues
- Verify `site.ts` has correct URL
- Check `metadataBase` in `layout.tsx`
- Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
