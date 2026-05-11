import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="border border-white/15 rounded-[30px] overflow-hidden bg-[#050816] shadow-[0_0_100px_rgba(120,0,255,0.12)] min-h-[calc(100vh-32px)] flex flex-col">
        <div className="h-[74px] px-8 border-b border-white/10 flex items-center gap-6">
          <Link to="/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[32px] tracking-wide font-semibold">Traveloop</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              <Users className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-[56px] leading-tight font-semibold mb-4" style={{ fontFamily: "cursive" }}>
              Traveler Community
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-lg">
              Connect with fellow travelers, share itineraries, and gain inspiration from public trips around the world.
            </p>

            <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold text-lg tracking-wide uppercase">
                Coming Soon
              </span>
            </div>

            <Link to="/" className="mt-12 px-8 py-4 rounded-2xl bg-[#090d18] border border-white/10 hover:bg-white/5 transition-all text-lg font-medium">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
