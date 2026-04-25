"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Search, Menu } from 'lucide-react';
import gsap from 'gsap';

export default function AboutHero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current, 
        { scale: 1.2, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      // টেক্সটগুলো নিচ থেকে ভেসে উঠবে
      gsap.from(".about-animate", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden flex items-center justify-center text-white">
      
      {/* Background Image with Overlay */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-[#0B1120]/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Navbar (Header inside Hero for this design) */}
      <nav className="absolute top-0 left-0 w-full z-20 px-6 py-6 md:px-20 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
             <span className="font-bold text-xl italic">T</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">TechGuru</span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {['Home', 'About', 'Pages', 'Services', 'Shop', 'Blog', 'Contact'].map((item) => (
            <Link key={item} href="#" className={`hover:text-blue-400 transition-colors ${item === 'About' ? 'text-yellow-500' : ''}`}>
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-all">
            <Search size={20} />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hidden md:flex items-center gap-2 transition-all">
            Get In Touch <ChevronRight size={16} />
          </button>
          <button className="p-2 bg-white/5 rounded-lg lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 text-center space-y-6 px-4">
        <h1 className="about-animate text-5xl md:text-7xl font-black tracking-tight">
          About Us
        </h1>
        
        {/* Breadcrumbs */}
        <div className="about-animate flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl w-fit mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
            <Home size={16} className="text-blue-400" /> Home
          </Link>
          <ChevronRight size={14} className="text-gray-500" />
          <span className="text-sm font-bold text-gray-200">About Us</span>
        </div>
      </div>

    </div>
  );
}