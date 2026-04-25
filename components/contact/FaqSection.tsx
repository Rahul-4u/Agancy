"use client";
import React, { useState } from 'react';
import { Plus, Minus, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What services does your IT consultancy agency provide?",
    answer: "We offer a wide range of IT consulting services, including software development, cloud computing solutions, cybersecurity, IT infrastructure management, and digital transformation strategies tailored to your business needs."
  },
  {
    question: "How can IT consulting benefit my business?",
    answer: "Our IT consulting services help businesses improve efficiency, enhance security, reduce operational costs, and stay ahead of technology trends. We provide expert guidance to optimize your IT infrastructure."
  },
  {
    question: "Do you offer customized IT solutions?",
    answer: "Yes, we specialize in creating bespoke solutions that align with your specific business goals and technical requirements."
  },
  {
    question: "How do you ensure data security and compliance?",
    answer: "We implement industry-leading security protocols, regular audits, and compliance checks to ensure your data is always protected and meets legal standards."
  }
];

export default function FaqSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(1); // Default second open

  return (
    <section className="bg-[#0B1120] text-white py-24 px-6 md:px-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">FAQS</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Frequently Asked <br />
            <span className="text-[#D4AF37]">Questions</span>
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Get answers to the most common questions about our products, services, and policies.
          </p>

          <div className="pt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500">
                <Headphones size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Get Support</p>
                <h4 className="text-xl font-black">99 (00) 567 780</h4>
              </div>
            </div>

            <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-pink-500/20">
              Get In Touch →
            </button>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:col-span-7 space-y-4">
          {faqData.map((item, idx) => (
            <div 
              key={idx} 
              className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${activeIdx === idx ? 'bg-[#5F67D2]' : 'bg-transparent'}`}
            >
              <button 
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg">{item.question}</span>
                {activeIdx === idx ? <Minus size={18} /> : <Plus size={18} />}
              </button>

              <AnimatePresence>
                {activeIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-200 leading-relaxed border-t border-white/10 mt-2">
                      <p className="text-sm md:text-base">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}