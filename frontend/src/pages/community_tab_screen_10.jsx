import { useState } from "react";

import {
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  Send,
} from "lucide-react";

export default function CommunityPage() {
  const [search, setSearch] = useState("");

  const posts = [
    {
      id: 1,
      user: "Keerthi Vasan",
      location: "Bali, Indonesia",
      date: "2 days ago",
      content:
        "Had an amazing beach experience in Bali! The sunsets were unbelievable and the local food was incredible. Highly recommend visiting during the summer season.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      likes: 142,
      comments: 34,
    },

    {
      id: 2,
      user: "Sandhiya Gupta",
      location: "Swiss Alps",
      date: "5 days ago",
      content:
        "The mountain trekking experience in Switzerland was absolutely breathtaking. Snow-covered peaks and peaceful scenery everywhere.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
      likes: 210,
      comments: 51,
    },

    {
      id: 3,
      user: "Nihal",
      location: "Dubai",
      date: "1 week ago",
      content:
        "Luxury desert safari and sky dining experience in Dubai was unforgettable. The nightlife and architecture are on another level.",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
      likes: 189,
      comments: 40,
    },

    {
      id: 4,
      user: "Pranav Kumar",
      location: "Tokyo, Japan",
      date: "2 weeks ago",
      content:
        "Tokyo is a perfect blend of modern technology and traditional culture. Food streets and neon nights are magical.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop",
      likes: 275,
      comments: 62,
    },
  ];

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Travel Community
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            Community Hub 🌍
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Discover travel experiences, stories, adventures, and recommendations
            shared by travelers from around the world.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* LEFT SIDE */}
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] p-8 shadow-2xl backdrop-blur-xl">
            {/* SEARCH */}
            <div className="flex flex-col lg:flex-row gap-4 mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

                <input
                  type="text"
                  placeholder="Search community posts..."
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

            {/* TITLE */}
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black">
                Community Feed
              </h2>

              <p className="mt-4 text-gray-400">
                Real experiences shared by travelers
              </p>
            </div>

            {/* POSTS */}
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <CommunityPost key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">
            {/* INFO CARD */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1020] p-8 shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-black">
                Community Section
              </h3>

              <p className="mt-5 leading-relaxed text-gray-400">
                Share travel experiences, activity reviews, destination guides,
                hotel stays, and memorable adventures with the Traveloop
                community.
              </p>

              <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5 text-purple-300">
                Search, filter, and explore thousands of travel stories from
                global travelers.
              </div>
            </div>

            {/* TRENDING */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1020] p-8 shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-black">
                Trending Topics 🔥
              </h3>

              <div className="mt-6 flex flex-wrap gap-4">
                <Tag text="Beach Travel" />
                <Tag text="Adventure" />
                <Tag text="Luxury Hotels" />
                <Tag text="Mountain Trips" />
                <Tag text="Food Tours" />
                <Tag text="Nightlife" />
                <Tag text="Budget Travel" />
              </div>
            </div>

            {/* SHARE EXPERIENCE */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-black">
                Share Your Journey ✨
              </h3>

              <p className="mt-4 text-gray-300">
                Inspire travelers around the world by sharing your unforgettable
                experiences.
              </p>

              <button className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 font-semibold shadow-xl hover:scale-105 transition-all">
                <Send className="h-5 w-5" />
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* COMMUNITY POST */
/* ================================================= */

function CommunityPost({ post }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover group-hover:scale-105 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* USER */}
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-bold shadow-xl">
              {post.user[0]}
            </div>

            <div>
              <h4 className="text-xl font-bold">
                {post.user}
              </h4>

              <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  {post.location}
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  {post.date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">
        <p className="text-lg leading-relaxed text-gray-300">
          {post.content}
        </p>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-gray-300 hover:bg-white/10 transition-all">
              <Heart className="h-5 w-5 text-pink-400" />
              {post.likes}
            </button>

            <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-gray-300 hover:bg-white/10 transition-all">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              {post.comments}
            </button>
          </div>

          <button className="flex items-center gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-5 py-3 text-purple-300 hover:bg-purple-500/20 transition-all">
            <Share2 className="h-5 w-5" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* TAG */
/* ================================================= */

function Tag({ text }) {
  return (
    <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
      #{text}
    </div>
  );
}