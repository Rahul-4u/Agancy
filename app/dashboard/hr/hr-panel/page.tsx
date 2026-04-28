import { UserCheck, Briefcase } from "lucide-react";

/**
 * HR Panel Component
 * Provides oversight for attendance and leave management
 */
export default function HRPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">
        HR PANEL
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Attendance Overview Card */}
        <div className="bg-emerald-500 p-10 rounded-[48px] text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
          {/* Background Decoration */}
          <UserCheck 
            size={200} 
            className="absolute right-[-40px] bottom-[-40px] text-white/10 rotate-12" 
          />
          
          <div className="relative z-10">
            <UserCheck size={40} className="mb-4" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tight">Daily Attendance</h2>
            <p className="text-6xl font-black mt-2 tracking-tighter">94%</p>
            <p className="mt-4 text-emerald-100 font-medium italic">
              40 Members present today
            </p>
          </div>
        </div>

        {/* Leave Requests Management Section */}
        <div className="bg-white border-2 border-slate-100 p-10 rounded-[48px] shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">
              Leave Requests
            </h3>
            <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              03 PENDING
            </span>
          </div>

          {/* List of Pending Requests */}
          <div className="space-y-3">
             <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center italic text-sm border border-transparent hover:border-slate-200 transition-all">
               <div className="flex flex-col">
                 <span className="font-bold text-slate-700">Sick Leave</span>
                 <span className="text-xs text-slate-400">Tanvir Ahmed</span>
               </div>
               <button className="font-black text-[10px] text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
                 Approve
               </button>
             </div>
             
             {/* Placeholder for more requests */}
             <div className="p-10 text-center border-2 border-dashed border-slate-50 rounded-3xl">
                <p className="text-slate-300 text-xs font-bold italic uppercase">
                  End of pending list
                </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}