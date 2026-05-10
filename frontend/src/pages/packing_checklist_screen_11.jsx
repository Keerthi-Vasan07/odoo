import { useState } from "react";

import {
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Check,
  Plus,
  Share2,
  RotateCcw,
  Backpack,
} from "lucide-react";

export default function PackingChecklistPage() {
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([
    {
      title: "Documents",
      items: [
        { name: "Passport", checked: true },
        { name: "Flight Tickets (Printed)", checked: true },
        { name: "Travel Insurance", checked: true },
        { name: "Hotel Booking Confirmation", checked: false },
      ],
    },

    {
      title: "Clothing",
      items: [
        { name: "Casual Shirts", checked: true },
        { name: "Trousers / Jeans", checked: false },
        { name: "Comfortable Walking Shoes", checked: false },
        { name: "Light Jacket / Windbreaker", checked: false },
      ],
    },

    {
      title: "Electronics",
      items: [
        { name: "Phone Charger", checked: true },
        { name: "Universal Power Adapter", checked: false },
        { name: "Earphones / Headphones", checked: false },
      ],
    },
  ]);

  const toggleItem = (categoryIndex, itemIndex) => {
    const updated = [...categories];

    updated[categoryIndex].items[itemIndex].checked =
      !updated[categoryIndex].items[itemIndex].checked;

    setCategories(updated);
  };

  const totalItems = categories.reduce(
    (acc, category) => acc + category.items.length,
    0
  );

  const packedItems = categories.reduce(
    (acc, category) =>
      acc +
      category.items.filter((item) => item.checked).length,
    0
  );

  const progress = (packedItems / totalItems) * 100;

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Smart Travel Packing
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            Packing Checklist 🎒
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Organize your travel essentials and track packing progress with a
            premium smart checklist experience.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] p-8 shadow-2xl backdrop-blur-xl">
          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

              <input
                type="text"
                placeholder="Search checklist items..."
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

          {/* TRIP INFO */}
          <div className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-8 backdrop-blur-xl mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* LEFT */}
              <div>
                <div className="flex items-center gap-3">
                  <Backpack className="h-8 w-8 text-purple-300" />

                  <h2 className="text-3xl font-black">
                    Paris & Rome Adventure
                  </h2>
                </div>

                <p className="mt-4 text-lg text-gray-300">
                  Progress: {packedItems}/{totalItems} items packed
                </p>
              </div>

              {/* RIGHT */}
              <div className="w-full lg:w-96">
                <div className="mb-3 flex items-center justify-between text-sm text-gray-300">
                  <span>Packing Progress</span>

                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-4 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-10">
            {categories.map((category, categoryIndex) => {
              const completed =
                category.items.filter((item) => item.checked)
                  .length;

              return (
                <div
                  key={categoryIndex}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                >
                  {/* CATEGORY HEADER */}
                  <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-3xl font-black">
                      {category.title}
                    </h3>

                    <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-2 text-purple-300">
                      {completed}/{category.items.length}
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-5">
                    {category.items.map((item, itemIndex) => (
                      <label
                        key={itemIndex}
                        className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-purple-500/30 hover:bg-white/10"
                      >
                        {/* CHECKBOX */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleItem(categoryIndex, itemIndex)
                          }
                          className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all ${
                            item.checked
                              ? "border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500"
                              : "border-white/20 bg-white/5"
                          }`}
                        >
                          {item.checked && (
                            <Check className="h-5 w-5 text-white" />
                          )}
                        </button>

                        {/* TEXT */}
                        <span
                          className={`text-lg transition-all ${
                            item.checked
                              ? "text-gray-400 line-through"
                              : "text-white"
                          }`}
                        >
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
          <div className="mt-14 flex flex-col lg:flex-row gap-5">
            {/* ADD ITEM */}
            <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-5 text-lg font-semibold shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <Plus className="h-5 w-5" />
              Add Item To Checklist
            </button>

            {/* RESET */}
            <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-semibold backdrop-blur-xl hover:bg-white/10 transition-all">
              <RotateCcw className="h-5 w-5" />
              Reset All
            </button>

            {/* SHARE */}
            <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-8 py-5 text-lg font-semibold text-purple-300 backdrop-blur-xl hover:bg-purple-500/20 transition-all">
              <Share2 className="h-5 w-5" />
              Share Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}