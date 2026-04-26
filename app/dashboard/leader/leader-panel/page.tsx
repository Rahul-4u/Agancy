import { Target, Zap, Clock } from "lucide-react";

export default function LeaderPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">TEAM HUB</h1>
      <div className="bg-slate-900 p-10 rounded-[50px] text-white overflow-hidden relative">
        <Zap size={150} className="absolute -right-10 -top-10 text-white/5" />
        <h2 className="text-xl font-bold mb-6">Current Sprint: Project Reback UI</h2>
        <div className="w-full bg-white/10 h-4 rounded-full">
          <div className="bg-blue-500 h-full w-[65%] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
        </div>
        <p className="mt-4 text-blue-400 font-black italic">65% COMPLETED</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white border p-8 rounded-[40px] flex items-center gap-6">
            <div className="p-4 bg-amber-100 text-amber-600 rounded-3xl"><Target /></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase italic">Team Target</p>
              <h4 className="text-2xl font-black italic">12 Projects/Mo</h4>
            </div>
         </div>
      </div>
    </div>
  );
}