"use client";

import { useEffect, useRef } from 'react';
import { CheckCircle2, Monitor, Cloud } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin safely for Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * AboutFeature Component
 * A premium section featuring smooth animations and modern dark-mode UI.
 */
export default function AboutFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Using gsap.context ensures all animations are cleaned up properly
    const ctx = gsap.context(() => {
      
      // Image Entrance Animation (Slide and Fade)
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Staggered Entrance for text items
      gsap.from(".feature-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // Floating Badge Animation (Infinite Loop)
      gsap.to(".experience-badge", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    // 2. Cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 md:px-20 bg-[#0B1120] overflow-hidden">
      
      {/* Premium Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Dynamic Image Montage */}
        <div ref={imageRef} className="relative">
          <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070" 
              alt="Main Feature" 
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          {/* Floating Experience Badge */}
          <div className="experience-badge absolute -top-10 -right-5 md:-right-10 w-32 h-32 bg-gradient-to-br from-[#7042F8] to-[#FF4D8D] rounded-full flex flex-col items-center justify-center text-white border-4 border-[#0B1120] z-20 shadow-2xl">
            <span className="text-3xl font-black">25</span>
            <span className="text-[10px] uppercase font-black text-center leading-tight tracking-widest">
              Years of <br/> Experience
            </span>
          </div>

          {/* Secondary Overlapping Image (Desktop Only) */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-[30px] overflow-hidden border-8 border-[#0B1120] z-20 hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" 
              alt="Team Collaboration" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Proof / Satisfied Clients Card */}
          <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20 z-30 shadow-xl">
            <div className="flex -space-x-3 mb-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B1120] overflow-hidden shadow-md">
                   <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Client avatar" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[#0B1120] bg-yellow-500 flex items-center justify-center text-[10px] font-black">+</div>
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">120K+ Happy Users</p>
          </div>
        </div>

        {/* Right Side: Narrative Content */}
        <div className="space-y-8">
          <div className="feature-item flex items-center gap-3">
            <div className="w-12 h-[2px] bg-blue-500"></div>
            <span className="text-blue-500 font-black tracking-[0.2em] text-xs uppercase italic">Our Identity</span>
          </div>

          <h2 className="feature-item text-4xl md:text-6xl font-black text-white leading-tight italic tracking-tighter">
            Supercharge <span className="text-[#FFB800]">Your Success</span> <br />
            With <span className="text-blue-500">AI-Driven</span> Tech
          </h2>

          <p className="feature-item text-slate-400 font-medium leading-relaxed italic">
            Transform your workflow with innovative IT architecture designed to solve the challenges of tomorrow, today.
          </p>

          {/* Checklist Grid */}
          <div className="feature-item grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {[
              "Innovative IT Infrastructure",
              "AI-Driven Automation",
              "Seamless Cloud Migration",
              "Expert Security Consulting"
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-center">
                <CheckCircle2 className="text-yellow-500 shrink-0" size={18} />
                <p className="text-[11px] font-black text-slate-200 uppercase tracking-wide">{text}</p>
              </div>
            ))}
          </div>

          {/* Sub-Feature Highlights */}
          <div className="feature-item pt-8 border-t border-white/5 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex gap-4 group">
                <div className="w-14 h-14 bg-white/5 rounded-[20px] flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Monitor size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black italic uppercase text-sm tracking-tight">Smart Monitoring</h4>
                  <p className="text-[10px] text-slate-500 font-bold italic">Real-time oversight for your tech stack.</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-14 h-14 bg-white/5 rounded-[20px] flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Cloud size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black italic uppercase text-sm tracking-tight">Cloud Native</h4>
                  <p className="text-[10px] text-slate-500 font-bold italic">Scale your operations instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}