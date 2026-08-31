# Deployment Checklist

## Pre-Deployment
- [ ] All tests passing (`npm run test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No lint errors (`npm run lint`)
- [ ] Environment variables configured

## Environment Variables
Set in Vercel dashboard:
```
AI_PROVIDER=groq
GROQ_API_KEY=your-key
GROQ_MODEL=openai/gpt-oss-20b
```

## Deployment Steps
1. Push to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
4. Set environment variables
5. Deploy

## Post-Deployment
- [ ] Verify landing page loads
- [ ] Test interview creation flow
- [ ] Verify AI responses work
- [ ] Check dashboard displays data
- [ ] Test responsive design
- [ ] Verify accessibility (keyboard nav, screen reader)

## Rollback Strategy
1. Go to Vercel dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Or: `npx vercel --prod` with previous commit

## Monitoring
- Check Vercel function logs for AI API errors
- Monitor Groq/Gemini API usage and limits
- Review error boundaries in production
