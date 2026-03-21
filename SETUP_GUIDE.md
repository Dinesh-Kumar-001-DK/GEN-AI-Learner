# Aileraner — Setup & Installation Guide

## Prerequisites

Before running the project, ensure you have the following installed on your system:

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | 18.x or higher | https://nodejs.org/ |
| **npm** | 10.x or higher | (Comes with Node.js) |
| **Git** | Latest | https://git-scm.com/ |
| **MongoDB Atlas Account** | Free Tier | https://www.mongodb.com/atlas |
| **Gemini API Key** | (Optional) | https://makersuite.google.com/app/apikey |

### System Requirements

- **OS**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 2GB free space
- **Internet**: Stable connection for API calls

---

## Environment Setup

### Step 1: Clone the Repository

```bash
# Open terminal/command prompt and run:
git clone https://github.com/Dinesh-Kumar-001-DK/GEN-AI-Learner.git

# Navigate into the project
cd GEN-AILERNER
```

### Step 2: Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account or sign in
3. Create a new cluster:
   - Choose **Free Tier (M0)**
   - Select a region near you
   - Click **Create Cluster**
4. Create a database user:
   - Go to **Security → Database Access**
   - Click **Add New Database User**
   - Set username and password (remember these!)
   - Set privileges: **Read and write to any database**
5. Configure network access:
   - Go to **Security → Network Access**
   - Click **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0)
6. Get your connection string:
   - Go to **Clusters → Connect**
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password

### Step 3: Get Gemini API Key (Optional)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the key (starts with `AIza...`)

---

## Configuration

### Backend Configuration

Navigate to the server directory and create a `.env` file:

```bash
cd server
```

Create `.env` file with the following content:

```env
# MongoDB Atlas Connection String
# Format: mongodb+srv://<username>:<password>@<cluster-url>/<database>?options
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/aileraner?retryWrites=true&w=majority

# JWT Secret Key (any random string for production)
JWT_SECRET=aileraner_super_secret_jwt_key_2024

# Gemini API Key (optional - mock responses work without it)
GEMINI_API_KEY=your_gemini_api_key_here

# Server Port
PORT=5000
```

### Frontend Configuration (Optional)

For production deployment, create `.env` in client directory:

```env
# API URL for production
VITE_API_URL=https://your-backend-url.com/api
```

---

## Installation

### Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Verify installation
npm --version    # Should show version 10.x or higher
node --version   # Should show version 18.x or higher
```

### Install Frontend Dependencies

```bash
# Open a new terminal window (keep backend running)
# Navigate to client directory
cd client

# Install dependencies
npm install
```

---

## Running the Application

### Option 1: Running Locally

#### Terminal 1 - Backend Server

```bash
cd server

# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

Expected output:
```
🛫 Aileraner server running on port 5000
✅ MongoDB Connected: ac-xxxxxx.mongodb.net
```

#### Terminal 2 - Frontend Server

```bash
cd client

# Start development server
npm run dev
```

Expected output:
```
VITE v5.x.x ready in xxx ms
➜  Local: http://localhost:5173/
➜  Network: use --host to expose
```

### Option 2: Running with Scripts

You can create a convenience script. On Windows, create `run.bat`:

```batch
@echo off
echo Starting Aileraner...

start cmd /k "cd %~dp0server && npm run dev"
timeout /t 2
start cmd /k "cd %~dp0client && npm run dev"
echo Aileraner is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
```

On Mac/Linux, create `run.sh`:

```bash
#!/bin/bash
echo "Starting Aileraner..."
gnome-terminal -- npm run dev --prefix server &
sleep 2
npm run dev --prefix client &
```

---

## Database Seeding

Seed the database with sample data (optional but recommended):

```bash
cd server

# This creates sample courses, quizzes, sessions, and demo user
npm run seed
```

Expected output:
```
MongoDB Connected for seeding...
🗑️  Clearing existing data...
📚 Seeding courses...
✅ 6 courses created
📝 Seeding quizzes...
✅ 2 quizzes created
🎥 Seeding sessions...
✅ 4 sessions created
👤 Creating demo user...
✅ Demo user created: demo@aileraner.com / demo123
🎉 Database seeded successfully!
```

---

## Testing the Application

### Test Backend API

Open a new terminal and run:

```bash
# Health check
curl http://localhost:5000/api/health

# Should return: {"status":"ok","message":"Aileraner API is running"}
```

### Test Frontend

1. Open your browser
2. Go to http://localhost:5173
3. You should see the Aileraner landing page

### Test Authentication

1. Go to http://localhost:5173/register
2. Create a new account
3. Or use demo credentials:
   - Email: `demo@aileraner.com`
   - Password: `demo123`

### Test Features

| Feature | URL | Test |
|---------|-----|------|
| Courses | /courses | Browse and filter courses |
| AI Tutor | /ai-tutor | Chat with AI |
| Note Intelligence | /note-intelligence | Analyze notes |
| Flight Analytics | /flight-analytics | View charts |
| Career Navigator | /career-navigator | Check skill gaps |
| Quiz | /quiz/:courseId | Take a quiz |

---

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB Connection Error: Invalid scheme`

**Fix:** Ensure your `MONGO_URI` starts with `mongodb+srv://` or `mongodb://`

**Error:** `MongoDB Connection Error: Authentication failed`

**Fix:** Verify username and password in connection string

**Error:** `MongoDB Connection Error: Network timeout`

**Fix:** Check network access settings in MongoDB Atlas (allow 0.0.0.0/0)

### Frontend Port Already in Use

**Error:** `Port 5173 is in use, trying another one`

**Fix:** Either close the other process or change port in `vite.config.js`

### CORS Errors

**Error:** `Access-Control-Allow-Origin` blocked

**Fix:** Ensure backend CORS is configured for your frontend URL

### Node Modules Issues

**Fix:** Delete `node_modules` and `package-lock.json`, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Project Structure

```
GEN-AILERNER/
├── server/                    # Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   └── errorHandler.js   # Error handling
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Course.js         # Course schema
│   │   ├── Progress.js       # Progress schema
│   │   ├── Session.js       # Session schema
│   │   └── Quiz.js          # Quiz schema
│   ├── routes/
│   │   ├── auth.js          # Auth routes
│   │   ├── users.js         # User routes
│   │   ├── courses.js       # Course routes
│   │   ├── progress.js      # Progress routes
│   │   ├── sessions.js      # Session routes
│   │   ├── quizzes.js       # Quiz routes
│   │   └── ai.js            # AI routes
│   ├── services/
│   │   └── geminiService.js # Gemini API integration
│   ├── .env                 # Environment variables
│   ├── index.js             # Entry point
│   ├── seed.js              # Database seeder
│   └── package.json
│
├── client/                   # Frontend (React + Vite)
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js    # API client
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React contexts
│   │   ├── styles/          # CSS styles
│   │   ├── App.jsx          # Main app
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Common Commands Reference

```bash
# Backend
cd server
npm install              # Install dependencies
npm run dev             # Start development server
npm start               # Start production server
npm run seed            # Seed database

# Frontend
cd client
npm install             # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Git
git add .
git commit -m "message"
git push
git pull
```

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/Dinesh-Kumar-001-DK/GEN-AI-Learner/issues
- Email: (add your email)

---

*Document version 1.0 — Aileraner Setup Guide*
