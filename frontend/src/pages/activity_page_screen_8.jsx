import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Plus, ArrowRight, Sparkles, Trash2, MapPin, Clock, DollarSign, ArrowLeft, Plane } from "lucide-react";

const CATEGORIES = ["Leisure", "Culture", "Adventure", "Food", "Nature", "Nightlife", "Shopping", "Wellness"];

const CATEGORY_COLORS = {
  Leisure:   { bg: "bg-purple-500/10",  border: "border-purple-500/20",  text: "text-purple-300" },
  Culture:   { bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-300" },
  Adventure: { bg: "bg-orange-500/10",  border: "border-orange-500/20",  text: "text-orange-300" },
  Food:      { bg: "bg-pink-500/10",    border: "border-pink-500/20",    text: "text-pink-300" },
  Nature:    { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-300" },
  Nightlife: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20", text: "text-fuchsia-300" },
  Shopping:  { bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    text: "text-cyan-300" },
  Wellness:  { bg: "bg-teal-500/10",    border: "border-teal-500/20",    text: "text-teal-300" },
  general:   { bg: "bg-gray-500/10",    border: "border-gray-500/20",    text: "text-gray-300" },
};

const DEFAULT_ACTIVITIES = [
  { id: 1, title: "Morning Beach Walk",  category: "Leisure",   cost: 0,   time: "8:00 AM",  location: "Beach Front" },
  { id: 2, title: "Museum Visit",        category: "Culture",   cost: 25,  time: "11:00 AM", location: "City Center" },
  { id: 3, title: "Sunset Paragliding", category: "Adventure", cost: 120, time: "5:00 PM",  location: "Mountain View" },
];

export default function ActivitySelectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [newTitle, setNewTitle]     = useState("");
  const [newCategory, setNewCategory] = useState("Leisure");
  const [newCost, setNewCost]       = useState("");
  const [showForm, setShowForm]     = useState(false);

  const addActivity = () => {
    if (!newTitle.trim()) return;
    setActivities(prev => [...prev, { id: Date.now(), title: newTitle.trim(), category: newCategory, cost: Number(newCost) || 0, time: "Flexible", location: "TBD" }]);
    setNewTitle(""); setNewCost(""); setShowForm(false);
  };

  const removeActivity = id => setActivities(prev => prev.filter(a => a.id !== id));
  const totalCost = activities.reduce((s, a) => s + Number(a.cost), 0);
  const handleDone = () => navigate(`/trips/${id}/view`, { state: { activities } });

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ---- HEADER ---- */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 animate-fade-up">
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
            </Link>
            <div className="page-badge mb-3">
              <Sparkles className="h-3 w-3" /> Activity Selection · Step 1
            </div>
            <h1 className="hero-title">
              Plan Your <span className="gradient-text">Days</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm max-w-md">
              Add and arrange activities for an unforgettable itinerary.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass rounded-2xl px-6 py-4 text-center min-w-[120px]">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Total Budget</p>
              <p className="text-2xl font-black text-purple-300 mt-1">${totalCost}</p>
            </div>
            <button onClick={handleDone} className="flex items-center gap-2 rounded-2xl btn-primary px-7 py-3.5 text-sm font-semibold">
              Done Planning <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ---- MAIN CONTAINER ---- */}
        <div className="rounded-2xl border border-white/08 p-6 sm:p-8 animate-fade-up delay-100 content-card">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <h2 className="t-section text-white">Selected Activities</h2>
              <p className="text-gray-500 text-sm mt-0.5">{activities.length} activities planned</p>
            </div>
            <button onClick={() => setShowForm(v => !v)}
              className="flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/25 px-5 py-2.5 text-purple-300 hover:bg-purple-500/20 transition-all text-sm font-semibold">
              <Plus className="h-4 w-4" /> Add Activity
            </button>
          </div>

          {/* ---- ADD FORM ---- */}
          {showForm && (
            <div className="mb-7 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 animate-scale-in">
              <h3 className="t-label text-purple-300 uppercase tracking-widest mb-4">New Activity</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input type="text" placeholder="Activity name..." value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-gray-600 focus:ring-2 focus:ring-purple-500 outline-none" />
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
                  className="rounded-xl border border-white/10 bg-[#0a0e1a] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <input type="number" placeholder="Cost ($)" value={newCost} onChange={e => setNewCost(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-gray-600 focus:ring-2 focus:ring-purple-500 outline-none" />
                <button onClick={addActivity} className="rounded-xl btn-primary px-4 py-3 text-sm font-semibold">Add →</button>
              </div>
            </div>
          )}

          {/* ---- ACTIVITY GRID ---- */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity, i) => {
              const colors = CATEGORY_COLORS[activity.category] || CATEGORY_COLORS.general;
              return (
                <div key={activity.id} className="group relative rounded-2xl border border-white/08 bg-white/[0.03] p-5 card-hover animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-4 ${colors.bg} ${colors.border} border ${colors.text}`}>
                    <Plane className="w-2.5 h-2.5" /> {activity.category}
                  </div>
                  <h4 className="t-heading text-white mb-3 group-hover:text-purple-300 transition-colors">{activity.title}</h4>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3 text-purple-400" /> {activity.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3 text-purple-400" /> {activity.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/08">
                    <div className="flex items-center gap-1 text-purple-300 font-bold text-sm">
                      <DollarSign className="w-3.5 h-3.5" />
                      {activity.cost === 0 ? "Free" : `$${activity.cost}`}
                    </div>
                    <button onClick={() => removeActivity(activity.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all p-1.5 rounded-lg hover:bg-red-500/10">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Ghost add card */}
            <button onClick={() => setShowForm(true)}
              className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 flex flex-col items-center justify-center gap-3 min-h-[180px] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors font-medium">Add Activity</span>
            </button>
          </div>

          {/* ---- DONE BUTTON ---- */}
          <div className="flex justify-end mt-8 pt-7 border-t border-white/07">
            <button onClick={handleDone} className="flex items-center gap-2.5 rounded-2xl btn-primary px-9 py-4 text-base font-semibold">
              Done Planning <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
