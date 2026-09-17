# Unfazed - Mental Health & Therapy Platform

**Unfazed** is a comprehensive therapy management platform designed to connect clients with licensed therapists while empowering mental health professionals with suite-level tools for practice management, client tracking, scheduling, session notes, analytics, and billing.

### 🌐 Live Deployment
- **Frontend App**: [https://unfazed-unlox.vercel.app/](https://unfazed-unlox.vercel.app/)

---

## 🚀 Features

### 👨‍⚕️ Therapist Dashboard & Practice Management
- **Therapist Onboarding & Authentication**: Secure JWT-based authentication and customizable public profile setup.
- **Schedule & Availability Management**: Set custom available slots, manage session calendars, and view client bookings.
- **Client CRM**: Manage client profiles, view therapy history, and track client progress.
- **Session Notes**: Structured note editor for clinical session documentation and client records.
- **Analytics & Revenue Insights**: Real-time revenue charts powered by Recharts, tracking appointments and income.
- **Subscription Tier Entitlements**: Tier-based feature access (Free, Pro, Premium) for practice growth.

### 👤 Patient & Client Portal
- **Therapist Discovery**: Search and filter licensed therapists by specialty, language, experience, and availability.
- **Public Therapist Profiles**: View detailed profile information, bio, credentials, pricing, and available time slots.
- **Appointment Booking & Slot Picker**: Select interactive dates and times for therapy sessions.
- **Secure Payments Integration**: Integrated Razorpay checkout modal for seamless payment processing.
- **Real-Time Communication**: Socket.io powered live messaging chat window between therapists and clients.

---

## 🛠️ Tech Stack

### Frontend (`unfazed-frontend`)
- **Framework & Build Tool**: React 19, Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS, Vanilla CSS
- **Data Visualization**: Recharts
- **Icons & UI**: Lucide React, React Toastify
- **State & HTTP**: React Context API, Axios
- **Real-Time**: Socket.io Client

### Backend (`unfazed-backend`)
- **Runtime & Server**: Node.js, Express.js (v5)
- **Database & ORM**: MongoDB, Mongoose
- **Real-Time Communication**: Socket.io
- **Security & Auth**: JWT (JSON Web Tokens), BcryptJS, Express Validator
- **Payments**: Razorpay API
- **Document Generation**: PDFKit (Invoice & Summary Reports)
- **Mailing**: Nodemailer

---

## 📁 Repository Structure

```
Unfazed/
├── unfazed-frontend/          # React + Vite Client Application
│   ├── public/                # Static assets & icons
│   ├── src/
│   │   ├── api/               # Axios instance & base endpoints
│   │   ├── components/        # Reusable UI components (Analytics, Chat, CRM, Notes, Payments)
│   │   ├── context/           # AuthContext & global state
│   │   ├── hooks/             # Custom React hooks (e.g., useEntitlement)
│   │   ├── pages/             # App views (Dashboard, Booking, Profiles, Services)
│   │   └── routes/            # App router definitions
│   ├── package.json
│   └── vite.config.js
│
├── unfazed-backend/           # Node.js + Express API Backend
│   ├── server.js              # Server entry point & Socket.io setup
│   ├── src/
│   │   ├── config/            # DB & Razorpay configuration
│   │   ├── controllers/       # Business logic controllers
│   │   ├── middleware/        # Auth, entitlement, & error handling middleware
│   │   ├── models/            # Mongoose schemas (Therapist, Client, Session, Payment, Notes)
│   │   ├── routes/            # Express route modules
│   │   ├── services/          # Invoice generation & entitlement services
│   │   └── sockets/           # Socket.io chat handlers
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

---

### 1️⃣ Setting Up the Backend

1. Navigate to the backend folder:
   ```bash
   cd unfazed-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `unfazed-backend/`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/unfazed
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend server will run at `http://localhost:5000`.

---

### 2️⃣ Setting Up the Frontend

1. Navigate to the frontend folder:
   ```bash
   cd unfazed-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `unfazed-frontend/` (optional for custom backend URL):
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will run locally (typically at `http://localhost:5173`).

---

## 📜 License

This project is maintained for the **Unlox Major Project**.