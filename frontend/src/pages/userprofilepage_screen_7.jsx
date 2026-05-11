import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Edit3, MapPin, Calendar, Sparkles, Camera, ArrowRight, Mail, Globe } from "lucide-react";
import axios from "../api/axios";

export default function ProfilePage() {
  const [user] = useState({
    name: "Keerthi Vasan",
    email: "keerthi@example.com",
    bio: "Passionate traveler exploring beautiful destinations around the world with Traveloop. Building memories one trip at a time.",
    location: "India",
    joined: "2025",
    website: "traveloop.vercel.app",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  });
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get("/trips").then(res => setTrips(res.data)).catch(console.error);
  }, []);

  const plannedTrips  = trips.filter(t => new Date(t.endDate) >= new Date());
  const previousTrips = trips.filter(t => new Date(t.endDate) < new Date());

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 animate-fade-up">
          <div className="page-badge mb-4"><Sparkles className="h-3 w-3" /> Traveler Profile</div>
          <h1 className="hero-title">User Profile ✨</h1>
          <p className="mt-2 text-gray-400 text-sm max-w-xl">
            Manage your travel profile, upcoming journeys, and previous travel memories beautifully with Traveloop.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-2xl border border-white/08 content-card overflow-hidden animate-fade-up delay-100">

          {/* PROFILE SECTION */}
          <div className="border-b border-white/07 p-6 sm:p-8">
            <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-start">
              {/* AVATAR */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img src={user.profileImage} alt="" className="h-48 w-48 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl" />
                  <button className="absolute bottom-3 right-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-xl hover:scale-110 transition-all">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs text-purple-300 font-medium">
                  <MapPin className="h-3.5 w-3.5" /> {user.location}
                </div>
              </div>

              {/* USER DETAILS */}
              <div className="rounded-2xl border border-white/07 bg-white/[0.03] p-6 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                  <div className="flex-1">
                    <h2 className="t-section text-white">{user.name}</h2>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {[{ icon: Mail, label: user.email }, { icon: Globe, label: user.website }].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 rounded-xl border border-white/08 bg-white/5 px-3.5 py-2 text-xs text-gray-300 font-medium">
                          <Icon className="h-3.5 w-3.5 text-purple-400" /> {label}
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 max-w-lg text-gray-300 text-sm leading-relaxed">{user.bio}</p>
                  </div>
                  <button className="flex items-center gap-2 rounded-2xl btn-primary px-5 py-3 text-sm font-semibold flex-shrink-0">
                    <Edit3 className="h-4 w-4" /> Edit Profile
                  </button>
                </div>

                {/* STATS */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { title: "Trips",     value: trips.length },
                    { title: "Planned",   value: plannedTrips.length },
                    { title: "Completed", value: previousTrips.length },
                    { title: "Joined",    value: user.joined },
                  ].map(({ title, value }) => (
                    <div key={title} className="rounded-xl border border-white/07 bg-white/5 p-4 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{title}</p>
                      <h3 className="mt-2 text-2xl font-black text-purple-300">{value}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PREPLANNED TRIPS */}
          <div className="p-6 sm:p-8 border-b border-white/07">
            <TripSectionHeader title="Preplanned Trips" count={plannedTrips.length} />
            {plannedTrips.length === 0 ? <EmptyState text="No preplanned trips available." /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {plannedTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
              </div>
            )}
          </div>

          {/* PREVIOUS TRIPS */}
          <div className="p-6 sm:p-8">
            <TripSectionHeader title="Previous Trips" count={previousTrips.length} />
            {previousTrips.length === 0 ? <EmptyState text="No previous trips found." /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {previousTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TripSectionHeader({ title, count }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="t-section text-white">{title}</h3>
      <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-purple-300 font-semibold">{count} Trips</div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-gray-500 text-sm">{text}</div>
  );
}

function TripCard({ trip }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/08 bg-white/[0.025] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30">
      <div className="relative h-52 overflow-hidden">
        <img src={trip.coverImage || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"} alt="" className="h-full w-full object-cover image-hover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-lg">Journey</div>
      </div>
      <div className="p-5">
        <h4 className="t-heading text-white group-hover:text-purple-300 transition-all">{trip.title}</h4>
        <p className="mt-2 line-clamp-2 text-gray-400 text-xs leading-relaxed">
          {trip.description || "Explore amazing destinations and unforgettable experiences with Traveloop."}
        </p>
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-300"><Calendar className="h-3.5 w-3.5 text-purple-400" />{new Date(trip.startDate).toLocaleDateString()}</div>
          <div className="flex items-center gap-2 text-xs text-gray-300"><MapPin className="h-3.5 w-3.5 text-purple-400" />{trip.stops?.length || 0} Destinations</div>
        </div>
        <div className="mt-4 flex gap-2">
          {[
            { to: `/trips/${trip.id}/checklist`, label: "Checklist", cls: "bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20" },
            { to: `/trips/${trip.id}/notes`,     label: "Notes",     cls: "bg-pink-500/10 border-pink-500/20 text-pink-300 hover:bg-pink-500/20" },
            { to: `/trips/${trip.id}/invoice`,   label: "Invoice",   cls: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20" },
          ].map(({ to, label, cls }) => (
            <Link key={to} to={to} className={`flex-1 flex items-center justify-center rounded-xl border px-2 py-2 text-[10px] font-semibold transition-all ${cls}`}>{label}</Link>
          ))}
        </div>
        <Link to={`/trips/${trip.id}/build`} className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/08 bg-white/5 px-5 py-2.5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all font-medium">
          <ArrowRight className="h-3.5 w-3.5" /> View Trip
        </Link>
      </div>
    </div>
  );
}