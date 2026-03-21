# Aileraner — MERN Stack Full Implementation Plan

## Overview

**Aileraner** is an AI-Powered Learning Co-Pilot with an aviation cockpit aesthetic. This plan details the complete MERN (MongoDB, Express, React, Node.js) implementation structured as a monorepo with a `server/` backend and `client/` frontend. The design system (dark navy, cyan glow, Syne + DM Mono fonts) is applied consistently across all pages.

---

## Project Structure

```
GEN AILERNER/
├── server/                   # Express + MongoDB API
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
│   │   └── quizzes.js
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   └── errorHandler.js
│   ├── .env
│   ├── package.json
│   └── index.js              # Entry point
│
├── client/                   # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Shared UI components
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
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── AiTutor.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── Progress.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── styles/
│   │   │   └── globals.css   # Full design system tokens
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Backend — `server/`

### Technology Stack
| Layer | Tech |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express 4 |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| CORS | cors middleware |
| Env | dotenv |
| Dev | nodemon |

### Mongoose Schemas

#### [MODIFY] User.js
```js
{ name, email, password(hashed), avatar, role: ['student','admin'],
  enrolledCourses: [CourseRef], createdAt }
```

#### [MODIFY] Course.js
```js
{ title, description, category, thumbnail, modules: [{title, lessons:[{title,videoUrl,duration}]}],
  instructor, difficulty, totalDuration, enrolledCount, rating, createdAt }
```

#### [MODIFY] Progress.js
```js
{ userId, courseId, completedLessons:[lessonId], percentComplete,
  quizScores:[{quizId,score,takenAt}], lastAccessed }
```

#### [MODIFY] Session.js
```js
{ title, instructor, scheduledAt, duration, status:['live','upcoming','completed'],
  topic, maxAttendees, enrolledUsers:[userId] }
```

#### [MODIFY] Quiz.js
```js
{ courseId, title, questions:[{question, options:[str], correctIndex, explanation}],
  passingScore, createdAt }
```

### REST API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, receive JWT |
| GET | `/api/users/me` | Yes | Get current user profile |
| PUT | `/api/users/me` | Yes | Update profile |
| GET | `/api/courses` | No | List all courses |
| GET | `/api/courses/:id` | No | Single course detail |
| POST | `/api/courses` | Admin | Create course |
| PUT | `/api/courses/:id` | Admin | Update course |
| DELETE | `/api/courses/:id` | Admin | Delete course |
| POST | `/api/courses/:id/enroll` | Yes | Enroll in course |
| GET | `/api/progress/:courseId` | Yes | Get user progress |
| PUT | `/api/progress/:courseId` | Yes | Update progress |
| GET | `/api/sessions` | No | List sessions |
| POST | `/api/sessions/:id/join` | Yes | Join session |
| GET | `/api/quizzes/:courseId` | Yes | Get quiz for course |
| POST | `/api/quizzes/:id/submit` | Yes | Submit quiz answers |

---

## Frontend — `client/`

### Technology Stack
| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| HTTP | Axios |
| State | React Context API |
| Styling | Vanilla CSS (design system tokens) |
| Fonts | Google Fonts — Syne + DM Mono |

### Pages

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Landing page — hero, features grid, cockpit demo, CTA |
| **Login** | `/login` | Auth form — JWT login |
| **Register** | `/register` | Auth form — new account |
| **Dashboard** | `/dashboard` | KPI gauges, recent courses, upcoming sessions, AI status |
| **Courses** | `/courses` | Browse all courses, search/filter |
| **Course Detail** | `/courses/:id` | Modules, enroll button, progress bar |
| **AI Tutor** | `/ai-tutor` | Chat interface with typing dots animation |
| **Quiz** | `/quiz/:courseId` | Interactive quiz with score result |
| **Progress** | `/progress` | Learning roadmap, completion stats |

### Shared Components

| Component | Purpose |
|---|---|
| `Navbar` | Fixed top nav with logo, links, CTA / back button |
| `Footer` | Site footer with links and copyright |
| `PageTag` | Blinking dot pill badge (e.g. "🧠 Feature 01") |
| `FeatureCard` | Hover-lift card with icon, title, desc, link |
| `Panel` | Standard dark panel with header |
| `ProgressBar` | Animated cyan→teal fill bar |
| `Gauge` | KPI stat box with large cyan value |
| `StatusDot` | Blinking teal "AI Active" / "Live" dot |
| `Badge` | Small mono pill (e.g. "Most Popular") |
| `Button` | Primary (cyan) and Outline variants |

### Design System Integration
- `src/styles/globals.css` contains all `:root` CSS variables, global reset, body grid pattern, and all design tokens from the design system spec
- All components import from `globals.css` — no hardcoded hex values
- `Syne` and `DM Mono` fonts loaded via Google Fonts in `index.html`
- `fadeUp` keyframe used on all page entry content with staggered delays
- `scan`, `pulse-logo`, `blink`, `bounce` keyframes included globally

---

## Proposed Changes

---

### Backend Setup

#### [NEW] server/package.json
Express, Mongoose, cors, dotenv, jsonwebtoken, bcryptjs, nodemon

#### [NEW] server/index.js
Express app entry: cors, JSON parsing, all route mounting, MongoDB connection

#### [NEW] server/models/User.js
Mongoose user schema with bcrypt password hashing pre-save hook

#### [NEW] server/models/Course.js
#### [NEW] server/models/Progress.js
#### [NEW] server/models/Session.js
#### [NEW] server/models/Quiz.js

#### [NEW] server/routes/auth.js
Register + Login routes returning JWT

#### [NEW] server/routes/users.js
#### [NEW] server/routes/courses.js
#### [NEW] server/routes/progress.js
#### [NEW] server/routes/sessions.js
#### [NEW] server/routes/quizzes.js

#### [NEW] server/middleware/auth.js
JWT verification middleware — attaches `req.user`

#### [NEW] server/.env
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
PORT=5000
```

