import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin } from 'lucide-react';

export default function DestinationsPage() {
  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-cyan" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="topbar">
          <Link to="/" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/08 px-4 py-2 hover:bg-white/10 transition-all text-sm font-medium text-gray-300">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <span className="t-signature text-xl text-white">Traveloop</span>
          <div className="w-20" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center animate-fade-up">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-float">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <div className="page-badge mb-5"><MapPin className="w-3 h-3" /> Regional Destinations</div>
            <h1 className="t-mega gradient-text mb-5">Discover Destinations</h1>
            <p className="text-gray-400 text-base mb-10 max-w-md leading-relaxed">
              Explore curated locations, beautiful cities, and hidden gems across the globe. Our destination library is currently being built.
            </p>
            <div className="px-7 py-3 rounded-2xl glass border border-cyan-500/20 mb-8">
              <span className="gradient-text font-semibold text-base tracking-widest uppercase">Coming Soon</span>
            </div>
            <Link to="/" className="flex items-center gap-2 px-7 py-3.5 rounded-2xl btn-glass text-sm font-medium text-gray-300">
              <ArrowLeft className="w-4 h-4" /> Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
