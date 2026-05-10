import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { Calendar, MapPin, Edit3 } from 'lucide-react';

export default function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('/trips').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
        <Link to="/trips/new" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition">New Trip</Link>
      </div>
      
      {trips.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500">You don't have any trips yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{trip.title}</h3>
                <p className="text-gray-500 text-sm mt-2 flex items-center"><Calendar className="h-4 w-4 mr-1 text-gray-400" /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm mt-1 flex items-center"><MapPin className="h-4 w-4 mr-1 text-gray-400" /> {trip.stops?.length || 0} Destinations</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link to={`/trips/${trip.id}/build`} className="text-primary text-sm font-medium hover:text-secondary flex items-center justify-center w-full bg-blue-50 py-2 rounded-lg transition-colors">
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
