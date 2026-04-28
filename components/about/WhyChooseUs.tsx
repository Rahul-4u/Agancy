"use client";

import { useEffect, useRef } from 'react';
import { Award, Users, Heart, Handshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  {
    title: "Unmatched Quality",
    desc: "We deliver exceptional products and services that exceed expectations every time.",
    icon: Award,
    side: "left"
  },
  {
    title: "Trusted Expertise",
    desc: "Backed by years of experience and a proven track record, we are your reliable partner.",
    icon: Users,
    side: "left"
  },
  {
    title: "User-Centric Focus",
    desc: "Your satisfaction is our priority, tailoring solutions to meet your unique enterprise needs.",
    icon: Heart,
    side: "right"
  },
  {
    title: "Proven Results",
    desc: "We have built a reputation by consistently delivering excellent results for global clients.",
    icon: Handshake,
    side: "right"
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const centerImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Center Image Float-up
      gsap.from(centerImgRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Left Features Slide-in
      gsap.from(".feature-left", {
        x: -80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        }
      });

      // Right Features Slide-in
      gsap.from(".feature-right", {
        x: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-20 bg-[#0B1120] overflow-hidden text-white">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-[2px] bg-blue-500"></div>
            <span className="text-blue-500 font-black tracking-[0.2em] text-xs uppercase italic">Our Advantage</span>
            <div className="w-12 h-[2px] bg-blue-500"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight italic tracking-tighter uppercase">
            Future-Ready <span className="text-blue-500">IT Solutions</span> <br />
            Built On <span className="text-[#FFB800]">Reliability</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Left Feature Column */}
          <div className="space-y-20 order-2 lg:order-1">
            {FEATURES.filter(f => f.side === "left").map((f, i) => (
              <div key={i} className="feature-left text-center lg:text-right space-y-4 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-white/5 border border-white/10 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-all duration-500 shadow-2xl group-hover:scale-110">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tight">{f.title}</h3>
                <p className="text-slate-400 text-[13px] font-medium italic leading-relaxed max-w-xs mx-auto lg:ml-auto lg:mr-0">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Image Montage */}
          <div ref={centerImgRef} className="relative order-1 lg:order-2 flex justify-center">
             <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[64px] overflow-hidden border-[12px] border-white/5 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974" 
                  alt="Professional Excellence" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/60 to-transparent"></div>
             </div>
             
             {/* Floating Accent Elements */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
          </div>

          {/* Right Feature Column */}
          <div className="space-y-20 order-3">
            {FEATURES.filter(f => f.side === "right").map((f, i) => (
              <div key={i} className="feature-right text-center lg:text-left space-y-4 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-white/5 border border-white/10 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-all duration-500 shadow-2xl group-hover:scale-110">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tight">{f.title}</h3>
                <p className="text-slate-400 text-[13px] font-medium italic leading-relaxed max-w-xs mx-auto lg:mr-auto lg:ml-0">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}