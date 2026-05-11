import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Sparkles, Plus, Upload } from "lucide-react";
import axios from "../api/axios";

export default function CreateTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", destination: "", startDate: "", endDate: "" });

  const suggestions = [
    { title: "Bali Adventure",  image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop" },
    { title: "Swiss Alps",      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" },
    { title: "Dubai Skyline",   image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop" },
    { title: "Tokyo Nights",    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop" },
  ];

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await axios.post("/trips", formData);
      navigate(`/trips/${res.data.id}/build`);
    } catch (err) {
      console.error(err); alert("Error creating trip"); setLoading(false);
    }
  };

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 animate-fade-up">
          <div className="page-badge mb-4">
            <Sparkles className="h-3 w-3" /> Smart Travel Planning
          </div>
          <h1 className="hero-title">Create Your Dream Trip ✈</h1>
          <p className="mt-2 text-gray-400 text-sm max-w-xl">
            Build personalized itineraries, discover destinations, and organize your entire journey beautifully.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-2xl border border-white/08 content-card animate-fade-up delay-100">

          {/* HERO BANNER */}
          <div className="relative h-44 sm:h-52 overflow-hidden border-b border-white/08">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="relative z-10 px-8 py-10">
              <h2 className="t-section text-white">Plan a New Adventure</h2>
              <p className="mt-2 text-gray-300 text-sm max-w-md">
                Organize destinations, activities, budgets, and memorable experiences all in one place.
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-8">

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Trip Name */}
              <div>
                <label className="t-label text-gray-400 uppercase tracking-widest block mb-2">Trip Name</label>
                <input type="text" required placeholder="Summer in Europe" value={formData.title} onChange={set("title")}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
              </div>

              {/* Destination */}
              <div>
                <label className="t-label text-gray-400 uppercase tracking-widest block mb-2">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-4 w-4" />
                  <input type="text" placeholder="Enter destination" value={formData.destination} onChange={set("destination")}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                </div>
              </div>

              {/* Dates */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Start Date", field: "startDate" },
                  { label: "End Date",   field: "endDate" },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="t-label text-gray-400 uppercase tracking-widest block mb-2">{label}</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-4 w-4" />
                      <input type="date" required value={formData[field]} onChange={set(field)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <label className="t-label text-gray-400 uppercase tracking-widest block mb-2">Description</label>
                <textarea rows={4} placeholder="Describe your dream journey..." value={formData.description} onChange={set("description")}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all" />
              </div>

              {/* Upload */}
              <div>
                <label className="t-label text-gray-400 uppercase tracking-widest block mb-2">Cover Image</label>
                <button type="button" className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/5 px-6 py-6 text-sm text-purple-300 hover:bg-purple-500/10 transition-all">
                  <Upload className="h-4 w-4" /> Upload Cover Image
                </button>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl btn-primary px-8 py-4 text-sm font-semibold disabled:opacity-50">
                <Plus className="h-4 w-4" />
                {loading ? "Creating Trip..." : "Create Trip & Start Planning"}
              </button>
            </form>

            {/* RIGHT */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="t-section text-white">Suggested Destinations</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">View All</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {suggestions.map((item, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer card-hover">
                    <img src={item.image} alt="" className="h-44 w-full object-cover image-hover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h4 className="t-heading text-white">{item.title}</h4>
                      <p className="mt-0.5 text-xs text-gray-300">Explore destination</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Card */}
              <div className="mt-6 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-5 backdrop-blur-xl">
                <h4 className="t-heading text-white">AI Travel Suggestions 🤖</h4>
                <p className="mt-2 text-gray-300 text-sm leading-relaxed">
                  Traveloop intelligently recommends destinations, budgets, activities, and personalized itineraries based on your travel interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}