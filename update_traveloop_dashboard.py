import os

BASE_DIR = r"c:\Users\KEERTHI VASAN\odoo\Traveloop"

files = {}

# ------------------------------------------------------------
# 1. Update Routing in App.jsx
# ------------------------------------------------------------
files["frontend/src/App.jsx"] = """import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import DashboardLayout from './layouts/DashboardLayout';
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
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips/:id/build" element={<ItineraryBuilder />} />
          <Route path="/community" element={<div className="p-8 text-white">Community Page (Coming Soon)</div>} />
          <Route path="/budget" element={<div className="p-8 text-white">Budget Page (Coming Soon)</div>} />
          <Route path="/profile" element={<div className="p-8 text-white">Profile Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
"""

# ------------------------------------------------------------
# 2. Layouts: DashboardLayout.jsx
# ------------------------------------------------------------
files["frontend/src/layouts/DashboardLayout.jsx"] = """import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#050816] text-white font-sans overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_35%)] pointer-events-none" />
      
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        <TopNavbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
"""

# ------------------------------------------------------------
# 3. Components: Sidebar.jsx
# ------------------------------------------------------------
files["frontend/src/components/Sidebar.jsx"] = """import { Link, useLocation } from 'react-router-dom';
import { Compass, Home, Map, BookOpen, Users, DollarSign, User, X } from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'My Trips', path: '/trips', icon: Map },
    { name: 'Itinerary', path: '/trips/new', icon: BookOpen },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Budget', path: '/budget', icon: DollarSign },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 transform transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <Link to="/dashboard" className="flex items-center text-xl font-black tracking-wide bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              <Compass className="h-6 w-6 mr-2 text-purple-400" /> Traveloop
            </Link>
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.startsWith(link.path) && (link.path !== '/dashboard' || location.pathname === '/dashboard');
              return (
                <Link key={link.name} to={link.path} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/10 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-purple-400' : ''}`} />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
"""

# ------------------------------------------------------------
# 4. Components: TopNavbar.jsx
# ------------------------------------------------------------
files["frontend/src/components/TopNavbar.jsx"] = """import { useAuthStore } from '../store/authStore';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopNavbar({ setSidebarOpen }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
      <button className="lg:hidden text-white" onClick={() => setSidebarOpen(true)}>
        <Menu size={24} />
      </button>
      
      <div className="hidden lg:block text-gray-400 text-sm font-medium">
        Welcome back, <span className="text-white">{user?.firstName}</span>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-sm font-medium text-white hidden sm:block">
          Explore
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold shadow-lg text-white">
          {user?.firstName?.charAt(0).toUpperCase() || 'U'}
        </div>

        <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
"""

# ------------------------------------------------------------
# 5. Dashboard Page Components
# ------------------------------------------------------------
files["frontend/src/components/HeroBanner.jsx"] = """export default function HeroBanner() {
  return (
    <div className="relative h-[250px] md:h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-6">
        <span className="mb-4 px-4 py-1.5 rounded-full bg-purple-600/80 text-xs md:text-sm backdrop-blur-md shadow-lg text-white">
          ✈ Personalized Travel Planning
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl text-white">
          Explore The World With Smart Planning
        </h2>

        <p className="mt-4 md:mt-6 text-gray-300 max-w-2xl text-sm md:text-lg">
          Create intelligent itineraries, track expenses, discover places,
          and organize every journey beautifully.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          <button className="px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 font-semibold shadow-xl text-white text-sm md:text-base">
            Plan A Trip
          </button>
          <button className="px-6 md:px-8 py-3 md:py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold backdrop-blur-md text-white text-sm md:text-base">
            Explore Destinations
          </button>
        </div>
      </div>
    </div>
  );
}
"""

files["frontend/src/components/SearchBar.jsx"] = """import { ArrowRight, Filter, Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex-1 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search destinations, trips, or places..."
          className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
        <button className="whitespace-nowrap px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white flex items-center">
          Group By <ArrowRight size={18} className="ml-2" />
        </button>
        <button className="whitespace-nowrap px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white flex items-center">
          <Filter size={18} className="mr-2" /> Filter
        </button>
        <button className="whitespace-nowrap px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white">
          Sort By
        </button>
      </div>
    </div>
  );
}
"""

files["frontend/src/components/RegionalSelections.jsx"] = """import { MapPin } from 'lucide-react';

export default function RegionalSelections({ selections }) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white">Top Regional Selections</h3>
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-all font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {selections.map((item, index) => (
          <div
            key={index}
            className="group relative h-48 md:h-56 rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-base md:text-lg font-semibold text-white">{item.name}</h4>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-300 mt-1">
                <MapPin size={14} /> {item.destinations} Destinations
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
"""

