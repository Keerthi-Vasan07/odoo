import os
import json

BASE_DIR = r"c:\Users\KEERTHI VASAN\odoo\Traveloop"

files = {}

# Docker & Root
files["docker-compose.yml"] = """version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: traveloop
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
"""

files["README.md"] = """# Traveloop - Personalized Travel Planning Made Easy

## Overview
Traveloop is a smart collaborative travel planning platform where users can plan trips, create itineraries, manage multiple cities/stops, discover activities, estimate budgets, track expenses, and more.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS + Zustand
- Backend: Node.js + Express + Prisma ORM
- Database: PostgreSQL

## Setup Instructions

1. Start the database:
   ```bash
   docker-compose up -d
   ```

2. Setup Backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npx prisma migrate dev --name init
   npm run dev
   ```

3. Setup Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
"""

# Backend
files["backend/package.json"] = """{
  "name": "traveloop-backend",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "prisma": "^5.0.0"
  }
}"""

files["backend/.env.example"] = """PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/traveloop?schema=public"
JWT_SECRET="traveloop_super_secret_key_change_in_production"
"""

files["backend/prisma/schema.prisma"] = """generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id               Int       @id @default(autoincrement())
  firstName        String
  lastName         String
  email            String    @unique
  password         String
  phone            String?
  city             String?
  country          String?
  profileImage     String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  trips            Trip[]
  notes            Note[]
}

model Trip {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime
  coverImage  String?
  isPublic    Boolean   @default(false)
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
  stops       TripStop[]
  notes       Note[]
  budget      Budget?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model TripStop {
  id        Int       @id @default(autoincrement())
  tripId    Int
  trip      Trip      @relation(fields: [tripId], references: [id], onDelete: Cascade)
  city      String
  country   String?
  startDate DateTime
  endDate   DateTime
  order     Int
  activities Activity[]
}

model Activity {
  id          Int       @id @default(autoincrement())
  stopId      Int
  stop        TripStop  @relation(fields: [stopId], references: [id], onDelete: Cascade)
  title       String
  description String?
  cost        Float     @default(0)
  category    String    // adventure, food, culture, etc.
  startTime   DateTime?
  endTime     DateTime?
}

model Budget {
  id          Int      @id @default(autoincrement())
  tripId      Int      @unique
  trip        Trip     @relation(fields: [tripId], references: [id], onDelete: Cascade)
  totalAmount Float    @default(0)
  expenses    Expense[]
}

model Expense {
  id          Int      @id @default(autoincrement())
  budgetId    Int
  budget      Budget   @relation(fields: [budgetId], references: [id], onDelete: Cascade)
  category    String   // transport, food, stay, activity
  amount      Float
  description String?
  date        DateTime @default(now())
}

model Note {
  id        Int      @id @default(autoincrement())
  tripId    Int
  trip      Trip     @relation(fields: [tripId], references: [id], onDelete: Cascade)
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  content   String
  createdAt DateTime @default(now())
}
"""

files["backend/src/index.js"] = """const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const tripRoutes = require('./routes/trip.routes');
const activityRoutes = require('./routes/activity.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static uploads folder
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Traveloop API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
"""

files["backend/src/middleware/auth.middleware.js"] = """const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
"""

files["backend/src/routes/auth.routes.js"] = """const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, city, country } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, phone, city, country }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: user.id, email: user.email, firstName: user.firstName }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
"""

files["backend/src/routes/trip.routes.js"] = """const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticate } = require('../middleware/auth.middleware');

// Create Trip
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, startDate, endDate, isPublic } = req.body;
    const trip = await prisma.trip.create({
      data: {
        title, description, startDate: new Date(startDate), endDate: new Date(endDate),
        isPublic: isPublic || false,
        userId: req.user.userId
      }
    });
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User Trips
router.get('/', authenticate, async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.user.userId },
      include: { stops: true }
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Trip by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { 
        stops: { include: { activities: true } },
        budget: { include: { expenses: true } },
        notes: true
      }
    });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userId !== req.user.userId && !trip.isPublic) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Stop to Trip
router.post('/:id/stops', authenticate, async (req, res) => {
  try {
    const { city, country, startDate, endDate, order } = req.body;
    const stop = await prisma.tripStop.create({
      data: {
        tripId: parseInt(req.params.id),
        city, country, startDate: new Date(startDate), endDate: new Date(endDate), order
      }
    });
    res.status(201).json(stop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
"""

files["backend/src/routes/activity.routes.js"] = """const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticate } = require('../middleware/auth.middleware');

// Add Activity to Stop
router.post('/stop/:stopId', authenticate, async (req, res) => {
  try {
    const { title, description, cost, category, startTime, endTime } = req.body;
    const activity = await prisma.activity.create({
      data: {
        stopId: parseInt(req.params.stopId),
        title, description, cost: parseFloat(cost), category,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null
      }
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
"""

# Frontend Files
files["frontend/package.json"] = """{
  "name": "traveloop-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@heroicons/react": "^2.0.18",
    "axios": "^1.4.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.292.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2",
    "recharts": "^2.7.2",
    "zustand": "^4.3.9"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}"""

