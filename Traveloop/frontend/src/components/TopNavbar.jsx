import { useAuthStore } from '../store/authStore';
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
