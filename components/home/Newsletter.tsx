"use client";
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Newsletter() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ১. মেইন কার্ডটি নিচ থেকে আসবে
      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });

      // ২. টেক্সটগুলো একটু দেরি করে আসবে
      gsap.from(".text-animate", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // ৩. ইনপুট বক্সটি ডান পাশ থেকে আসবে
      gsap.from(inputRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // ৪. ব্যাকগ্রাউন্ডের গ্লো গুলোর মুভিং অ্যানিমেশন (সবসময় চলবে)
      gsap.to(".bg-glow-pulse", {
        scale: 1.2,
        opacity: 0.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 1,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert(); // ক্লিনআপ
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0B1120] py-16 px-6 relative overflow-hidden border-t border-white/5">
      
      {/* --- Tech Background Animation --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 [mask-image:linear-gradient(to_right,black,transparent)]"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 [mask-image:linear-gradient(to_left,black,transparent)] rotate-180"></div>
        
        {/* Animated Glows */}
        <div className="bg-glow-pulse absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full"></div>
        <div className="bg-glow-pulse absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-pink-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          ref={contentRef}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-[#111827]/40 backdrop-blur-xl p-10 md:p-16 rounded-[40px] border border-white/5"
        >
          
          {/* Text Content */}
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-animate text-3xl md:text-5xl font-bold text-white tracking-tight">
              Subscribe to Our <br />
              <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
                Newsletter
              </span>
            </h2>
            <p className="text-animate text-gray-400 text-sm md:text-base max-w-sm">
              Get the latest SEO tips and software insights straight to your inbox.
            </p>
          </div>

          {/* Subscription Form */}
          <div ref={inputRef} className="w-full max-w-lg">
            <div className="flex flex-col gap-4">
              <div className="flex items-center bg-[#0B1120] border border-white/10 rounded-2xl p-1.5 focus-within:border-blue-500/50 transition-all shadow-inner">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="bg-transparent border-none outline-none text-white px-5 py-3 w-full text-sm placeholder:text-gray-500"
                />
                <button className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap">
                  Subscribe Now <ArrowRight size={18} />
                </button>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer group px-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900" />
                <span className="text-gray-400 text-xs md:text-sm">
                  By subscribing, you accept our <span className="text-white hover:underline">Privacy Policy</span>
                </span>
              </label>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}