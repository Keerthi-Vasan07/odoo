import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { MapPin, Plus, Navigation, Clock, DollarSign } from 'lucide-react';

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

  if (!trip) return <div className="text-center p-12">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{trip.title}</h2>
            <p className="text-gray-500 text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>
          
          <h3 className="font-semibold text-lg mb-4 flex items-center"><Navigation className="h-5 w-5 mr-2 text-primary" /> Add Destination</h3>
          <form onSubmit={addStop} className="flex gap-2">
            <input type="text" placeholder="E.g., Paris" className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-primary focus:border-primary" value={newCity} onChange={e => setNewCity(e.target.value)} required />
            <button type="submit" className="bg-primary text-white p-2.5 rounded-lg hover:bg-secondary transition-colors"><Plus className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
      
      <div className="w-full lg:w-2/3 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trip Itinerary</h2>
        </div>

        {trip.stops?.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
            <MapPin className="mx-auto h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your itinerary is empty</h3>
            <p className="text-gray-500 max-w-md mx-auto">Start planning your trip by adding a destination on the left panel.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-8">
            {trip.stops?.map((stop, index) => (
              <div key={stop.id} className="relative pl-8">
                <div className="absolute w-6 h-6 bg-primary rounded-full -left-[13px] border-4 border-gray-50 top-1"></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{stop.city}</h3>
                      <p className="text-sm text-gray-500 mt-1">{new Date(stop.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {stop.activities?.map(act => (
                      <div key={act.id} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100 group">
                        <div className="flex items-center">
                          <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                            <Navigation className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 block">{act.title}</span>
                            <span className="text-xs text-gray-500 capitalize">{act.category}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm text-sm border border-gray-100">${act.cost}</span>
                      </div>
                    ))}
                  </div>

                  {activityForm.stopId === stop.id ? (
                    <form onSubmit={(e) => addActivity(e, stop.id)} className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="grid grid-cols-12 gap-3 mb-3">
                        <input type="text" placeholder="Activity name" className="col-span-12 sm:col-span-6 p-2 rounded border border-gray-300 text-sm" value={activityForm.title} onChange={e => setActivityForm({...activityForm, title: e.target.value})} required />
                        <input type="number" placeholder="Cost" className="col-span-6 sm:col-span-3 p-2 rounded border border-gray-300 text-sm" value={activityForm.cost} onChange={e => setActivityForm({...activityForm, cost: e.target.value})} required />
                        <select className="col-span-6 sm:col-span-3 p-2 rounded border border-gray-300 text-sm" value={activityForm.category} onChange={e => setActivityForm({...activityForm, category: e.target.value})}>
                          <option value="sightseeing">Sightseeing</option>
                          <option value="food">Food</option>
                          <option value="transport">Transport</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setActivityForm({ stopId: null, title: '', cost: '', category: 'sightseeing' })} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                        <button type="submit" className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-secondary">Save Activity</button>
                      </div>
                    </form>
                  ) : (
                    <button onClick={() => setActivityForm({ stopId: stop.id, title: '', cost: '', category: 'sightseeing' })} className="text-sm text-primary font-medium flex items-center hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors w-full justify-center border border-dashed border-blue-200">
                      <Plus className="h-4 w-4 mr-1" /> Add an activity
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
