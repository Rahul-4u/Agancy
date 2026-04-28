"use client";

import React from 'react';
import { CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react';

/**
 * AboutSection Component
 * Featuring overlapping image geometry and premium typography.
 */
const AboutSection = () => {
  return (
    <section className="bg-[#030712] py-24 lg:py-40 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* 1. Image Montage Section */}
          <div className="lg:col-span-5 relative h-[500px] md:h-[650px] w-full">
            
            {/* Main Background Image */}
            <div className="absolute top-0 left-0 w-[88%] h-[85%] rounded-[48px] overflow-hidden border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-blue-600/10 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1573163281530-5be9c81b3096?q=80&w=2070" 
                alt="Infrastructure" 
                className="w-full h-full object-cover grayscale"
              />
            </div>

            {/* Overlapping Foreground Image */}
            <div className="absolute bottom-0 right-0 w-[65%] h-[58%] rounded-[40px] overflow-hidden border-[12px] border-[#030712] shadow-[-20px_-20px_60px_rgba(0,0,0,0.6)] z-20">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070" 
                alt="Specialist" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Client Success Badge */}
            <div className="absolute bottom-12 -left-8 z-30 bg-[#0a101f]/90 backdrop-blur-xl border border-white/10 px-8 py-5 rounded-[24px] shadow-2xl hidden md:block">
              <div className="flex -space-x-3 mb-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-11 h-11 rounded-full border-2 border-[#0a101f] overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="w-11 h-11 rounded-full bg-[#ffd600] flex items-center justify-center text-black font-black text-xs border-2 border-[#0a101f]">+</div>
              </div>
              <p className="text-white font-black italic uppercase text-[11px] tracking-widest">120K+ Global Clients</p>
            </div>
          </div>

          {/* 2. Text Content Section */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-[#3065eb]" />
                <span className="text-[#3065eb] font-black italic uppercase tracking-[0.3em] text-[10px]">Our Mission</span>
              </div>
              
              <h2 className="text-[40px] md:text-[64px] font-black italic text-white leading-[0.95] tracking-tighter uppercase">
                Unlock Your Business <span className="text-[#ffd600]">Potential</span> <br />
                With <span className="text-[#3065eb]">Elite Tech</span> Strategies
              </h2>
              
              <p className="text-slate-400 text-lg font-medium italic leading-relaxed max-w-2xl">
                Transform your digital architecture with innovative IT solutions. We address your unique complexities and drive exponential growth in the 2026 landscape.
              </p>
            </div>

            {/* Feature Check-list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 py-10 border-y border-white/5">
              {[
                "Customized Enterprise Solutions",
                "Scalable Growth Infrastructure",
                "Advanced Cyber Protection",
                "24/7 Real-Time Monitoring"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-7 h-7 rounded-full bg-[#3065eb]/10 flex items-center justify-center border border-[#3065eb]/20 group-hover:bg-[#3065eb] group-hover:text-white transition-all">
                    <CheckCircle2 size={16} strokeWidth={3} className="text-[#3065eb] group-hover:text-white" />
                  </div>
                  <span className="text-slate-200 font-black italic uppercase text-[13px] tracking-tight">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA and Contact Row */}
            <div className="flex flex-wrap items-center gap-12">
              {/* Experience Stat */}
              <div className="flex items-center gap-4">
                <span className="text-[60px] font-black text-[#ffd600] leading-none italic tracking-tighter">25</span>
                <p className="text-slate-500 text-[10px] font-black italic uppercase leading-none tracking-[2px]">
                  Years of <br /> Excellence
                </p>
              </div>

              {/* Inquiry Line */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[20px] bg-white/5 flex items-center justify-center text-[#3065eb] border border-white/10 shadow-xl">
                  <PhoneCall size={28} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 italic">Contact Hub</p>
                  <p className="text-white font-black text-2xl tracking-tighter italic">00 (123) 456767</p>
                </div>
              </div>

              {/* Button */}
              <button className="group bg-[#3065eb] text-white px-12 py-6 rounded-full font-black italic uppercase text-xs tracking-widest hover:bg-white hover:text-[#3065eb] transition-all duration-500 flex items-center gap-3">
                Learn More <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;