"use client";
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future is Now: A 2026 Guide to Digital Transformation",
    excerpt: "Winning the Digital Race: The 2026 Transformation Roadmap. Next-Gen Digital Transformation",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
    author: "Jordan Walke",
    date: "April 5, 2026",
    comments: 80,
    categories: ["Digital", "Technology"],
    featured: true
  },
  {
    id: 2,
    title: "5 Key Trends Shaping the Future of Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070",
    author: "John Smith",
    date: "Jan 13, 2026",
    comments: 12,
    categories: ["Digital", "Technology"],
    featured: false
  },
  {
    id: 3,
    title: "How to Maximize Efficiency with Smart Business",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    author: "Alisa Olivia",
    date: "Jan 13, 2026",
    comments: 12,
    categories: ["Digital", "Technology"],
    featured: false
  }
];

export default function BlogSection() {
  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);

  return (
    <section className="bg-[#0B1120] text-white py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-blue-500"></div>
              <span className="text-blue-500 font-semibold tracking-widest text-xs uppercase">Our Blogs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Latest <span className="text-[#FFB800]">Blogs for Expert Insights</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Dive into our collection of blogs where we share expert insights, helpful tips, and the latest trends in the industry.
            </p>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all">
            View All Blogs →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Blog (Left Side) */}
          {featuredPost && (
            <div className="lg:col-span-6 bg-[#111827] rounded-[40px] overflow-hidden border border-white/5 group">
              <div className="relative h-[350px]">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {featuredPost.categories.map(cat => (
                    <span key={cat} className="bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase">{cat}</span>
                  ))}
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-6 text-xs text-gray-400">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-yellow-500" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-2"><MessageSquare size={14} className="text-yellow-500" /> {featuredPost.comments} Comments</span>
                </div>
                <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-400 transition-colors">{featuredPost.title}</h3>
                <p className="text-gray-400 text-sm">{featuredPost.excerpt}</p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all">
                  Read More →
                </button>
              </div>
            </div>
          )}

          {/* Regular Blog List (Right Side) */}
          <div className="lg:col-span-6 space-y-6">
            {regularPosts.map((post) => (
              <div key={post.id} className="bg-[#111827] p-6 rounded-[35px] border border-white/5 flex flex-col md:flex-row gap-6 group hover:border-blue-500/30 transition-all">
                <div className="md:w-48 h-48 rounded-[30px] overflow-hidden flex-shrink-0">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-between py-2 flex-1">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {post.categories.map(cat => (
                        <span key={cat} className="bg-white/5 text-gray-300 text-[9px] px-3 py-1 rounded-full border border-white/10">{cat}</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments} Comments</span>
                    </div>
                  </div>
                  <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 w-fit px-5 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 hover:scale-105 transition-all">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}