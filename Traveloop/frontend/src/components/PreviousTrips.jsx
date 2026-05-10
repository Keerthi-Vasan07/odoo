import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PreviousTrips({ trips }) {
  return (
    <section className="mt-16 pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl md:text-2xl font-bold text-white">Previous Trips</h3>
        <Link to="/trips/new" className="px-5 md:px-6 py-2.5 md:py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-white flex items-center gap-2 text-sm md:text-base">
          <Plus size={18} /> Plan A Trip
        </Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative h-64 md:h-72 overflow-hidden">
              <img
                src={trip.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'}
                alt={trip.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/80 text-xs font-semibold backdrop-blur-md text-white">
                Completed
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg md:text-xl font-semibold text-white truncate pr-2">{trip.title}</h4>
                <span className="text-xs md:text-sm text-purple-300 whitespace-nowrap bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">Premium Journey</span>
              </div>

              <p className="mt-3 text-gray-400 text-sm leading-relaxed line-clamp-2">
                Experience curated adventures, luxury stays, memorable food spots, and seamless travel planning.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-purple-400 font-semibold text-sm md:text-base">
                  {new Date(trip.startDate).toLocaleDateString()}
                </span>
                <Link to={`/trips/${trip.id}/build`} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white text-xs md:text-sm font-medium">
                  View Trip
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
