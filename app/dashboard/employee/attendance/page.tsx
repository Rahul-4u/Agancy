"use client";
import { useState, useEffect } from "react";
import { 
  Users, UserCheck, UserMinus, Plane, Calendar, Gift, 
  Monitor, Smartphone, MonitorOff, Clock, Loader2, Navigation 
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    total: 5000,
    present: 0,
    absent: 0,
    leave: 0,
    late: 0
  });
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // ১. ডাটাবেস থেকে ডাইনামিক ডাটা লোড করা
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/employee/stats"); // আপনার বানানো API রুট
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (error) {
        console.error("Failed to load stats");
      } finally {
        setIsRefreshing(false);
      }
    }
    fetchStats();
  }, []);

  // ২. হাজিরা দেওয়ার ফাংশন (Check In/Out)
  const handleAttendance = async (type: "IN" | "OUT") => {
    setLoading(true);
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, time: now }),
      });

      if (res.ok) {
        toast.success(`${type === 'IN' ? 'Check-in' : 'Check-out'} সফল হয়েছে!`);
      } else {
        const err = await res.json();
        toast.error(err.message || "সমস্যা হয়েছে");
      }
    } catch (error) {
      toast.error("সার্ভার কানেকশন এরর");
    } finally {
      setLoading(false);
    }
  };

  if (isRefreshing) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-6 bg-[#F8F9FB] p-4 min-h-screen">
      
      {/* --- Attendance Actions (New Buttons) --- */}
      <div className="bg-white p-6 rounded-[32px] border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black italic text-slate-800">DAILY ATTENDANCE</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Location: Dhaka Office HQ</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleAttendance("IN")}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} />} CHECK IN
          </button>
          <button 
            onClick={() => handleAttendance("OUT")}
            disabled={loading}
            className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50"
          >
            <Clock size={18} /> CHECK OUT
          </button>
        </div>
      </div>

      {/* --- Top Stats Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-slate-500 mb-4 self-start">Statistics</h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
              <circle cx="64" cy="64" r="58" stroke="#3B82F6" strokeWidth="12" fill="transparent" 
                strokeDasharray="364.4" strokeDashoffset={`${364.4 - (stats.present / stats.total) * 364.4}`} strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black block">{stats.total}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Staff</span>
            </div>
          </div>
          <div className="mt-4 bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-bold">
            {Math.round((stats.present / stats.total) * 100)}% Checked In
          </div>
        </div>

        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard icon={<UserCheck className="text-blue-500" />} label="Checked In" value={stats.present} color="bg-blue-50" />
          <StatCard icon={<UserMinus className="text-rose-500" />} label="Not Checked In" value={stats.absent} color="bg-rose-50" />
          <StatCard icon={<Plane className="text-emerald-500" />} label="On Leave" value={stats.leave} color="bg-emerald-50" />
          <StatCard icon={<Calendar className="text-slate-400" />} label="Weekly Off" value="145" color="bg-slate-50" />
          <StatCard icon={<Gift className="text-amber-500" />} label="Holiday" value="12" color="bg-amber-50" />
          <StatCard icon={<Clock className="text-orange-500" />} label="Checked Out" value="250" color="bg-orange-50" />
        </div>
      </div>

      {/* --- Middle Section (Source & Charts) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border shadow-sm h-64 flex items-center justify-center">
           <p className="text-slate-300 font-bold italic">Attendance Activity Graph Loading...</p>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Attendance Source</h3>
          <div className="grid grid-cols-2 gap-4">
            <SourceBox icon={<Monitor size={16}/>} label="Device Check-Ins" value="2000" />
            <SourceBox icon={<Smartphone size={16}/>} label="App Check-Ins" value="2500" />
            <SourceBox icon={<UserCheck size={16}/>} label="Active Devices" value="145" />
            <SourceBox icon={<MonitorOff size={16}/>} label="Inactive Devices" value="5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ... StatCard, SourceBox ফাংশনগুলো আগের মতোই থাকবে
function StatCard({ icon, label, value, color }: any) {
    return (
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
        <div className={`p-3 rounded-xl mb-3 ${color}`}>{icon}</div>
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</p>
        <span className="text-xl font-black text-slate-800">{value}</span>
      </div>
    );
}

function SourceBox({ icon, label, value }: any) {
    return (
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="text-slate-400 mb-2">{icon}</div>
        <p className="text-[9px] font-bold text-slate-500 uppercase">{label}</p>
        <p className="text-lg font-black text-blue-600">{value}</p>
      </div>
    );
}