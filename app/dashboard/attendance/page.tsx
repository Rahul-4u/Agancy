"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  UserCheck, Clock, Loader2, Navigation, ChevronLeft, ChevronRight 
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
          checkIn: "--",
          checkOut: "--"
        });
      }
    }
    return logs.reverse(); 
  }, [attendanceHistory, selectedMonth, selectedYear]);

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
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (isRefreshing) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-4 p-3 md:p-6 font-sans italic tracking-tighter">
      
      {/* Header - Compact */}
      <div className="bg-white p-5 rounded-[30px] border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic leading-none">Shift Manifest</h2>
          <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
            <Navigation size={10}/> Office: 09:00 AM - 06:00 PM
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={() => processAttendance("IN")} disabled={loading} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-[11px] active:scale-95 transition-all">IN</button>
          <button onClick={() => processAttendance("OUT")} disabled={loading} className="flex-1 bg-black text-white px-6 py-3 rounded-2xl font-black text-[11px] active:scale-95 transition-all">OUT</button>
        </div>
      </div>

      {/* Month Switcher - Responsive & Small */}
      <div className="bg-white p-2 rounded-2xl border shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button onClick={() => setSelectedYear(y => y - 1)} className="p-1"><ChevronLeft size={16}/></button>
        <div className="flex gap-1">
          {months.map((m, i) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(i)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${selectedMonth === i ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"}`}
            >
              {m}
            </button>
          ))}
        </div>
        <span className="text-xs font-black px-2">{selectedYear}</span>
        <button onClick={() => setSelectedYear(y => y + 1)} className="p-1"><ChevronRight size={16}/></button>
      </div>

      {/* Table Section - Compact & Responsive */}
      <div className="bg-white rounded-[30px] border shadow-sm overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center bg-slate-50/30">
           <h3 className="text-sm font-black uppercase tracking-tighter">Attendance Log</h3>
           <span className="text-[10px] font-bold text-blue-600">{months[selectedMonth]} {selectedYear}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-5 py-3 text-center">Date</th>
                <th className="px-5 py-3 text-center">In</th>
                <th className="px-5 py-3 text-center">Out</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fullMonthLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-bold text-slate-700 text-xs">
                    {new Date(log.date).getDate()} {months[new Date(log.date).getMonth()]}
                  </td>
                  <td className="px-5 py-3 text-[10px] font-bold text-slate-500 text-center">{log.checkIn}</td>
                  <td className="px-5 py-3 text-[10px] font-bold text-slate-500 text-center">{log.checkOut}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${
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