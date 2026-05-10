import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import {
  User,
  Edit3,
  MapPin,
  Calendar,
  Sparkles,
  Camera,
  ArrowRight,
  Mail,
  Globe,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Keerthi Vasan",
    email: "keerthi@example.com",
    bio: "Passionate traveler exploring beautiful destinations around the world with Traveloop. Building memories one trip at a time.",
    location: "India",
    joined: "2025",
    website: "traveloop.vercel.app",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  });

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("/trips")
      .then((res) => setTrips(res.data))
      .catch(console.error);
  }, []);

  const plannedTrips = trips.filter(
    (trip) => new Date(trip.endDate) >= new Date()
  );

  const previousTrips = trips.filter(
    (trip) => new Date(trip.endDate) < new Date()
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Traveler Profile
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            User Profile ✨
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Manage your travel profile, upcoming journeys, and previous travel
            memories beautifully with Traveloop.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* PROFILE SECTION */}
          <div className="border-b border-white/10 p-10">
            <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-center">
              {/* PROFILE IMAGE */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={user.profileImage}
                    alt=""
                    className="h-60 w-60 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl"
                  />

                  <button className="absolute bottom-4 right-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-xl hover:scale-110 transition-all">
                    <Camera className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-2 text-purple-300">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
              </div>

              {/* USER DETAILS */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* LEFT */}
                  <div>
                    <h2 className="text-4xl font-black">
                      {user.name}
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                        <Mail className="h-4 w-4 text-purple-400" />
                        {user.email}
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                        <Globe className="h-4 w-4 text-purple-400" />
                        {user.website}
                      </div>
                    </div>

                    <p className="mt-6 max-w-3xl text-gray-300 leading-relaxed">
                      {user.bio}
                    </p>
                  </div>

                  {/* BUTTON */}
                  <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 font-semibold shadow-xl hover:scale-105 transition-all">
                    <Edit3 className="h-5 w-5" />
                    Edit Profile
                  </button>
                </div>

                {/* STATS */}
                <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
                  <StatCard
                    title="Trips"
                    value={trips.length}
                  />

                  <StatCard
                    title="Planned"
                    value={plannedTrips.length}
                  />

                  <StatCard
                    title="Completed"
                    value={previousTrips.length}
                  />

                  <StatCard
                    title="Joined"
                    value={user.joined}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PREPLANNED TRIPS */}
          <div className="p-10 border-b border-white/10">
            <SectionHeader
              title="Preplanned Trips"
              count={plannedTrips.length}
            />

            {plannedTrips.length === 0 ? (
              <EmptyState text="No preplanned trips available." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {plannedTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </div>

          {/* PREVIOUS TRIPS */}
          <div className="p-10">
            <SectionHeader
              title="Previous Trips"
              count={previousTrips.length}
            />

            {previousTrips.length === 0 ? (
              <EmptyState text="No previous trips found." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {previousTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SECTION HEADER */
/* ================================================= */

function SectionHeader({ title, count }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-3xl font-black">{title}</h3>

      <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-2 text-sm text-purple-300">
        {count} Trips
      </div>
    </div>
  );
}

/* ================================================= */
/* EMPTY STATE */
/* ================================================= */

function EmptyState({ text }) {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center text-gray-500">
      {text}
    </div>
  );
}

/* ================================================= */
/* STAT CARD */
/* ================================================= */

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-sm uppercase tracking-wide text-gray-400">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-black text-purple-300">
        {value}
      </h3>
    </div>
  );
}

/* ================================================= */
/* TRIP CARD */
/* ================================================= */

function TripCard({ trip }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={
            trip.coverImage ||
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
          }
          alt=""
          className="h-full w-full object-cover group-hover:scale-110 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute top-5 right-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-xs font-semibold shadow-lg">
          Journey
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h4 className="text-2xl font-black group-hover:text-purple-300 transition-all">
          {trip.title}
        </h4>

        <p className="mt-3 line-clamp-2 text-gray-400">
          {trip.description ||
            "Explore amazing destinations and unforgettable experiences with Traveloop."}
        </p>

        {/* DETAILS */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4 text-purple-400" />

            {new Date(trip.startDate).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4 text-purple-400" />

            {trip.stops?.length || 0} Destinations
          </div>
        </div>

        {/* BUTTON */}
        <Link
          to={`/trips/${trip.id}/build`}
          className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-6 py-4 text-purple-300 backdrop-blur-xl transition-all hover:bg-purple-500/20"
        >
          <ArrowRight className="h-4 w-4" />
          View Trip
        </Link>
      </div>
    </div>
  );
}