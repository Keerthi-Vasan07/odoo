import { ArrowRight, Filter, Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex-1 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search destinations, trips, or places..."
          className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
        <button className="whitespace-nowrap px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white flex items-center">
          Group By <ArrowRight size={18} className="ml-2" />
        </button>
        <button className="whitespace-nowrap px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white flex items-center">
          <Filter size={18} className="mr-2" /> Filter
        </button>
        <button className="whitespace-nowrap px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white">
          Sort By
        </button>
      </div>
    </div>
  );
}
