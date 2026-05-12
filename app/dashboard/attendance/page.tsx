"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  UserCheck, Clock, Loader2, Navigation, ChevronLeft, ChevronRight, AlertCircle, UserMinus, Calendar 
} from "lucide-react";
import { toast } from "react-hot-toast";

interface AttendanceLog {
  id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
  lateMinutes?: number;
}

export default function EmployeeDashboard() {
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const syncAttendanceData = async () => {
    try {
      const response = await fetch(`/api/attendance?month=${selectedMonth + 1}&year=${selectedYear}`);
      const data = await response.json();
      if (response.ok) setAttendanceHistory(data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    syncAttendanceData();
  }, [selectedMonth, selectedYear]);

  // ক্যালেন্ডার লজিক
  const fullMonthLogs = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const logs = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = new Date(selectedYear, selectedMonth, d);
      const dateKey = currentDate.toISOString().split('T')[0];
      const existing = attendanceHistory.find(log => log.date.startsWith(dateKey));

      if (existing) {
        logs.push(existing);
      } else {
        const isWeekend = currentDate.getDay() === 5; // Friday
        const isPast = currentDate < new Date().setHours(0,0,0,0);
        logs.push({
          id: dateKey,
          date: dateKey,
          status: isWeekend ? "WEEKEND" : (isPast ? "ABSENT" : "--"),
          checkIn: "--", checkOut: "--"
        });
      }
    }
    return logs.reverse(); 
  }, [attendanceHistory, selectedMonth, selectedYear]);

  // স্ট্যাটাস ক্যালকুলেশন (image_7fc701.png এর কার্ডের জন্য)
  const stats = useMemo(() => {
    const present = attendanceHistory.length;
    const late = attendanceHistory.filter(item => item.status === "LATE").length;
    const absent = fullMonthLogs.filter(item => item.status === "ABSENT").length;
    return { present, late, absent };
  }, [attendanceHistory, fullMonthLogs]);

  const processAttendance = async (type: "IN" | "OUT") => {
    setLoading(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, time: new Date().toLocaleTimeString() }),
      });
      if (res.ok) {
        toast.success(`Clocked ${type === 'IN' ? 'In' : 'Out'}`);
        syncAttendanceData();
      }
    } catch (err) { toast.error("Network error"); }
    finally { setLoading(false); }
  };

  if (isRefreshing) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-5 p-4 md:p-6 font-sans italic tracking-tighter">
      
      {/* 1. Top Header Section */}
      <div className="bg-white p-6 md:p-8 rounded-[40px] border shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-slate-900">Shift Manifest</h2>
          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
            <Navigation size={12}/> Office Hours: 09:00 AM - 06:00 PM
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => processAttendance("IN")} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100">
            <UserCheck size={18}/> CLOCK IN
          </button>
          <button onClick={() => processAttendance("OUT")} disabled={loading} className="flex-1 bg-[#111827] hover:bg-black text-white px-8 py-4 rounded-full font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200">
            <Clock size={18}/> CLOCK OUT
          </button>
        </div>
      </div>

      {/* 2. Stats Cards (image_7fc701.png অনুযায়ী) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Days Present Circle */}
        <div className="bg-white p-6 rounded-[35px] border shadow-sm flex flex-col items-center justify-center col-span-1 md:col-span-1.5 min-h-[220px]">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
              <circle cx="64" cy="64" r="58" stroke="#3B82F6" strokeWidth="8" fill="transparent" 
                strokeDasharray="364" strokeDashoffset={`${364 - (Math.min(stats.present, 30) / 30) * 364}`} strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-black block text-slate-900 leading-none">{stats.present}</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-1 block">Days Present</span>
            </div>
          </div>
        </div>

        {/* Small Stat Cards */}
        <StatCard icon={<UserCheck size={20}/>} label="Attendance" value={stats.present} color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={<AlertCircle size={20}/>} label="Late Records" value={stats.late} color="text-amber-500" bg="bg-amber-50" />
        <StatCard icon={<UserMinus size={20}/>} label="Absent" value={stats.absent} color="text-rose-500" bg="bg-rose-50" />
        <StatCard icon={<Calendar size={20}/>} label="Month" value={months[selectedMonth]} color="text-slate-400" bg="bg-slate-50" />
      </div>

      {/* 3. Month Navigation */}
      <div className="bg-white p-2 rounded-2xl border shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar justify-between px-4">
        <button onClick={() => setSelectedYear(y => y - 1)} className="p-2 hover:bg-slate-50 rounded-full"><ChevronLeft size={18}/></button>
        <div className="flex gap-1">
          {months.map((m, i) => (
            <button key={m} onClick={() => setSelectedMonth(i)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${selectedMonth === i ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-transparent text-slate-400 hover:bg-slate-50"}`}>
              {m}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black">{selectedYear}</span>
          <button onClick={() => setSelectedYear(y => y + 1)} className="p-2 hover:bg-slate-50 rounded-full"><ChevronRight size={18}/></button>
        </div>
      </div>

      {/* 4. Table - Small & Compact */}
      <div className="bg-white rounded-[35px] border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/20">
           <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-800">Attendance Log</h3>
           <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full uppercase">{fullMonths[selectedMonth]} {selectedYear}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-center">Clock In</th>
                <th className="px-8 py-4 text-center">Clock Out</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {fullMonthLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 font-black text-slate-700 text-xs italic">
                    {new Date(log.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-4 text-[10px] font-bold text-slate-500 text-center">{log.checkIn}</td>
                  <td className="px-8 py-4 text-[10px] font-bold text-slate-500 text-center">{log.checkOut}</td>
                  <td className="px-8 py-4 text-right">
                    <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                      log.status === 'PRESENT' || log.status === 'ON TIME' ? 'bg-green-500 text-white' :
                      log.status === 'WEEKEND' ? 'bg-orange-500 text-white' :
                      log.status === 'ABSENT' ? 'bg-red-600 text-white' : 'text-slate-300'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-[35px] border shadow-sm flex flex-col items-center justify-center text-center group hover:border-blue-100 transition-all">
      <div className={`p-4 rounded-2xl mb-3 ${bg} ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <span className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</span>
    </div>
  );
}