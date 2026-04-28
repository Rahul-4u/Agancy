"use client";

import { useEffect, useRef } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Newsletter() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Card Entry
      gsap.from(contentRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });

      // 2. Text Reveal
      gsap.from(".text-animate", {
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });

      // 3. Constant Background Ambient Pulse
      gsap.to(".bg-glow-pulse", {
        scale: 1.3,
        opacity: 0.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: 2,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#030712] py-24 px-6 relative overflow-hidden border-t border-white/5">
      
      {/* Tech-Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Glows - Matching REBACK Colors */}
        <div className="bg-glow-pulse absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="bg-glow-pulse absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffd600]/5 blur-[120px] rounded-full"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          ref={contentRef}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/[0.02] backdrop-blur-3xl p-10 md:p-20 rounded-[60px] border border-white/10 shadow-2xl"
        >
          
          {/* Header Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-[2px] bg-blue-500"></div>
                <span className="text-blue-500 font-black italic uppercase tracking-[0.3em] text-[10px]">Stay Synced</span>
            </div>
            <h2 className="text-animate text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-[0.95]">
              Join the <br />
              <span className="text-[#ffd600]">Intel</span> <span className="text-blue-500">Network</span>
            </h2>
            <p className="text-animate text-slate-400 font-medium italic text-sm md:text-lg max-w-sm leading-relaxed">
              Architect your inbox with the latest enterprise tech strategies and digital flow reports.
            </p>
          </div>

          {/* Form Content */}
          <div ref={inputRef} className="w-full max-w-xl">
            <div className="flex flex-col gap-6">
              <div className="relative group">
                <div className="flex flex-col md:flex-row items-center bg-[#030712] border border-white/10 rounded-[30px] p-2 focus-within:border-blue-500/50 transition-all shadow-2xl">
                  <div className="flex items-center flex-1 w-full px-4">
                    <Send size={18} className="text-slate-600 mr-2" />
                    <input 
                      type="email" 
                      placeholder="YOUR@ENTERPRISE.EMAIL" 
                      className="bg-transparent border-none outline-none text-white px-4 py-5 w-full text-[12px] font-black italic tracking-widest placeholder:text-slate-700"
                    />
                  </div>
                  <button className="w-full md:w-auto bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black italic text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-600/20 active:scale-95 whitespace-nowrap">
                    Subscribe <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              
              {/* Compliance Label */}
              <label className="flex items-center gap-4 cursor-pointer group px-4">
                <div className="relative flex items-center">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 rounded border border-white/10 bg-white/5 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                    <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1 top-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                </div>
                <span className="text-slate-500 font-bold italic text-[11px] uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                  I accept the <span className="text-blue-500 underline underline-offset-4">REBACK data protocols</span> & Privacy Policy
                </span>
              </label>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}