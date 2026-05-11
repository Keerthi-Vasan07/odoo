import { Search, Filter, ArrowRight, Sparkles, Users, MapPinned, Activity, TrendingUp, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Users",    value: "12.4K", icon: Users,      color: "text-purple-400" },
    { title: "Popular Cities", value: "248",   icon: MapPinned,  color: "text-pink-400" },
    { title: "Activities",     value: "1.2K",  icon: Activity,   color: "text-cyan-400" },
    { title: "Growth",         value: "+32%",  icon: TrendingUp, color: "text-emerald-400" },
  ];
  const popularCities   = ["Bali", "Dubai", "Tokyo", "Paris", "Swiss Alps"];
  const activityItems   = ["Paragliding", "Beach Tours", "Camping", "Luxury Dining", "Mountain Trekking"];

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 animate-fade-up">
          <div className="page-badge mb-4"><Sparkles className="h-3 w-3" /> Traveloop Admin Dashboard</div>
          <h1 className="hero-title">Admin Panel 📊</h1>
          <p className="mt-2 text-gray-400 text-sm max-w-xl">
            Monitor users, analyze travel trends, track popular destinations, and manage platform insights.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 animate-fade-up delay-100">

          {/* LEFT PANEL */}
          <div className="rounded-2xl border border-white/08 p-6 sm:p-8 content-card">

            {/* SEARCH + FILTER */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <input type="text" placeholder="Search analytics..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-2xl btn-glass px-4 py-3.5 text-sm text-gray-300"><ArrowRight className="h-4 w-4" /> Group By</button>
                <button className="flex items-center gap-2 rounded-2xl btn-glass px-4 py-3.5 text-sm text-gray-300"><Filter className="h-4 w-4" /> Filter</button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { title: "Manage Users",       icon: Users },
                { title: "Popular Cities",     icon: MapPinned },
                { title: "Popular Activities", icon: Activity },
                { title: "Analytics",          icon: TrendingUp },
              ].map(({ title, icon: Icon }) => (
                <button key={title} className="group rounded-2xl border border-white/08 bg-white/5 p-5 backdrop-blur-xl transition-all hover:border-purple-500/25 hover:bg-white/8">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="rounded-xl bg-purple-500/10 p-3"><Icon className="h-5 w-5 text-purple-300" /></div>
                    <h3 className="text-xs font-semibold text-gray-300">{title}</h3>
                  </div>
                </button>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-2xl border border-white/08 bg-white/[0.03] p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.title}</p>
                    <div className="rounded-lg bg-purple-500/10 p-2"><stat.icon className={`h-4 w-4 ${stat.color}`} /></div>
                  </div>
                  <h3 className="text-2xl font-black text-purple-300">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* ANALYTICS */}
            <div className="grid lg:grid-cols-2 gap-5 mb-6">
              {/* BAR CHART */}
              <div className="rounded-2xl border border-white/08 bg-white/[0.03] p-6 backdrop-blur-xl">
                <h3 className="t-heading text-white mb-6">User Growth</h3>
                <div className="flex h-56 items-end justify-between gap-2.5">
                  {[40, 60, 80, 55, 95, 75].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-xl bg-gradient-to-t from-purple-500 to-pink-500 transition-all hover:opacity-80 cursor-pointer" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-gray-600 font-medium">
                  {["Jan","Feb","Mar","Apr","May","Jun"].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>

              {/* PIE + REVENUE */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/08 bg-white/[0.03] p-6 backdrop-blur-xl">
                  <h3 className="t-heading text-white mb-5">Travel Distribution</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative h-40 w-40 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
                      <div className="absolute inset-6 rounded-full bg-[#040710]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-2xl font-black">78%</h3>
                          <p className="text-[10px] text-gray-400 font-medium">Engagement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-500/20 p-3"><DollarSign className="h-5 w-5 text-purple-300" /></div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Monthly Revenue</p>
                      <h3 className="mt-1 text-2xl font-black text-purple-300">$48K</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVITY LOG */}
            <div className="rounded-2xl border border-white/08 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h3 className="t-heading text-white mb-5">Recent Platform Activity</h3>
              <div className="space-y-3">
                {["New user registered from India", "Top searched city: Bali", "Luxury travel bookings increased", "Community activity trending upward"].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-white/07 bg-white/[0.03] px-4 py-3.5">
                    <span className="text-gray-300 text-sm">{item}</span>
                    <div className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-[10px] text-purple-300 font-semibold uppercase tracking-wide">Live</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/08 p-6 content-card">
              <h3 className="t-heading text-white mb-3">Admin Controls</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Manage platform users, monitor travel analytics, track activity trends, and gain insights into platform engagement.</p>
              <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-purple-300 text-xs leading-relaxed">
                Smart analytics help administrators understand user behavior and improve the travel experience.
              </div>
            </div>

            {[{ title: "Popular Cities 🌍", items: popularCities }, { title: "Popular Activities 🎯", items: activityItems }].map(({ title, items }) => (
              <div key={title} className="rounded-2xl border border-white/08 p-6 content-card">
                <h3 className="t-heading text-white mb-4">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <div key={item} className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 text-xs text-purple-300 font-medium">{item}</div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-xl">
              <h3 className="t-heading text-white mb-5">User Trends 📈</h3>
              <div className="space-y-4">
                {[{ label: "Travel Searches", value: "92%" }, { label: "Community Activity", value: "78%" }, { label: "Trip Planning", value: "88%" }].map(({ label, value }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-xs text-gray-300 mb-1.5 font-medium">
                      <span>{label}</span><span className="text-white">{value}</span>
                    </div>
                    <div className="progress-track" style={{ height: '6px' }}>
                      <div className="progress-fill" style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}