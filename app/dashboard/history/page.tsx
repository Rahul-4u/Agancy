"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AttendanceHistory() {
  // ডামি ডাটা (আপনি ডাটাবেজ থেকে আনবেন)
  const history = [
    { date: '2026-04-25', in: '09:00 AM', out: '05:30 PM', status: 'Present' },
    { date: '2026-04-24', in: '10:15 AM', out: '05:45 PM', status: 'Late' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-8">
      <Link href="/dashboard" className="flex items-center gap-2 text-[#3065eb] mb-8">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <h2 className="text-3xl font-black mb-6">Attendance <span className="text-[#3065eb]">Log</span></h2>

      <div className="bg-[#0a1229] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-5">Date</th>
              <th className="p-5">Check In</th>
              <th className="p-5">Check Out</th>
              <th className="p-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-5 font-medium">{row.date}</td>
                <td className="p-5 text-green-400">{row.in}</td>
                <td className="p-5 text-red-400">{row.out}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.status === 'Present' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}