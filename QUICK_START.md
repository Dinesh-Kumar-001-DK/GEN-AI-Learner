# Aileraner — Quick Start Guide

## 🚀 Quick Start (5 Minutes)

### 1. Install Prerequisites
```bash
# Check if installed
node --version    # Should show v18+
npm --version     # Should show v10+
```

If not installed, download from https://nodejs.org/

---

### 2. Clone & Navigate
```bash
git clone https://github.com/Dinesh-Kumar-001-DK/GEN-AI-Learner.git
cd GEN-AILERNER
```

---

### 3. Configure Environment
Create `server/.env` file:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/aileraner?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key (optional)
PORT=5000
```

> 📝 **Get MongoDB URI:** MongoDB Atlas → Clusters → Connect → Connect your application

---

### 4. Install & Run Backend
```bash
# Terminal 1
cd server
npm install
npm run dev
```

✅ Should see: `🛫 Aileraner server running on port 5000`

---

### 5. Install & Run Frontend
```bash
# Terminal 2
cd client
npm install
npm run dev
```

✅ Should see: `➜ Local: http://localhost:5173/`

---

### 6. Seed Database (Optional)
```bash
# In server terminal
npm run seed
```

✅ Creates demo data including user: `demo@aileraner.com` / `demo123`

---

## 📱 Access the App

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:5000 |

---

## 🔑 Demo Account

```
Email: demo@aileraner.com
Password: demo123
```

Or register a new account at `/register`

---

## ✨ Test Features

| Feature | URL |
|---------|-----|
| Home | http://localhost:5173 |
| Login | http://localhost:5173/login |
| Register | http://localhost:5173/register |
| Courses | http://localhost:5173/courses |
| Dashboard | http://localhost:5173/dashboard |
| AI Tutor | http://localhost:5173/ai-tutor |
| Note Intelligence | http://localhost:5173/note-intelligence |
| Flight Analytics | http://localhost:5173/flight-analytics |
| Career Navigator | http://localhost:5173/career-navigator |
| Progress | http://localhost:5173/progress |

---

## 🔧 Common Fixes

### MongoDB Connection Error
```env
# Make sure MONGO_URI starts with mongodb:// or mongodb+srv://
MONGO_URI=mongodb+srv://...
```

### Port Already in Use
```bash
# Change port in vite.config.js
server: { port: 3000 }
```

### Restart After Changes
```bash
# Just save the file - nodemon/vite auto-restarts
```

---

## 📦 API Endpoints Quick Reference

```bash
# Health
GET http://localhost:5000/api/health

# Auth
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login

# Courses
GET http://localhost:5000/api/courses
GET http://localhost:5000/api/courses/:id
POST http://localhost:5000/api/courses/:id/enroll

# Progress (requires auth)
GET http://localhost:5000/api/progress
PUT http://localhost:5000/api/progress/:courseId

# Sessions
GET http://localhost:5000/api/sessions

# Quizzes
GET http://localhost:5000/api/quizzes/:courseId
POST http://localhost:5000/api/quizzes/:id/submit
```

---

## 🎯 One-Line Setup (Copy-Paste)

```bash
# Complete setup in one go (after creating .env)
cd server && npm install && npm run seed & cd ../client && npm install && npm run dev
```

---

## 📞 Need Help?

Check `SETUP_GUIDE.md` for detailed instructions or visit:
https://github.com/Dinesh-Kumar-001-DK/GEN-AI-Learner

---

*Quick Start v1.0 — Aileraner*
