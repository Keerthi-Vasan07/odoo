import {
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Users,
  MapPinned,
  Activity,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12.4K",
      icon: Users,
    },

    {
      title: "Popular Cities",
      value: "248",
      icon: MapPinned,
    },

    {
      title: "Activities",
      value: "1.2K",
      icon: Activity,
    },

    {
      title: "Growth",
      value: "+32%",
      icon: TrendingUp,
    },
  ];

  const popularCities = [
    "Bali",
    "Dubai",
    "Tokyo",
    "Paris",
    "Swiss Alps",
  ];

  const activities = [
    "Paragliding",
    "Beach Tours",
    "Camping",
    "Luxury Dining",
    "Mountain Trekking",
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Traveloop Admin Dashboard
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            Admin Panel 📊
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Monitor users, analyze travel trends, track popular destinations,
            and manage platform insights beautifully.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* LEFT PANEL */}
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] p-8 shadow-2xl backdrop-blur-xl">
            {/* SEARCH + FILTER */}
            <div className="flex flex-col lg:flex-row gap-4 mb-10">
              {/* SEARCH */}
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

                <input
                  type="text"
                  placeholder="Search analytics..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* FILTERS */}
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

            {/* TOP ACTIONS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <DashboardButton
                title="Manage Users"
                icon={Users}
              />

              <DashboardButton
                title="Popular Cities"
                icon={MapPinned}
              />

              <DashboardButton
                title="Popular Activities"
                icon={Activity}
              />

              <DashboardButton
                title="Analytics"
                icon={TrendingUp}
              />
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                />
              ))}
            </div>

            {/* ANALYTICS AREA */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* CHART CARD */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-black mb-8">
                  User Growth
                </h3>

                <div className="flex h-72 items-end justify-between gap-4">
                  {[40, 60, 80, 55, 95, 75].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-3xl bg-gradient-to-t from-purple-500 to-pink-500 transition-all hover:scale-105"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* PIE + INFO */}
              <div className="space-y-8">
                {/* PIE CHART */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                  <h3 className="text-2xl font-black mb-8">
                    Travel Distribution
                  </h3>

                  <div className="flex items-center justify-center">
                    <div className="relative h-56 w-56 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
                      <div className="absolute inset-8 rounded-full bg-[#0b1020]" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-4xl font-black">
                            78%
                          </h3>

                          <p className="mt-2 text-sm text-gray-400">
                            Engagement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* REVENUE */}
                <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-purple-500/20 p-4">
                      <DollarSign className="h-8 w-8 text-purple-300" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">
                        Monthly Revenue
                      </p>

                      <h3 className="mt-2 text-4xl font-black text-purple-300">
                        $48K
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black mb-8">
                Recent Platform Activity
              </h3>

              <div className="space-y-5">
                {[
                  "New user registered from India",
                  "Top searched city: Bali",
                  "Luxury travel bookings increased",
                  "Community activity trending upward",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <span className="text-gray-300">
                      {item}
                    </span>

                    <div className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                      Live
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">
            {/* DESCRIPTION */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1020] p-8 shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-black">
                Admin Controls
              </h3>

              <p className="mt-5 leading-relaxed text-gray-400">
                Manage platform users, monitor travel analytics, track activity
                trends, and gain insights into platform engagement.
              </p>

              <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5 text-purple-300">
                Smart analytics help administrators understand user behavior and
                improve the travel experience.
              </div>
            </div>

            {/* POPULAR CITIES */}
            <SidebarCard
              title="Popular Cities 🌍"
              items={popularCities}
            />

            {/* POPULAR ACTIVITIES */}
            <SidebarCard
              title="Popular Activities 🎯"
              items={activities}
            />

            {/* USER TRENDS */}
            <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black">
                User Trends 📈
              </h3>

              <div className="mt-6 space-y-4">
                <TrendItem
                  label="Travel Searches"
                  value="92%"
                />

                <TrendItem
                  label="Community Activity"
                  value="78%"
                />

                <TrendItem
                  label="Trip Planning"
                  value="88%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* DASHBOARD BUTTON */
/* ================================================= */

function DashboardButton({ title, icon: Icon }) {
  return (
    <button className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-purple-500/30 hover:bg-white/10">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-2xl bg-purple-500/10 p-4">
          <Icon className="h-7 w-7 text-purple-300" />
        </div>

        <h3 className="mt-5 text-sm font-semibold">
          {title}
        </h3>
      </div>
    </button>
  );
}

/* ================================================= */
/* STAT CARD */
/* ================================================= */

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-black text-purple-300">
            {value}
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-500/10 p-4">
          <Icon className="h-7 w-7 text-purple-300" />
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SIDEBAR CARD */
/* ================================================= */

function SidebarCard({ title, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1020] p-8 shadow-2xl backdrop-blur-xl">
      <h3 className="text-2xl font-black">
        {title}
      </h3>

      <div className="mt-6 flex flex-wrap gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================= */
/* TREND ITEM */
/* ================================================= */

function TrendItem({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-gray-300">
        <span>{label}</span>

        <span>{value}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: value }}
        />
      </div>
    </div>
  );
}