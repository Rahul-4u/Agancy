"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, Users, Clock, LogOut, 
  CheckSquare, Settings, Briefcase, UserCircle, Info 
} from 'lucide-react';

export default function Sidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();

  // এখানে তুমি খুব সহজেই নতুন পেজ বা রোল অ্যাড করতে পারবে
  const menuConfig = [
    // --- ADMIN ROUTES ---
    { name: 'Admin Panel', path: '/dashboard/admin/admin-panel', icon: LayoutDashboard, roles: ['ADMIN'] },
    
    // --- HR ROUTES ---
    { name: 'HR Desk', path: '/dashboard/hr/hr-panel', icon: Briefcase, roles: ['HR', 'ADMIN'] },
    
    // --- LEADER ROUTES ---
    { name: 'Team Hub', path: '/dashboard/leader/leader-panel', icon: Users, roles: ['LEADER', 'ADMIN'] },
    
    // --- EMPLOYEE SPECIFIC ROUTES ---
    { name: 'My Profile', path: '/dashboard/employee/profile', icon: UserCircle, roles: ['EMPLOYEE'] },
    { name: 'Attendance', path: '/dashboard/employee/attendance', icon: Clock, roles: ['EMPLOYEE', 'ADMIN', 'HR'] },
    { name: 'Work Details', path: '/dashboard/employee/details', icon: Info, roles: ['EMPLOYEE'] },
    { name: 'My Tasks', path: '/dashboard/employee/employee-panel', icon: CheckSquare, roles: ['EMPLOYEE', 'ADMIN'] },
    
    // --- GENERAL USER ---
    { name: 'Client View', path: '/dashboard/user/user-panel', icon: Settings, roles: ['USER', 'ADMIN'] },
  ];

  // ইউজারের রোল অনুযায়ী ফিল্টার করা
  const filteredMenu = menuConfig.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex flex-col h-full p-6 text-white bg-slate-900">
      {/* Logo Area */}
      <div className="text-2xl font-black italic mb-10 px-2 tracking-tighter">
        REBACK
      </div>
      
      {/* Navigation Area */}
      <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-semibold text-sm group ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={`${isActive ? 'text-white' : 'group-hover:text-white'}`} /> 
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Area */}
      <div className="pt-6 border-t border-slate-800">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-4 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-2xl w-full transition-all font-bold text-sm"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}