---

### Frontend Setup

#### [NEW] client/index.html
Google Fonts link, root div, Vite script entry

#### [NEW] client/src/styles/globals.css
Full Aileraner design system — all CSS variables, global reset, grid background, typography, animations

#### [NEW] client/src/api/axios.js
Axios instance with `baseURL` pointing to `http://localhost:5000/api`, JWT header interceptor

#### [NEW] client/src/context/AuthContext.jsx
React Context for user state, login/logout functions, token persistence

#### [NEW] client/src/components/Navbar.jsx
#### [NEW] client/src/components/Footer.jsx
#### [NEW] client/src/components/PageTag.jsx
#### [NEW] client/src/components/FeatureCard.jsx
#### [NEW] client/src/components/Panel.jsx
#### [NEW] client/src/components/ProgressBar.jsx
#### [NEW] client/src/components/Gauge.jsx
#### [NEW] client/src/components/StatusDot.jsx
#### [NEW] client/src/components/Badge.jsx
#### [NEW] client/src/components/Button.jsx

#### [NEW] client/src/pages/Home.jsx
#### [NEW] client/src/pages/Dashboard.jsx
#### [NEW] client/src/pages/Courses.jsx
#### [NEW] client/src/pages/CourseDetail.jsx
#### [NEW] client/src/pages/AiTutor.jsx
#### [NEW] client/src/pages/Quiz.jsx
#### [NEW] client/src/pages/Progress.jsx
#### [NEW] client/src/pages/Login.jsx
#### [NEW] client/src/pages/Register.jsx

#### [NEW] client/src/App.jsx
React Router v6 routes, AuthContext provider, protected route wrapper

#### [NEW] client/src/main.jsx
React 18 `createRoot` render

#### [NEW] client/vite.config.js
Proxy `/api` → `http://localhost:5000` for dev

---

## Verification Plan

### Automated — Backend API Tests

Run with:
```bash
cd server
npm install
node index.js
```
Then test endpoints manually with the included seed data.

> [!NOTE]
> No automated test framework is included in scope for this initial build. All API verification is via manual curl/Postman testing described below.

### Manual API Verification

**Auth:**
- `POST /api/auth/register` with `{name, email, password}` → expects `{token, user}`
- `POST /api/auth/login` with credentials → expects JWT token

**Courses:**
- `GET /api/courses` → expects array of course objects
- `GET /api/courses/:id` → expects single course

**Progress:**
- `PUT /api/progress/:courseId` with JWT header → updates completed lessons

### Browser/UI Verification

Start both servers:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

Open: `http://localhost:5173`

**Checklist:**
1. Home page loads with grid background, animated hero, feature cards
2. Register and login forms submit successfully, JWT stored
3. Dashboard shows KPI gauges and session list (populated from API)
4. Courses page lists all courses with hover-lift feature cards
5. Course Detail shows modules and enroll button
6. AI Tutor page shows chat interface with typing animation
7. Quiz page renders questions and shows score on submit
8. Progress page shows roadmap with completion stats
9. All hover states, transitions, and animations run at ≥ 0.2s
10. Responsive layout correct at 760px and 800px breakpoints (mobile nav hidden)

### Design System Consistency Check

- All text uses `Syne` or `DM Mono` — no other fonts
- All borders are `var(--border)` — no hardcoded hex
- All primary accents use `var(--cyan)` — no other blues
- Body grid background visible on all pages
- No white or black backgrounds used anywhere
