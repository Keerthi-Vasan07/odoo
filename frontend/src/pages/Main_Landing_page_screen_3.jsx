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
    <div className="min-h-screen bg-[#04070f] text-white px-5 py-5">
      <div className="border border-white/20 rounded-[28px] overflow-hidden bg-[#050816]">
        {/* TOP NAV */}
        <div className="h-[70px] border-b border-white/10 flex items-center justify-between px-8">
          <h1 className="text-[30px] font-semibold tracking-wide">
            Traveloop
          </h1>

          <div className="h-11 w-11 rounded-full border-2 border-purple-500 flex items-center justify-center text-lg font-semibold">
            K
          </div>
        </div>

        <div className="px-7 py-7">
          {/* HERO */}
          <div className="relative overflow-hidden rounded-[30px] h-[330px] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 h-full flex items-center px-8">
              <div className="max-w-[620px]">
                <h1 className="text-[62px] leading-[68px] font-black">
                  Let’s plan your
                  <br />
                  next adventure
                </h1>

                <p className="mt-4 text-gray-300 text-xl">
                  Plan. Collaborate. Explore. Memorable trips start here.
                </p>

                {/* SEARCH */}
                <div className="mt-8 flex items-center overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/90 backdrop-blur-xl max-w-[650px]">
                  <div className="flex-1 flex items-center px-5">
                    <Search className="h-5 w-5 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="w-full bg-transparent px-4 py-5 outline-none text-white placeholder:text-gray-400"
                    />
                  </div>

                  <button className="h-[72px] px-10 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
                    Explore
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="mt-8 flex flex-col xl:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />

              <input
                type="text"
                placeholder="Search destinations, trips, or places..."
                className="w-full h-[62px] rounded-2xl bg-[#0b1020] border border-white/10 pl-14 pr-4 text-white outline-none placeholder:text-gray-500"
              />
            </div>

            <div className="flex gap-4">
              <button className="h-[62px] px-6 rounded-2xl border border-white/10 bg-[#0b1020] flex items-center gap-3 text-gray-200">
                Group by
                <span className="font-medium">All Trips</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <button className="h-[62px] px-7 rounded-2xl border border-white/10 bg-[#0b1020] flex items-center gap-3 text-gray-200">
                <Filter className="h-5 w-5" />
                Filter
              </button>

              <button className="h-[62px] px-7 rounded-2xl border border-white/10 bg-[#0b1020] flex items-center gap-3 text-gray-200">
                Sort by
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* TOP REGIONAL */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[38px] font-bold">
                Top Regional Selections ✨
              </h2>

              <button className="text-purple-400 text-lg flex items-center gap-2">
                View all
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
              {regionalSelections.map((region, index) => (
                <div
                  key={index}
                  className="relative h-[260px] rounded-[24px] overflow-hidden border border-white/10 group cursor-pointer"
                >
                  <img
                    src={region.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <h3 className="text-2xl font-bold">{region.name}</h3>

                    <div className="flex items-center gap-2 mt-2 text-gray-300">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      {region.destinations} Destinations
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PREVIOUS TRIPS */}
          <section className="mt-14 pb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[38px] font-bold">
                Previous Trips ✨
              </h2>

              <button className="text-purple-400 text-lg flex items-center gap-2">
                View all
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {trips.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
                <h3 className="text-2xl font-bold">
                  No trips planned yet
                </h3>

                <p className="mt-3 text-gray-400">
                  Start your first adventure with Traveloop.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
                {trips.slice(0, 3).map((trip) => (
                  <Link
                    key={trip.id}
                    to={`/trips/${trip.id}/build`}
                    className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1020] group"
                  >
                    <div className="relative h-[260px] overflow-hidden">
                      <img
                        src={
                          trip.coverImage ||
                          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                        }
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-3xl font-bold">
                        {trip.title}
                      </h3>

                      <p className="mt-2 text-gray-400">
                        {trip.startDate &&
                          new Date(
                            trip.startDate
                          ).toLocaleDateString()}
                      </p>

                      <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[80%] bg-gradient-to-r from-purple-500 to-pink-500" />
                      </div>

                      <div className="mt-3 text-purple-300 text-sm">
                        80% planned
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* FLOATING BUTTON */}
            <div className="flex justify-end mt-8">
              <Link
                to="/trips/new"
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-5 text-xl font-semibold shadow-2xl hover:scale-105 transition-all"
              >
                <Plus className="h-6 w-6" />
                Plan a trip
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}