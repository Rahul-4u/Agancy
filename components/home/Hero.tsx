"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MoveRight, ArrowRight, ShieldCheck } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ডেমো সাইটের সেই সিগনেচার রিভীল এনিমেশন
      gsap.from(".dynamic-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.4
      });

      // ছবির জুম এনিমেশন
      gsap.from(".bg-image", {
        scale: 1.2,
        duration: 2.5,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-20 w-full flex items-center overflow-hidden bg-[#030712]">
      
      {/* ১. ডাইনামিক ব্যাকগ্রাউন্ড লেয়ার */}
      <div className="bg-image absolute inset-0 z-0 bg-cover bg-center" 
           style={{ backgroundImage: "url('/images/hero-woman.png')" }} />
      
      {/* ডেমো সাইটের মতো স্মার্ট মাস্কিং */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/70 to-transparent z-10" />

      {/* ২. লেফট সাইড সোশ্যাল বার (Pixel Perfect) */}
      <div className="absolute left-6 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center gap-14 z-30">
          <div className="flex flex-col items-center gap-12 [writing-mode:vertical-lr] rotate-180 text-gray-400 text-[10px] font-bold tracking-[4px] uppercase">
              <a href="#" className="hover:text-[#3065eb] transition-all">FAQs</a>
              <a href="#" className="hover:text-[#3065eb] transition-all">Support</a>
              <a href="#" className="hover:text-[#3065eb] transition-all">Help</a>
          </div>
          <div className="h-24 w-[1px] bg-white/10" />
          <div className="flex flex-col items-center gap-6 text-gray-500">
             <a href="#" className="hover:text-[#3065eb] hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faLinkedinIn} /></a>
             <a href="#" className="hover:text-[#3065eb] hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faInstagram} /></a>
             <a href="#" className="hover:text-[#3065eb] hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faFacebookF} /></a>
          </div>
          <div className="flex items-center gap-4 [writing-mode:vertical-lr] rotate-180 pt-4">
            <span className="h-10 w-[2px] bg-[#ffd600]" />
            <span className="text-gray-400 text-[10px] font-bold tracking-[2px] uppercase">Follow Us:</span>
          </div>
      </div>

      {/* ৩. কন্টেন্ট লেআউট (Dynamic & Overlapping) */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="dynamic-content max-w-[1600px]">
          
          {/* ছোট ডাইনামিক ব্যাজ */}
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
             <div className="w-5 h-5 bg-[#ffd600] rounded-full flex items-center justify-center">
                <img src="https://laravel-techguru.mnsithub.com/assets/images/icon/main-slider-sub-title-icon.png" alt="" className="h-2.5" />
             </div>
            <span className="text-white text-[11px] font-bold uppercase tracking-[2px]">
              IT Solutions Designed for Your Success
            </span>
          </div>

          {/* মেইন হেডলাইন - বোল্ড ও টাইট */}
          <h1 className="text-[50px] md:text-[90px] xl:text-[60px] font-bold text-white leading-[1.1] tracking-[-4px] uppercase mb-10">
            Techguru - <br />
            Smart Solutions <br />
            <span className="text-[#ffd600] italic">for a Connected world</span>
          </h1>

          {/* সাবটাইটেল - ক্লিয়ার ও স্লিম */}
          <p className="text-[#CBD5E1] text-[18px] md:text-[22px] max-w-[700px] leading-[1.5] font-medium mb-12 opacity-90">
            From strategic IT consulting to seamless implementation, we deliver tailored solutions that drive efficiency.
          </p>

          {/* ডাইনামিক বাটন সেকশন */}
          <div className="flex flex-wrap gap-8 items-center">
            <button className="group relative bg-[#3065eb] text-white pl-10 pr-2 py-2 rounded-full font-black text-[19px] flex items-center gap-6 transition-all hover:shadow-[0_20px_50px_rgba(48,101,235,0.5)] uppercase tracking-tight">
              Get Started
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#3065eb] transition-all">
                <MoveRight size={28} strokeWidth={3} />
              </div>
            </button>
            
            <button className="text-white text-[19px] font-black flex items-center gap-4 group uppercase tracking-tight">
              Read More
              <div className="w-12 h-12 border-2 border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#3065eb] group-hover:border-[#3065eb] transition-all">
                 <ArrowRight size={22} className="-rotate-45" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ৪. ফ্লোটিং শিল্ড - ডেমো সাইটের মতো পজিশন */}
      <div className="absolute top-[20%] left-[45%] hidden xl:block z-30">
          <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-[#3065eb]/40 rounded-full animate-ping" />
              <div className="w-16 h-16 bg-[#3065eb] rounded-full flex items-center justify-center border-4 border-white/10 shadow-2xl">
                  <ShieldCheck size={32} className="text-white" strokeWidth={2.5} />
              </div>
          </div>
      </div>

      {/* ৫. স্লাইডার কন্ট্রোল - ডাইনামিক হোভার ইফেক্ট */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-30">
         <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-white/30 cursor-pointer hover:bg-[#3065eb] hover:text-white hover:scale-110 transition-all">
            <ArrowRight size={24} className="-rotate-135" />
         </div>
         <div className="w-14 h-14 bg-[#3065eb] rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-[0_10px_30px_rgba(48,101,235,0.4)] hover:scale-110 transition-all">
            <ArrowRight size={24} className="-rotate-45" />
         </div>
      </div>
    </section>
  );
}