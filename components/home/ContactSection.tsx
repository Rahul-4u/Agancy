"use client";

import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, User, MailIcon, PhoneCall, ChevronDown, Send, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Slide-in
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        }
      });

      // Form Lift-up
      gsap.from(formRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        }
      });

      // Staggered Info Cards
      gsap.from(infoCardsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="bg-[#030712] py-24 lg:py-40 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
          
          {/* Left Side: Visuals & Info */}
          <div ref={imageRef} className="w-full lg:w-5/12 flex flex-col items-center lg:items-start">
            <div className="relative mb-16 w-full max-w-[450px]">
              {/* Geometric Image Frame */}
              <div className="relative z-10 rounded-[60px] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] group">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" 
                  alt="Customer Support" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-all" />
              </div>
              {/* Tech Outline */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-500/30 rounded-[60px] -z-0" />
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 gap-4 w-full max-w-[450px]">
              {[
                { icon: <Mail size={20} />, label: "Email Hub", val: "SUPPORT@REBACK.COM", color: "bg-blue-600" },
                { icon: <Phone size={20} />, label: "Hotline", val: "+1 (888) REBACK-IT", color: "bg-blue-700" },
                { icon: <MapPin size={20} />, label: "Headquarters", val: "101 Tech Plaza, Silicon Valley", color: "bg-blue-800" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  ref={el => { infoCardsRef.current[index] = el }}
                  className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-xl rounded-[28px] border border-white/5 hover:border-blue-500/40 transition-all group cursor-pointer"
                >
                  <div className={`shrink-0 w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-500 text-[9px] font-black italic uppercase tracking-[0.3em] mb-1">{item.label}</p>
                    <p className="text-white font-black italic uppercase text-sm sm:text-base tracking-tight">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: High-Conversion Form */}
          <div ref={formRef} className="w-full lg:w-7/12">
            <div className="bg-[#0a1229]/40 backdrop-blur-3xl p-8 sm:p-16 rounded-[64px] border border-white/10 shadow-2xl">
              <div className="mb-12 text-center lg:text-left space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="w-12 h-[2px] bg-blue-500"></div>
                  <span className="text-blue-500 font-black italic uppercase tracking-[0.4em] text-[10px]">Contact Us</span>
                </div>
                <h2 className="text-4xl sm:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.95]">
                  Start The <span className="text-[#ffd600]">Conversation</span> – <br />
                  Reach Out <span className="text-blue-500">Now</span>
                </h2>
                <p className="text-slate-400 font-medium italic leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Ready to deploy next-gen solutions? Our team is standing by to architect your business transformation.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input type="text" placeholder="IDENTITY / FULL NAME" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-[11px] font-black italic tracking-widest outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-slate-600" />
                    <User className="absolute right-8 top-5 text-slate-700" size={18} />
                  </div>
                  <div className="relative">
                    <input type="email" placeholder="COMMUNICATION / EMAIL" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-[11px] font-black italic tracking-widest outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-slate-600" />
                    <MailIcon className="absolute right-8 top-5 text-slate-700" size={18} />
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="DIRECT LINE / PHONE" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-[11px] font-black italic tracking-widest outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-slate-600" />
                    <PhoneCall className="absolute right-8 top-5 text-slate-700" size={18} />
                  </div>
                  <div className="relative">
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-[11px] font-black italic tracking-widest outline-none focus:border-blue-500 focus:bg-white/10 transition-all appearance-none cursor-pointer">
                      <option className="bg-[#0a1229]">SELECT SERVICE</option>
                      <option className="bg-[#0a1229]">ENTERPRISE CLOUD</option>
                      <option className="bg-[#0a1229]">AI INTEGRATION</option>
                      <option className="bg-[#0a1229]">CYBER SECURITY</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-5 text-slate-700 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="relative">
                  <textarea rows={5} placeholder="BRIEF YOUR PROJECT REQUIREMENTS" className="w-full bg-white/5 border border-white/10 rounded-[32px] py-6 px-8 text-white text-[11px] font-black italic tracking-widest outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-slate-600 resize-none"></textarea>
                  <Send className="absolute right-8 top-6 text-slate-700" size={18} />
                </div>

                <div className="pt-4">
                  <button className="group relative w-full sm:w-auto px-16 py-6 rounded-full bg-blue-600 text-white font-black italic text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-white hover:text-blue-600 shadow-2xl shadow-blue-600/30">
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      Initiate Deployment <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;