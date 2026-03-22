# Aileraner — Project Documentation

> **AI-Powered Learning Co-Pilot**  
> Built with MongoDB · Express · React · Node.js

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design System](#3-design-system)
4. [Database Schemas](#4-database-schemas)
5. [API Reference](#5-api-reference)
6. [Frontend Pages](#6-frontend-pages)
7. [Component Library](#7-component-library)
8. [Environment & Setup](#8-environment--setup)
9. [Running Locally](#9-running-locally)
10. [Deployment Guide](#10-deployment-guide)

---

## 1. Project Overview

Aileraner is a full-stack, AI-assisted online learning platform with an aviation-cockpit aesthetic. Learners can browse courses, track their progress, attend live and scheduled sessions, challenge themselves with AI-curated quizzes, and interact with an AI tutor — all within a cohesive, deeply immersive dark UI.

### Core Features

| Feature                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| 🧭 **AI Tutor**         | Chat-based AI assistant for real-time learning guidance      |
| 📚 **Course Catalog**   | Searchable, filterable course library with rich detail pages |
| 📊 **Dashboard**        | KPI gauges, progress summaries, upcoming sessions            |
| ✈️ **Live Sessions**    | Scheduled and live instructor-led learning sessions          |
| 🧠 **Smart Quizzes**    | Adaptive quizzes with explanations and score tracking        |
| 📈 **Progress Tracker** | Visual roadmap of learning milestones and completion stats   |
| 🔐 **Authentication**   | JWT-based register/login with protected routes               |

---

## 2. Tech Stack

### Backend (`server/`)

| Package        | Version | Purpose               |
| -------------- | ------- | --------------------- |
| `express`      | ^4.18   | HTTP framework        |
| `mongoose`     | ^8.x    | MongoDB ODM           |
| `jsonwebtoken` | ^9.x    | JWT auth tokens       |
| `bcryptjs`     | ^2.x    | Password hashing      |
| `cors`         | ^2.x    | Cross-origin requests |
| `dotenv`       | ^16.x   | Environment variables |
| `nodemon`      | dev     | Auto-restart in dev   |

### Frontend (`client/`)

| Package            | Version | Purpose                 |
| ------------------ | ------- | ----------------------- |
| `react`            | ^18     | UI framework            |
| `react-dom`        | ^18     | DOM renderer            |
| `react-router-dom` | ^6      | Client-side routing     |
| `axios`            | ^1.x    | HTTP client             |
| `vite`             | ^5      | Build tool & dev server |

---

## 3. Design System

Aileraner uses a proprietary design system. Every UI element references the tokens below — no hardcoded hex values.

### Color Tokens

```css
:root {
  --bg: #050a12; /* Page background */
  --surface: #0c1624; /* Card layer 1 */
  --panel: #101e30; /* Card layer 2 */
  --cyan: #00d4ff; /* Primary accent */
  --cyan-dim: #00d4ff33; /* Cyan at 20% */
  --teal: #00ffc8; /* Success / online */
  --amber: #ffb800; /* Warning / ETA */
  --red: #ff4e6a; /* Danger / live */
  --text: #cde4f5; /* Body text */
  --muted: #5a7a99; /* Labels / placeholders */
  --border: #1a3550; /* All borders */
  --glow: 0 0 24px #00d4ff44;
}
```

### Typography

| Font                | Role                                  |
| ------------------- | ------------------------------------- |
| `Syne` (400–800)    | All headings, body text, nav, buttons |
| `DM Mono` (300–400) | Labels, tags, badges, metadata, code  |

### Key Animation Keyframes

| Name         | Usage                                                |
| ------------ | ---------------------------------------------------- |
| `fadeUp`     | Page entry — all hero content, staggered 0.1s delays |
| `scan`       | Top border of cockpit widget (3s infinite)           |
| `pulse-logo` | Logo icon pulse (3s infinite)                        |
| `blink`      | Status dots and page tags (1.4s step-start)          |
| `bounce`     | AI Tutor typing dots (1.2s infinite)                 |
| `grow`       | Progress bar fill (1.2s from `scaleX(0)`)            |

---

## 4. Database Schemas

### User

```
users {
  _id         : ObjectId
  name        : String (required)
  email       : String (unique, required)
  password    : String (bcrypt hashed)
  avatar      : String (URL)
  role        : Enum ['student', 'admin'] (default: 'student')
  enrolledCourses : [ObjectId → Course]
  createdAt   : Date
}
```

### Course

```
courses {
  _id         : ObjectId
  title       : String
  description : String
  category    : String
  thumbnail   : String (URL)
  difficulty  : Enum ['Beginner', 'Intermediate', 'Advanced']
  totalDuration : Number (minutes)
  enrolledCount : Number
  rating      : Number (1–5)
  instructor  : String
  modules     : [{
    title   : String
    lessons : [{
      title    : String
      videoUrl : String
      duration : Number (minutes)
    }]
  }]
  createdAt   : Date
}
```

### Progress

```
progress {
  _id              : ObjectId
  userId           : ObjectId → User
  courseId         : ObjectId → Course
  completedLessons : [String] (lessonIds)
  percentComplete  : Number (0–100)
  quizScores       : [{
    quizId  : ObjectId → Quiz
    score   : Number
    takenAt : Date
  }]
  lastAccessed     : Date
}
```

### Session

```
sessions {
  _id          : ObjectId
  title        : String
  instructor   : String
  scheduledAt  : Date
  duration     : Number (minutes)
  status       : Enum ['live', 'upcoming', 'completed']
  topic        : String
  maxAttendees : Number
  enrolledUsers: [ObjectId → User]
}
```

### Quiz

```
quizzes {
  _id          : ObjectId
  courseId     : ObjectId → Course
  title        : String
  passingScore : Number (0–100)
  questions    : [{
    question     : String
    options      : [String] (4 options)
    correctIndex : Number (0–3)
    explanation  : String
  }]
  createdAt    : Date
}
```

---

## 5. API Reference

> Base URL: `http://localhost:5000/api`  
> Protected routes require: `Authorization: Bearer <token>`

### Auth

```
POST   /auth/register        → { token, user }
POST   /auth/login           → { token, user }
```

### Users

```
GET    /users/me             → { user }                [protected]
PUT    /users/me             → { user }                [protected]
```

### Courses

```
GET    /courses              → [{ course }]
GET    /courses/:id          → { course }
POST   /courses              → { course }              [admin]
PUT    /courses/:id          → { course }              [admin]
DELETE /courses/:id          → { message }             [admin]
POST   /courses/:id/enroll   → { message }             [protected]
```

### Progress

```
GET    /progress/:courseId   → { progress }            [protected]
PUT    /progress/:courseId   → { progress }            [protected]
```

### Sessions

```
GET    /sessions             → [{ session }]
POST   /sessions/:id/join    → { message }             [protected]
```

### Quizzes

```
GET    /quizzes/:courseId    → { quiz }                [protected]
POST   /quizzes/:id/submit   → { score, passed, results } [protected]
```

---

## 6. Frontend Pages

### `/` — Home (Landing Page)

**Sections:**

1. **Hero** — Large H1 with cyan em accent, lead paragraph, two CTAs (primary + outline), animated status dot "AI Active"
2. **Features Grid** — 6 feature cards using `auto-fit, minmax(260px, 1fr)` grid with hover-lift animation
3. **Cockpit Demo** — Mock dashboard widget showing KPI gauges and a session list
4. **CTA Banner** — Full-width section with primary CTA to register

---

### `/login` and `/register` — Auth Pages

**Layout:** Centered card on dark background  
**Elements:**

- Logo at top
- Form inputs with `var(--border)` underline style
- Primary submit button
- Link to opposite auth page
- Error message display in `var(--red)`

---

### `/dashboard` — Learner Dashboard

**Layout:** Padded main with 2-column wide grid  
**Left column:**

- KPI row (4 gauges): Courses Enrolled, Lessons Completed, Quiz Average, Study Hours
- Recent Courses (progress bars)
- Upcoming Sessions list (with `live`, `soon`, `open` status badges)

**Right column:**

- Cockpit widget with AI status dot
- "Continue Learning" panel

---

### `/courses` — Course Catalog

**Layout:** Search/filter bar + features grid  
**Elements:**

- Text search input
- Category filter pills
- Course cards with thumbnail, difficulty badge, rating, enroll CTA

---

### `/courses/:id` — Course Detail

**Layout:** 2-column wide  
**Left:** Course meta, thumbnail, description, module accordion  
**Right:** Enroll panel, instructor info, progress bar (if enrolled), quiz CTA

---

### `/ai-tutor` — AI Tutor Chat

**Layout:** Full-height chat interface  
**Elements:**

- Chat bubble history (user + AI messages)
- Typing dots animation when AI is "thinking"
- Input bar at bottom with send button
- AI status dot: "Aileraner AI · Active"

---

### `/quiz/:courseId` — Quiz Page

**Layout:** Single-question card with progress bar  
**Elements:**

- Question text + 4 option buttons
- Next button (disabled until option selected)
- Results screen: score, pass/fail badge, explain overlay

---

### `/progress` — Progress Tracker

**Layout:** Roadmap timeline + KPI stats  
**Elements:**

- Vertical timeline with pulsing node for current milestone
- Course completion list with `var(--teal)` teal progress fills
- Overall stats gauge row

---

## 7. Component Library

| Component       | Props                      | Notes                              |
| --------------- | -------------------------- | ---------------------------------- |
| `<Navbar>`      | `showBack?: bool`          | Shows back button on feature pages |
| `<Footer>`      | —                          | Always shown at page bottom        |
| `<PageTag>`     | `label, emoji?`            | Blinking dot pill badge            |
| `<FeatureCard>` | `icon, title, desc, href`  | Hover-lift card                    |
| `<Panel>`       | `header, children`         | Dark panel with surface header     |
| `<ProgressBar>` | `percent`                  | Animated cyan→teal bar             |
| `<Gauge>`       | `value, label`             | KPI stat widget                    |
| `<StatusDot>`   | `label, color?`            | Blinking status dot                |
| `<Badge>`       | `label, variant?`          | Mono pill badge                    |
| `<Button>`      | `variant, href?, onClick?` | primary / outline                  |

---

## 8. Environment & Setup

### Prerequisites

- Node.js 20+
- npm 10+
- MongoDB Atlas account (free tier sufficient)

### `.env` (server)

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/aileraner?retryWrites=true&w=majority
JWT_SECRET=aileraner_super_secret_jwt_key
PORT=5000
```

> [!CAUTION]
> Never commit `.env` to version control. Add it to `.gitignore`.

---

## 9. Running Locally

```bash
# 1. Clone / open project folder
cd "GEN AILERNER"

# 2. Install backend deps
cd server
npm install
npm run dev      # Runs on http://localhost:5000

# 3. Install frontend deps (new terminal)
cd ../client
npm install
npm run dev      # Runs on http://localhost:5173
```

> [!IMPORTANT]
> The Vite dev server proxies `/api` requests to `http://localhost:5000` automatically via `vite.config.js`. You do not need to prefix API calls with the backend URL in production-style code.

---

### Update Axios Base URL for Production

```js
// src/api/axios.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
```

---

_Document version 1.0 — Aileraner MERN Stack Build_
