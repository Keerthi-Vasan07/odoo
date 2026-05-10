import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { PlusCircle, Map, Calendar, DollarSign, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('/trips').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-primary to-secondary p-8 rounded-3xl text-white shadow-lg overflow-hidden relative">
        <div className="z-10 relative mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-2">Where to next?</h1>
          <p className="text-blue-100 text-lg">Plan your next adventure with Traveloop.</p>
        </div>
        <Link to="/trips/new" className="z-10 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow flex items-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Plan New Trip
        </Link>
        <div className="absolute -bottom-24 -right-24 opacity-10">
          <Map className="w-96 h-96" />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Recent Trips</h2>
          <Link to="/trips" className="text-primary font-medium hover:underline flex items-center">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </div>
        
        {trips.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Map className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">You haven't planned any trips yet.</p>
            <Link to="/trips/new" className="mt-4 text-primary font-medium hover:underline inline-block">Create your first trip &rarr;</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.slice(0, 3).map(trip => (
              <Link to={`/trips/${trip.id}/build`} key={trip.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition group">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{trip.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{trip.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 space-y-2 text-gray-600 text-sm">
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-primary" /> {new Date(trip.startDate).toLocaleDateString()}</div>
                  {trip.stops?.length > 0 && <div className="flex items-center"><Map className="h-4 w-4 mr-2 text-primary" /> {trip.stops.length} Stops</div>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
