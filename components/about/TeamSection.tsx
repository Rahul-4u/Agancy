"use client";
import { useEffect, useRef } from 'react';
import { Facebook, Twitter, Linkedin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEAM_MEMBERS = [
  {
    name: "Ethan Miller",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
  },
  {
    name: "Sophia Bennett",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
  },
  {
    name: "Liam Johnson",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
  }
];

export default function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // হেডার অ্যানিমেশন
      gsap.from(".team-header", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // মেম্বার কার্ড অ্যানিমেশন
      gsap.from(".team-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-20 bg-[#0B1120] relative overflow-hidden text-white">
      
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left: Content & Navigation */}
        <div className="team-header w-full lg:w-1/3 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 font-semibold tracking-widest text-xs uppercase">Our Members</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Meet Our Team. <span className="text-[#FFB800]">Get to Know</span> the Talented <span className="text-blue-500">Minds</span> Behind Our Team
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Our dedicated team combines expertise, creativity, and passion to deliver exceptional results and ensure your satisfaction every step of the way.
          </p>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            <button className="team-prev w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
              <ArrowLeft size={20} />
            </button>
            <button className="team-next w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Right: Team Slider */}
        <div className="w-full lg:w-2/3">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{ prevEl: '.team-prev', nextEl: '.team-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
            }}
            className="!overflow-visible"
          >
            {TEAM_MEMBERS.map((member, i) => (
              <SwiperSlide key={i} className="team-card">
                <div className="relative group rounded-[40px] overflow-hidden bg-[#161F32]/60 border border-white/5 backdrop-blur-sm">
                  {/* Image */}
                  <img src={member.image} alt={member.name} className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Social Icons (Left Side Floating) */}
                  <div className="absolute top-8 left-6 flex flex-col gap-4 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={16} /></div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-blue-600 transition-colors"><Twitter size={16} /></div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-blue-600 transition-colors"><Linkedin size={16} /></div>
                  </div>

                  {/* Member Info */}
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0B1120] to-transparent">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-blue-400 text-sm font-semibold">{member.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}