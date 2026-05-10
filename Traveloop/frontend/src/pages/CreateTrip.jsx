import { useState } from 'react';
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
