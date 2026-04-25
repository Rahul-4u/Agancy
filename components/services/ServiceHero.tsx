"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function ServiceHero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ব্যাকগ্রাউন্ড জুম-আউট অ্যানিমেশন
      gsap.fromTo(bgRef.current, 
        { scale: 1.3, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      // টাইটেল এবং ব্রেডক্রাম্ব অ্যানিমেশন
      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden flex items-center justify-center text-white">
      
      {/* Background Image with Bokeh/Blur Effect */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')",
        }}
      >
        {/* Darker Overlay for better readability */}
        <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 text-center space-y-4 px-4 pt-10">
        <h1 className="hero-text text-4xl md:text-6xl font-black tracking-tight">
          Our Services
        </h1>
        
        {/* Breadcrumbs Navigation */}
        <div className="hero-text flex items-center justify-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 px-5 py-2 rounded-xl w-fit mx-auto">
          <Link href="/" className="flex items-center gap-1.5 text-xs md:text-sm hover:text-blue-400 transition-colors">
            <Home size={14} className="mb-0.5" /> Home
          </Link>
          <ChevronRight size={12} className="text-gray-500" />
          <span className="text-xs md:text-sm font-bold text-gray-300">Our Services</span>
        </div>
      </div>

      {/* Bottom Border Line to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    </section>
  );
}