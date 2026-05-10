import { useState } from "react";

import {
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  MapPin,
  NotebookPen,
} from "lucide-react";

export default function TripNotesPage() {
  const [search, setSearch] = useState("");

  const [notes] = useState([
    {
      id: 1,
      title: "Hotel Check-In Details - Rome Stop",
      description:
        "Check in after 2 PM, room 302, breakfast included (7-10 AM). Remember to carry passport copy and booking confirmation.",
      day: "Day 3",
      date: "June 14, 2025",
      location: "Rome, Italy",
    },

    {
      id: 2,
      title: "Paris Evening Cruise Notes",
      description:
        "Book the Seine River cruise before 5 PM. Premium seating available for sunset timing.",
      day: "Day 5",
      date: "June 16, 2025",
      location: "Paris, France",
    },

    {
      id: 3,
      title: "Airport Transfer Reminder",
      description:
        "Cab pickup scheduled at 6:30 AM from hotel lobby. Driver contact already shared in WhatsApp.",
      day: "Day 7",
      date: "June 18, 2025",
      location: "Paris Airport",
    },
  ]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Smart Travel Journal
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            Trip Notes ✍️
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Organize travel memories, reminders, booking details, and important
            notes beautifully for every journey.
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
                placeholder="Search trip notes..."
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

          {/* TOP BAR */}
          <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* LEFT */}
            <div>
              <h2 className="text-4xl font-black">
                Travel Notes
              </h2>

              <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-5 py-3 text-purple-300">
                <NotebookPen className="h-5 w-5" />
                Paris & Rome Adventure
              </div>
            </div>

            {/* ADD BUTTON */}
            <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold shadow-xl hover:scale-105 transition-all">
              <Plus className="h-5 w-5" />
              Add Note
            </button>
          </div>

          {/* FILTER TAGS */}
          <div className="mb-10 flex flex-wrap gap-4">
            <FilterTag title="All" active />
            <FilterTag title="By Day" />
            <FilterTag title="By Stop" />
          </div>

          {/* NOTES */}
          <div className="space-y-8">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* NOTE CARD */
/* ================================================= */

function NoteCard({ note }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />

      {/* CONTENT */}
      <div className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* LEFT */}
          <div className="flex-1">
            {/* TITLE */}
            <h3 className="text-3xl font-black group-hover:text-purple-300 transition-all">
              {note.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="mt-5 text-lg leading-relaxed text-gray-300">
              {note.description}
            </p>

            {/* DETAILS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
                <Calendar className="h-4 w-4 text-purple-400" />

                {note.day} • {note.date}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-purple-400" />

                {note.location}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            {/* EDIT */}
            <button className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4 text-purple-300 backdrop-blur-xl transition-all hover:bg-purple-500/20">
              <Pencil className="h-5 w-5" />
            </button>

            {/* DELETE */}
            <button className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300 backdrop-blur-xl transition-all hover:bg-red-500/20">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* FILTER TAG */
/* ================================================= */

function FilterTag({ title, active }) {
  return (
    <button
      className={`rounded-2xl px-6 py-3 text-sm font-medium transition-all ${
        active
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      {title}
    </button>
  );
}