files["frontend/src/components/PreviousTrips.jsx"] = """import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PreviousTrips({ trips }) {
  return (
    <section className="mt-16 pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl md:text-2xl font-bold text-white">Previous Trips</h3>
        <Link to="/trips/new" className="px-5 md:px-6 py-2.5 md:py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-white flex items-center gap-2 text-sm md:text-base">
          <Plus size={18} /> Plan A Trip
        </Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative h-64 md:h-72 overflow-hidden">
              <img
                src={trip.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'}
                alt={trip.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/80 text-xs font-semibold backdrop-blur-md text-white">
                Completed
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg md:text-xl font-semibold text-white truncate pr-2">{trip.title}</h4>
                <span className="text-xs md:text-sm text-purple-300 whitespace-nowrap bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">Premium Journey</span>
              </div>

              <p className="mt-3 text-gray-400 text-sm leading-relaxed line-clamp-2">
                Experience curated adventures, luxury stays, memorable food spots, and seamless travel planning.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-purple-400 font-semibold text-sm md:text-base">
                  {new Date(trip.startDate).toLocaleDateString()}
                </span>
                <Link to={`/trips/${trip.id}/build`} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white text-xs md:text-sm font-medium">
                  View Trip
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
"""

# ------------------------------------------------------------
# 6. Assemble Dashboard.jsx
# ------------------------------------------------------------
files["frontend/src/pages/Dashboard.jsx"] = """import { useEffect, useState } from 'react';
import axios from '../api/axios';
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/SearchBar';
import RegionalSelections from '../components/RegionalSelections';
import PreviousTrips from '../components/PreviousTrips';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch user's previous trips from backend
    axios.get('/trips').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  const regionalSelections = [
    { name: "North India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop", destinations: 12 },
    { name: "South India", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", destinations: 9 },
    { name: "Himalayas", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", destinations: 15 },
    { name: "Northeast", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", destinations: 8 },
    { name: "West India", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop", destinations: 10 },
  ];

  return (
    <div className="max-w-7xl mx-auto border border-white/10 rounded-3xl bg-[#0a0a0a]/50 shadow-2xl backdrop-blur-xl">
      <div className="p-4 md:p-6 lg:p-8">
        <HeroBanner />
        <SearchBar />
        <RegionalSelections selections={regionalSelections} />
        
        {/* We pass the real backend trips to PreviousTrips component */}
        {/* If no trips, we could pass a fallback or show a placeholder */}
        <PreviousTrips trips={trips} />
      </div>
    </div>
  );
}
"""

# ------------------------------------------------------------
# 7. Add Custom Scrollbar styling to index.css
# ------------------------------------------------------------
files["frontend/src/index.css"] = """@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  background-color: #050816; /* Base dark background */
  color: white;
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

/* Hide scrollbar for SearchBar horizontal scrolling on mobile */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom scrollbar for the main content area */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
"""

# ------------------------------------------------------------
# 8. Update Login to match dark theme premium style
# ------------------------------------------------------------
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050816] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_35%)] pointer-events-none" />
      <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Compass className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-wide">Welcome Back</h2>
          <p className="text-gray-400 mt-2 text-sm">Log in to continue your journey</p>
        </div>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <input type="email" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white placeholder-gray-500 transition-colors outline-none" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <input type="password" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white placeholder-gray-500 transition-colors outline-none" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] transition-all duration-300 mt-6">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="font-bold text-purple-400 hover:text-purple-300 transition-colors">Sign up</Link>
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050816] relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_35%)] pointer-events-none" />
      <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Compass className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-white tracking-wide text-center mb-8">Create Account</h2>
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
              <input type="text" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white outline-none" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
              <input type="text" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white outline-none" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <input type="email" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <input type="password" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full py-3.5 px-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] transition-all duration-300 mt-6">
            Sign Up
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="font-bold text-purple-400 hover:text-purple-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
"""

# Add basic dark mode matching styling for other pages (TripList, CreateTrip, ItineraryBuilder) so they don't break the dark theme
files["frontend/src/pages/TripList.jsx"] = """import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { Calendar, MapPin, Edit3, Plus } from 'lucide-react';

