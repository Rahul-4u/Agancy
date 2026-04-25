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
    title: "User-Centric Approach",
    desc: "Your satisfaction is our priority, and we tailor solutions to meet your unique needs.",
    icon: Heart,
    side: "right"
  },
  {
    title: "Trusted by Many",
    desc: "We have built a strong reputation by consistently delivering excellent results.",
    icon: Handshake,
    side: "right"
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const centerImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // মাঝখানের ছবি নিচ থেকে ভেসে উঠবে
      gsap.from(centerImgRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // বাম পাশের পয়েন্টগুলো বাম থেকে আসবে
      gsap.from(".feature-left", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      // ডান পাশের পয়েন্টগুলো ডান থেকে আসবে
      gsap.from(".feature-right", {
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 px-6 md:px-20 bg-[#0B1120] overflow-hidden text-white">
      
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 font-semibold tracking-widest text-xs uppercase">Why Choose Us</span>
            <div className="w-10 h-[1px] bg-blue-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your Business with <span className="text-[#FFB800]">Reliable &</span> <br />
            <span className="text-blue-500">Future-Ready</span> IT Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left Features */}
          <div className="space-y-16 order-2 lg:order-1">
            {FEATURES.filter(f => f.side === "left").map((f, i) => (
              <div key={i} className="feature-left text-center lg:text-right space-y-4 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-all duration-500 shadow-xl">
                  <f.icon size={32} />
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto lg:ml-auto lg:mr-0">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div ref={centerImgRef} className="relative order-1 lg:order-2 flex justify-center">
             <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[50px] overflow-hidden border-[12px] border-white/5 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974" 
                  alt="Professional" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
             {/* Decorative Dots */}
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none -z-10 animate-pulse"></div>
          </div>

          {/* Right Features */}
          <div className="space-y-16 order-3">
            {FEATURES.filter(f => f.side === "right").map((f, i) => (
              <div key={i} className="feature-right text-center lg:text-left space-y-4 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-all duration-500 shadow-xl">
                  <f.icon size={32} />
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto lg:mr-auto lg:ml-0">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}