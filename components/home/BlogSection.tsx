"use client";

import React from 'react';
import { ArrowRight, Calendar, MessageSquare, User } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future is Now: A 2026 Guide to Digital Transformation",
    excerpt: "Winning the Digital Race: The 2026 Transformation Roadmap. Discover how next-gen AI and cloud architecture are redefining the enterprise landscape.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
    author: "Jordan Walke",
    date: "April 5, 2026",
    comments: 80,
    categories: ["Digital", "Strategy"],
    featured: true
  },
  {
    id: 2,
    title: "5 Key Trends Shaping the Future of Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070",
    author: "John Smith",
    date: "Jan 13, 2026",
    comments: 12,
    categories: ["Insights", "Innovation"],
    featured: false
  },
  {
    id: 3,
    title: "Maximize Efficiency with Smart Business Systems",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    author: "Alisa Olivia",
    date: "Jan 13, 2026",
    comments: 12,
    categories: ["Automation", "Cloud"],
    featured: false
  }
];

export default function BlogSection() {
  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);

  return (
    <section className="bg-[#0B1120] text-white py-24 px-6 md:px-20 relative overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-blue-500"></div>
              <span className="text-blue-500 font-black italic tracking-[0.3em] text-[10px] uppercase">Intelligence Hub</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Explore Our <span className="text-[#FFB800]">Latest Insights</span> <br />
              & Expert <span className="text-blue-500">Perspectives</span>
            </h2>
          </div>
          
          <button className="group bg-white/5 backdrop-blur-xl border border-white/10 px-10 py-5 rounded-[20px] font-black italic uppercase text-xs tracking-widest hover:bg-blue-600 transition-all duration-500 flex items-center gap-3 shadow-2xl">
            View All Intel <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Featured Blog (Left Side) */}
          {featuredPost && (
            <div className="lg:col-span-7 bg-[#111827]/40 backdrop-blur-sm rounded-[48px] overflow-hidden border border-white/5 group hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
              <div className="relative h-[450px] overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                />
                <div className="absolute top-8 left-8 flex gap-2">
                  {featuredPost.categories.map(cat => (
                    <span key={cat} className="bg-[#FFB800] text-black text-[9px] font-black italic px-4 py-1.5 rounded-full uppercase tracking-widest">{cat}</span>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
              </div>

              <div className="p-10 space-y-6">
                <div className="flex items-center gap-6 text-[10px] font-black italic uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-2 text-blue-400"><Calendar size={14} /> {featuredPost.date}</span>
                  <span className="flex items-center gap-2"><MessageSquare size={14} /> {featuredPost.comments} Comments</span>
                  <span className="flex items-center gap-2"><User size={14} /> By {featuredPost.author}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-slate-400 font-medium italic leading-relaxed text-sm">
                  {featuredPost.excerpt}
                </p>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-[10px] font-black italic uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white hover:text-blue-600 transition-all shadow-lg shadow-blue-600/20 group/btn">
                  Full Intel <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Regular Blog List (Right Side) */}
          <div className="lg:col-span-5 space-y-8">
            {regularPosts.map((post) => (
              <div key={post.id} className="bg-[#111827]/40 p-6 rounded-[40px] border border-white/5 flex flex-col sm:flex-row gap-6 group hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                <div className="sm:w-40 sm:h-40 rounded-[30px] overflow-hidden flex-shrink-0 relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-all" />
                </div>
                <div className="flex flex-col justify-between py-1 flex-1">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {post.categories.map(cat => (
                        <span key={cat} className="bg-white/5 text-slate-400 text-[8px] font-black italic px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">{cat}</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-black italic uppercase tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[9px] font-black italic uppercase tracking-widest text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={12} className="text-blue-400" /> {post.date}</span>
                    </div>
                  </div>
                  <button className="mt-4 text-blue-500 text-[10px] font-black italic uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Read Report <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Newsletter CTA Inside Sidebar */}
            <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600 to-purple-700 mt-10 shadow-2xl">
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">Join the Intel List</h4>
              <p className="text-[11px] font-bold italic text-white/70 mb-4 uppercase tracking-wide">Get weekly digital strategy reports directly.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="YOUR@EMAIL.COM" className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex-1 text-[10px] font-black focus:outline-none placeholder:text-white/30" />
                <button className="bg-white text-blue-600 rounded-xl px-4 py-2 font-black italic text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Go</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}