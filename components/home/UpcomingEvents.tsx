"use client"; 

import { Play, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// ভবিষ্যতে এই ডেটা API থেকে আসবে
const DUMMY_EVENTS = [
  {
    id: 1,
    title: "Innovation Meets",
    description: "It is a long established fact that a reader will",
    location: "1629 N. Dixie Avenue",
    date: "March 18, 2026",
    targetDate: "2026-03-18T00:00:00",
  },
  {
    id: 2,
    title: "Unlock Your Potential",
    description: "It is a long established fact that a reader will",
    location: "1629 N. Dixie Avenue",
    date: "March 25, 2026",
    targetDate: "2026-03-25T00:00:00",
  },
  {
    id: 3,
    title: "Tech Talks Live",
    description: "It is a long established fact that a reader will",
    location: "1629 N. Dixie Avenue",
    date: "March 30, 2026",
    targetDate: "2026-03-30T00:00:00",
  }
];

export default function UpcomingEvents() {
  // ভবিষ্যতে এখানে useEffect দিয়ে fetch('/api/events') করবেন
  const [events, setEvents] = useState(DUMMY_EVENTS);

  return (
    <section className="bg-[#0B1120] text-white py-20 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header: Dynamic Link ready */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-blue-500"></div>
              <span className="text-blue-500 font-semibold tracking-widest text-xs uppercase">Upcoming Events</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Exciting Events <br />
              <span className="text-[#FFB800]">on the Horizon</span>
            </h2>
          </div>
          
          <button className="bg-gradient-to-r from-[#7042f88b] to-[#be45ff8b] border border-[#7042f861] backdrop-blur-md px-8 py-4 rounded-2xl flex items-center gap-3 font-bold hover:scale-105 transition-all active:scale-95 shadow-lg shadow-purple-500/20">
            Contact Us <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Video Preview (Dynamic Source Ready) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative h-[400px] lg:h-full overflow-hidden rounded-[45px] border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070" 
                alt="Main Event" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60"></div>
              
              {/* Play Button */}
              <button className="absolute inset-0 m-auto w-20 h-20 bg-blue-600/90 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:scale-110 transition-all shadow-xl shadow-blue-500/40 group">
                <Play className="fill-white text-white ml-1 group-hover:scale-110 transition-transform" size={32} />
              </button>
            </div>
          </div>

          {/* Right: Dynamic Event List */}
          <div className="lg:col-span-7 space-y-6">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-[#111827]/50 backdrop-blur-xl p-8 rounded-[35px] border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
              >
                {/* Background Glow Effect */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500/5 blur-[100px] group-hover:bg-blue-500/10 transition-all"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  {/* Content */}
                  <div className="space-y-4 flex-1">
                    <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{event.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{event.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-5 pt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                        <MapPin size={14} className="text-[#FFB800]" /> {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                        <Calendar size={14} className="text-[#FFB800]" /> {event.date}
                      </div>
                    </div>
                  </div>

                  {/* Countdown & Action */}
                  <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
                    {/* Placeholder for Countdown Component */}
                    <div className="flex gap-4">
                      {["DAYS", "HRS", "MINS", "SECS"].map((label, i) => (
                        <div key={i} className="text-center">
                          <p className="text-xl font-bold text-purple-400 tabular-nums">00</p>
                          <p className="text-[9px] font-black text-gray-500 tracking-tighter">{label}</p>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full md:w-auto px-6 py-2.5 rounded-full border border-white/20 text-sm font-bold hover:bg-white hover:text-[#0B1120] transition-all flex items-center justify-center gap-2 group/btn">
                      Book Seat <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}