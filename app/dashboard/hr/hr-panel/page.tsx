import { UserCheck, FileText, Briefcase } from "lucide-react";

export default function HRPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">HR PANEL</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-emerald-500 p-10 rounded-[48px] text-white shadow-xl shadow-emerald-100">
          <UserCheck size={40} className="mb-4" />
          <h2 className="text-2xl font-bold">Daily Attendance</h2>
          <p className="text-6xl font-black mt-2 tracking-tighter">94%</p>
          <p className="mt-4 text-emerald-100 font-medium italic">40 Members present today</p>
        </div>
        <div className="bg-white border-2 border-slate-100 p-10 rounded-[48px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-black">Leave Requests</h3>
            <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-xs font-black">03 PENDING</span>
          </div>
          <div className="space-y-3">
             <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center italic text-sm">
               <span>Sick Leave - Tanvir Ahmed</span>
               <button className="font-bold text-blue-600">Approve</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}