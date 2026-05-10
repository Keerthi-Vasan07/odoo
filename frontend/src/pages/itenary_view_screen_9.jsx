import { useState } from "react";

import {
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
} from "lucide-react";

export default function ItineraryViewPage() {
  const [search, setSearch] = useState("");

  const itinerary = [
    {
      day: "Day 1",
      activities: [
        {
          title: "Morning Beach Walk",
          expense: "$40",
          location: "Bali Beach",
          time: "8:00 AM",
        },
        {
          title: "Paragliding Adventure",
          expense: "$120",
          location: "Mountain View Point",
          time: "12:00 PM",
        },
        {
          title: "Night Market Visit",
          expense: "$60",
          location: "City Center",
          time: "7:00 PM",
        },
      ],
    },

    {
      day: "Day 2",
      activities: [
        {
          title: "Island Boat Ride",
          expense: "$90",
          location: "Island Harbor",
          time: "9:00 AM",
        },
        {
          title: "Luxury Dinner",
          expense: "$150",
          location: "Sky Restaurant",
          time: "8:00 PM",
        },
        {
          title: "Beach Party",
          expense: "$75",
          location: "Palm Beach",
          time: "10:00 PM",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Smart Itinerary Timeline
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            Itinerary View ✈
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Organize your travel schedule, activities, and budget beautifully
            with a premium travel timeline interface.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] p-8 shadow-2xl backdrop-blur-xl">
          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

              <input
                type="text"
                placeholder="Search itinerary..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* BUTTONS */}
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

          {/* TITLE */}
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black">
              Itinerary For Selected Place
            </h2>

            <p className="mt-4 text-lg text-gray-400">
              Manage your activities, travel schedule, and expenses
            </p>
          </div>

          {/* ITINERARY */}
          <div className="space-y-16">
            {itinerary.map((dayData, dayIndex) => (
              <div key={dayIndex}>
                {/* DAY TITLE */}
                <div className="mb-10 flex items-center gap-4">
                  <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 px-6 py-3 text-xl font-bold text-purple-300">
                    {dayData.day}
                  </div>

                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                {/* ACTIVITIES */}
                <div className="space-y-8">
                  {dayData.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      {/* CONNECTOR */}
                      {index !== dayData.activities.length - 1 && (
                        <div className="absolute left-1/2 top-full z-0 h-12 w-[2px] -translate-x-1/2 bg-gradient-to-b from-purple-500 to-transparent" />
                      )}

                      {/* CARD */}
                      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">
                        {/* BG */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />

                        {/* CONTENT */}
                        <div className="relative z-10 grid lg:grid-cols-[1fr_220px] gap-6 p-8">
                          {/* LEFT */}
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-xs font-semibold shadow-lg">
                                Planned Activity
                              </div>

                              <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs text-purple-300">
                                #{index + 1}
                              </div>
                            </div>

                            <h3 className="text-3xl font-black group-hover:text-purple-300 transition-all">
                              {activity.title}
                            </h3>

                            {/* DETAILS */}
                            <div className="mt-6 flex flex-wrap gap-4">
                              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
                                <MapPin className="h-4 w-4 text-purple-400" />

                                {activity.location}
                              </div>

                              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
                                <Clock className="h-4 w-4 text-purple-400" />

                                {activity.time}
                              </div>

                              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
                                <Calendar className="h-4 w-4 text-purple-400" />

                                Scheduled
                              </div>
                            </div>
                          </div>

                          {/* EXPENSE */}
                          <div className="flex flex-col items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10 p-6 text-center">
                            <DollarSign className="h-10 w-10 text-purple-300" />

                            <p className="mt-4 text-sm uppercase tracking-wide text-gray-400">
                              Expense
                            </p>

                            <h3 className="mt-2 text-4xl font-black text-purple-300">
                              {activity.expense}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL BUDGET */}
          <div className="mt-16 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-3xl font-black">
                  Total Trip Budget
                </h3>

                <p className="mt-3 text-gray-400">
                  Combined expense estimation for your journey
                </p>
              </div>

              <div className="text-5xl font-black text-purple-300">
                $535
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}