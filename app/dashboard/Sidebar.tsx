"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, Users, Clock, LogOut, 
  CheckSquare, Settings, Briefcase, UserCircle, 
  Info, FolderKanban, LayoutGrid, BellRing, 
  ListChecks
} from 'lucide-react';

export default function Sidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();

  // এই লিস্টে নতুন পেজ অ্যাড করা এখন পানির মতো সহজ
  const menuConfig = [
    // --- ADMIN ---
    { name: 'Admin Panel', path: '/dashboard/admin/admin-panel', icon: LayoutDashboard, roles: ['ADMIN'] },
    
    // --- HR ---
    { name: 'HR Desk', path: '/dashboard/hr/hr-panel', icon: Briefcase, roles: ['HR', 'ADMIN'] },
    
    // --- LEADER ---
   { name: 'Team Hub', path: '/dashboard/leader/leader-panel', icon: LayoutGrid, roles: ['LEADER', 'ADMIN'] },
    { 
      name: 'All Projects', 
      path: '/dashboard/leader/all-projects', // আপনার নতুন পেজের পাথ
      icon: ListChecks, 
      roles: ['LEADER', 'ADMIN'] 
    },
    // --- EMPLOYEE (The ones you asked for) ---
    { 
      name: 'Dashboard', 
      path: '/dashboard/employee/employee-panel', 
      icon: LayoutGrid, 
      roles: ['EMPLOYEE', 'ADMIN'] 
    },
    { 
      name: 'Team Tasks', 
      path: '/dashboard/employee/projects', // প্রজেক্ট ডিটেইলস ও স্ট্যাটাস আপডেট পেজ
      icon: FolderKanban, 
      roles: ['EMPLOYEE', 'LEADER', 'ADMIN'] 
    },
    { 
      name: 'Attendance', 
      path: '/dashboard/employee/attendance', 
      icon: Clock, 
      roles: ['EMPLOYEE', 'ADMIN', 'HR', 'LEADER'] 
    },
    { 
      name: 'My Profile', 
      path: '/dashboard/employee/profile', 
      icon: UserCircle, 
      roles: ['EMPLOYEE', 'USER', 'ADMIN', 'LEADER', 'HR'] 
    },
    { 
      name: 'Work Details', 
      path: '/dashboard/employee/details', 
      icon: Info, 
      roles: ['EMPLOYEE'] 
    },
    
    // --- CLIENT/USER ---
    { name: 'Client View', path: '/dashboard/user/user-panel', icon: Settings, roles: ['USER', 'ADMIN'] },
  ];

  // ফিল্টার লজিক
  const filteredMenu = menuConfig.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex flex-col h-full p-6 text-white bg-slate-900 border-r border-slate-800">
      {/* Branding */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-blue-600 p-2 rounded-xl italic font-black text-xs">RB</div>
        <div className="text-2xl font-black italic tracking-tighter uppercase">REBACK</div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-2">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-[13px] group ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} className={`${isActive ? 'text-white' : 'group-hover:text-white transition-colors'}`} /> 
              {item.name}
              {/* যদি কোনো পেজে স্পেশাল নোটিফিকেশন দেখাতে চাও (যেমন Issues) */}
              {item.name === 'Team Tasks' && userRole === 'EMPLOYEE' && (
                <span className="ml-auto w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="pt-6 mt-6 border-t border-slate-800">
        <div className="bg-slate-800/40 p-4 rounded-3xl mb-4">
           <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Logged in as</p>
           <p className="text-xs font-bold text-blue-400 italic truncate">{userRole}</p>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-4 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-2xl w-full transition-all font-black text-[13px]"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}