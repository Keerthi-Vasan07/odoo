import { useState } from 'react';
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
