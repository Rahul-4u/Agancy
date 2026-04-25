"use client";
import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, User, MailIcon, PhoneCall, ChevronDown, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP Plugin Register
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const infoCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ইমেজ অ্যানিমেশন (বাম থেকে ডানে)
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        }
      });

      // ফর্ম অ্যানিমেশন (নিচ থেকে উপরে)
      gsap.from(formRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        }
      });

      // কন্টাক্ট কার্ডগুলোর স্ট্যাগার অ্যানিমেশন
      gsap.from(infoCardsRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      /* মেইন ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট এবং ডার্ক থিম */
      className="bg-[#030712] bg-gradient-to-br from-[#030712] via-[#0b1229] to-[#030712] py-16 lg:py-28 relative overflow-hidden"
    >
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন গ্লো */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-[#ff4b81]/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          
          {/* বাম পাশ: ইমেজ এবং ইনফো সেকশন */}
          <div ref={imageRef} className="w-full lg:w-5/12 flex flex-col items-center lg:items-start">
            <div className="relative mb-12 w-full max-w-[420px]">
              {/* মেইন ইমেজ উইথ বর্ডার ডিজাইন */}
              <div className="relative z-10 rounded-tr-[100px] rounded-bl-[100px] overflow-hidden border-2 border-white/10 shadow-2xl aspect-[4/5] bg-[#0a1229]">
                <img 
                  src="/images/women.png" // আপনার পাবলিক ফোল্ডারে এই ইমেজটি থাকতে হবে
                  alt="Customer Support" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
                />
              </div>
              {/* আউটলাইন বর্ডার */}
              <div className="absolute -bottom-5 -left-5 w-full h-full border-2 border-[#3065eb] rounded-tr-[100px] rounded-bl-[100px] -z-0 opacity-50" />
            </div>

            {/* কন্টাক্ট ইনফো কার্ডস */}
            <div className="space-y-4 w-full max-w-[420px]">
              {[
                { icon: <Mail size={20} />, label: "Email Us", val: "info@domain.com", color: "bg-blue-500" },
                { icon: <Phone size={20} />, label: "Contact US", val: "99 (00) 567 780", color: "bg-blue-600" },
                { icon: <MapPin size={20} />, label: "Our Address", val: "1629 N. Dixie Avenue, Kentucky", color: "bg-blue-700" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  ref={el => infoCardsRef.current[index] = el}
                  className="flex items-center gap-5 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#3065eb]/40 transition-all group cursor-pointer"
                >
                  <div className={`shrink-0 w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#3065eb] text-[10px] font-bold uppercase tracking-[2px] mb-1">{item.label}</p>
                    <p className="text-white font-bold text-sm sm:text-base truncate">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ডান পাশ: কন্টাক্ট ফর্ম */}
          <div ref={formRef} className="w-full lg:w-7/12">
            <div className="bg-gradient-to-b from-[#0a1229]/90 to-[#030712]/95 backdrop-blur-2xl p-8 sm:p-12 rounded-[40px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="mb-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <span className="w-8 h-[2px] bg-[#3065eb]"></span>
                  <span className="text-[#3065eb] font-bold uppercase tracking-[4px] text-[11px]">Get In Touch</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 leading-tight">
                  Conversation – <span className="text-[#ffd600]">Reach Out</span> <br className="hidden sm:block" /> Anytime
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                  We’re here to listen! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-[#3065eb] focus:bg-white/10 transition-all placeholder:text-gray-600" />
                    <User className="absolute right-6 top-4 text-gray-600 group-focus-within:text-[#3065eb] transition-colors" size={18} />
                  </div>
                  <div className="relative group">
                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-[#3065eb] focus:bg-white/10 transition-all placeholder:text-gray-600" />
                    <MailIcon className="absolute right-6 top-4 text-gray-600 group-focus-within:text-[#3065eb] transition-colors" size={18} />
                  </div>
                  <div className="relative group">
                    <input type="text" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-[#3065eb] focus:bg-white/10 transition-all placeholder:text-gray-600" />
                    <PhoneCall className="absolute right-6 top-4 text-gray-600 group-focus-within:text-[#3065eb] transition-colors" size={18} />
                  </div>
                  <div className="relative group">
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-[#3065eb] focus:bg-white/10 transition-all appearance-none cursor-pointer">
                      <option className="bg-[#0a1229]">Subject</option>
                      <option className="bg-[#0a1229]">Web Development</option>
                      <option className="bg-[#0a1229]">Digital Marketing</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-4 text-gray-600 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="relative group">
                  <textarea rows={5} placeholder="Write your message" className="w-full bg-white/5 border border-white/10 rounded-[30px] py-4 px-6 text-white text-sm outline-none focus:border-[#3065eb] focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none"></textarea>
                  <Send className="absolute right-6 top-5 text-gray-600 group-focus-within:text-[#3065eb] transition-colors" size={18} />
                </div>

                {/* সাবমিট বাটন উইথ গ্রেডিয়েন্ট */}
                <div className="pt-2">
                  <button className="group relative px-12 py-4 rounded-full bg-gradient-to-r from-[#3065eb] to-[#ff4b81] text-white font-bold text-xs uppercase tracking-[2px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20">
                    <span className="relative z-10 flex items-center gap-3">
                      Submit Now <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;