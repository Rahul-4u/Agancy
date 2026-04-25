"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function AboutHero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ব্যাকগ্রাউন্ড ইমেজ এনিমেশন
      gsap.fromTo(bgRef.current, 
        { scale: 1.2, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      // টেক্সট এবং ব্রেডক্রাম্ব এনিমেশন
      gsap.from(".about-animate", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[350px] md:h-[450px] w-full overflow-hidden flex items-center justify-center text-white bg-[#0B1120]">
      
      {/* Background Image with Overlay */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')" }}
      >
        {/* ডার্ক ওভারলে যাতে টেক্সট ক্লিয়ার বোঝা যায় */}
        <div className="absolute inset-0 bg-[#0B1120]/75 backdrop-blur-[1px]"></div>
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 text-center space-y-6 px-4 pt-10">
        <h1 className="about-animate text-5xl md:text-7xl font-black tracking-tight">
          About Us
        </h1>
        
        {/* Breadcrumbs - ন্যাভিগেশন পাথ */}
        <div className="about-animate flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl w-fit mx-auto shadow-xl">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
            <Home size={16} className="text-blue-400" /> Home
          </Link>
          <ChevronRight size={14} className="text-gray-500" />
          <span className="text-sm font-bold text-gray-200">About Us</span>
        </div>
      </div>

    </section>
  );
}