import { useState } from "react";
import { Search, Filter, ArrowRight, Sparkles, Heart, MessageCircle, Share2, MapPin, Calendar, Send } from "lucide-react";

const POSTS = [
  { id: 1, user: "Keerthi Vasan",  location: "Bali, Indonesia", date: "2 days ago",   content: "Had an amazing beach experience in Bali! The sunsets were unbelievable and the local food was incredible. Highly recommend visiting during the summer season.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop", likes: 142, comments: 34 },
  { id: 2, user: "Sandhiya Gupta", location: "Swiss Alps",      date: "5 days ago",   content: "The mountain trekking experience in Switzerland was absolutely breathtaking. Snow-covered peaks and peaceful scenery everywhere.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop", likes: 210, comments: 51 },
  { id: 3, user: "Nihal",          location: "Dubai",           date: "1 week ago",   content: "Luxury desert safari and sky dining experience in Dubai was unforgettable. The nightlife and architecture are on another level.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop", likes: 189, comments: 40 },
  { id: 4, user: "Pranav Kumar",   location: "Tokyo, Japan",    date: "2 weeks ago",  content: "Tokyo is a perfect blend of modern technology and traditional culture. Food streets and neon nights are magical.", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop", likes: 275, comments: 62 },
];

const TAGS = ["Beach Travel", "Adventure", "Luxury Hotels", "Mountain Trips", "Food Tours", "Nightlife", "Budget Travel"];

export default function CommunityPage() {
  const [search, setSearch] = useState("");
  const filteredPosts = POSTS.filter(p => p.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 animate-fade-up">
          <div className="page-badge mb-4"><Sparkles className="h-3 w-3" /> Travel Community</div>
          <h1 className="hero-title">Community Hub 🌍</h1>
          <p className="mt-2 text-gray-400 text-sm max-w-xl">
            Discover travel experiences, stories, and recommendations shared by travelers from around the world.
          </p>
        </div>

        {/* LAYOUT */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 animate-fade-up delay-100">

          {/* LEFT — FEED */}
          <div className="rounded-2xl border border-white/08 p-6 sm:p-8 content-card">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <input type="text" placeholder="Search community posts..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-2xl btn-glass px-4 py-3.5 text-sm text-gray-300">
                  <ArrowRight className="h-4 w-4" /> Group By
                </button>
                <button className="flex items-center gap-2 rounded-2xl btn-glass px-4 py-3.5 text-sm text-gray-300">
                  <Filter className="h-4 w-4" /> Filter
                </button>
              </div>
            </div>

            <div className="section-divider mb-6">
              <h2 className="t-section text-white">Community Feed</h2>
            </div>

            <div className="space-y-6">
              {filteredPosts.map(post => <CommunityPost key={post.id} post={post} />)}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">
            {/* Info */}
            <div className="rounded-2xl border border-white/08 p-6 content-card">
              <h3 className="t-heading text-white mb-4">Community Section</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Share travel experiences, activity reviews, destination guides, hotel stays, and memorable adventures with the Traveloop community.
              </p>
              <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-purple-300 text-xs leading-relaxed">
                Search, filter, and explore thousands of travel stories from global travelers.
              </div>
            </div>

            {/* Trending */}
            <div className="rounded-2xl border border-white/08 p-6 content-card">
              <h3 className="t-heading text-white mb-4">Trending Topics 🔥</h3>
              <div className="flex flex-wrap gap-2.5">
                {TAGS.map(tag => (
                  <button key={tag} className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 text-xs text-purple-300 hover:bg-purple-500/20 transition-all font-medium">
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-xl">
              <h3 className="t-heading text-white mb-2">Share Your Journey ✨</h3>
              <p className="text-gray-300 text-xs leading-relaxed mb-5">
                Inspire travelers around the world by sharing your unforgettable experiences.
              </p>
              <button className="flex items-center gap-2.5 rounded-2xl btn-primary w-full justify-center py-3 text-sm font-semibold">
                <Send className="h-4 w-4" /> Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityPost({ post }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/08 bg-white/[0.025] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30">
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <img src={post.image} alt="" className="h-full w-full object-cover image-hover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-bold shadow-xl">
              {post.user[0]}
            </div>
            <div>
              <h4 className="t-subheading text-white font-semibold">{post.user}</h4>
              <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-gray-300">
                <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-purple-400" />{post.location}</div>
                <div className="flex items-center gap-1"><Calendar className="h-3 w-3 text-purple-400" />{post.date}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2.5">
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 hover:bg-white/10 transition-all font-medium">
              <Heart className="h-3.5 w-3.5 text-pink-400" /> {post.likes}
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 hover:bg-white/10 transition-all font-medium">
              <MessageCircle className="h-3.5 w-3.5 text-purple-400" /> {post.comments}
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs text-purple-300 hover:bg-purple-500/20 transition-all font-medium">
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}