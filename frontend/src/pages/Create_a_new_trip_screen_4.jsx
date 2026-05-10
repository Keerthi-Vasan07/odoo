import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {
  Calendar,
  MapPin,
  Sparkles,
  Plus,
  Upload,
} from "lucide-react";

export default function CreateTrip() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const suggestions = [
    {
      title: "Bali Adventure",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Swiss Alps",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Dubai Skyline",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Tokyo Nights",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/trips", formData);
      navigate(`/trips/${res.data.id}/build`);
    } catch (err) {
      console.error(err);
      alert("Error creating trip");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* TOP TITLE */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Smart Travel Planning
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            Create Your Dream Trip ✈
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            Build personalized itineraries, discover destinations, and organize
            your entire journey beautifully with Traveloop.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] shadow-2xl backdrop-blur-xl">
          {/* HERO */}
          <div className="relative overflow-hidden border-b border-white/10">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 px-10 py-14">
              <h2 className="text-4xl font-black">
                Plan a New Adventure
              </h2>

              <p className="mt-3 text-lg text-gray-300">
                Organize destinations, activities, budgets, and memorable
                experiences all in one place.
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-2 gap-10 p-10">
            {/* LEFT SIDE FORM */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* TRIP NAME */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-300">
                  Trip Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Summer in Europe"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* DESTINATION */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-300">
                  Destination
                </label>

                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />

                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        destination: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* DATES */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-300">
                    Start Date
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />

                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-300">
                    End Date
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />

                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-300">
                  Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Describe your dream journey..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* UPLOAD */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-300">
                  Cover Image
                </label>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/5 px-6 py-8 text-purple-300 hover:bg-purple-500/10 transition-all"
                >
                  <Upload className="h-5 w-5" />
                  Upload Cover Image
                </button>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-5 text-lg font-semibold shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                <Plus className="h-5 w-5" />

                {loading
                  ? "Creating Trip..."
                  : "Create Trip & Start Planning"}
              </button>
            </form>

            {/* RIGHT SIDE */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">
                  Suggested Destinations
                </h3>

                <button className="text-purple-400 hover:text-purple-300">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-64 w-full object-cover group-hover:scale-110 transition-all duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-5 left-5">
                      <h4 className="text-xl font-bold">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm text-gray-300">
                        Explore destination
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* INFO CARD */}
              <div className="mt-8 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-xl">
                <h4 className="text-xl font-bold">
                  AI Travel Suggestions 🤖
                </h4>

                <p className="mt-3 text-gray-300 leading-relaxed">
                  Traveloop intelligently recommends destinations, budgets,
                  activities, and personalized itineraries based on your travel
                  interests and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}