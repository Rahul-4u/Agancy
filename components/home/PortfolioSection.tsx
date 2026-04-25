"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PortfolioItem {
  id: string | number;
  image: string;
  title: string;
  description: string;
  category?: string;
  link?: string;
}

interface PortfolioProps {
  data?: PortfolioItem[]; // Admin Dashboard থেকে আসা ডেটা
}

const PortfolioSection = ({ data = [] }: PortfolioProps) => {
  
  // ড্যাশবোর্ডে ডেটা না থাকলে এই ডিফল্ট ডেটাগুলো দেখাবে
  const defaultData: PortfolioItem[] = [
    {
      id: 1,
      image: "/images/portfolio-1.jpg",
      title: "Driving Success Through Technology",
      description: "Innovative Solutions, Powerful Results",
      category: "IT Solutions"
    },
    {
      id: 2,
      image: "/images/portfolio-2.jpg",
      title: "Empowering Businesses with Cutting-Edge IT",
      description: "Explore How We've Empowered Businesses",
      category: "Development"
    },
    {
      id: 3,
      image: "/images/portfolio-3.jpg",
      title: "Innovative Solutions, Powerful Results",
      description: "Crafting Success Through Innovation",
      category: "Consulting"
    }
  ];

  const displayData = data.length > 0 ? data : defaultData;

  return (
    <section className="bg-[#030712] py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#3065eb]"></span>
            <span className="text-[#3065eb] font-bold uppercase tracking-[3px] text-xs">Portfolio</span>
            <span className="w-8 h-[2px] bg-[#3065eb]"></span>
          </div>
          <h2 className="text-[35px] md:text-[50px] font-black text-white leading-tight uppercase">
            Explore Our Creative <span className="text-[#ffd600]">Journey</span> <br />
            Crafting Success Through
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          className="portfolio-slider !pb-16"
        >
          {displayData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-[550px] rounded-[40px] overflow-hidden group cursor-pointer border border-white/10">
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight transition-colors group-hover:text-[#ffd600]">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {item.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="w-12 h-12 rounded-full bg-[#3065eb] flex items-center justify-center text-white shadow-lg shadow-blue-600/30 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowRight size={20} />
                  </div>
                </div>

                {/* Vertical Category Label */}
                <div className="absolute top-12 left-8">
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-[5px] rotate-90 origin-left whitespace-nowrap">
                    {item.category || "Technology"}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PortfolioSection;