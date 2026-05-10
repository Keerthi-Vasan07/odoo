import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  MapPin,
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
    <div className="min-h-screen bg-black text-white p-4">
      <div className="border border-white/15 rounded-[30px] overflow-hidden bg-[#050816] shadow-[0_0_100px_rgba(120,0,255,0.12)]">

        {/* TOPBAR */}
        <div className="h-[74px] px-8 border-b border-white/10 flex items-center justify-between">

          <h1 className="text-[32px] tracking-wide font-semibold">
            Traveloop
          </h1>

          <div className="w-11 h-11 rounded-full border border-purple-500 flex items-center justify-center text-lg bg-white/5 backdrop-blur-xl">
            K
          </div>
        </div>

        <div className="p-6">

          {/* HERO */}
          <div className="relative h-[320px] rounded-[28px] overflow-hidden border border-white/10">

            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="relative z-10 h-full flex items-center px-8">

              <div className="max-w-[600px]">

                <h1
                  className="text-[64px] leading-[66px] font-semibold"
                  style={{
                    fontFamily: "cursive",
                  }}
                >
                  Let&apos;s plan your
                  <br />
                  next adventure
                </h1>

                <p className="mt-4 text-gray-300 text-[22px]">
                  Plan. Collaborate. Explore. Memorable trips start here.
                </p>

                {/* SEARCH */}
                <div className="mt-8 flex items-center bg-[#090d18]/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-2xl max-w-[650px]">

                  <div className="flex-1 flex items-center px-5">
                    <Search className="w-5 h-5 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="bg-transparent outline-none px-4 h-[68px] w-full text-white placeholder:text-gray-500"
                    />
                  </div>

                  <button className="h-[60px] mr-2 px-10 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 font-semibold text-lg flex items-center gap-2 hover:scale-[1.02] transition-all">

                    Explore
                    <ChevronRight className="w-5 h-5" />

                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="mt-7 flex items-center gap-4">

            <div className="flex-1 relative">

              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                type="text"
                placeholder="Search destinations, trips, or places..."
                className="w-full h-[58px] rounded-2xl bg-[#090d18] border border-white/10 pl-14 pr-5 outline-none placeholder:text-gray-500"
              />
            </div>

            <button className="h-[58px] px-6 rounded-2xl bg-[#090d18] border border-white/10 flex items-center gap-3">
              Group by
              <span className="text-white">All Trips</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="h-[58px] px-6 rounded-2xl bg-[#090d18] border border-white/10 flex items-center gap-3">
              <Filter className="w-5 h-5" />
              Filter
            </button>

            <button className="h-[58px] px-6 rounded-2xl bg-[#090d18] border border-white/10 flex items-center gap-3">
              Sort by
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* REGIONAL */}
          <section className="mt-10">

            <div className="flex items-center justify-between mb-5">

              <h2
                className="text-[42px]"
                style={{
                  fontFamily: "cursive",
                }}
              >
                Top Regional Selections ✨
              </h2>

              <button className="text-purple-400 flex items-center gap-2">
                View all
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-5">

              {regionalSelections.map((region, index) => (
                <div
                  key={index}
                  className="relative h-[235px] rounded-[24px] overflow-hidden border border-white/10 group cursor-pointer"
                >

                  <img
                    src={region.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4">

                    <h3 className="text-[28px] font-semibold">
                      {region.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-gray-300">

                      <MapPin className="w-4 h-4 text-purple-400" />

                      {region.destinations} Destinations
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PREVIOUS */}
          <section className="mt-12 pb-8">

            <div className="flex items-center justify-between mb-5">

              <h2
                className="text-[42px]"
                style={{
                  fontFamily: "cursive",
                }}
              >
                Previous Trips ✨
              </h2>

              <button className="text-purple-400 flex items-center gap-2">
                View all
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">

              {trips.slice(0, 3).map((trip) => (
                <Link
                  key={trip.id}
                  to={`/trips/${trip.id}/build`}
                  className="rounded-[28px] overflow-hidden border border-white/10 bg-[#090d18]"
                >

                  <div className="h-[220px] overflow-hidden">

                    <img
                      src={
                        trip.coverImage ||
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  <div className="p-5">

                    <h3 className="text-[34px] font-semibold">
                      {trip.title}
                    </h3>

                    <p className="text-gray-400 mt-1">
                      {trip.startDate &&
                        new Date(trip.startDate).toLocaleDateString()}
                    </p>

                    <div className="mt-5 h-[6px] bg-white/10 rounded-full overflow-hidden">

                      <div className="w-[80%] h-full bg-gradient-to-r from-purple-500 to-pink-500" />

                    </div>

                    <div className="mt-2 text-purple-300">
                      80% planned
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-8">

              <Link
                to="/trips/new"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-xl font-semibold shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 transition-all"
              >

                <Plus className="w-6 h-6" />
                Plan a trip

              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}