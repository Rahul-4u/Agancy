"use client";
import { Star, Quote } from 'lucide-react';

// ভবিষ্যতে এই ডেটা API বা Database থেকে আসবে
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Thomas Alison",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?u=thomas",
    rating: 4,
    feedback: "Absolutely fantastic experience! The team exceeded our expectations and delivered a solution that perfectly met our needs. Their attention to detail and commitment to quality is unmatched.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Marketing Manager",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 3,
    feedback: "Absolutely fantastic experience! The team exceeded our expectations and delivered a solution that perfectly met our needs. Their attention to detail and commitment to quality is unmatched.",
  },
  {
    id: 3,
    name: "James Anderson",
    role: "Product Designer",
    image: "https://i.pravatar.cc/150?u=james",
    rating: 4,
    feedback: "Absolutely fantastic experience! The team exceeded our expectations and delivered a solution that perfectly met our needs. Their attention to detail and commitment to quality is unmatched.",
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#0B1120] py-24 px-6 relative overflow-hidden text-white">
      {/* Background Gradients (চমৎকার আভার জন্য) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="w-8 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 font-medium tracking-widest text-xs uppercase">Testimonials</span>
            <div className="w-8 h-[1px] bg-blue-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Customer Experiences <br />
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">That Speak Volumes</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div 
              key={item.id} 
              className="group relative p-[1px] rounded-[35px] transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Card Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-[35px]"></div>
              
              {/* Main Card Content */}
              <div className="relative bg-[#111827]/80 backdrop-blur-2xl p-8 rounded-[35px] h-full flex flex-col justify-between border border-white/5 shadow-2xl">
                
                <div className="space-y-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < item.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-600"} 
                      />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    "{item.feedback}"
                  </p>
                </div>

                {/* User Info Section */}
                <div className="mt-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* User Profile Gradient Glow */}
                    <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#111827]"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                  
                  {/* Quote Icon with Gradient */}
                  <Quote size={32} className="text-blue-500/20 group-hover:text-blue-500/40 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          <div className="w-6 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        </div>

      </div>
    </section>
  );
}