"use client";

import { useState } from "react";
import { 
  Plus, Users, FolderKanban, AlertCircle, 
  CheckCircle2, Send, LayoutGrid, Clock 
} from "lucide-react";

/**
 * Interface for the stats card data
 */
interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

/**
 * Interface for project row properties
 */
interface ProjectRowProps {
  name: string;
  member: string;
  status: "WIP" | "ISSUE" | "DELIVERY";
  time: string;
}

export default function LeaderPanel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats data (In a real app, this would be fetched from your API/DB)
  const stats: StatItem[] = [
    { label: "Active Projects", value: "12", icon: FolderKanban, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Team Members", value: "08", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pending Issues", value: "03", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Completed", value: "45", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-8 p-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Team Leader Hub
          </h1>
          <p className="text-slate-500 font-bold italic text-sm mt-1">
            Manage your team and assign new tasks
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-blue-200 transition-all active:scale-95"
        >
          <Plus size={18} /> CREATE NEW PROJECT
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content: Project Monitoring List */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black italic text-slate-800 flex items-center gap-2 uppercase tracking-tight">
            <LayoutGrid size={20} className="text-blue-600" /> Current Team Projects
          </h3>
          <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border shadow-sm uppercase tracking-widest">
            Live Monitoring
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Project Name</th>
                <th className="px-8 py-5">Assigned To</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Last Sync</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <ProjectRow name="Real Estate App" member="Sabbir Ahmed" status="WIP" time="2 mins ago" />
              <ProjectRow name="E-commerce UI" member="Rakib Hossain" status="ISSUE" time="1 hour ago" />
              <ProjectRow name="Banking Dashboard" member="Anik Islam" status="DELIVERY" time="Yesterday" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable Table Row Component for Project Monitoring
 */
function ProjectRow({ name, member, status, time }: ProjectRowProps) {
  const statusColors: Record<string, string> = {
    WIP: "bg-blue-100 text-blue-600",
    ISSUE: "bg-rose-100 text-rose-600",
    DELIVERY: "bg-emerald-100 text-emerald-600",
  };

  return (
    <tr className="group hover:bg-slate-50/50 transition-colors">
      <td className="px-8 py-5">
        <p className="font-black italic text-slate-800 uppercase text-sm tracking-tight">{name}</p>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-200 rounded-full border border-white"></div>
          <p className="text-xs font-bold text-slate-600 italic">{member}</p>
        </div>
      </td>
      <td className="px-8 py-5">
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${statusColors[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-8 py-5">
        <p className="text-[10px] font-bold text-slate-400 italic flex items-center gap-1">
          <Clock size={10} /> {time}
        </p>
      </td>
      <td className="px-8 py-5 text-right">
        <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 bg-white rounded-xl border border-transparent hover:border-slate-100">
          <Send size={16} />
        </button>
      </td>
    </tr>
  );
}