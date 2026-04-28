"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Search, MapPin, Phone, Mail } from "lucide-react"; 
import gsap from "gsap";

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

// সেশন প্রপ-টিকে ঐচ্ছিক (?) করে দেওয়া হলো যাতে About পেজে এরর না আসে
export default function Navbar({ session }: { session?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef<any[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      
      gsap.from(linksRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3 });
    }
  }, [sidebarOpen]);

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled ? "bg-[#0B1120] border-b border-white/10 py-3 shadow-2xl" : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
          <Link href="/" className="text-2xl font-extrabold flex items-center gap-1 group">
            <div className="bg-blue-600 text-white px-2 py-1 rounded group-hover:rotate-12 transition-transform shadow-lg">T</div>
            <span className="text-white tracking-tighter">TECHGURU</span>
          </Link>

          <div className="hidden lg:flex gap-8 font-semibold text-white items-center">
            {NAV_LINKS.map(link => (
              <Link key={link.name} href={link.href} className="hover:text-blue-400 transition-colors text-sm">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <button className="text-white hover:text-blue-400 transition p-2 hidden md:block">
              <Search size={20} />
            </button>
            
            {/* ড্যাশবোর্ড বা কন্টাক্ট বাটন সেশন অনুযায়ী */}
            <div className="hidden md:block">
              {session ? (
                <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                  Dashboard <ChevronRight size={16} />
                </Link>
              ) : (
                <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30">
                   Get In Touch <ChevronRight size={16} />
                </Link>
              )}
            </div>
            
            <button className="text-white bg-white/5 border border-white/10 p-3 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div ref={overlayRef} className="fixed inset-0 bg-black/60 z-[110] opacity-0 pointer-events-none transition-opacity" onClick={() => setSidebarOpen(false)}></div>

      {/* Sidebar Panel */}
      <div ref={sidebarRef} className="fixed top-0 right-0 h-screen w-full max-w-sm bg-[#111827] z-[120] translate-x-full border-l border-white/5 shadow-2xl flex flex-col p-10 overflow-y-auto">
        
        <div className="flex justify-between items-center mb-16">
          <Link href="/" className="text-2xl font-black text-white tracking-tighter flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="bg-blue-600 text-white px-2 py-1 rounded">T</div> TechGuru
          </Link>
          <button className="text-gray-400 hover:text-white p-2 bg-white/5 rounded-full" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 space-y-4 mb-20">
          <h4 className="text-xs uppercase font-black text-gray-600 tracking-widest mb-6">Menu</h4>
          {NAV_LINKS.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href} 
              ref={(el) => { linksRef.current[i] = el; }}
              className="text-white hover:text-blue-400 transition-colors text-2xl font-bold flex items-center justify-between group"
              onClick={() => setSidebarOpen(false)}
            >
              {link.name}
              <ChevronRight size={20} className="text-gray-700 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
          ))}
        </div>

        <div className="border-t border-white/5 pt-10 space-y-6 text-gray-400">
           <h4 className="text-xs uppercase font-black text-gray-600 tracking-widest">Contact Info</h4>
           <div className="flex items-start gap-3">
             <MapPin size={22} className="text-blue-500 mt-1" />
             <p className="text-sm">Dhaka HQ, Bangladesh</p>
           </div>
           <div className="flex items-center gap-3">
             <Mail size={18} className="text-blue-500" />
             <span className="text-sm">info@techguru.agency</span>
           </div>
        </div>
      </div>
    </>
  );
}