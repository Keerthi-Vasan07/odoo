import { useEffect, useState } from 'react';
import axios from '../api/axios';
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/SearchBar';
import RegionalSelections from '../components/RegionalSelections';
import PreviousTrips from '../components/PreviousTrips';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch user's previous trips from backend
    axios.get('/trips').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  const regionalSelections = [
    { name: "North India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop", destinations: 12 },
    { name: "South India", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", destinations: 9 },
    { name: "Himalayas", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", destinations: 15 },
    { name: "Northeast", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", destinations: 8 },
    { name: "West India", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop", destinations: 10 },
  ];

  return (
    <div className="max-w-7xl mx-auto border border-white/10 rounded-3xl bg-[#0a0a0a]/50 shadow-2xl backdrop-blur-xl">
      <div className="p-4 md:p-6 lg:p-8">
        <HeroBanner />
        <SearchBar />
        <RegionalSelections selections={regionalSelections} />
        
        {/* We pass the real backend trips to PreviousTrips component */}
        {/* If no trips, we could pass a fallback or show a placeholder */}
        <PreviousTrips trips={trips} />
      </div>
    </div>
  );
}
