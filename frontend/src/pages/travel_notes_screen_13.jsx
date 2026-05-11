import { useState } from "react";
import { Search, Sparkles, Plus, Pencil, Trash2, Calendar, MapPin, ArrowLeft, BookOpen, Check, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const INITIAL_NOTES = [
  { id: 1, title: "Hotel Check-In Details — Rome", description: "Check in after 2 PM, room 302, breakfast included (7–10 AM). Remember to carry passport copy and booking confirmation.", day: "Day 3", date: "June 14, 2025", location: "Rome, Italy", color: "purple" },
  { id: 2, title: "Paris Evening Cruise Notes",     description: "Book the Seine River cruise before 5 PM. Premium seating available for sunset timing. Bring a light jacket.", day: "Day 5", date: "June 16, 2025", location: "Paris, France", color: "pink" },
  { id: 3, title: "Airport Transfer Reminder",     description: "Cab pickup scheduled at 6:30 AM from hotel lobby. Driver contact already shared in WhatsApp group.", day: "Day 7", date: "June 18, 2025", location: "Paris Airport", color: "cyan" },
];

const NOTE_COLORS = {
  purple: { border: "border-purple-500/20", glow: "hover:border-purple-500/40", tag: "bg-purple-500/10 text-purple-300 border-purple-500/20", dot: "bg-purple-400" },
  pink:   { border: "border-pink-500/20",   glow: "hover:border-pink-500/40",   tag: "bg-pink-500/10 text-pink-300 border-pink-500/20",     dot: "bg-pink-400" },
  cyan:   { border: "border-cyan-500/20",   glow: "hover:border-cyan-500/40",   tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",     dot: "bg-cyan-400" },
  blue:   { border: "border-blue-500/20",   glow: "hover:border-blue-500/40",   tag: "bg-blue-500/10 text-blue-300 border-blue-500/20",     dot: "bg-blue-400" },
};

const PALETTE = ["purple", "pink", "cyan", "blue"];

export default function TripNotesPage() {
  const { id }     = useParams();
  const [search, setSearch]         = useState("");
  const [notes, setNotes]           = useState(INITIAL_NOTES);
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingId, setEditingId]   = useState(null);
  const [editTitle, setEditTitle]   = useState("");
  const [editContent, setEditContent] = useState("");

  const addNote = () => {
    const n = { id: Date.now(), title: "New Note", description: "Type your note here...", day: "Day 1", date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), location: "Location", color: PALETTE[notes.length % PALETTE.length] };
    setNotes(prev => [n, ...prev]);
    setEditingId(n.id); setEditTitle(n.title); setEditContent(n.description);
  };

  const deleteNote = noteId => setNotes(prev => prev.filter(n => n.id !== noteId));
  const startEdit  = (noteId, title, desc) => { setEditingId(noteId); setEditTitle(title); setEditContent(desc); };
  const saveEdit   = noteId => { setNotes(prev => prev.map(n => n.id === noteId ? { ...n, title: editTitle || n.title, description: editContent || n.description } : n)); setEditingId(null); };
  const cancelEdit = () => setEditingId(null);

  const filtered = notes.filter(n =>
    (activeFilter === "All" || n.color === activeFilter.toLowerCase()) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-bg">
      <div className="orb orb-purple" style={{ width: 380, height: 380 }} />
      <div className="orb orb-pink"   style={{ width: 280, height: 280 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 animate-fade-up">
          <div>
            <Link to={`/trips/${id}/view`} className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Itinerary
            </Link>
            <div className="page-badge mb-3"><Sparkles className="h-3 w-3" /> Smart Travel Journal</div>
            <h1 className="hero-title">Trip Notes <span className="gradient-text">✍️</span></h1>
            <p className="mt-2 text-gray-400 text-sm">Capture memories, reminders, and booking details for every stop.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input type="text" placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-[240px] rounded-2xl border border-white/10 bg-white/5 px-11 py-3 text-sm placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-xl" />
            </div>
            <button onClick={addNote} className="flex items-center gap-2 rounded-2xl btn-primary px-5 py-3 text-sm font-semibold">
              <Plus className="h-4 w-4" /> Add Note
            </button>
          </div>
        </div>

        {/* FILTER TAGS */}
        <div className="flex flex-wrap items-center gap-2.5 mb-7 animate-fade-up delay-100">
          {["All", "Purple", "Pink", "Cyan", "Blue"].map(tag => (
            <button key={tag} onClick={() => setActiveFilter(tag)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all ${activeFilter === tag ? "btn-primary" : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/8 hover:text-white"}`}>
              {tag}
            </button>
          ))}
          <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <BookOpen className="w-3.5 h-3.5" /> {filtered.length} notes
          </span>
        </div>

        {/* NOTES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up delay-150">
          {filtered.map((note, i) => {
            const colors   = NOTE_COLORS[note.color] || NOTE_COLORS.purple;
            const isEditing = editingId === note.id;

            return (
              <div key={note.id}
                className={`group relative overflow-hidden rounded-2xl border ${colors.border} ${colors.glow} bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up`}
                style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-transparent" />
                <div className="relative z-10 p-5">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input autoFocus value={editTitle} onChange={e => setEditTitle(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-purple-500" />
                      <textarea value={editContent} onChange={e => setEditContent(e.target.value)} rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-300 outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(note.id)}
                          className="flex items-center gap-1.5 rounded-xl bg-green-500/10 border border-green-500/20 px-3.5 py-2 text-xs text-green-300 hover:bg-green-500/20 transition-all font-semibold">
                          <Check className="w-3 h-3" /> Save
                        </button>
                        <button onClick={cancelEdit}
                          className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs text-gray-400 hover:bg-white/10 transition-all font-semibold">
                          <X className="w-3 h-3" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${colors.tag}`}>
                          <Calendar className="w-2.5 h-2.5" /> {note.day}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => startEdit(note.id, note.title, note.description)}
                            className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-1.5 text-purple-300 hover:bg-purple-500/20 transition-all">
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button onClick={() => deleteNote(note.id)}
                            className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20 transition-all">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <h3 className="t-heading text-white mb-2.5 group-hover:text-purple-300 transition-colors">{note.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{note.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-white/08">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                          <MapPin className="h-3 w-3 text-purple-400" /> {note.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium ml-auto">
                          <Calendar className="h-3 w-3 text-purple-400" /> {note.date}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Ghost add card */}
          <button onClick={addNote}
            className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-3 min-h-[220px] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors font-medium">Add New Note</span>
          </button>
        </div>
      </div>
    </div>
  );
}