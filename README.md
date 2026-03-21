# Aileraner — AI-Powered Learning Co-Pilot

A full-stack MERN (MongoDB, Express, React, Node.js) application with an aviation cockpit aesthetic, featuring AI-powered tutoring with Google Gemini 2.5.

![Aileraner](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800)

## Features

- **AI Tutor** — Real-time chat with Gemini 2.5 AI that adapts to your learning level
- **Course Catalog** — Browse, search, and filter expert-led courses
- **Smart Quizzes** — Interactive quizzes with instant feedback
- **Progress Tracking** — Visual roadmap with completion stats
- **Live Sessions** — Scheduled instructor-led learning sessions
- **Career Navigator** — AI-powered skill gap analysis
- **Note Intelligence** — Transform notes into summaries, flashcards, and quizzes
- **Flight Analytics** — Deep insights into your study patterns

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Google Gemini 2.5 API Integration
- bcryptjs for password hashing

### Frontend
- React 18 + Vite
- React Router v6
- Axios for API calls
- Vanilla CSS with design system tokens

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key (optional — mock responses work without it)

### Environment Setup

1. **Backend Configuration**

Create `server/.env` with your credentials:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/aileraner?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

2. **Frontend Configuration** (optional)

Create `client/.env` for production:

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Installation

```bash
# Clone or navigate to the project
cd "GEN AILERNER"

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running Locally

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

### Seeding Database

```bash
cd server
npm run seed
```

This creates:
- 6 sample courses (ML, React, Data Science, DevOps, Deep Learning, System Design)
- 2 quizzes
- 4 live sessions
- Demo user: `demo@aileraner.com` / `demo123`

## Project Structure

```
GEN AILERNER/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Progress.js
│   │   ├── Session.js
│   │   └── Quiz.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── courses.js
│   │   ├── progress.js
│   │   ├── sessions.js
│   │   ├── quizzes.js
│   │   └── ai.js
│   ├── services/
│   │   └── geminiService.js
│   ├── index.js
│   ├── seed.js
│   └── package.json
│
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageTag.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── Panel.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Gauge.jsx
│   │   │   ├── StatusDot.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Button.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── AiTutor.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── Progress.jsx
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` — Create new account
- `POST /api/auth/login` — Login and get JWT token

### Users
- `GET /api/users/me` — Get current user profile
- `PUT /api/users/me` — Update profile

### Courses
- `GET /api/courses` — List all courses (with filters)
- `GET /api/courses/:id` — Get course details
- `POST /api/courses/:id/enroll` — Enroll in course

### Progress
- `GET /api/progress` — Get all user progress
- `GET /api/progress/:courseId` — Get course progress
- `PUT /api/progress/:courseId` — Update progress

### Sessions
- `GET /api/sessions` — List sessions
- `POST /api/sessions/:id/join` — Join session

### Quizzes
- `GET /api/quizzes/:courseId` — Get quiz for course
- `POST /api/quizzes/:id/submit` — Submit quiz answers

### AI (Gemini)
- `POST /api/ai/chat` — AI chat with context
- `POST /api/ai/roadmap` — Generate learning roadmap
- `POST /api/ai/analyze-notes` — Analyze and transform notes
- `POST /api/ai/career-analysis` — Career skill gap analysis

## Design System

The application uses a consistent design system:

### Colors
- `--bg: #050a12` — Page background
- `--surface: #0c1624` — Card layer 1
- `--panel: #101e30` — Card layer 2
- `--cyan: #00d4ff` — Primary accent
- `--teal: #00ffc8` — Success / online
- `--amber: #ffb800` — Warning / ETA
- `--red: #ff4e6a` — Danger / live

### Typography
- **Syne** (400–800) — Headings, body text
- **DM Mono** (300–400) — Labels, badges, code

### Animations
- `fadeUp` — Page entry animation
- `scan` — Cockpit scan line
- `pulse-logo` — Logo pulse
- `blink` — Status dots
- `bounce` — Typing indicator
- `grow` — Progress bar fill

## Deployment

### Backend → Render

1. Push `server/` to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Build: `npm install`
5. Start: `node index.js`

### Frontend → Vercel

1. Push `client/` to GitHub
2. Connect to Vercel
3. Build: `npm run build`
4. Output: `dist`

## Demo

After seeding, login with:
- **Email:** demo@aileraner.com
- **Password:** demo123

## License

MIT — © 2026 Aileraner
