"use client";
import { useState, useEffect } from "react";
import { 
  Clock, CheckCircle2, AlertTriangle, 
  ExternalLink, Bell, LayoutGrid, Loader2 
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function TeamTaskPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাইনামিক প্রজেক্ট ডাটা লোড (আপনার API থেকে)
  useEffect(() => {
    async function getProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Data load failed");
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  // ২. স্ট্যাটাস আপডেট এবং গুগল শিট নোটিফিকেশন ট্রিগার
  const handleUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/projects/update`, {
        method: "PATCH",
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Status updated to ${newStatus}`);
        // লোকাল স্টেট আপডেট
        setProjects((prev: any) => 
          prev.map((p: any) => p.id === id ? { ...p, status: newStatus } : p)
        );
      }
    } catch (error) {
      toast.error("Failed to sync status");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="p-4 space-y-10">
      {/* Header matching image_390340.png */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">Team Tasks</h1>
          <p className="text-blue-600 font-bold text-sm italic mt-1">Team: Alpha Developers</p>
        </div>
        <div className="p-3 bg-white rounded-2xl shadow-xl shadow-rose-100 border border-rose-50 flex items-center justify-center relative">
          <Bell className="text-rose-500" size={24} />
          <span className="absolute top-2 right-2 w-3 h-3 bg-rose-600 rounded-full border-2 border-white animate-ping"></span>
        </div>
      </div>

      {/* Project Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? projects.map((project: any) => (
          <div key={project.id} className="bg-white rounded-[44px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
            {/* Status Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -mr-10 -mt-10 ${
              project.status === 'ISSUE' ? 'bg-rose-500' : 'bg-blue-500'
            }`}></div>

            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <LayoutGrid size={24} />
              </div>
              <StatusBadge status={project.status} />
            </div>

            <h3 className="text-xl font-black italic text-slate-800 mb-2 leading-tight uppercase tracking-tight">{project.name}</h3>
            <p className="text-sm text-slate-500 font-medium italic mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
            
            <div className="flex items-center justify-between mb-8">
               <button className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                 <ExternalLink size={12}/> View Assets
               </button>
               <span className="text-[10px] font-bold text-slate-300 italic">ID: {project.id.slice(0,8)}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-50">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Execution Control</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Btn label="WIP" icon={<Clock size={12}/>} active={project.status === 'WIP'} 
                  onClick={() => handleUpdate(project.id, "WIP")} color="text-blue-600 bg-blue-50" />
                
                <Btn label="Done" icon={<CheckCircle2 size={12}/>} active={project.status === 'DELIVERY'} 
                  onClick={() => handleUpdate(project.id, "DELIVERY")} color="text-emerald-600 bg-emerald-50" />
                
                <Btn label="Issue" icon={<AlertTriangle size={12}/>} active={project.status === 'ISSUE'} 
                  onClick={() => handleUpdate(project.id, "ISSUE")} color="text-rose-600 bg-rose-50" />
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[44px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">কোনো প্রজেক্ট এসাইন করা হয়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatusBadge({ status }: { status: string }) {
  const variants: any = {
    WIP: "bg-blue-100 text-blue-700",
    DELIVERY: "bg-emerald-100 text-emerald-700",
    ISSUE: "bg-rose-100 text-rose-700 animate-pulse"
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${variants[status] || "bg-slate-100"}`}>
      {status === 'DELIVERY' ? 'READY' : status}
    </span>
  );
}

function Btn({ label, icon, onClick, color, active }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all active:scale-90 border border-transparent hover:border-slate-200 ${color} ${active ? 'ring-2 ring-offset-2 ring-slate-200 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
    >
      {icon} {label}
    </button>
  );
}