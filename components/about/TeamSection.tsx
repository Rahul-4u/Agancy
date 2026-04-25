"use client";
import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEAM_MEMBERS = [
  {
    name: "Ethan Miller",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
  },
  {
    name: "Sophia Bennett",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
  },
  {
    name: "Liam Johnson",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
  }
];

export default function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-header-content", {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(".team-card-animate", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-20 bg-[#0B1120] relative overflow-hidden text-white">
      
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        <div className="team-header-content w-full lg:w-1/3 space-y-6 lg:sticky lg:top-32">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 font-semibold tracking-widest text-xs uppercase">Our Members</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Meet Our Team. <span className="text-[#FFB800]">Get to Know</span> the Talented <span className="text-blue-500">Minds</span> Behind Our Team
          </h2>
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Our dedicated team combines expertise, creativity, and passion to deliver exceptional results and ensure your satisfaction every step of the way.
          </p>

          <div className="flex gap-4 pt-6">
            <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
              <ArrowLeft size={20} className="group-active:-translate-x-1 transition-transform" />
            </button>
            <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
              <ArrowRight size={20} className="group-active:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div key={i} className="team-card-animate relative group rounded-[40px] overflow-hidden bg-[#161F32]/60 border border-white/5 backdrop-blur-sm shadow-2xl">
              
              <div className="relative h-[400px] w-full overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                
                {/* Social Icons with Raw SVG to avoid Undefined errors */}
                <div className="absolute top-8 left-6 flex flex-col gap-4 translate-x-[-50px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Facebook SVG */}
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </div>
                  {/* Twitter SVG */}
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.1-3 3c0 7.3-5 14.8-15 14.8A11.6 11.6 0 0 1 3 20c.9 0 3.3-.3 5.4-2.2-2.7-.1-4.8-2-5.4-4.6.4.1.8.1 1.2.1 1.6 0 3.1-.3 4.5-1.1-2.9-.6-4.9-3-4.9-5.9 0-.1 0-.1 0-.2 1 .5 2.2.8 3.4.8C4.5 5.2 3.7 2.4 5.2 1c1.6 1.9 4 3.2 6.7 3.4a4.3 4.3 0 0 1 8.7-1.1c1.2-.2 2.3-.6 3.3-1.2-.4 1.2-1.2 2.2-2.4 2.8 1.1-.1 2.1-.4 3-.8-.7 1.1-1.6 2-2.7 2.7z"></path></svg>
                  </div>
                  {/* LinkedIn SVG */}
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm font-bold tracking-wider uppercase">{member.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}