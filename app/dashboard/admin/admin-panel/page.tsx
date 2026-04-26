import { ShieldCheck, Users, TrendingUp, Landmark } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">ADMIN CONTROL</h1>
          <p className="text-slate-500 font-medium italic">Agency-wide management and oversight.</p>
        </div>
        <ShieldCheck size={48} className="text-blue-600 opacity-20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl shadow-slate-200">
          <Landmark className="mb-4 text-blue-400" />
          <p className="text-[10px] font-black uppercase tracking-[3px] opacity-50">Net Revenue</p>
          <h2 className="text-4xl font-black">$840,000</h2>
        </div>
        <div className="bg-white border p-8 rounded-[40px] shadow-sm">
          <Users className="mb-4 text-slate-400" />
          <p className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">Total Staff</p>
          <h2 className="text-4xl font-black text-slate-900">42</h2>
        </div>
        <div className="bg-blue-600 p-8 rounded-[40px] text-white">
          <TrendingUp className="mb-4 text-blue-100" />
          <p className="text-[10px] font-black uppercase tracking-[3px] opacity-50">Agency Growth</p>
          <h2 className="text-4xl font-black">+18.5%</h2>
        </div>
      </div>
    </div>
  );
}