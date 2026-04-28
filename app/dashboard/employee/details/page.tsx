import { Calendar, Info, Heart, Coffee } from "lucide-react";

// 1. Defining interface for DetailRow props to ensure type safety
interface DetailRowProps {
  label: string;
  value: string;
}

export default function EmployeeDetails() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-black italic tracking-tighter uppercase">Work Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Off-day Card */}
        <div className="bg-slate-900 p-8 rounded-[48px] text-white">
          <Coffee className="text-amber-400 mb-4" size={32} />
          <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Weekly Off-day</h3>
          <h2 className="text-3xl font-black italic mt-1">FRIDAY</h2>
        </div>

        {/* Leave Balance Card */}
        <div className="bg-white border-2 border-slate-100 p-8 rounded-[48px] flex items-center justify-between">
          <div>
            <Heart className="text-rose-500 mb-2" />
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Available Leaves</h3>
            <h2 className="text-3xl font-black italic mt-1">12 Days</h2>
          </div>
          <button className="bg-slate-100 p-4 rounded-full hover:bg-slate-200 transition-all">
            <Info size={20}/>
          </button>
        </div>
      </div>

      {/* Employment Information Table */}
      <div className="bg-white border rounded-[40px] p-8">
        <h3 className="font-black text-sm uppercase tracking-widest mb-6">Employment Info</h3>
        <div className="space-y-4">
          <DetailRow label="Department" value="Development" />
          <DetailRow label="Joining Date" value="12 March, 2024" />
          <DetailRow label="Designation" value="Frontend Developer" />
          <DetailRow label="Employee ID" value="REB-10293" />
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable component for displaying a single row of information
 * @param label - The title of the information field
 * @param value - The actual data value to display
 */
function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between border-b border-slate-50 pb-4">
      <span className="text-slate-400 font-medium italic">{label}</span>
      <span className="font-bold text-slate-800 italic">{value}</span>
    </div>
  );
}