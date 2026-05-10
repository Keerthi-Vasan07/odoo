import { MapPin } from 'lucide-react';

export default function RegionalSelections({ selections }) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white">Top Regional Selections</h3>
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-all font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {selections.map((item, index) => (
          <div
            key={index}
            className="group relative h-48 md:h-56 rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-base md:text-lg font-semibold text-white">{item.name}</h4>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-300 mt-1">
                <MapPin size={14} /> {item.destinations} Destinations
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
