# Vercel 500 Error Fix - Serverless Function Crash

## 🚨 Error Message

```
500: INTERNAL_SERVER_ERROR
Code: FUNCTION_INVOCATION_FAILED
This Serverless Function has crashed.
```

---

## ✅ What I Fixed

Your server was set up for traditional Node.js hosting with `app.listen()`, but Vercel serverless functions need a different approach.

### Changes Made:

1. **Modified `/server/index.js`**:
   - Removed `app.listen()` from production
   - Added `module.exports = app` to export the Express app
   - Now only listens locally when `NODE_ENV !== 'production'`

2. **Updated `/vercel.json`**:
   - Fixed rewrite rule to point to `/server/index.js` directly
   - Added proper environment variable configuration
   - Added redirect for base `/api` route

---

## 🔧 Next Steps to Deploy

### Step 1: Push Changes to GitHub

```bash
cd "c:\Users\dinesh\OneDrive\Desktop\GEN AILERNER"
git add -A
git commit -m "Fix serverless function for Vercel deployment"
git push origin main
```

✅ Vercel will automatically redeploy

### Step 2: Monitor Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Watch **Deployments** tab
4. Wait for deployment to complete (should show ✅ Ready)

### Step 3: Check Logs

If deployment still fails:

1. Click the failed deployment
2. Click **"Runtime Logs"** tab
3. Look for error messages like:
   - `MONGO_URI is undefined` → Check environment variables
   - `Cannot connect to MongoDB` → Check MongoDB IP whitelist
   - `Module not found` → Check `npm install` ran correctly

---

## 🧪 Testing After Fix

### Test 1: Check API Health

```
Visit: https://your-vercel-url.vercel.app/api/health

Expected Response:
{
  "status": "ok",
  "message": "Aileraner API is running"
}
```

### Test 2: Test Auth Endpoint

```
POST: https://your-vercel-url.vercel.app/api/auth/register

Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

Expected: 200 or 400 (if email exists), NOT 500
```

### Test 3: Check Frontend

```
Visit: https://your-vercel-url.vercel.app
- Page should load
- Open DevTools (F12) → Console
- No red errors should appear
```

---

## 🐛 If Still Getting 500 Error

### Check 1: Environment Variables

1. Go to Vercel project **Settings** → **Environment Variables**
2. Verify all are set:
   - [ ] `MONGO_URI` is correct
   - [ ] `JWT_SECRET` is set
   - [ ] `GEMINI_API_KEY` is set
   - [ ] `NODE_ENV` = `production`
   - [ ] `CLIENT_URL` is set to your Vercel URL

3. If changed any variables:
   - Go to **Deployments**
   - Click latest → **"..."** menu → **"Redeploy"**

### Check 2: MongoDB Connection

MongoDB Atlas IP whitelist must include Vercel:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click your cluster
3. **Network Access** → **IP Whitelist**
4. For testing, add: `0.0.0.0/0` (allows all IPs)
5. For production, keep it restricted

### Check 3: Check Server Startup

Verify dependencies are installed:

```bash
cd server
npm install
```

Local test before pushing:

```bash
cd server
npm start
# Should see: 🛫 Aileraner server running on port 5000
```

### Check 4: Verify Routes

Make sure all route files exist:

- [ ] `server/routes/auth.js` ✓
- [ ] `server/routes/users.js` ✓
- [ ] `server/routes/courses.js` ✓
- [ ] `server/routes/progress.js` ✓
- [ ] `server/routes/sessions.js` ✓
- [ ] `server/routes/quizzes.js` ✓
- [ ] `server/routes/ai.js` ✓

If any route file is missing, that will cause the crash.

---

## 📊 Common 500 Errors & Solutions

| Error in Logs                   | Cause                             | Solution                                |
| ------------------------------- | --------------------------------- | --------------------------------------- |
| `Cannot find module 'mongoose'` | Dependencies not installed        | Run `npm install` in server dir         |
| `Cannot connect to mongodb`     | Bad MONGO_URI or IP blocked       | Check URI, whitelist Vercel IP in Atlas |
| `JWT_SECRET is undefined`       | Env var not set                   | Add to Vercel Environment Variables     |
| `ECONNREFUSED`                  | Can't connect to external service | Check MongoDB Atlas online status       |
| `SyntaxError in routes/auth.js` | Bad code syntax                   | Fix syntax errors, test locally         |
| `Cannot resolve 'dotenv'`       | dotenv not installed              | Add to package.json and reinstall       |

---

## 🚀 Complete Debugging Checklist

- [ ] All files pushed to GitHub (`git push origin main`)
- [ ] Vercel automatically detected new deployment
- [ ] **Wait 2-3 minutes** for deployment to complete
- [ ] All environment variables set in Vercel
- [ ] MongoDB Atlas running and accessible
- [ ] MongoDB IP whitelist includes Vercel (or 0.0.0.0/0)
- [ ] No syntax errors in server code (test locally)
- [ ] All route files exist in `/server/routes/`
- [ ] All dependencies listed in `/server/package.json`

---

## 💡 Local Testing Before Deploy

Before pushing to Vercel, always test locally:

```bash
# Terminal 1: Server
cd server
npm install
npm start
# Should see: 🛫 Aileraner server running on port 5000

# Terminal 2: Client
cd client
npm run dev
# Should see: http://localhost:5173

# Test in browser at localhost:5173
# Open DevTools Console → should not have red errors
```

If local works, remote should too (assuming env vars are set).

---

## 🔄 After Fix is Applied

1. Your code changes were automatically pushed (should see new deployment in Vercel)
2. Wait for Vercel to rebuild and deploy
3. Check Runtime Logs for errors
4. Test the `/api/health` endpoint
5. If working, test full features (register, login, etc.)

---

## 📞 Contact & Support

If you're still getting 500 errors after these steps:

1. **Check Vercel Logs**:
   - Go to Deployment → Runtime Logs
   - Copy the full error message

2. **Check MongoDB Connection**:
   - Go to MongoDB Atlas
   - Connection → Verify connection string
   - Check if cluster is paused (it expires after 30 days of use)

3. **Test API Locally First**:
   ```bash
   cd server
   npm install
   npm start
   # Test with Postman or curl
   ```

---

## ✨ You're Almost There!

The 500 error is usually fixed by:

1. Exporting the Express app (✅ Done)
2. Setting environment variables (Check Vercel settings)
3. Ensuring MongoDB is accessible (Check Atlas IP whitelist)

Deploy again and you should be good! 🎉
