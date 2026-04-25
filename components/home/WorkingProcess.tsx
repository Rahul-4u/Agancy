"use client";
import React from 'react';
import { motion } from 'framer-motion';

const WorkingProcess = () => {
  const steps = [
    {
      id: "01",
      title: "Research & Discovery",
      desc: "We begin by understanding your needs, goals, and vision. Through brainstorming sessions and strategic planning.",
      delay: 0.2
    },
    {
      id: "02",
      title: "Design and Development",
      desc: "Once the strategy is in place, we move to designing and developing your vision. Our team collaborates closely to bring your ideas.",
      delay: 0.4
    },
    {
      id: "03",
      title: "Testing and Launch",
      desc: "Before going live, we rigorously test to ensure optimal functionality. After thorough quality checks, we launch your project.",
      delay: 0.6
    }
  ];

  return (
    <section className="bg-[#030712] py-24 relative overflow-hidden w-full">
      
      {/* ১. ফুল উইথ ব্যাকগ্রাউন্ড সার্কিট বোর্ড */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/images/lern.png')] bg-center bg-no-repeat bg-cover opacity-30" 
          style={{ width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        {/* হালকা ব্লু গ্লো ইফেক্ট ডেমো সাইটের মতো */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3065eb]/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* সেকশন হেডার */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[2px] bg-[#3065eb]"></span>
            <span className="text-[#3065eb] font-bold uppercase tracking-[3px] text-xs">Working Process</span>
            <span className="w-8 h-[2px] bg-[#3065eb]"></span>
          </div>
          <h2 className="text-[35px] md:text-[50px] font-black text-white leading-tight">
            Our Seamless Process <br />
            <span className="text-[#ffd600] italic font-medium">From Concept to Creation</span>
          </h2>
        </div>

        {/* প্রসেস স্টেপস লেআউট */}
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6">
          
          {/* কানেক্টিং ড্যাশ লাইন (SVG) */}
          <div className="absolute top-10 left-[15%] right-[15%] hidden lg:block pointer-events-none">
             <svg width="100%" height="80" viewBox="0 0 800 80" fill="none" className="opacity-20">
                <path d="M0 40 C 200 0, 600 0, 800 40" stroke="#ffd600" strokeWidth="2" strokeDasharray="10 10" />
             </svg>
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="flex-1 flex flex-col items-center text-center group relative"
            >
              {/* স্টেপ নম্বর সার্কেল */}
              <div className="relative mb-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#3065eb] to-[#a855f7] flex items-center justify-center text-white text-2xl font-black shadow-[0_0_40px_rgba(48,101,235,0.4)] z-20 relative group-hover:scale-110 transition-transform duration-500">
                  {step.id}
                </div>
                {/* রোটেটিং রিং */}
                <div className="absolute inset-[-10px] border border-white/5 rounded-full border-t-[#ffd600]/40 animate-spin" style={{ animationDuration: '8s' }} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#3065eb] transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 text-[15px] leading-relaxed max-w-[300px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* বাম পাশের ইমেজ (Full Width Layout এর সাথে ব্যালেন্স করতে) */}
      <div className="absolute left-0 bottom-0 w-[350px] opacity-15 hidden 2xl:block pointer-events-none">
        <img src="/images/working-girl.png" alt="Working" className="w-full h-auto grayscale" />
      </div>
    </section>
  );
};

export default WorkingProcess;