import { useState } from "react";
import { Search, Filter, ArrowRight, Sparkles, Check, Plus, Share2, RotateCcw, Backpack } from "lucide-react";

const INIT_CATEGORIES = [
  { title: "Documents",   items: [{ name: "Passport", checked: true }, { name: "Flight Tickets (Printed)", checked: true }, { name: "Travel Insurance", checked: true }, { name: "Hotel Booking Confirmation", checked: false }] },
  { title: "Clothing",    items: [{ name: "Casual Shirts", checked: true }, { name: "Trousers / Jeans", checked: false }, { name: "Comfortable Walking Shoes", checked: false }, { name: "Light Jacket / Windbreaker", checked: false }] },
  { title: "Electronics", items: [{ name: "Phone Charger", checked: true }, { name: "Universal Power Adapter", checked: false }, { name: "Earphones / Headphones", checked: false }] },
];

export default function PackingChecklistPage() {
  const [search, setSearch]         = useState("");
  const [categories, setCategories] = useState(INIT_CATEGORIES);

  const toggleItem = (ci, ii) => {
    const updated = categories.map((cat, cIdx) =>
      cIdx !== ci ? cat : { ...cat, items: cat.items.map((item, iIdx) => iIdx !== ii ? item : { ...item, checked: !item.checked }) }
    );
    setCategories(updated);
  };

  const totalItems  = categories.reduce((a, c) => a + c.items.length, 0);
  const packedItems = categories.reduce((a, c) => a + c.items.filter(i => i.checked).length, 0);
  const progress    = (packedItems / totalItems) * 100;

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 animate-fade-up">
          <div className="page-badge mb-4"><Sparkles className="h-3 w-3" /> Smart Travel Packing</div>
          <h1 className="hero-title">Packing Checklist 🎒</h1>
          <p className="mt-2 text-gray-400 text-sm max-w-xl">
            Organize your travel essentials and track packing progress with a premium smart checklist experience.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-2xl border border-white/08 p-6 sm:p-8 content-card animate-fade-up delay-100">

          {/* SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input type="text" placeholder="Search checklist items..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-2xl btn-glass px-5 py-3.5 text-sm text-gray-300">
                <ArrowRight className="h-4 w-4" /> Group By
              </button>
              <button className="flex items-center gap-2 rounded-2xl btn-glass px-5 py-3.5 text-sm text-gray-300">
                <Filter className="h-4 w-4" /> Filter
              </button>
            </div>
          </div>

          {/* PROGRESS CARD */}
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6 sm:p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Backpack className="h-6 w-6 text-purple-300" />
                  <h2 className="t-section text-white">Paris & Rome Adventure</h2>
                </div>
                <p className="text-gray-300 text-sm">Progress: <span className="text-white font-semibold">{packedItems}/{totalItems}</span> items packed</p>
              </div>
              <div className="w-full lg:w-80">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-medium">
                  <span>Packing Progress</span><span className="text-white font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="progress-track" style={{ height: '8px' }}>
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-6">
            {categories.map((category, ci) => {
              const completed = category.items.filter(i => i.checked).length;
              const filteredItems = category.items.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()));
              if (filteredItems.length === 0) return null;

              return (
                <div key={ci} className="rounded-2xl border border-white/08 bg-white/[0.025] p-6 backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="t-section text-white">{category.title}</h3>
                    <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-purple-300 font-semibold">
                      {completed}/{category.items.length}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {filteredItems.map((item, ii) => (
                      <label key={ii}
                        className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/08 bg-white/[0.03] px-4 py-3.5 transition-all hover:border-purple-500/25 hover:bg-white/[0.06]">
                        <button type="button" onClick={() => toggleItem(ci, category.items.indexOf(item))}
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border transition-all ${item.checked ? "border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg" : "border-white/20 bg-white/5"}`}>
                          {item.checked && <Check className="h-4 w-4 text-white" />}
                        </button>
                        <span className={`text-sm transition-all font-medium ${item.checked ? "text-gray-500 line-through" : "text-white"}`}>
                          {item.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-7 border-t border-white/07">
            <button className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl btn-primary px-8 py-4 text-sm font-semibold">
              <Plus className="h-4 w-4" /> Add Item To Checklist
            </button>
            <button className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl btn-glass px-8 py-4 text-sm font-semibold text-gray-300">
              <RotateCcw className="h-4 w-4" /> Reset All
            </button>
            <button className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-8 py-4 text-sm font-semibold text-purple-300 hover:bg-purple-500/20 transition-all">
              <Share2 className="h-4 w-4" /> Share Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}