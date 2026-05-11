import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus, Search, Filter, ChevronDown, ChevronRight,
  MapPin, Compass, Sparkles, Plane, Globe, Star,
} from "lucide-react";

const MOCK_TRIPS = [
  { id: "trip-1", title: "Bali Serenity", startDate: "2025-06-15", endDate: "2025-06-25", coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop", planned: 85, isPublic: true, createdAt: "2025-05-01" },
  { id: "trip-2", title: "Paris & Rome", startDate: "2025-08-10", endDate: "2025-08-24", coverImage: "https://images.unsplash.com/photo-1502602881462-f224f46f5647?q=80&w=1200&auto=format&fit=crop", planned: 60, isPublic: false, createdAt: "2025-04-20" },
  { id: "trip-3", title: "Himalayan Trek", startDate: "2025-10-01", endDate: "2025-10-14", coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", planned: 40, isPublic: true, createdAt: "2025-05-05" },
];

const REGIONS = [
  { name: "North India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop", destinations: 12 },
  { name: "South India", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", destinations: 9 },
  { name: "Himalayas",   image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", destinations: 15 },
  { name: "Northeast",   image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", destinations: 8 },
  { name: "West India",  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop", destinations: 10 },
];

export default function Dashboard() {
  const [trips] = useState(MOCK_TRIPS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filterOption, setFilterOption] = useState("all");
  const [groupOption, setGroupOption] = useState("all");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  let processed = [...trips];
  if (searchTerm) processed = processed.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const now = new Date();
  if (filterOption === "upcoming")  processed = processed.filter(t => new Date(t.endDate) >= now);
  if (filterOption === "completed") processed = processed.filter(t => new Date(t.endDate) < now);
  if (filterOption === "public")    processed = processed.filter(t => t.isPublic);
  if (filterOption === "private")   processed = processed.filter(t => !t.isPublic);
  if (groupOption === "upcoming")   processed = processed.filter(t => new Date(t.endDate) >= now);
  if (groupOption === "completed")  processed = processed.filter(t => new Date(t.endDate) < now);
  processed.sort((a, b) => {
    if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOption === "a-z")    return a.title.localeCompare(b.title);
    if (sortOption === "z-a")    return b.title.localeCompare(a.title);
    return 0;
  });

  const closeAll = () => { setShowGroupDropdown(false); setShowFilterDropdown(false); setShowSortDropdown(false); };

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />
      <div className="orb orb-cyan" />

      <div className="relative z-10 p-4 sm:p-5">
        <div className="page-shell rounded-[28px] overflow-hidden min-h-[calc(100vh-40px)]">

          {/* ---- TOP BAR ---- */}
          <div className="topbar rounded-t-[28px]">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span className="t-signature text-xl text-white">Traveloop</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { to: "/trips",        label: "My Trips" },
                { to: "/destinations", label: "Explore" },
                { to: "/community",    label: "Community" },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/6 transition-all">
                  {label}
                </Link>
              ))}
            </nav>

            <Link to="/profile" className="w-9 h-9 rounded-full border-2 border-purple-500/50 flex items-center justify-center text-sm font-bold bg-gradient-to-br from-purple-600/30 to-pink-600/20 hover:border-purple-400 hover:scale-110 transition-all cursor-pointer" title="Profile">
              K
            </Link>
          </div>

          <div className="px-5 sm:px-8 py-8 space-y-10">

            {/* ---- HERO ---- */}
            <div className="relative h-[300px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10 animate-fade-in">
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover scale-105" alt="" />
              <div className="absolute inset-0 hero-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute top-5 right-5 animate-float">
                <div className="flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-purple-300">
                  <Star className="w-3 h-3 fill-current" /> Premium Travel OS
                </div>
              </div>

              <div className="relative z-10 h-full flex items-center px-6 sm:px-10">
                <div className="max-w-lg">
                  <div className="page-badge mb-4">
                    <Sparkles className="w-3 h-3" /> Your journey awaits
                  </div>
                  <h1 className="hero-title text-white leading-none mb-3">
                    Let's plan your<br />next adventure
                  </h1>
                  <p className="text-gray-300 text-base mb-7">
                    Plan. Collaborate. Explore. Memorable trips start here.
                  </p>

                  <div className="flex items-center max-w-[560px] rounded-2xl overflow-hidden border border-white/10 search-bar">
                    <div className="flex-1 flex items-center px-5">
                      <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input type="text" placeholder="Where do you want to go?" className="bg-transparent outline-none px-4 h-[52px] w-full text-white placeholder:text-gray-500 text-sm" />
                    </div>
                    <Link to="/explore" className="h-[42px] mx-2 px-6 rounded-xl btn-primary text-sm font-semibold flex items-center gap-2">
                      Explore <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- SEARCH / FILTER BAR ---- */}
            <div className="flex flex-wrap items-center gap-3 animate-fade-up delay-100">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search your trips..."
                  className="w-full h-[48px] rounded-2xl pl-11 pr-4 text-sm search-bar"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              {/* GROUP BY */}
              <div className="relative">
                <button onClick={() => { closeAll(); setShowGroupDropdown(v => !v); }}
                  className="h-[48px] px-4 rounded-2xl btn-glass flex items-center gap-2 text-sm text-gray-300">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="capitalize">{groupOption === "all" ? "Group by" : groupOption}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showGroupDropdown && (
                  <div className="absolute top-[54px] left-0 min-w-[150px] glass rounded-xl shadow-2xl z-30 overflow-hidden animate-slide-down">
                    {["all", "upcoming", "completed"].map(opt => (
                      <button key={opt} onClick={() => { setGroupOption(opt); closeAll(); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-white/10 capitalize text-sm text-gray-300 hover:text-white transition-all">
                        {opt === "all" ? "All Trips" : opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* FILTER */}
              <div className="relative">
                <button onClick={() => { closeAll(); setShowFilterDropdown(v => !v); }}
                  className="h-[48px] px-4 rounded-2xl btn-glass flex items-center gap-2 text-sm text-gray-300">
                  <Filter className="w-3.5 h-3.5" />
                  <span className="capitalize">{filterOption === "all" ? "Filter" : filterOption}</span>
                </button>
                {showFilterDropdown && (
                  <div className="absolute top-[54px] left-0 min-w-[150px] glass rounded-xl shadow-2xl z-30 overflow-hidden animate-slide-down">
                    {["all", "upcoming", "completed", "public", "private"].map(opt => (
                      <button key={opt} onClick={() => { setFilterOption(opt); closeAll(); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-white/10 capitalize text-sm text-gray-300 hover:text-white transition-all">
                        {opt === "all" ? "All" : opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SORT */}
              <div className="relative">
                <button onClick={() => { closeAll(); setShowSortDropdown(v => !v); }}
                  className="h-[48px] px-4 rounded-2xl btn-glass flex items-center gap-2 text-sm text-gray-300">
                  <span>Sort: <span className="text-white capitalize">{sortOption.replace("-", "→")}</span></span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-[54px] right-0 min-w-[150px] glass rounded-xl shadow-2xl z-30 overflow-hidden animate-slide-down">
                    {["newest", "oldest", "a-z", "z-a"].map(opt => (
                      <button key={opt} onClick={() => { setSortOption(opt); closeAll(); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-white/10 capitalize text-sm text-gray-300 hover:text-white transition-all">
                        {opt.replace("-", " → ")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ---- REGIONS ---- */}
            <section className="animate-fade-up delay-200">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title gradient-text">Top Regional Selections ✨</h2>
                <Link to="/destinations" className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm transition-all hover:gap-2.5">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {REGIONS.map((region, i) => (
                  <div key={i} className="relative h-[200px] sm:h-[220px] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer trip-card" style={{ animationDelay: `${i * 0.07}s` }}>
                    <img src={region.image} alt={region.name} className="w-full h-full object-cover image-hover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/15 transition-colors duration-500" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="t-heading text-white">{region.name}</h3>
                      <div className="flex items-center gap-1 mt-1 text-gray-300 text-xs">
                        <MapPin className="w-3 h-3 text-purple-400" /> {region.destinations} Destinations
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ---- TRIPS ---- */}
            <section className="pb-6 animate-fade-up delay-300">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title gradient-text">
                  {groupOption === "all" ? "Your" : groupOption} Trips ✨
                </h2>
                <Link to="/trips" className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm transition-all hover:gap-2.5">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {processed.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-44 border border-dashed border-white/10 rounded-2xl">
                  <Compass className="w-9 h-9 text-gray-600 mb-3" />
                  <p className="text-gray-500 text-sm">No matching trips found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {processed.map((trip, i) => (
                    <TripCard key={trip.id} trip={trip} delay={i * 0.09} />
                  ))}
                </div>
              )}

              <div className="flex justify-end mt-7">
                <Link to="/trips/new" className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl btn-primary text-sm font-semibold">
                  <Plus className="w-4 h-4" /> Plan a New Trip
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip, delay = 0 }) {
  return (
    <Link
      to={`/trips/${trip.id}/activities`}
      className="block rounded-2xl overflow-hidden border border-white/10 group trip-card animate-fade-up content-card"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-[188px] overflow-hidden relative">
        <img
          src={trip.coverImage || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"}
          alt={trip.title}
          className="w-full h-full object-cover image-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <div className="status-active text-[10px] rounded-full px-2.5 py-1 uppercase tracking-wider">Active</div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="t-heading text-white group-hover:text-purple-300 transition-colors">{trip.title}</h3>
        <p className="text-gray-500 text-xs mt-1 font-medium">
          {trip.startDate && new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Planning progress</span>
            <span className="text-purple-400 font-semibold">{trip.planned}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${trip.planned}%` }} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Plane className="w-3 h-3 text-purple-400" />
          Click to plan activities
        </div>
      </div>
    </Link>
  );
}