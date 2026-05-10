import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

import {
  Calendar,
  DollarSign,
  Plus,
  MapPin,
  Trash2,
  Sparkles,
  Navigation,
  Clock,
} from "lucide-react";

export default function ItineraryBuilder() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  const [sections, setSections] = useState([]);

  const fetchTrip = () => {
    axios
      .get(`/trips/${id}`)
      .then((res) => {
        setTrip(res.data);

        if (res.data.stops?.length > 0) {
          const mappedSections = res.data.stops.map((stop) => ({
            id: stop.id,
            title: stop.city,
            description:
              stop.description ||
              "Explore this destination and enjoy unforgettable experiences.",
            location: stop.city,
            startDate: stop.startDate?.split("T")[0] || "",
            endDate: stop.endDate?.split("T")[0] || "",
            budget: stop.budget || "",
            activities: stop.activities || [],
          }));

          setSections(mappedSections);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const addSection = async () => {
    try {
      const res = await axios.post(`/trips/${id}/stops`, {
        city: "New Destination",
        startDate: trip.startDate,
        endDate: trip.endDate,
        order: sections.length,
      });

      const newSection = {
        id: res.data.id,
        title: "New Destination",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        budget: "",
        activities: [],
      };

      setSections([...sections, newSection]);
    } catch (err) {
      console.error(err);
      alert("Failed to add section");
    }
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter((s) => s.id !== sectionId));
  };

  const updateSection = (id, field, value) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, [field]: value }
          : section
      )
    );
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-6 text-lg text-gray-400">
            Loading your itinerary...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Intelligent Itinerary Builder
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            {trip.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-4 text-gray-400">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
              <Clock className="h-4 w-4 text-purple-400" />

              {new Date(trip.startDate).toLocaleDateString()} -{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
              <MapPin className="h-4 w-4 text-purple-400" />

              {sections.length} Destinations
            </div>
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] p-8 shadow-2xl backdrop-blur-xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                {/* GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />

                {/* CONTENT */}
                <div className="relative z-10 p-8">
                  {/* TOP */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <span className="text-sm text-purple-300 font-medium">
                        SECTION {index + 1}
                      </span>

                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) =>
                          updateSection(
                            section.id,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Section Title"
                        className="mt-2 w-full bg-transparent text-3xl font-black outline-none placeholder:text-gray-500"
                      />
                    </div>

                    <button
                      onClick={() => removeSection(section.id)}
                      className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-red-300 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>

                  {/* LOCATION */}
                  <div className="mt-6">
                    <label className="mb-3 block text-sm font-medium text-gray-300">
                      Location
                    </label>

                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />

                      <input
                        type="text"
                        value={section.location}
                        onChange={(e) =>
                          updateSection(
                            section.id,
                            "location",
                            e.target.value
                          )
                        }
                        placeholder="Enter destination"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mt-6">
                    <label className="mb-3 block text-sm font-medium text-gray-300">
                      Description
                    </label>

                    <textarea
                      rows={4}
                      value={section.description}
                      onChange={(e) =>
                        updateSection(
                          section.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe this travel section..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* DATE + BUDGET */}
                  <div className="mt-8 grid lg:grid-cols-3 gap-6">
                    {/* START DATE */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-gray-300">
                        Start Date
                      </label>

                      <div className="relative">
                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />

                        <input
                          type="date"
                          value={section.startDate}
                          onChange={(e) =>
                            updateSection(
                              section.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* END DATE */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-gray-300">
                        End Date
                      </label>

                      <div className="relative">
                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />

                        <input
                          type="date"
                          value={section.endDate}
                          onChange={(e) =>
                            updateSection(
                              section.id,
                              "endDate",
                              e.target.value
                            )
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* BUDGET */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-gray-300">
                        Budget
                      </label>

                      <div className="relative">
                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />

                        <input
                          type="number"
                          value={section.budget}
                          onChange={(e) =>
                            updateSection(
                              section.id,
                              "budget",
                              e.target.value
                            )
                          }
                          placeholder="Estimated budget"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ACTIVITIES */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl font-bold">
                        Activities
                      </h3>

                      <button className="flex items-center gap-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-purple-300 hover:bg-purple-500/20 transition-all">
                        <Plus className="h-4 w-4" />
                        Add Activity
                      </button>
                    </div>

                    {section.activities?.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-gray-500">
                        No activities added yet
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-semibold">
                                  {activity.title}
                                </h4>

                                <p className="mt-1 text-sm text-gray-400 capitalize">
                                  {activity.category}
                                </p>
                              </div>

                              <div className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-sm text-purple-300">
                                ${activity.cost}
                              </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                              <Navigation className="h-4 w-4 text-purple-400" />
                              Planned Activity
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* TAGS */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 px-5 py-3 text-sm text-purple-300">
                      Hotels Included
                    </div>

                    <div className="rounded-2xl border border-pink-500/20 bg-pink-500/10 px-5 py-3 text-sm text-pink-300">
                      Activities Planned
                    </div>

                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-300">
                      AI Recommendations Enabled
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ADD SECTION BUTTON */}
            <button
              onClick={addSection}
              className="group flex w-full items-center justify-center gap-4 rounded-3xl border border-dashed border-purple-500/30 bg-purple-500/5 px-8 py-8 text-xl font-semibold text-purple-300 backdrop-blur-xl transition-all duration-300 hover:bg-purple-500/10 hover:scale-[1.01]"
            >
              <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90" />
              Add Another Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}