"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const WhyChooseUs = () => {
  const skills = [
    { label: "Camping Launches", percentage: 86, color: "from-pink-500 to-purple-500" },
    { label: "Innovation Design", percentage: 76, color: "from-blue-500 to-cyan-400" }
  ];

  return (
    <section className="bg-[#030712] py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* ১. বাম পাশের কন্টেন্ট */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#3065eb]"></span>
                <span className="text-[#3065eb] font-black uppercase tracking-[3px] text-xs">Why Choose Us</span>
              </div>
              <h2 className="text-[40px] md:text-[52px] font-[1000] text-white leading-[1.1]">
                Elevate Growth <span className="text-[#ffd600]">with Our</span> <br />
                Cutting-Edge <span className="text-white">IT Solutions</span> <br />
                for Success
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Innovating and empowering businesses with tailored solutions for success and growth. Innovating and empowering.
              </p>
            </div>

            {/* প্রগ্রেস বার সেকশন */}
            <div className="space-y-10">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">{skill.label}</span>
                    <span className="text-white font-bold text-lg">{skill.percentage}%</span>
                  </div>
                  <div className="h-[6px] w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                    >
                      {/* প্রগ্রেস বারের মাথার ছোট ডট */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* বাটন এবং ফাউন্ডার ইনফো */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <button className="bg-[#3065eb] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#3065eb] transition-all flex items-center gap-2 group">
                About Us <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#ffd600] overflow-hidden p-0.5">
                  <img src="/images/WhyChooseUs.png" alt="Founder" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm">Thomas Alison</h4>
                  <p className="text-[#3065eb] text-xs font-bold">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>

          {/* ২. ডান পাশের ইমেজ উইথ সার্কিট বোর্ড ব্যাকগ্রাউন্ড */}
          <div className="relative group">
            {/* মেইন ইমেজ কন্টেইনার */}
            <div className="relative z-10 rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
              {/* ইমেজের ওপর সার্কিট/টেক ওভারলে (পাবলিক ফোল্ডারে থাকলে পাথ দাও) */}
              <div className="absolute inset-0 bg-[url('/images/tech-overlay.png')] opacity-40 mix-blend-screen pointer-events-none" />
              <img 
                src="/images/WhyChooseUs.png" 
                alt="IT Professional" 
                className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* ফ্লোটিং চেক আইকন */}
            <div className="absolute -top-6 left-10 z-20 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#030712] shadow-xl animate-bounce">
              <CheckCircle2 className="text-white" size={24} strokeWidth={3} />
            </div>

            {/* ডেকোরেটিভ এরো/লাইন */}
            <div className="absolute -left-12 bottom-20 hidden xl:block opacity-40">
              <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-12">
                <path d="M10,50 Q50,10 90,50" fill="transparent" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 5" />
                <circle cx="90" cy="50" r="4" fill="#a855f7" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;