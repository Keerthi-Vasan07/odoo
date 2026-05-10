import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import {
  Search,
  Filter,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Plus,
  Edit3,
} from "lucide-react";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/trips")
      .then((res) => setTrips(res.data))
      .catch(console.error);
  }, []);

  const today = new Date();

  const ongoingTrips = trips.filter((trip) => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);

    return today >= start && today <= end;
  });

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) > today
  );

  const completedTrips = trips.filter(
    (trip) => new Date(trip.endDate) < today
  );

  const filteredTrips = (tripList) =>
    tripList.filter((trip) =>
      trip.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Smart Trip Organizer
            </span>

            <h1 className="mt-5 text-5xl font-black leading-tight">
              My Trips ✈
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-gray-400">
              Organize, track, and manage all your travel adventures beautifully
              with Traveloop.
            </p>
          </div>

          <Link
            to="/trips/new"
            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-5 text-lg font-semibold shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            New Trip
          </Link>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] p-8 shadow-2xl backdrop-blur-xl">
          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

              <input
                type="text"
                placeholder="Search trips..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* FILTERS */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl hover:bg-white/10 transition-all">
                <ArrowRight className="h-4 w-4" />
                Group By
              </button>

              <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl hover:bg-white/10 transition-all">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* ONGOING */}
          <TripSection
            title="Ongoing"
            trips={filteredTrips(ongoingTrips)}
            emptyText="No ongoing trips currently."
          />

          {/* UPCOMING */}
          <TripSection
            title="Upcoming"
            trips={filteredTrips(upcomingTrips)}
            emptyText="No upcoming trips planned."
          />

          {/* COMPLETED */}
          <TripSection
            title="Completed"
            trips={filteredTrips(completedTrips)}
            emptyText="No completed trips yet."
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* TRIP SECTION */
/* ================================================= */

function TripSection({ title, trips, emptyText }) {
  return (
    <div className="mb-14">
      {/* TITLE */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>

        <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-sm text-purple-300">
          {trips.length} Trips
        </span>
      </div>

      {/* EMPTY */}
      {trips.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center text-gray-500">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================= */
/* TRIP CARD */
/* ================================================= */

function TripCard({ trip }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">
      {/* BACKGROUND IMAGE */}
      <img
        src={
          trip.coverImage ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
        }
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20 group-hover:scale-105 transition-all duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div className="max-w-2xl">
            <h3 className="text-3xl font-black group-hover:text-purple-300 transition-all">
              {trip.title}
            </h3>

            <p className="mt-4 text-gray-300 leading-relaxed line-clamp-2">
              {trip.description ||
                "Explore beautiful destinations and create unforgettable memories with Traveloop."}
            </p>

            {/* DETAILS */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                <Calendar className="h-4 w-4 text-purple-400" />

                {new Date(trip.startDate).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                <Clock className="h-4 w-4 text-purple-400" />

                {new Date(trip.endDate).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-purple-400" />

                {trip.stops?.length || 0} Destinations
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 text-sm font-semibold shadow-lg">
              Travel Journey
            </div>

            <Link
              to={`/trips/${trip.id}/build`}
              className="flex items-center gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-6 py-3 text-purple-300 backdrop-blur-xl hover:bg-purple-500/20 transition-all"
            >
              <Edit3 className="h-4 w-4" />
              Open Itinerary
            </Link>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[75%] bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>

          <div className="mt-3 text-sm text-purple-300">
            75% itinerary completed
          </div>
        </div>
      </div>
    </div>
  );
}