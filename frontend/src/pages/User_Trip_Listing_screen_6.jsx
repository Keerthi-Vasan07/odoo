import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowRight, Calendar, MapPin, Clock, Sparkles, Plus, Edit3 } from "lucide-react";
import axios from "../api/axios";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/trips").then(res => setTrips(res.data)).catch(console.error);
  }, []);

  const today = new Date();
  const ongoing   = trips.filter(t => new Date(t.startDate) <= today && new Date(t.endDate) >= today);
  const upcoming  = trips.filter(t => new Date(t.startDate) > today);
  const completed = trips.filter(t => new Date(t.endDate) < today);

  const filtered = list => list.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 animate-fade-up">
          <div>
            <div className="page-badge mb-4"><Sparkles className="h-3 w-3" /> Smart Trip Organizer</div>
            <h1 className="hero-title">My Trips ✈</h1>
            <p className="mt-2 text-gray-400 text-sm max-w-xl">
              Organize, track, and manage all your travel adventures beautifully with Traveloop.
            </p>
          </div>
          <Link to="/trips/new" className="flex items-center gap-2.5 rounded-2xl btn-primary px-7 py-3.5 text-sm font-semibold self-start lg:self-end">
            <Plus className="h-4 w-4" /> New Trip
          </Link>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-2xl border border-white/08 p-6 sm:p-8 content-card animate-fade-up delay-100">

          {/* SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input type="text" placeholder="Search trips..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-2xl btn-glass px-4 py-3.5 text-sm text-gray-300">
                <ArrowRight className="h-4 w-4" /> Group By
              </button>
              <button className="flex items-center gap-2 rounded-2xl btn-glass px-4 py-3.5 text-sm text-gray-300">
                <Filter className="h-4 w-4" /> Filter
              </button>
            </div>
          </div>

          <TripSection title="Ongoing"   trips={filtered(ongoing)}   emptyText="No ongoing trips currently." />
          <TripSection title="Upcoming"  trips={filtered(upcoming)}  emptyText="No upcoming trips planned." />
          <TripSection title="Completed" trips={filtered(completed)} emptyText="No completed trips yet." />
        </div>
      </div>
    </div>
  );
}

function TripSection({ title, trips, emptyText }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div className="section-divider flex-1">
          <h2 className="t-section text-white">{title}</h2>
        </div>
        <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 text-xs text-purple-300 font-semibold ml-4">
          {trips.length} Trips
        </span>
      </div>
      {trips.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-gray-500 text-sm">{emptyText}</div>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => <TripCard key={trip.id} trip={trip} />)}
        </div>
      )}
    </div>
  );
}

function TripCard({ trip }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/08 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30">
      <img src={trip.coverImage || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"} alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-15 group-hover:scale-105 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="max-w-2xl">
            <h3 className="t-section text-white group-hover:text-purple-300 transition-all">{trip.title}</h3>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-2">
              {trip.description || "Explore beautiful destinations and create unforgettable memories with Traveloop."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {[
                { icon: Calendar, label: new Date(trip.startDate).toLocaleDateString() },
                { icon: Clock,    label: new Date(trip.endDate).toLocaleDateString() },
                { icon: MapPin,   label: `${trip.stops?.length || 0} Destinations` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border border-white/08 bg-white/5 px-3.5 py-2 text-xs text-gray-300 font-medium">
                  <Icon className="h-3.5 w-3.5 text-purple-400" /> {label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3 flex-shrink-0">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5 text-xs font-semibold shadow-lg uppercase tracking-wide">
              Travel Journey
            </div>
            <Link to={`/trips/${trip.id}/build`}
              className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-5 py-2.5 text-xs text-purple-300 hover:bg-purple-500/20 transition-all font-semibold">
              <Edit3 className="h-3.5 w-3.5" /> Open Itinerary
            </Link>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/07">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "75%" }} />
          </div>
          <div className="mt-2 text-xs text-purple-300 font-medium">75% itinerary completed</div>
        </div>
      </div>
    </div>
  );
}