"use client";
import React from 'react';
import { MapPin, Mail, PhoneCall, User, MailCheck, Phone } from 'lucide-react';

export default function ImitationForm() {
  return (
    <section className="bg-[#0B1120] text-white py-24 px-6 md:px-20 relative overflow-hidden">
      
      {/* Background with subtle dots pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Right Side: Header and Details */}
        <div className="space-y-10 order-2 md:order-2">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-blue-500"></div>
              <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">Get In Touch</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Start the Conversation – <br/>
              <span className="text-[#D4AF37]">Reach Out Anytime</span>
            </h2>
            
            <p className="text-gray-400 max-w-lg leading-relaxed">
              We're here to listen! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
            </p>
          </div>

          <div className="space-y-6 pt-6">
            
            {/* Location */}
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-300">Location</p>
                <h4 className="text-gray-500">
                  1829 N. Dixie Avenue, <br/>
                  Kentucky, 42701
                </h4>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500">
                <MailCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-300">Email Us</p>
                <h4 className="text-gray-500">
                  info@domain.com <br/>
                  support@domain.com
                </h4>
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500">
                <PhoneCall size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-300">Contact</p>
                <h4 className="text-gray-500">
                  Tel: 12 (00) 456 7890 00 <br/>
                  Mob: 99 (00) 567 780
                </h4>
              </div>
            </div>

          </div>
        </div>

        {/* Left Side: Modern Form */}
        <div className="bg-[#161F32] p-10 md:p-12 rounded-[40px] border border-white/5 relative overflow-hidden shadow-2xl order-1 md:order-1 h-fit">
          
          <h3 className="text-3xl font-black text-white mb-10">How Can We Help You?</h3>
          
          <form className="space-y-6 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                <div className="relative">
                  <input type="text" placeholder="Thomas Alison" className="w-full bg-[#1A253A] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all pl-12" />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                <div className="relative">
                  <input type="email" placeholder="thomas@domain.com" className="w-full bg-[#1A253A] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all pl-12" />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                <div className="relative">
                  <input type="text" placeholder="12 (00) 123 4567 890" className="w-full bg-[#1A253A] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all pl-12" />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                <div className="relative">
                    <select className="w-full bg-[#1A253A] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all pl-12 appearance-none">
                        <option>General Inquiry</option>
                        <option>Project Request</option>
                    </select>
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Inquiry about</label>
              <textarea rows={5} placeholder="Write your message here..." className="w-full bg-[#1A253A] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"></textarea>
            </div>
            
            <button type="button" className="w-fit bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 text-white font-black py-4 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-pink-500/10 group">
              Submit Now <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}