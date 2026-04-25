"use client";
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden bg-[#0B1120]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-[#0B1120]/80"></div>
      </div>

      <div className="relative z-10 text-center space-y-4 pt-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">Contact Us</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 w-fit mx-auto shadow-2xl">
          <Link href="/" className="text-xs md:text-sm hover:text-blue-400 flex items-center gap-1.5 transition-colors">
            <Home size={14} className="text-blue-400" /> Home
          </Link>
          <ChevronRight size={12} className="text-gray-600" />
          <span className="text-xs md:text-sm font-bold text-gray-300">Contact Us</span>
        </div>
      </div>
    </section>
  );
}