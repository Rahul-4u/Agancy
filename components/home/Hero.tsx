"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MoveRight, ArrowRight, ShieldCheck } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Signature Reveal Animation
      gsap.from(".dynamic-content > *", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
      });

      // Background Zoom In-Out Loop
      gsap.fromTo(".bg-image", 
        { scale: 1.1 }, 
        { scale: 1, duration: 3, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] lg:min-h-screen pt-20 w-full flex items-center overflow-hidden bg-[#030712]">
      
      {/* 1. Dynamic Background Layer */}
      <div 
        className="bg-image absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/images/hero-woman.png')" }} 
      />
      
      {/* Smart Masking: Darker on the left for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10" />

      {/* 2. Left Side Social Bar */}
      <div className="absolute left-8 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center gap-14 z-30">
          <div className="flex flex-col items-center gap-12 [writing-mode:vertical-lr] rotate-180 text-slate-500 text-[10px] font-black tracking-[4px] uppercase italic">
              <a href="#" className="hover:text-blue-500 transition-all">Support</a>
              <a href="#" className="hover:text-blue-500 transition-all">Intel</a>
              <a href="#" className="hover:text-blue-500 transition-all">Direct</a>
          </div>
          <div className="h-24 w-[1px] bg-white/10" />
          <div className="flex flex-col items-center gap-6 text-slate-600">
             <a href="#" className="hover:text-blue-500 hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faLinkedinIn} /></a>
             <a href="#" className="hover:text-blue-500 hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faInstagram} /></a>
             <a href="#" className="hover:text-blue-500 hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faFacebookF} /></a>
          </div>
          <div className="flex items-center gap-4 [writing-mode:vertical-lr] rotate-180 pt-4">
            <span className="h-10 w-[2px] bg-[#ffd600]" />
            <span className="text-slate-500 text-[10px] font-black tracking-[2px] uppercase italic">Signal:</span>
          </div>
      </div>

      {/* 3. Content Layout */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="dynamic-content max-w-[1000px]">
          
          {/* Dynamic Badge */}
          <div className="inline-flex items-center gap-3 mb-10 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-xl">
             <div className="w-2 h-2 bg-[#ffd600] rounded-full animate-pulse shadow-[0_0_10px_#ffd600]" />
            <span className="text-white text-[10px] font-black italic uppercase tracking-[3px]">
              Next-Gen Enterprise Solutions 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[55px] md:text-[85px] xl:text-[100px] font-black text-white leading-[0.9] tracking-tighter uppercase italic mb-10">
            Reback - <br />
            Architecting <br />
            <span className="text-[#ffd600] not-italic">Digital</span> <span className="text-blue-500">Flow</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-[18px] md:text-[20px] max-w-[650px] leading-relaxed font-medium italic mb-12 border-l-4 border-blue-600 pl-6">
            Engineered for high-performance scale. We deliver the custom infrastructure and cloud strategies that redefine industry standards.
          </p>

          {/* Dynamic Buttons */}
          <div className="flex flex-wrap gap-8 items-center">
            <button className="group relative bg-blue-600 text-white pl-10 pr-2 py-2 rounded-full font-black italic text-[16px] flex items-center gap-6 transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] uppercase tracking-widest">
              Initiate Project
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
                <MoveRight size={28} strokeWidth={3} />
              </div>
            </button>
            
            <button className="text-white text-[16px] font-black italic flex items-center gap-4 group uppercase tracking-widest">
              Explore Tech
              <div className="w-12 h-12 border-2 border-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                 <ArrowRight size={22} className="-rotate-45" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Floating Security Shield Badge */}
      <div className="absolute top-[25%] left-[55%] hidden 2xl:block z-30">
          <div className="relative flex items-center justify-center">
              <div className="absolute w-32 h-32 bg-blue-600/20 rounded-full animate-ping" />
              <div className="w-20 h-20 bg-[#030712] rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl backdrop-blur-xl rotate-12">
                  <ShieldCheck size={36} className="text-blue-500" strokeWidth={1.5} />
              </div>
          </div>
      </div>

      {/* 5. Slider Controls */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-30">
         <div className="w-16 h-16 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 text-white/30 cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-500">
            <ArrowRight size={24} className="rotate-180" />
         </div>
         <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-2xl hover:scale-110 transition-all duration-500">
            <ArrowRight size={24} />
         </div>
      </div>
    </section>
  );
}