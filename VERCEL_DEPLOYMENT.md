# Vercel Deployment Guide - Full MERN Stack

This guide covers deploying both your React client and Node.js server to Vercel.

## Architecture Overview

```
Vercel (Single Project)
├── Frontend: React/Vite app (deployed as web)
└── Backend: Node.js API (deployed as serverless functions)
```

---

## Prerequisites

- Vercel account (free at [vercel.com](https://vercel.com))
- GitHub repository with your code pushed
- MongoDB Atlas connection string
- Google Gemini API key

---

## Step 1: Push Code to GitHub

```bash
cd "GEN AILERNER"
git add -A
git commit -m "Setup for Vercel deployment"
git push origin main
```

---

## Step 2: Create Root Configuration Files

We've provided `vercel.json` at the root level. This handles:

- Building the client (React)
- Routing API requests to serverless functions
- Setting up the development environment

Key configuration in `vercel.json`:

- **buildCommand**: Installs dependencies for both client and server, then builds the client
- **installCommand**: Installs dependencies in root, server, and client
- **functions**: Configures the server/index.js as a serverless function
- **rewrites**: Routes `/api/*` requests to the serverless backend

---

## Step 3: Deploy to Vercel - GitHub Integration

### Option A: Import from Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo containing the project
4. Vercel should automatically detect:
   - **Root Directory**: Leave empty (uses vercel.json)
   - **Framework Preset**: React
   - **Build & Output Settings**: Auto-detected from vercel.json
5. Click **"Import"**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd "GEN AILERNER"

# Deploy
vercel

# Follow interactive prompts:
# - Link to existing Vercel project or create new
# - Accept detected settings
# - Deploy
```

---

## Step 4: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/aileraner?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
CLIENT_URL=https://your-vercel-deployment.vercel.app
```

4. Make sure to set **Environment** for each variable:
   - Check: `Production`
   - Check: `Preview`
   - Check: `Development`

5. Click **"Save"**

---

## Step 5: Redeploy with Environment Variables

After setting environment variables:

1. Click **"Deployments"** tab
2. Find the last deployment
3. Click the **"..."** menu → **"Redeploy"**
4. Confirm redeploy

---

## Step 6: Update Client Environment (Optional)

For local development, update `client/.env`:

```
VITE_API_URL=https://your-vercel-deployment.vercel.app/api
```

For production, Vercel automatically handles this via build-time variables set in `vercel.json`.

---

## Step 7: Test Your Deployment

1. Once deployment completes, get your Vercel URL (e.g., `https://aileraner.vercel.app`)
2. Visit the URL in browser
3. Test critical paths:
   - **Homepage**: `/`
   - **Register/Login**: `/register`, `/login`
   - **Dashboard**: `/dashboard` (requires auth)
   - **API Health**: Check browser console for API errors

---

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution**: Ensure `vercel.json` correctly specifies the installCommand that installs dependencies in all folders.

```json
"installCommand": "npm install && cd server && npm install && cd ../client && npm install"
```

### Issue: API requests returning 404

**Solution**:

1. Check that `VITE_API_URL` matches your Vercel deployment URL + `/api`
2. Verify rewrites in `vercel.json` redirect `/api/*` correctly
3. Check Vercel logs: **Deployments** → **Runtime Logs** → **Logs**

### Issue: Environment variables not applied

**Solution**:

1. Verify variables are set for all environments (Production, Preview, Development)
2. Redeploy after updating variables
3. Check Vercel build logs for variable presence

### Issue: MongoDB connection failing

**Solution**:

1. Verify `MONGO_URI` is correct in Vercel environment variables
2. Ensure IP whitelist on MongoDB Atlas includes Vercel's IPs (use `0.0.0.0/0` for testing—restrict later)
3. Check connection string format

---

## Monitoring & Logs

### View Deployment Logs

1. Go to Vercel project dashboard
2. Click **Deployments** tab
3. Click the deployment you want to inspect
4. Click **Runtime Logs** to see server-side errors
5. Use browser DevTools **Console** for client errors

### Monitor Performance

1. Click **Analytics** tab
2. View:
   - Response times
   - Error rates
   - Request distribution

---

## Updating After Deployment

When you push changes to GitHub:

1. Vercel automatically triggers a new build
2. Deployment runs using the same configuration
3. Environment variables are preserved
4. No manual steps needed

---

## Rollback

If a deployment breaks production:

1. Go to **Deployments** tab
2. Find a previous working deployment
3. Click **"..."** → **"Promote to Production"**

---

## Next Steps

- Add custom domain: **Settings** → **Domains**
- Enable analytics: **Analytics** tab
- Set up preview deployments for pull requests (automatic)
- Monitor real-time errors with error tracking integration

---

## Support

For issues:

- Check Vercel logs: Dashboard → Deployments → Runtime Logs
- Review [Vercel Docs](https://vercel.com/docs)
- Check MongoDB Atlas IP whitelist
- Verify all environment variables are set
