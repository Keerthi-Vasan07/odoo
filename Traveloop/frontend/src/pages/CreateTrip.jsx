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
