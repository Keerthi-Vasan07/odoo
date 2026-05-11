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

  const addSection = () => {
  const newSection = {
    id: Date.now(),
    title: `Destination ${sections.length + 1}`,
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    budget: "",
    activities: [],
  };

  setSections((prev) => [...prev, newSection]);
};

  const addActivity = (sectionId) => {
    const newActivity = {
      id: Date.now(),
      title: "New Activity",
      category: "general",
      cost: 0,
    };

    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, activities: [...(section.activities || []), newActivity] }
          : section
      )
    );
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
      <div className="page-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-5 text-gray-400 text-sm font-medium">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8 animate-fade-up">
          <div className="page-badge mb-4">
            <Sparkles className="h-3 w-3" /> Intelligent Itinerary Builder
          </div>
          <h1 className="hero-title">{trip.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/08 bg-white/5 px-4 py-2.5 text-xs text-gray-300 font-medium">
              <Clock className="h-3.5 w-3.5 text-purple-400" />
              {new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/08 bg-white/5 px-4 py-2.5 text-xs text-gray-300 font-medium">
              <MapPin className="h-3.5 w-3.5 text-purple-400" />
              {sections.length} Destinations
            </div>
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-2xl border border-white/08 p-6 sm:p-8 content-card animate-fade-up delay-100">
          <div className="space-y-5">
            {sections.map((section, index) => (
              <div key={section.id} className="relative overflow-hidden rounded-2xl border border-white/08 bg-white/[0.025] backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/4 to-pink-500/3" />
                <div className="relative z-10 p-5 sm:p-7">
                  {/* TOP */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <span className="t-label text-purple-300 uppercase tracking-widest">Section {index + 1}</span>
                      <input type="text" value={section.title}
                        onChange={e => updateSection(section.id, "title", e.target.value)}
                        placeholder="Section Title"
                        className="mt-1.5 w-full bg-transparent t-section text-white outline-none placeholder:text-gray-600"
                      />
                    </div>
                    <button onClick={() => removeSection(section.id)}
                      className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs text-red-300 hover:bg-red-500/20 transition-all font-semibold flex-shrink-0">
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>

                  {/* FIELDS */}
                  <div className="space-y-4">
                    {/* Location */}
                    <div>
                      <label className="t-label text-gray-400 uppercase tracking-widest block mb-1.5">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-4 w-4" />
                        <input type="text" value={section.location} onChange={e => updateSection(section.id, "location", e.target.value)} placeholder="Enter destination"
                          className="w-full rounded-xl border border-white/08 bg-white/5 px-11 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="t-label text-gray-400 uppercase tracking-widest block mb-1.5">Description</label>
                      <textarea rows={3} value={section.description} onChange={e => updateSection(section.id, "description", e.target.value)} placeholder="Describe this travel section..."
                        className="w-full rounded-xl border border-white/08 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
                    </div>

                    {/* Date + Budget */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { label: "Start Date", field: "startDate", type: "date",   icon: Calendar,   placeholder: "" },
                        { label: "End Date",   field: "endDate",   type: "date",   icon: Calendar,   placeholder: "" },
                        { label: "Budget",     field: "budget",    type: "number", icon: DollarSign, placeholder: "Estimated budget" },
                      ].map(({ label, field, type, icon: Icon, placeholder }) => (
                        <div key={field}>
                          <label className="t-label text-gray-400 uppercase tracking-widest block mb-1.5">{label}</label>
                          <div className="relative">
                            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-4 w-4" />
                            <input type={type} value={section[field]} onChange={e => updateSection(section.id, field, e.target.value)} placeholder={placeholder}
                              className="w-full rounded-xl border border-white/08 bg-white/5 px-11 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Activities */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="t-heading text-white">Activities</h3>
                        <button onClick={() => addActivity(section.id)}
                          className="flex items-center gap-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 px-3.5 py-2 text-xs text-purple-300 hover:bg-purple-500/20 transition-all font-semibold">
                          <Plus className="h-3.5 w-3.5" /> Add Activity
                        </button>
                      </div>
                      {section.activities?.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-white/08 bg-white/[0.02] p-6 text-center text-gray-500 text-sm">No activities added yet</div>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {section.activities.map(activity => (
                            <div key={activity.id} className="rounded-xl border border-white/08 bg-white/5 p-4 backdrop-blur-xl">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-sm font-semibold text-white">{activity.title}</h4>
                                  <p className="mt-0.5 text-xs text-gray-400 capitalize">{activity.category}</p>
                                </div>
                                <div className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-xs text-purple-300 font-semibold">${activity.cost}</div>
                              </div>
                              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                                <Navigation className="h-3.5 w-3.5 text-purple-400" /> Planned Activity
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        { label: "Hotels Included",          cls: "border-purple-500/20 bg-purple-500/10 text-purple-300" },
                        { label: "Activities Planned",        cls: "border-pink-500/20   bg-pink-500/10   text-pink-300" },
                        { label: "AI Recommendations Enabled",cls: "border-cyan-500/20   bg-cyan-500/10   text-cyan-300" },
                      ].map(({ label, cls }) => (
                        <div key={label} className={`rounded-xl border px-3.5 py-2 text-xs font-medium ${cls}`}>{label}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ADD SECTION BUTTON */}
            <button onClick={addSection}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/5 px-8 py-6 text-sm font-semibold text-purple-300 backdrop-blur-xl transition-all hover:bg-purple-500/10">
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
              Add Another Destination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}