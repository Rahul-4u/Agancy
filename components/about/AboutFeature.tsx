"use client";
import { useEffect, useRef } from 'react';
import { CheckCircle2, Monitor, Cloud, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutFeature() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // বাম পাশের ইমেজ অ্যানিমেশন (Scale & Rotate)
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

      // ডান পাশের কন্টেন্ট অ্যানিমেশন (Staggered Fade-in)
      gsap.from(".feature-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // সেই '25 Years' ব্যাজটির ফ্লোটিং অ্যানিমেশন
      gsap.to(".experience-badge", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 md:px-20 bg-[#0B1120] overflow-hidden">
      
      {/* --- সেই প্রিমিয়াম গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Images Collection */}
        <div ref={imageRef} className="relative">
          <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070" 
              alt="Main Feature" 
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          {/* Experience Badge */}
          <div className="experience-badge absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#7042F8] to-[#FF4D8D] rounded-full flex flex-col items-center justify-center text-white border-4 border-[#0B1120] z-20 shadow-xl">
            <span className="text-3xl font-black">25</span>
            <span className="text-[10px] uppercase font-bold text-center leading-tight">Years of <br/> Experience</span>
          </div>

          {/* Small Overlapping Image */}
          <div className="absolute -bottom-10 -right-10 md:right-0 w-64 h-64 rounded-[30px] overflow-hidden border-8 border-[#0B1120] z-20 hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" 
              alt="Team" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Satisfied Clients Badge */}
          <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 z-30">
            <div className="flex -space-x-3 mb-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B1120] bg-gray-600 overflow-hidden">
                   <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[#0B1120] bg-yellow-500 flex items-center justify-center text-xs font-bold">+</div>
            </div>
            <p className="text-[10px] font-bold text-white uppercase tracking-tighter">120K Satisfied Client</p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div ref={contentRef} className="space-y-8">
          <div className="feature-item flex items-center gap-3">
            <div className="w-10 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 font-semibold tracking-widest text-xs uppercase">About Us</span>
          </div>

          <h2 className="feature-item text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Supercharge <span className="text-[#FFB800]">Your Business</span> <br />
            Growth with Our <span className="text-blue-500">Cutting-Edge IT</span> Solutions
          </h2>

          <p className="feature-item text-gray-400 leading-relaxed">
            Transform your business with our innovative IT solutions, tailored to address your unique challenges and drive growth in today's digital landscape.
          </p>

          {/* Grid Checklist */}
          <div className="feature-item grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {[
              "Innovative IT Solutions Expert Support & Consulting",
              "Seamless Digital Transformation AI-Driven Business Automation",
              "Cloud Solutions for Modern Enterprises"
            ].map((text, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle2 className="text-yellow-500 shrink-0" size={20} />
                <p className="text-xs font-bold text-gray-300 leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <div className="feature-item pt-8 border-t border-white/5 space-y-8">
            {/* Feature Boxes */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex gap-4 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Monitor size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Innovative IT Solutions</h4>
                  <p className="text-xs text-gray-500">Stay ahead with cutting-edge technology tailored to your needs.</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Cloud size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Cloud Solutions</h4>
                  <p className="text-xs text-gray-500">Secure, scalable, and efficient cloud services to power growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}