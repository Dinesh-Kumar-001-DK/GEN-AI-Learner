# Vercel Deployment Checklist

## Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB IP whitelist configured (allow `0.0.0.0/0` for testing)
- [ ] Google Gemini API key obtained
- [ ] JWT secret key created (use a strong random string: `openssl rand -hex 32`)
- [ ] All required environment variables noted

## Vercel Setup

- [ ] Vercel account created at [vercel.com](https://vercel.com)
- [ ] GitHub repository connected to Vercel
- [ ] Project imported into Vercel

## Environment Variables Setup

In Vercel Project Settings → Environment Variables, add:

- [ ] `MONGO_URI` — MongoDB connection string
- [ ] `JWT_SECRET` — JWT signing secret
- [ ] `GEMINI_API_KEY` — Google Gemini API key
- [ ] `NODE_ENV` — Set to `production`
- [ ] `CLIENT_URL` — Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

**Important**: Select environments:

- [ ] Production
- [ ] Preview
- [ ] Development

## Deployment

- [ ] Click "Deploy" or wait for automatic deployment on git push
- [ ] Monitor deployment progress in Vercel dashboard
- [ ] Check Runtime Logs for errors
- [ ] Verify build completed successfully

## Post-Deployment Testing

- [ ] Visit site homepage at your Vercel URL
- [ ] Test user registration at `/register`
- [ ] Test user login at `/login`
- [ ] Test dashboard at `/dashboard` (requires valid auth)
- [ ] Test AI Tutor chat functionality
- [ ] Check browser console for API errors
- [ ] Verify API calls reach backend (check Network tab in DevTools)

## Troubleshooting

If deployment fails:

1. Check **Deployments** → **Runtime Logs** for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas IP whitelist includes Vercel's IPs
4. Check `vercel.json` syntax is correct
5. Redeploy after fixing issues

## Quick Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# View logs
vercel logs <deployment-url>

# List deployments
vercel list

# Remove deployment
vercel rm <deployment-id>
```

## Getting Your Vercel URL

After successful deployment:

1. Go to Vercel dashboard
2. Select your project
3. Find your production URL under **Project Settings** → **Domains**
4. Or it's shown at the top of the deployment page

---

**Tip**: Each git push to your connected GitHub repo automatically triggers a new deployment!
