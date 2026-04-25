"use client";
import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AttendanceDashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAttendance = async (type: 'check-in' | 'check-out') => {
    // এখানে আপনার API কল হবে
    alert(`${type === 'check-in' ? 'Check-in' : 'Check-out'} Successful!`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 flex flex-col items-center">
      {/* ঘড়ি সেকশন */}
      <div className="bg-[#0a1229] p-10 rounded-[40px] border border-white/10 shadow-2xl text-center w-full max-w-lg mb-8 mt-10">
        <h2 className="text-[#3065eb] font-bold uppercase tracking-[4px] text-xs mb-4">Live Monitoring</h2>
        <div className="text-6xl font-black mb-2">{time.toLocaleTimeString()}</div>
        <p className="text-gray-400">{time.toDateString()}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        <button onClick={() => handleAttendance('check-in')} className="group p-8 rounded-3xl bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600/20 transition-all flex flex-col items-center gap-4">
          <LogIn size={40} className="text-blue-500" />
          <span className="font-bold">Entry (Check-in)</span>
        </button>

        <button onClick={() => handleAttendance('check-out')} className="group p-8 rounded-3xl bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 transition-all flex flex-col items-center gap-4">
          <LogOut size={40} className="text-red-500" />
          <span className="font-bold">Exit (Check-out)</span>
        </button>
      </div>

      <Link href="/dashboard/history" className="mt-10 flex items-center gap-2 text-gray-400 hover:text-[#3065eb] transition-colors">
        <Calendar size={18} />
        <span>View Attendance History</span>
      </Link>
    </div>
  );
}