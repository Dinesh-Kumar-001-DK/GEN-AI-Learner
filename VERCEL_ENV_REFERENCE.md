# Vercel Deployment - Environment Variables Reference

## 🔑 Environment Variables Needed for Vercel

### Backend Variables (Required)

#### 1. `MONGO_URI`

**Purpose**: Connect to MongoDB database

**Format**:

```
mongodb+srv://username:password@cluster.mongodb.net/aileraner?retryWrites=true&w=majority
```

**How to get**:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"** → **"Node.js"**
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<password>` with actual values

**Example**:

```
mongodb+srv://user@cluster.mongodb.net/aileraner?retryWrites=true&w=majority
```

---

#### 2. `JWT_SECRET`

**Purpose**: Sign and verify JSON Web Tokens for authentication

**Format**: Any random strong string (minimum 32 characters recommended)

**How to generate**:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL (Windows PowerShell)
openssl rand -hex 32
```

**Example**:

```
a7f8c2d9e1b4f6c3a8d1e2f9c4b7a6d3e1f2c9b8a7d6e5f4c3b2a1d0e9f8c7
```

---

#### 3. `GEMINI_API_KEY`

**Purpose**: Access Google Gemini 2.5 API for AI features

**How to get**:

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click **"Create API Key"**
3. Copy the key

**Example**:

```
AIzaSyAbc123_def456ghi789jkl012mnop345q
```

---

#### 4. `NODE_ENV`

**Purpose**: Tell Node.js this is production

**Value**: `production` (fixed)

---

#### 5. `CLIENT_URL`

**Purpose**: Allow CORS requests from your frontend

**Format**: Your Vercel deployment URL

**Example**:

```
https://aileraner.vercel.app
```

---

### Optional Variables

#### `PORT`

**Purpose**: Server port (Vercel assigns automatically)
**Value**: Leave empty (Vercel handles this)

---

## 🛠️ Setting Variables in Vercel

### Method 1: During Project Import (Easiest)

When importing, you'll see a form asking for environment variables:

1. Enter each variable name and value
2. Click **"Add Another"** to add more
3. Click **"Deploy"** to start with variables

### Method 2: After Deployment (Anytime)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click **"Settings"** (top menu)
4. Click **"Environment Variables"** (left sidebar)
5. Click **"Add New"**
6. Enter variable name and value
7. Select environments:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
8. Click **"Save"**
9. **Important**: Redeploy after updating variables

---

## 📋 Checklist: Do Before Adding Variables

- [ ] MongoDB Atlas cluster created and running
- [ ] MongoDB username and password configured
- [ ] API key/credentials obtained for all 3rd-party services
- [ ] Generated a strong random string for JWT_SECRET
- [ ] Have your GitHub repo connected to Vercel

---

## ⚠️ Security Best Practices

1. **Never commit `.env` files** to GitHub
2. **Never put real credentials in code**
3. **Use `.env.example`** to document what variables are needed
4. **Rotate secrets regularly** in production
5. **Restrict MongoDB IP access** after testing:
   - Initially: Allow `0.0.0.0/0` for testing
   - Production: Whitelist only Vercel's IPs
   - [Vercel IP Ranges](https://vercel.com/docs/concepts/edge-network/regions)

---

## 🔐 Testing Variables Are Working

After deploying with variables set:

1. Open your app: `https://your-app.vercel.app`
2. Try to:
   - Register a new user (tests DB connection)
   - Login (tests JWT)
   - Use AI Tutor (tests Gemini API)
3. Open DevTools **Console** and look for errors
4. Check Vercel **Runtime Logs** if something breaks

---

## 🚨 If Variables Aren't Working

1. **Restart/Redeploy**:
   - Go to **Deployments**
   - Click latest → click **"..."** → **"Redeploy"**
   - Variables take effect on new deployment

2. **Check Variables Are Set Correctly**:
   - Go to **Settings** → **Environment Variables**
   - Verify each value is correct
   - Make sure Production environment is checked

3. **Check Code Reads Variables**:
   - In your server code, variables should be read like:

   ```javascript
   const mongoUri = process.env.MONGO_URI;
   const secret = process.env.JWT_SECRET;
   ```

4. **Check Vercel Logs**:
   - Go to **Deployments** → latest deployment
   - Click **"Runtime Logs"**
   - Look for messages like:
   ```
   MONGO_URI: mongodb+srv://...
   JWT_SECRET: ••••••••
   ```

---

## 🆘 Variable Troubleshooting

| Problem                       | Solution                                                           |
| ----------------------------- | ------------------------------------------------------------------ |
| "Cannot connect to MongoDB"   | Check MONGO_URI, check MongoDB IP whitelist includes Vercel        |
| "Invalid API key"             | Regenerate GEMINI_API_KEY, copy exactly without extra spaces       |
| "JWT verification failed"     | JWT_SECRET must be **exact same string** used when creating tokens |
| "CORS error"                  | Check CLIENT_URL matches your Vercel domain exactly                |
| "Variables still not working" | Redeploy after changing variables, wait 2-3 minutes                |

---

## 📚 Related Documentation

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)
- [Google Gemini API Setup](https://ai.google.dev/tutorials/setup)
- [Vercel IP Ranges for Whitelisting](https://vercel.com/docs/concepts/edge-network/regions)
