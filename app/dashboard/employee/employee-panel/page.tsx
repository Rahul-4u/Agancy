import { getServerSession } from "next-auth";
import { Clock, Briefcase, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import AttendanceButtons from "@/components/AttendanceButtons";
import { authOptions } from "@/lib/auth";

// 1. Defining Task Interface for Type Safety
interface Task {
  id: string;
  title: string;
  priority: string;
  status: string;
  createdAt: Date;
}

export default async function EmployeePanel() {
  // Fetch session on the server
  const session = await getServerSession(authOptions);

  // 2. Security Check: Redirect if not logged in or not an EMPLOYEE
  if (!session || (session.user as any)?.role !== "EMPLOYEE") {
    redirect("/dashboard");
  }

  const userId = (session.user as any)?.id;

  // 3. Fetch dynamic data from the Database
  const userData = await db.user.findUnique({
    where: { id: userId },
    include: {
      tasksAssigned: {
        where: { status: "PENDING" }, // Only fetch incomplete tasks
        take: 3,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">
          Employee Workspace
        </h1>
        <p className="text-slate-500 font-bold italic text-sm">
          {/* Using Optional Chaining to prevent undefined name error */}
          Welcome back, {session?.user?.name || "Team Member"}! Monitor your daily progress and shift logs below.
        </p>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Attendance Card */}
        <div className="lg:col-span-2 bg-blue-600 p-10 rounded-[48px] text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
          <Clock className="absolute right-[-30px] top-[-30px] text-white/10 group-hover:rotate-12 transition-transform duration-700" size={250} />
          <div className="relative z-10">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-1">Shift Registration</h2>
            <p className="text-blue-100 mb-6 font-bold text-xs uppercase tracking-widest opacity-80">
              Shift: {(userData as any)?.officeStartTime || "09:00 AM"} - 06:00 PM (HQ Standard)
            </p>
            
            {/* Attendance Control Buttons (Client Component) */}
            <AttendanceButtons />
          </div>
        </div>

        {/* Dynamic Salary Card */}
        <div className="bg-white border-2 border-slate-100 p-8 rounded-[48px] shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl w-fit mb-4">
            <Wallet size={28} />
          </div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Current Payout</p>
          <h2 className="text-5xl font-black text-slate-900 mt-2 italic tracking-tighter">
            {/* Safe number formatting */}
            ${(userData as any)?.salary?.toLocaleString() || "0.00"}
          </h2>
          <p className="text-emerald-600 text-xs font-bold mt-4 flex items-center gap-2">
            <CheckCircle2 size={14}/> Next Disbursement: 1st of next month
          </p>
        </div>
      </div>

      {/* Assignments & Announcements Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Task List (Dynamic) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-8 rounded-[44px] shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3 uppercase italic">
            <Briefcase className="text-blue-600" /> Pending Assignments
          </h3>
          <div className="space-y-4">
            {userData?.tasksAssigned && userData.tasksAssigned.length > 0 ? (
              userData.tasksAssigned.map((task: any) => (
                <TaskItem key={task.id} title={task.title} priority={task.priority} />
              ))
            ) : (
              // Empty State UI
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto text-slate-200 mb-2" size={40}/>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest italic">
                  All targets cleared for today!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* System Notice Section */}
        <div className="lg:col-span-5 bg-slate-900 p-10 rounded-[44px] text-white">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase italic">
            <AlertCircle className="text-amber-400" /> Internal Memo
          </h3>
          <div className="p-6 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10">
            <p className="text-sm font-bold text-slate-200 italic leading-relaxed">
              "Please ensure all weekly reports are submitted through the portal before EOD Friday. 
              Performance bonuses will be calculated based on EOD logs."
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">— Admin Desk</span>
              <span className="text-[9px] text-slate-500 font-bold italic">Ref: HQ-402</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Task Item Sub-component
 */
function TaskItem({ title, priority }: { title: string, priority: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-all hover:bg-white">
      <span className="font-black text-slate-700 italic text-sm">{title}</span>
      <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-tighter shadow-sm ${
        priority === 'High' ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white'
      }`}>
        {priority}
      </span>
    </div>
  );
}