"use client";
import React, { useState } from 'react';
import { Check, X, Zap } from 'lucide-react';

interface PricingPlan {
  id: string | number;
  name: string;
  price: string;
  support_info: string;
  features: { text: string; included: boolean }[];
  is_popular?: boolean;
  link: string;
}

interface PricingProps {
  data?: PricingPlan[]; // Backend থেকে আসা ডেটা
}

const PricingSection = ({ data = [] }: PricingProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // ডামি ডেটা (যদি ব্যাকএন্ড থেকে ডেটা না আসে)
  const defaultPlans: PricingPlan[] = [
    {
      id: 1,
      name: "PERSONAL",
      price: "5.60",
      support_info: "Will Get Free 3 Months Solutions Support",
      features: [
        { text: "Custom Website Design", included: true },
        { text: "website Design & Development", included: true },
        { text: "Social Media Graphics", included: false },
        { text: "Brand Color Palette", included: false },
      ],
      link: "#"
    },
    {
      id: 2,
      name: "PREMIUM",
      price: "25.60",
      support_info: "Will Get Free 5 Months Solutions Support",
      is_popular: true,
      features: [
        { text: "Custom Website Design", included: true },
        { text: "website Design & Development", included: true },
        { text: "Basic & Technical SEO", included: true },
        { text: "Social Media Graphics", included: false },
        { text: "Brand Color Palette", included: false },
      ],
      link: "#"
    },
    {
      id: 3,
      name: "BUSINESS",
      price: "120.60",
      support_info: "Will Get Free Lifetime Solutions Support",
      features: [
        { text: "Custom Website Design", included: true },
        { text: "website Design & Development", included: true },
        { text: "Social Media Graphics", included: false },
        { text: "Brand Color Palette", included: false },
      ],
      link: "#"
    }
  ];

  const plans = data.length > 0 ? data : defaultPlans;

  return (
    <section className="bg-[#030712] py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#3065eb]"></span>
            <span className="text-[#3065eb] font-bold uppercase tracking-[3px] text-xs">Pricing & Plan</span>
            <span className="w-8 h-[2px] bg-[#3065eb]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Select the Perfect <span className="text-[#ffd600]">Plan for Your</span> <br />
            Needs That Fits You
          </h2>

          {/* টগল বাটন */}
          <div className="mt-10 inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-2 rounded-full text-xs font-bold uppercase transition-all ${billingCycle === 'monthly' ? 'bg-[#3065eb] text-white' : 'text-gray-400'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-2 rounded-full text-xs font-bold uppercase transition-all ${billingCycle === 'yearly' ? 'bg-[#3065eb] text-white' : 'text-gray-400'}`}
            >
              Yearly
            </button>
            <button className="px-8 py-2 text-gray-400 text-xs font-bold uppercase">Packages</button>
          </div>
        </div>

        {/* প্রাইসিং কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative p-10 rounded-[30px] border transition-all duration-500 group ${
                plan.is_popular 
                ? 'bg-[#0a1229] border-[#3065eb] scale-105 z-20 shadow-2xl shadow-blue-900/20' 
                : 'bg-white/5 border-white/10 hover:border-[#3065eb]/50 z-10'
              }`}
            >
              {/* জনপ্রিয় ব্যাজ */}
              {plan.is_popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#3065eb] text-white text-[10px] font-bold px-4 py-1 rounded-b-lg uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <p className="text-[#ffd600] font-bold text-sm mb-4 uppercase tracking-widest">{plan.name}</p>
                <h3 className="text-5xl font-black text-white mb-4">
                  ${plan.price}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed px-4">
                  {plan.support_info}
                </p>
              </div>

              <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#3065eb] to-[#ff4b81] text-white font-bold text-sm uppercase tracking-widest mb-8 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Choose Plan <span className="text-lg">⊕</span>
              </button>

              {/* ফিচার লিস্ট */}
              <div className="space-y-4">
                <p className="text-white font-bold text-sm mb-4">Feature Description</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="text-[#3065eb]" size={16} />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center">
                        <X className="text-gray-600" size={10} />
                      </div>
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-200' : 'text-gray-500'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* আনলিমিটেড অফার লেবেল (শুধু জনপ্রিয় কার্ডের জন্য) */}
              {plan.is_popular && (
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-[#ff4b81] font-bold text-xs uppercase italic">
                  <Zap size={14} fill="currentColor" />
                  Unlimited Offer
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;