import { useEffect, useState } from 'react';
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
