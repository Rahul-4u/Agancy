"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Trophy, Users2, MessageSquare, FolderCheck } from 'lucide-react';

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="text-white text-[32px] md:text-[45px] font-[1000] leading-none tracking-tighter">
      {displayValue}{suffix}
    </span>
  );
};

const StatisticsSection = () => {
  const stats = [
    { icon: <Trophy size={22} />, value: 120, label: "Creative Plus award", gradient: "from-pink-500 to-purple-600" },
    { icon: <Users2 size={22} />, value: 300, label: "Expert Team Members", gradient: "from-purple-500 to-blue-600" },
    { icon: <MessageSquare size={22} />, value: 20, suffix: "M", label: "Happy Clients Review", gradient: "from-pink-600 to-rose-500" },
    { icon: <FolderCheck size={22} />, value: 1.5, suffix: "K", label: "Project Completed", gradient: "from-blue-600 to-indigo-500" }
  ];

  return (
    <section className="relative w-full py-10 md:py-14 overflow-hidden bg-[#030a21]">
      {/* ডাইনামিক লুপ এনিমেশন ব্যাকগ্রাউন্ড */}
      <motion.div 
        className="absolute inset-0 opacity-30 z-10 bg-center bg-repeat-x"
        style={{ 
          backgroundImage: "url('/images/StatisticsSection.png')",
          backgroundSize: 'contain'
        }}
        animate={{ 
          backgroundPosition: ['0px 0px', '1000px 0px'] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* ছোট এবং কালারফুল আইকন বক্স */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:rotate-[360deg] transition-transform duration-700`}>
                <div className="text-white">{item.icon}</div>
              </div>

              <div>
                <Counter value={item.value} suffix={item.suffix} />
              </div>

              <p className="text-gray-400 text-[10px] md:text-[11px] font-black uppercase tracking-[2px] mt-2 opacity-70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;