export default function HeroBanner() {
  return (
    <div className="relative h-[250px] md:h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-6">
        <span className="mb-4 px-4 py-1.5 rounded-full bg-purple-600/80 text-xs md:text-sm backdrop-blur-md shadow-lg text-white">
          ✈ Personalized Travel Planning
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl text-white">
          Explore The World With Smart Planning
        </h2>

        <p className="mt-4 md:mt-6 text-gray-300 max-w-2xl text-sm md:text-lg">
          Create intelligent itineraries, track expenses, discover places,
          and organize every journey beautifully.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          <button className="px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 font-semibold shadow-xl text-white text-sm md:text-base">
            Plan A Trip
          </button>
          <button className="px-6 md:px-8 py-3 md:py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold backdrop-blur-md text-white text-sm md:text-base">
            Explore Destinations
          </button>
        </div>
      </div>
    </div>
  );
}
