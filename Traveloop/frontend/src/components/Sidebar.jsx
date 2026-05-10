import { Link, useLocation } from 'react-router-dom';
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
