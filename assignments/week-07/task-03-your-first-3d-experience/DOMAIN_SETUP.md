# Domain Setup Guide

**Project:** Portfolio Website - Plant Your Flag
**Date:** 2026-08-24

## Overview

This guide covers custom domain configuration after deployment to Vercel.

## Prerequisites

- Site deployed to Vercel
- Custom domain purchased (e.g., from Namecheap, GoDaddy, Google Domains)
- Access to domain DNS settings

## Step 1: Add Domain to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Enter your custom domain (e.g., `yourdomain.com`)
3. Click **Add**

## Step 2: Configure DNS

### Option A: Use Vercel DNS (Recommended)

1. Change nameservers to Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
2. Wait for propagation (up to 48 hours)

### Option B: Use External DNS

Add these records at your domain provider:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | 60 |
| CNAME | www | `cname.vercel-dns.com` | 60 |

## Step 3: Update site.ts

After domain is configured, update `data/site.ts`:

```typescript
export const siteConfig: SiteConfig = {
  // ...
  url: "https://yourdomain.com",
  // ...
}
```

## Step 4: Update Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 5: Verify HTTPS

1. Visit `https://yourdomain.com`
2. Check for padlock icon in browser
3. Verify certificate is valid

## Step 6: Update References

Update these files with your new domain:

1. `data/site.ts` - `url` field
2. `app/robots.ts` - sitemap URL (auto-generated from siteConfig)
3. `app/sitemap.ts` - URLs (auto-generated from siteConfig)
4. `app/layout.tsx` - canonical URL (auto-generated from siteConfig)

## Subdomains

For subdomains (e.g., `portfolio.yourdomain.com`):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | portfolio | `cname.vercel-dns.com` | 60 |

## SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. No manual configuration needed.

## Redirects

To redirect `www` to apex domain (or vice versa):

1. Go to Vercel Dashboard → Settings → Domains
2. Click on the domain you want to redirect
3. Select **Redirect to** option

## DNS Propagation

Use these tools to check propagation:
- [dnschecker.org](https://dnschecker.org/)
- [whatsmydns.net](https://www.whatsmydns.net/)

## Troubleshooting

### Domain Not Working
- Verify DNS records are correct
- Wait up to 48 hours for propagation
- Check Vercel deployment status

### SSL Certificate Error
- Ensure domain is verified in Vercel
- Wait for certificate provisioning (usually < 24 hours)

### Mixed Content Warnings
- Ensure all resources use HTTPS
- Check for hardcoded `http://` URLs in code
