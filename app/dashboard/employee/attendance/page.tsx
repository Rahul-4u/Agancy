"use client";
import { useState, useEffect } from "react";
import { 
  Users, UserCheck, UserMinus, Plane, Calendar, Gift, 
  Monitor, Smartphone, MonitorOff, Clock, Loader2, Navigation, AlertCircle 
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    total: 30, // Monthly Total Days
    present: 0,
    absent: 0,
    leave: 0,
    late: 0
  });
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // Sync personal attendance logs and monthly summary
  const syncAttendanceData = async () => {
    try {
      const response = await fetch("/api/attendance"); // GET method returns history
      const data = await response.json();
      if (response.ok) {
        setAttendanceHistory(data);
        
        // Calculate dynamic stats from the history logs
        const lateCount = data.filter((item: any) => item.status === "LATE").length;
        const presentCount = data.length;
        setStats(prev => ({ ...prev, present: presentCount, late: lateCount }));
      }
    } catch (error) {
      console.error("Critical Sync Error: Unable to fetch logs");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    syncAttendanceData();
  }, []);

  // Dispatch attendance registration (Check In/Out)
  const processAttendanceRequest = async (type: "IN" | "OUT") => {
    setLoading(true);
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, time: timestamp }),
      });

      if (res.ok) {
        toast.success(`Operational ${type === 'IN' ? 'Check-in' : 'Check-out'} confirmed`);
        syncAttendanceData(); // Refresh logs to show the new entry immediately
      } else {
        const errorPayload = await res.json();
        toast.error(errorPayload.message || "Request Rejected");
      }
    } catch (error) {
      toast.error("Network communication failure");
    } finally {
      setLoading(false);
    }
  };

  if (isRefreshing) return (
    <div className="h-screen flex items-center justify-center bg-[#F8F9FB]">
       <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-6 bg-[#F8F9FB] p-4 md:p-8 min-h-screen font-sans italic">
      
      {/* Shift Registration Control */}
      <div className="bg-white p-6 md:p-10 rounded-[44px] border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black italic text-slate-900 tracking-tighter uppercase">Shift Manifest</h2>
          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
            <Navigation size={12}/> Authorized Location: Dhaka HQ
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => processAttendanceRequest("IN")}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[24px] font-black text-xs flex items-center gap-3 transition-all shadow-xl shadow-blue-100 active:scale-95 disabled:opacity-30"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <UserCheck size={18} />} CLOCK IN
          </button>
          <button 
            onClick={() => processAttendanceRequest("OUT")}
            disabled={loading}
            className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-[24px] font-black text-xs flex items-center gap-3 transition-all shadow-xl shadow-slate-100 active:scale-95 disabled:opacity-30"
          >
            <Clock size={18} /> CLOCK OUT
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white p-8 rounded-[44px] shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-6 left-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Quota</h3>
          </div>
          <div className="relative w-44 h-44 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
              <circle cx="88" cy="88" r="75" stroke="#F1F5F9" strokeWidth="15" fill="transparent" />
              <circle cx="88" cy="88" r="75" stroke="#3B82F6" strokeWidth="15" fill="transparent" 
                strokeDasharray="471" strokeDashoffset={`${471 - (stats.present / 30) * 471}`} strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-black block text-slate-900 tracking-tighter">{stats.present}</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Days Active</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<UserCheck size={20}/>} label="Attendance" value={stats.present} color="text-blue-600" bg="bg-blue-50" />
          <StatCard icon={<AlertCircle size={20}/>} label="Late Records" value={stats.late} color="text-rose-600" bg="bg-rose-50" />
          <StatCard icon={<Plane size={20}/>} label="Leave Taken" value={stats.leave} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard icon={<Calendar size={20}/>} label="Off Days" value="4" color="text-slate-400" bg="bg-slate-50" />
        </div>
      </div>

      {/* History Log Table (Calendar View Substitute) */}
      <div className="bg-white rounded-[44px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
           <h3 className="text-xl font-black italic uppercase tracking-tighter">Personal Attendance Log</h3>
           <span className="text-[10px] font-black bg-slate-100 px-4 py-2 rounded-full uppercase">Year: 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">Calendar Date</th>
                <th className="px-8 py-6">Clock In</th>
                <th className="px-8 py-6">Clock Out</th>
                <th className="px-8 py-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {attendanceHistory.length > 0 ? attendanceHistory.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 font-black text-slate-700 text-sm italic">
                    {new Date(log.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">{log.checkIn || '--'}</td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">{log.checkOut || '--'}</td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      log.status === 'LATE' ? 'bg-rose-600 text-white shadow-lg shadow-rose-100' : 'bg-emerald-500 text-white'
                    }`}>
                      {log.status === 'LATE' ? `${log.lateMinutes}M LATE` : 'ON TIME'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="text-center py-20 text-slate-300 font-bold italic">No records found for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable Small Component for Analytics
function StatCard({ icon, label, value, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-lg hover:shadow-slate-100 transition-all">
      <div className={`p-4 rounded-2xl mb-4 ${bg} ${color}`}>{icon}</div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <span className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</span>
    </div>
  );
}