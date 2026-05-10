import { Link, useNavigate } from 'react-router-dom';
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
