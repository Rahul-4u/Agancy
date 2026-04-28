"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

/**
 * AboutHero Component
 * A high-impact header for the About page featuring GSAP parallax entrance effects.
 */
export default function AboutHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Using gsap.context for clean memory management in React
    const ctx = gsap.context(() => {
      
      // Background Image Scale-down effect
      gsap.fromTo(bgRef.current, 
        { scale: 1.3, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2.5, ease: "expo.out" }
      );

      // Staggered entrance for Title and Breadcrumbs
      gsap.from(".about-animate", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        delay: 0.5,
        ease: "power4.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[400px] md:h-[550px] w-full overflow-hidden flex items-center justify-center text-white bg-[#0B1120]">
      
      {/* Background Layer with Deep Overlay */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')" }}
      >
        {/* Multi-layered overlay for better text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/40 via-[#0B1120]/80 to-[#0B1120]"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content Area */}
      <div ref={contentRef} className="relative z-10 text-center space-y-8 px-4">
        
        {/* Main Title - Matches REBACK Branding */}
        <h1 className="about-animate text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
          About <span className="text-blue-500">Us</span>
        </h1>
        
        {/* Breadcrumbs - Modern Pill Design */}
        <div className="about-animate flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-[24px] w-fit mx-auto shadow-2xl">
          <Link href="/" className="flex items-center gap-2 text-xs font-black italic uppercase tracking-widest hover:text-blue-400 transition-all">
            <Home size={14} className="text-blue-500" /> Home
          </Link>
          
          <ChevronRight size={14} className="text-slate-600" />
          
          <span className="text-xs font-black italic uppercase tracking-widest text-slate-400">
            About Us
          </span>
        </div>

      </div>

      {/* Decorative Bottom Curve/Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0B1120] to-transparent z-10"></div>
    </section>
  );
}