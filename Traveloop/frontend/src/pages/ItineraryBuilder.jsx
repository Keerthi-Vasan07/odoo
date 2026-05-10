import { useEffect, useState } from 'react';
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
