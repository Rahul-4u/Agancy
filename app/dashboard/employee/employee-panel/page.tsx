import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Clock, Briefcase, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EmployeePanel() {
  const session = await getServerSession(authOptions);

  // সিকিউরিটি চেক
  if (!session || (session.user as any).role !== "EMPLOYEE") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      {/* হেডার সেকশন */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">
          Employee Workspace
        </h1>
        <p className="text-slate-500 font-medium italic">
          স্বাগতম, {session.user.name}! আজকের কাজের আপডেট এখানে দেখুন।
        </p>
      </div>

      {/* মেইন কার্ড সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* এটেনডেন্স কার্ড */}
        <div className="lg:col-span-2 bg-blue-600 p-8 rounded-[48px] text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
          <Clock className="absolute right-[-20px] top-[-20px] text-white/10 group-hover:rotate-12 transition-transform" size={200} />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">হাজিরা দিন (Attendance)</h2>
            <p className="text-blue-100 mb-6 font-medium italic">সকাল ৯:০০ - সন্ধ্যা ৬:০০ (অফিস টাইম)</p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all">
                CHECK IN
              </button>
              <button className="bg-blue-800/40 border border-blue-400 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all">
                CHECK OUT
              </button>
            </div>
          </div>
        </div>

        {/* স্যালারি কার্ড */}
        <div className="bg-white border-2 border-slate-100 p-8 rounded-[48px] shadow-sm flex flex-col justify-center">
          <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl w-fit mb-4">
            <Wallet size={24} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Estimated Salary</p>
          <h2 className="text-4xl font-black text-slate-900 mt-1 italic">$3,500</h2>
          <p className="text-emerald-500 text-xs font-bold mt-2">Next Payment: May 1st</p>
        </div>
      </div>

      {/* নিচের সেকশন (টাস্ক এবং নোটিশ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* টু-ডু লিস্ট বা টাস্ক */}
        <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-blue-600" /> আজকের কাজ (Assigned Tasks)
          </h3>
          <div className="space-y-4">
            <TaskItem title="Website UI Bug Fix" priority="High" />
            <TaskItem title="Client Meeting Preparation" priority="Medium" />
            <p className="text-slate-400 text-sm italic mt-4 text-center">আর কোনো কাজ বাকি নেই!</p>
          </div>
        </div>

        {/* জরুরি নোটিশ */}
        <div className="bg-amber-50 border border-amber-100 p-8 rounded-[40px]">
          <h3 className="text-lg font-black text-amber-800 mb-4 flex items-center gap-2">
            <AlertCircle /> অফিস নোটিশ
          </h3>
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-amber-100">
            <p className="text-sm font-bold text-slate-700 italic">আগামীকাল ইফতার পার্টি দুপুর ৩টা থেকে শুরু হবে। সবাইকে উপস্থিত থাকার অনুরোধ রইল।</p>
            <p className="text-[10px] text-slate-400 mt-2">— Admin Team</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ছোট টাস্ক কম্পোনেন্ট
function TaskItem({ title, priority }: { title: string, priority: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
      <span className="font-bold text-slate-700 italic text-sm">{title}</span>
      <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase ${
        priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
      }`}>
        {priority}
      </span>
    </div>
  );
}