export default function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('/trips').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto border border-white/10 rounded-3xl bg-[#0a0a0a]/50 shadow-2xl backdrop-blur-xl p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black tracking-wide bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">My Trips</h1>
        <Link to="/trips/new" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg flex items-center">
          <Plus size={18} className="mr-2" /> New Trip
        </Link>
      </div>
      
      {trips.length === 0 ? (
        <div className="text-center p-16 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-gray-400 text-lg">You don't have any trips yet.</p>
          <Link to="/trips/new" className="mt-4 inline-block text-purple-400 hover:text-purple-300 font-medium">Create your first itinerary &rarr;</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="bg-white/5 rounded-3xl shadow-sm p-6 border border-white/10 flex flex-col h-full hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">{trip.title}</h3>
                <p className="text-gray-400 text-sm flex items-center mb-2"><Calendar className="h-4 w-4 mr-2 text-purple-400" /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm flex items-center"><MapPin className="h-4 w-4 mr-2 text-purple-400" /> {trip.stops?.length || 0} Destinations</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link to={`/trips/${trip.id}/build`} className="text-white text-sm font-medium flex items-center justify-center w-full bg-white/5 hover:bg-purple-500/20 py-3 rounded-xl transition-colors border border-white/10">
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
    <div className="max-w-2xl mx-auto border border-white/10 rounded-3xl bg-[#0a0a0a]/80 shadow-2xl backdrop-blur-xl p-8">
      <h1 className="text-3xl font-black text-white tracking-wide mb-8">Plan a New Trip</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Trip Name</label>
          <input type="text" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white placeholder-gray-500 transition-colors outline-none" placeholder="E.g., Summer in Europe" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
          <textarea className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white placeholder-gray-500 transition-colors outline-none resize-none" rows="3" placeholder="What is this trip about?" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Start Date</label>
            <input type="date" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white placeholder-gray-500 transition-colors outline-none" style={{colorScheme: 'dark'}} value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">End Date</label>
            <input type="date" required className="block w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-white placeholder-gray-500 transition-colors outline-none" style={{colorScheme: 'dark'}} value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 mt-6">
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Trip & Start Planning'}
          </button>
        </div>
      </form>
    </div>
  );
}
"""

files["frontend/src/pages/ItineraryBuilder.jsx"] = """import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { MapPin, Plus, Navigation, Clock } from 'lucide-react';

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

  if (!trip) return <div className="text-center p-12 text-white">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl sticky top-6">
          <div className="mb-6 pb-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">{trip.title}</h2>
            <p className="text-gray-400 text-sm flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-400" />
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>
          
          <h3 className="font-semibold text-lg text-white mb-4 flex items-center"><Navigation className="h-5 w-5 mr-2 text-purple-400" /> Add Destination</h3>
          <form onSubmit={addStop} className="flex gap-2">
            <input type="text" placeholder="E.g., Paris" className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-gray-500" value={newCity} onChange={e => setNewCity(e.target.value)} required />
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:scale-105 transition-all"><Plus className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
      
      <div className="w-full lg:w-2/3 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white tracking-wide">Trip Itinerary</h2>
        </div>

        {trip.stops?.length === 0 ? (
          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-12 text-center rounded-3xl border border-white/10 shadow-2xl">
            <MapPin className="mx-auto h-16 w-16 text-purple-500/50 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Your itinerary is empty</h3>
            <p className="text-gray-400 max-w-md mx-auto">Start planning your trip by adding a destination on the left panel.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-white/20 ml-4 space-y-8 pb-8">
            {trip.stops?.map((stop, index) => (
              <div key={stop.id} className="relative pl-8">
                <div className="absolute w-6 h-6 bg-purple-500 rounded-full -left-[13px] border-4 border-[#050816] top-1"></div>
                <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{stop.city}</h3>
                      <p className="text-sm text-gray-400 mt-1">{new Date(stop.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {stop.activities?.map(act => (
                      <div key={act.id} className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                        <div className="flex items-center">
                          <div className="bg-white/10 p-2 rounded-xl shadow-sm mr-3">
                            <Navigation className="h-4 w-4 text-purple-400" />
                          </div>
                          <div>
                            <span className="font-medium text-white block">{act.title}</span>
                            <span className="text-xs text-purple-300 capitalize">{act.category}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-sm border border-green-500/20">${act.cost}</span>
                      </div>
                    ))}
                  </div>

                  {activityForm.stopId === stop.id ? (
                    <form onSubmit={(e) => addActivity(e, stop.id)} className="bg-purple-900/20 p-5 rounded-2xl border border-purple-500/30">
                      <div className="grid grid-cols-12 gap-3 mb-4">
                        <input type="text" placeholder="Activity name" className="col-span-12 sm:col-span-6 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" value={activityForm.title} onChange={e => setActivityForm({...activityForm, title: e.target.value})} required />
                        <input type="number" placeholder="Cost ($)" className="col-span-6 sm:col-span-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" value={activityForm.cost} onChange={e => setActivityForm({...activityForm, cost: e.target.value})} required />
                        <select className="col-span-6 sm:col-span-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500 [&>option]:bg-gray-900" value={activityForm.category} onChange={e => setActivityForm({...activityForm, category: e.target.value})}>
                          <option value="sightseeing">Sightseeing</option>
                          <option value="food">Food</option>
                          <option value="transport">Transport</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setActivityForm({ stopId: null, title: '', cost: '', category: 'sightseeing' })} className="px-4 py-2 text-sm text-gray-400 hover:bg-white/10 rounded-xl transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all shadow-lg font-medium">Save Activity</button>
                      </div>
                    </form>
                  ) : (
                    <button onClick={() => setActivityForm({ stopId: stop.id, title: '', cost: '', category: 'sightseeing' })} className="text-sm text-purple-400 font-medium flex items-center hover:bg-white/5 px-4 py-3 rounded-xl transition-colors w-full justify-center border border-dashed border-white/20 hover:border-purple-500/50">
                      <Plus className="h-4 w-4 mr-2" /> Add an activity
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

print(f"Frontend update applied successfully to {BASE_DIR}")
