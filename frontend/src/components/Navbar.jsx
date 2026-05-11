import { Link, useLocation } from 'react-router-dom';
import { Plane, MapPin, Users, LayoutDashboard } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',           label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trips',      label: 'My Trips',  icon: Plane },
  { to: '/community',  label: 'Community', icon: Users },
  { to: '/explore',    label: 'Explore',   icon: MapPin },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="topbar">
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Plane className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="t-signature text-xl text-white">Traveloop</span>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ to, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/6'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <Link
        to="/profile"
        className="w-9 h-9 rounded-full border-2 border-purple-500/50 flex items-center justify-center text-sm font-bold bg-gradient-to-br from-purple-600/30 to-pink-600/20 hover:border-purple-400 hover:scale-110 transition-all duration-200 cursor-pointer"
        title="Profile"
      >
        K
      </Link>
    </nav>
  );
}
