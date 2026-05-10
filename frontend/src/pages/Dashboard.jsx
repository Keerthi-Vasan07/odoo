import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import {
  Plus,
  Search,
  Filter,
  ArrowRight,
  MapPin,
  Calendar,
} from "lucide-react";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  const regionalSelections = [
    {
      name: "North India",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
      destinations: 12,
    },
    {
      name: "South India",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      destinations: 9,
    },
    {
      name: "Himalayas",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
      destinations: 15,
    },
    {
      name: "Northeast",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      destinations: 8,
    },
    {
      name: "West India",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
      destinations: 10,
    },
  ];

  useEffect(() => {
    axios
      .get("/trips")
      .then((res) => setTrips(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#141b34] via-[#0c1020] to-[#090b12] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 px-10 py-16 lg:py-24">
            <span className="inline-flex items-center rounded-full bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 px-4 py-2 text-sm font-medium text-purple-200">
              ✈ Personalized Travel Planning
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-black leading-tight max-w-4xl">
              Let’s plan your next adventure
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed">
              Plan. Collaborate. Explore. Create beautiful itineraries,
              discover destinations, and organize every journey smarter with
              Traveloop.
            </p>

            {/* Search Bar */}
            <div className="mt-10 flex flex-col md:flex-row gap-4 max-w-3xl">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-14 py-5 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-5 font-semibold hover:scale-105 transition-all duration-300 shadow-xl">
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="mt-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

            <input
              type="text"
              placeholder="Search destinations, trips, or places..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-4 w-full lg:w-auto">
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

        {/* TOP REGIONAL SELECTIONS */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              Top Regional Selections ✨
            </h2>

            <button className="text-purple-400 hover:text-purple-300">
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {regionalSelections.map((region, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 h-72 cursor-pointer"
              >
                <img
                  src={region.image}
                  alt=""
                  className="h-full w-full object-cover group-hover:scale-110 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <h3 className="text-xl font-bold">{region.name}</h3>

                  <div className="mt-2 flex items-center gap-2 text-gray-300 text-sm">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    {region.destinations} Destinations
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PREVIOUS TRIPS */}
        <section className="mt-16 pb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Previous Trips ✨</h2>

            <Link
              to="/trips/new"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 font-semibold shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              Plan a trip
            </Link>
          </div>

          {trips.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
              <h3 className="text-2xl font-bold">
                No trips planned yet
              </h3>

              <p className="mt-3 text-gray-400">
                Start your first adventure with Traveloop.
              </p>

              <Link
                to="/trips/new"
                className="inline-flex mt-6 rounded-2xl bg-purple-500 px-6 py-3 font-semibold hover:bg-purple-600 transition-all"
              >
                Create Trip
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.slice(0, 3).map((trip) => (
                <Link
                  key={trip.id}
                  to={`/trips/${trip.id}/build`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={
                        trip.coverImage ||
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-110 transition-all duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-all">
                        {trip.title}
                      </h3>

                      <span className="rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1 text-xs text-green-300">
                        Active
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-gray-400">
                      {trip.description}
                    </p>

                    <div className="mt-6 space-y-3 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        {new Date(trip.startDate).toLocaleDateString()}
                      </div>

                      {trip.stops?.length > 0 && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple-400" />
                          {trip.stops.length} Stops
                        </div>
                      )}
                    </div>

                    <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[80%] bg-gradient-to-r from-purple-500 to-pink-500" />
                    </div>

                    <div className="mt-3 text-sm text-purple-300">
                      80% planned
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}