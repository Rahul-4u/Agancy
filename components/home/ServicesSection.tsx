"use client";
import React from 'react';

const ServicesSection = () => {
  const serviceList = [
    {
      id: "01",
      title: "Software Development Solutions",
      subServices: ["UI/UX Design", "Mobile Application", "Mobile Application", "Research", "Research", "UI/UX Design"]
    },
    {
      id: "02",
      title: "Cybersecurity Risk Management",
      subServices: ["Security", "Performance", "Scalability", "Reliability", "Innovation", "Efficiency"]
    },
    {
      id: "03",
      title: "Cloud Solutions Provider",
      subServices: ["Cloud Security", "Cloud Scalability", "Cloud Integration", "Cloud Performance", "Cloud Backup", "Cloud Optimization"]
    },
    {
      id: "04",
      title: "Data Analytics Consulting",
      subServices: ["Data Insights", "Predictive Analytics", "Big Data", "Business Intelligence", "Data Visualization", "Data Strategy"]
    }
  ];

  return (
    <section className="bg-[#030712] py-24 relative overflow-hidden">
      {/* বাম পাশের সেই বেগুনি গ্লো ইফেক্ট */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="w-8 h-[2px] bg-[#3065eb]"></span>
               <span className="text-[#3065eb] font-bold uppercase tracking-[3px] text-xs">Our Services</span>
            </div>
            <h2 className="text-[35px] md:text-[50px] font-bold text-white leading-tight">
              Your Business with Cutting-Edge IT <br /> Solutions
            </h2>
            <p className="text-[#ffd600] italic text-2xl font-medium">
              Innovative IT Services Tailored for Your Success
            </p>
          </div>

          {/* ডান পাশের সার্কুলার টেক্সট ব্যাজ */}
          <div className="relative w-32 h-32 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite] group-hover:pause">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-gray-400 font-bold text-[10px] tracking-[2px]">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text>
                  <textPath xlinkHref="#circlePath">
                    VIEW ALL SERVICES • PROJECT VIEW ALL SERVICES •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="w-12 h-12 bg-[#3065eb] rounded-full flex items-center justify-center text-white">
               <span className="text-2xl">✦</span>
            </div>
          </div>
        </div>

        {/* সার্ভিস লিস্ট টেবিল স্টাইল */}
        <div className="border-t border-white/10">
          {serviceList.map((service, index) => (
            <div 
              key={index} 
              className="group border-b border-white/10 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 transition-all hover:bg-white/5 px-4"
            >
              {/* আইডি এবং টাইটেল */}
              <div className="flex items-center gap-8 lg:w-1/3">
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-bold group-hover:bg-[#3065eb] group-hover:border-[#3065eb] transition-all">
                  {service.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#3065eb] transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* সাব-সার্ভিস গ্রিড */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 lg:w-2/3">
                {service.subServices.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-400 group-hover:text-gray-200 transition-colors text-sm font-medium">
                    <span className="text-[#3065eb]">+</span>
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;