"use client";
import React from 'react';
import { CheckCircle2, PhoneCall } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="bg-[#030712] py-24 lg:py-36 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* ১. ইমেজ সেকশন - ডেমো সাইটের মতো ওভারল্যাপ */}
          <div className="lg:col-span-5 relative h-[500px] md:h-[600px]">
            
            {/* বড় মেইন ইমেজ (পিছনেরটা) */}
            <div className="absolute top-0 left-0 w-[85%] h-[85%] rounded-[40px] overflow-hidden border-2 border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-blue-600/10 z-10" /> {/* হালকা নীল আভা */}
              <img 
                src="/images/about.jpg" 
                alt="IT Specialist" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* ছোট ওভারল্যাপিং ইমেজ (সামনেরটা) */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[55%] rounded-[35px] overflow-hidden border-[10px] border-[#030712] shadow-[-20px_-20px_50px_rgba(0,0,0,0.5)] z-20">
              <img 
                src="/images/hero-woman.png" 
                alt="Tech Girl" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* ক্লায়েন্ট ব্যাজ - পজিশন ফিক্সড */}
            <div className="absolute bottom-10 -left-10 z-30 bg-[#0a101f] border border-white/10 px-6 py-4 rounded-2xl shadow-2xl hidden md:block">
              <div className="flex -space-x-3 mb-2">
                {[1, 2, 3].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-[#0a101f]" alt="" />
                ))}
                <div className="w-10 h-10 rounded-full bg-[#ffd600] flex items-center justify-center text-black font-bold text-xs border-2 border-[#0a101f]">+</div>
              </div>
              <p className="text-white font-bold text-[13px] whitespace-nowrap">120K Satisfied Client</p>
            </div>
          </div>

          {/* ২. টেক্সট কন্টেন্ট সেকশন */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-[#3065eb]" />
                <span className="text-[#3065eb] font-black uppercase tracking-[3px] text-xs">About Us</span>
                <div className="w-2 h-[2px] bg-[#3065eb]" />
              </div>
              
              <h2 className="text-[38px] md:text-[55px] font-[1000] text-white leading-[1.1] tracking-tight">
                Unlock Your Business <span className="text-[#ffd600]">Potential</span> <br />
                with Our best Cutting-Edge <br />
                <span className="text-[#3065eb]">IT Solutions to grow</span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl font-medium">
                Transform your business with our innovative IT solutions, tailored to address your unique challenges and drive growth in today's digital landscape.
              </p>
            </div>

            {/* ফিচার গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 py-8 border-y border-white/5">
              {[
                "Customized Solutions for Every Business",
                "Scalable Infrastructure for Growth",
                "Enhanced Security and Data Protection",
                "Continuous system monitoring support"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#3065eb]/10 flex items-center justify-center border border-[#3065eb]/20">
                    <CheckCircle2 size={14} className="text-[#3065eb]" strokeWidth={3} />
                  </div>
                  <span className="text-gray-200 font-bold text-[15px]">{text}</span>
                </div>
              ))}
            </div>

            {/* ফুটার কন্ট্রোলস */}
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-4">
                <span className="text-[50px] font-black text-[#ffd600] leading-none">25</span>
                <p className="text-gray-400 text-[10px] font-black uppercase leading-tight tracking-[1.5px]">
                  Years of <br /> Experience
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#3065eb]/10 flex items-center justify-center text-[#3065eb] border border-[#3065eb]/20">
                  <PhoneCall size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Call Us For Inquiry</p>
                  <p className="text-white font-black text-xl tracking-tighter">00 (123) 456767</p>
                </div>
              </div>

              <button className="bg-[#3065eb] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#3065eb] transition-all duration-300 shadow-lg shadow-[#3065eb]/20">
                Learn More <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;