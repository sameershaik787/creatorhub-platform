# 🎬 CreatorHub - Full-Stack Freelance Platform for Content Creators

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-v5.0-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8.svg)](https://tailwindcss.com/)

**CreatorHub** is an end-to-end, high-performance freelance marketplace built specifically for social media content creators, cinematographers, video editors, audio engineers, motion graphic artists, and FPV drone pilots. It features regional creator discovery, a multi-currency conversion engine, RAG AI project recommendations, digital resume viewers, interactive location maps, and an admin verification queue.

---

## 🌐 Live Web App Deployment

- 🚀 **Live Production App**: [https://creatorhub-platform.onrender.com](https://creatorhub-platform.onrender.com)

---

## 🔗 Localhost Access Links (For Local Dev)

When running locally, the application is accessible at the following URLs:

- 💻 **Frontend Web App**: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Backend REST API**: [http://localhost:5000](http://localhost:5000)
- 📊 **Health Check Endpoint**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Demo Credentials (1-Click Logins)

Use these pre-seeded accounts to explore all platform user roles:

| Role | Email | Password | Unlocked Capabilities |
| :--- | :--- | :--- | :--- |
| **🛡️ Admin** | `admin@creatorhub.com` | `admin123` | **Pending Creator Approvals Queue**, 1-click verification, platform stats monitoring. |
| **👨‍🎨 Creator (USA)** | `brandon@creatorhub.com` | `password123` | Digital Resume Viewer, 4K Travel Reels, RED Rig details, Rate Packages. |
| **👨‍🎨 Creator (India)** | `ronak@creatorhub.com` | `password123` | DaVinci Colorist & Bollywood VFX profile with localized INR (₹) rates. |
| **🧑‍💼 Client / Brand** | `client@creatorhub.com` | `password123` | Post Freelance Jobs, RAG AI Matcher, Location Map Search, Direct Chat. |

---

## ✨ Key Features & Functionality

### 1. 👨‍🎨 Creator Profiles & Digital Resume Showcase
- **Comprehensive Profiles**: Showcases avatar, regional flag, title, bio, hourly rate, star rating, verified status badge, primary skills, and camera gear rigs.
- **Interactive Digital Resume Viewer**: Displays uploaded resume summary, work experience, software certifications, equipment lists, and downloadable PDF resume files.
- **Pricing Packages**: Transparent tier breakdown (Basic, Standard, Pro) with delivery timelines and included revisions.

### 2. 🌎 Regional Discovery & Interactive Map View
- **Global Regions**: Pre-seeded authentic creators across **USA (🇺🇸)**, **United Kingdom (🇬🇧)**, **Iceland / Europe (🇮🇸)**, **India (🇮🇳)**, **Japan (🇯🇵)**, and **Australia (🇦🇺)**.
- **Interactive Map Search**: Built-in Leaflet/Canvas location map allowing clients to search and pinpoint creators visually by city and coordinates.

### 3. 💱 Global Multi-Currency System
- **Real-Time Conversion**: Switch seamlessly between **USD ($)**, **EUR (€)**, **GBP (£)**, **INR (₹)**, **AUD (A$)**, and **JPY (¥)**.
- **Universal Formatting**: Automatically recalculates creator hourly rates, package tiers, job budgets, and rate calculators across every page.

### 4. 🤖 RAG AI Assistant & Matcher Engine
- **Floating AI Copilot Widget**: Persistent chatbot assistant powered by vector TF-IDF similarity search over creator profiles, rates, and platform FAQs.
- **AI Project Matcher**: Allows clients to input natural-language project prompts (e.g., *"Find a senior video editor in Los Angeles for 10 YouTube Shorts"*) and receives ranked creator recommendations.
- **AI Script & Hook Generator**: In-house studio tool for generating high-retention video script hooks and timelines.

### 5. 🛡️ Admin Verification Queue
- **Verification Management**: Dedicated queue on `/admin` displaying pending creator signups.
- **1-Click Approval**: Admin can review equipment rigs and verify creators instantly, updating DB state live across the marketplace.

### 6. 🛠️ Creator Studio Toolkit
- **Freelance Rate Calculator**: Calculates minimum required hourly/day rates based on target annual income, working days, and studio expenses.
- **Contract & NDA Generator**: Generates legal commercial agreements and IP ownership transfer contracts for video deliverables.

---

## 🏗️ Architecture & Technology Stack

### Frontend Stack
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, Custom Adobe Spectrum Dark UI Design System
- **Routing**: React Router DOM v6
- **State Management**: React Context API (`AuthContext`, `CurrencyContext`)
- **Icons**: Lucide React
- **Mapping**: Leaflet / React-Leaflet

### Backend Stack
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt password hashing
- **File Uploads**: Multer (stored in `/uploads`)
- **Database**: Custom JSON/SQLite file database manager (`backend/data.json`)
- **AI Engine**: In-memory TF-IDF vector similarity RAG engine (`ragEngine.js`)

---

## 🚀 Step-by-Step Local Installation & Setup

### Prerequisites
Make sure you have **Node.js (v18 or higher)** and **npm** installed on your system.

```bash
node -v
npm -v
```

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/creatorhub-platform.git
cd creatorhub-platform
```

---

### Step 2: Install & Start Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start Express server
node server.js
```
*The backend API will start running at `http://localhost:5000`.*

---

### Step 3: Install & Start Frontend Application

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*The frontend web app will start running at `http://localhost:3000`.*

---

## 📁 Repository Directory Structure

```
creatorhub-platform/
├── backend/
│   ├── data.json              # Persistent JSON/SQLite database storage
│   ├── db.js                  # Database helper functions & seeded creators
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── package.json           # Backend dependencies
│   ├── ragEngine.js           # RAG AI vector similarity search engine
│   └── server.js              # Express REST API server (Port 5000)
│
├── frontend/
│   ├── index.html             # HTML entry point
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration & proxy settings
│   └── src/
│       ├── App.jsx            # Main app router & layout
│       ├── index.css          # Global CSS & Adobe design system tokens
│       ├── components/
│       │   ├── AICopilotWidget.jsx     # Floating RAG AI chatbot
│       │   ├── AIRecommendModal.jsx    # AI creator project matcher
│       │   ├── AdobeCreativeBackground.jsx # Fluid mesh gradient canvas
│       │   ├── AdobeStudioHero.jsx     # Studio desk hero section
│       │   ├── ChatDrawer.jsx          # Live messaging drawer
│       │   ├── LocationMap.jsx         # Interactive Leaflet creator map
│       │   ├── Navbar.jsx              # Navigation header with currency switcher
│       │   └── ResumeViewer.jsx        # Digital resume modal
│       ├── context/
│       │   ├── AuthContext.jsx         # User auth state manager
│       │   └── CurrencyContext.jsx     # Global multi-currency state manager
│       └── pages/
│           ├── AdminDashboard.jsx      # Admin verification queue
│           ├── ClientDashboard.jsx     # Job posting & client dashboard
│           ├── CreatorDashboard.jsx    # Profile & resume editor
│           ├── CreatorTools.jsx        # Rate calculator & contract generator
│           ├── Home.jsx                # Landing page
│           ├── JobBoard.jsx            # Freelance job board
│           ├── Login.jsx               # Login, Signup & Forgot Password page
│           └── SearchCreators.jsx      # Creator search & filter directory
└── README.md                  # Project documentation
```

---

## 🌐 API Routes Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | User authentication & JWT token generation |
| `POST` | `/api/auth/register` | Register new creator or client account |
| `POST` | `/api/auth/forgot-password` | Request password reset token & email alert |
| `GET` | `/api/creators` | List creators with skill, location & rate filters |
| `GET` | `/api/creators/:id` | Get single creator full profile & resume |
| `POST` | `/api/jobs` | Post a new freelance project job |
| `GET` | `/api/jobs` | Retrieve all open freelance jobs |
| `POST` | `/api/ai/chat` | Query RAG AI Assistant chatbot |
| `POST` | `/api/ai/recommend` | Natural-language AI creator matcher |
| `POST` | `/api/admin/verify-creator/:id` | Admin 1-click creator approval |

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
