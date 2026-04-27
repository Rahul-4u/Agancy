"use client";
import { useState } from "react";
import { Clock, Navigation, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AttendanceButtons() {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async (type: "IN" | "OUT") => {
    setLoading(true);
    const now = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, time: now }),
      });

      if (res.ok) {
        toast.success(`${type === 'IN' ? 'Check-in' : 'Check-out'} Successful!`);
        window.location.reload(); 
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to log attendance");
      }
    } catch (error) {
      toast.error("Server synchronization error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <button 
        onClick={() => handleAttendance("IN")}
        disabled={loading}
        className="bg-white text-blue-600 px-10 py-3 rounded-2xl font-black text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" size={14}/> : <Navigation size={14}/>} CHECK IN
      </button>
      <button 
        onClick={() => handleAttendance("OUT")}
        disabled={loading}
        className="bg-blue-800/40 border border-blue-400 text-white px-10 py-3 rounded-2xl font-black text-xs hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
      >
        <Clock size={14}/> CHECK OUT
      </button>
    </div>
  );
}