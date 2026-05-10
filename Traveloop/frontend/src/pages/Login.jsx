import { useState } from 'react';
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
