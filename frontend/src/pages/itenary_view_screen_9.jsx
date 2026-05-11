import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import {
  Sparkles, Calendar, DollarSign, MapPin, Clock, ArrowLeft,
  CheckSquare, FileText, FileSpreadsheet, Globe,
} from "lucide-react";

const FALLBACK = [
  { id: "f1", title: "Morning Beach Walk",  category: "Leisure",   cost: 0,   time: "8:00 AM",  location: "Beach Front" },
  { id: "f2", title: "Museum Visit",        category: "Culture",   cost: 25,  time: "11:00 AM", location: "City Center" },
  { id: "f3", title: "Sunset Paragliding",  category: "Adventure", cost: 120, time: "5:00 PM",  location: "Mountain View" },
  { id: "f4", title: "Island Boat Ride",    category: "Leisure",   cost: 90,  time: "9:00 AM",  location: "Island Harbor" },
  { id: "f5", title: "Luxury Dinner",       category: "Food",      cost: 150, time: "8:00 PM",  location: "Sky Restaurant" },
];

const CAT_ACCENT = {
  Leisure:   "border-purple-500/20  bg-purple-500/5",
  Culture:   "border-blue-500/20    bg-blue-500/5",
  Adventure: "border-orange-500/20  bg-orange-500/5",
  Food:      "border-pink-500/20    bg-pink-500/5",
  Nature:    "border-emerald-500/20 bg-emerald-500/5",
  default:   "border-gray-500/20    bg-gray-500/5",
};

export default function ItineraryViewPage() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { id }   = useParams();

  const activities = location.state?.activities || FALLBACK;
  const totalCost  = activities.reduce((s, a) => s + Number(a.cost || 0), 0);

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ---- NAV ROW ---- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Checklist", route: `/trips/${id}/checklist`, icon: CheckSquare, color: "text-purple-400" },
              { label: "Trip Notes", route: `/trips/${id}/notes`,    icon: FileText,    color: "text-pink-400" },
              { label: "Invoices",   route: `/trips/${id}/invoice`,  icon: FileSpreadsheet, color: "text-cyan-400" },
            ].map(({ label, route, icon: Icon, color }) => (
              <button key={label} onClick={() => navigate(route)}
                className="flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium hover:border-purple-500/30 transition-all">
                <Icon className={`h-3.5 w-3.5 ${color}`} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* ---- HEADER ---- */}
        <div className="mb-8 animate-fade-up delay-100">
          <div className="page-badge mb-4">
            <Sparkles className="h-3 w-3" /> Smart Itinerary Timeline
          </div>
          <h1 className="hero-title">
            Trip Overview <span className="gradient-text">✈</span>
          </h1>
          <p className="mt-2 text-gray-400 text-sm max-w-xl">
            Your curated schedule of activities, budget breakdown, and travel timeline.
          </p>
        </div>

        {/* ---- STATS ROW ---- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-fade-up delay-150">
          {[
            { label: "Activities",   value: activities.length, icon: Globe,       color: "text-purple-400" },
            { label: "Total Cost",   value: `$${totalCost}`,   icon: DollarSign,  color: "text-pink-400" },
            { label: "Days",         value: "2",               icon: Calendar,    color: "text-cyan-400" },
            { label: "Destinations", value: "3",               icon: MapPin,      color: "text-emerald-400" },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-2xl p-4 border border-white/07">
              <stat.icon className={`w-4 h-4 ${stat.color} mb-3`} />
              <p className="text-xl font-black">{stat.value}</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ---- MAIN CONTAINER ---- */}
        <div className="rounded-2xl border border-white/08 p-6 sm:p-8 content-card animate-fade-up delay-200">

          <div className="section-divider mb-8">
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-5 py-2.5 text-sm font-semibold text-purple-300">
              All Activities
            </div>
          </div>

          <div className="space-y-5">
            {activities.map((activity, index) => {
              const colorClass = CAT_ACCENT[activity.category] || CAT_ACCENT.default;
              return (
                <div key={activity.id || index} className="relative animate-fade-up" style={{ animationDelay: `${index * 0.06}s` }}>
                  {index < activities.length - 1 && (
                    <div className="absolute left-[18px] top-full z-0 h-6 w-px bg-gradient-to-b from-purple-500/40 to-transparent" />
                  )}
                  <div className={`group relative overflow-hidden rounded-2xl border ${colorClass} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/8`}>
                    <div className="relative z-10 grid lg:grid-cols-[1fr_180px] gap-5 p-5 sm:p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-black shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2.5">
                            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                              Planned
                            </div>
                            <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[10px] text-purple-300 font-semibold uppercase tracking-wide">
                              {activity.category}
                            </div>
                          </div>
                          <h3 className="t-heading text-white group-hover:text-purple-300 transition-colors">{activity.title}</h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {activity.location && (
                              <div className="flex items-center gap-1.5 rounded-xl border border-white/08 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                                <MapPin className="h-3 w-3 text-purple-400" /> {activity.location}
                              </div>
                            )}
                            {activity.time && (
                              <div className="flex items-center gap-1.5 rounded-xl border border-white/08 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                                <Clock className="h-3 w-3 text-purple-400" /> {activity.time}
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 rounded-xl border border-white/08 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                              <Calendar className="h-3 w-3 text-purple-400" /> Scheduled
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-center">
                        <DollarSign className="h-6 w-6 text-purple-300" />
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Expense</p>
                        <h3 className="mt-1 text-2xl font-black text-purple-300">
                          {Number(activity.cost) === 0 ? "Free" : `$${activity.cost}`}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---- TOTAL BUDGET ---- */}
          <div className="mt-10 rounded-2xl border border-purple-500/20 p-6 sm:p-8 animate-fade-up delay-400"
            style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.12), rgba(236,72,153,0.08))" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="t-section text-white">Total Trip Budget</h3>
                <p className="mt-1 text-gray-400 text-sm">Combined activity expense estimation</p>
              </div>
              <div className="text-4xl font-black gradient-text">${totalCost}</div>
            </div>
          </div>

          {/* ---- BOTTOM ACTIONS ---- */}
          <div className="mt-7 flex flex-wrap gap-3 justify-center border-t border-white/07 pt-7">
            <button onClick={() => navigate(`/trips/${id}/checklist`)} className="flex items-center gap-2 rounded-2xl btn-primary px-7 py-3.5 text-sm font-semibold">
              <CheckSquare className="w-4 h-4" /> Packing Checklist
            </button>
            <button onClick={() => navigate(`/trips/${id}/notes`)} className="flex items-center gap-2 rounded-2xl bg-pink-500/10 border border-pink-500/20 px-7 py-3.5 text-sm font-semibold text-pink-300 hover:bg-pink-500/20 transition-all">
              <FileText className="w-4 h-4" /> Trip Notes
            </button>
            <button onClick={() => navigate(`/trips/${id}/invoice`)} className="flex items-center gap-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 px-7 py-3.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all">
              <FileSpreadsheet className="w-4 h-4" /> View Invoices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}