files["frontend/vite.config.js"] = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})"""

files["frontend/tailwind.config.js"] = """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#4f46e5",
        accent: "#f59e0b",
      }
    },
  },
  plugins: [],
}"""

files["frontend/postcss.config.js"] = """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}"""

files["frontend/index.html"] = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Traveloop - Smart Travel Planning</title>
  </head>
  <body class="bg-gray-50 text-gray-900 font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>"""

files["frontend/src/index.css"] = """@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}
"""

files["frontend/src/main.jsx"] = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)"""

files["frontend/src/store/authStore.js"] = """import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));
"""

files["frontend/src/api/axios.js"] = """import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
"""

files["frontend/src/App.jsx"] = """import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripList from './pages/TripList';
import ItineraryBuilder from './pages/ItineraryBuilder';

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore(state => state.token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const token = useAuthStore(state => state.token);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {token && <Navbar />}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><TripList /></ProtectedRoute>} />
            <Route path="/trips/new" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
            <Route path="/trips/:id/build" element={<ProtectedRoute><ItineraryBuilder /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
"""

files["frontend/src/components/Navbar.jsx"] = """import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { MapPin, LogOut, Home, Compass } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-primary font-bold text-2xl">
              <Compass className="h-8 w-8 mr-2" />
              Traveloop
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary">
                Dashboard
              </Link>
              <Link to="/trips" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary">
                My Trips
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4 font-medium">{user?.firstName}</span>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
"""

files["frontend/src/pages/Login.jsx"] = """import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axios from '../api/axios';
import { Compass } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      setAuth(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary p-3 rounded-full mb-4">
            <Compass className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Log in to continue your journey</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="font-medium text-primary hover:text-secondary">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
"""

files["frontend/src/pages/Register.jsx"] = """import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axios from '../api/axios';
import { Compass } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', formData);
      setAuth(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl">
        <div className="flex justify-center mb-6">
          <Compass className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Create Account</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none transition-colors mt-4">
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:text-secondary">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
"""

files["frontend/src/pages/Dashboard.jsx"] = """import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { PlusCircle, Map, Calendar, DollarSign, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('/trips').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-primary to-secondary p-8 rounded-3xl text-white shadow-lg overflow-hidden relative">
        <div className="z-10 relative mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-2">Where to next?</h1>
          <p className="text-blue-100 text-lg">Plan your next adventure with Traveloop.</p>
        </div>
        <Link to="/trips/new" className="z-10 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow flex items-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Plan New Trip
        </Link>
        <div className="absolute -bottom-24 -right-24 opacity-10">
          <Map className="w-96 h-96" />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Recent Trips</h2>
          <Link to="/trips" className="text-primary font-medium hover:underline flex items-center">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </div>
        
        {trips.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Map className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">You haven't planned any trips yet.</p>
            <Link to="/trips/new" className="mt-4 text-primary font-medium hover:underline inline-block">Create your first trip &rarr;</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.slice(0, 3).map(trip => (
              <Link to={`/trips/${trip.id}/build`} key={trip.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition group">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{trip.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{trip.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 space-y-2 text-gray-600 text-sm">
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-primary" /> {new Date(trip.startDate).toLocaleDateString()}</div>
                  {trip.stops?.length > 0 && <div className="flex items-center"><Map className="h-4 w-4 mr-2 text-primary" /> {trip.stops.length} Stops</div>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"""

files["frontend/src/pages/CreateTrip.jsx"] = """import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function CreateTrip() {
  const [formData, setFormData] = useState({ title: '', description: '', startDate: '', endDate: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/trips', formData);
      navigate(`/trips/${res.data.id}/build`);
    } catch (err) {
      alert('Error creating trip');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Plan a New Trip</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Trip Name</label>
          <input type="text" required className="mt-1 block w-full rounded-lg border-gray-300 p-3 border focus:border-primary focus:ring-primary shadow-sm" placeholder="E.g., Summer in Europe" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea className="mt-1 block w-full rounded-lg border-gray-300 p-3 border focus:border-primary focus:ring-primary shadow-sm" rows="3" placeholder="What is this trip about?" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" required className="mt-1 block w-full rounded-lg border-gray-300 p-3 border focus:border-primary focus:ring-primary shadow-sm" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" required className="mt-1 block w-full rounded-lg border-gray-300 p-3 border focus:border-primary focus:ring-primary shadow-sm" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
          </div>
        </div>
        <div className="pt-4">
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-secondary transition-colors shadow-sm disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Trip & Start Planning'}
          </button>
        </div>
      </form>
    </div>
  );
}
"""

files["frontend/src/pages/TripList.jsx"] = """import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { Calendar, MapPin, Edit3 } from 'lucide-react';

export default function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('/trips').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
        <Link to="/trips/new" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition">New Trip</Link>
      </div>
      
      {trips.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500">You don't have any trips yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{trip.title}</h3>
                <p className="text-gray-500 text-sm mt-2 flex items-center"><Calendar className="h-4 w-4 mr-1 text-gray-400" /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm mt-1 flex items-center"><MapPin className="h-4 w-4 mr-1 text-gray-400" /> {trip.stops?.length || 0} Destinations</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link to={`/trips/${trip.id}/build`} className="text-primary text-sm font-medium hover:text-secondary flex items-center justify-center w-full bg-blue-50 py-2 rounded-lg transition-colors">
                  <Edit3 className="h-4 w-4 mr-2" /> Open Itinerary
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"""

files["frontend/src/pages/ItineraryBuilder.jsx"] = """import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { MapPin, Plus, Navigation, Clock, DollarSign } from 'lucide-react';

export default function ItineraryBuilder() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [newCity, setNewCity] = useState('');
  const [activityForm, setActivityForm] = useState({ stopId: null, title: '', cost: '', category: 'sightseeing' });

  const fetchTrip = () => {
    axios.get(`/trips/${id}`).then(res => setTrip(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const addStop = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/trips/${id}/stops`, {
        city: newCity,
        startDate: trip.startDate,
        endDate: trip.endDate,
        order: trip.stops?.length || 0
      });
      setNewCity('');
      fetchTrip();
    } catch (err) {
      alert('Failed to add stop');
    }
  };

  const addActivity = async (e, stopId) => {
    e.preventDefault();
    try {
      await axios.post(`/activities/stop/${stopId}`, {
        title: activityForm.title,
        cost: activityForm.cost,
        category: activityForm.category
      });
      setActivityForm({ stopId: null, title: '', cost: '', category: 'sightseeing' });
      fetchTrip();
    } catch (err) {
      alert('Failed to add activity');
    }
  };

  if (!trip) return <div className="text-center p-12">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{trip.title}</h2>
            <p className="text-gray-500 text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>
          
          <h3 className="font-semibold text-lg mb-4 flex items-center"><Navigation className="h-5 w-5 mr-2 text-primary" /> Add Destination</h3>
          <form onSubmit={addStop} className="flex gap-2">
            <input type="text" placeholder="E.g., Paris" className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-primary focus:border-primary" value={newCity} onChange={e => setNewCity(e.target.value)} required />
            <button type="submit" className="bg-primary text-white p-2.5 rounded-lg hover:bg-secondary transition-colors"><Plus className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
      
      <div className="w-full lg:w-2/3 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trip Itinerary</h2>
        </div>

        {trip.stops?.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
            <MapPin className="mx-auto h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your itinerary is empty</h3>
            <p className="text-gray-500 max-w-md mx-auto">Start planning your trip by adding a destination on the left panel.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-8">
            {trip.stops?.map((stop, index) => (
              <div key={stop.id} className="relative pl-8">
                <div className="absolute w-6 h-6 bg-primary rounded-full -left-[13px] border-4 border-gray-50 top-1"></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{stop.city}</h3>
                      <p className="text-sm text-gray-500 mt-1">{new Date(stop.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {stop.activities?.map(act => (
                      <div key={act.id} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100 group">
                        <div className="flex items-center">
                          <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                            <Navigation className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 block">{act.title}</span>
                            <span className="text-xs text-gray-500 capitalize">{act.category}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm text-sm border border-gray-100">${act.cost}</span>
                      </div>
                    ))}
                  </div>

                  {activityForm.stopId === stop.id ? (
                    <form onSubmit={(e) => addActivity(e, stop.id)} className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="grid grid-cols-12 gap-3 mb-3">
                        <input type="text" placeholder="Activity name" className="col-span-12 sm:col-span-6 p-2 rounded border border-gray-300 text-sm" value={activityForm.title} onChange={e => setActivityForm({...activityForm, title: e.target.value})} required />
                        <input type="number" placeholder="Cost" className="col-span-6 sm:col-span-3 p-2 rounded border border-gray-300 text-sm" value={activityForm.cost} onChange={e => setActivityForm({...activityForm, cost: e.target.value})} required />
                        <select className="col-span-6 sm:col-span-3 p-2 rounded border border-gray-300 text-sm" value={activityForm.category} onChange={e => setActivityForm({...activityForm, category: e.target.value})}>
                          <option value="sightseeing">Sightseeing</option>
                          <option value="food">Food</option>
                          <option value="transport">Transport</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setActivityForm({ stopId: null, title: '', cost: '', category: 'sightseeing' })} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                        <button type="submit" className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-secondary">Save Activity</button>
                      </div>
                    </form>
                  ) : (
                    <button onClick={() => setActivityForm({ stopId: stop.id, title: '', cost: '', category: 'sightseeing' })} className="text-sm text-primary font-medium flex items-center hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors w-full justify-center border border-dashed border-blue-200">
                      <Plus className="h-4 w-4 mr-1" /> Add an activity
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"""

import pathlib

for filepath, content in files.items():
    full_path = os.path.join(BASE_DIR, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Project successfully scaffolded in {BASE_DIR}")
