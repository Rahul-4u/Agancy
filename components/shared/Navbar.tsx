"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react

export default function Navbar({ session }: { session: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      isScrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold flex items-center gap-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded">T</span>
          <span className={`${isScrolled ? "text-gray-900" : "text-white"}`}>TECHGURU</span>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden md:flex gap-8 font-semibold ${isScrolled ? "text-gray-700" : "text-white/90"}`}>
          <Link href="/" className="hover:text-blue-500 transition">Home</Link>
          <Link href="#services" className="hover:text-blue-500 transition">Services</Link>
          <Link href="#projects" className="hover:text-blue-500 transition">Projects</Link>
          <Link href="#contact" className="hover:text-blue-500 transition">Contact</Link>
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          {session ? (
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-blue-500/30">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-blue-500/30">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-blue-600" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
    </nav>
  );
}